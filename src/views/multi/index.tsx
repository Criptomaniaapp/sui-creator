import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { fetchAllDigitalAssetByOwner } from "@metaplex-foundation/mpl-token-metadata";
import {
  PublicKey,
  transactionBuilder,
  publicKey,
  sol,
} from "@metaplex-foundation/umi";
import { ConnectWallet } from "components/ConnectWallet";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import {
  createTokenIfMissing,
  transferTokens,
  transferSol,
} from "@metaplex-foundation/mpl-toolbox";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { PublicKey as PublickeySPL } from "@solana/web3.js";
import { Spinner } from "components/Spinner";
import MultiModal from "components/MultiModal";
import { notify } from "../../utils/notifications";
import { FAQ } from "./FAQ";

export const MultiView = () => {
  const wallet = useWallet();
  const [tokenList, setTokenList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mintToken, setMintToken] = useState("");
  const [walletList, setWalletList] = useState("");
  const [tokenAmount, setAmount] = useState("");
  const [walletsCount, setWalletsCount] = useState(0);
  const [successStatus, setSuccessStatus] = useState(false);

  const umi = createUmi(process.env.NEXT_PUBLIC_RPC_URL)
    .use(mplTokenMetadata())
    .use(walletAdapterIdentity(wallet));

  useEffect(() => {
    const getTokensInfo = async () => {
      const assets = await fetchAllDigitalAssetByOwner(
        umi,
        wallet?.publicKey?.toString() as PublicKey
      );
      setTokenList(assets);
    };
    getTokensInfo();
  }, [wallet, umi]);

  const handleWalletsChange = (e) => {
    const textData = e.target.value;
    setWalletList(textData);
    const wallets = textData.split("\n");
    textData === "" ? setWalletsCount(0) : setWalletsCount(wallets.length);
  };

  const handleAmountChange = (event) => {
    const inputValue = event.target.value;
    const normalizedValue = inputValue.replace(/^0+(?!$)/, "");
    setAmount(normalizedValue);
  };

  const handleClick = async () => {
    try {
      if (Number(tokenAmount) <= 0 || tokenAmount === "") {
        notify({
          type: "error",
          message: "Error",
          description: "Please input transfer amount!",
        });
        return;
      }

      if (mintToken === "") {
        notify({
          type: "error",
          message: "Error",
          description: "Please select your token!",
        });
        return;
      }

      setLoading(true);

      let builder = transactionBuilder();
      const sourcePda = await getAssociatedTokenAddress(
        new PublickeySPL(mintToken),
        wallet.publicKey as PublickeySPL
      );

      const wallets = walletList.split("\n");
      const tokenDecimals = 9; // Actualiza según las decimales de tu token

      // Procesar los envíos en lotes para optimizar
      for (const walletAddress of wallets) {
        const destinationPda = await getAssociatedTokenAddress(
          new PublickeySPL(mintToken),
          new PublickeySPL(walletAddress)
        );

        // Crear la cuenta de token si falta
        builder = builder.add(
          createTokenIfMissing(umi, {
            mint: publicKey(mintToken),
            owner: publicKey(walletAddress),
          })
        );

        // Transferir los tokens
        builder = builder.add(
          transferTokens(umi, {
            source: sourcePda.toString() as PublicKey,
            destination: destinationPda.toString() as PublicKey,
            amount: parseInt(tokenAmount) * 10 ** tokenDecimals,
          })
        );
      }

      // Agregar la transferencia de SOL como tarifa
      builder = builder.add(
        transferSol(umi, {
          destination: publicKey(
            "E1LcoPPeN3oRAoBq54kDsnNkYYn3kzHf8udcstPZh7vk"
          ),
          amount: sol(0.001 * wallets.length),
        })
      );

      // Enviar y confirmar la transacción
      await builder.sendAndConfirm(umi);

      setSuccessStatus(true);
      function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      await delay(3000);
    } catch (error) {
      const errorMessage = error?.toString().includes("Invalid public key input")
        ? "Please check the addresses!"
        : "Something went wrong!";
      notify({
        type: "error",
        message: "Error",
        description: errorMessage,
      });
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setSuccessStatus(false);
    }
  };

  return (
    <>
      {!wallet?.publicKey && <ConnectWallet />}

      {wallet?.publicKey && (
        <div className="border rounded-lg border-blue-500 text-white p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-500 mb-4">
              Solana Tokens Multisender
            </h1>
            <p className="mb-4">
              Easily send any Solana token to hundreds of wallets without coding.
              0.001 SOL per transaction, max 10 wallets per transaction.
            </p>
            <p className="mb-8">
              Are you ready to take your airdrops and distribution campaigns to
              the next level? Solana Tokens Multisender makes it easy, fast, and secure.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            <div className="w-full lg:w-7/12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <select
                  className="p-4 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-custom-bg appearance-none w-full text-white"
                  value={mintToken}
                  onChange={(e) => setMintToken(e.target.value)}
                >
                  <option value="">SELECT TOKEN</option>
                  {tokenList.map((token, idx) => (
                    <option key={idx} value={token.publicKey}>
                      {token?.metadata?.symbol}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="QUANTITY PER WALLET"
                  value={tokenAmount}
                  onChange={handleAmountChange}
                  className="p-4 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-custom-bg w-full text-white"
                />
              </div>

              <textarea
                placeholder="LIST OF WALLETS (ONE PER LINE)"
                className="w-full h-64 mb-4 p-4 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-custom-bg text-white"
                value={walletList}
                onChange={handleWalletsChange}
              ></textarea>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="bg-blue-800 rounded-md text-center flex-1">
                  <p>Total Transfer</p>
                  <p>{walletsCount}/10</p>
                </div>
                <div className="bg-blue-800 rounded-md text-center flex-1">
                  <p>Total Fee</p>
                  <p>{(0.001 * walletsCount).toFixed(3)}</p>
                </div>
                <button
                  className={`btn-md bg-gradient-to-r from-customColor1 to-customColor2 rounded-btn text-base flex items-center justify-center cursor-pointer font-semibold w-full sm:w-auto text-white p-4 flex-1 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                  onClick={handleClick}
                >
                  {loading ? <Spinner /> : "Send Tokens"}
                </button>
              </div>
            </div>

            <div className="w-full lg:w-5/12">
              <h2 className="text-xl mb-4">How to use Solana Multisender?</h2>
              <ol className="list-decimal list-inside text-sm mb-4">
                <li>Connect your Solana Wallet.</li>
                <li>Select the token you want to airdrop.</li>
                <li>Enter the token amount each wallet will receive.</li>
                <li>List the wallet addresses (one per line).</li>
                <li>Verify the information and click &quot;Send Tokens&quot;.</li>
                <li>Confirm the transaction and wait for completion.</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      <FAQ />
      <MultiModal loading={loading} status={successStatus} />
    </>
  );
};
