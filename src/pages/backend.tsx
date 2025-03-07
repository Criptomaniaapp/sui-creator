import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header'; // Importamos el Header

export default function Home() {
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [showCreatorInfo, setShowCreatorInfo] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [inputTag, setInputTag] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [supply] = useState('');
  const [decimals] = useState('');
  const [freezeAuthority] = useState(true);
  const [mintAuthority] = useState(true);
  const [updateAuthority] = useState(true);
  const [creatorName, setCreatorName] = useState('');
  const [creatorSite, setCreatorSite] = useState('');

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

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-900 text-white">
        {/* Header integrado */}
        <Header />
        <main className="flex-1 p-8">
          <h2 className="text-3xl font-semibold mb-6">Step 1: Create Your Token</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulario */}
            <form className="space-y-6">
              {/* Token Name */}
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
              {/* Token Symbol */}
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
              {/* Logo URL */}
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
              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium">Description</label>
                <textarea
                  id="description"
                  placeholder="Project description (optional)"
                  className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                ></textarea>
              </div>
              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium">Tags</label>
                <div className="mt-2 flex items-center gap-2 flex-wrap">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-full text-sm gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-white hover:text-red-400 focus:outline-none"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    value={inputTag}
                    onChange={(e) => setInputTag(e.target.value)}
                    onKeyDown={handleTagInput}
                    placeholder="Add a tag and press Enter"
                    className="p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div className="mt-2 text-sm text-gray-400">
                  Recommended Tags:
                  <div className="flex flex-wrap gap-2 mt-2">
                    {recommendedTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => addTag(tag)}
                        className="px-3 py-1 bg-gray-600 text-white rounded-full hover:bg-blue-500 focus:outline-none text-sm"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
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
                    <div>
                      <label htmlFor="website" className="block text-sm">Website</label>
                      <input
                        type="text"
                        id="website"
                        placeholder="https://yourwebsite.com"
                        className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="twitter" className="block text-sm">Twitter</label>
                      <input
                        type="text"
                        id="twitter"
                        placeholder="https://twitter.com/yourhandle"
                        className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="telegram" className="block text-sm">Telegram</label>
                      <input
                        type="text"
                        id="telegram"
                        placeholder="https://t.me/yourgroup"
                        className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="discord" className="block text-sm">Discord</label>
                      <input
                        type="text"
                        id="discord"
                        placeholder="https://discord.gg/yourlink"
                        className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>
              {/* Custom Creator Information con Toggle */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium">Custom Creator Information (Optional)</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showCreatorInfo}
                      onChange={() => setShowCreatorInfo(!showCreatorInfo)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-blue-500"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </label>
                </div>
                {showCreatorInfo && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="creatorName" className="block text-sm">Creator Name</label>
                      <input
                        type="text"
                        id="creatorName"
                        value={creatorName}
                        onChange={(e) => setCreatorName(e.target.value)}
                        placeholder="Enter creator name"
                        className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="creatorSite" className="block text-sm">Creator Site</label>
                      <input
                        type="text"
                        id="creatorSite"
                        value={creatorSite}
                        onChange={(e) => setCreatorSite(e.target.value)}
                        placeholder="Enter creator site"
                        className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-bold"
              >
                Next Step
              </button>
            </form>
            {/* Token Preview Mejorado */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
              <div className="flex items-center gap-4">
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logoUrl}
                    alt="Token Logo"
                    className="h-16 w-16 object-contain rounded-full border border-gray-600"
                  />
                ) : (
                  <div className="h-16 w-16 flex items-center justify-center bg-gray-700 text-gray-400 rounded-full">
                    Logo
                  </div>
                )}
                <div className="text-left">
                  <h3 className="text-2xl font-semibold">{tokenName || 'Token Name'}</h3>
                  <p className="text-lg text-gray-400">{tokenSymbol || 'Symbol'}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Supply:</span>
                  <span>{supply || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Decimals:</span>
                  <span>{decimals || 'N/A'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Freeze Authority:</span>
                  <span>{freezeAuthority ? 'Active' : 'Revoked'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Mint Authority:</span>
                  <span>{mintAuthority ? 'Active' : 'Revoked'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Update Authority:</span>
                  <span>{updateAuthority ? 'Active' : 'Revoked'}</span>
                </div>
                <div className="mt-4 space-y-2">
    <div className="flex justify-between text-sm">
      <span>Creator:</span>
      <span>{creatorName || 'Suinify'}</span>
    </div>
    <div className="flex justify-between text-sm">
      <span>Creator Site:</span>
      <a
        href={creatorSite || 'https://suinify.io'}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        {creatorSite || 'https://suinify.io'}
      </a>
    </div>
    </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}