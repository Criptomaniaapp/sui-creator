// convertToBase58.mjs

import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';
import * as fs from 'node:fs/promises';
import bs58 from 'bs58';

// Generar un nuevo par de claves
const keypair = nacl.sign.keyPair();

// Obtener la clave privada en formato Uint8Array
const privateKeyUint8 = keypair.secretKey;

// Codificar la clave privada en formato Base58
const base58Key = bs58.encode(privateKeyUint8);

// Mostrar la clave en consola
console.log('Clave Privada (Base58):', base58Key);

// Opcional: Guardar la clave privada en un archivo seguro (NO subas este archivo al repositorio)
await fs.writeFile('.private_key', base58Key, { flag: 'w', mode: 0o600 });
