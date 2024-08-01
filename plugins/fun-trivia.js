import axios from 'axios';

// URL de la API de Trivia
const TRIVIA_API_URL = 'https://opentdb.com/api.php?amount=1&type=multiple';
const triviaData = {}; // Objeto para almacenar datos de trivia por grupo

const handler = async (m, { conn, text }) => {
    const chatId = m.chat;

    if (text && text.toLowerCase() === 'trivia') {
        // Obtener una pregunta de trivia
        try {
            const response = await axios.get(TRIVIA_API_URL);
            const trivia = response.data.results[0];
            const question = trivia.question;
            const correctAnswer = trivia.correct_answer;
            const allAnswers = [...trivia.incorrect_answers, correctAnswer].sort(() => Math.random() - 0.5);

            // Enviar la pregunta al chat
            let message = `🎉 *Trivia Time!*\n\n${question}\n\n`;
            allAnswers.forEach((answer, index) => {
                message += `${index + 1}. ${answer}\n`;
            });

            // Guardar la respuesta correcta para verificación
            triviaData[chatId] = { correctAnswer, asked: Date.now(), allAnswers };

            await conn.sendMessage(chatId, { text: message }, { quoted: m });
        } catch (error) {
            m.reply('Hubo un error al obtener la trivia. Por favor intenta más tarde.');
            console.error(error);
        }
    } else if (/^[1-4]$/.test(text)) {
        // Verificar si hay una pregunta activa en el grupo
        if (triviaData[chatId] && triviaData[chatId].asked) {
            const correctAnswer = triviaData[chatId].correctAnswer;
            const answerNumber = parseInt(text);

            // Obtener la opción seleccionada por el usuario
            const selectedAnswer = triviaData[chatId].allAnswers[answerNumber - 1];

            if (selectedAnswer === correctAnswer) {
                conn.sendMessage(chatId, '¡Correcto! 🎉', { quoted: m });
            } else {
                conn.sendMessage(chatId, 'Incorrecto. 😔', { quoted: m });
            }

            // Limpiar los datos de trivia después de la respuesta
            delete triviaData[chatId];
        } else {
            conn.sendMessage(chatId, 'No hay una trivia activa en este momento. Usa el comando *trivia* para comenzar.', { quoted: m });
        }
    } else {
        conn.sendMessage(chatId, 'Por favor usa el comando *trivia* para comenzar un juego de trivia o responde con un número del 1 al 4.', { quoted: m });
    }
};

handler.command = /^(trivia|quiz)$/i;
handler.group = true; // Puede ser usado en grupos
handler.help = ['trivia'];
handler.tags = ['fun'];

export default handler;
