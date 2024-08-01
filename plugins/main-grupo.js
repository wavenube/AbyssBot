let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    // Mensaje principal
    let mainMessage = 'Selecciona las opciones que desees:';

    // Opciones del menú desplegable
    let listSections = [
        {
            title: "OPCIONES DEL GRUPO",
            rows: [
                {
                    title: "ADD",
                    description: "Añade un miembro del grupo.",
                    id: `${usedPrefix}add`
                },
                {
                    title: "DELETE",
                    description: "Elimina un miembro del grupo.",
                    id: `${usedPrefix}delete`
                },
                {
                    title: "DELWARN",
                    description: "Elimina una advertencia para el usuario mencionado.",
                    id: `${usedPrefix}delwarn`
                },
                {
                    title: "DEMOTE",
                    description: "Reduce el rango del miembro mencionado.",
                    id: `${usedPrefix}demote`
                },
                {
                    title: "INFOGP",
                    description: "Muestra la información del grupo.",
                    id: `${usedPrefix}infogp`
                },
                {
                    title: "HIDETAG",
                    description: "Oculta las etiquetas del grupo.",
                    id: `${usedPrefix}hidetag`
                },
                {
                    title: "KICK",
                    description: "Expulsa al miembro mencionado del grupo.",
                    id: `${usedPrefix}kick`
                },
                {
                    title: "LINK",
                    description: "Proporciona el enlace del grupo.",
                    id: `${usedPrefix}link`
                },
                {
                    title: "PROFILE",
                    description: "Muestra el perfil del usuario.",
                    id: `${usedPrefix}profile`
                },
                {
                    title: "PROMOTE",
                    description: "Aumenta el rango del miembro mencionado.",
                    id: `${usedPrefix}promote`
                },
                {
                    title: "RULES",
                    description: "Muestra las reglas del grupo.",
                    id: `${usedPrefix}rules`
                },
                {
                    title: "SETBYE",
                    description: "Establece el mensaje de despedida.",
                    id: `${usedPrefix}setbye`
                },
                {
                    title: "SETRULES",
                    description: "Establece las reglas del grupo.",
                    id: `${usedPrefix}setrules`
                },
                {
                    title: "GROUP",
                    description: "Muestra la información del grupo.",
                    id: `${usedPrefix}group`
                },
                {
                    title: "SETWELCOME",
                    description: "Establece el mensaje de bienvenida.",
                    id: `${usedPrefix}setwelcome`
                },
                {
                    title: "SIMULATE",
                    description: "Simula un evento para el usuario mencionado.",
                    id: `${usedPrefix}simulate`
                },
                {
                    title: "STAFF",
                    description: "Muestra la lista de personal del grupo.",
                    id: `${usedPrefix}staff`
                },
                {
                    title: "TOTAG",
                    description: "Etiqueta a todos los miembros del grupo.",
                    id: `${usedPrefix}totag`
                },
                {
                    title: "WARN",
                    description: "Da una advertencia al usuario mencionado.",
                    id: `${usedPrefix}warn`
                },
                {
                    title: "WARNS",
                    description: "Muestra todas las advertencias para el usuario.",
                    id: `${usedPrefix}warns`
                },
                {
                    title: "CHECKEXPIRED",
                    description: "Verifica si hay algún elemento expirado.",
                    id: `${usedPrefix}checkexpired`
                }
            ]
        }
    ];

    // Enviar el menú desplegable
    await conn.sendList(m.chat, '  ≡ *Menú Desplegable*', `\n ${mainMessage}`, 'Selecciona una opción', null, listSections, m);
};

handler.help = ['menugrupo']
handler.tags = ['main']
handler.command = ['menugrupo'] 

export default handler;
