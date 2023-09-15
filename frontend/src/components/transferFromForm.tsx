"use client";
import { useZarCTransferFrom } from "@/generated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { isAddress, parseEther } from "viem";
import { useAccount } from "wagmi";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "./ui/form";
import { Input } from "./ui/input";
import { ConnectMetaMaskButton } from "./connectMetaMaskButton";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useUserBalance } from "@/hooks/useUserBalance";

const transferFromFormSchema = z.object({
  from: z.string().refine(isAddress, { message: "Invalid ethereum address" }),
  to: z.string().refine(isAddress, { message: "Invalid ethereum address" }),
  amount: z.coerce.number().positive(),
});

type transferFromFormSchemaType = z.infer<typeof transferFromFormSchema>;

const TransferFromForm = () => {
  const form = useForm<transferFromFormSchemaType>({
    resolver: zodResolver(transferFromFormSchema),
    defaultValues: {
      from: "" as any,
      to: "" as any,
      amount: "" as any,
    },
  });

  const { isLoading, write, isSuccess } = useZarCTransferFrom();
  const { isConnected } = useAccount();
  const { refetch } = useUserBalance();

  useEffect(() => {
    if (isSuccess) refetch();
  }, [isSuccess]);

  const onSubmit = (values: transferFromFormSchemaType) => {
    const { from, to, amount } = values;
    write({
      args: [from, to, parseEther(amount.toString())],
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="from"
          render={({ field }) => (
            <FormItem>
              <FormLabel>From</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormDescription>
                This is the ethereum address you are transferring from
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="to"
          render={({ field }) => (
            <FormItem>
              <FormLabel>To</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormDescription>
                This is the ethereum address you are transferring to
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="Amount" {...field} />
              </FormControl>
              <FormDescription>
                This is the amount you would like to transfer
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isConnected ? (
          <ConnectMetaMaskButton>Connect</ConnectMetaMaskButton>
        ) : (
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Transfer
          </Button>
        )}
      </form>
    </Form>
  );
};

export { TransferFromForm };
