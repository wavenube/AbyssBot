import axios from 'axios';

const QUOTE_API_URL = 'https://api.quotable.io/random';

const handler = async (m, { conn }) => {
    try {
        // Obtener una cita aleatoria
        const response = await axios.get(QUOTE_API_URL);
        const quote = response.data;

        // Enviar la cita al chat
        const message = `📜 *Cita del Día*\n\n"${quote.content}"\n\n- ${quote.author}`;
        await conn.sendMessage(m.chat, { text: message }, { quoted: m });
    } catch (error) {
        m.reply('Hubo un error al obtener la cita. Por favor intenta más tarde.');
        console.error(error);
    }
};

handler.command = /^(quote|cita)$/i;
handler.group = false; // Puede ser usado en chats individuales
handler.help = ['quote'];
handler.tags = ['fun'];

export default handler;
