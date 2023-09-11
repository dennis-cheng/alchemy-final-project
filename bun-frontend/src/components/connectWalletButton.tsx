"use client"
import { NoSsr } from "./noSsr"
import { Button } from "./ui/button"
import { useAccount, useConnect } from "wagmi"
import { AccountPopover } from "./accountPopover"

const ConnectWalletButton = () => {
  const { isConnected, address } = useAccount()
  const { connect, connectors } = useConnect()

  if (!isConnected) {
    return (
      <>
        {connectors.map((connector) => (
          <Button
            variant="outline"
            key={connector.id}
            disabled={!connector.ready}
            onClick={() => connect({ connector })}
          >
            {connector.name}
          </Button>
        ))}
      </>
    )
  }
  const formattedAddress = `${address?.slice(0, 4)}...${address?.slice(-3)}`

  return (
    <AccountPopover>
      <Button variant="outline">{formattedAddress}</Button>
    </AccountPopover>
  )
}

const Wrapped = () => {
  return (
    <NoSsr>
      <ConnectWalletButton />
    </NoSsr>
  )
}

export { Wrapped as ConnectWalletButton }