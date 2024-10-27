import React, { createContext, useState } from "react";
import Metadata from "./MetadataJson";
import IpfsNftUpload from "./IpfsUpload";
import uploadedAssetImageURIData from "../../../context/AssetContext";

const CreateNft = () => {
  const [uploadedNFTImageURI, _setUploadedNFTImageURI] = useState("xxxxxxxxxxxxxxxxxxx");

  return (
    <uploadedAssetImageURIData.Provider value={{uploadedNFTImageURI}}>
      <div className="flex flex-col mx-5 gap-5 items-center mt-10">
        {/* IPFS upload */}
        <IpfsNftUpload setUploadedNFTImageURI={_setUploadedNFTImageURI} />

        {/* Metadata Generator */}
        <Metadata />
      </div>
    </uploadedAssetImageURIData.Provider>
  );
};

export default CreateNft
export {uploadedAssetImageURIData};
