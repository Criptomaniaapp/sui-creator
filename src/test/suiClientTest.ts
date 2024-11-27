import { client } from '../utils/suiClient';

async function testGetCoins() {
    try {
        // Reemplaza '<OWNER_ADDRESS>' con una dirección válida
        const ownerAddress = '0xad8f4d5f76c0da4ada7f95d1e0985293556847cb53113196ad2399bd6494fa40';
        const coins = await client.getCoins({ owner: ownerAddress });
        console.log('Coins:', coins);
    } catch (error) {
        console.error('Error fetching coins:', error);
    }
}

// Llamar a la función de prueba
testGetCoins();
