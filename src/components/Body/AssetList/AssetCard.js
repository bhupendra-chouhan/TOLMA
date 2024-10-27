import React, { useState } from "react";
import AssetPreview from "./AssetPriview/AssetPreview";
import AssetPreviewData from "../../../context/AssetPreviewDataContext";

const AssetCard = ({
  name,
  description,
  image,
  attributes,
  assetID,
  showSellButton,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openSellModal = () => setIsSellModalOpen(true);
  const closeSellModal = () => setIsSellModalOpen(false);

  return (
    <div className="bg-gray-200 border-4 text-2xl shadow-xl shadow-black flex-col flex gap-2 max-w-96 m-5 p-4 rounded-lg">
      <div className="foodlogo-container h-80 justify-center border-green-400 flex rounded-xl overflow-hidden">
        <img
          className="foodlogo zoom-in-foodlogo sm:w-full md:w-fit bg-cover rounded-xl transition-transform duration-300 ease-in-out hover:transition-transform hover:scale-125"
          src={`https://gateway.pinata.cloud/ipfs/${image}`}
        />
      </div>
      <h2>
        <div className="text-2xl text-red-600">Asset ID: #{assetID}</div>
      </h2>
      <h2>
        <div className="text-4xl font-semibold">{name}</div>
      </h2>
      <h4>
        <span className="font-bold text-blue-500 text-3xl">Creator: </span>
        <a
          href={`https://github.com/${attributes[1]?.value}`}
          target="_blank"
          className="underline hover:text-violet-600"
          rel="noopener noreferrer"
        >
          {attributes[2]?.value.slice(0, 6)}...{attributes[2]?.value.slice(-4)}
        </a>
      </h4>

      <div className="w-full mt-auto flex justify-around">
        {showSellButton ? (
          <button
            onClick={openSellModal}
            className="px-4 py-2 bg-red-400 hover:bg-red-500 hover:font-bold hover:text-white text-gray-900 rounded-lg cursor-pointer text-base"
          >
            Sell
          </button>
        ) : (
          <button className="px-4 py-2 bg-blue-400 hover:bg-blue-500 hover:font-bold hover:text-white text-gray-900 rounded-lg cursor-pointer text-base">
            Buy
          </button>
        )}

        <button
          onClick={openModal}
          className="px-4 py-2 bg-green-400 hover:bg-green-500 hover:text-white text-gray-900 rounded-lg cursor-pointer text-base"
        >
          Preview
        </button>
      </div>

      {/* Preview Modal */}
      {isModalOpen && (
        <AssetPreviewData.Provider
          value={{ name, description, image, attributes, assetID }}
        >
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-[80%] h-[80%] shadow-lg relative">
              <h2 className="text-5xl font-bold">Asset Details</h2>
              <AssetPreview />
              <button
                onClick={closeModal}
                className="absolute top-2 text-5xl right-2 text-red-400 hover:text-gray-600"
              >
                <ion-icon name="close-circle"></ion-icon>
              </button>
            </div>
          </div>
        </AssetPreviewData.Provider>
      )}

      {/* Sell Modal */}
      {isSellModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-[80%] h-[60%] shadow-lg relative">
            <h2 className="text-5xl font-bold">Sell Asset</h2>
            <p>Are you sure you want to sell this asset?</p>
            <div className="mt-4 flex justify-around">
              <button
                onClick={closeSellModal}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log("Selling asset...");
                  closeSellModal();
                }}
                className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded-lg cursor-pointer"
              >
                Confirm Sell
              </button>
            </div>
            <button
              onClick={closeSellModal}
              className="absolute top-2 text-5xl right-2 text-red-400 hover:text-gray-600"
            >
              <ion-icon name="close-circle"></ion-icon>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetCard;
