let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    // Mensaje principal
    let mainMessage = 'Selecciona el menu que deseas obtener:';

    // Opciones del menú desplegable
    let listSections = [
        {
            title: "TODOS LOS MENUS",
            rows: [
                {
                    title: "mallmenu",
                    description: "Se muestra el menu general del Bot.",
                    id: `${usedPrefix}allmenu`
                },
                {
                    title: "menu audio",
                    description: "Se muestra un menu solo con los audios que trae incorporado el Bot.",
                    id: `${usedPrefix}opcion2`
                },
                {
                    header: 'menu grupo',
                    title: "Herramientas",
                    description: "Se envian unicamente las opciones de gestion de grupo.",
                    id: `${usedPrefix}menugrupo`
                },
                {
                    title: "menu restrict",
                    description: "Se usa para activar el modo gestion de grupo.",
                    id: `${usedPrefix}enable`
                },
                {
                    title: "menu acerca-de",
                    description: "Se muestra un menu con info variada.",
                    id: `${usedPrefix}menuacercade`
                },
                {
                    title: "menu anime",
                    description: "Se muestra un menu de generacion de imagenes anime.",
                    id: `${usedPrefix}menuanime`
                },
                {
                    title: "menu subbot",
                    description: "Se muestran opciones para los subbot.",
                    id: `${usedPrefix}opcion2`
                },
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
