import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { WalletContext } from '@/context/WalletContext';

export default function Header() {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error('Header debe estar dentro de un WalletProvider');
  }

  const { walletAddress, connectWallet, disconnectWallet, isWalletInstalled } = context;
  const [network, setNetwork] = useState('Mainnet');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [price, setPrice] = useState<number | null>(null);

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
    const interval = setInterval(fetchSuiPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleNetworkChange = (selectedNetwork: string) => {
    setNetwork(selectedNetwork);
    setDropdownOpen(false);

    const rpcUrl =
      selectedNetwork === 'Mainnet'
        ? 'https://fullnode.mainnet.sui.io:443'
        : 'https://fullnode.testnet.sui.io:443';
    console.log(`Red seleccionada: ${selectedNetwork} (${rpcUrl})`);
  };

  return (
    <header className="bg-ocean text-cloud py-4 px-8 shadow-md flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Image src="/logo.png" alt="Logo de la Dapp" width={50} height={50} />
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Image src="/Sui_Symbol_White.svg" alt="SUI Price Icon" width={20} height={20} />
          <span className="text-lg font-semibold">
            {price !== null ? `$${price.toFixed(2)}` : 'Cargando...'}
          </span>
        </div>

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

        {!walletAddress ? (
          <button
            onClick={() => {
              if (!isWalletInstalled) {
                alert('Sui Wallet no está instalada. Por favor, instala la extensión.');
                return;
              }
              connectWallet();
            }}
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

