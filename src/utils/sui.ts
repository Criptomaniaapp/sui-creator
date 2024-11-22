import { SuiClient } from '@mysten/sui/client';

export const client = new SuiClient({
  url: process.env.NEXT_PUBLIC_SUI_FULLNODE_URL!, // Accede a la variable
});

export const getVersion = async () => {
  try {
    const version = await client.getRpcApiVersion();
    return version;
  } catch (error) {
    console.error('Error al obtener la versión del nodo:', error);
    return 'Error';
  }
};

