// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ZarC is ERC20 {
    struct AllowanceInfo {
        address owner;
        uint amount;
    }
    struct ApprovalInfo {
        address spender;
        uint amount;
    }

    mapping(address => address[]) private approvals;
    mapping(address => address[]) private allowances;

    constructor(uint initialSupply) ERC20("ZAR Coin", "ZARC") {
        _mint(msg.sender, initialSupply);
    }

    function approve(
        address spender,
        uint amount
    ) public virtual override returns (bool) {
        address owner = _msgSender();
        bool success = ERC20.approve(spender, amount);
        require(success, "Failed to approve ");
        approvals[owner].push(spender);
        allowances[spender].push(owner);

        return true;
    }

    function getApprovals(
        address owner
    ) public view returns (ApprovalInfo[] memory) {
        address[] memory spenders = approvals[owner];
        uint size = spenders.length;
        ApprovalInfo[] memory approvalInfo = new ApprovalInfo[](size);
        for (uint i = 0; i < size; i++) {
            approvalInfo[i] = ApprovalInfo({
                spender: spenders[i],
                amount: allowance(owner, spenders[i])
            });
        }

        return approvalInfo;
    }

    function getAllowances(
        address spender
    ) public view returns (AllowanceInfo[] memory) {
        address[] memory owners = allowances[spender];
        uint size = owners.length;
        AllowanceInfo[] memory allowanceInfo = new AllowanceInfo[](size);
        for (uint i = 0; i < size; i++) {
            allowanceInfo[i] = AllowanceInfo({
                owner: owners[i],
                amount: allowance(owners[i], spender)
            });
        }
        return allowanceInfo;
    }
}
