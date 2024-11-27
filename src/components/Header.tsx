import { useState, useEffect } from 'react';


declare global {
  interface Window {
    suiWallet?: any; // Declaración global para la extensión de Sui Wallet
  }
}

export default function Header() {
  const [network, setNetwork] = useState('Mainnet'); // Red por defecto
  const [walletAddress, setWalletAddress] = useState<string | null>(null); // Dirección de la wallet
  const [dropdownOpen, setDropdownOpen] = useState(false); // Estado del dropdown de red
  const [price, setPrice] = useState<number | null>(null); // Precio del token SUI

  // Obtener el precio del token SUI en tiempo real
  useEffect(() => {
    async function fetchSuiPrice() {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=sui&vs_currencies=usd');
        const data = await response.json();
        setPrice(data.sui?.usd || null);
      } catch (error) {
        console.error('Error al obtener el precio de SUI:', error);
        setPrice(null);
      }
    }

    fetchSuiPrice();
    const interval = setInterval(fetchSuiPrice, 60000); // Actualiza cada minuto
    return () => clearInterval(interval);
  }, []);

  // Al cargar la página, verificar si hay una wallet conectada previamente
  useEffect(() => {
    if (window.suiWallet) {
      console.log('Sui Wallet detectada:', window.suiWallet);
    } else {
      console.log('Sui Wallet no detectada.');
    }
  }, []);

  // Conectar la wallet
  async function connectWallet() {
    const wallet = window.suiWallet;

    if (!wallet) {
      alert('Sui Wallet no está instalada. Por favor, instala la extensión.');
      return;
    }

    try {
      const accounts = await wallet.request({ method: 'sui_connect' });
      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0]);
        localStorage.setItem('walletAddress', accounts[0]); // Guardar en localStorage
        console.log('Wallet conectada:', accounts[0]);
      } else {
        alert('No se encontró ninguna cuenta conectada.');
      }
    } catch (error) {
      console.error('Error al conectar la wallet:', error);
      alert('No se pudo conectar la wallet. Por favor, inténtalo de nuevo.');
    }
  }

  // Desconectar la wallet
  function disconnectWallet() {
    setWalletAddress(null);
    localStorage.removeItem('walletAddress'); // Eliminar de localStorage
    console.log('Wallet desconectada.');
  }

  // Cambiar la red seleccionada
  const handleNetworkChange = (selectedNetwork: string) => {
    setNetwork(selectedNetwork);
    setDropdownOpen(false);
  };

  return (
    <header className="bg-ocean text-cloud py-4 px-8 shadow-md flex justify-between items-center">
      {/* Sección izquierda: Logo */}
      <div className="flex items-center gap-4">
        <img
          src="/logo.png"
          alt="Logo de la Dapp"
          className="h-8 w-auto"
        />
      </div>

      {/* Sección derecha: Red, precio de SUI y wallet */}
      <div className="flex items-center gap-6">
        {/* Precio del token SUI */}
        <div className="flex items-center gap-2">
          <img
            src="/Sui_Symbol_White.svg"
            alt="SUI Price Icon"
            className="h-5 w-5"
          />
          <span className="text-lg font-semibold">
            {price !== null ? `$${price.toFixed(2)}` : 'Cargando...'}
          </span>
        </div>

        {/* Dropdown de red */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-cloud text-ocean px-4 py-2 rounded-lg hover:bg-sea focus:outline-none"
          >
            {network}
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-aqua rounded-lg shadow-lg text-sm">
              <button
                onClick={() => handleNetworkChange('Mainnet')}
                className="block px-4 py-2 hover:bg-sea text-ocean w-full text-left"
              >
                Mainnet
              </button>
              <button
                onClick={() => handleNetworkChange('Testnet')}
                className="block px-4 py-2 hover:bg-sea text-ocean w-full text-left"
              >
                Testnet
              </button>
            </div>
          )}
        </div>

        {/* Botón para conectar/desconectar wallet */}
        {!walletAddress ? (
          <button
            onClick={connectWallet}
            className="bg-sea hover:bg-blue-500 px-4 py-2 rounded-lg text-white font-semibold focus:outline-none"
          >
            Conectar Wallet
          </button>
        ) : (
          <div className="relative flex items-center gap-4">
            <span className="text-sm">
              Conectado: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </span>
            <button
              onClick={disconnectWallet}
              className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg text-white font-semibold focus:outline-none"
            >
              Desconectar
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
