"use client"
import { useAccount } from "wagmi"
import { isAddress, Address, formatEther } from "viem"
import { useZarCGetApprovals } from "@/generated"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "./dataTable"

export type ApprovalInfo = {
  spender: Address
  amount: String
}

export const columns: ColumnDef<ApprovalInfo>[] = [
  {
    accessorKey: "spender",
    header: "Spender",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]

const UserApprovals = () => {
  const { address } = useAccount()
  const { data } = useZarCGetApprovals({
    args: [address as any],
    enabled: isAddress(address as string),
  })

  const approvals =
    data?.map(({ spender, amount }) => ({
      spender,
      amount: formatEther(amount),
    })) || []

  return <DataTable columns={columns} data={approvals} />
}

export { UserApprovals }
