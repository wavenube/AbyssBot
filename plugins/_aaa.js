import MessageType from '@whiskeysockets/baileys';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, 'Por favor, proporciona un mensaje para informar. Ejemplo: `.informar Este es un mensaje de prueba`', m);

    // Obtener todos los chats
    const allChats = Object.keys(conn.chats);

    for (let chatId of allChats) {
        try {
            // Obtener los participantes del grupo, si es un grupo
            let participants = [];
            if (chatId.endsWith('@g.us')) {
                const groupMetadata = await conn.groupMetadata(chatId);
                participants = groupMetadata.participants.map(participant => participant.id);
            }

            // Crear una lista de menciones
            const users = participants.map(u => conn.decodeJid(u));
            
            // Crear el mensaje con menciones
            const msg = conn.cMod(
                chatId,
                generateWAMessageFromContent(
                    chatId,
                    {
                        extendedTextMessage: {
                            text: text,
                            contextInfo: { mentionedJid: users }
                        }
                    },
                    {
                        quoted: m,
                        userJid: conn.user.id
                    }
                ),
                text,
                conn.user.jid,
                { mentions: users }
            );

            // Enviar el mensaje
            await conn.relayMessage(chatId, msg.message, { messageId: msg.key.id });
        } catch (e) {
            console.error(`Error al enviar mensaje a ${chatId}:`, e);
        }
    }

    conn.reply(m.chat, 'Mensaje enviado a todos los grupos y chats.', m);
};

handler.command = /^informar$/i;
handler.admin = true; // Solo administradores pueden usar este comando
handler.owner = true; // Solo el propietario del bot puede usar este comando
export default handler;
