import React, { useState } from "react";
import { PinataSDK } from "pinata-web3";

const pinata = new PinataSDK({
  pinataJwt: process.env.REACT_APP_PINATA_JWT,
  pinataGateway: process.env.REACT_APP_PINATA_GATEWAY,
});

const IpfsNftVideoUpload = ({ setUploadedNFTVideoURI }) => {
  const [file, setFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Upload file to IPFS using Pinata
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    try {
      setIsLoading(true);
      const upload = await pinata.upload.file(file);
      setIsLoading(false);
      setIpfsHash(upload.IpfsHash);
      setUploadedNFTVideoURI(upload.IpfsHash);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 items-center justify-between md:max-w-[90%] h-fit">
      <div className="flex flex-col gap-2">
        <input
          className="border-2 rounded-lg"
          type="file"
          onChange={handleFileChange}
          accept="image/*,video/*"
        />

        <button
          className="border content- rounded-lg bg-green-400 py-2 hover:bg-green-800 hover:text-white"
          onClick={handleUpload}
          disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Upload to IPFS"}
        </button>
      </div>

      {ipfsHash && (
        <div className="border-4 flex gap-3 border-green-400 p-4 rounded-xl">
          <div className="flex gap-4 flex-col items-center">
            <div className="bg-orange-400 p-2 border-b-8 border-gray-600 rounded-xl">
              IPFS Hash:
            </div>
            <p className="border-gray-600 border-2 p-2 w-1/2 sm:w-fit overflow-auto rounded-xl">
              {ipfsHash}
            </p>
            <div className="bg-orange-400 p-2 border-b-8 border-gray-600 rounded-xl">
              Uploaded File Preview:
            </div>
          </div>
          <video
            controls
            src={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
            poster={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`}
            width={500}
            height={500}
            className="rounded-xl"
          />
        </div>
      )}
    </div>
  );
};

export default IpfsNftVideoUpload;
