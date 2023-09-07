"use client"
import { ReactNode, useEffect, useState } from "react"

const NoSsr = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted && children
}

export { NoSsr }
