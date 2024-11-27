import { client } from '../utils/suiClient.js';


async function testClientConnection() {
    try {
        const version = await client.getRpcApiVersion();
        console.log('Conexión exitosa. Versión del RPC:', version);
    } catch (error) {
        console.error('Error probando la conexión al cliente:', error);
    }
}

testClientConnection();

