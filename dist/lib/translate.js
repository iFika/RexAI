"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslateAI = void 0;
const translatte = require("translatte");
async function TranslateAI(text) {
    let data = await translatte(text, { to: "id" });
    return data.text;
}
exports.TranslateAI = TranslateAI;
