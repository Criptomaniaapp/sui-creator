// src/pages/index.tsx

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import StepForm from '@/components/StepForm';
import TokenPreview from '@/components/TokenPreview';
import TokenDataForm from '@/components/TokenDataForm';
import TokenConfigForm from '@/components/TokenConfigForm';

export default function Home() {
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

  const createToken = async () => {
    const tokenData = {
      name: tokenName,
      symbol: tokenSymbol,
      total_supply: parseInt(supply),
      decimals: parseInt(decimals),
      logo_url: logoUrl,
      description: description,
      freeze_authority: freezeAuthority,
      mint_authority: mintAuthority,
      update_authority: updateAuthority,
    };

    try {
      const response = await fetch('/api/createToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tokenData }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Token creado:', data.result);
        // Aquí puedes agregar lógica adicional, como mostrar un mensaje al usuario
      } else {
        console.error('Error al crear el token:', data.error);
        // Manejar el error en la interfaz de usuario
      }
    } catch (error) {
      console.error('Error al crear el token:', error);
      // Manejar el error en la interfaz de usuario
    }
  };

  // Configuración de pasos
  const steps = [
    {
      title: 'Upload Info',
      content: (
        <TokenDataForm 
          tokenName={tokenName} 
          setTokenName={setTokenName} 
          tokenSymbol={tokenSymbol} 
          setTokenSymbol={setTokenSymbol} 
          logoUrl={logoUrl} 
          setLogoUrl={setLogoUrl} 
          supply={supply} 
          setSupply={setSupply} 
          decimals={decimals} 
          setDecimals={setDecimals} 
          description={description} 
          setDescription={setDescription} 
        />
      ),
    },
    {
      title: 'Token Configuration',
      content: (
        <TokenConfigForm 
          showSocialLinks={showSocialLinks} 
          setShowSocialLinks={setShowSocialLinks} 
          showCreatorInfo={showCreatorInfo} 
          setShowCreatorInfo={setShowCreatorInfo} 
          creatorName={creatorName} 
          setCreatorName={setCreatorName} 
          creatorSite={creatorSite} 
          setCreatorSite={setCreatorSite} 
          freezeAuthority={freezeAuthority} 
          setFreezeAuthority={setFreezeAuthority} 
          mintAuthority={mintAuthority} 
          setMintAuthority={setMintAuthority} 
          updateAuthority={updateAuthority} 
          setUpdateAuthority={setUpdateAuthority} 
        />
      ),
    },
    {
      title: 'Finalize & Deploy',
      content: (
        <div>
          <p>Your token is ready to be deployed 🎉</p>
          <button 
            onClick={createToken} 
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Deploy Token
          </button>
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
