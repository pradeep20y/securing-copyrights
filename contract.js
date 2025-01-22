let provider;
let signer;
let contract;
let contractAddress = '0x6e5023117887B57340d841A576453739DEa34fB2'; // Replace with your deployed contract address
let abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name_",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "symbol_",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "ERC721IncorrectOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ERC721InsufficientApproval",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "approver",
                "type": "address"
            }
        ],
        "name": "ERC721InvalidApprover",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "ERC721InvalidOperator",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "ERC721InvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            }
        ],
        "name": "ERC721InvalidReceiver",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "ERC721InvalidSender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ERC721NonexistentToken",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "expires",
                "type": "uint64"
            }
        ],
        "name": "UpdateUser",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "TokenUri",
                "type": "string"
            }
        ],
        "name": "CPRegistration",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "buyOrRent",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getApproved",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getListingDetails",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rentalPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint64",
                        "name": "rentalExpiry",
                        "type": "uint64"
                    },
                    {
                        "internalType": "bool",
                        "name": "isForSale",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isForRent",
                        "type": "bool"
                    }
                ],
                "internalType": "struct ERC4907.Listing",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "rentalPrice",
                "type": "uint256"
            },
            {
                "internalType": "uint64",
                "name": "rentalDuration",
                "type": "uint64"
            }
        ],
        "name": "listForRent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            }
        ],
        "name": "listForSale",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "rentalExpires",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "uint64",
                "name": "expires",
                "type": "uint64"
            }
        ],
        "name": "setUser",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "userExpires",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "userOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, abi, signer);

        document.getElementById("connectButton").innerText = "Wallet Connected";
        document.getElementById("mintButton").disabled = false; // Enable minting button once connected
    } else {
        alert("Please install MetaMask!");
    }
}

// Mint NFT (copyright registration)
async function mintNFT() {
    const tokenUri = document.getElementById("tokenUri").value;

    if (!tokenUri) {
        alert("Please enter a valid Token URI.");
        return;
    }

    try {
        console.log("Attempting to mint NFT...");

        // Send transaction to smart contract
        const tx = await contract.CPRegistration(tokenUri);
        console.log("Transaction sent:", tx);

        // Wait for transaction to be mined
        const receipt = await tx.wait();
        console.log("Transaction mined:", receipt);
        alert("NFT minted successfully!");
        document.getElementById("sellButton").disabled = false; // Enable sale button
        document.getElementById("rentButton").disabled = false; // Enable rent button
    } catch (error) {
        console.error(error);
        alert("Minting failed.");
    }


}

// List for Sale
async function listForSale() {
    const price = document.getElementById("price").value;
    const tokenId = document.getElementById("StokenId").value;

    if (!price || !tokenId) {
        alert("Please enter a valid BookId and price.");
        return;
    }

    try {
        const tx = await contract.listForSale(tokenId, ethers.utils.parseEther(price));
        await tx.wait();
        alert("NFT listed for sale!");
    } catch (error) {
        console.error(error);
        alert("Listing for sale failed.");
    }
}

// List for Rent
async function listForRent() {
    const rentalPrice = document.getElementById("rentalPrice").value;
    const rentalDuration = document.getElementById("rentalDuration").value;
    const tokenId = document.getElementById("RtokenId").value; // Example tokenId, adjust this for your use case

    if (!rentalPrice || !rentalDuration || tokenId) {
        alert("Please enter a valid rental price, bookId and duration.");
        return;
    }

    try {
        const tx = await contract.listForRent(tokenId, ethers.utils.parseEther(rentalPrice), rentalDuration);
        await tx.wait();
        alert("NFT listed for rent!");
    } catch (error) {
        console.error(error);
        alert("Listing for rent failed.");
    }
}

// Buy or Rent the NFT
async function buyOrRent() {
    const tokenId = document.getElementById("BtokenId").value; // Example tokenId, adjust this for your use case
    if (!tokenId) {
        alert("Please enter a valid BookId");
        return;
    }
    try {
        const listing = await contract.getListingDetails(tokenId);

        if (listing.isForSale) {
            const tx = await contract.buyOrRent(tokenId, { value: listing.price });
            await tx.wait();
            alert("NFT purchased successfully!");
        } else if (listing.isForRent) {
            const tx = await contract.buyOrRent(tokenId, { value: listing.rentalPrice });
            await tx.wait();
            alert("NFT rented successfully!");
        } else {
            alert("NFT is neither for sale nor for rent.");
        }
    } catch (error) {
        console.error(error);
        alert("Transaction failed.");
    }
}
// Fetch and display token details
async function viewTokenDetails() {
    const tokenId = document.getElementById("viewTokenId").value;

    if (!tokenId) {
        alert("Please enter a valid Token ID.");
        return;
    }

    try {
        const details = await contract.getListingDetails(tokenId);

        // Display details
        const detailsDisplay = document.getElementById("detailsDisplay");
        detailsDisplay.innerHTML = `
            <h3>Token Details for ID: ${tokenId}</h3>
            <p><strong>Price:</strong> ${ethers.utils.formatEther(details.price)} ETH</p>
            <p><strong>Rental Price:</strong> ${ethers.utils.formatEther(details.rentalPrice)} ETH</p>
            <p><strong>Rental Expiry:</strong> ${details.rentalExpiry > 0
                ? new Date(details.rentalExpiry * 1000).toLocaleString()
                : "N/A"
            }</p>
            <p><strong>Listed for Sale:</strong> ${details.isForSale ? "Yes" : "No"}</p>
            <p><strong>Listed for Rent:</strong> ${details.isForRent ? "Yes" : "No"}</p>
        `;
    } catch (error) {
        console.error(error);
        alert("Failed to fetch token details.");
    }
}

// Add event listener for the View Details button
document.getElementById("viewDetailsButton").addEventListener("click", viewTokenDetails);


// Event Listeners for buttons
document.getElementById("connectButton").addEventListener("click", connectWallet);
document.getElementById("mintButton").addEventListener("click", mintNFT);
document.getElementById("sellButton").addEventListener("click", listForSale);
document.getElementById("rentButton").addEventListener("click", listForRent);
document.getElementById("buyButton").addEventListener("click", buyOrRent);
