import { useAccount } from "wagmi";
import { useZarCBalanceOf } from "@/generated"
import { formatEther, isAddress } from "viem"

const useUserBalance = () => {
  const { address } = useAccount()
  const balanceOfData = useZarCBalanceOf({
    args: [address as any],
    enabled: isAddress(address as string)
  })

  const balance = balanceOfData.data && formatEther(balanceOfData.data)

  return { ...balanceOfData, balance }
}

export { useUserBalance }