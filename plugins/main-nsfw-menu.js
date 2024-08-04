// nsfwMenu.js
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    // Mensaje principal
    let mainMessage = 'Selecciona el menú NSFW que deseas obtener:';
    // Opciones del menú desplegable
    let listSections = [
        {
            title: "MENÚ NSFW",
            rows: [
                {
                    title: "WAIFU",
                    description: "Se muestra contenido NSFW de waifu.",
                    id: `${usedPrefix}xwaifu`
                },
                {
                    title: "NEKO",
                    description: "Se muestra contenido NSFW de neko.",
                    id: `${usedPrefix}xneko`
                },
                {
                    title: "BLOWJOB",
                    description: "Se muestra contenido NSFW de blowjob.",
                    id: `${usedPrefix}blowjob`
                },
                {
                    title: "TRAP",
                    description: "Se muestra contenido NSFW de trap.",
                    id: `${usedPrefix}trap`
                },
                {
                    title: "YURI",
                    description: "Se muestra contenido NSFW de yuri.",
                    id: `${usedPrefix}yuri`
                },
                {
                    title: "CUM",
                    description: "Se muestra contenido NSFW de cum.",
                    id: `${usedPrefix}cum`
                },
                {
                    title: "HENTAI",
                    description: "Se muestra contenido NSFW de hentai.",
                    id: `${usedPrefix}hentai`
                },
                {
                    title: "ASS",
                    description: "Se muestra contenido NSFW de ass.",
                    id: `${usedPrefix}ass`
                },
                {
                    title: "CULOS",
                    description: "Se muestra contenido NSFW de culos.",
                    id: `${usedPrefix}culos`
                },
                {
                    title: "BOOBS",
                    description: "Se muestra contenido NSFW de boobs.",
                    id: `${usedPrefix}boobs`
                },
                {
                    title: "BOOBIES",
                    description: "Se muestra contenido NSFW de boobies.",
                    id: `${usedPrefix}boobies`
                },
                {
                    title: "LESBIAN",
                    description: "Se muestra contenido NSFW de lesbian.",
                    id: `${usedPrefix}lesbian`
                },
                {
                    title: "LESBIANS",
                    description: "Se muestra contenido NSFW de lesbians.",
                    id: `${usedPrefix}lesbians`
                },
                {
                    title: "PUSSY",
                    description: "Se muestra contenido NSFW de pussy.",
                    id: `${usedPrefix}pussy`
                },
                {
                    title: "COSPLAY",
                    description: "Se muestra contenido NSFW de cosplay.",
                    id: `${usedPrefix}cosplay`
                },
                {
                    title: "PACK",
                    description: "Se muestra contenido NSFW de pack.",
                    id: `${usedPrefix}pack`
                },
                {
                    title: "XNXXSEARCH",
                    description: "Buscar contenido en xnxx.",
                    id: `${usedPrefix}xnxxsearch`
                },
                {
                    title: "XNXXDL",
                    description: "Descargar contenido de xnxx.",
                    id: `${usedPrefix}xnxxdl`
                },
                {
                    title: "XNXX",
                    description: "Ver contenido de xnxx.",
                    id: `${usedPrefix}xnxx`
                }
            ]
        }
    ];

    // Enviar el menú desplegable
    await conn.sendList(m.chat, '  ≡ *Menú NSFW Desplegable*', `\n ${mainMessage}`, 'Selecciona una opción', null, listSections, m);
};

handler.help = ['nsfwmenu']
handler.tags = ['nsfw']
handler.command = ['nsfwmenu', 'nsfwhelp']

export default handler;
