import Link from "next/link"
import { Button } from "@/components/ui/Button"
import ThemeToggle from "@/components/ThemeToggle"
import ConnectWalletButton from "./ConnectWalletButton"

const ROUTES = [
  {
    label: "Transfer",
    path: "/transfer",
  },
  {
    label: "Approve",
    path: "/approve",
  },
]

export default function Header() {
  return (
    <header className="flex p-2">
      {ROUTES.map(({ label, path }) => (
        <Button asChild variant="link">
          <Link href={path}>{label}</Link>
        </Button>
      ))}
      <div className="ml-auto mr-1">
        <ConnectWalletButton />
      </div>
      <ThemeToggle />
    </header>
  )
}
