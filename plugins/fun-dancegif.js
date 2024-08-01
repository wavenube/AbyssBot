import axios from 'axios';

const TRIVIA_API_URL = 'https://opentdb.com/api.php?amount=1&type=multiple';

const handler = async (m, { conn }) => {
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
        conn.data = conn.data || {};
        conn.data[m.chat] = { correctAnswer, asked: Date.now() };

        await conn.sendMessage(m.chat, { text: message }, { quoted: m });
    } catch (error) {
        m.reply('Hubo un error al obtener la trivia. Por favor intenta más tarde.');
        console.error(error);
    }
};

const answerHandler = async (m, { conn, text }) => {
    if (conn.data && conn.data[m.chat] && conn.data[m.chat].asked) {
        const correctAnswer = conn.data[m.chat].correctAnswer;
        const answerNumber = parseInt(text);

        if (answerNumber && answerNumber >= 1 && answerNumber <= 4) {
            const selectedAnswer = conn.data[m.chat].allAnswers[answerNumber - 1];

            if (selectedAnswer === correctAnswer) {
                conn.sendMessage(m.chat, '¡Correcto! 🎉', { quoted: m });
            } else {
                conn.sendMessage(m.chat, 'Incorrecto. 😔', { quoted: m });
            }
        } else {
            conn.sendMessage(m.chat, 'Por favor selecciona una opción válida (1-4).', { quoted: m });
        }
    }
};

handler.command = /^(trivia|quiz)$/i;
handler.group = true;

export default handler;
