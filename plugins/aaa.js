import axios from 'axios';

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const WEATHER_API_KEY = 'a359ec4c8f438594900cb9b05f4617a9'; // Reemplaza con tu clave API

const handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Por favor proporciona el nombre de la ciudad.');

    try {
        const response = await axios.get(WEATHER_API_URL, {
            params: {
                q: text,
                appid: WEATHER_API_KEY,
                units: 'metric'
            }
        });
        const weather = response.data;
        const message = `🌤️ Clima en ${weather.name}:
        - Temperatura: ${weather.main.temp}°C
        - Descripción: ${weather.weather[0].description}
        - Humedad: ${weather.main.humidity}%
        - Viento: ${weather.wind.speed} m/s`;
        await conn.sendMessage(m.chat, { text: message }, { quoted: m });
    } catch (error) {
        m.reply('Hubo un error al obtener el clima. Por favor intenta más tarde.');
        console.error(error);
    }
};

handler.command = /^weather$/i;
handler.group = true;
handler.help = ['weather'];
handler.tags = ['fun'];

export default handler;
