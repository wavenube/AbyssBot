import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el directorio del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definir la ruta al directorio de audios
const mediaPath = path.join(__dirname, '../src/mp3');

// Función manejadora de mensajes
const handler = (m) => m;

handler.all = async function(m, { conn }) {
  const chat = global.db.data.chats[m.chat];

  // Mensaje de invitación de grupo
  if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('https://chat') || m.text.startsWith('Abre este enlace')) && !m.isBaileys && !m.isGroup && !chat.isBanned && !m.fromMe) {
    const joinMessage = `@${m.sender.split('@')[0]}, únete al grupo usando el siguiente enlace: https://chat.whatsapp.com/LjJbmdO0qSDEKgB60qivZj`.trim();
    this.sendMessage(m.chat, {
      text: joinMessage,
      mentions: [...joinMessage.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net'),
      contextInfo: {
        forwardingScore: 9999999,
        isForwarded: true,
        mentionedJid: [...joinMessage.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + '@s.whatsapp.net'),
        "externalAdReply": {
          "showAdAttribution": true,
          "containsAutoReply": true,
          "renderLargerThumbnail": true,
          "title": "Grupo de WhatsApp",
          "containsAutoReply": true,
          "mediaType": 1,
          "thumbnail": global.imagen6,
          "mediaUrl": `https://www.atom.bio/theshadowbrokers-team`,
          "sourceUrl": `https://www.atom.bio/theshadowbrokers-team`
        }
      }
    }, { quoted: m });
  }

  // Definir archivos de audio y sus palabras clave
  const audioFiles = {
    'hola': 'Hola.mp3',
    'que no': 'queno.mp3',
    'anadieleimporta': 'dylan1.mp3',
    'araara': 'Ara.mp3',
    'miarda de bot': 'insultar.mp3',
    'bañate': 'Banate.mp3',
    'baneado': 'baneado.mp3',
    'bebito fiu fiu': 'bff.mp3',
    'buenas noches': 'boanoite.mp3',
    'buenas tardes': 'boatarde.mp3',
    'wtf': 'wtf.mp3',
    'vete': 'vete a la verga.mp3',
    'no digas eso papu': 'nopapu.mp3'
  };
  // Verificar y enviar mensajes de audio según el texto del mensaje
  for (const [key, fileName] of Object.entries(audioFiles)) {
    if (!chat.isBanned && m.text.match(new RegExp(key, 'gi'))) {
      if (!db.data.chats[m.chat].audios) return;
      if (!db.data.settings[this.user.jid].audios_bot && !m.isGroup) return;

      const vn = path.join(mediaPath, fileName);
      if (fs.existsSync(vn)) { // Verificar si el archivo existe
        conn.sendPresenceUpdate('recording', m.chat);
        conn.sendMessage(m.chat, { audio: { url: vn }, fileName: fileName, mimetype: 'audio/mpeg', ptt: true }, { quoted: m });
        break; // Salir del bucle después de encontrar una coincidencia
      } else {
        console.error(`Archivo de audio no encontrado: ${vn}`);
      }
    }
  }

  return true;
};

export default handler;
