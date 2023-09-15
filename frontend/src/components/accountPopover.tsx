"use client";
import { ReactNode } from "react";
import { useUserBalance } from "@/hooks/useUserBalance";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { useDisconnect } from "wagmi";
import { Button } from "./ui/button";

const AccountPopover = ({ children }: { children: ReactNode }) => {
  const { balance, refetch } = useUserBalance();
  const { disconnect } = useDisconnect();

  const handleDisconnect = () => {
    disconnect();
  };

  const handleRefreshBalance = async () => {
    await refetch();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-auto">
        <Button
          className="w-full"
          variant="ghost"
          onClick={handleRefreshBalance}
        >
          {balance?.toString()} ZARC
        </Button>
        <Separator className="my-1" />
        <Button variant="ghost" onClick={handleDisconnect}>
          Disconnect
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export { AccountPopover };
