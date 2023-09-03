"use client"
import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/Button"

export default function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  return (
    <>
      {mounted && (
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {resolvedTheme === "light" ? <Moon /> : <Sun />}
        </Button>
      )}
    </>
  )
}
