// src/pages/api/createToken.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { JsonRpcProvider, Ed25519Keypair, RawSigner, TransactionBlock, devnetConnection } from '@mysten/sui.js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tokenData } = req.body;

  // Verificar que PRIVATE_KEY está definida
  const privateKeyHex = process.env.PRIVATE_KEY;
  if (!privateKeyHex) {
    res.status(500).json({ success: false, error: 'La clave privada no está configurada.' });
    return;
  }

  // Verificar que NEXT_PUBLIC_PACKAGE_ID está definida
  const packageId = process.env.NEXT_PUBLIC_PACKAGE_ID;
  if (!packageId) {
    res.status(500).json({ success: false, error: 'El Package ID no está configurado.' });
    return;
  }

  const keypair = Ed25519Keypair.fromSecretKey(Buffer.from(privateKeyHex, 'hex'));
  const provider = new JsonRpcProvider(devnetConnection);
  const signer = new RawSigner(keypair, provider);

  try {
    const moduleName = 'TokenCreator';
    const functionName = 'create_token';

    const tx = new TransactionBlock();

    tx.moveCall({
      target: `${packageId}::${moduleName}::${functionName}`,
      arguments: [
        tx.pure(tokenData.name),
        tx.pure(tokenData.symbol),
        tx.pure(tokenData.total_supply),
        tx.pure(tokenData.decimals),
        tx.pure(tokenData.logo_url),
        tx.pure(tokenData.description),
        tx.pure(tokenData.freeze_authority),
        tx.pure(tokenData.mint_authority),
        tx.pure(tokenData.update_authority),
      ],
    });

    const result = await signer.signAndExecuteTransactionBlock({
      transactionBlock: tx,
      options: { showEffects: true },
    });

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Error al crear el token:', error);

    let errorMessage = 'Error desconocido';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(500).json({ success: false, error: errorMessage });
  }
}
