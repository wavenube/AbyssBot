import { scheduleJob } from 'node-schedule';
import fetch from 'node-fetch';

// URL base de la galería en línea
const baseURL = 'https://example.com/gallery/'; // Cambia esto a la URL de tu galería en línea

const handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (!args || args.length < 2) {
        return conn.reply(m.chat, `✳️ Uso correcto: ${usedPrefix + command} <tema> <intervalo_en_minutos>`, m);
    }

    const [tema, intervalo] = args;
    const intervaloMinutos = parseInt(intervalo);
    if (isNaN(intervaloMinutos) || intervaloMinutos <= 0) {
        return conn.reply(m.chat, `❎ El intervalo debe ser un número positivo en minutos.`, m);
    }

    // Define la URL de la galería basada en el tema
    const galleryURL = `${baseURL}${tema}`;
    
    // Obtiene las imágenes de la galería
    let imagenes;
    try {
        const response = await fetch(galleryURL);
        if (!response.ok) throw new Error(`Error en la galería: ${response.statusText}`);
        imagenes = await response.json(); // Supongamos que la galería devuelve un JSON con una lista de URLs
    } catch (error) {
        return conn.reply(m.chat, `❎ No se pudieron obtener las imágenes del tema ${tema}.`, m);
    }

    if (imagenes.length === 0) {
        return conn.reply(m.chat, `❎ No hay imágenes en el tema ${tema}.`, m);
    }

    // Cancela trabajos anteriores si existen
    if (global.imageJobs && global.imageJobs[m.chat]) {
        global.imageJobs[m.chat].cancel();
    }

    // Define la tarea programada
    global.imageJobs = global.imageJobs || {};
    global.imageJobs[m.chat] = scheduleJob(`*/${intervalo} * * * *`, async () => {
        const randomImageURL = imagenes[Math.floor(Math.random() * imagenes.length)];
        await conn.sendFile(m.chat, randomImageURL, 'image.jpg', `📸 Imagen del tema ${tema}`, m);
    });

    conn.reply(m.chat, `✅ El envío de imágenes del tema ${tema} ha comenzado. Intervalo: ${intervalo} minutos.`, m);
};

handler.help = ['startgallery <tema> <intervalo>'];
handler.tags = ['media'];
handler.command = ['startgallery'];

export default handler;
import { scheduleJob } from 'node-schedule';
import fetch from 'node-fetch';

// URL base de la galería en línea
const baseURL = 'https://example.com/gallery/'; // Cambia esto a la URL de tu galería en línea

const handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (!args || args.length < 2) {
        return conn.reply(m.chat, `✳️ Uso correcto: ${usedPrefix + command} <tema> <intervalo_en_minutos>`, m);
    }

    const [tema, intervalo] = args;
    const intervaloMinutos = parseInt(intervalo);
    if (isNaN(intervaloMinutos) || intervaloMinutos <= 0) {
        return conn.reply(m.chat, `❎ El intervalo debe ser un número positivo en minutos.`, m);
    }

    // Define la URL de la galería basada en el tema
    const galleryURL = `${baseURL}${tema}`;
    
    // Obtiene las imágenes de la galería
    let imagenes;
    try {
        const response = await fetch(galleryURL);
        if (!response.ok) throw new Error(`Error en la galería: ${response.statusText}`);
        imagenes = await response.json(); // Supongamos que la galería devuelve un JSON con una lista de URLs
    } catch (error) {
        return conn.reply(m.chat, `❎ No se pudieron obtener las imágenes del tema ${tema}.`, m);
    }

    if (imagenes.length === 0) {
        return conn.reply(m.chat, `❎ No hay imágenes en el tema ${tema}.`, m);
    }

    // Cancela trabajos anteriores si existen
    if (global.imageJobs && global.imageJobs[m.chat]) {
        global.imageJobs[m.chat].cancel();
    }

    // Define la tarea programada
    global.imageJobs = global.imageJobs || {};
    global.imageJobs[m.chat] = scheduleJob(`*/${intervalo} * * * *`, async () => {
        const randomImageURL = imagenes[Math.floor(Math.random() * imagenes.length)];
        await conn.sendFile(m.chat, randomImageURL, 'image.jpg', `📸 Imagen del tema ${tema}`, m);
    });

    conn.reply(m.chat, `✅ El envío de imágenes del tema ${tema} ha comenzado. Intervalo: ${intervalo} minutos.`, m);
};

