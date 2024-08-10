import yts from 'yt-search';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!text) return conn.reply(m.chat, `*🤔 ¿Qué estás buscando?*\n*Ingrese el nombre de la canción*\n\n*Ejemplo:*\n#play emilia 420`, m);

  const yt_play = await search(args.join(' '));
  if (yt_play.length === 0) return conn.reply(m.chat, '⚠️ No se encontraron resultados.', m);

  const video = yt_play[0];
  const texto1 = `📌 *Título*: ${video.title}\n📆 *Publicado*: ${video.ago}\n⌚ *Duración*: ${secondString(video.duration.seconds)}`;

  const buttons = [
    { buttonId: `${usedPrefix}ytmp3 ${video.url}`, buttonText: { displayText: 'Audio' }, type: 1 },
    { buttonId: `${usedPrefix}ytmp4 ${video.url}`, buttonText: { displayText: 'Video' }, type: 1 },
  ];

  if (command === 'play3' || command === 'play4') {
    texto1 += `\n👀 *Vistas*: ${MilesNumber(video.views)}`;
    buttons.push({ buttonId: `${usedPrefix}yts ${text}`, buttonText: { displayText: 'Más resultados' }, type: 1 });
  }

  const buttonMessage = {
    image: { url: video.thumbnail },
    caption: texto1,
    footer: '',
    buttons: buttons,
    headerType: 4,
  };

  await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
};

handler.help = ['play', 'play2', 'play3', 'play4'];
handler.tags = ['downloader'];
handler.command = ['play', 'play2', 'play3', 'play4'];
export default handler;

async function search(query, options = {}) {
  const searchResults = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
  return searchResults.videos;
}

function MilesNumber(number) {
  const exp = /(\d)(?=(\d{3})+(?!\d))/g;
  return number.toString().replace(exp, '$1.');
}

function secondString(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${d > 0 ? `${d} día${d > 1 ? 's' : ''}, ` : ''}${h > 0 ? `${h} hora${h > 1 ? 's' : ''}, ` : ''}${m > 0 ? `${m} minuto${m > 1 ? 's' : ''}, ` : ''}${s > 0 ? `${s} segundo${s > 1 ? 's' : ''}` : ''}`.trim();
}
