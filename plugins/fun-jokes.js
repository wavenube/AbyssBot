import axios from 'axios';

const JOKE_API_URL = 'https://official-joke-api.appspot.com/random_joke';

const handler = async (m, { conn }) => {
    try {
        const response = await axios.get(JOKE_API_URL);
        const joke = response.data;
        const message = `${joke.setup}\n\n${joke.punchline}`;
        await conn.sendMessage(m.chat, { text: message }, { quoted: m });
    } catch (error) {
        m.reply('Hubo un error al obtener el chiste. Por favor intenta más tarde.');
        console.error(error);
    }
};

handler.command = /^joke$/i;
handler.group = true;
handler.help = ['joke'];
handler.tags = ['fun'];

export default handler;
