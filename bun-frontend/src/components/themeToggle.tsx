"use client"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NoSsr } from "./noSsr"

const ThemeToggle = () => {
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

const Wrapped = () => {
  return (
    <NoSsr>
      <ThemeToggle />
    </NoSsr>
  )
}

export { Wrapped as ThemeToggle }
