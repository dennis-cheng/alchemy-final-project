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
        _upsertApproval(owner, spender);
        _upsertAllowance(spender, owner);

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

    function _upsertApproval(address owner, address spender) internal {
        address[] storage ownerApprovals = approvals[owner];
        bool found = false;
        for (uint i = 0; i < ownerApprovals.length; i++) {
            if (ownerApprovals[i] == spender) {
                found = true;
                break;
            }
        }
        if (!found) {
            ownerApprovals.push(spender);
        }
    }

    function _upsertAllowance(address spender, address owner) internal {
        address[] storage spenderAllowances = allowances[spender];
        bool found = false;
        for (uint i = 0; i < spenderAllowances.length; i++) {
            if (spenderAllowances[i] == owner) {
                found = true;
                break;
            }
        }
        if (!found) {
            spenderAllowances.push(owner);
        }
    }
}
