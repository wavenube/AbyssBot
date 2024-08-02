let handler = async (m, { conn, args, text, usedPrefix, command }) => {
   let tee = `✳️ Por favor, proporciona un texto válido.\n\n📌 Ejemplo: *${usedPrefix + command}* FG98`;
   let too = `✳️ Por favor, proporciona dos textos válidos separados por +.\n\n📌 Ejemplo: \n*${usedPrefix + command}* texto1 + texto2`;
    m.react('⌛'); // Reacción de espera

    // Función para obtener el resultado de textpro
    const getTextPro = async (endpoint, textParams) => {
        let url = `https://textpro.me${endpoint}${textParams}`;
        // Asegúrate de tener una forma de obtener la URL generada por textpro.me
        // Aquí deberías tener el código para llamar a la API y obtener la URL del resultado
        // Este es un ejemplo, necesitarás ajustar según las especificaciones de la API que estés usando
        // const response = await axios.get(url); // Si usas axios
        // return response.data.result; // Ajusta según la respuesta real de la API
        return url; // Solo para el ejemplo, devuelve la URL construida
    };

    try {
        switch (command) {
            case 'logololi':
                if (!text) throw tee;
                let img = await getTextPro('/logo-style-loli', `?text=${encodeURIComponent(text)}`);
                conn.sendFile(m.chat, img, 'logo.png', `✅ Resultado`, m);
                m.react('✅'); // Reacción de éxito
                break;
            case 'neon':
                if (!text) throw tee;
                let ne = await getTextPro('/neon-text-effect', `?text=${encodeURIComponent(text)}`);
                conn.sendFile(m.chat, ne, 'logo.png', `✅ Resultado`, m);
                m.react('✅');
                break;
            case 'devil':
                if (!text) throw tee;
                let de = await getTextPro('/devil-wings-text-effect', `?text=${encodeURIComponent(text)}`);
                conn.sendFile(m.chat, de, 'logo.png', `✅ Resultado`, m);
                m.react('✅');
                break;
            // Agrega más casos según tus comandos
            // ...
            default:
                throw `Comando no reconocido.`;
        }
    } catch (e) {
        m.react('❌'); // Reacción de error
        m.reply(e);
    }
};

handler.help = ['logololi', 'neon', 'devil'/*, más comandos aquí... */];
handler.tags = ['maker'];
handler.command = /^(logololi|neon|devil)$/i; // Agrega más comandos aquí

export default handler;
