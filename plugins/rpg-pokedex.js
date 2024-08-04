let handler = async function (m, { conn }) {
    let user = global.db.data.users[m.sender];
    if (!user.registered) throw '✳️ Primero debes registrarte. Usa el comando `.reg nombre+edad+género`.';

    let pokedex = user.pokedex || [];
    if (pokedex.length === 0) return conn.reply(m.chat, 'No tienes personajes en tu Pokédex. Captura algunos personajes primero.', m);

    let message = '📖 *Tu Pokédex de Anime* 📖\n\n';
    for (let i = 0; i < pokedex.length; i++) {
        message += `📌 *${i + 1}. ${pokedex[i].name}*\n`;
    }
    
    conn.reply(m.chat, message, m);
};

handler.command = /^pokedex$/i;
handler.register = true;
export default handler;
