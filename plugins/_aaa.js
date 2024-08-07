import { fetchJson } from 'your-utils-module'; // Asegúrate de tener un módulo para manejar las solicitudes HTTP.

async function handler(m, { usedPrefix, command, text }) {
  const datas = global;
  this.anonymous = this.anonymous ? this.anonymous : {};
  command = command.toLowerCase();
  
  // Si el mensaje contiene texto y el comando es `start`
  if (text && command === 'start') {
    const isAnonymousChat = Object.values(this.anonymous).find((room) => room.check(m.sender));

    if (isAnonymousChat) {
      const otherUser = isAnonymousChat.other(m.sender);
      if (otherUser) {
        return this.sendMessage(m.chat, { text: `*[❗] Ya estás en un chat anónimo. Usa ${usedPrefix}leave para salir.*` }, { quoted: m });
      }
    }

    // Manejo de la creación de salas
    const room = Object.values(this.anonymous).find((room) => room.state === 'WAITING' && !room.check(m.sender));
    if (room) {
      // Enviar los detalles a ambos usuarios
      const user1 = await getUserDetails(room.a);
      const user2 = await getUserDetails(m.sender);
      
      await this.sendMessage(room.a, { text: `*Información del usuario con el que estás emparejado:* \n\nNúmero: ${user2.number}\nNombre: ${user2.name}\nFoto de perfil: ${user2.profilePic}\nDescripción: ${user2.description}` }, { quoted: m });
      await this.sendMessage(m.sender, { text: `*Información del usuario con el que estás emparejado:* \n\nNúmero: ${user1.number}\nNombre: ${user1.name}\nFoto de perfil: ${user1.profilePic}\nDescripción: ${user1.description}` }, { quoted: m });
      
      room.b = m.sender;
      room.state = 'CHATTING';
      await this.sendMessage(m.chat, { text: `*[ ✔ ] Has sido emparejado con otro usuario. Puedes comenzar a chatear en privado.*` }, { quoted: m });
    } else {
      const id = +new Date();
      this.anonymous[id] = {
        id,
        a: m.sender,
        b: '',
        state: 'WAITING',
        check: function (who = '') {
          return [this.a, this.b].includes(who);
        },
        other: function (who = '') {
          return who === this.a ? this.b : who === this.b ? this.a : '';
        },
      };
      await this.sendMessage(m.chat, { text: `*[❗] Esperando a otro usuario para iniciar el chat anónimo.\n\nUsa ${usedPrefix}leave para salir del chat anónimo.*` }, { quoted: m });
    }
  }

  // Manejo de mensajes en el chat anónimo
  else if (text) {
    const room = Object.values(this.anonymous).find((room) => room.check(m.sender));
    if (room) {
      const other = room.other(m.sender);
      if (other) {
        await this.sendMessage(other, { text: text }, { quoted: m });
      }
    }
  }

  // Comando para salir del chat
  else if (command === 'leave') {
    const room = Object.values(this.anonymous).find((room) => room.check(m.sender));
    if (!room) return this.sendMessage(m.chat, { text: `*[❗] No estás en un chat anónimo. Usa ${usedPrefix}start para iniciar uno.*` }, { quoted: m });
    m.reply('*[❗] Has abandonado el chat anónimo*');
    const other = room.other(m.sender);
    if (other) await this.sendMessage(other, { text: `*[❗] El otro usuario ha abandonado el chat anónimo.\n\n¿Quieres iniciar otro?*\nUsa ${usedPrefix}start` }, { quoted: m });
    delete this.anonymous[room.id];
  }
}

// Función para obtener los detalles del usuario
async function getUserDetails(userId) {
  // Implementar la lógica para obtener detalles del usuario, por ejemplo:
  const user = await this.getProfilePicture(userId); // Suponiendo que esta función existe
  const number = userId;
  const name = await this.getUserName(userId); // Suponiendo que esta función existe
  const profilePic = user.profilePic;
  const description = await this.getUserDescription(userId); // Suponiendo que esta función existe
  
  return { number, name, profilePic, description };
}

handler.help = ['start', 'leave'];
handler.tags = ['anonymous'];
handler.command = ['start', 'leave'];
handler.private = true;

export default handler;
