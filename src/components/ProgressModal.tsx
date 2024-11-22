import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FaCheck } from "react-icons/fa";

interface ModalProps {
  modalopen: boolean;
  step1: boolean;
  step2: boolean;
  step3: boolean;
  handleClose: () => void;
}

export const ProgressModal: React.FC<ModalProps> = ({
  modalopen,
  handleClose,
  step1,
  step2,
  step3
}) => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Dialog
        open={modalopen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ width: "500px", margin: "auto" }}
      >
        <DialogContent className="bg-blue-800 border-blue-600 border-spacing-5 border-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-2xl text-white font-bold">Create token</div>
          </div>
          <div className="mt-5 flex flex-col space-y-3">
            <div className="flex items-center">
              <span className={` ${step1 ? 'bg-gray-500' : 'bg-blue-900'} w-8 h-8 flex items-center justify-center  text-white rounded-full text-center font-bold mr-4`}>
                1
              </span>
              <div className="text-lg flex-1 text-white font-bold">
                {step1 ? "Metadata Uploading.." : "Metadata Uploaded"}
                
              </div>
              <div className="w-12 flex items-center justify-end">
                {step1 ? (
                  <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
                ) : (
                  <FaCheck className="text-green-500" />
                )}
              </div>
            </div>
            <div className="flex items-center">
              <span className={` ${step2 ? 'bg-gray-500' : 'bg-blue-900'} w-8 h-8 flex items-center justify-center  text-white rounded-full text-center font-bold mr-4`}>
                2
              </span>
              <div className="text-lg flex-1 text-white font-bold">
                {step2 ? "Waiting Signature.." : "Signature Received"}
              </div>
              <div className="w-12 flex items-center justify-end">
                {step2 ? (
                  <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
                ) : (
                  <FaCheck className="text-green-500" />
                )}
              </div>
            </div>
            <div className="flex items-center">
              <span className={` ${step3 ? 'bg-gray-500' : 'bg-blue-900'} w-8 h-8 flex items-center justify-center  text-white rounded-full text-center font-bold mr-4`}>
                3
              </span>
              <div className="text-lg flex-1 text-white font-bold">
                {step3 ? "Creating Token.." : "Token Created"}
              </div>
              <div className="w-12 flex items-center justify-end">
                {step3 ? (
                  <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
                ) : (
                  <FaCheck className="text-green-500" />
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleClose}
              className="px-2 py-2 bg-gray-600 text-white rounded-md mr-2"
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
