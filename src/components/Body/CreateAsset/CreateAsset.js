import React, { createContext, useState } from "react";
import Metadata from "./MetadataJson";
import IpfsNftUpload from "./IpfsUpload";
import uploadedAssetURIData from "../../../context/AssetContext";
import IpfsNftVideoUpload from "./IpfsVideoUpload";

const CreateNft = () => {
  const [uploadedNFTImageURI, _setUploadedNFTImageURI] = useState(
    "xxxxxxxxxxxxxxxxxxx"
  );
  const [uploadedNFTVideoURI, _setUploadedNFTVideoURI] = useState(
    "xxxxxxxxxxxxxxxxxxx"
  );

  return (
    <uploadedAssetURIData.Provider
      value={{ uploadedNFTImageURI, uploadedNFTVideoURI }}
    >
      <div className="flex flex-col mx-5 gap-5 items-center mt-10">
        {/* Thumbnail IPFS upload */}
        <h2>Upload Thumbnail:</h2>
        <IpfsNftUpload setUploadedNFTImageURI={_setUploadedNFTImageURI} />

        <h2>Upload Video:</h2>
        {/* Video IPFS upload */}
        <IpfsNftVideoUpload setUploadedNFTVideoURI={_setUploadedNFTVideoURI} />

        {/* Metadata Generator */}
        <Metadata />
      </div>
    </uploadedAssetURIData.Provider>
  );
};

export default CreateNft;
export { uploadedAssetURIData };
