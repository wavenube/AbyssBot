import axios from 'axios';

// URL de la Meme API
const MEME_API_URL = 'https://meme-api.com/gimme';

const handler = async (m, { conn }) => {
    try {
        // Hacer la solicitud a la API para obtener un meme aleatorio
        const response = await axios.get(MEME_API_URL);
        const meme = response.data;

        // Verificar si la API devolvió un meme válido
        if (meme && meme.url) {
            // Enviar el meme al chat
            await conn.sendMessage(m.chat, { image: { url: meme.url }, caption: meme.title }, { quoted: m });
        } else {
            // Enviar un mensaje de error si no se pudo obtener un meme
            m.reply('No se pudo obtener un meme en este momento, por favor intenta más tarde.');
        }
    } catch (error) {
        // Manejo de errores
        m.reply('Hubo un error al obtener el meme. Por favor intenta más tarde.');
        console.error(error);
    }
}

handler.command = /^meme$/i;
handler.group = false; // El comando se puede usar en chats individuales
handler.help = ['meme'];
handler.tags = ['fun'];

export default handler;
