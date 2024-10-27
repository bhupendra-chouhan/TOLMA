import React, { useContext, useRef, useState } from "react";
import AssetPreviewData from "../../../../context/AssetPreviewDataContext";

const AssetVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const { name, description, image, attributes, assetID } =
    useContext(AssetPreviewData);

  // Function to play video when clicked
  const handlePlayVideo = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="flex gap-10 border rounded-lg shadow-lg p-4">
      <div className="relative w-[45%] min-w-[45%] full">
        {/* Video element with thumbnail */}
        <video
          ref={videoRef}
          src={`https://gateway.pinata.cloud/ipfs/${attributes[0]?.value}`}
          className="w-[100%] object-cover rounded-lg"
          controls={isPlaying} // Show controls only when playing
          onPause={() => setIsPlaying(false)}
        />

        {/* Play Button Overlay when video is not playing */}
        {!isPlaying && (
          <button
            onClick={handlePlayVideo}
            className="absolute inset-0 w-full flex items-center justify-center bg-black bg-opacity-50 rounded-lg"
          >
            {isPlaying === false && (
              <div className="text-white flex text-9xl">
                <ion-icon name="play"></ion-icon>
                PLAY
              </div>
            )}
          </button>
        )}
      </div>
      <div>
        <h2 className="text-2xl text-red-600">Asset ID: #{assetID}</h2>
        <h2 className="text-3xl  font-bold mt-4">{name}</h2>
        <p className="text-2xl text-gray-600">{description}</p>
        <h2 className="text-2xl  font-bold mt-4">Price</h2>
        <h2 className="text-2xl  font-bold mt-4">
          Creator's Name:{" "}
          <span className="font-normal">{attributes[1]?.value}</span>
        </h2>
        <h2 className="text-2xl  font-bold mt-4">
          Creator's Address:{" "}
          <span className="font-normal">{attributes[2]?.value}</span>
        </h2>
      </div>
    </div>
  );
};

export default AssetVideo;
