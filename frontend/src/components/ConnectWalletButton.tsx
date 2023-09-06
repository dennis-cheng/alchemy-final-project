"use client"
import NoSSR from "./NoSSR"
import { Button } from "./ui/Button"
import { useAccount, useConnect } from "wagmi"

function ConnectWalletButton() {
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

  return <Button variant="outline">{formattedAddress}</Button>
}

export default function () {
  return (
    <NoSSR>
      <ConnectWalletButton />
    </NoSSR>
  )
}
