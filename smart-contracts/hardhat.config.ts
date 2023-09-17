import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  defaultNetwork: "localhost",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/cMmOs6R3rDjE_rEWWldzzCKkcl9VnYtQ",
      accounts: [process.env.SEPOLIA_PRIVATE_KEY as string],
    },
  },
};

export default config;
