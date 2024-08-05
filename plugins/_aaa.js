import fetch from 'node-fetch';

const handler = async (m, { conn, args }) => {
    const category = args[0] || 'random'; // Puedes especificar una categoría o dejarlo como random
    const apiKey = 'x4zQNrX1hM-Qy5xwG1rr447zBqp7PIg-ChqDLr8qK3';
    
    const url = `https://api.night-api.com/images/nsfw?category=${category}`;
    try {
        const response = await fetch(url, {
            headers: {
                authorization: apiKey
            }
        });
        
        if (!response.ok) {
            throw new Error(`Error en la API: ${response.statusText}`);
        }

        const data = await response.json();
        const imageUrl = data.content.url;

        await conn.sendFile(m.chat, imageUrl, 'nsfw.jpg', `📸 Imagen NSFW de categoría ${category}`, m);
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, `❎ No se pudo obtener la imagen.`, m);
    }
};

handler.help = ['nsfw <category>'];
handler.tags = ['nsfw'];
handler.command = ['pnsfw'];

handler.register = true; // Si es necesario registrarse para usar el comando
handler.group = true; // Si el comando debe ser usado solo en grupos

export default handler;
