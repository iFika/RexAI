"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Speeching = void 0;
const voice_ai_1 = require("../lib/voice-ai");
const speaker_1 = __importDefault(require("speaker"));
const prism = __importStar(require("prism-media"));
async function Speeching(text) {
    return new Promise(async (resolve, reject) => {
        const transcoder = new prism.FFmpeg({
            args: [
                '-analyzeduration', '0',
                '-loglevel', '0',
                '-f', 's16le',
                '-ar', '44100',
                '-ac', '2',
            ],
        });
        const speaker = new speaker_1.default({
            channels: 2, // 2 channels
            bitDepth: 16, // 16-bit samples
            sampleRate: 44100 // 44,100 Hz sample rate
        });
        let fak = await (0, voice_ai_1.GetVoiceStream)(text);
        fak.pipe(transcoder)
            .pipe(speaker);
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
exports.Speeching = Speeching;
