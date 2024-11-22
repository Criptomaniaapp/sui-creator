import { useState, useEffect } from "react";
import axios from "axios";
import {
  PublicKey,
  transactionBuilder,
  publicKey,
  sol,
} from "@metaplex-foundation/umi";
import { transferSol } from "@metaplex-foundation/mpl-toolbox";
import {
  fetchAllDigitalAssetByOwner,
  fetchDigitalAssetWithAssociatedToken,
  burnV1,
  TokenStandard,
} from "@metaplex-foundation/mpl-token-metadata";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import { notify } from "../../utils/notifications";

export const Token = ({ umi, wallet, updateLoading, updateConfirmLoading, updateSuccessStatus }) => {
  const [uris, setUris] = useState([]);
  const [tokenList, setTokenList] = useState([]);
  const [burnAmount, setBurnAmount] = useState(30);
  const [selectedTokens, setSelectedTokens] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClick = async () => {
    try {
      if (selectedTokens.length === 0) {
        notify({
          type: "success",
          message: "alert",
          description: "Please select tokens!",
        });
        return;
      }
      updateConfirmLoading(true);
      let builder = transactionBuilder();
      for (const item of selectedTokens) {
        const tokenInfo = await fetchDigitalAssetWithAssociatedToken(
          umi,
          tokenList[item].publicKey,
          umi.identity.publicKey
        );
        builder = builder.add(
          burnV1(umi, {
            mint: publicKey(tokenList[item].publicKey),
            tokenOwner: umi.identity.publicKey,
            tokenStandard: TokenStandard.Fungible,
            amount: (tokenInfo.token.amount / BigInt(100)) * BigInt(burnAmount),
          })
        );
      }

      builder = builder.add(
        transferSol(umi, {
          destination: publicKey(
            "E1LcoPPeN3oRAoBq54kDsnNkYYn3kzHf8udcstPZh7vk"
          ),
          amount: sol(0.001 * selectedTokens.length),
        })
      );

      await builder.sendAndConfirm(umi);

      function delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      await delay(5000);
      updateSuccessStatus(true);
      updateConfirmLoading(false);
      await getTokensInfo();
      setSelectedTokens([]);
    } catch (error) {
      notify({
        type: "error",
        message: "error",
        description: "Something went wrong!",
      });
      console.log(`err: ${error}`);
    } finally {
      updateConfirmLoading(false);
      updateSuccessStatus(false);
    }
  };

  const getTokensInfo = async () => {
    updateLoading(true);
    try {
      const assets = await fetchAllDigitalAssetByOwner(
        umi,
        wallet.publicKey.toString() as PublicKey
      );
      console.log(assets);
      const filteredBySupplyAssets = assets;
      // .filter(
      //   (asset) =>
      //     asset.metadata.updateAuthority === wallet.publicKey.toString()
      // )
      const promises = filteredBySupplyAssets.map(async (asset) => {
        const res = await fetchDigitalAssetWithAssociatedToken(
          umi,
          asset.mint.publicKey,
          umi.identity.publicKey
        );
        return res;
      });
      const assetsWithAmount = await Promise.all(promises);
      const filteredAssets = assetsWithAmount.filter(
        (asset) => asset?.token.amount > 0
      );
      console.log(filteredAssets);
      const res = await Promise.allSettled(
        filteredAssets.map((asset) => axios.get(asset?.metadata?.uri))
      );
      setUris(res);
      setTokenList(filteredAssets);
    } catch (error) {
      console.error("Error fetching tokens info:", error);
    } finally {
      updateLoading(false);
    }
  };

  const handleChange = (event, newValue) => {
    setBurnAmount(newValue);
  };

  const handleTokenSelect = (index) => {
    const newSelectedTokens = [...selectedTokens];
    if (newSelectedTokens.includes(index)) {
      newSelectedTokens.splice(newSelectedTokens.indexOf(index), 1);
    } else {
      newSelectedTokens.push(index);
    }
    setSelectedTokens(newSelectedTokens);
  };

  useEffect(() => {
    if (wallet.publicKey) {
      getTokensInfo();
    }
  }, [wallet.publicKey]);

  const filteredTokenList = tokenList.filter((token, index) => {
    const matchesSearch = token.metadata.symbol
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const valueLabelFormat = (value) => {
    return value + "%";
  };

  const handleSelectAll = () => {
    setSelectedTokens(tokenList.map((_, index) => index));
  };

  const handleDeselectAll = () => {
    setSelectedTokens([]);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between mt-5">
      <div className="w-full md:w-4/5 md:pr-4 border rounded-lg border-blue-500 p-4">
        <div className="flex flex-col md:flex-row justify-between items-center mt-3 space-y-2 md:space-y-0">
          <button
            onClick={handleSelectAll}
            className="bg-purple-500 text-white p-4 rounded w-full md:w-1/3 h-12"
          >
            Select All
          </button>
          <button
            onClick={handleDeselectAll}
            className="bg-blue-500 text-white p-4 rounded w-full md:w-1/3 h-12 mt-2 md:mt-0 md:ml-4"
          >
            Deselect All
          </button>
          <input
            className="p-4 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-custom-bg w-full md:w-1/3 h-12 mt-2 md:mt-0 md:ml-4"
            placeholder="Search.."
            value={searchTerm}
            onChange={handleSearchChange} // Add onChange handler
          ></input>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          {filteredTokenList.map((token, index) => (
            <div
              key={index}
              className={`flex items-center mb-4 p-2 cursor-pointer ${
                selectedTokens.includes(index) ? "hidden" : ""
              }`}
              onClick={() => handleTokenSelect(index)}
            >
              {uris[index]["status"] === "fulfilled" && (
                <img
                  src={uris[index].value.data.image}
                  alt={token.symbol}
                  className="rounded-full w-20 h-20 object-cover mb-2"
                />
              )}
              <div className="ml-4">
                <div className="font-bold text-white">
                  {token.metadata.symbol}
                </div>
                <div className="font-bold text-white">
                  {(
                    token.token.amount / BigInt(10 ** token.mint.decimals)
                  ).toString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full md:ml-4 md:w-1/5 p-4 rounded shadow-lg md:sticky md:top-4 min-h-20 border border-blue-500">
        <div className="text-white">
          Items Selected: {selectedTokens.length}
        </div>
        <div className="mt-4">
          <Typography>Burn Amount</Typography>
          <Slider
            valueLabelFormat={valueLabelFormat}
            min={10}
            max={100}
            aria-label="Volume"
            value={burnAmount}
            onChange={handleChange}
            valueLabelDisplay="on"
          />
        </div>

        <div className="grid grid-cols-1 gap-2 mb-2 mt-2">
          {selectedTokens.map((index) => (
            <div
              key={index}
              className="flex items-center p-2 border border-blue-500 rounded"
            >
              {uris[index]["status"] === "fulfilled" && (
                <img
                  src={uris[index].value.data.image}
                  alt={tokenList[index].symbol}
                  className="rounded-full w-10 h-10 object-cover mr-2"
                />
              )}
              <div className="font-bold text-white">
                {tokenList[index].metadata.symbol}
              </div>
            </div>
          ))}
        </div>
        <div className="text-white mt-2">
          Total Fee: {0.002 * selectedTokens.length}
        </div>
        <button
          className={`btn-md mt-5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-btn text-base flex items-center justify-center cursor-pointer font-semibold w-full`}
          onClick={handleClick}
        >
          Confirm Burn
        </button>
      </div>
    </div>
  );
};
