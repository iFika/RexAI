import { getAllAudioBase64 } from 'google-tts-api';
import { PassThrough } from 'stream';

async function base64toBinaryStream(base64Text: string) {
    // Convert base64 stream to binary stream
    const binaryData = Buffer.from(base64Text, 'base64');
    const stream = new PassThrough();
    stream.end(binaryData);
    return stream;
}

async function GetVoice64(text: string) {
    try {
        const base64Array = await getAllAudioBase64(text, {
            lang: 'id',
            slow: false,
            host: 'https://translate.google.com',
            timeout: 10000,
            splitPunct: ',.?'
        });
        const base64Concatenated = base64Array.map((item: any) => item.base64).join('');
        return base64toBinaryStream(base64Concatenated);
    } catch (error) {
        console.error('Error generating voice stream:', error);
        throw error;
    }
}

export async function GetVoiceStream(text: string) {
    const stream = new PassThrough();
    try {
        const binaryStream = await GetVoice64(text);
        binaryStream.pipe(stream);
    } catch (error) {
        console.error('Error generating voice stream:', error);
        stream.end();
    }
    return stream;
}
