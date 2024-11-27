import { SuiClient } from '@mysten/sui';
import dotenv from 'dotenv';

dotenv.config();

// Crear el cliente Sui
export const client = new SuiClient({
  url: process.env.NEXT_PUBLIC_SUI_RPC_URL || 'https://fullnode.mainnet.sui.io:443',
});

// Probar conexión con la wallet
async function testConnection() {
  try {
    const version = await client.getRpcApiVersion();
    console.log('Conexión exitosa. Versión del RPC:', version);
  } catch (error) {
    console.error('Error al conectar con la red SUI:', error);
  }
}

testConnection();

