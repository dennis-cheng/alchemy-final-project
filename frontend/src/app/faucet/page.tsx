"use client"
import { Button } from "@/components/ui/button"
import { useErc20FaucetDrip } from "@/generated"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"

export default function Faucet() {
  const { isLoading, write, isError } = useErc20FaucetDrip()

  const submit = () => {
    write()
  }

  return (
    <section>
      <Button disabled={isLoading} onClick={submit}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Claim
      </Button>
      {isError && (
        <p className="text-destructive">Can only claim once every 24 hours</p>
      )}
    </section>
  )
}
