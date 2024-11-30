import { createContext, useState, useEffect, ReactNode } from "react";

declare global {
  interface Window {
    suiWallet?: {
      request: (options: { method: string }) => Promise<string[]>;
    };
  }
}

interface WalletContextType {
  walletAddress: string | null;
  isWalletInstalled: boolean;
  connectWallet: () => void;
  disconnectWallet: () => void;
}

export const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);

  useEffect(() => {
    setIsWalletInstalled(typeof window !== "undefined" && !!window.suiWallet);
  }, []);

  const connectWallet = async () => {
    if (!isWalletInstalled) {
      alert("Sui Wallet no está instalada.");
      return;
    }
    try {
      const accounts = await window.suiWallet?.request({ method: "accounts" });
      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0]);
      }
    } catch (error) {
      console.error("Error al conectar la wallet:", error);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
  };

  return (
    <WalletContext.Provider
      value={{ walletAddress, isWalletInstalled, connectWallet, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};
