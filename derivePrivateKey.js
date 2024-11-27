const bip39 = require('bip39');
const { derivePath } = require('ed25519-hd-key');

// Generar un nuevo conjunto de palabras mnemotécnicas (mnemonic)
const mnemonic = bip39.generateMnemonic();
console.log('Mnemonic:', mnemonic);

// Generar la clave privada a partir del mnemonic
const path = "m/44'/784'/0'/0'/0'";
const seed = bip39.mnemonicToSeedSync(mnemonic);
const keypair = derivePath(path, seed.toString('hex'));

console.log('Private Key (Hex):', Buffer.from(keypair.key).toString('hex'));
console.log('Public Key (Hex):', Buffer.from(keypair.key).slice(32).toString('hex'));
