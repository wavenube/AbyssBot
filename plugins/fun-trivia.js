import axios from 'axios';

const TRIVIA_API_URL = 'https://opentdb.com/api.php?amount=1&type=multiple';
const triviaData = {}; // Objeto para almacenar datos de trivia por grupo

// Comando para iniciar el juego de trivia
const triviaHandler = async (m, { conn }) => {
    const chatId = m.chat;
    
    try {
        // Obtener una pregunta de trivia
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
        triviaData[chatId] = { correctAnswer, asked: Date.now() };

        await conn.sendMessage(chatId, { text: message }, { quoted: m });
    } catch (error) {
        m.reply('Hubo un error al obtener la trivia. Por favor intenta más tarde.');
        console.error(error);
    }
};

// Manejador para verificar las respuestas
const answerHandler = async (m, { conn, text }) => {
    const chatId = m.chat;
    
    // Verificar si hay una pregunta activa en el grupo
    if (triviaData[chatId] && triviaData[chatId].asked) {
        const correctAnswer = triviaData[chatId].correctAnswer;
        const allAnswers = [1, 2, 3, 4]; // Opciones válidas para la trivia

        // Verificar si la respuesta es válida
        const answerNumber = parseInt(text);
        if (allAnswers.includes(answerNumber)) {
            // Obtener la opción seleccionada por el usuario
            const selectedAnswer = allAnswers[answerNumber - 1];

            if (selectedAnswer === correctAnswer) {
                conn.sendMessage(chatId, '¡Correcto! 🎉', { quoted: m });
            } else {
                conn.sendMessage(chatId, 'Incorrecto. 😔', { quoted: m });
            }

            // Limpiar los datos de trivia después de la respuesta
            delete triviaData[chatId];
        } else {
            conn.sendMessage(chatId, 'Por favor selecciona una opción válida (1-4).', { quoted: m });
        }
    }
};

export default {
    triviaHandler,
    answerHandler,
};
handler.command = /^(quote|cita)$/i;
handler.group = false; // Puede ser usado en chats individuales
handler.help = ['quote'];
handler.tags = ['fun'];

export default handler;
