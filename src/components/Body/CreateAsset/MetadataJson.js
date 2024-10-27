import React, { useContext, useEffect, useState } from "react";
import { uploadedAssetURIData } from "./CreateAsset";
import { pubAddressData } from "../../AppLayout";
import { PinataSDK } from "pinata-web3";
import { ethers } from "ethers";

const contractAddress = process.env.REACT_APP_ARBITRUM_SEPOLIA_DEPLOYED_SMART_CONTRACT_ADDRESS
const contractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_tokenURI",
        type: "string",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const pinata = new PinataSDK({
  pinataJwt: process.env.REACT_APP_PINATA_JWT,
  pinataGateway: process.env.REACT_APP_PINATA_GATEWAY,
});

const Metadata = () => {
  const [ipfsHash, setIpfsHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [data, setData] = useState("");

  const { uploadedNFTImageURI, uploadedNFTVideoURI } =
    useContext(uploadedAssetURIData);
  const { pubAddress } = useContext(pubAddressData);

  const [nftData, setNftData] = useState({
    name: "",
    description: "",
    image: uploadedNFTImageURI,
    attributes: [
      { trait_type: "Video URI", value: uploadedNFTVideoURI },
      { trait_type: "Creator's Name", value: "" },
      { trait_type: "Creator's Wallet Address", value: pubAddress },
    ],
  });

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    setContract(contractInstance);

    setNftData((prevData) => ({
      ...prevData,
      image: uploadedNFTImageURI,
      attributes: prevData.attributes.map((attr, index) =>
        index === 0 ? { ...attr, value: uploadedNFTVideoURI } : attr
      ),
    }));
  }, [uploadedNFTImageURI, uploadedNFTVideoURI]);

  // Upload JSON metadata to IPFS
  const uploadToIPFS = async () => {
    try {
      setIsLoading(true);
      const jsonBlob = new Blob([JSON.stringify(nftData, null, 2)], {
        type: "application/json",
      });
      const upload = await pinata.upload.file(jsonBlob);
      setIsLoading(false);
      setIpfsHash(upload.IpfsHash);
      alert("Metadata uploaded successfully!");
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to upload metadata to IPFS: ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNftData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAttributeChange = (index, value) => {
    setNftData((prevData) => ({
      ...prevData,
      attributes: prevData.attributes.map((attr, i) =>
        i === index ? { ...attr, value } : attr
      ),
    }));
  };

  const mintAsset = async () => {
    try {

      if (contract) {
        const transaction = await contract.mint(ipfsHash); // Replace with your function name
        await transaction.wait();
        console.log("Transaction successful:", transaction);
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex sm:flex-row flex-col gap-5 justify-center">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold p-1 border-b-4 border-gray-600 rounded-lg">
          Create NFT Metadata
        </h2>
        <label className="flex gap-5 border-4 p-2 rounded-lg">
          Asset Name*:
          <input
            type="text"
            name="name"
            value={nftData.name}
            onChange={handleInputChange}
            placeholder="ex. Cool Monkey"
            required
            className="flex-1 flex"
          />
        </label>
        <label className="flex gap-5 border-4 p-2 rounded-lg w-full md:w-full">
          Description*:
          <input
            type="text"
            name="description"
            value={nftData.description}
            onChange={handleInputChange}
            placeholder="ex. This is the Cool-Monkey NFT"
            required
            className="flex-1 flex"
          />
        </label>

        <label className="flex gap-5 border-4 p-2 rounded-lg">
          Creator's Name*:
          <input
            type="text"
            value={nftData.attributes[1].value}
            onChange={(e) => handleAttributeChange(1, e.target.value)}
            placeholder="ex. Jane Doe"
            required
            className="flex-1 flex"
          />
        </label>

        {/* IPFS Upload Button */}
        <button
          className="border content- rounded-lg bg-blue-400 py-2 mt-4 hover:bg-blue-800 hover:text-white"
          onClick={uploadToIPFS}
          disabled={isLoading}
        >
          {isLoading
            ? "Uploading Metadata to IPFS..."
            : "Upload Metadata to IPFS"}
        </button>

        {/* Show IPFS Hash */}
        {ipfsHash && (
          <div>
            <div className="mt-4">
              <p className="text-sm">Metadata IPFS Hash:</p>
              <p className="bg-gray-100 border rounded-lg p-2">{ipfsHash}</p>
            </div>
            <div>
              <button
                className="border w-full rounded-lg  bg-green-400 py-2 hover:bg-green-800 hover:text-white"
                onClick={mintAsset}
                disabled={isLoading}
              >
                {isLoading ? "Miniting..." : "Mint"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Metadata;
