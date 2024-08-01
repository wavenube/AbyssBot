const handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Por favor proporciona la pregunta de la encuesta y las opciones. Ejemplo: *poll ¿Cuál es tu color favorito? Azul, Verde, Rojo*');

    const parts = text.split(',');
    if (parts.length < 2) return m.reply('Debes proporcionar al menos una opción.');

    const question = parts.shift().trim();
    const options = parts.map((option, index) => `${index + 1}. ${option.trim()}`).join('\n');

    await conn.sendMessage(m.chat, {
        text: `📊 *Encuesta:* ${question}\n\n${options}\n\nResponde con el número de la opción que prefieres.`,
    }, { quoted: m });
};

handler.command = /^poll$/i;
handler.group = true;
handler.help = ['poll'];
handler.tags = ['fun'];

export default handler;
