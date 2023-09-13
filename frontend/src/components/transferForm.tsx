"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { parseEther, isAddress } from "viem"
import { useZarCTransfer } from "@/generated"
import { Loader2 } from "lucide-react"
import * as z from "zod"
import { ConnectMetaMaskButton } from "./connectMetaMaskButton"

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormDescription,
  FormLabel,
} from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useAccount } from "wagmi"

const transferFormSchema = z.object({
  to: z.string().refine(isAddress, { message: "Invalid ethereum address" }),
  amount: z.coerce.number().positive(),
})

type transferFormSchemaType = z.infer<typeof transferFormSchema>

const TransferForm = () => {
  const form = useForm<transferFormSchemaType>({
    resolver: zodResolver(transferFormSchema),
    defaultValues: {
      to: "" as any,
      amount: "" as any,
    },
  })
  const { isLoading, write } = useZarCTransfer()
  const { isConnected } = useAccount()

  const onSubmit = (values: transferFormSchemaType) => {
    const { to, amount } = values
    write({
      args: [to, parseEther(amount.toString())],
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <Input placeholder="Amount" type="number" {...field} />
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
  )
}

export { TransferForm }
