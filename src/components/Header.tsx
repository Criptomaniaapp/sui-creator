import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useWallet } from '@suiet/wallet-kit';

export default function Header() {
  const { connected, select, account, disconnect } = useWallet();
  const [network, setNetwork] = useState('Mainnet'); // Default network
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [price, setPrice] = useState<number | null>(null); // SUI Token price

  // Fetch SUI Token price in real-time
  useEffect(() => {
    async function fetchSuiPrice() {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=sui&vs_currencies=usd');
        const data = await response.json();
        setPrice(data.sui?.usd || null);
      } catch (error) {
        console.error('Error fetching SUI price:', error);
        setPrice(null);
      }
    }

    fetchSuiPrice();

    // Update price every minute
    const interval = setInterval(fetchSuiPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  const connectWallet = async () => {
    try {
      await select('Sui Wallet'); // Cambia al nombre de la wallet disponible
      console.log('Wallet connected:', account?.address);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Failed to connect wallet:', error.message);
      } else {
        console.error('Failed to connect wallet:', error);
      }
    }
  };

  // Función para formatear la dirección de la wallet
  const formatAddress = (address: string | undefined | null) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleNetworkChange = (selectedNetwork: string) => {
    setNetwork(selectedNetwork);
    setDropdownOpen(false);
  };


  const handleConnectWallet = async () => {
    console.log('Attempting to connect...');
    try {
      await select('suiet'); // Cambia 'suiet' si utilizas otra wallet
      console.log('Wallet connected:', account?.address);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };
  
  
  return (
    <header className="bg-ocean text-cloud py-4 px-8 shadow-md flex justify-between items-center">
      {/* Left Section: Logo */}
      <div className="flex items-center gap-4">
        <Image
          src="/logo.png" // Path to the Dapp's new logo in the public folder
          alt="Dapp Logo"
          className="h-8 w-auto"
        />
      </div>

      {/* Right Section: Network, SUI Price, and Wallet */}
      <div className="flex items-center gap-6">
        {/* Network Dropdown */}
        <div className="relative flex items-center gap-4">
          {/* SUI Price */}
          <div className="flex items-center gap-2">
            <Image
              src="/Sui_Symbol_White.svg" // Path to the SUI symbol in the public folder
              alt="SUI Price Icon"
              className="h-5 w-5"
            />
            <span className="text-lg font-semibold">
              {price !== null ? `$${price.toFixed(2)}` : 'Loading...'}
            </span>
          </div>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-cloud text-ocean px-4 py-2 rounded-lg hover:bg-sea focus:outline-none"
            >
              <Image
                src="/Sui_Symbol_White.svg" // Path to the SUI symbol in the public folder
                alt="Network Icon"
                className="h-5 w-5"
              />
              <span>{network}</span>
              <svg
                className={`h-4 w-4 transform ${dropdownOpen ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute mt-2 bg-aqua rounded-lg shadow-lg text-sm">
                <button
                  onClick={() => handleNetworkChange('Mainnet')}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-sea text-ocean w-full text-left"
                >
                  <Image
                    src="/Sui_Symbol_White.svg"
                    alt="Mainnet Icon"
                    className="h-5 w-5"
                  />
                  Mainnet
                </button>
                <button
                  onClick={() => handleNetworkChange('Testnet')}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-sea text-ocean w-full text-left"
                >
                  <Image
                    src="/Sui_Symbol_White.svg"
                    alt="Testnet Icon"
                    className="h-5 w-5"
                  />
                  Testnet
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Wallet Button */}
        {!connected ? (
          <button
            onClick={connectWallet}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <div className="bg-gray-700 text-white px-3 py-1 rounded-full flex items-center gap-2">
              <Image
                src="/wallet-icon.png" // Reemplaza con el ícono de wallet que prefieras
                alt="Wallet Icon"
                className="h-4 w-4"
              />
              <span className="font-mono text-sm">{formatAddress(account?.address)}</span>
            </div>
            <button
              onClick={disconnect}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
function getWallets() {
  throw new Error('Function not implemented.');
}

