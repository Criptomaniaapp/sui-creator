import { FC, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { ConnectWallet } from "components/ConnectWallet";
import BurnModal from "components/BurnModal";
import { Token } from "./Token";
import { LP } from "./LP";
import { FAQ } from "./FAQ";

export const BurnView: FC = ({}) => {
  const wallet = useWallet();
  const [successStatus, setSuccessStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("TOKEN");

  const umi = createUmi(process.env.NEXT_PUBLIC_RPC_URL)
    .use(mplTokenMetadata())
    .use(walletAdapterIdentity(wallet));

  const handleTokenClick = () => {
    setActiveFilter("TOKEN");
  };

  const handleLPClick = () => {
    setActiveFilter("LP");
  };

  const updateLoading = (newVal) => {
    setLoading(newVal);
  };

  const updateConfirmLoading = (newVal) => {
    setConfirmLoading(newVal);
  };

  const updateSuccessStatus = (newVal) => {
    setSuccessStatus(newVal);
  };

  return (
    <>
      {!wallet?.publicKey && <ConnectWallet />}

      {wallet?.publicKey && (
        <div className="container mx-auto">
          <div className="border rounded-lg border-blue-500 text-white p-8">
            <h2 className="text-center text-blue-500 text-3xl font-bold mb-4">
              Solana Incinerator
            </h2>
            <p className="text-center text-white mb-4">
              Any SLP tokens or LP tokens marked from burn on this page will be burned by executing the burn instruction. 
              This process cannot be reversed. Make sure you have the correct Tokens selected!
            </p>

            <div className="flex flex-col md:flex-row justify-between items-center mt-3 md:space-x-4 space-y-2 md:space-y-0">
              <button
                onClick={handleTokenClick}
                className={` text-white p-4 w-full md:w-1/5 h-12 border rounded-lg ${
                  activeFilter === "TOKEN"
                    ? "bg-blue-400 border-blue-500"
                    : "border-blue-500"
                }`}
              >
                TOKEN
              </button>

              <button
                onClick={handleLPClick}
                className={` text-white p-4 w-full md:w-1/5 h-12 border rounded-lg ${
                  activeFilter === "LP"
                    ? "bg-blue-400 border-blue-500"
                    : "border-blue-500"
                }`}
              >
                LP
              </button>

              <div className="relative inline-block w-full md:w-1/5">
                <button
                  className={` text-white p-4 w-full h-12 border rounded-lg ${
                    activeFilter === "NFT"
                      ? "bg-blue-500 border-blue-500"
                      : "border-blue-500"
                  }`}
                  disabled
                >
                  NFTs
                </button>
                <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Soon
                </span>
              </div>

              <div className="relative inline-block w-full md:w-1/5">
                <button
                  className={` text-white p-4 w-full h-12 border rounded-lg ${
                    activeFilter === "CNFT"
                      ? "bg-blue-400 border-blue-500"
                      : "border-blue-500"
                  }`}
                  disabled
                >
                  cNFTs
                </button>
                <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Soon
                </span>
              </div>

              <div className="relative inline-block w-full md:w-1/5">
                <button
                  className={` text-white p-4 w-full h-12 border rounded-lg ${
                    activeFilter === "DOMAIN"
                      ? "bg-blue-400 border-blue-500"
                      : "border-blue-500"
                  }`}
                  disabled
                >
                  DOMAINs
                </button>
                <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Soon
                </span>
              </div>
            </div>

            {activeFilter === "TOKEN" && (
              <Token
                wallet={wallet}
                umi={umi}
                updateLoading={updateLoading}
                updateConfirmLoading={updateConfirmLoading}
                updateSuccessStatus={updateSuccessStatus}
              />
            )}

            {activeFilter === "LP" && <LP umi={umi}/>}
          </div>
        </div>
      )}

      <FAQ />
      <BurnModal loading={confirmLoading} status={successStatus}></BurnModal>
    </>
  );
};
