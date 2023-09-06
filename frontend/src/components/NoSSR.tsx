"use client"
import { ReactNode, useEffect, useState } from "react"

export default function NoSSR({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted && children
}