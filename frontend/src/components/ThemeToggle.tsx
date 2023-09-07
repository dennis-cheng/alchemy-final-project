"use client"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/Button"
import NoSSR from "./NoSSR"

function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  return (
    <>
      <Button variant="outline" size="icon" onClick={toggleTheme}>
        {resolvedTheme === "light" ? <Moon /> : <Sun />}
      </Button>
    </>
  )
}

export default function () {
  return (
    <NoSSR>
      <ModeToggle />
    </NoSSR>
  )
}
