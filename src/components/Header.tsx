import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ConnectButton, useWallets } from '@mysten/dapp-kit';

export default function Header() {
  const wallets = useWallets();
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
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

  

  // Encuentra la wallet conectada
  const handleConnect = async () => {
    const wallet = wallets[0]; // Usamos la primera wallet como ejemplo
    if (wallet && wallet.features['standard:connect']) {
      try {
        const response = await wallet.features['standard:connect'].connect();
        const firstAccount = response.accounts?.[0]?.address || null; // Extraemos la dirección de la primera cuenta
        setConnectedWallet(firstAccount);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    }
  };

  const handleDisconnect = () => {
    setConnectedWallet(null);
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
        {connectedWallet ? (
        <button
          onClick={handleDisconnect}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold shadow-lg hover:from-green-500 hover:to-blue-600 transition-transform transform hover:scale-105"
        >
          Connected: {`${connectedWallet.slice(0, 6)}...${connectedWallet.slice(-4)}`}
        </button>
      ) : (
        <button
          onClick={handleConnect}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-aqua-500 to-ocean-600 text-white font-semibold shadow-lg hover:from-#011829-600 hover:to-#030F1C-700 transition-transform transform hover:scale-105"
        >
          Connect Wallet
        </button>
      )}
      </div>
    </header>
  );
}
function getWallets() {
  throw new Error('Function not implemented.');
}

