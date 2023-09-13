import { ethers } from "hardhat";

async function main() {
    const initial_supply = ethers.parseEther("10000");
    const zarC = await ethers.deployContract("ZarC", [initial_supply]);
    await zarC.waitForDeployment();

    const zarCAddress = await zarC.getAddress();
    console.log(`ZarC deployed to ${zarCAddress}`);

    const dripAmount = ethers.parseEther("10")
    const dripInterval = 86400 // 24 hours
    const faucet = await ethers.deployContract("ERC20Faucet", [zarCAddress, dripAmount, dripInterval])
    await faucet.waitForDeployment()

    const faucetAddress = await faucet.getAddress()
    console.log(`ZarC faucet deployed to ${faucetAddress}`)
    const transferTransaction = await zarC.transfer(faucetAddress, initial_supply)
    await transferTransaction.wait()
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})