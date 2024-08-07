async function handler(m, {usedPrefix, command}) {
  const datas = global;
  
  command = command.toLowerCase();
  this.anonymous = this.anonymous ? this.anonymous : {};
  const isAnonymousChat = Object.values(this.anonymous).find((room) => room.check(m.sender));

  if (isAnonymousChat) {
    const otherUser = isAnonymousChat.other(m.sender);
    if (otherUser) {
      await this.sendMessage(otherUser, {text: m.text}, {quoted: m});
    }
    return;
  }

  switch (command) {
    case 'next':
    case 'leave': {
      const room = Object.values(this.anonymous).find((room) => room.check(m.sender));
      if (!room) return this.sendMessage(m.chat, {text: `*[❗] NO ESTÁS EN UN CHAT ANÓNIMO\n\n¿Quieres iniciar uno?*\nUsa ${usedPrefix}start`}, {quoted: m});
      m.reply('*[❗] Has abandonado el chat anónimo*');
      const other = room.other(m.sender);
      if (other) await this.sendMessage(other, {text: `*[❗] El otro usuario ha abandonado el chat anónimo.\n\n¿Quieres iniciar otro?*\nUsa ${usedPrefix}start`}, {quoted: m});
      delete this.anonymous[room.id];
      if (command === 'leave') break;
    }
    case 'start': {
      if (Object.values(this.anonymous).find((room) => room.check(m.sender))) return this.sendMessage(m.chat, {text: `*[❗] Ya estás en un chat anónimo o esperando a que otro usuario se una.\n\nUsa ${usedPrefix}leave para salir.*`}, {quoted: m});
      const room = Object.values(this.anonymous).find((room) => room.state === 'WAITING' && !room.check(m.sender));
      if (room) {
        await this.sendMessage(room.a, {text: '*[ ✔ ] Una persona se ha unido al chat anónimo, pueden empezar a chatear.*'}, {quoted: m});
        room.b = m.sender;
        room.state = 'CHATTING';
        await this.sendMessage(m.chat, {text: `*[ ✔ ] Una persona se ha unido al chat anónimo, pueden empezar a chatear.\n\nUsa ${usedPrefix}next para ir a otro chat.*`}, {quoted: m});
      } else {
        const id = + new Date;
        this.anonymous[id] = {
          id,
          a: m.sender,
          b: '',
          state: 'WAITING',
          check: function(who = '') {
            return [this.a, this.b].includes(who);
          },
          other: function(who = '') {
            return who === this.a ? this.b : who === this.b ? this.a : '';
          },
        };
        await this.sendMessage(m.chat, {text: `*[❗] Esperando a otro usuario para iniciar el chat anónimo.\n\nUsa ${usedPrefix}leave para salir del chat anónimo.*`}, {quoted: m});
      }
      break;
    }
  }
}
handler.help = ['start', 'leave', 'next'];
handler.tags = ['anonymous'];
handler.command = ['start', 'leave', 'next'];
handler.private = true;
export default handler;
