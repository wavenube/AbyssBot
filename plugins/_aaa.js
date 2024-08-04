import figlet from 'figlet';

let handler = async (m, { conn, text }) => {
    if (!text) throw '❗ Por favor, proporciona un texto para convertir en arte ASCII.';

    // Generar el arte ASCII
    figlet(text, (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        conn.reply(m.chat, '```' + data + '```', m);
    });
};

handler.command = /^asciiart$/i;
handler.owner = false; // No es necesario que solo el propietario del bot pueda usar este comando
export default handler;
