import fetch from 'node-fetch';
import fs from 'fs';
import { writeFile } from 'fs/promises';

const handler = async (m, { conn, args }) => {
    const apiKey = 'x4zQNrX1hM-Qy5xwG1rr447zBqp7PIg-ChqDLr8qK3';
    const text = args.join(' ') || 'https://night-api.com'; // El texto para codificar en el QR

    const requestBody = {
        text: text,
        size: 500, // Tamaño del QR en píxeles
        colorDark: '#000000', // Color de los bloques del QR
        colorLight: '#FFFFFF', // Color de las áreas vacías del QR
        autoColor: true, // Calcular automáticamente colorDark desde el fondo
    };

    try {
        const response = await fetch('https://api.night-api.com/images/qrcode', {
            method: 'GET',
            headers: {
                authorization: apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`Error en la API: ${response.statusText}`);
        }

        const data = await response.json();
        const buffer = Buffer.from(data.content.data);

        // Guardar el QR en un archivo temporal
        const filePath = '/tmp/qrcode.png';
        await writeFile(filePath, buffer);

        // Enviar el archivo QR en el chat
        await conn.sendFile(m.chat, filePath, 'qrcode.png', `📸 Aquí está tu código QR para: ${text}`, m);

        // Eliminar el archivo temporal después de enviarlo
        fs.unlinkSync(filePath);
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, `❎ No se pudo generar el código QR.`, m);
    }
};

handler.help = ['qrcode <texto>'];
handler.tags = ['tools'];
handler.command = ['qrcode'];

handler.register = true; // Si es necesario registrarse para usar el comando
handler.group = true; // Si el comando debe ser usado solo en grupos

export default handler;
