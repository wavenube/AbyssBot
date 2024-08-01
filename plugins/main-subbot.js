let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    // Mensaje principal
    let mainMessage = "Selecciona el menú que deseas obtener:";

    // Opciones del menú desplegable
    let listSections = [
        {
            title: "COMANDOS DEL BOT",
            rows: [
                {
                    title: "BOTCLONE",
                    description: "Clona el bot.",
                    id: `${usedPrefix}botclone`
                },
                {
                    title: "BOTLIST",
                    description: "Muestra la lista de bots.",
                    id: `${usedPrefix}botlist`
                },
                {
                    title: "TXBOT",
                    description: "Transfiere el bot a otro número.",
                    id: `${usedPrefix}txbot`
                },
                {
                    title: "STOP",
                    description: "Detiene el bot.",
                    id: `${usedPrefix}stop`
                }
            ]
        }
    ];

    // Enviar el menú desplegable
    await conn.sendList(m.chat, "≡ *Menú Desplegable*", mainMessage, "Selecciona una opción", null, listSections, m);
};

handler.help = ["menubot"]
handler.tags = ["admin"]
handler.command = ["menubot22", "botmenu"]

export default handler;
