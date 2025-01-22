// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import {Script} from "forge-std/Script.sol";
import {ERC4907} from "../src/Marketplace.sol";

contract DeployBasicNft is Script {
    function run() external {
        vm.startBroadcast();
        new ERC4907("market", "m");
        vm.stopBroadcast();
    }
}
