import { promises } from 'fs';
import { join, dirname } from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { xpRange } from '../lib/levelling.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let handler = async function (m, { conn, text, usedPrefix }) {
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

    let textTemplate = `
◈ ━━━━━ Senna  ┃ ᴮᴼᵀ ━━━━━ ◈

👋🏻 Hola! *%name*
👥 Usuarios : %totalreg
🟢 Tiempo activo : %muptime
%sbot

▢ ADD
* https://instagram.com/fg98_ff

* https://fgmods.xyz

────────────

≡ Use estos comandos sin el prefijo: *${usedPrefix}*
...
` // Resto del mensaje

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
    
    let pp = './src/fg_logo.jpg';

    await conn.sendFile(m.chat, pp, 'menu.jpg', text.trim(), m, null, { thumbnail: null });
    m.react('📚');
    
  } catch (e) {
    conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error', m);
    throw e;
  }
};

handler.command = ['allmenu'];
handler.register = false;

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
