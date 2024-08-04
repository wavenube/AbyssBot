case 'catalogom': {
menufollow(from)       
var messa = await prepareWAMessageMedia({ image: fs.readFileSync('./src/abyss2.png) }, { upload: simple.waUploadToServer })
var catalog = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
"productMessage": {
"product": {
"productImage": messa.imageMessage,
"productId": "5760420690656714",
"title": ` © Hola ${pushname} 👋`,
"description": `	      Ⓒ_乂 Abyss - Bot`,
"currencyCode": "USD",
"footerText": ` 😆🖕Idiot`,
"priceAmount1000": "999999999",
"productImageCount": 1,
"firstImageId": 1,
"salePriceAmount1000": "-1111",
"retailerId": © Priv,
"url": "https://instagram.com/abyss_wabot"
},
"businessOwnerJid": "5492613619545@s.whatsapp.net",
}
}), { userJid: m.chat, quoted: m })
simple.relayMessage(m.chat, catalog.message, { messageId: catalog.key.id })
}
break
