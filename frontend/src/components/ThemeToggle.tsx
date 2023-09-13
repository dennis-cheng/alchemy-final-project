"use client"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

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

export { ThemeToggle }
