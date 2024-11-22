import { JsonRpcProvider, devnetConnection } from '@mysten/sui';

export const provider = new JsonRpcProvider(devnetConnection);

export const getVersion = async () => {
  try {
    const version = await provider.getRpcApiVersion();
    return version;
  } catch (error) {
    console.error('Error fetching version:', error);
    return 'Error';
  }
};



