import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface ModalProps {
  modalopen: boolean;
  handleClose: () => void;
}

export const WalletModal: React.FC<ModalProps> = ({
  modalopen,
  handleClose,
}) => {
  return (
    <>
      <Dialog
        open={modalopen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ width: "500px", margin: "auto" }}
      >
        <DialogContent sx={{ backgroundColor: "rgb(36, 60, 75)" }}>
          <DialogContentText id="alert-dialog-description">
            <div
              className=" text-green-500 mb-5 text-right cursor-pointer"
              onClick={handleClose}
            >
              X
            </div>
            <div className="text-white text-3xl font-normal text-center">
              Connect a Wallet on Solana to continue
            </div>
            <div className="mt-5 flex flex-col space-y-3">
              <div
                className="flex items-center text-black text-lg p-3 font-bold rounded-md cursor-pointer "
                style={{
                  background:
                    "linear-gradient(45deg, #14f195, #01eb99 9.09%, #00e59d 18.18%, #00dea0 27.27%, #00d8a2 36.36%, #00d5af 45.45%, #00d2b9 54.55%, #00cfc2 63.64%, #00ced5 72.73%, #00cde6 81.82%, #00caf4 90.91%, #00c6ff)",
                }}
              >
                <img
                  src="/phantom.svg"
                  alt="phantomLogo"
                  className="w-10 h-10"
                />
                <div className="ml-3 hover:text-green-600">PHANTOM</div>
                <div className="ml-auto">Detected</div>
              </div>
              <div
                className="flex items-center text-black text-lg p-3 font-bold rounded-md cursor-pointer "
                style={{
                  background:
                    "linear-gradient(45deg, #14f195, #01eb99 9.09%, #00e59d 18.18%, #00dea0 27.27%, #00d8a2 36.36%, #00d5af 45.45%, #00d2b9 54.55%, #00cfc2 63.64%, #00ced5 72.73%, #00cde6 81.82%, #00caf4 90.91%, #00c6ff)",
                }}
              >
                <img
                  src="/metamask.svg"
                  alt="phantomLogo"
                  className="w-10 h-10"
                />
                <div className="ml-3 hover:text-green-600">METAMASK</div>
                <div className="ml-auto">Detected</div>
              </div>
            </div>
            <div className="flex ml-auto">
              <select className="select text-white mt-4 ml-auto py-2 text-sm">
                <option value="mainnet-beta" className="bg-gray-500">
                  More Options
                </option>
                <option value="devnet" className="bg-gray-500">
                  dev
                </option>
                <option value="testnet" className="bg-gray-500">
                  test
                </option>
              </select>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};
