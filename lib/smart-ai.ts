import {SendMessage} from './cai'
import { recognize } from './recognition-voice';
import { TranslateAI } from "./translate";
export async function Character_AI(text:string, character_id:string)
{  
    let data =  await SendMessage(character_id, text)
    return await TranslateAI(data)
}
export async function SmartThink(text:string):Promise<String> {
    return new Promise(async(resolve, reject) => {  
        if(text.toLowerCase().includes("musik"))
        {
            console.log(`Musik included`)
        }
        else if (text.toLowerCase().includes("rex"))
        {
            console.log(`Pemanggilan Rex`)
        }
        let think:String = await Character_AI(text, "zb7I4U9OYfewmEgOWLBHScefPeELkm1J-_GZDjHLY1M")
    /*    let answer_t = await google.search(`translate ${think}`, {safe: false, parse_ads: true, page: 0})
        if(answer_t.translation != undefined)
        {
        if(answer_t.translation?.source_language?.toLowerCase() == 'inggris')
        {
think = answer_t.translation?.target_text
        }
        }*/
        resolve(think)
    })
}