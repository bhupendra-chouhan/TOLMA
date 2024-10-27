import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import pubAddressData from "../context/UserContext";
import AssetListData from "../context/AssetListContext";

const AppLayout = () => {
  const [pubAddress, _setPubAddress] = useState("");
  const [assetList, _setAssetList] = useState([]);

  return (
    <div>
      <pubAddressData.Provider value={{ pubAddress }}>
        <Header setPubAddress={_setPubAddress} />
        <AssetListData.Provider value={{ assetList, _setAssetList }}>
          <div>
            {pubAddress === "" ? (
              <div className="flex flex-col justify-center items-center max-h-screen h-[100%] bg-orange-500 sm:text-2xl border-4">
                <div className="w-full text-center p-4">
                  Please click the "Connect Wallet" button and make sure you
                  have added "Arbitrum-Sepolia" network to your Metamask wallet.
                </div>

                <div className="w-full flex justify-center p-4">
                  <ul className="list-disc text-justify">
                    <li>
                      <a
                        href="https://revoke.cash/learn/wallets/add-network/arbitrum-sepolia"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Arbitrum-Sepolia Network Details
                        <span className="sm:text-3xl">
                          <ion-icon name="open"></ion-icon>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://faucets.chain.link/arbitrum-sepolia"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Arbitrum-Sepolia Faucet
                        <span className="sm:text-3xl">
                          <ion-icon name="open"></ion-icon>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://sepolia.arbiscan.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Arbitrum-Sepolia Explorer
                        <span className="sm:text-3xl">
                          <ion-icon name="open"></ion-icon>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </AssetListData.Provider>
      </pubAddressData.Provider>
    </div>
  );
};

export default AppLayout;
export { pubAddressData };
