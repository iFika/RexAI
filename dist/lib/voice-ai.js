"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetVoiceStream = void 0;
const google_tts_api_1 = require("google-tts-api");
const stream_1 = require("stream");
async function base64toBinaryStream(base64Text) {
    // Convert base64 stream to binary stream
    const binaryData = Buffer.from(base64Text, 'base64');
    const stream = new stream_1.PassThrough();
    stream.end(binaryData);
    return stream;
}
async function GetVoice64(text) {
    try {
        const base64Array = await (0, google_tts_api_1.getAllAudioBase64)(text, {
            lang: 'id',
            slow: false,
            host: 'https://translate.google.com',
            timeout: 10000,
            splitPunct: ',.?'
        });
        const base64Concatenated = base64Array.map((item) => item.base64).join('');
        return base64toBinaryStream(base64Concatenated);
    }
    catch (error) {
        console.error('Error generating voice stream:', error);
        throw error;
    }
}
async function GetVoiceStream(text) {
    const stream = new stream_1.PassThrough();
    try {
        const binaryStream = await GetVoice64(text);
        binaryStream.pipe(stream);
    }
    catch (error) {
        console.error('Error generating voice stream:', error);
        stream.end();
    }
    return stream;
}
exports.GetVoiceStream = GetVoiceStream;
