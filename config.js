import { watchFile, unwatchFile } from 'fs'
import fs from 'fs'; 
import chalk from 'chalk' 
import { fileURLToPath } from 'url' 
import { scheduleJob } from 'node-schedule';
import node-schedule from 'node-schedule'

global.owner = [
  ['34682075812', 'FG98', true],
  ['5492613619545']
] //Numeros de owner 

global.mods = [''] 
global.prems = ['34682075812', '5492613619545']
global.APIs = { // API Prefix
  // name: 'https://website' 
  nrtm: 'https://fg-nrtm.ddns.net',
  fgmods: 'https://api.fgmods.xyz'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.fgmods.xyz': 'he8jaYiZ' //-- 100 de límite diario --- Regístrese en https://api.fgmods.xyz/
}

// Sticker WM
global.packname = 'Abyss┃ᴮᴼᵀ' 
global.author = '@ZephyrByte' 

//--info FG
global.botName = 'Abyss'
global.fgig = 'https://instagram.com/abyss_wabot' 
global.fgsc = 'Error' 
global.fgyt = 'Error'
global.fgpyp = 'Error'
global.fglog = 'https://i.ibb.co/QdGBLgw/zephyr2.png' 

//--- Grupos WA
global.id_canal = '120363318622514917@newsletter' //-ID de canal de WhatsApp
global.fgcanal = 'https://whatsapp.com/channel/0029VakDx9I0gcfFXnzZIX2v'
global.bgp = 'https://chat.whatsapp.com/IYsbScC3cMzBcakINRWJL6'
global.bgp2 = 'https://chat.whatsapp.com/IYsbScC3cMzBcakINRWJL6'
global.bgp3 = 'https://chat.whatsapp.com/IYsbScC3cMzBcakINRWJL6' //--GP NSFW

global.wait = '⌛ _Cargando..._\n*▬▬▬▭*'
global.rwait = '⌛'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌' 
global.xmoji = '🔥' 

global.multiplier = 69 
global.maxwarn = '2' // máxima advertencias
global.fs = fs

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
