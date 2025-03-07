// convertToBech32.mjs

import nacl from 'tweetnacl';
import naclUtil from 'tweetnacl-util';
import * as fs from 'node:fs/promises';
import { bech32 } from 'bech32';

// Generar un nuevo par de claves
const keypair = nacl.sign.keyPair();

// Obtener la clave privada en formato Uint8Array
const privateKeyUint8 = keypair.secretKey;

// Codificar la clave privada en formato Bech32
const words = bech32.toWords(privateKeyUint8);
const bech32Key = bech32.encode('priv', words);

// Mostrar la clave en consola
console.log('Clave Privada (Bech32):', bech32Key);

// Opcional: Guardar la clave privada en un archivo seguro (NO subas este archivo al repositorio)
await fs.writeFile('.private_key', bech32Key, { flag: 'w', mode: 0o600 });
