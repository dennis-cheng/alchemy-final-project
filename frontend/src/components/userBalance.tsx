"use client"
import { useUserBalance } from "@/hooks/useUserBalance"

const UserBalance = () => {
  const { balance } = useUserBalance()

  return <>{balance}</>
}

export { UserBalance }
