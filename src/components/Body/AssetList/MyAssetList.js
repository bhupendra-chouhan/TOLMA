import React, { useState, useContext, useEffect } from "react";
import AssetCard from "./AssetCard";
import { readContract, createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import Loader from "../Loader/Loader";
import AssetListData from "../../../context/AssetListContext";
import { pubAddressData } from "../../AppLayout";

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

const MyAssetList = () => {
  const { assetList, _setAssetList } = useContext(AssetListData);
  const { pubAddress } = useContext(pubAddressData);
  const [filteredList, _setFilteredList] = useState([]);

  // Function to fetch the owner of a specific token
  const getAssetOwner = async (tokenId) => {
    try {
      const assetOwner = await readContract({
        contract,
        method: "function ownerOf(uint256 tokenId) view returns (address)",
        params: [tokenId],
      });
      return assetOwner;
    } catch (error) {
      console.error(`Error fetching owner for token ${tokenId}:`, error);
      return null;
    }
  };

  useEffect(() => {
    getAllTokenURIs();
  }, [pubAddress]);

  const getAllTokenURIs = async () => {
    try {
      let returnValue = await readContract({
        contract: contract,
        method: "function getAllTokenURIs() view returns (string[])",
        params: [],
      });

      const myAssetsList = [];

      // Using for...of loop to properly handle async calls
      for (const ipfsHashMetadata of returnValue) {
        const tokenId = returnValue.indexOf(ipfsHashMetadata) + 1;
        const assetOwner = await getAssetOwner(tokenId);
        
        if (assetOwner.toLowerCase() == pubAddress) {
          console.log("ipfsHashMetadata", ipfsHashMetadata);
          myAssetsList.push(ipfsHashMetadata);
        }
      }
      
      

      // Fetch the metadata for each asset
      const resultPromises = myAssetsList.map((ipfsHash) =>
        fetch(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`)
          .then((res) => res.json())
          .catch((e) => {
            console.error("Can't fetch", e);
          })
      );

      const values = await Promise.all(resultPromises);
      const successfulResponses = values.filter((val) => val);
      _setFilteredList(successfulResponses);
    } catch (error) {
      console.error("Error fetching token URIs:", error);
    }
  };

  return (
    <div className="main-container p-4">
      <div className="flex flex-wrap justify-center">
        {filteredList?.length === 0 && (
          <div className="mt-5">You haven't created any asset.</div>
        )}
        {filteredList.map((ele, index) => {
          const assetID = index + 1;
          return <AssetCard {...ele} assetID={assetID} key={index} />;
        })}
      </div>
    </div>
  );
};

export default MyAssetList;
