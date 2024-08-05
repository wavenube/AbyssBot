import { scheduleJob } from 'node-schedule';
import fetch from 'node-fetch';

const handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (!args || args.length < 1) {
        throw `✳️ Uso correcto: ${usedPrefix + command} <intervalo>`;
    }

    const intervalo = args[0];
    const match = intervalo.match(/^(\d+)([smhd])$/);

    if (!match) {
        throw `❎ El intervalo debe estar en el formato <número><s|m|h|d> (ejemplo: 5m para 5 minutos).`;
    }

    const cantidad = parseInt(match[1]);
    const unidad = match[2];

    // Convertir el intervalo a cron format
    let cronExp;
    switch (unidad) {
        case 's':
            cronExp = `*/${cantidad} * * * * *`;
            break;
        case 'm':
            cronExp = `*/${cantidad} * * * *`;
            break;
        case 'h':
            cronExp = `0 */${cantidad} * * *`;
            break;
        case 'd':
            cronExp = `0 0 */${cantidad} * *`;
            break;
    }

    // URL de ejemplo para obtener imágenes aleatorias (reemplázala por una URL válida)
    const galleryURL = 'https://api.waifu.pics/sfw/waifu';

    // Cancela trabajos anteriores si existen
    if (global.imageJobs && global.imageJobs[m.chat]) {
        global.imageJobs[m.chat].cancel();
    }

    // Define la tarea programada
    global.imageJobs = global.imageJobs || {};
    global.imageJobs[m.chat] = scheduleJob(cronExp, async () => {
        try {
            const response = await fetch(galleryURL);
            if (!response.ok) throw new Error(`Error en la galería: ${response.statusText}`);
            const image = await response.json();
            if (!image.url) throw new Error('No se encontró URL de imagen en la respuesta');

            await conn.sendFile(m.chat, image.url, 'image.jpg', `📸 Imagen aleatoria`, m);
        } catch (error) {
            console.error(`Error enviando imagen: ${error.message}`);
        }
    });

    conn.reply(m.chat, `✅ El envío de imágenes aleatorias ha comenzado. Intervalo: ${intervalo}.`, m);
};

handler.help = ['startgallery <intervalo>'];
handler.tags = ['media'];
handler.command = ['startgallery'];

export default handler;
