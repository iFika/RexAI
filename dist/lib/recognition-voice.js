"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recognize = void 0;
var rec = require('node-record-lpcm16');
const events_1 = __importDefault(require("events"));
const audio = require('win-audio').mic;
const axios_1 = __importDefault(require("axios"));
function calculateVolume(data) {
    var sum = 0;
    for (let i = 0; i < data.length; i += 2) {
        const sample = data.readInt16LE(i);
        sum += sample * sample;
    }
    const rms = Math.sqrt(sum / (data.length / 2));
    return rms;
}
class Recognition extends events_1.default {
    async start(isMute = false) {
        audio.unmute();
        if (isMute) {
            audio.mute();
        }
        this.emit('talking', `Listening..`);
        var cnt = 0;
        var fk = rec.record({
            sampleRateHertz: 16000,
            recordProgram: 'sox', // Adjust this based on your system
            endOnSilence: true
        }).stream();
        fk.on('data', async (data) => {
            let volume = parseInt(calculateVolume(data).toString());
            if (volume < 1000) {
                this.emit('silence', `Silence... (${cnt})`);
                cnt++;
                if (cnt >= 10) {
                    this.emit('silencefinal', `Recognition Stopped, Thinking...`);
                    audio.mute();
                }
            }
            else {
                this.emit('talking', `Talking...`);
                cnt = 0;
            }
        });
        await (0, axios_1.default)({
            url: `https://www.google.com/speech-api/v2/recognize?output=json&lang=id-ID&key=AIzaSyDXVE9EDdgqlnGFEVPAN7CPmtvyWQY0C5c&pFilter=1`,
            data: fk,
            headers: {
                'Content-Type': 'audio/l16; rate=16000;'
            },
            method: 'POST',
            transformResponse: [
                (data) => {
                    const fixedData = data.replace('{"result":[]}', "");
                    try {
                        return JSON.parse(fixedData);
                    }
                    catch (e) {
                        this.emit('silence', `Silence... (${cnt})`);
                    }
                },
            ]
        }).then((data) => {
            this.emit('transcript', data?.data?.result?.[0]?.alternative?.[0]?.transcript ?? null);
        }).catch((e) => {
            this.emit('errorServer', e, null);
        });
    }
    async Stop() {
        this.emit('silenceFinal', 'Disconnected from Servers. Attempting to connect again!');
        this.removeAllListeners();
    }
    async Mute() {
        audio.mute();
    }
    async Unmute() {
        audio.unmute();
    }
    CheckMute() {
        return audio.isMuted();
    }
}
exports.recognize = new Recognition;
