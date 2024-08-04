import fs from 'fs';
import { generateWAMessageFromContent, prepareWAMessageMedia, proto } from '@adiwajshing/baileys';

const menufollow = (from) => {
    // Implementa la función menufollow
    console.log(`Following menu for: ${from}`);
};

const handler = async (m, { conn, text, args, usedPrefix, command }) => {
    if (command === 'catalogom') {
        menufollow(m.chat);

        const imagePath = './src/abyss2.png';
        if (!fs.existsSync(imagePath)) {
            throw new Error(`Image not found: ${imagePath}`);
        }

        const imageBuffer = fs.readFileSync(imagePath);
        const messa = await prepareWAMessageMedia({ image: imageBuffer }, { upload: conn.waUploadToServer });

        const catalog = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
            "productMessage": {
                "product": {
                    "productImage": messa.imageMessage,
                    "productId": "5760420690656714",
                    "title": `© Hola ${m.pushName} 👋`,
                    "description": `Ⓒ_乂 Abyss - Bot`,
                    "currencyCode": "USD",
                    "footerText": `😆🖕Idiot`,
                    "priceAmount1000": "999999999",
                    "productImageCount": 1,
                    "firstImageId": 1,
                    "salePriceAmount1000": "-1111",
                    "retailerId": "© Priv",
                    "url": "https://instagram.com/abyss_wabot"
                },
                "businessOwnerJid": "5492613619545@s.whatsapp.net",
            }
        }), { userJid: m.chat, quoted: m });

        conn.relayMessage(m.chat, catalog.message, { messageId: catalog.key.id });
    }
};

handler.command = /^catalogom$/i;
export default handler;
