import axios from 'axios';

const COINFLIP_API_URL = 'https://random-coin-flip-api.herokuapp.com/flip';

const handler = async (m, { conn }) => {
    try {
        const response = await axios.get(COINFLIP_API_URL);
        const result = response.data.result ? 'Cara' : 'Cruz';
        await conn.sendMessage(m.chat, { text: `🪙 El resultado es: ${result}` }, { quoted: m });
    } catch (error) {
        m.reply('Hubo un error al lanzar la moneda. Por favor intenta más tarde.');
        console.error(error);
    }
};

handler.command = /^coinflip$/i;
handler.group = true;
handler.help = ['coinflip'];
handler.tags = ['fun'];

export default handler;
