import axios from 'axios';

const DANCE_GIF_API_URL = 'https://api.giphy.com/v1/gifs/random?api_key=YOUR_API_KEY&tag=dance';

const handler = async (m, { conn }) => {
    try {
        const response = await axios.get(DANCE_GIF_API_URL);
        const gifUrl = response.data.data.image_original_url;
        await conn.sendMessage(m.chat, { image: { url: gifUrl }, caption: '¡Es hora de bailar!' }, { quoted: m });
    } catch (error) {
        m.reply('Hubo un error al obtener el GIF de baile. Por favor intenta más tarde.');
        console.error(error);
    }
};

handler.command = /^dance$/i;
handler.group = true;
handler.help = ['dance'];
handler.tags = ['fun'];

export default handler;
