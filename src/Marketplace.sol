// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./IERC4907.sol";

contract ERC4907 is ERC721, IERC4907 {
    struct UserInfo {
        address user; // address of user role
        uint64 expires; // unix timestamp, user expires
    }

    struct Listing {
        uint256 price; // Price for sale
        uint256 rentalPrice; // Price for rent
        uint64 rentalExpiry; // Rental duration expiry
        bool isForSale; // Whether it's listed for sale
        bool isForRent; // Whether it's listed for rent
    }

    uint256 private s_tokenCounter;
    mapping(uint256 => string) private tokenIdToUri;
    mapping(uint256 => Listing) private tokenListings;
    mapping(uint256 => UserInfo) internal _users;
    mapping(uint256 => address) private copyrightRegis;
    mapping(uint256 => address) private listInMarket;

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {
        s_tokenCounter = 1;
    }

    // Function to mint the NFT and set the IPFS URI
    function CPRegistration(string memory TokenUri) public {
        tokenIdToUri[s_tokenCounter] = TokenUri;
        copyrightRegis[s_tokenCounter] = msg.sender;
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter++;
    }

    // Set a listing for sale
    function listForSale(uint256 tokenId, uint256 price) public {
        address owner = ownerOf(tokenId);
        require(msg.sender == owner, "Only the owner can list it for sale");

        tokenListings[tokenId].price = price;
        tokenListings[tokenId].isForSale = true;
        tokenListings[tokenId].isForRent = false; // Ensure it's not for rent when listed for sale
    }

    // Set a listing for rent
    function listForRent(uint256 tokenId, uint256 rentalPrice, uint64 rentalDuration) public {
        address owner = ownerOf(tokenId);
        require(msg.sender == owner, "Only the owner can list it for rent");

        tokenListings[tokenId].rentalPrice = rentalPrice;
        tokenListings[tokenId].rentalExpiry = rentalDuration + uint64(block.timestamp);
        tokenListings[tokenId].isForRent = true;
        tokenListings[tokenId].isForSale = false; // Ensure it's not for sale when listed for rent
    }

    // Buy or rent the NFT
    function buyOrRent(uint256 tokenId) public payable {
        Listing memory listing = tokenListings[tokenId];

        if (listing.isForSale) {
            require(msg.value == listing.price, "Incorrect payment amount");
            address owner = ownerOf(tokenId);
            _transfer(owner, msg.sender, tokenId);
            payable(owner).transfer(msg.value); // Transfer the sale payment to the owner
        } else if (listing.isForRent) {
            require(msg.value == listing.rentalPrice, "Incorrect rental payment amount");
            address owner = ownerOf(tokenId);
            _users[tokenId].user = msg.sender;
            _users[tokenId].expires = listing.rentalExpiry;
            payable(owner).transfer(msg.value); // Transfer the rental payment to the owner
        } else {
            revert("NFT is neither for sale nor for rent");
        }
    }

    // Function to check the rental expiry
    function rentalExpires(uint256 tokenId) public view returns (uint256) {
        return _users[tokenId].expires;
    }

    // View function to get the current user of a rented NFT
    function userOf(uint256 tokenId) public view override returns (address) {
        if (uint256(_users[tokenId].expires) >= block.timestamp) {
            return _users[tokenId].user;
        } else {
            return ownerOf(tokenId);
        }
    }

    // Function to get the listing details of an NFT
    function getListingDetails(uint256 tokenId) public view returns (Listing memory) {
        return tokenListings[tokenId];
    }

    // Implement missing interface functions
    function setUser(uint256 tokenId, address user, uint64 expires) external override {
        /* if (_users[tokenId].user != address(0) && _users[tokenId].expires > block.timestamp) {
            revert("ERC4907: token is currently rented");
        }
        address owner = ownerOf(tokenId);
        require(_isAuthorized(owner, msg.sender, tokenId), "ERC4907: caller is not owner nor approved");
        UserInfo storage info = _users[tokenId];
        info.user = user;
        info.expires = expires;
        emit UpdateUser(tokenId, user, expires); */
    }

    function userExpires(uint256 tokenId) external view override returns (uint256) {
        return _users[tokenId].expires;
    }
}
