// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Asset is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _assetIds;

    struct TokenDetails {
        uint256 price;
        address owner;
        bool forSale;
    }

    // Mapping token ID to its details
    mapping(uint256 => TokenDetails) private _tokenDetails;
    mapping(address => uint256[]) private _ownerTokens;

    constructor() ERC721("Tolma's Asset", "TASSET") {}

    // Mint function to create a new Asset and assign a URI
    function mint(string memory _tokenURI) public returns (uint) {
        _assetIds.increment();
        uint256 newAssetId = _assetIds.current();
        
        _safeMint(msg.sender, newAssetId);
        _setTokenURI(newAssetId, _tokenURI);

        _tokenDetails[newAssetId] = TokenDetails(0, msg.sender, false); // Not for sale by default
        _ownerTokens[msg.sender].push(newAssetId);

        return newAssetId;
    }

    // Get all URIs of tokens created by the user
    function getMyTokenURIs() public view returns (string[] memory) {
        uint256[] memory userTokens = _ownerTokens[msg.sender];
        string[] memory uris = new string[](userTokens.length);

        for (uint256 i = 0; i < userTokens.length; i++) {
            uris[i] = tokenURI(userTokens[i]);
        }

        return uris;
    }

    // List an Asset for sale with a specified price
    function sellToken(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "Only the owner can sell this token");
        require(price > 0, "Price must be greater than zero");

        _tokenDetails[tokenId].forSale = true;
        _tokenDetails[tokenId].price = price;
    }

    // Buy an Asset listed for sale
    function buyToken(uint256 tokenId) public payable {
        require(_tokenDetails[tokenId].forSale, "Token is not for sale");
        require(msg.value >= _tokenDetails[tokenId].price, "Insufficient funds to buy the token");

        address seller = ownerOf(tokenId);
        
        // Transfer the ownership
        _transfer(seller, msg.sender, tokenId);

        // Update details
        _tokenDetails[tokenId].forSale = false;
        _tokenDetails[tokenId].price = 0;
        _tokenDetails[tokenId].owner = msg.sender;

        // Update token listings for seller and buyer
        removeTokenFromList(seller, tokenId);
        _ownerTokens[msg.sender].push(tokenId);

        // Transfer payment to seller
        payable(seller).transfer(msg.value);
    }

    // Get all the details of a token
    function getDetailsOFAToken(uint256 tokenId) public view returns (TokenDetails memory) {
        TokenDetails memory allTokenDetails = _tokenDetails[tokenId];
        return allTokenDetails;
    }

    // Get a list of all tokens available for sale
    function getAllTokensAvailableForSale() public view returns (uint256[] memory) {
        uint256 totalAssets = _assetIds.current();
        uint256 count = 0;

        // Count available tokens for sale
        for (uint256 i = 1; i <= totalAssets; i++) {
            if (_tokenDetails[i].forSale) {
                count++;
            }
        }

        uint256[] memory tokensForSale = new uint256[](count);
        uint256 index = 0;

        for (uint256 i = 1; i <= totalAssets; i++) {
            if (_tokenDetails[i].forSale) {
                tokensForSale[index] = i;
                index++;
            }
        }

        return tokensForSale;
    }

    // Internal function to remove token from previous owner's list
    function removeTokenFromList(address owner, uint256 tokenId) internal {
        uint256 length = _ownerTokens[owner].length;

        for (uint256 i = 0; i < length; i++) {
            if (_ownerTokens[owner][i] == tokenId) {
                _ownerTokens[owner][i] = _ownerTokens[owner][length - 1];
                _ownerTokens[owner].pop();
                break;
            }
        }z
    }

    // Existing function to get all token URIs
    function getAllTokenURIs() public view returns (string[] memory) {
        uint256 totalAssets = _assetIds.current();
        string[] memory tokenURIs = new string[](totalAssets);

        for (uint256 i = 0; i < totalAssets; i++) {
            uint256 tokenId = i + 1; // Token IDs start from 1
            tokenURIs[i] = tokenURI(tokenId);
        }

        return tokenURIs;
    }
}
