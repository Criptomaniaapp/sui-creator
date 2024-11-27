import { SuiClient, suiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/cryptography';
import { TransactionBlock } from '@mysten/sui/transactions';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

// Crear el cliente Sui
export const client = suiClient({
  url: process.env.NEXT_PUBLIC_SUI_RPC_URL || 'https://fullnode.mainnet.sui.io:443', // Endpoint RPC de Sui
});

// Crear el par de claves desde la clave privada del entorno
const privateKeyHex = process.env.SUI_PRIVATE_KEY!;
const privateKeyBytes = Uint8Array.from(Buffer.from(privateKeyHex, 'hex'));
const keypair = Ed25519Keypair.fromSecretKey(privateKeyBytes);

// Función para enviar transacciones firmadas
export async function sendTransaction(tx: TransactionBlock) {
  try {
    const signedTx = await keypair.signTransactionBlock(tx);
    const result = await client.executeTransactionBlock({
      transactionBlock: signedTx,
    });

    console.log('Transaction executed:', result);
    return result;
  } catch (error) {
    console.error('Error sending transaction:', error);
    throw error;
  }
}

// Función para consultar datos básicos de la red
export async function getNetworkStatus() {
  try {
    const status = await client.getNetworkStatus();
    console.log('Network Status:', status);
    return status;
  } catch (error) {
    console.error('Error fetching network status:', error);
    throw error;
  }
}

export { client as suiClient, keypair as signer };
