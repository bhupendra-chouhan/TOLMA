import React from "react";

const PricingOptions = () => {
  return (
    <div className="flex  text-xs gap-2 flex-col items-center justify-between h-full">
      <div className="text-2xl font-bold">Pricing Options</div>

      <div className="flex gap-9 h-full justify-center">
        <div className="flex border-gray-300 border-2 py-1 px-2 justify-center text-center border rounded-2xl  w-1/4 bg-gray-100">
          <div className="flex flex-col justify-around">
            <div className="text-orange-500">
              <ion-icon name="star"></ion-icon>
            </div>
            <div className="text-base">Own 100% of the Rights</div>
            <div>
              Buy the full rights to this AI-Generated video. Once purchased.
              the video is yours to distribute, modify and monetize as you wish.
            </div>
            <div>
              <div>Price:</div>
              <div className="text-xl font-bold">$3,000</div>
            </div>
            <div>
              <button className="px-4 py-1 border border-blue-400 hover:bg-blue-400 hover:text-white text-gray-900 rounded-lg cursor-pointer">
                View Licensing
              </button>
            </div>
            <div>
              <button className="px-3 py-1 bg-blue-400 hover:bg-blue-500 hover:text-white text-gray-900 rounded-lg cursor-pointer ">
                Buy
              </button>
            </div>
          </div>
        </div>
        <div className="flex border-gray-300 border-2 py-1 px-2 justify-center text-center border rounded-2xl  w-1/4 bg-gray-100">
          <div className="flex flex-col justify-around">
            <div className="text-orange-500">
              <ion-icon name="star"></ion-icon>
            </div>
            <div className="text-base">Own 100% of the Rights</div>
            <div>
              Buy the full rights to this AI-Generated video. Once purchased.
              the video is yours to distribute, modify and monetize as you wish.
            </div>
            <div>
              <div>Price:</div>
              <div className="text-xl font-bold">$4,000</div>
            </div>
            <div>
              <button className="px-4 py-1 border border-blue-400 hover:bg-blue-400 hover:text-white text-gray-900 rounded-lg cursor-pointer">
                View Licensing
              </button>
            </div>
            <div>
              <button className="px-3 py-1 bg-blue-400 hover:bg-blue-500 hover:text-white text-gray-900 rounded-lg cursor-pointer ">
                Buy
              </button>
            </div>
          </div>
        </div>
        <div className="flex border-gray-300 border-2 py-1 px-2 justify-center text-center border rounded-2xl  w-1/4 bg-gray-100">
          <div className="flex flex-col justify-around">
            <div className="text-orange-500">
              <ion-icon name="star"></ion-icon>
            </div>
            <div className="text-base">Own 100% of the Rights</div>
            <div>
              Buy the full rights to this AI-Generated video. Once purchased.
              the video is yours to distribute, modify and monetize as you wish.
            </div>
            <div>
              <div>Price:</div>
              <div className="text-xl font-bold">$5,000</div>
            </div>
            <div>
              <button className="px-4 py-1 border border-blue-400 hover:bg-blue-400 hover:text-white text-gray-900 rounded-lg cursor-pointer">
                View Licensing
              </button>
            </div>
            <div>
              <button className="px-3 py-1 bg-blue-400 hover:bg-blue-500 hover:text-white text-gray-900 rounded-lg cursor-pointer ">
                Buy
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PricingOptions;
