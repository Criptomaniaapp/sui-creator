import { getFullnodeUrl, SuiClient } from '@mysten/sui/client';
import dotenv from 'dotenv';

dotenv.config();

// Obtén la URL del nodo completo desde las variables de entorno o usa la predeterminada
const rpcUrl = process.env.NEXT_PUBLIC_SUI_RPC_URL || getFullnodeUrl('mainnet');

// Crea una instancia de SuiClient
export const client = new SuiClient({ url: rpcUrl });
