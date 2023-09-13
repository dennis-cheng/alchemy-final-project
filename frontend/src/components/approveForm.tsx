"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { parseEther, isAddress } from "viem"
import { useZarCApprove } from "@/generated"
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

const approveFormSchema = z.object({
  spender: z
    .string()
    .refine(isAddress, { message: "Invalid ethereum address" }),
  amount: z.coerce.number().positive(),
})

type approveFormSchemaType = z.infer<typeof approveFormSchema>

const ApproveForm = () => {
  const form = useForm<approveFormSchemaType>({
    resolver: zodResolver(approveFormSchema),
    defaultValues: {
      spender: "" as any,
      amount: "" as any,
    },
  })
  const { isLoading, write } = useZarCApprove()
  const { isConnected } = useAccount()

  const onSubmit = (values: approveFormSchemaType) => {
    const { spender, amount } = values
    write({
      args: [spender, parseEther(amount.toString())],
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="spender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Spender</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormDescription>
                This is the ethereum address you are approving the allowance to
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
                This is the amount you would like to approve
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
            Approve
          </Button>
        )}
      </form>
    </Form>
  )
}

export { ApproveForm }
