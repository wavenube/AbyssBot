import { scheduleJob } from 'node-schedule';
import fs from 'fs';
import path from 'path';

// Directorio donde están las imágenes
const imagesDir = './src/galeria';

const handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (!args || args.length < 2) {
        throw `✳️ Uso correcto: ${usedPrefix + command} <tema> <intervalo_en_minutos>`;
    }

    const [tema, intervalo] = args;
    const intervaloMinutos = parseInt(intervalo);
    if (isNaN(intervaloMinutos) || intervaloMinutos <= 0) {
        throw `❎ El intervalo debe ser un número positivo en minutos.`;
    }

    // Define el directorio de imágenes basado en el tema
    const galeriaPath = path.join(imagesDir, tema);
    if (!fs.existsSync(galeriaPath)) {
        throw `❎ El tema ${tema} no existe.`;
    }

    // Lista de imágenes en el directorio del tema
    const imagenes = fs.readdirSync(galeriaPath).filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
    if (imagenes.length === 0) {
        throw `❎ No hay imágenes en el tema ${tema}.`;
    }

    // Cancela trabajos anteriores si existen
    if (global.imageJobs && global.imageJobs[m.chat]) {
        global.imageJobs[m.chat].cancel();
    }

    // Define la tarea programada
    global.imageJobs = global.imageJobs || {};
    global.imageJobs[m.chat] = scheduleJob(`*/${intervalo} * * * *`, async () => {
        const imageFile = path.join(galeriaPath, imagenes[Math.floor(Math.random() * imagenes.length)]);
        await conn.sendFile(m.chat, imageFile, path.basename(imageFile), `📸 Imagen del tema ${tema}`, m);
    });

    conn.reply(m.chat, `✅ El envío de imágenes del tema ${tema} ha comenzado. Intervalo: ${intervalo} minutos.`, m);
};

handler.help = ['startgallery <tema> <intervalo>'];
handler.tags = ['media'];
handler.command = ['startgallery'];

export default handler;
