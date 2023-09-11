import { defineConfig } from '@wagmi/cli'
import { react, hardhat } from "@wagmi/cli/plugins"
import { hardhat as hardhatChain } from 'viem/chains'

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [],
  plugins: [
    hardhat({
      project: "../smart-contracts",
      // namePrefix: "Zarc",
      deployments: {
        ZarC: {
          [hardhatChain.id]: "0x5fbdb2315678afecb367f032d93f642f64180aa3"
        }
      }
    }),
    react()
  ],
})
