import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    // VCard para mostrar el mensaje del bot como si fuera un contacto
    let fkontak = { 
        "key": { 
            "participants":"0@s.whatsapp.net", 
            "remoteJid": "status@broadcast", 
            "fromMe": false, 
            "id": "Halo" 
        }, 
        "message": { 
            "contactMessage": { 
                "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            }
        }, 
        "participant": "0@s.whatsapp.net"
    };

    if (!args[0]) {
        return await conn.reply(m.chat, '*🤔 ¿Qué estás buscando? Ingresa el enlace de YouTube para descargar el audio*', m, {
            contextInfo: {
                externalAdReply: {
                    mediaUrl: null,
                    mediaType: 1,
                    description: null,
                    title: wm,
                    body: '💫 Super Bot de WhatsApp 🥳',
                    previewType: 0,
                    thumbnail: img.getRandom(),
                    sourceUrl: redes.getRandom()
                }
            }
        });
    }

    let youtubeLink = '';
    if (args[0].includes('you')) {
        youtubeLink = args[0];
    } else {
        const index = parseInt(args[0]) - 1;
        if (index >= 0 && Array.isArray(global.videoList) && global.videoList.length > 0) {
            const matchingItem = global.videoList.find(item => item.from === m.sender);
            if (matchingItem && index < matchingItem.urls.length) {
                youtubeLink = matchingItem.urls[index];
            } else {
                return await conn.reply(m.chat, `⚠️ No se encontró un enlace para ese número, por favor ingrese un número entre 1 y ${matchingItem.urls.length}`, fkontak, {
                    contextInfo: {
                        externalAdReply: {
                            mediaUrl: null,
                            mediaType: 1,
                            description: null,
                            title: fg,
                            body: '💫 Super Bot de WhatsApp 🥳',
                            previewType: 0,
                            thumbnail: img.getRandom(),
                            sourceUrl: redes.getRandom()
                        }
                    }
                });
            }
        }
    }

    conn.reply(m.chat, ['⌛ Espere un momento... Ya estoy descargando tu audio 🍹', '⌛ PROCESANDO... Estoy intentando descargar su Audio, espere 🏃‍♂️💨', 'Calmao pa, estoy buscando tu canción 😎\n\nRecuerda colocar bien el nombre de la canción o el enlace del video de YouTube\n\nSi el comando *play no funciona utiliza el comando *ytmp3*'].getRandom(), m, {
        contextInfo: {
            externalAdReply: {
                mediaUrl: null,
                mediaType: 1,
                description: null,
                title: wm,
                body: '💫 Super Bot de WhatsApp 🥳',
                previewType: 0,
                thumbnail: img.getRandom(),
                sourceUrl: redes.getRandom()
            }
        }
    });

    try {
        // Descargar y enviar audio
        let q = '128kbps';
        let yt = await youtubedl(youtubeLink).catch(async _ => await youtubedlv2(youtubeLink));
        let dl_url = await yt.audio[q].download();
        let ttl = await yt.title;
        await conn.sendFile(m.chat, dl_url, ttl + '.mp3', null, m, false, { mimetype: 'audio/mp4' });
    } catch (err) {
        console.error('Error al intentar descargar con bochilteam scraper:', err);
        try {
            let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${lolkeysapi}&url=${youtubeLink}`);
            let lolh = await lolhuman.json();
            let n = lolh.result.title || 'error';
            await conn.sendMessage(m.chat, { audio: { url: lolh.result.link }, fileName: `${n}.mp3`, mimetype: 'audio/mp4' }, { quoted: m });
        } catch (err) {
            console.error('Error con API Lolhuman:', err);
            try {
                let searchh = await yts(youtubeLink);
                let __res = searchh.all.map(v => v).filter(v => v.type == "video");
                let infoo = await ytdl.getInfo('https://youtu.be/' + __res[0].videoId);
                let ress = await ytdl.chooseFormat(infoo.formats, { filter: 'audioonly' });
                await conn.sendMessage(m.chat, { audio: { url: ress.url }, fileName: __res[0].title + '.mp3', mimetype: 'audio/mp4' }, { quoted: m });
            } catch (err) {
                console.error('Error final:', err);
            }
        }
    }

    if (command == 'ytmp4' || command == 'fgmp4') {
        try {
            let qu = args[1] || '360';
            let q = qu + 'p';
            let yt = await youtubedl(youtubeLink).catch(async _ => await youtubedlv2(youtubeLink));
            let dl_url = await yt.video[q].download();
            let ttl = await yt.title;
            await conn.sendMessage(m.chat, { video: { url: dl_url }, fileName: `${ttl}.mp4`, mimetype: 'video/mp4', caption: `🔰 Aquí está tu video\n🔥 Titulo: ${ttl}`, thumbnail: await fetch(yt.thumbnail) }, { quoted: m });
        } catch (E1) {
            console.error('Error 1:', E1);
            try {
                let mediaa = await ytMp4(youtubeLink);
                await conn.sendMessage(m.chat, { video: { url: mediaa.result }, fileName: `error.mp4`, caption: `_${wm}_`, thumbnail: mediaa.thumb, mimetype: 'video/mp4' }, { quoted: m });
            } catch (E2) {
                console.error('Error 2:', E2);
                try {
                    let lolhuman = await fetch(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${lolkeysapi}&url=${youtubeLink}`);
                    let lolh = await lolhuman.json();
                    let n = lolh.result.title || 'error';
                    let n2 = lolh.result.link;
                    let n3 = lolh.result.size;
                    let n4 = lolh.result.thumbnail;
                    await conn.sendMessage(m.chat, { video: { url: n2 }, fileName: `${n}.mp4`, mimetype: 'video/mp4', caption: `🔰 Aquí está tu video\n🔥 Titulo: ${n}`, thumbnail: await fetch(n4) }, { quoted: m });
                } catch (E3) {
                    console.error('Error 3:', E3);
                }
            }
        }
    }
};

handler.help = ['ytmp4', 'ytmp3'];
handler.tags = ['downloader'];
handler.command = /^ytmp32|ytmp4|fgmp4|audio|fgmp3|dlmp3?$/i;
export default handler;

function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
}

async function ytMp3(url) {
    let getUrl = await ytdl.getInfo(url);
    let result = [];
    for (let item of getUrl.formats) {
        if (item.mimeType === 'audio/webm; codecs="opus"') {
            let { contentLength } = item;
            let bytes = await bytesToSize(contentLength);
            result.push({ audio: item.url, size: bytes });
        }
    }
    let resultFix = result.filter(x => x.audio != undefined && x.size != undefined);
    let tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].audio}`);
    let tinyUrl = tiny.data;
    let title = getUrl.videoDetails.title;
    let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
    return { title, result: tinyUrl, result2: resultFix, thumb };
}

async function ytMp4(url) {
    let getUrl = await ytdl.getInfo(url);
    let result = [];
    for (let item of getUrl.formats) {
        if (item.container === 'mp4' && item.hasVideo && item.hasAudio) {
            let { contentLength } = item;
            let bytes = await bytesToSize(contentLength);
            result.push({ video: item.url, size: bytes });
        }
    }
    let resultFix = result.filter(x => x.video != undefined && x.size != undefined);
    let tiny = await axios.get(`https://tinyurl.com/api-create.php?url=${resultFix[0].video}`);
    let tinyUrl = tiny.data;
    let title = getUrl.videoDetails.title;
    let thumb = getUrl.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url;
    return { title, result: tinyUrl, result2: resultFix, thumb };
}