handler.help = ['startgallery <tema> <intervalo>'];
handler.tags = ['media'];
handler.command = ['startgallery'];

export default handler;
import { scheduleJob } from 'node-schedule';
import fetch from 'node-fetch';

// URL base de la galería en línea
const baseURL = 'https://example.com/gallery/'; // Cambia esto a la URL de tu galería en línea

const handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (!args || args.length < 2) {
        return conn.reply(m.chat, `✳️ Uso correcto: ${usedPrefix + command} <tema> <intervalo_en_minutos>`, m);
    }

    const [tema, intervalo] = args;
    const intervaloMinutos = parseInt(intervalo);
    if (isNaN(intervaloMinutos) || intervaloMinutos <= 0) {
        return conn.reply(m.chat, `❎ El intervalo debe ser un número positivo en minutos.`, m);
    }

    // Define la URL de la galería basada en el tema
    const galleryURL = `${baseURL}${tema}`;
    
    // Obtiene las imágenes de la galería
    let imagenes;
    try {
        const response = await fetch(galleryURL);
        if (!response.ok) throw new Error(`Error en la galería: ${response.statusText}`);
        imagenes = await response.json(); // Supongamos que la galería devuelve un JSON con una lista de URLs
    } catch (error) {
        return conn.reply(m.chat, `❎ No se pudieron obtener las imágenes del tema ${tema}.`, m);
    }

    if (imagenes.length === 0) {
        return conn.reply(m.chat, `❎ No hay imágenes en el tema ${tema}.`, m);
    }

    // Cancela trabajos anteriores si existen
    if (global.imageJobs && global.imageJobs[m.chat]) {
        global.imageJobs[m.chat].cancel();
    }

    // Define la tarea programada
    global.imageJobs = global.imageJobs || {};
    global.imageJobs[m.chat] = scheduleJob(`*/${intervalo} * * * *`, async () => {
        const randomImageURL = imagenes[Math.floor(Math.random() * imagenes.length)];
        await conn.sendFile(m.chat, randomImageURL, 'image.jpg', `📸 Imagen del tema ${tema}`, m);
    });

    conn.reply(m.chat, `✅ El envío de imágenes del tema ${tema} ha comenzado. Intervalo: ${intervalo} minutos.`, m);
};

handler.help = ['startgallery <tema> <intervalo>'];
handler.tags = ['media'];
handler.command = ['startgallery'];

export default handler;
import { scheduleJob } from 'node-schedule';
import fetch from 'node-fetch';

// URL base de la galería en línea
const baseURL = 'https://example.com/gallery/'; // Cambia esto a la URL de tu galería en línea

const handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (!args || args.length < 2) {
        return conn.reply(m.chat, `✳️ Uso correcto: ${usedPrefix + command} <tema> <intervalo_en_minutos>`, m);
    }

    const [tema, intervalo] = args;
    const intervaloMinutos = parseInt(intervalo);
    if (isNaN(intervaloMinutos) || intervaloMinutos <= 0) {
        return conn.reply(m.chat, `❎ El intervalo debe ser un número positivo en minutos.`, m);
    }

    // Define la URL de la galería basada en el tema
    const galleryURL = `${baseURL}${tema}`;
    
    // Obtiene las imágenes de la galería
    let imagenes;
    try {
        const response = await fetch(galleryURL);
        if (!response.ok) throw new Error(`Error en la galería: ${response.statusText}`);
        imagenes = await response.json(); // Supongamos que la galería devuelve un JSON con una lista de URLs
    } catch (error) {
        return conn.reply(m.chat, `❎ No se pudieron obtener las imágenes del tema ${tema}.`, m);
    }

    if (imagenes.length === 0) {
        return conn.reply(m.chat, `❎ No hay imágenes en el tema ${tema}.`, m);
    }

    // Cancela trabajos anteriores si existen
    if (global.imageJobs && global.imageJobs[m.chat]) {
        global.imageJobs[m.chat].cancel();
    }

    // Define la tarea programada
    global.imageJobs = global.imageJobs || {};
    global.imageJobs[m.chat] = scheduleJob(`*/${intervalo} * * * *`, async () => {
        const randomImageURL = imagenes[Math.floor(Math.random() * imagenes.length)];
        await conn.sendFile(m.chat, randomImageURL, 'image.jpg', `📸 Imagen del tema ${tema}`, m);
    });

    conn.reply(m.chat, `✅ El envío de imágenes del tema ${tema} ha comenzado. Intervalo: ${intervalo} minutos.`, m);
};

handler.help = ['startgallery <tema> <intervalo>'];
handler.tags = ['media'];
handler.command = ['startgallery'];

export default handler;
import { scheduleJob } from 'node-schedule';
import fetch from 'node-fetch';

// URL base de la galería en línea
const baseURL = 'https://example.com/gallery/'; // Cambia esto a la URL de tu galería en línea

const handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (!args || args.length < 2) {
        return conn.reply(m.chat, `✳️ Uso correcto: ${usedPrefix + command} <tema> <intervalo_en_minutos>`, m);
    }

    const [tema, intervalo] = args;
    const intervaloMinutos = parseInt(intervalo);
    if (isNaN(intervaloMinutos) || intervaloMinutos <= 0) {
        return conn.reply(m.chat, `❎ El intervalo debe ser un número positivo en minutos.`, m);
    }

    // Define la URL de la galería basada en el tema
    const galleryURL = `${baseURL}${tema}`;
    
    // Obtiene las imágenes de la galería
    let imagenes;
    try {
        const response = await fetch(galleryURL);
        if (!response.ok) throw new Error(`Error en la galería: ${response.statusText}`);
        imagenes = await response.json(); // Supongamos que la galería devuelve un JSON con una lista de URLs
    } catch (error) {
        return conn.reply(m.chat, `❎ No se pudieron obtener las imágenes del tema ${tema}.`, m);
    }

    if (imagenes.length === 0) {
        return conn.reply(m.chat, `❎ No hay imágenes en el tema ${tema}.`, m);
    }

    // Cancela trabajos anteriores si existen
    if (global.imageJobs && global.imageJobs[m.chat]) {
        global.imageJobs[m.chat].cancel();
    }

    // Define la tarea programada
    global.imageJobs = global.imageJobs || {};
    global.imageJobs[m.chat] = scheduleJob(`*/${intervalo} * * * *`, async () => {
        const randomImageURL = imagenes[Math.floor(Math.random() * imagenes.length)];
        await conn.sendFile(m.chat, randomImageURL, 'image.jpg', `📸 Imagen del tema ${tema}`, m);
    });

    conn.reply(m.chat, `✅ El envío de imágenes del tema ${tema} ha comenzado. Intervalo: ${intervalo} minutos.`, m);
};

handler.help = ['startgallery <tema> <intervalo>'];
handler.tags = ['media'];
handler.command = ['startgallery'];

export default handler;
import { scheduleJob } from 'node-schedule';
import fetch from 'node-fetch';

// URL base de la galería en línea
const baseURL = 'https://example.com/gallery/'; // Cambia esto a la URL de tu galería en línea

const handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (!args || args.length < 2) {
        return conn.reply(m.chat, `✳️ Uso correcto: ${usedPrefix + command} <tema> <intervalo_en_minutos>`, m);
    }

    const [tema, intervalo] = args;
    const intervaloMinutos = parseInt(intervalo);
    if (isNaN(intervaloMinutos) || intervaloMinutos <= 0) {
        return conn.reply(m.chat, `❎ El intervalo debe ser un número positivo en minutos.`, m);
    }

    // Define la URL de la galería basada en el tema
    const galleryURL = `${baseURL}${tema}`;
    
    // Obtiene las imágenes de la galería
    let imagenes;
    try {
        const response = await fetch(galleryURL);
        if (!response.ok) throw new Error(`Error en la galería: ${response.statusText}`);
        imagenes = await response.json(); // Supongamos que la galería devuelve un JSON con una lista de URLs
    } catch (error) {
        return conn.reply(m.chat, `❎ No se pudieron obtener las imágenes del tema ${tema}.`, m);
    }

    if (imagenes.length === 0) {
        return conn.reply(m.chat, `❎ No hay imágenes en el tema ${tema}.`, m);
    }

    // Cancela trabajos anteriores si existen
    if (global.imageJobs && global.imageJobs[m.chat]) {
        global.imageJobs[m.chat].cancel();
    }

    // Define la tarea programada
    global.imageJobs = global.imageJobs || {};
    global.imageJobs[m.chat] = scheduleJob(`*/${intervalo} * * * *`, async () => {
        const randomImageURL = imagenes[Math.floor(Math.random() * imagenes.length)];
        await conn.sendFile(m.chat, randomImageURL, 'image.jpg', `📸 Imagen del tema ${tema}`, m);
    });

    conn.reply(m.chat, `✅ El envío de imágenes del tema ${tema} ha comenzado. Intervalo: ${intervalo} minutos.`, m);
};

handler.help = ['startgallery <tema> <intervalo>'];
handler.tags = ['media'];
handler.command = ['startgallery'];

export default handler;
import { scheduleJob } from 'node-schedule';
import fetch from 'node-fetch';

// URL base de la galería en línea
const baseURL = 'https://example.com/gallery/'; // Cambia esto a la URL de tu galería en línea

const handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (!args || args.length < 2) {
        return conn.reply(m.chat, `✳️ Uso correcto: ${usedPrefix + command} <tema> <intervalo_en_minutos>`, m);
    }

    const [tema, intervalo] = args;
    const intervaloMinutos = parseInt(intervalo);
    if (isNaN(intervaloMinutos) || intervaloMinutos <= 0) {
        return conn.reply(m.chat, `❎ El intervalo debe ser un número positivo en minutos.`, m);
    }

    // Define la URL de la galería basada en el tema
    const galleryURL = `${baseURL}${tema}`;
    
    // Obtiene las imágenes de la galería
    let imagenes;
    try {
        const response = await fetch(galleryURL);
        if (!response.ok) throw new Error(`Error en la galería: ${response.statusText}`);
        imagenes = await response.json(); // Supongamos que la galería devuelve un JSON con una lista de URLs
    } catch (error) {
        return conn.reply(m.chat, `❎ No se pudieron obtener las imágenes del tema ${tema}.`, m);
    }

    if (imagenes.length === 0) {
        return conn.reply(m.chat, `❎ No hay imágenes en el tema ${tema}.`, m);
    }

    // Cancela trabajos anteriores si existen
    if (global.imageJobs && global.imageJobs[m.chat]) {
        global.imageJobs[m.chat].cancel();
    }

    // Define la tarea programada
    global.imageJobs = global.imageJobs || {};
    global.imageJobs[m.chat] = scheduleJob(`*/${intervalo} * * * *`, async () => {
        const randomImageURL = imagenes[Math.floor(Math.random() * imagenes.length)];
        await conn.sendFile(m.chat, randomImageURL, 'image.jpg', `📸 Imagen del tema ${tema}`, m);
    });

    conn.reply(m.chat, `✅ El envío de imágenes del tema ${tema} ha comenzado. Intervalo: ${intervalo} minutos.`, m);
};

handler.help = ['startgallery <tema> <intervalo>'];
handler.tags = ['media'];
handler.command = ['startgallery'];

export default handler;
