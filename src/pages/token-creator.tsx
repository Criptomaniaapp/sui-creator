import { useState, useContext } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import StepForm from '@/components/StepForm';
import TokenPreview from '@/components/TokenPreview';
import { WalletContext } from '@/context/WalletContext';

export default function TokenCreator() {
  const { walletAddress, connectWallet, disconnectWallet } = useContext(WalletContext); // Uso del contexto de Wallet

  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [supply, setSupply] = useState('');
  const [decimals, setDecimals] = useState('');
  const [freezeAuthority, setFreezeAuthority] = useState(true);
  const [mintAuthority, setMintAuthority] = useState(true);
  const [updateAuthority, setUpdateAuthority] = useState(true);
  const [creatorName, setCreatorName] = useState('');
  const [creatorSite, setCreatorSite] = useState('');
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [showCreatorInfo, setShowCreatorInfo] = useState(false);

  const recommendedTags = ['Meme', 'Airdrop', 'FanToken', 'Tokenization', 'NFT', 'DeFi', 'Gaming'];

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags((prev) => [...prev, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputTag.trim() !== '') {
      e.preventDefault();
      addTag(inputTag.trim());
      setInputTag('');
    }
  };

  // Configuración de pasos
  const steps = [
    {
      title: 'Upload Info',
      content: (
        <form className="space-y-6">
          <div>
            <label htmlFor="tokenName" className="block text-sm font-medium">Token Name</label>
            <input
              type="text"
              id="tokenName"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              placeholder="Enter token name"
              className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="tokenSymbol" className="block text-sm font-medium">Token Symbol</label>
            <input
              type="text"
              id="tokenSymbol"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
              placeholder="Enter token symbol"
              className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="logoUrl" className="block text-sm font-medium">Logo URL</label>
            <input
              type="text"
              id="logoUrl"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="Enter image URL or upload image"
              className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="supply" className="block text-sm font-medium">Total Supply</label>
            <input
              type="number"
              id="supply"
              value={supply}
              onChange={(e) => setSupply(e.target.value)}
              placeholder="Enter total supply"
              className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="decimals" className="block text-sm font-medium">Decimals</label>
            <input
              type="number"
              id="decimals"
              value={decimals}
              onChange={(e) => setDecimals(e.target.value)}
              placeholder="Enter decimals"
              className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      ),
    },
    {
      title: 'Token Configuration',
      content: (
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium">Social Links (Optional)</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showSocialLinks}
                onChange={() => setShowSocialLinks(!showSocialLinks)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-500"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium">Custom Creator Information (Optional)</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showCreatorInfo}
                onChange={() => {
                  setShowCreatorInfo(!showCreatorInfo);
                  if (!showCreatorInfo) {
                    setCreatorName('Suinify');
                    setCreatorSite('https://suinify.io');
                  } else {
                    setCreatorName('');
                    setCreatorSite('');
                  }
                }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-500"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
            </label>
          </div>
        </form>
      ),
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-900 text-white">
        <Header />
        <main className="flex-1 p-8 grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <StepForm steps={steps} />
          </div>
          <div className="col-span-1">
            <TokenPreview
              tokenName={tokenName}
              tokenSymbol={tokenSymbol}
              logoUrl={logoUrl}
              supply={supply}
              decimals={decimals}
              creatorName={showCreatorInfo && creatorName ? creatorName : 'Suinify'}
              creatorSite={showCreatorInfo && creatorSite ? creatorSite : 'https://suinify.io'} freezeAuthority={false} mintAuthority={false} updateAuthority={false}            />
          </div>
        </main>
      </div>
    </div>
  );
}
