"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartThink = exports.Character_AI = void 0;
const cai_1 = require("./cai");
const translate_1 = require("./translate");
async function Character_AI(text, character_id) {
    let data = await (0, cai_1.SendMessage)(character_id, text);
    return await (0, translate_1.TranslateAI)(data);
}
exports.Character_AI = Character_AI;
async function SmartThink(text) {
    return new Promise(async (resolve, reject) => {
        if (text.toLowerCase().includes("musik")) {
            console.log(`Musik included`);
        }
        else if (text.toLowerCase().includes("rex")) {
            console.log(`Pemanggilan Rex`);
        }
        //"zb7I4U9OYfewmEgOWLBHScefPeELkm1J-_GZDjHLY1M" -> IS A CHARACTER ASSISTANT, YOU CAN CHANGE IT. on beta.character.ai
        let think = await Character_AI(text, "zb7I4U9OYfewmEgOWLBHScefPeELkm1J-_GZDjHLY1M");
        resolve(think);
    });
}
exports.SmartThink = SmartThink;
