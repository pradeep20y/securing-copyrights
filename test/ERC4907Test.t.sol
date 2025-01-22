// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test, console2} from "forge-std/Test.sol";
import {ERC4907} from "../src/Marketplace.sol";

contract ERC4907Test is Test {
    ERC4907 public erc4907;
    address owner = address(0x123);
    address user1 = address(0x456);
    address user2 = address(0x789);
    string constant testURI = "ipfs://test-uri";

    function setUp() public {
        vm.prank(owner);
        erc4907 = new ERC4907("TestNFT", "TNFT");
    }

    // Add test functions starting with 'test'
    function testSetUser() public {
        vm.startPrank(owner);
    }
}
