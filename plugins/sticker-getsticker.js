import fg from 'api-dylux' 
import fetch from 'node-fetch'
import { sticker } from '../lib/sticker.js'

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
    if (!args[0]) throw `✳️ ${mssg.notext} \n\n📌 *${mssg.example}:*\n${usedPrefix + command} peepo`
    
    try {
        // let res = await fetch(global.API('fgmods', '/api/getsticker', { q:text }, 'apikey'))
        // let json = await res.json()
        let json = await fg.StickerSearch(text)
        m.reply(`
✅ ${mssg.result}

▢ *${mssg.title}:* ${json.title}
▢ *${mssg.total} stickers:* ${json.sticker_url.length}`)

        // Limitar la cantidad de stickers enviados a 10
        let stickersToSend = json.sticker_url.slice(0, 10)

        for (let i of stickersToSend) {
            const stiker = await sticker(false, i, global.packname, global.author)
            await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
            await delay(1500) // Opcional: añadir un pequeño retraso entre envíos para evitar problemas de spam
        } 
    } catch (e) {
        m.reply(`❇️ ${mssg.error}`)
    } 
}

handler.help = ['getsticker']
handler.tags = ['sticker']
handler.command = ['getsticker', 'getstick', 'stickersearch', 'sticksearch'] 
handler.diamond = 3

export default handler

const delay = time => new Promise(res => setTimeout(res, time))
