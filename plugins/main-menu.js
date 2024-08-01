let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    // Mensaje principal
    let mainMessage = 'Elije la opción que quieras:';

    // Opciones del menú desplegable
    let listSections = [
        {
            title: "Opciones",
            rows: [
                {
                    title: "1",
                    description: "Opción 1",
                    rowId: `${usedPrefix}opcion1`
                },
                {
                    title: "2",
                    description: "Opción 2",
                    rowId: `${usedPrefix}opcion2`
                },
                {
                    title: "3",
                    description: "Opción 3",
                    rowId: `${usedPrefix}opcion3`
                }
            ]
        }
    ];

    // Enviar el menú desplegable
    await conn.sendList(m.chat, 'Menú Desplegable', mainMessage, 'Selecciona una opción', listSections);
};

handler.help = ['menuopciones']
handler.tags = ['main']
handler.command = ['menuopciones', 'menuopts'] 

export default handler;
