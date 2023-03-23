// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTLootBox is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    IERC20 token;
    uint256 nftPrice;
    uint256 totalSupply1 = 0;
    string[] public name;
    string[] public description;


    constructor() ERC721("MyNFTs", "MNFT") {
        nftPrice = 10;
    }

    function mintNFT(address recipient, string memory tokenURI,string memory _name,string memory _description) public onlyOwner returns (uint256) {
        require(token.balanceOf(recipient) > nftPrice);

        name.push(_name);
        description.push(_description);
        totalSupply1++;

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function setToken (address tokenAddress) public onlyOwner returns (bool) {
        require(tokenAddress != address(0x0));
        token = IERC20(tokenAddress);
        return true;
    }

    function getNftName(uint256 tokenId) public view returns(string memory){
        return name[tokenId-1];
    }

    function getNftDescription(uint256 tokenId) public view returns(string memory){
        return description[tokenId-1];
    }

    function getTotalSupply() public view returns(uint){
        return totalSupply1;
    }
}