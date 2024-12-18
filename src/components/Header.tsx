import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useWallet } from '@suiet/wallet-kit';

export default function Header() {
  const { connected, select, account, disconnect } = useWallet();
  const [network, setNetwork] = useState('Mainnet'); // Default network
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [price, setPrice] = useState<number | null>(null); // SUI Token price

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
      await select('suiet'); // Cambia 'suiet' por el nombre de tu wallet si es necesario
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
          src="/logo.png" // Path to the Dapp's logo
          alt="Dapp Logo"
          className="h-8 w-auto"
        />
      </div>

      {/* Right Section: Network, SUI Price, and Wallet */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Image
            src="/Sui_Symbol_White.svg"
            alt="SUI Price Icon"
            className="h-5 w-5"
          />
          <span className="text-lg font-semibold">
            {price !== null ? `$${price.toFixed(2)}` : 'Loading...'}
          </span>
        </div>
        {!connected ? (
          <button
            onClick={connectWallet}
            className="bg-sea hover:bg-blue-500 px-4 py-2 rounded-lg text-white font-semibold focus:outline-none"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="relative">
            <button
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg focus:outline-none"
            >
              <span>{account?.address}</span>
            </button>
            <div className="absolute mt-2 bg-gray-700 rounded-lg shadow-lg text-sm">
              <button
                onClick={disconnect}
                className="block px-4 py-2 hover:bg-gray-600 w-full text-left"
              >
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

