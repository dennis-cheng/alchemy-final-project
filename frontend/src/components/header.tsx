import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/themeToggle";
import { ConnectWalletButton } from "./connectWalletButton";

const ROUTES = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Transfer",
    path: "/transfer",
  },
  {
    label: "Transfer From",
    path: "/transferFrom",
  },
  {
    label: "Approve",
    path: "/approve",
  },
  {
    label: "Faucet",
    path: "/faucet",
  },
  {
    label: "Allowances",
    path: "/allowances",
  },
  {
    label: "Approvals",
    path: "/approvals",
  },
];

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
  );
};

export { Header };
