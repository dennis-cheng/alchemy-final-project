"use client"
import { useConnect } from "wagmi"
import { Button } from "./ui/button"
import { ReactNode } from "react"

const ConnectMetaMaskButton = ({ children }: { children: ReactNode }) => {
  const { connect, connectors } = useConnect()
  const connector = connectors[0]

  return (
    <Button
      variant="outline"
      disabled={!connector.ready}
      onClick={() => connect({ connector })}
    >
      {children}
    </Button>
  )
}

export { ConnectMetaMaskButton }
