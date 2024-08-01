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

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, diamond, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        diamond: plugin.diamond,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == conn.user.jid ? '' : `⭐ Powered by FG98 https://wa.me/${conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%isdiamond/g, menu.diamond ? '(ⓓ)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.getName(conn.user.jid),
      sbot: (conn.user.jid == global.conn.user.jid ? '' : `\n▢ ✨ *Sub-Bot de:*\nwa.me/${global.conn.user.jid.split`@`[0]}`), 
      npmname: _package.name,
      npmdesc: _package.description,
      version: _package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      level, diamond, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    
    let pp = './src/fg_logo.jpg'

    /*conn.sendButton(m.chat, text.trim(), `▢ DyLux  ┃ ᴮᴼᵀ\n${mssg.ig}`, pp, [
      ['ꨄ︎ Apoyar', `${_p}donate`],
      ['⏍ Info', `${_p}botinfo`],
      ['⌬ Grupos', `${_p}gpdylux`]
    ], m, rpl)*/
    conn.sendFile(m.chat, pp, 'menu.jpg', text.trim(), m, null, rcanal)
  
    m.react('📚') 
    
  } catch (e) {
    conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error', m)
    throw e
  }
}
//handler.help = ['help']
//handler.tags = ['main']
handler.command = ['allmenu'] 
handler.register = false

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [d, 'd ', h, 'h ', m, 'm '].map(v => v.toString().padStart(2, 0)).join('')
}
