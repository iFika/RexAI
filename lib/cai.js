const s = require("cainode")
const chr = new s();


export async function SendMessage(cid, text) {
  console.log(text)
    await chr.login("0bb555bd085ea103ca069194e5d526b784a23c57")
    await chr.character.connect(cid)
  let res =  await chr.character.send_message(text)
  return res.turn.candidates[0].raw_content
}