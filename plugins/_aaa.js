import axios from 'axios';

const handler = async (m, { conn }) => {
    const URL = 'https://official-joke-api.appspot.com/random_joke';

    try {
        const response = await axios.get(URL);
        const { setup, punchline } = response.data;

        const message = `😂 *Chiste del Día*\n\n` +
                        `🃏 ${setup}\n\n` +
                        `🤣 ${punchline}`;

        conn.reply(m.chat, message, m);
    } catch (error) {
        conn.reply(m.chat, 'No se pudo obtener un chiste. Por favor, intenta de nuevo más tarde.', m);
        console.error(error);
    }
};

handler.command = /^chiste$/i;
handler.admin = false; // Permitir que todos los usuarios usen este comando
handler.owner = false;
export default handler;
