let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    // Mensaje principal
    let mainMessage = 'Selecciona el menú que deseas obtener:';
        let pp = './src/abyss.png';


    // Opciones del menú desplegable
    let listSections = [
        {
            title: "TODOS LOS MENÚS",
            rows: [
                {
                    title: "ALLMENU",
                    description: "Se muestra el menú general del Bot.",
                    id: `${usedPrefix}allmenu`
                },
                {
                    title: "MENU AUDIO",
                    description: "Se muestra un menú solo con los audios que trae incorporado el Bot.",
                    id: `${usedPrefix}menuaudio`
                },
                {
                    title: "MENU GRUPO",
                    description: "Se envían únicamente las opciones de gestión de grupo.",
                    id: `${usedPrefix}menugrupo`
                },
                {
                    title: "MENU RESTRICT",
                    description: "Se usa para activar el modo gestión de grupo.",
                    id: `${usedPrefix}enable`
                },
                {
                    title: "MENU ACERCA-DE",
                    description: "Se muestra un menú con info variada.",
                    id: `${usedPrefix}acercademenu`
                },
                {
                    title: "MENU ANIME",
                    description: "Se muestra un menú de generación de imágenes anime.",
                    id: `${usedPrefix}animemenu`
                }
            ]
        }
    ];

    // Enviar el menú desplegable
    await conn.sendList(m.chat, '  ≡ *Menú Desplegable*', `\n ${mainMessage}`, 'Selecciona una opción', null, listSections, m);
};

handler.help = ['menuopciones']
handler.tags = ['main']
handler.command = ['menu', 'help'] 

export default handler;
