import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk' 
import { fileURLToPath } from 'url' 

global.owner = [
  ['34682075812', 'zephyr', true],
  ['5491168352204']
] //Numeros de owner 

global.mods = [''] 
global.prems = ['34682075812', '34682075812']
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
global.fgsc = 'https://github.com/FG98F/Abyss_WaBot' 
global.fgpyp = 'https://paypal.me/'
global.fglog = 'https://i.ibb.co/1zdz2j3/logo.jpgs' 

//--- Grupos WA
global.id_canal = '0029VakDx9I0gcfFXnzZIX2v@newsletter' //-ID de canal de WhatsApp
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

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
