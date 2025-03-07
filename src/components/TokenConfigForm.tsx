// src/components/TokenConfigForm.tsx

import React from 'react';

interface TokenConfigFormProps {
  showSocialLinks: boolean;
  setShowSocialLinks: (value: boolean) => void;
  showCreatorInfo: boolean;
  setShowCreatorInfo: (value: boolean) => void;
  creatorName: string;
  setCreatorName: (value: string) => void;
  creatorSite: string;
  setCreatorSite: (value: string) => void;
  freezeAuthority: boolean;
  setFreezeAuthority: (value: boolean) => void;
  mintAuthority: boolean;
  setMintAuthority: (value: boolean) => void;
  updateAuthority: boolean;
  setUpdateAuthority: (value: boolean) => void;
}

const TokenConfigForm: React.FC<TokenConfigFormProps> = ({
  showSocialLinks,
  setShowSocialLinks,
  showCreatorInfo,
  setShowCreatorInfo,
  creatorName,
  setCreatorName,
  creatorSite,
  setCreatorSite,
  freezeAuthority,
  setFreezeAuthority,
  mintAuthority,
  setMintAuthority,
  updateAuthority,
  setUpdateAuthority,
}) => {
  return (
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
            <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-checked:bg-blue-500"></div>
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
                  // Si se habilita, limpiar los valores
                  setCreatorName('');
                  setCreatorSite('');
                } else {
                  // Si se deshabilita, asignar valores predeterminados
                  setCreatorName('Suinify');
                  setCreatorSite('https://suinify.io');
                }
              }}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-checked:bg-blue-500"></div>
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
            Default Creator: <strong>{creatorName || 'Suinify'}</strong> - <a href={creatorSite || 'https://suinify.io'} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{creatorSite || 'suinify.io'}</a>
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
            <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-checked:bg-blue-500"></div>
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
            <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-checked:bg-blue-500"></div>
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
            <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-checked:bg-blue-500"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
          </label>
        </div>
      </div>
    </form>
  );
};

export default TokenConfigForm;
