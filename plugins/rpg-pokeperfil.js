let handler = async function (m, { conn }) {
    let user = global.db.data.users[m.sender];
    if (!user.registered) throw '✳️ Primero debes registrarte. Usa el comando `.reg nombre+edad+género`.';

    let profile = `
┌─「 *Perfil de Usuario* 」
▢ *Nombre:* ${user.name}
▢ *Edad:* ${user.age}
▢ *Género:* ${user.genero}
▢ *Número de Serie:* ${createHash('md5').update(m.sender).digest('hex')}
└──────────────
`;

    conn.reply(m.chat, profile, m);
};

handler.command = /^pokeperfil$/i;
handler.register = true;
export default handler;
