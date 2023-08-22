import Link from "next/link"
import { Button } from "@/components/ui/Button"

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
    <div className="flex">
      {ROUTES.map(({ label, path }) => (
        <Button asChild variant="link">
          <Link href={path}>{label}</Link>
        </Button>
      ))}
    </div>
  )
}
