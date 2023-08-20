import { ethers } from "hardhat";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

async function main() {
    const [signer, acc1, acc2] = await ethers.getSigners();
    const zarC = await ethers.getContractAt("ZarC", contractAddress);
    const name = await zarC.name();
    const symbol = await zarC.symbol();
    const totalSupply = await zarC.totalSupply();
    // zarC.on(zarC.getEvent("Transfer"), (from, to, value, e) => {
    //     console.log(from, to, value, e)
    // });

    console.log("Name:", name);
    console.log("Symbol:", symbol);
    console.log("Total Supply:", ethers.formatEther(totalSupply));
    console.log("signer balance:", ethers.formatEther(await zarC.balanceOf(signer.address)));
    console.log("acc1 balance:", ethers.formatEther(await zarC.balanceOf(acc1.address)));
    console.log("acc2 balance:", ethers.formatEther(await zarC.balanceOf(acc2.address)));

    const tx = await zarC.transfer(acc1, ethers.parseEther("10"))
    await tx.wait()

    // console.log(ethers.formatEther(await zarC.balanceOf(signer.address)));
    // console.log(ethers.formatEther(await zarC.balanceOf(acc1.address)));


    // console.log("acc1 allowance:", ethers.formatEther(await zarC.allowance(signer, acc1)));
    await zarC.approve(acc1, ethers.parseEther("100"))
    // const tx = await zarC.connect(acc1).transferFrom(signer, acc2, ethers.parseEther("100"));
    // await tx.wait();
    // console.log("signer balance:", ethers.formatEther(await zarC.balanceOf(signer.address)));
    // console.log("acc1 balance:", ethers.formatEther(await zarC.balanceOf(acc1.address)));
    // console.log("acc2 balance:", ethers.formatEther(await zarC.balanceOf(acc2.address)));
    // console.log("acc1 allowance:", ethers.formatEther(await zarC.allowance(signer, acc1)));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})