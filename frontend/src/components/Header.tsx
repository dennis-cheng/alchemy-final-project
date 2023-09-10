import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/themeToggle"
import { ConnectWalletButton } from "./connectWalletButton"

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

const Header = () => {
  return (
    <header className="flex p-2">
      {ROUTES.map(({ label, path }) => (
        <Button asChild variant="link" key={label}>
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

export { Header }
