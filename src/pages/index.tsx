import { useEffect, useState } from 'react';
import { getVersion } from '@/utils/sui';

export default function Home() {
  const [version, setVersion] = useState<string | null | undefined>(null);

  useEffect(() => {
    async function fetchVersion() {
      try {
        const ver = await getVersion();
        setVersion(ver);
      } catch (error) {
        console.error('Error al obtener la versión:', error);
        setVersion(undefined); // Representa un error al conectar
      }
    }

    fetchVersion();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Conexión a SUI</h1>
      <p className="text-lg">
        {version === null
          ? 'Conectando...'
          : version === undefined
          ? 'Error al conectar'
          : `Versión del Nodo: ${version}`}
      </p>
    </div>
  );
}

