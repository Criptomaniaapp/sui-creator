import { useEffect, useState } from 'react';
import { getVersion } from '../utils/sui';

export default function Home() {
  const [suiVersion, setSuiVersion] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSuiVersion() {
      const version = await getVersion();
      setSuiVersion(version);
    }

    fetchSuiVersion();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Conexión a SUI Testnet</h1>
      <p className="text-lg">
        {suiVersion ? `Versión del Nodo: ${suiVersion}` : 'Conectando...'}
      </p>
    </div>
  );
}


