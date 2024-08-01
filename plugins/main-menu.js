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
                    id: `${usedPrefix}opcion1`
                },
                {
                    title: "2",
                    description: "Opción 2",
                    id: `${usedPrefix}opcion2`
                },
                {
                    title: "3",
                    description: "Opción 3",
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
