let handler = async function (m, { conn, text }) {
    let user = global.db.data.users[m.sender];
    if (!user.registered) throw '✳️ Primero debes registrarte. Usa el comando `.reg nombre+edad+género`.';

    if (!text) return conn.reply(m.chat, 'Por favor, proporciona el nombre del personaje que quieres capturar. Ejemplo: `.capturar Naruto Uzumaki`', m);

    let characterName = text.trim();
    if (!global.animeQueue || !global.animeQueue.find(anime => anime.name.toLowerCase() === characterName.toLowerCase())) {
        return conn.reply(m.chat, 'Personaje no encontrado o no disponible para capturar. Asegúrate de escribir el nombre correctamente.', m);
    }

    let character = global.animeQueue.find(anime => anime.name.toLowerCase() === characterName.toLowerCase());
    user.pokedex = user.pokedex || [];
    if (user.pokedex.find(p => p.name === character.name)) return conn.reply(m.chat, 'Ya has capturado a este personaje.', m);

    user.pokedex.push(character);
    conn.reply(m.chat, `🎉 ¡Has capturado a *${character.name}*!`, m);
};

handler.command = /^capturar$/i;
handler.register = true;
export default handler;
