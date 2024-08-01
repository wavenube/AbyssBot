import genius from 'genius-lyrics';
const GeniusClient = new genius.Client('YOUR_GENIUS_API_TOKEN');

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    if (!text) throw `✳️ ${mssg.example} *${usedPrefix + command}* canción nombre`;

    m.react('🎶');

    let searches = await GeniusClient.songs.search(text);
    if (searches.length === 0) {
        throw `No se encontraron resultados para *${text}*. Intenta con otro nombre de canción.`;
    }

    let song = searches[0];
    let lyrics = await song.lyrics();

    let resultText = `
≡ *LETRA DE LA CANCIÓN*
┌─⊷ *${song.fullTitle}*
▢ *Artista:* ${song.artist.name}
▢ *Título:* ${song.title}
└──────────────

${lyrics}
    `;

    await conn.sendMessage(m.chat, resultText, m);

};

handler.help = ['letra']
handler.tags = ['info']
handler.command = ['letra', 'lyrics', 'lyric'] 

export default handler;
