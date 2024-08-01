import axios from 'axios';

const NAME_API_URL = 'https://randomuser.me/api/';

const handler = async (m, { conn }) => {
    try {
        // Obtener un nombre aleatorio
        const response = await axios.get(NAME_API_URL);
        const name = response.data.results[0].name;

        // Enviar el nombre al chat
        const message = `👤 *Nombre Aleatorio*\n\nNombre: ${name.first} ${name.last}`;
        await conn.sendMessage(m.chat, { text: message }, { quoted: m });
    } catch (error) {
        m.reply('Hubo un error al obtener el nombre. Por favor intenta más tarde.');
        console.error(error);
    }
};

handler.command = /^(name|nombre)$/i;
handler.group = false; // Puede ser usado en chats individuales
handler.help = ['name'];
handler.tags = ['fun'];

export default handler;
