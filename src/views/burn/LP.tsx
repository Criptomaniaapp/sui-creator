import { useState } from "react";
import { PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import {
  createBurnCheckedInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { FaCopy } from "react-icons/fa";
import { Slider } from "@mui/material";
import { Spinner } from "components/Spinner";

export const LP = ({ umi }) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [step, setStep] = useState("step1");
  const [poolId, setPoolId] = useState("");
  const [baseMintAddress, setBaseMintAddress] = useState("");
  const [quoteMintAddress, setQuoteMintAddress] = useState("");
  const [lpMintAddress, setLpMintAddress] = useState("");
  const [openBookMarketId, setOpenBookMarketId] = useState("");
  const [lpTokenBalance, setLpTokenBalance] = useState(0);
  const [successTx, setSuccessTx] = useState("");
  const [burnAmount, setBurnAmount] = useState(30);
  const [loading, setLoading] = useState(false);

  const handleStep1Click = async () => {
    try {
      setLoading(true);
      const marketAddress = new PublicKey(poolId);

      // Fetch the account info
      const marketAccountInfo = await connection.getAccountInfo(marketAddress);

      const marketData = marketAccountInfo.data;

      // Serum market layout
      const baseMint = new PublicKey(marketData.slice(400, 432));
      const quoteMint = new PublicKey(marketData.slice(432, 464));
      const lpMint = new PublicKey(marketData.slice(464, 496));
      const openBookMarket = new PublicKey(marketData.slice(528, 560));

      setBaseMintAddress(baseMint.toString());
      setQuoteMintAddress(quoteMint.toString());
      setLpMintAddress(lpMint.toString());
      setOpenBookMarketId(openBookMarket.toString());

      // Get token accounts by owner
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        wallet.publicKey,
        {
          mint: lpMint,
        }
      );

      // If no token accounts are found, the balance is 0
      if (tokenAccounts.value.length === 0) {
        setLpTokenBalance(0);
      } else {
        // Get the balance of the first token account found
        const tokenAccountInfo =
          tokenAccounts.value[0].account.data.parsed.info;
        const tokenBalance = tokenAccountInfo.tokenAmount.uiAmount;
        setLpTokenBalance(tokenBalance);
      }

      setStep("step2");
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Address copied to clipboard!");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  function shortenAddress(address, startLength = 4, endLength = 4) {
    if (address.length <= startLength + endLength) {
      return address;
    }
    return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
  }

  const handleStep2Click = async () => {
    try {
      setLoading(true);
      const tokenAccount = await getAssociatedTokenAddress(
        new PublicKey(lpMintAddress),
        wallet.publicKey
      );
      const tx = new Transaction().add(
        createBurnCheckedInstruction(
          tokenAccount,
          new PublicKey(lpMintAddress),
          wallet.publicKey,
          Math.floor((lpTokenBalance / 100) * burnAmount * 10 ** 9),
          9
        ),
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(
            "E1LcoPPeN3oRAoBq54kDsnNkYYn3kzHf8udcstPZh7vk"
          ),
          lamports: 100_000_000,
        })
      );
      let latestBlockhash = await connection.getLatestBlockhash();
      const signature = await wallet.sendTransaction(tx, connection);

      // Send transaction and await for signature
      await connection.confirmTransaction(
        { signature, ...latestBlockhash },
        "confirmed"
      );

      setSuccessTx(signature);
      setStep("step3");
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleStep3Click = () => {
    setStep("step1");
  };

  const valueLabelFormat = (value) => {
    return value + "%";
  };

  const handleChange = (event, newValue) => {
    setBurnAmount(newValue);
  };

  return (
    <div className="p-6 border rounded-lg border-blue-500 mt-5 sm:p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start border rounded-lg border-blue-500 mb-4 p-2">
        <div className="flex-shrink-0 bg-white text-blue-900 font-bold rounded-full w-8 h-8 flex items-center justify-center mb-2 sm:mb-0 sm:ml-8 mr-2 mt-2">
          1
        </div>
        <div className="text-center sm:text-left">
          <div className="text-white text-xl font-bold">
            Import Liquidity Pool
          </div>
          <div className="text-white text-sm">
            Enter the pool id or openbook market id to burn liquidity from
          </div>
        </div>
      </div>
      {step === "step1" && (
        <div className="relative mb-4 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="3SMQN4P33GO3KW3JVDS2ZUYIN2NL2NJF3UNKGSD8SCIO"
            className="w-full p-2 rounded border bg-custom-bg border-blue-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={poolId}
            onChange={(e) => setPoolId(e.target.value)}
          />
          <div className="flex mt-3 justify-between">
            <p>Fee: 0.07 SOL</p>
            <button
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-2 px-4 rounded sm:py-1 sm:px-3"
              onClick={handleStep1Click}
            >
              {loading ? <Spinner /> : "Confirm"}
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col sm:flex-row items-center sm:items-start border rounded-lg border-blue-500 mb-4 p-2">
        <div className="flex-shrink-0 bg-white text-blue-900 font-bold rounded-full w-8 h-8 flex items-center justify-center mb-2 sm:mb-0 sm:ml-8 mr-2 mt-2">
          2
        </div>
        <div className="text-center sm:text-left">
          <div className="text-white text-xl font-bold">
            LP Burn Configuration
          </div>
          <div className="text-white text-sm">
            Configure the amount of liquidity you want to burn from this
          </div>
        </div>
      </div>

      {step === "step2" && (
        <div className="p-2 text-white rounded-lg max-w-lg mx-auto">
          <div className="space-y-6">
            <div>
              <div className="flex flex-col md:flex-row justify-between items-center pb-2 border-b border-gray-700">
                <label className="font-bold mb-2 md:mb-0">
                  OpenBook Market ID
                </label>
                <div className="flex items-center space-x-2">
                  <span className="truncate">
                    {shortenAddress(openBookMarketId)}
                  </span>
                  <button
                    className="text-gray-400 hover:text-gray-200"
                    onClick={() => copyToClipboard(openBookMarketId)}
                  >
                    <FaCopy />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col md:flex-row justify-between items-center pb-2 border-b border-gray-700">
                <label className="font-bold mb-2 md:mb-0">AMM ID</label>
                <div className="flex items-center space-x-2">
                  <span className="truncate">{shortenAddress(poolId)}</span>
                  <button
                    className="text-gray-400 hover:text-gray-200"
                    onClick={() => copyToClipboard(poolId)}
                  >
                    <FaCopy />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col md:flex-row justify-between items-center pb-2 border-b border-gray-700">
                <label className="font-bold mb-2 md:mb-0">
                  Base Token Mint Address
                </label>
                <div className="flex items-center space-x-2">
                  <span className="truncate">
                    {shortenAddress(baseMintAddress)}
                  </span>
                  <button
                    className="text-gray-400 hover:text-gray-200"
                    onClick={() => copyToClipboard(baseMintAddress)}
                  >
                    <FaCopy />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col md:flex-row justify-between items-center pb-2 border-b border-gray-700">
                <label className="font-bold mb-2 md:mb-0">
                  Quote Token Mint Address
                </label>
                <div className="flex items-center space-x-2">
                  <span className="truncate">
                    {shortenAddress(quoteMintAddress)}
                  </span>
                  <button
                    className="text-gray-400 hover:text-gray-200"
                    onClick={() => copyToClipboard(quoteMintAddress)}
                  >
                    <FaCopy />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col md:flex-row justify-between items-center pb-2 border-b border-gray-700">
                <label className="font-bold mb-2 md:mb-0">
                  LP Mint Address
                </label>
                <div className="flex items-center space-x-2">
                  <span className="truncate">
                    {shortenAddress(lpMintAddress)}
                  </span>
                  <button
                    className="text-gray-400 hover:text-gray-200"
                    onClick={() => copyToClipboard(lpMintAddress)}
                  >
                    <FaCopy />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 border border-blue-500 rounded-lg p-4">
            <div className="flex items-center">
              <label className="block text-sm mb-1 flex-1 text-gray-500">
                Base Amount To Be Burned
              </label>
              <p className="bg-transparent text-right flex-1 text-sm text-gray-500">
                {((9700878.74496 / 100) * burnAmount).toFixed(4)}
              </p>
            </div>
            <div className="flex items-center rounded">
              <span className="flex-1 text-2xl fond-bold text-gray-500">
                BAN
              </span>
              <p className="bg-transparent text-right text-2xl flex-1 text-gray-500">
                {9700878.74496.toFixed(2)}
              </p>
            </div>
          </div>
          <div className="mt-6 border border-blue-500 rounded-lg p-4">
            <div className="flex items-center">
              <label className="block text-sm mb-1 flex-1 text-gray-500">
                Quote Amount To Be Burned
              </label>
              <p className="bg-transparent text-right flex-1 text-sm text-gray-500">
                {((1.94018 / 100) * burnAmount).toFixed(4)}
              </p>
            </div>
            <div className="flex items-center rounded">
              <span className="flex-1 text-2xl fond-bold text-gray-500">
                SOL
              </span>
              <p className="bg-transparent text-right text-2xl flex-1 text-gray-500">
                1.94018
              </p>
            </div>
          </div>

          <div className="mt-6 border border-blue-500 rounded-lg p-4">
            <div className="flex items-center">
              <label className="block text-sm mb-1 flex-1">Amout to burn</label>
              <p className="bg-transparent text-right flex-1 text-sm">
                {((lpTokenBalance / 100) * burnAmount).toFixed(4)}
              </p>
            </div>
            <div className="flex items-center rounded">
              <span className="flex-1 text-2xl fond-bold">LP</span>
              <input
                className="bg-transparent text-right text-2xl flex-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type="text"
                value={lpTokenBalance.toFixed(2)}
                readOnly
              />
            </div>
          </div>

          <Slider
            className="mt-3"
            valueLabelDisplay="on"
            min={0}
            max={100}
            valueLabelFormat={valueLabelFormat}
            value={burnAmount}
            onChange={handleChange}
          />
          <div className="relative mb-4 ">
            <div className="flex mt-3 justify-between">
              <p>Fee: 0.1 SOL</p>
              <button
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-2 px-4 rounded sm:py-1 sm:px-3"
                onClick={handleStep2Click}
              >
                {loading ? <Spinner /> : "Confirm Burn"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col sm:flex-row items-center sm:items-start border rounded-lg border-blue-500 mb-4 p-2">
        <div className="flex-shrink-0 bg-white text-blue-900 font-bold rounded-full w-8 h-8 flex items-center justify-center sm:mb-0 sm:ml-8 mr-2">
          3
        </div>
        <div className="text-center">
          <div className="text-white text-xl font-bold">LP Burned</div>
        </div>
      </div>

      {step === "step3" && (
        <div className="max-w-lg mx-auto">
          <span className="flex items-center">
            Your LP has been burned.{" "}
            <img
              src="/fire-unscreen.gif"
              alt="Loading"
              width={64}
              height={64}
            />
          </span>
          <div className="mb-2">
            <div className="flex items-center pb-2">
              <label className="font-bold mb-2 md:mb-0">Tx ID: {}</label>
              <div className="flex items-center space-x-2">
                <a href={`https://solscan.io/tx/${successTx}?cluster=devnet`} target="_blank">{shortenAddress(successTx)}</a>
                <button
                  className="text-gray-400 hover:text-gray-200"
                  onClick={() => copyToClipboard(successTx)}
                >
                  <FaCopy />
                </button>
              </div>
            </div>
          </div>
          <button
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-2 px-4 rounded sm:py-1 sm:px-3"
            onClick={handleStep3Click}
          >
            Burn more LP
          </button>
        </div>
      )}
    </div>
  );
};
