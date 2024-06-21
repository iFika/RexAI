const translatte = require("translatte")
export async function TranslateAI(text)
{
let data = await translatte(text, {to: "id"})
return data.text
}