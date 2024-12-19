import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header'; // Importamos el Header
import { getVersion } from '@/utils/sui';


export default function Dashboard() {
  const [version, setVersion] = useState<string | null | undefined>(null);

  useEffect(() => {
    async function fetchVersion() {
      try {
        const ver = await getVersion();
        setVersion(ver);
      } catch (error) {
        console.error('Error al obtener la versión del nodo:', error);
        setVersion(undefined);
      }
    }

    fetchVersion();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-900 text-white">
        {/* Header agregado */}
        <Header />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
          <p className="text-lg">
            {version === null
              ? 'Conectando al nodo SUI...'
              : version === undefined
              ? 'Error al conectar al nodo SUI'
              : `Nodo SUI Versión: ${version}`}
          </p>
        </main>
      </div>
    </div>
  );
}









