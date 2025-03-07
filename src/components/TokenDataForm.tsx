// src/components/TokenDataForm.tsx

import React from 'react';

interface TokenDataFormProps {
  tokenName: string;
  setTokenName: (value: string) => void;
  tokenSymbol: string;
  setTokenSymbol: (value: string) => void;
  logoUrl: string;
  setLogoUrl: (value: string) => void;
  supply: string;
  setSupply: (value: string) => void;
  decimals: string;
  setDecimals: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
}

const TokenDataForm: React.FC<TokenDataFormProps> = ({
  tokenName,
  setTokenName,
  tokenSymbol,
  setTokenSymbol,
  logoUrl,
  setLogoUrl,
  supply,
  setSupply,
  decimals,
  setDecimals,
  description,
  setDescription,
}) => {
  return (
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
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project description (optional)"
          className="w-full p-2 mt-1 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </form>
  );
};

export default TokenDataForm;
