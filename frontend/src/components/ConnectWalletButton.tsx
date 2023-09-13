"use client"
import { Button } from "./ui/button"
import { useAccount, useConnect } from "wagmi"
import { AccountPopover } from "./accountPopover"
import { ConnectMetaMaskButton } from "./connectMetaMaskButton"

const ConnectWalletButton = () => {
  const { isConnected, address } = useAccount()

  if (!isConnected) {
    return <ConnectMetaMaskButton>Connect</ConnectMetaMaskButton>
  }
  const formattedAddress = `${address?.slice(0, 4)}...${address?.slice(-3)}`

  return (
    <AccountPopover>
      <Button variant="outline">{formattedAddress}</Button>
    </AccountPopover>
  )
}

export { ConnectWalletButton }
