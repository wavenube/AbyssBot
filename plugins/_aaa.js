const handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const res = global.lolivid[Math.floor(Math.random() * global.lolivid.length)];
    conn.sendMessage(m.chat, { video: { url: res }, caption: 'Aquí tienes un video random de lolis.' }, { quoted: m });
  } catch (e) {
    console.error(e);
    m.reply('❎ Error al enviar el video.');
  }
};

handler.help = ['lolivid'];
handler.tags = ['random'];
handler.command = /^(lolivid|lolivideos|lolívid)$/i;
export default handler;

global.lolivid = [
  'https://youtu.be/0-y2_TmfQCc?si=HvODsQ1l1oGDYdDd'
  ];
