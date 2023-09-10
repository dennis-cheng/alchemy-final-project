"use client"
import { useUserBalance } from "@/hooks/useUserBalance"
import { NoSsr } from "./noSsr"

const UserBalance = () => {
  const { balance } = useUserBalance()

  return <>{balance}</>
}

const Wrapped = () => {
  return (
    <NoSsr>
      <UserBalance />
    </NoSsr>
  )
}

export { Wrapped as UserBalance }
