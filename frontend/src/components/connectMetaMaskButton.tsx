"use client"
import { useConnect } from "wagmi"
import { Button } from "./ui/button"
import { ReactNode } from "react"
import { NoSsr } from "./noSsr"

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

const Wrapped = ({ children }: { children: ReactNode }) => (
  <NoSsr>
    <ConnectMetaMaskButton>{children}</ConnectMetaMaskButton>
  </NoSsr>
)

export { Wrapped as ConnectMetaMaskButton }
