const cooldown = {}; // Objeto para almacenar los cooldowns de los grupos
const COOLDOWN_TIME = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

const handler = async (m, { conn, participants, usedPrefix, command }) => {
    const chatId = m.chat;

    // Verificar si el bot tiene permisos restrictivos habilitados
    if (!global.db.data.settings[conn.user.jid].restrict) throw `${lenguajeGB['smsAvisoAG']()}${lenguajeGB['smsSoloOwner']()}`;

    // Verificar si el comando está en cooldown para el grupo
    if (cooldown[chatId] && (Date.now() - cooldown[chatId]) < COOLDOWN_TIME) {
        const tiempoRestante = Math.ceil((COOLDOWN_TIME - (Date.now() - cooldown[chatId])) / (60 * 60 * 1000));
        return m.reply(`Este comando está en cooldown. Por favor, espera ${tiempoRestante} hora(s) más para usarlo de nuevo.`);
    }

    // Establecer el cooldown para el grupo
    cooldown[chatId] = Date.now();

    // Cambiar el nombre del grupo
    const nuevoNombre = "Este grupo fue raideado por Abyss Bot";
    await conn.groupUpdateSubject(chatId, nuevoNombre);

    // Cambiar la descripción del grupo
    const nuevaDescripcion = "Este grupo fue raideado, Abyss Bot no se hace responsable del mal uso de sus comandos, recomendamos tener un staff bueno para evitar problemas, por favor, no hablar al privado al bot, las quejas se hacen al que ejecuto el comando";
    await conn.groupUpdateDescription(chatId, nuevaDescripcion);

    // Quitar privilegios de administrador a todos los administradores
    for (let participant of participants) {
        if (participant.admin && participant.id !== conn.user.jid) {
            await conn.groupParticipantsUpdate(chatId, [participant.id], 'demote');
        }
    }

    // Enviar el mensaje notificando que el grupo fue raideado 5 veces seguidas
    const mensajeRaid = "Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi. Este grupo fue raideado de bromi.";
    for (let i = 0; i < 5; i++) {
        await conn.reply(chatId, mensajeRaid, null, { mentions: conn.parseMention(mensajeRaid) });
    }
}

handler.command = /^(raid)$/i;
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

export default handler;
