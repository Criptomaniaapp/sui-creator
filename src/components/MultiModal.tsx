import React from "react";

const MultiModal = ({ loading, status }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-8">
      <div className="bg-blue-800 text-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">
          IT&apos;S TIME TO SEND!
        </h2>
        <div className="flex justify-center items-center mb-4 relative">
          <img src="/sending-airdrop-unscreen.gif" alt="Loading" width={128} height={128} />
        </div>
        {!status ? (
          <>
            <p className="text-center">
              Creating shipping transaction, please wait...
            </p>
            <p className="text-center text-sm mt-2">
              This may take some time if Solana is congested.
            </p>
          </>
        ) : (
          <>
            <p className="text-center">Successfully sent!</p>
          </>
        )}
      </div>
    </div>
  );
};

export default MultiModal;
