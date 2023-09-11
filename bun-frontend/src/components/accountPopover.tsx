"use client"
import { ReactNode } from "react"
import { useUserBalance } from "@/hooks/useUserBalance"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Separator } from "./ui/separator"

const AccountPopover = ({ children }: { children: ReactNode }) => {
  const { balance } = useUserBalance()

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-auto">
        <div>{balance?.toString()} ZARC</div>
        <Separator className="my-1" />
        <div>Disconnect</div>
      </PopoverContent>
    </Popover>
  )
}

export { AccountPopover }
