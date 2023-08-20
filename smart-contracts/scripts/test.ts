import { ethers } from "hardhat"
// ethers.toUtf8Bytes
const { keccak256, toUtf8Bytes } = ethers

function main() {
    console.log(keccak256(toUtf8Bytes("symbol()")))
}

main()