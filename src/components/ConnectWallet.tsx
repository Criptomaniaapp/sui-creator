import React from "react";
import dynamic from "next/dynamic";
import { WalletModal } from "./WalletModal";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export const ConnectWallet: React.FC = () => {
  const [modalopen, setModalOpen] = React.useState(false);

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };
  return (
    <>
      <div className="w-full rounded-lg border border-blue-500 p-5 mb-5">
        <div
          className="text-2xl font-semibold text-center text-blue-500"
        >
          To access the Dapp, please connect your wallet.
        </div>
        {/* <WalletMultiButtonDynamic className="ml-auto items-center justify-center mr-auto btn-sm hover:text-green-600 rounded-btn text-base mt-5 bg-blue-600"/> */}
        {/* <div
          className="mt-5 btn-sm hover:text-green-600 rounded-btn text-base flex items-center justify-center cursor-pointer font-semibold w-[150px] m-auto"
          style={{
            background:
              "linear-gradient(45deg, #14f195, #01eb99 9.09%, #00e59d 18.18%, #00dea0 27.27%, #00d8a2 36.36%, #00d5af 45.45%, #00d2b9 54.55%, #00cfc2 63.64%, #00ced5 72.73%, #00cde6 81.82%, #00caf4 90.91%, #00c6ff)",
          }}
          onClick={handleClickOpen}
        >
          Select Wallet
        </div> */}
        <WalletModal modalopen={modalopen} handleClose={handleClose} />
      </div>
    </>
  );
};
