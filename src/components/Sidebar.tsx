import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HomeIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { FaTelegram, FaTwitter, FaDiscord } from 'react-icons/fa';
import { getVersion } from '@/utils/sui';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
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
    <div className={`bg-[var(--color-ocean)] text-[var(--color-cloud)] ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 min-h-screen flex flex-col`}>
      {/* Botón de menú hamburguesa */}
      <div className="p-4 flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-[var(--color-sea)] hover:bg-opacity-90 focus:outline-none"
        >
          <Bars3Icon className="h-6 w-6 text-[var(--color-cloud)]" />
        </button>
      </div>

      {/* Navegación */}
      <nav className="space-y-4 p-4 flex-grow">
        <Link
          href="/"
          className="flex items-center space-x-4 px-4 py-2 rounded bg-[var(--color-sea)] hover:bg-opacity-90"
        >
          <HomeIcon className="h-6 w-6" />
          {isOpen && <span>Dashboard</span>}
        </Link>
        <Link
          href="/token-creator"
          className="flex items-center space-x-4 px-4 py-2 rounded bg-[var(--color-sea)] hover:bg-opacity-90"
        >
          <Cog6ToothIcon className="h-6 w-6" />
          {isOpen && <span>Token Creator</span>}
        </Link>
      </nav>

      {/* Footer con redes sociales e información del nodo */}
      <div className="p-4">
        {/* Redes sociales */}
        <div className={`space-y-2 ${isOpen ? 'block' : 'hidden'}`}>
          <div className="flex justify-center space-x-4">
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-sea)] hover:bg-opacity-90"
            >
              <FaTelegram className="text-[var(--color-cloud)] text-xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-sea)] hover:bg-opacity-90"
            >
              <FaTwitter className="text-[var(--color-cloud)] text-xl" />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-sea)] hover:bg-opacity-90"
            >
              <FaDiscord className="text-[var(--color-cloud)] text-xl" />
            </a>
          </div>
        </div>

        {/* Información del nodo */}
        <div className="mt-4 text-sm text-center text-[var(--color-cloud)]">
          {version === null
            ? 'Conectando...'
            : version === undefined
            ? 'Error al conectar'
            : `Nodo SUI: ${version}`}
        </div>
      </div>
    </div>
  );
}












