import ytdl from 'ytdl-core';
import fs from 'fs';
import { tmpdir } from 'os';
import path from 'path';

let handler = async (m, { conn, text }) => {
    if (!text) throw '❗ Por favor, proporciona un enlace de YouTube para descargar.';

    // Verificar si el enlace es un enlace válido de YouTube
    if (!ytdl.validateURL(text)) throw '❗ Enlace de YouTube no válido.';

    try {
        // Obtener información del video
        let info = await ytdl.getInfo(text);
        let format = ytdl.chooseFormat(info.formats, { quality: 'highest' });

        let videoTitle = info.videoDetails.title.replace(/[\/\?<>\\:\*\|":]/g, ''); // Limpiar el título del video
        let videoFileName = `${videoTitle}.mp4`;
        let videoFilePath = path.join(tmpdir(), videoFileName);

        // Descargar el video y guardarlo en el directorio temporal
        ytdl(text, { format: format })
            .pipe(fs.createWriteStream(videoFilePath))
            .on('finish', async () => {
                // Enviar el video al chat
                await conn.sendFile(m.chat, videoFilePath, videoFileName, `📥 Aquí está tu video descargado: *${videoTitle}*`, m);

                // Eliminar el archivo temporal después de enviarlo
                fs.unlinkSync(videoFilePath);
            })
            .on('error', (err) => {
                console.error(err);
                conn.reply(m.chat, '❗ Error al descargar el video.', m);
            });
    } catch (err) {
        console.error(err);
        if (err.statusCode === 410) {
            conn.reply(m.chat, '❗ El video solicitado ya no está disponible (Error 410).', m);
        } else {
            conn.reply(m.chat, '❗ Error al obtener la información del video.', m);
        }
    }
};

handler.command = /^2ytmp4$/i;
handler.owner = false; // Cualquier usuario puede usar este comando
export default handler;
