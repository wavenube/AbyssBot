import ytdl from 'ytdl-core';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import os from 'os';
import path from 'path';

const streamPipeline = promisify(pipeline);

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (!args || !args[0]) throw `✳️ Por favor, proporciona un enlace de YouTube. Uso: ${usedPrefix + command} https://youtu.be/YzkTFFwxtXI`;
    if (!args[0].match(/youtu/gi)) throw `❎ Enlace de YouTube no válido.`;

    m.react('⌛'); // Reacción de espera

    try {
        const videoInfo = await ytdl.getInfo(args[0]);
        const { title, video_url } = videoInfo.videoDetails;
        const videoFilePath = path.join(os.tmpdir(), `${title}.mp4`);

        const videoStream = ytdl(args[0], { quality: 'highestvideo' });

        await streamPipeline(videoStream, fs.createWriteStream(videoFilePath));

        await conn.sendFile(m.chat, videoFilePath, `${title}.mp4`, `📥 Aquí está tu video descargado: *${title}*`, m);

        fs.unlinkSync(videoFilePath); // Eliminar el archivo temporal después de enviarlo

        m.react('✅'); // Reacción de éxito
    } catch (err) {
        console.error(err);
        conn.reply(m.chat, `❗ Error al descargar el video: ${err.message}`, m);
        m.react('❌'); // Reacción de error
    }
};

handler.command = /^2ytmp4$/i;
handler.owner = false; // Cualquier usuario puede usar este comando
export default handler;
