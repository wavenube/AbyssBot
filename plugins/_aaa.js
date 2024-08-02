import { geniusSearch } from 'delirius-api';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import { pipeline } from 'stream';
import { promisify } from 'util';
import fs from 'fs';
import os from 'os';

const streamPipeline = promisify(pipeline);

let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) throw `✳️ Ejemplo: *${usedPrefix + command}* Taylor Swift Love Story`;

    // Buscar la canción en Genius
    let geniusRes = await geniusSearch(text);
    if (!geniusRes || !geniusRes.hits || !geniusRes.hits.length) throw `✳️ Canción no encontrada`;

    // Buscar el video en YouTube
    let ytRes = await yts(text);
    let vid = ytRes.videos[0];
    if (!vid) throw `✳️ Vídeo no encontrado`;

    // Descargar el audio del video de YouTube
    const audioStream = ytdl(vid.url, { filter: 'audioonly', quality: 'highestaudio' });
    const tmpDir = os.tmpdir();
    const audioFilePath = `${tmpDir}/${vid.title}.mp3`;

    await streamPipeline(audioStream, fs.createWriteStream(audioFilePath));

    // Enviar el audio
    let message = `
    ≡ *FG MUSIC*
    ┌──────────────
    ▢ 📌 *Título:* ${vid.title}
    ▢ 📆 *Subido:* ${vid.ago}
    ▢ ⌚ *Duración:* ${vid.timestamp}
    ▢ 👀 *Vistas:* ${vid.views.toLocaleString()}
    └──────────────
    `;
    await conn.sendFile(m.chat, audioFilePath, `${vid.title}.mp3`, message, m);

    // Eliminar el archivo temporal
    fs.unlinkSync(audioFilePath);
};

handler.help = ['play3'];
handler.tags = ['music'];
handler.command = ['play3'];

export default handler;
