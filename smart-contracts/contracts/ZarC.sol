// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ZarC is ERC20 {
    constructor(uint initialSupply) ERC20("ZAR Coin", "ZARC") {
        _mint(msg.sender, initialSupply);
    }
}
