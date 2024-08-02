// menu.js
import { promises } from 'fs';
import { join, dirname } from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { xpRange } from '../lib/levelling.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

global.menuState = global.menuState || 1; // Inicializamos el estado del menú

let handler = async function (m, { conn, text, usedPrefix }) {
  if (global.menuState === 1) {
    global.menuState = 2; // Cambiamos al menú 2 para la próxima vez
    // Contenido del Menú 1
    try {
      let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {};
      let { exp, diamond, level, role } = global.db.data.users[m.sender];
      let { min, xp, max } = xpRange(level, global.multiplier);
      let name = await conn.getName(m.sender);
      let d = new Date(new Date() + 3600000);
      let locale = 'es';
      let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5];
      let week = d.toLocaleDateString(locale, { weekday: 'long' });
      let date = d.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(d);
      let time = d.toLocaleTimeString(locale, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      });
      let _uptime = process.uptime() * 1000;
      let _muptime;
      if (process.send) {
        process.send('uptime');
        _muptime = await new Promise(resolve => {
          process.once('message', resolve);
          setTimeout(resolve, 1000);
        }) * 1000;
      }
      let muptime = clockString(_muptime);
      let uptime = clockString(_uptime);
      let totalreg = Object.keys(global.db.data.users).length;
      let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length;

      let textTemplate = `.╭━━❍Abyss - Bot❍━━╮
 ┃ ╭━━━━━━━━━━━━━━━━╮ 
 ┃ ┃ ╭┈────────────╮ 
 ┃ ┃ │❍ 🅼🅴🅽🆄 ❍ 
 ┃ ┃ ╰┈────────────╯ 
 ┃ ╰━━━━━━━━━━━━━━━━╯ 
 ┣━━━▢ ʙᴜᴇɴᴀꜱ, *%name*• 
 ┃╭━━━━━━━━━━━━━━━━╾• 
 ┃┃  ❍ 1.0 ❍ 
 ┃┣━━━━━━━━━━━━━━━━╾• 
 ┃┃ ⋄ ᴄʀᴇᴀᴅᴏʀ ᴅᴇʟ ʙᴏᴛ:  Shizu-Hub 
 ┃┃ ⋄ ꜰᴇᴄʜᴀ » %date
 ┃┃ ⋄ ᴛɪᴇᴍᴘᴏ ᴀᴄᴛɪᴠᴏ » %muptime %sbot
 ┃┃ ⋄ ʟᴇɴɢᴜᴀᴊᴇ » ꜱᴘᴀɴɪꜱʜ 
 ┃┃ ⋄ ᴜꜱᴜᴀʀɪᴏꜱ » %totalreg
 ┃╰━━━━━━━━━━━━━━━━╾• 
 ╰━━━╼Abyss - Bot╾━━━╯ 

 ╭━━━━━━━━━━━━━━━━╮
     INFO DEL USUARIO          
 ╭━━━━━━━━━━━━━━━━╯
 ║👤 NOMBRE: %name 
 ║🧰 EXPERIENCIA ➟ %exp
 ║⚓ RANGO ➟ %role
 ║💎 DIAMANTES ➟ %diamond 
 ╰═══════════════ ✧ 

 ╭━━━━━━━━━━━━━━━━
 ║ Ⓟ = Premium
 ║ ⓓ = Diamantes
 ╰═══════════════ ✧ 
⬛᭢━━━━━━━━━᭥⬛᭢
╭─「ACERCA DE」
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

⬛᭢━━━━━━━━━᭥⬛᭢
╭─「SUB BOTS」
▢ .botclone
▢ .botlist
▢ .txbot
▢ .stop
└───────────

⬛᭢━━━━━━━━━᭥⬛᭢
╭─「JUEGOS」
▢ .dado
▢ .mates <modo>
▢ .ppt
▢ .slot <apuesta>
└───────────

⬛᭢━━━━━━━━━᭥⬛᭢
╭─「NIVEL & ECONOMIA」
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

⬛᭢━━━━━━━━━᭥⬛᭢
╭─「REGISTRO」
▢ .reg <nombre.edad.género>
▢ .mysn
▢ .unreg <Num Serie>
└───────────

⬛᭢━━━━━━━━━᭥⬛᭢
╭─「STICKER」
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

⬛᭢━━━━━━━━━᭥⬛᭢
╭─「IMAGEN」
▢ .tvid (ⓓ)
▢ .couple (ⓓ)
▢ .imagen (ⓓ)
▢ .girl (ⓓ)
▢ .meme
▢ .person
▢ .pinterest
▢ .wallpaper (ⓓ)
└───────────

⬛᭢━━━━━━━━━᭥⬛᭢
╭─「MAKER」
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

⬛᭢━━━━━━━━━᭥⬛᭢
╭─「PREMIUM」
▢ .gdrive (ⓓ)
▢ .mediafire <url> (ⓓ)
▢ .xnxx (ⓓ)
└───────────

⬛᭢━━━━━━━━━᭥⬛᭢
╭─「GRUPO」
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

⬛᭢━━━━━━━━━᭥⬛᭢
╭─「EN/DISABLE OPCIONES」
▢ .enable <option>
▢ .disable <option>
└───────────

⬛᭢━━━━━━━━━᭥⬛᭢
╭─「ANIME」
▢ .waifu (ⓓ)
▢ .neko (ⓓ)
▢ .megumin (ⓓ)
▢ .loli (ⓓ)
└───────────

⬛᭢━━━━━━━━━᭥⬛᭢
╭─「ANIME REACCION」
▢ .kill @tag (ⓓ)
▢ .kiss @tag (ⓓ)
▢ .pat @tag (ⓓ)
▢ .slap @tag (ⓓ)
└───────────

⬛᭢━━━━━━━━━᭥⬛᭢
╭─「DESCARGAS」
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
└───────────

⬛᭢━━━━━━━━━᭥⬛᭢
╭─「HERRAMIENTAS」
▢ .fetch
▢ .gemini
▢ .calc
▢ .google
▢ .letra/lyrics
▢ .openai
▢ .raid (admin - warn)
▢ .randomname
▢ .readmore
▢ .readviewonce
▢ .ssweb
▢ .tourl
▢ .translate
▢ .tts
▢ .wikipedia
└───────────`;

      let replace = {
        '%': '%',
        p: usedPrefix, uptime, muptime,
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
      };

      let text = textTemplate.replace(/%(\w+)/g, (_, key) => '' + (replace[key] || ''));
      
      let pp = './src/abyss.png';

      conn.sendFile(m.chat, pp, './src/abyss3.png', text.trim(), m, null, rcanal)
    
      m.react('📚')
      
    } catch (e) {
      conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error', m);
      throw e;
    }
  } else {
    global.menuState = 1; // Cambiamos al menú 1 para la próxima vez
    // Contenido del Menú 2
    let mainMessage = 'Selecciona el menú que deseas obtener:';
    let listSections = [
        {
            title: "TODOS LOS MENÚS",
            rows: [
                {
                    title: "ALLMENU",
                    description: "Se muestra el menú general del Bot.",
                    id: `${usedPrefix}allmenu`
                },
                {
                    title: "MENU AUDIO",
                    description: "Se muestra un menú solo con los audios que trae incorporado el Bot.",
                    id: `${usedPrefix}menuaudio`
                },
                {
                    title: "MENU GRUPO",
                    description: "Se envían únicamente las opciones de gestión de grupo.",
                    id: `${usedPrefix}menugrupo`
                },
                {
                    title: "MENU RESTRICT",
                    description: "Se usa para activar el modo gestión de grupo.",
                    id: `${usedPrefix}enable`
                },
                {
                    title: "MENU ACERCA-DE",
                    description: "Se muestra un menú con info variada.",
                    id: `${usedPrefix}acercademenu`
                },
                {
                    title: "MENU ANIME",
                    description: "Se muestra un menú de generación de imágenes anime.",
                    id: `${usedPrefix}animemenu`
                }
            ]
        }
    ];

    // Enviar el menú desplegable
    await conn.sendList(m.chat, '  ≡ *Menú Desplegable*', `\n ${mainMessage}`, 'Selecciona una opción', null, listSections, m);
  }
};

handler.help = ['menu', 'help'];
handler.tags = ['main'];
handler.command = ['menu', 'help'];

export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

function clockString(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [d, 'd ', h, 'h ', m, 'm '].map(v => v.toString().padStart(2, 0)).join('');
}
