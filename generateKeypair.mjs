// generateKeypair.mjs

import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';
import * as fs from 'node:fs/promises';

// Generar un nuevo par de claves
const keypair = nacl.sign.keyPair();

// Obtener la clave privada en formato hexadecimal
const privateKeyHex = naclUtil.encodeBase64(keypair.secretKey);

// Obtener la clave pública en formato hexadecimal
const publicKeyHex = naclUtil.encodeBase64(keypair.publicKey);

// Mostrar las claves en consola
console.log('Clave Privada (Base64):', privateKeyHex);
console.log('Clave Pública (Base64):', publicKeyHex);

// Opcional: Guardar la clave privada en un archivo seguro (NO subas este archivo al repositorio)
await fs.writeFile('.private_key', privateKeyHex, { flag: 'w', mode: 0o600 });
