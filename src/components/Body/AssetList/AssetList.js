import React, { useState, useContext, useEffect } from "react";
import AssetCard from "./AssetCard";
import { readContract, createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import Loader from "../Loader/Loader";
import AssetListData from "../../../context/AssetListContext";

// create the client with your clientId, or secretKey if in a server environment
const client = createThirdwebClient({
  clientId: process.env.REACT_APP_THIRDWEB_CLIENT_ID,
});

const chainId = Number(process.env.REACT_APP_ARBITRUM_SEPOLIA_CHAIN_ID);

// connect to your contract
const contract = getContract({
  client,
  chain: defineChain(chainId),
  address:
    process.env.REACT_APP_ARBITRUM_SEPOLIA_DEPLOYED_SMART_CONTRACT_ADDRESS,
});

const AssetList = () => {
  const { assetList, _setAssetList } = useContext(AssetListData);

  useEffect(() => {
    getAllTokenURIs();
  }, []);

  const getAllTokenURIs = async () => {
    let returnValue = await readContract({
      contract: contract,
      method: "function getAllTokenURIs() view returns (string[])",
      params: [],
    });

    const resultPromises = [];

    returnValue.forEach((ipfsHash) => {
      const promise = fetch(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`)
        .then((res) => res.json())
        .catch((e) => {
          console.error("cant fetch", e);
        });

      resultPromises.push(promise);
    });

    Promise.all(resultPromises).then((values) => {
      const successfulResponses = values.filter((val) => val);
      _setAssetList(successfulResponses);
    });
  };

  return (
    <div className="main-container p-4">
      <div className="flex flex-wrap justify-center">
        {assetList?.length === 0 && (
          <div className="mt-5">
            <Loader />
          </div>
        )}
        <>
          {assetList.map((ele, index) => {
            const assetID = index + 1;
            // Add a condition to only render cards with "Buy" button
            return !ele.showSellButton ? ( // Assuming showSellButton is part of your asset data
              <AssetCard
                {...ele}
                assetID={assetID}
                showSellButton={false}
                key={index}
              />
            ) : null;
          })}
        </>
      </div>
    </div>
  );
};

export default AssetList;
