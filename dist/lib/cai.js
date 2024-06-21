"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessage = void 0;
const s = require("cainode");
const chr = new s();
require("dotenv").config();
async function SendMessage(cid, text) {
    console.log(text);
    await chr.login(process.env.TOKEN_CHARACTERAI);
    await chr.character.connect(cid);
    let res = await chr.character.send_message(text);
    return res.turn.candidates[0].raw_content;
}
exports.SendMessage = SendMessage;
