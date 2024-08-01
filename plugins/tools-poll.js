import axios from 'axios';

const FACT_API_URL = 'https://api.api-ninjas.com/v1/facts?limit=1';

const handler = async (m, { conn }) => {
    try {
        const response = await axios.get(FACT_API_URL, {
            headers: { 'X-Api-Key': 'YOUR_API_KEY' } // Reemplaza con tu clave API
        });
        const fact = response.data[0].fact;
        await conn.sendMessage(m.chat, { text: `🧐 Dato Curioso: ${fact}` }, { quoted: m });
    } catch (error) {
        m.reply('Hubo un error al obtener el dato curioso. Por favor intenta más tarde.');
        console.error(error);
    }
};

handler.command = /^fact$/i;
handler.group = true;
handler.help = ['fact'];
handler.tags = ['fun'];

export default handler;
