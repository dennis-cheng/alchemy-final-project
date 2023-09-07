"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { parseEther } from "viem"
import { isAddress } from "viem"
import * as z from "zod"

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

const transferFormSchema = z.object({
  to: z.string().refine(isAddress, { message: "Invalid ethereum address" }),
  amount: z.coerce.number().positive(),
})

type transferFormSchemaType = z.infer<typeof transferFormSchema>

const TranferForm = () => {
  const form = useForm<transferFormSchemaType>({
    resolver: zodResolver(transferFormSchema),
    defaultValues: {
      to: "" as any,
      amount: "" as any,
    },
  })

  const onSubmit = (values: transferFormSchemaType) => {
    const { to, amount } = values
    const payload = {
      to,
      amount: parseEther(amount.toString()),
    }
    console.log(payload)
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
        <Button type="submit">Transfer</Button>
      </form>
    </Form>
  )
}

export { TranferForm }
