"use client"
import { useAccount } from "wagmi"
import { isAddress, Address, formatEther } from "viem"
import { ColumnDef } from "@tanstack/react-table"
import { useZarCGetAllowances } from "@/generated"
import { DataTable } from "./dataTable"
import { NoSsr } from "./noSsr"

export type AllowanceInfo = {
  owner: Address
  amount: String
}

export const columns: ColumnDef<AllowanceInfo>[] = [
  {
    accessorKey: "owner",
    header: "Owner",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]

const UserAllowances = () => {
  const { address } = useAccount()
  const { data } = useZarCGetAllowances({
    args: [address as any],
    enabled: isAddress(address as string),
  })

  const allowances =
    data?.map(({ owner, amount }) => ({
      owner,
      amount: formatEther(amount),
    })) || []

  return <DataTable columns={columns} data={allowances} />
}

const Wrapped = () => (
  <NoSsr>
    <UserAllowances />
  </NoSsr>
)

export { Wrapped as UserAllowances }
