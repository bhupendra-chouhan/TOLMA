import React from "react";
import AppLayout from "./AppLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NftList from "./Body/AssetList/AssetList";
import CreateNft from "./Body/CreateAsset/CreateAsset";
import Error from "./Error";
import MyNFTList from "./Body/AssetList/MyAssetList";

const Routing = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <NftList />,
        },
        {
          path: "/create-nft",
          element: <CreateNft />,
        },
        {
          path: "/my-nfts",
          element: <MyNFTList />,
        },
      ],
      errorElement: <Error />,
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default Routing;
