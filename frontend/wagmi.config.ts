import { defineConfig, loadEnv } from "@wagmi/cli";
import { react, hardhat } from "@wagmi/cli/plugins";
import { hardhat as hardhatChain, sepolia } from "viem/chains";

const env = loadEnv({
  mode: process.env.NODE_ENV,
  envDir: "../smart-contracts",
});

export default defineConfig({
  out: "src/generated.ts",
  contracts: [],
  plugins: [
    hardhat({
      project: "../smart-contracts",
      // namePrefix: "Zarc",
      deployments: {
        ZarC: {
          [hardhatChain.id]: "0x5fbdb2315678afecb367f032d93f642f64180aa3",
          [sepolia.id]: "0x1f4eEF9E322B434bC2501bCb4FA4A5aFcfc24530",
        },
        ERC20Faucet: {
          [hardhatChain.id]: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
          [sepolia.id]: "0xacd362a06092E1598F4f57D124F3D5E0F31b1F85",
        },
      },
    }),
    react(),
  ],
});
