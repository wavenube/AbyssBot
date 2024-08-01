let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    // Mensaje principal
    let mainMessage = 'Elije la opción que quieras:';

    // Opciones del menú desplegable
    let listSections = [];
    for (let index in ytres) {
        let v = ytres[index];
        listSections.push({
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
        });
    }

    await conn.sendList(m.chat, '  ≡ *FG MUSIC*🔎', `\n 📀 Resultados de:\n *${text}*`, `Click Aqui`, ytres[0].image, listSections, m);
};

handler.help = ['menuopts']
handler.tags = ['menu']
handler.command = ['menuopts', 'help'] 
handler.disabled = false

export default handler
