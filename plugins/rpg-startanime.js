import { scheduleJob } from 'node-schedule';

let handler = async (m, { conn }) => {
    const animes = [
        { name: 'Naruto Uzumaki', image: 'https://example.com/naruto.jpg' },
        { name: 'Sakura Haruno', image: 'https://example.com/sakura.jpg' },
        // Añade más personajes de anime con sus imágenes aquí
    ];

    scheduleJob('*/5 * * * *', async () => {
        let allChats = Object.keys(conn.chats);

        for (let chatId of allChats) {
            if (chatId.endsWith('@g.us')) {
                let randomAnime = animes[Math.floor(Math.random() * animes.length)];
                await conn.sendFile(chatId, randomAnime.image, 'anime.jpg', `📸 ¡Nuevo personaje de anime! Usa el comando *capturar* para añadirlo a tu Pokédex.`, m);
            }
        }
    });
};

handler.command = /^startanime$/i;
handler.owner = true; // Solo el propietario del bot puede usar este comando para evitar spam
export default handler;
