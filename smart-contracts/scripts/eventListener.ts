import { ethers } from "hardhat";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";


(async () => {
    console.log('here')
    const zarC = await ethers.getContractAt("ZarC", contractAddress);
    zarC.on(zarC.getEvent("Transfer"), (from, to, amount) => {
        console.log("Transfer event:", from, to, amount);
    })

    zarC.on(zarC.getEvent("Approval"), (owner, spender, amount) => {
        console.log("Approval event:", owner, spender, amount);
    })
})()