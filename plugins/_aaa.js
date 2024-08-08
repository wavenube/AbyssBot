import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';

const wm = 'NombreDelBot'; // Define aquí la marca o nombre de tu bot
const img = 'URL_O_RUTA_DE_IMAGEN'; // Define una imagen si la usas en contextInfo
const redes = 'URL_O_RUTA_DE_RED_SOCIAL'; // Define un URL si es necesario

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `*🤔 ¿Qué estás buscando? 🤔*\n*Ingresa el nombre de la canción*\n\n*Ejemplo:*\n${usedPrefix}play emilia 420`, m, { 
        contextInfo: { 
            externalAdReply : { 
                mediaUrl: null, 
                mediaType: 1, 
                description: null, 
                title: wm, 
                body: '', 
                previewType: 0, 
                thumbnail: img.getRandom(), 
                sourceUrl: redes.getRandom()
            }
        }
    });

    const yt_play = await search(args.join(' '));
    const texto1 = `📌 *Título* : ${yt_play[0].title}\n📆 *Publicado:* ${yt_play[0].ago}\n⌚ *Duración:* ${secondString(yt_play[0].duration.seconds)}`.trim();

    let buttons = [['Audio', `${usedPrefix}ytmp3 ${yt_play[0].url}`], ['Video', `${usedPrefix}ytmp4 ${yt_play[0].url}`]];
    
    if (command === 'play3' || command === 'play4') {
        const texto2 = `👀 *Vistas:* ${MilesNumber(yt_play[0].views)}`;
        texto1 += `\n${texto2}`;
        buttons.push(['Más resultados', `${usedPrefix}yts ${text}`]);
    }

    await conn.sendButton(m.chat, texto1, wm, yt_play[0].thumbnail, buttons, null, null, m);
}

handler.help = ['play', 'play2', 'play3', 'play4'];
handler.tags = ['downloader'];
handler.command = ['playto', 'play2', 'play3', 'play4'];
//handler.limit = 3
handler.register = true;

export default handler;

async function search(query, options = {}) {
    const search = await yts.search({ query, hl: 'es', gl: 'ES', ...options });
    return search.videos;
}

function MilesNumber(number) {
    const exp = /(\d)(?=(\d{3})+(?!\d))/g;
    const rep = '$1.';
    const arr = number.toString().split('.');
    arr[0] = arr[0].replace(exp, rep);
    return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
    seconds = Number(seconds);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
    const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
    const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
    const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
    return dDisplay + hDisplay + mDisplay + sDisplay;
}
