import { scheduleJob } from 'node-schedule';
import fs from 'fs';

let handler = async (m, { conn }) => {
    const animes = [
        { name: 'Naruto Uzumaki', image: 'https://example.com/naruto.jpg' },
        { name: 'Sakura Haruno', image: 'https://example.com/sakura.jpg' },
        // Añade más personajes de anime con sus imágenes aquí
    ];

    if (!global.animeQueue) global.animeQueue = [];

    // Schedule job to send anime character every 5 minutes
    scheduleJob('*/5 * * * *', async () => {
        let allChats = Object.keys(conn.chats);

        for (let chatId of allChats) {
            if (chatId.endsWith('@g.us')) {
                let randomAnime = animes[Math.floor(Math.random() * animes.length)];
                global.animeQueue.push(randomAnime);

                await conn.sendFile(chatId, randomAnime.image, 'anime.jpg', `📸 ¡Nuevo personaje de anime! Usa el comando *capturar ${randomAnime.name}* para añadirlo a tu Pokédex.`, m);
            }
        }
    });

    conn.reply(m.chat, 'El envío automático de personajes de anime ha sido activado.', m);
};

handler.command = /^startanime2$/i;
handler.owner = true; // Solo el propietario del bot puede usar este comando para evitar spam
export default handler;
