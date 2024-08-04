import { scheduleJob } from 'node-schedule';

const handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (global.holaJobs && global.holaJobs[m.chat]) {
        return conn.reply(m.chat, `❎ El envío de mensajes "hola" ya está activo en este chat.`, m);
    }

    // Define la tarea programada para enviar "hola" cada 5 minutos
    global.holaJobs = global.holaJobs || {};
    global.holaJobs[m.chat] = scheduleJob('*/5 * * * *', async () => {
        await conn.reply(m.chat, 'hola', m);
    });

    conn.reply(m.chat, `✅ El envío de "hola" cada 5 minutos ha comenzado.`, m);
};

handler.help = ['starthello'];
handler.tags = ['fun'];
handler.command = ['starthello'];

export default handler;
