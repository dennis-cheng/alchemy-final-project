"use client"
import { ReactNode } from "react"
import { ThemeProvider } from "next-themes"
import WagmiProvider from "@/providers/WagmiProvider"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <WagmiProvider>{children}</WagmiProvider>
    </ThemeProvider>
  )
}
