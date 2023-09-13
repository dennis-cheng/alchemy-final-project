import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers"
import { expect } from "chai"
import { ethers } from "hardhat"

const INITIAL_SUPPLY = ethers.parseEther("10000")
const DRIP_AMOUNT = ethers.parseEther("10")
const DRIP_INTERVAL = 86400 // 24 hours

describe("ERC20Faucet", function () {
    async function deployContractsFixture() {
        const ZarC = await ethers.getContractFactory("ZarC")
        const ERC20Faucet = await ethers.getContractFactory("ERC20Faucet")
        const zarC = await ZarC.deploy(INITIAL_SUPPLY)
        const tokenAddress = await zarC.getAddress()
        const faucet = await ERC20Faucet.deploy(tokenAddress, DRIP_AMOUNT, DRIP_INTERVAL)
        return { zarC, faucet }
    }

    async function transferToFaucetFixture() {
        const { zarC, faucet } = await deployContractsFixture()
        const faucetAddress = await faucet.getAddress()
        const transaction = await zarC.transfer(faucetAddress, ethers.parseEther("9000"))
        await transaction.wait()
        return { zarC, faucet }
    }

    describe("Deployment", function () {
        it("Should set token address", async function () {
            const { zarC, faucet } = await loadFixture(deployContractsFixture)
            const tokenAddress = await zarC.getAddress()
            expect(await faucet.token()).to.equal(tokenAddress)
        })
        it("Should set drip amount", async function () {
            const { faucet } = await loadFixture(deployContractsFixture)
            expect(await faucet.dripAmount()).to.equal(DRIP_AMOUNT)
        })
        it("Should set drip interval", async function () {
            const { faucet } = await loadFixture(deployContractsFixture)
            expect(await faucet.dripInterval()).to.equal(DRIP_INTERVAL)
        })
    })

    describe("Drip function", function () {
        it("Should transfer to account the drip amount", async function () {
            const { zarC, faucet } = await loadFixture(transferToFaucetFixture)
            const [_, signerA, signerB] = await ethers.getSigners()
            const faucetAddress = await faucet.getAddress()
            const faucetBalance = await zarC.balanceOf(faucetAddress)

            const transactionA = await faucet.connect(signerA).drip()
            const transactionB = await faucet.connect(signerB).drip()
            await transactionA.wait()
            await transactionB.wait()

            const expectedFaucetBalance = faucetBalance - DRIP_AMOUNT - DRIP_AMOUNT


            expect(await zarC.balanceOf(faucetAddress)).to.equal(expectedFaucetBalance)
            expect(await zarC.balanceOf(signerA.address)).to.equal(DRIP_AMOUNT)
            expect(await zarC.balanceOf(signerB.address)).to.equal(DRIP_AMOUNT)
        })
        it("Should not allow an account drip more than once within drip interval", async function () {
            const { faucet } = await loadFixture(transferToFaucetFixture)

            const transactionA = await faucet.drip()
            await transactionA.wait()
            const currentTimestamp = await time.latest()
            await time.increaseTo(currentTimestamp + 3600)

            await expect(faucet.drip()).to.be.revertedWith("Drip interval not passed")
        })
        it("Should allow an account to drip again once drip interval has passed", async function () {
            const { zarC, faucet } = await loadFixture(transferToFaucetFixture)
            const [_, account] = await ethers.getSigners()

            const transactionA = await faucet.connect(account).drip()
            await transactionA.wait()

            const currentTimestamp = await time.latest()
            await time.increaseTo(currentTimestamp + DRIP_INTERVAL)

            const expectedAmount = DRIP_AMOUNT * 2n

            expect(await faucet.connect(account).drip()).to.not.be.reverted
            expect(await zarC.balanceOf(account.address)).to.equal(expectedAmount)
        })
        it("Should fail if faucet contract does not have enough funds", async function () {
            const { faucet } = await loadFixture(deployContractsFixture)
            await expect(faucet.drip()).to.be.reverted
        })

    })
})