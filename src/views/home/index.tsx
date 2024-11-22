// Next, React
import { FC, useState } from "react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { transferSol } from "@metaplex-foundation/mpl-toolbox";
import {
  transactionBuilder,
  percentAmount,
  generateSigner,
  sol,
  publicKey,
} from "@metaplex-foundation/umi";
import {
  mplTokenMetadata,
  TokenStandard,
  createAndMint,
  revokeAuthorityItemV1,
} from "@metaplex-foundation/mpl-token-metadata";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { WebIrys } from "@irys/sdk";
import Switch from "@mui/material/Switch";
import { notify } from "../../utils/notifications";
import { ProgressModal } from "components/ProgressModal";

// Wallet
import { useWallet } from "@solana/wallet-adapter-react";
import { ConnectWallet } from "components/ConnectWallet";

export const HomeView: FC = ({}) => {
  const wallet = useWallet();

  const [modalStatus, setModalStatus] = useState([true, true, true]);
  const [modalopen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDescription, setTokenDescription] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [tokenDecimal, setTokenDecimal] = useState(9);
  const [tokenAmount, setTokenAmount] = useState(100000000);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [tgUrl, setTgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [freezeAuthority, setFreezeAuthority] = useState(false);
  const [mintAuthority, setMintAuthority] = useState(false);
  const [metadataAuthoriy, setMetadataAuthoriy] = useState(false);
  const [fee, setFee] = useState(0.02);
  // Use the RPC endpoint of your choice.
  const umi = createUmi(process.env.NEXT_PUBLIC_RPC_URL)
    .use(mplTokenMetadata())
    .use(walletAdapterIdentity(wallet))
    .use(irysUploader());

  const getIrys = async () => {
    await window.solana.connect();
    const provider = new PhantomWalletAdapter();
    await provider.connect();

    const network = process.env.NEXT_PUBLIC_NETWORK;
    const token = "solana";
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL; // Required for devnet

    const wallet = { rpcUrl: rpcUrl, name: "ethersv5", provider: provider };
    const webIrys = new WebIrys({ network, token, wallet });
    await webIrys.ready();
    return webIrys;
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  function shortenAddress(address, startLength = 4, endLength = 4) {
    if (address.length <= startLength + endLength) {
      return address;
    }
    return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleClick = async () => {
    if (selectedFile === null) {
      notify({
        type: "error",
        message: "error",
        description: "Please select logo!",
      });
      return;
    }
    try {
      setLoading(true);
      setModalOpen(true);
      const irys = await getIrys();

      await irys.fund(irys.utils.toAtomic(0.0001));

      const tags = [{ name: "application-id", value: "MyNFTDrop" }];
      const receipt = await irys.uploadFile(selectedFile, { tags: tags });

      const data = {
        name: tokenName,
        symbol: tokenSymbol,
        description: tokenDescription,
        image: `https://gateway.irys.xyz/${receipt.id}`,
        extensions: {
          website: websiteUrl,
          twitter: twitterUrl,
          telegram: tgUrl,
        },
        tags: ["Meme"],
        creator: {
          name: "TOKENIFY MINTING LAB",
          site: "https://app.tokenify.pro",
        },
      };

      setModalStatus([false, true, true]);

      const uri = await umi.uploader.uploadJson(data);

      setModalStatus([false, false, true]);

      const mint = generateSigner(umi);

      const builder = transactionBuilder()
        .add(
          createAndMint(umi, {
            mint,
            authority: umi.identity,
            name: tokenName,
            symbol: tokenSymbol,
            uri,
            sellerFeeBasisPoints: percentAmount(0),
            decimals: tokenDecimal,
            amount: tokenAmount * 10 ** tokenDecimal,
            tokenOwner: umi.identity.publicKey,
            tokenStandard: TokenStandard.Fungible,
          })
        )
        // .add(
        //   transferSol(umi, {
        //     destination: publicKey(
        //       "E1LcoPPeN3oRAoBq54kDsnNkYYn3kzHf8udcstPZh7vk"
        //     ),
        //     amount: sol(
        //       parseFloat(
        //         (
        //           fee +
        //           0.02 * (freezeAuthority ? 1 : 0) +
        //           0.02 * (mintAuthority ? 1 : 0) +
        //           0.02 * (metadataAuthoriy ? 1 : 0)
        //         ).toFixed(2)
        //       )
        //     ),
        //   })
        // );

      const res = await builder.sendAndConfirm(umi);
      setModalStatus([false, false, false]);

      notify({
        type: "success",
        message: "success",
        description:
          "New token successfully created. Please check your wallet.",
      });
    } catch (e) {
      notify({
        type: "error",
        message: "error",
        description: "Something went wrong!",
      });
      console.log("Error uploading file ", e);
    }
    setLoading(false);
    setModalOpen(false);
    setModalStatus([true, true, true]);
  };

  return (
    <div>
      {!wallet?.publicKey && <ConnectWallet />}
      {wallet?.publicKey && (
        <div className="w-full rounded-lg border border-blue-500 p-5">
          <div className="text-2xl font-semibold text-blue-500">
            Tokenify Token Creator
          </div>

          <div className="text-xl font-semibold mt-5 text-blue-500">
            Token Information
          </div>

          <div className="text-base font-medium text-white mt-5">
            This information is stored on Arweave throught Bundlr + Metaplex
            Metadata Standard.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-white p-4 rounded">
              <label className="block font-small text-white">
                Token Name (ex.Tokenify)
              </label>
              <input
                type="text"
                placeholder="Token Name"
                value={tokenName}
                onChange={(e) => setTokenName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-custom-bg"
              />

              <label className="block font-small text-white mt-3">
                Symbol (Max 5, ex. TOF)
              </label>
              <input
                type="text"
                placeholder="Symbol"
                value={tokenSymbol}
                onChange={(e) => setTokenSymbol(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-custom-bg"
              />

              <label className="block font-small text-white mt-3">
                Description (Optional)
              </label>
              <textarea
                className="mt-1 block w-full px-3 py-2 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-custom-bg"
                rows={5}
                placeholder="Description"
                value={tokenDescription}
                onChange={(e) => setTokenDescription(e.target.value)}
              />

              <label className="block font-small text-white mt-3">
                Token Decimals
              </label>
              <input
                type="number"
                className="mt-1 block w-full px-3 py-2 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-custom-bg"
                value={tokenDecimal}
                onChange={(e) => setTokenDecimal(parseInt(e.target.value))}
              />
              <label className="block font-small text-white mt-3">Supply</label>
              <input
                type="number"
                className="mt-1 block w-full px-3 py-2 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-custom-bg"
                value={tokenAmount}
                onChange={(e) => setTokenAmount(parseInt(e.target.value))}
              />

              <label className="block font-small text-white mt-12">
                Extensions (Optional)
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-custom-bg"
                placeholder="Website URL"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
              />
              <input
                type="text"
                className="mt-3 block w-full px-3 py-2 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-custom-bg"
                placeholder="Twitter URL"
                value={twitterUrl}
                onChange={(e) => setTwitterUrl(e.target.value)}
              />
              <input
                type="text"
                className="mt-3 block w-full px-3 py-2 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-custom-bg"
                placeholder="Telegram Group URL"
                value={tgUrl}
                onChange={(e) => setTgUrl(e.target.value)}
              />

              <div className="mt-12 text-base font-medium text-white">
                Options
              </div>

              <div className="mt-3">
                <Switch
                  color="success"
                  className="border-blue-500"
                  checked={freezeAuthority}
                  onChange={(e) => setFreezeAuthority(!freezeAuthority)}
                />
                <label>Revoke Freeze Authority</label>
              </div>

              <div className="mt-1">
                <Switch
                  color="success"
                  className="border-blue-500"
                  checked={mintAuthority}
                  onChange={(e) => setMintAuthority(!mintAuthority)}
                />
                <label>Revoke Mint Authority (Fixed Supply)</label>
              </div>

              <div className="mt-1">
                <Switch
                  color="success"
                  className="border-blue-500"
                  checked={metadataAuthoriy}
                  onChange={(e) => setMetadataAuthoriy(!metadataAuthoriy)}
                />
                <label>
                  Revoke Metadata Update Authority (Make it immutable)
                </label>
              </div>

              <button
                className={`mt-5 btn-md bg-gradient-to-r from-customColor1 to-customColor2 rounded-btn text-base flex items-center justify-center cursor-pointer font-semibold w-full m-auto text-white ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
                onClick={handleClick}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                ) : (
                  "Create Token"
                )}
              </button>
              <div className="mt-3 flex items-center justify-center">
                {(
                  fee +
                  0.02 * (freezeAuthority ? 1 : 0) +
                  0.02 * (mintAuthority ? 1 : 0) +
                  0.02 * (metadataAuthoriy ? 1 : 0)
                ).toFixed(2)}{" "}
                SOL + Network Fee
              </div>
            </div>
            <div className="text-white p-4 rounded">
              {selectedFile && (
                <div className="container mx-auto">
                  <div className="flex flex-col sm:flex-row w-full">
                    <div className="flex-grow sm:w-full">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="rounded-full w-32 h-32 object-cover"
                      />
                    </div>
                    <div className="flex-grow ml-4 sm:w-4/5 sm:ml-auto md:-ml-40">
                      <div className="text-2xl text-white">
                        Name: {tokenName}
                      </div>
                      <div className="p-1 text-2xl text-white">
                        Symbol: {tokenSymbol}
                      </div>
                      <div className="p-1 text-2xl text-white">
                        Decimal: {tokenDecimal}
                      </div>
                      <div className="p-1 text-2xl text-white">
                        Supply: {tokenAmount}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {tokenDescription && (
                <p className="mt-3 text-md">{tokenDescription}</p>
              )}
              <div className="text-xl font-semibold mt-5 text-blue-500">
                Social Channels
              </div>
              {websiteUrl && (
                <p className="mt-3 text-md">Website URL: {websiteUrl}</p>
              )}
              {twitterUrl && (
                <p className="mt-3 text-md">Twitter URL: {twitterUrl}</p>
              )}
              {tgUrl && <p className="mt-3 text-md">Telegram URL: {tgUrl}</p>}
              
              {/* <p className="mt-3 text-sm">
                Mint Authority: {shortenAddress(wallet?.publicKey.toString())}
              </p>
              <p className="text-sm">
                Update Authority: {shortenAddress(wallet?.publicKey.toString())}
              </p>
              <p className="text-sm">
                Freeze Authority: {shortenAddress(wallet?.publicKey.toString())}
              </p> */}

              <div className="text-base font-small text-white mt-3">
                Tags: memecoin
              </div>

              <div className="p-1 text-md text-white mt-5">
                Symbol Image (ex. Square size 128 * 128 or larger is
                recommended)
              </div>
              <div className="flex justify-center items-center border-4 border-line border-blue-500 mt-1 rounded-xl">
                <div className="relative">
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                  <div className="w-full h-64 flex flex-col justify-center items-center text-center cursor-pointer hover:border-blue-500">
                    <span className="text-lg font-medium">Upload an Image</span>
                  </div>
                </div>
              </div>

              <h3 className="text-lg mt-5 mb-4">
                Create Your MemeCoin or SPL Solana Token
              </h3>
              <video width="100%" height="200" controls>
                <source src="/intro.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
      <div className="w-full rounded-lg border border-blue-500 p-5 mt-3">
        <div className="text-2xl font-semibold text-blue-500">
          Create your own Solana Token
        </div>
        <div className="text-base font-medium text-white mt-5">
          Start your journey on the Solana blockchain with Tokenify.pro. Whether
          you are looking to create a token or Memecoin for your personal
          project, a business initiative or any other purpose, just follow a few
          simple payments.
        </div>
        <div className="text-xl font-semibold mt-10 text-blue-500">
          How to use Tokenify Token Creator ?
        </div>
        <div className="text-base font-medium text-white mt-5 flex flex-col space-y-1">
          <div className="flex space-x-5 items-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div>Connect your Solana wallet.</div>
          </div>
          <div className="flex space-x-5 items-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div>
              Choose the desired network (Devnet or mainnet) by clicking on the
              settings icon in the upper right corner
            </div>
          </div>
          <div className="flex space-x-5 items-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div>Name your Token</div>
          </div>
          <div className="flex space-x-5 items-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div>Choose a symbol (max 5 characters).</div>
          </div>
          <div className="flex space-x-5 items-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div>
              Select the number of decimals (Use 5 for utility Token. Use 9 for
              meme token).
            </div>
          </div>
          <div className="flex space-x-5 items-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div>Add a brief description.</div>
          </div>
          <div className="flex space-x-5 items-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div>Upload your token logo (PNG, JPG, GIF).</div>
          </div>
          <div className="flex space-x-5 items-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div>Set the token Supply.</div>
          </div>
          <div className="flex space-x-5 items-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <div>
              Click on &quot;Create your token&quot;, confirm the transaction,
              and await your tokens.
            </div>
          </div>
        </div>
        <div className="text-base font-medium text-white mt-5">
          The token creation fee is 0.02 SOL + Network Fee, covering all SPL Token Creation expenses. The process is quick,
          taking only a few seconds once initiated. Upon completion, you&quot;ll
          find the total token supply in your wallet.
        </div>
        <div className="text-base font-medium text-white mt-5">
          Manage your token effortlessly through your wallet, adjusting supply
          or freezing it as necessary. Enjoy the simplicity and
          cost-effectiveness of Solana Token creation with our user-friendly
          platform.
          <br></br>
          <p>
            Token manager(Soon!): Manage your token effortlessly through your
            wallet, adjusting the supply and Revoke Freeze Authority, Revoke
            Mint Authority (Fixed Supply) or Revoke Metadata Update Authority
            (Make it immutable). Completely control your token on our platform.
          </p>
        </div>
      </div>
      <ProgressModal
        modalopen={modalopen}
        handleClose={handleClose}
        step1={modalStatus[0]}
        step2={modalStatus[1]}
        step3={modalStatus[2]}
      />
    </div>
  );
};
