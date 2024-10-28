import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = ({ setPubAddress }) => {
  const [account, setAccount] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpenMenu = () => setOpen(!open);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access if needed
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const connectedAccount = accounts[0];
        setAccount(connectedAccount);

        // Cache the connected account
        localStorage.setItem("connectedAccount", connectedAccount);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask to use this dApp.");
    }
  };

  useEffect(() => {
    // Check for a cached account and set it if present
    const cachedAccount = localStorage.getItem("connectedAccount");
    if (cachedAccount) {
      setAccount(cachedAccount);
    }

    // Listen for account changes in MetaMask
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setPubAddress(accounts[0]);
          localStorage.setItem("connectedAccount", accounts[0]);
        } else {
          setAccount(null);
          setPubAddress(null);
          localStorage.removeItem("connectedAccount");
        }
      });
    }

    // Clean up the event listener on component unmount
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", () => {});
      }
    };
  }, []);

  useEffect(() => {
    if (account) {
      setPubAddress(account);
    }
  }, [account]);

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="m-0 text-5xl font-bold min-w-fit">TOLMA</h1>
      <div
        onClick={() => handleOpenMenu()}
        className="text-4xl absolute top-4 right-3 md:hidden cursor-pointer"
      >
        <ion-icon name={open ? "close" : "menu"}></ion-icon>
      </div>

      <div
        className={`${
          open ? "top-20 left-0" : "top-[-496px]"
        } flex flex-col md:flex-row md:justify-around items-center text-nowrap md:pb-0 py-3 absolute md:static bg-white md:bg-[transparent] gap-5 w-full md:w-auto pl-3 md:border-none border-2 border-blue-400 rounded-b-2xl transition-all duration-500 ease-in-out z-10`}
      >
        <div className="w-5/6 lg:text-xl">
          <ul className="flex gap-5 justify-around w-full md:w-1/2 ">
            <li
              key={1}
              className="cursor-pointer border-blue-400 hover:bg-blue-500 hover:text-white text-black md:text-white border rounded-lg p-2"
            >
              <Link to="/">Asset Library</Link>
            </li>
            <li
              key={2}
              className="cursor-pointer border-blue-400 hover:bg-blue-500 hover:text-white text-black md:text-white  border rounded-lg p-2 hover:text-blue-500"
            >
              <Link to="/create-nft">Create Asset</Link>
            </li>
            <li
              key={3}
              className="cursor-pointer border-blue-400 hover:bg-blue-500 hover:text-white text-black md:text-white  border rounded-lg p-2 hover:text-blue-500"
            >
              <Link to="/my-nfts">My Assets</Link>
            </li>
            <li
              key={4}
              className="cursor-pointer border-blue-400 hover:bg-blue-500 hover:text-white text-black md:text-white  border rounded-lg p-2 hover:text-blue-500"
            >
              <Link to="https://github.com/bhupendra-chouhan/TOLMA-Livepeer" target="_blank">
                GitHub
              </Link>
            </li>
          </ul>
        </div>

        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-400 text-gray-900 rounded-lg cursor-pointer text-base"
        >
          {account
            ? `${account.slice(0, 6)}...${account.slice(-4)}`
            : "Connect Wallet"}
        </button>
      </div>
    </header>
  );
};

export default Header;
