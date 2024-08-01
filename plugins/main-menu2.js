//import db from '../lib/database.js'
import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let handler = async function (m, { conn, text, usedPrefix }) {

let m2 = 
`◈ ━━━━━ Senna  ┃ ᴮᴼᵀ ━━━━━ ◈

👋🏻 Hola! *%name*
👥 Usuarios : %totalreg
🟢 Tiempo activo : %muptime
%sbot

▢ ADD
* https://instagram.com/fg98_ff

* https://fgmods.xyz

────────────

≡ Use estos comandos sin el prefijo: *${usedPrefix}*
┌─⊷ *AUDIOS* 
▢ Bot
▢ Buenos días
▢ Buenas tardes 
▢ Buenas noches
▢ Fino señores
▢ Sad
└──────────────

≡ LISTA DE MENUS

Ⓟ = Premium
ⓓ = Diamantes

┌─⊷ ACERCA DE
▢ .blocklist
▢ .info
▢ .owner
▢ .donate
▢ .language <es-en..>
▢ .listprem
▢ .menu2
▢ .ping
▢ .runtime
▢ .speedtest
▢ .support
└───────────

┌─⊷ SUB BOTS
▢ .botclone
▢ .botlist
▢ .txbot
▢ .stop
└───────────

┌─⊷ JUEGOS
▢ .dado
▢ .mates <modo>
▢ .ppt
▢ .slot <apuesta>
└───────────

┌─⊷ NIVEL & ECONOMIA
▢ .balance
▢ .buy
▢ .daily
▢ .leaderboard
▢ .levelup
▢ .mine
▢ .transfer [tipo] [monto] [@tag]
▢ .weekly
▢ .work
└───────────

┌─⊷ REGISTRO
▢ .reg <nombre.edad.género>
▢ .mysn
▢ .unreg <Num Serie>
└───────────

┌─⊷ STICKER
▢ .attp <text>
▢ .emojimix <emoji+emoji> (ⓓ)
▢ .getsticker (ⓓ)
▢ .smaker (ⓓ)
▢ .sticker
▢ .telestick
▢ .toimg <sticker>
▢ .tovid
▢ .trigger <@user>
▢ .ttp <text>
▢ .take <nombre>|<autor>
└───────────

┌─⊷ IMAGEN
▢ .tvid (ⓓ)
▢ .couple (ⓓ)
▢ .imagen (ⓓ)
▢ .girl (ⓓ)
▢ .meme
▢ .person
▢ .pinterest
▢ .wallpaper (ⓓ)
└───────────

┌─⊷ MAKER
▢ .logololi (ⓓ)
▢ .graffiti2 (ⓓ)
▢ .3dbox (ⓓ)
▢ .future (ⓓ)
▢ .ninja (ⓓ)
▢ .marvel (ⓓ)
▢ .paper (ⓓ)
▢ .glitch (ⓓ)
▢ .halloween (ⓓ)
▢ .green (ⓓ)
▢ .american (ⓓ)
▢ .neon (ⓓ)
▢ .devil (ⓓ)
▢ .wolf (ⓓ)
▢ .phlogo (ⓓ)
▢ .transformer (ⓓ)
▢ .thunder (ⓓ)
▢ .graffiti (ⓓ)
▢ .bpink (ⓓ)
▢ .joker (ⓓ)
▢ .matrix (ⓓ)
▢ .glow (ⓓ)
▢ .ballon (ⓓ)
▢ .dmd (ⓓ)
▢ .lightglow (ⓓ)
└───────────

┌─⊷ PREMIUM
▢ .gdrive (ⓓ)
▢ .mediafire <url> (ⓓ)
▢ .xnxx (ⓓ)
└───────────

┌─⊷ GRUPO
▢ .add
▢ .delete
▢ .delwarn @user
▢ .demote (@tag)
▢ .infogp
▢ .hidetag
▢ .kick @user
▢ .link
▢ .profile
▢ .promote
▢ .rules
▢ .setbye <text>
▢ .setrules <text>
▢ .group
▢ .setwelcome
▢ .simulate <event> @user
▢ .staff
▢ .totag
▢ .warn @user
▢ .warns
▢ .checkexpired
└───────────

┌─⊷ EN/DISABLE OPCIONES
▢ .enable <option>
▢ .disable <option>
└───────────

┌─⊷ ANIME
▢ .waifu (ⓓ)
▢ .neko (ⓓ)
▢ .megumin (ⓓ)
▢ .loli (ⓓ)
└───────────

┌─⊷ ANIME REACCION
▢ .kill @tag (ⓓ)
▢ .kiss @tag (ⓓ)
▢ .pat @tag (ⓓ)
▢ .slap @tag (ⓓ)
└───────────

┌─⊷ DESCARGAS
▢ .facebook <url> (ⓓ)
▢ .gdrive (ⓓ)
▢ .gitclone <url> (ⓓ)
▢ .igstalk
▢ .igstory (ⓓ)
▢ .instagram <link ig> (ⓓ)
▢ .mediafire <url> (ⓓ)
▢ .play
▢ .play2
▢ .tiktok (ⓓ)
▢ .tiktokstalk
▢ .twitter <url> (ⓓ)
▢ .ytmp3 <url>
▢ .ytsearch
▢ .ytmp4 <link yt>
└───────────`

let pp = './src/fg_logo.jpg' 
/*conn.sendButton(m.chat, m2, mssg.ig, pp, [
  ['⏍ Info', ${usedPrefix}botinfo],
  ['⌬ Grupos', ${usedPrefix}gpdylux]
],m, rpyt)*/
conn.sendFile(m.chat, pp, 'menu.jpg', m2, m, null, rpl)

}

handler.help = ['allmenu']
handler.tags = ['main']
handler.command = ['allmenu'] 

export default handler
