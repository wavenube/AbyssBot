import axios from 'axios';

const handler = async (m, { text, conn }) => {
    const [amount, from, to] = text.split(' ');
    if (!amount || isNaN(amount) || !from || !to) return conn.reply(m.chat, 'Por favor, proporciona una cantidad y las monedas. Ejemplo: `.convertir 100 USD EUR`', m);

    const API_KEY = 'tu_api_key_de_exchange_rate'; // Sustituye con tu propia API key de Exchange Rate API
    const URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`;

    try {
        const response = await axios.get(URL);
        const { conversion_rate, conversion_result } = response.data;

        const message = `💱 *Conversión de Moneda*\n\n` +
                        `💵 *${amount} ${from}* equivalen a *${conversion_result} ${to}*\n` +
                        `🔄 *Tasa de Cambio:* ${conversion_rate}`;

        conn.reply(m.chat, message, m);
    } catch (error) {
        conn.reply(m.chat, 'No se pudo realizar la conversión. Por favor, intenta de nuevo más tarde.', m);
        console.error(error);
    }
};

handler.command = /^convertir$/i;
handler.admin = false; // Permitir que todos los usuarios usen este comando
handler.owner = false;
export default handler;
