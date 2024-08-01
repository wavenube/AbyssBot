import { setTimeout } from 'node:timers';

const TIME_LIMIT = 60000; // Tiempo en milisegundos (60 segundos)
const MAX_SCORE = 10; // Puntuación máxima para ganar

let gameData = {}; // Para almacenar datos de juegos en curso

const handler = async (m, { conn }) => {
    const chatId = m.chat;

    if (gameData[chatId]) {
        return conn.sendMessage(m.chat, { text: '¡Un juego de adivinanza ya está en curso!' }, { quoted: m });
    }

    // Iniciar un nuevo juego
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    gameData[chatId] = {
        targetNumber,
        players: {},
        timer: null,
        startTime: Date.now(),
    };

    // Enviar mensaje de inicio del juego
    await conn.sendMessage(m.chat, { text: '🎉 ¡El juego de adivinanza ha comenzado! Adivina el número entre 1 y 100. Tienes 60 segundos para participar.' }, { quoted: m });

    // Iniciar el temporizador para el juego
    gameData[chatId].timer = setTimeout(async () => {
        const results = Object.entries(gameData[chatId].players)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3) // Top 3 jugadores
            .map(([userId, score]) => `@${userId} con ${score} puntos`);

        const resultsMessage = results.length > 0
            ? `🕹️ ¡El juego ha terminado!\n\nLos ganadores son:\n${results.join('\n')}`
            : '🕹️ El juego ha terminado sin ganadores.';

        delete gameData[chatId]; // Eliminar los datos del juego

        await conn.sendMessage(m.chat, { text: resultsMessage }, { quoted: m });
    }, TIME_LIMIT);
};

const answerHandler = async (m, { conn, text }) => {
    const chatId = m.chat;
    const guessedNumber = parseInt(text);

    if (!gameData[chatId]) {
        return m.reply('No hay ningún juego en curso. Usa *!guessnumber* para iniciar uno.');
    }

    if (isNaN(guessedNumber) || guessedNumber < 1 || guessedNumber > 100) {
        return m.reply('Por favor, adivina un número válido entre 1 y 100.');
    }

    const game = gameData[chatId];
    const { targetNumber, players } = game;

    if (players[m.sender]) {
        return m.reply('Ya has hecho una adivinanza. Espera a que termine el juego para jugar nuevamente.');
    }

    // Calcular puntos
    const difference = Math.abs(targetNumber - guessedNumber);
    const points = Math.max(0, MAX_SCORE - Math.floor(difference / 10));

    // Guardar el puntaje
    players[m.sender] = (players[m.sender] || 0) + points;

    // Enviar feedback
    if (guessedNumber === targetNumber) {
        await conn.sendMessage(m.chat, { text: `🎉 ¡Correcto! El número era ${targetNumber}. @${m.sender} ha ganado ${points} puntos.` }, { quoted: m });
        delete gameData[chatId]; // Terminar el juego si alguien adivina correctamente
        clearTimeout(game.timer);
    } else if (difference <= 10) {
        await conn.sendMessage(m.chat, { text: `Cálido... El número es ${guessedNumber < targetNumber ? 'mayor' : 'menor'}. Sigue intentando.` }, { quoted: m });
    } else {
        await conn.sendMessage(m.chat, { text: `Frío... El número es ${guessedNumber < targetNumber ? 'mayor' : 'menor'}. Sigue intentando.` }, { quoted: m });
    }
};

handler.command = /^guessnumber$/i;
handler.group = true;
handler.help = ['guessnumber','rndnum'];
handler.tags = ['fun'];

export default { handler, answerHandler };
