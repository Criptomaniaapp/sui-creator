import { JsonRpcProvider, Connection, Ed25519Keypair, RawSigner, TransactionBlock } from '@mysten/sui';
import dotenv from 'dotenv';

dotenv.config();

// Configuración del proveedor RPC
const connection = new Connection({
    fullnode: process.env.NEXT_PUBLIC_SUI_RPC_URL!, // URL del RPC (Helius)
});
const provider = new JsonRpcProvider(connection);

// Crear un par de claves usando la clave privada del entorno
const privateKeyBytes = Uint8Array.from(Buffer.from(process.env.SUI_PRIVATE_KEY!, 'hex'));
const keypair = Ed25519Keypair.fromSecretKey(privateKeyBytes);
const signer = new RawSigner(keypair, provider);

// Función para revocar Freeze Authority
export async function revokeFreezeAuthority(objectId: string) {
    try {
        const tx = new TransactionBlock();
        tx.moveCall({
            target: '0x2::token::revoke_freeze_authority', // Dirección del módulo y función
            arguments: [tx.object(objectId)],
        });

        const result = await signer.signAndExecuteTransactionBlock({
            transactionBlock: tx,
        });

        console.log('Revoke Freeze Authority:', result);
        return result;
    } catch (error) {
        console.error('Error revoking Freeze Authority:', error);
        throw error;
    }
}

// Función para revocar Mint Authority
export async function revokeMintAuthority(objectId: string) {
    try {
        const tx = new TransactionBlock();
        tx.moveCall({
            target: '0x2::token::revoke_mint_authority', // Dirección del módulo y función
            arguments: [tx.object(objectId)],
        });

        const result = await signer.signAndExecuteTransactionBlock({
            transactionBlock: tx,
        });

        console.log('Revoke Mint Authority:', result);
        return result;
    } catch (error) {
        console.error('Error revoking Mint Authority:', error);
        throw error;
    }
}

// Función para revocar Metadata Update Authority
export async function revokeMetadataUpdateAuthority(objectId: string) {
    try {
        const tx = new TransactionBlock();
        tx.moveCall({
            target: '0x2::token::revoke_metadata_update_authority', // Dirección del módulo y función
            arguments: [tx.object(objectId)],
        });

        const result = await signer.signAndExecuteTransactionBlock({
            transactionBlock: tx,
        });

        console.log('Revoke Metadata Update Authority:', result);
        return result;
    } catch (error) {
        console.error('Error revoking Metadata Update Authority:', error);
        throw error;
    }
}

// Exportar el proveedor y el firmante
export { provider, signer };
