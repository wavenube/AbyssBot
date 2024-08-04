import fs from 'fs';
import { generateWAMessageFromContent, prepareWAMessageMedia, proto } from '@adiwajshing/baileys';

case 'catalogom': {
    // Función ficticia que representa menufollow
    menufollow(from);

    // Leer la imagen desde el sistema de archivos
    const imagePath = './src/abyss2.png';
    const imageBuffer = fs.readFileSync(imagePath);

    // Preparar el mensaje con la imagen
    const messa = await prepareWAMessageMedia({ image: imageBuffer }, { upload: simple.waUploadToServer });

    // Generar el mensaje de catálogo
    const catalog = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
        "productMessage": {
            "product": {
                "productImage": messa.imageMessage,
                "productId": "5760420690656714",
                "title": `© Hola ${pushname} 👋`,
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

    // Enviar el mensaje de catálogo
    simple.relayMessage(m.chat, catalog.message, { messageId: catalog.key.id });
}
break;
