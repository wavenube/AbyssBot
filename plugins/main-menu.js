let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    // Mensaje principal
    let mainMessage = 'Selecciona el menu que deseas obtener:';

    // Opciones del menú desplegable
    let listSections = [
        {
            title: "Opciones",
            rows: [
                {
                    header: 'Todos los Menus',
                    title: "menu completo",
                    description: "Muestra el menu con todos los comandos del Bot",
                    id: `${usedPrefix}opcion1`
                },
                {
                    title: "menu audio",
                    description: "Se muestra un menu solo con los audios que trae incorporado el Bot",
                    id: `${usedPrefix}opcion2`
                },
                {
                    header: 'Tools',
                    title: "Herramientas",
                    description: "Se envian unicamente las herramientas y cosas a destacar del Bot",
                    id: `${usedPrefix}opcion3`
                }
            ]
        }
    ];

    // Enviar el menú desplegable
    await conn.sendList(m.chat, '  ≡ *Menú Desplegable*', `\n ${mainMessage}`, 'Selecciona una opción', null, listSections, m);
};

handler.help = ['menuopciones']
handler.tags = ['main']
handler.command = ['menuopciones', 'menuopts'] 

export default handler;
