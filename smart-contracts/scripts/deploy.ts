import { ethers } from "hardhat";

async function main() {
    const initial_supply = ethers.parseEther("10000");
    const zarC = await ethers.deployContract("ZarC", [initial_supply]);
    await zarC.waitForDeployment();

    const zarCAddress = await zarC.getAddress();
    console.log(`ZarC deployed to ${zarCAddress}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})