// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ERC20Faucet is Context {
    IERC20 public token;
    uint public dripAmount;
    uint public dripInterval;
    mapping(address => uint) lastDripTimestamp;

    event Drip(address indexed receiver, uint amount);

    constructor(address _tokenAddress, uint _dripAmount, uint _dripInterval) {
        token = IERC20(_tokenAddress);
        dripAmount = _dripAmount;
        dripInterval = _dripInterval;
    }

    function drip() external {
        address account = _msgSender();
        require(
            block.timestamp >= lastDripTimestamp[account] + dripInterval,
            "Drip interval not passed"
        );
        lastDripTimestamp[account] = block.timestamp;

        bool success = token.transfer(account, dripAmount);
        require(success, "Transfer failed");

        emit Drip(account, dripAmount);
    }
}
