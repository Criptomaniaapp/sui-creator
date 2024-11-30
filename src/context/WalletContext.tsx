import { createContext, useState, useEffect, ReactNode } from "react";

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
    // Verificar si la wallet está instalada
    setIsWalletInstalled(typeof window !== "undefined" && !!window.suiWallet);

    // Recuperar la dirección de wallet si estaba conectada anteriormente
    const savedAddress = localStorage.getItem("walletAddress");
    if (savedAddress) {
      setWalletAddress(savedAddress);
    }
  }, []);

  const connectWallet = async () => {
    if (!isWalletInstalled) {
      alert("Sui Wallet no está instalada. Por favor, instala la extensión.");
      return;
    }
    try {
      const accounts = await window.suiWallet.request({ method: "accounts" });
      if (accounts && accounts.length > 0) {
        setWalletAddress(accounts[0]);
        localStorage.setItem("walletAddress", accounts[0]); // Guardar la dirección en localStorage
        console.log("Wallet conectada:", accounts[0]);
      } else {
        alert("No se encontraron cuentas en la wallet.");
      }
    } catch (error) {
      console.error("Error al conectar la wallet:", error);
      alert("Error al conectar la wallet. Revisa la consola para más detalles.");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    localStorage.removeItem("walletAddress"); // Eliminar la dirección de localStorage
    console.log("Wallet desconectada.");
  };

  return (
    <WalletContext.Provider
      value={{ walletAddress, isWalletInstalled, connectWallet, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
};
