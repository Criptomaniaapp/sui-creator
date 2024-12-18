import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import StepForm from '@/components/StepForm';
import TokenPreview from '@/components/TokenPreview';

export default function Home() {
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          <div>
                <label htmlFor="description" className="block text-sm font-medium">Description</label>
                <textarea
                  id="description"
                  placeholder="Project description (optional)"
                  className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                ></textarea>
              </div>
        </form>
      ),
    },
    {
      title: 'Token Configuration',
      content: (
        <form className="space-y-6">
          {/* Redes Sociales con Toggle */}
          <div>
            <div className="flex items-center justify-between">
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
            {showSocialLinks && (
              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  placeholder="Website"
                  className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Telegram"
                  className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Twitter"
                  className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Discord"
                  className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>
    
          {/* Información del Creador con Toggle */}
<div>
  <div className="flex items-center justify-between">
    <label className="block text-sm font-medium">Custom Creator Information (Optional)</label>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={showCreatorInfo}
        onChange={() => {
          setShowCreatorInfo(!showCreatorInfo);
          if (!showCreatorInfo) {
            // Si se deshabilita, asignar valores predeterminados
            setCreatorName('Suinify');
            setCreatorSite('https://suinify.io');
          } else {
            // Si se habilita, limpiar los valores
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
  {showCreatorInfo ? (
    <div className="mt-4 space-y-4">
      <input
        type="text"
        placeholder="Creator Name"
        value={creatorName}
        onChange={(e) => setCreatorName(e.target.value)}
        className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Creator Site"
        value={creatorSite}
        onChange={(e) => setCreatorSite(e.target.value)}
        className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  ) : (
    <p className="mt-2 text-sm text-gray-400">
      Default Creator: <strong>Suinify</strong> - <a href="https://suinify.io" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">suinify.io</a>
    </p>
  )}
</div>

    
          {/* Opciones de Revocación */}
          <div>
            {/* Revoke Freeze Authority */}
            <div className="flex items-center justify-between mt-4">
              <label className="block text-sm font-medium">
                Revoke Freeze Authority
                <p className="text-xs text-gray-400">Renounce the ability to freeze holder accounts. (Mandatory for OpenBook Market ID)</p>
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={freezeAuthority}
                  onChange={() => setFreezeAuthority(!freezeAuthority)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-500"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
              </label>
            </div>
    
            {/* Revoke Mint Authority */}
            <div className="flex items-center justify-between mt-4">
              <label className="block text-sm font-medium">
                Revoke Mint Authority
                <p className="text-xs text-gray-400">Renounce the ability to mint new tokens.</p>
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={mintAuthority}
                  onChange={() => setMintAuthority(!mintAuthority)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-500"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
              </label>
            </div>
    
            {/* Revoke Metadata Update Authority */}
            <div className="flex items-center justify-between mt-4">
              <label className="block text-sm font-medium">
                Revoke Metadata Update Authority
                <p className="text-xs text-gray-400">Renounce the ability to update token metadata.</p>
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={updateAuthority}
                  onChange={() => setUpdateAuthority(!updateAuthority)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-500"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
              </label>
            </div>
          </div>
        </form>
      ),
    },
    
    {
      title: 'Finalize & Deploy',
      content: (
        <div>
          <p>Your token is ready to be deployed 🎉</p>
        </div>
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
          creatorSite={showCreatorInfo && creatorSite ? creatorSite : 'https://suinify.io'}
          freezeAuthority={freezeAuthority}
          mintAuthority={mintAuthority}
          updateAuthority={updateAuthority}
        />
      </div>
    </main>
  </div>
</div>


  );
}




