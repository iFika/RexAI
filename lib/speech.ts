import { GetVoiceStream } from "../lib/voice-ai";
import Speaker from 'speaker'
import * as prism from 'prism-media'

export async function Speeching(text: string): Promise<boolean> {
  return new Promise(async(resolve, reject) => {
    const transcoder = new prism.FFmpeg({
      args: [
        '-analyzeduration', '0',
        '-loglevel', '0',
        '-f', 's16le',
        '-ar', '44100',
        '-ac', '2',
      ],
    });
    const speaker = new Speaker({
      channels: 2,          // 2 channels
      bitDepth: 16,         // 16-bit samples
      sampleRate: 44100     // 44,100 Hz sample rate
    });
    let fak = await GetVoiceStream(text)
    fak.pipe(transcoder)
    .pipe(speaker)

    speaker.on('finish', () => {
      console.log(`Finish talking.`);
      resolve(true); // Resolve the promise with true when speaker finishes
    });

    speaker.on('error', (err) => {
      console.error('Error occurred:', err);
      reject(err); // Reject the promise if there is an error
    });
  });
}
