let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    // Mensaje principal
    let mainMessage = 'Selecciona el menú que deseas obtener:';

    // Opciones del menú desplegable
    let listSections = [
        {
            title: "ACERCA DE",
            rows: [
                {
                    title: "BLOCKLIST",
                    description: "Muestra la lista de usuarios bloqueados.",
                    id: `${usedPrefix}blocklist`
                },
                {
                    title: "INFO",
                    description: "Proporciona información sobre el bot.",
                    id: `${usedPrefix}info`
                },
                {
                    title: "OWNER",
                    description: "Muestra información del propietario del bot.",
                    id: `${usedPrefix}owner`
                },
                {
                    title: "DONATE",
                    description: "Proporciona información sobre cómo donar.",
                    id: `${usedPrefix}donate`
                },
                {
                    title: "LANGUAGE",
                    description: "Cambia el idioma del bot.",
                    id: `${usedPrefix}language`
                },
                {
                    title: "LISTPREM",
                    description: "Muestra la lista de usuarios premium.",
                    id: `${usedPrefix}listprem`
                },
                {
                    title: "PING",
                    description: "Verifica el estado del bot.",
                    id: `${usedPrefix}ping`
                },
                {
                    title: "RUNTIME",
                    description: "Muestra el tiempo de actividad del bot.",
                    id: `${usedPrefix}runtime`
                },
                {
                    title: "SPEEDTEST",
                    description: "Realiza una prueba de velocidad.",
                    id: `${usedPrefix}speedtest`
                },
                {
                    title: "SUPPORT",
                    description: "Proporciona información de soporte.",
                    id: `${usedPrefix}support`
                }
            ]
        }
    ];

    // Enviar el menú desplegable
    await conn.sendList(m.chat, '  ≡ *Menú Desplegable*', `\n ${mainMessage}`, 'Selecciona una opción', null, listSections, m);
};

handler.help = ['menugeneral']
handler.tags = ['info']
handler.command = ['acercademenu', 'infomenu']

export default handler;
