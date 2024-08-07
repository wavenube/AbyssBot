import { fetchJson } from 'your-utils-module'; // Importa tu módulo para manejar las solicitudes HTTP.

async function handler(m, { usedPrefix, command, text }) {
  this.anonymous = this.anonymous ? this.anonymous : {};
  command = command.toLowerCase();

  // Manejo del comando start
  if (command === 'start') {
    // Verificar si el usuario ya está en un chat anónimo
    const existingRoom = Object.values(this.anonymous).find((room) => room.check(m.sender));
    if (existingRoom) {
      return this.sendMessage(m.chat, { text: `*[❗] Ya estás en un chat anónimo. Usa ${usedPrefix}leave para salir.*` }, { quoted: m });
    }

    // Buscar una sala esperando
    const waitingRoom = Object.values(this.anonymous).find((room) => room.state === 'WAITING' && !room.check(m.sender));
    if (waitingRoom) {
      // Emparejar a ambos usuarios
      waitingRoom.b = m.sender;
      waitingRoom.state = 'CHATTING';

      // Obtener información del usuario emparejado
      const user1 = await getUserDetails(waitingRoom.a);
      const user2 = await getUserDetails(waitingRoom.b);

      // Enviar detalles a ambos usuarios
      await this.sendMessage(waitingRoom.a, { text: `*Información del usuario con el que estás emparejado:*\n\nNúmero: ${user2.number}\nNombre: ${user2.name}\nFoto de perfil: ${user2.profilePic}\nDescripción: ${user2.description}` }, { quoted: m });
      await this.sendMessage(waitingRoom.b, { text: `*Información del usuario con el que estás emparejado:*\n\nNúmero: ${user1.number}\nNombre: ${user1.name}\nFoto de perfil: ${user1.profilePic}\nDescripción: ${user1.description}` }, { quoted: m });

      await this.sendMessage(m.chat, { text: `*[ ✔ ] Has sido emparejado con otro usuario. Puedes comenzar a chatear en privado.*` }, { quoted: m });
    } else {
      // Crear una nueva sala de chat
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
      } else {
        await this.sendMessage(m.chat, { text: `*[❗] El otro usuario ha abandonado el chat anónimo.*` }, { quoted: m });
        delete this.anonymous[room.id];
      }
    }
  }

  // Manejo del comando leave
  else if (command === 'leave') {
    const room = Object.values(this.anonymous).find((room) => room.check(m.sender));
    if (!room) return this.sendMessage(m.chat, { text: `*[❗] No estás en un chat anónimo. Usa ${usedPrefix}start para iniciar uno.*` }, { quoted: m });
    
    // Notificar al otro usuario y eliminar la sala
    const other = room.other(m.sender);
    if (other) await this.sendMessage(other, { text: `*[❗] El otro usuario ha abandonado el chat anónimo.\n\n¿Quieres iniciar otro?*\nUsa ${usedPrefix}start` }, { quoted: m });
    delete this.anonymous[room.id];
    await this.sendMessage(m.chat, { text: `*[❗] Has abandonado el chat anónimo.*` }, { quoted: m });
  }
}

// Función para obtener los detalles del usuario
async function getUserDetails(userId) {
  // Implementar la lógica para obtener detalles del usuario. Este es solo un ejemplo.
  const profilePic = await fetchJson(`https://api.example.com/getProfilePic?user=${userId}`); // Reemplaza con tu propia API
  const number = userId;
  const name = await fetchJson(`https://api.example.com/getUserName?user=${userId}`); // Reemplaza con tu propia API
  const description = await fetchJson(`https://api.example.com/getUserDescription?user=${userId}`); // Reemplaza con tu propia API

  return { number, name, profilePic, description };
}

handler.help = ['start', 'leave'];
handler.tags = ['anonymous'];
handler.command = ['start', 'leave'];
handler.private = true;

export default handler;
