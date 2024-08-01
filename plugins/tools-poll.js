import axios from 'axios';

const QUOTE_API_URL = 'https://api.quotable.io/random';

const handler = async (m, { conn }) => {
    try {
        const response = await axios.get(QUOTE_API_URL);
        const quote = response.data;
        const message = `"${quote.content}" — ${quote.author}`;
        await conn.sendMessage(m.chat, { text: message }, { quoted: m });
    } catch (error) {
        m.reply('Hubo un error al obtener la cita. Por favor intenta más tarde.');
        console.error(error);
    }
};

handler.command = /^quote$/i;
handler.group = true;
handler.help = ['quote'];
handler.tags = ['fun'];

export default handler;
