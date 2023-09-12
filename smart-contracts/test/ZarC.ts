import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

const TOKEN_NAME = "ZAR Coin";
const TOKEN_SYMBOL = "ZARC";
const INITIAL_SUPPLY = ethers.parseEther("10000");

describe("ZarC", function () {
    async function deployZarCFixture() {
        const ZarC = await ethers.getContractFactory("ZarC");
        const zarC = await ZarC.deploy(INITIAL_SUPPLY);
        return { zarC };
    }

    describe("Deployment", function () {
        it("Should set name", async function () {
            const { zarC } = await loadFixture(deployZarCFixture);
            expect(await zarC.name()).to.equal(TOKEN_NAME);
        })
        it("Should set symbol", async function () {
            const { zarC } = await loadFixture(deployZarCFixture);
            expect(await zarC.symbol()).to.equal(TOKEN_SYMBOL);
        })
        it("Should set initial supply", async function () {
            const { zarC } = await loadFixture(deployZarCFixture);
            expect(await zarC.totalSupply()).to.equal(INITIAL_SUPPLY);
        })
    })

    describe("Approve function", function () {
        it("Should add spender to owner's list of approvals", async function () {
            const { zarC } = await loadFixture(deployZarCFixture);
            const [owner, spender] = await ethers.getSigners()
            const amount = ethers.parseEther("100")
            const transaction = await zarC.approve(spender, amount)
            await transaction.wait()

            const ownerApprovals = await zarC.getApprovals(owner)
            expect(ownerApprovals).to.include.deep.members([[spender.address, amount]])
        })

        it("Should add owner to spender's list of allowances", async function () {
            const { zarC } = await loadFixture(deployZarCFixture);
            const [owner, spender] = await ethers.getSigners()
            const amount = ethers.parseEther("100")
            const transaction = await zarC.approve(spender, amount)
            await transaction.wait()

            const spenderAllowances = await zarC.getAllowances(spender)
            expect(spenderAllowances).to.include.deep.members([[owner.address, amount]])
        })
    })
})