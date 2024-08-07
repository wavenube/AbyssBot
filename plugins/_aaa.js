import ytdl from 'ytdl-core';
import { exec } from 'child_process';
import { writeFile } from 'fs';
import path from 'path';

const handler = async (m, { conn, args }) => {
  if (!args[0]) {
    m.reply('❎ Por favor proporciona un enlace de YouTube.');
    return;
  }

  const url = args[0];
  if (!ytdl.validateURL(url)) {
    m.reply('❎ Por favor proporciona un enlace válido de YouTube.');
    return;
  }

  try {
    m.reply('⏳ Descargando video, por favor espera...');
    const videoId = ytdl.getURLVideoID(url);
    const outputPath = path.resolve(`./downloads/${videoId}.mp4`);
    
    const videoStream = ytdl(url, { quality: 'highestvideo' });
    
    videoStream.pipe(writeFile(outputPath, (err) => {
      if (err) {
        console.error(err);
        m.reply('❎ Error al descargar el video.');
        return;
      }

      conn.sendMessage(m.chat, { video: { url: outputPath }, caption: 'Aquí tienes tu video.' }, { quoted: m })
        .then(() => {
          // Elimina el archivo después de enviarlo
          fs.unlinkSync(outputPath);
        })
        .catch(err => {
          console.error(err);
          m.reply('❎ Error al enviar el video.');
        });
    }));
    
  } catch (e) {
    console.error(e);
    m.reply('❎ Error al procesar el video.');
  }
};

handler.help = ['downloadvideo'];
handler.tags = ['tools'];
handler.command = /^(downloadvideo|dlvideo|ytvideo)$/i;

export default handler;
