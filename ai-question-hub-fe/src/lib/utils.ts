import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAvatarFallback(name?: string): string {
  if (!name) return "??"
  
  const parts = name.trim().split(/\s+/)
  
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase()
  }
  
  const first = parts[0].charAt(0)
  const last = parts[parts.length - 1].charAt(0)
  
  return (first + last).toUpperCase()
}

export function stringToColor(str?: string): string {
  if (!str) return "hsl(214, 45%, 39%)" // Brand baseline
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  // Lock hue, while generating vivid, readable background spectrums
  const h = Math.abs(hash % 360)
  const s = 55 + (Math.abs(hash) % 15) // 55-70% saturation
  const l = 45 + (Math.abs(hash) % 15) // 45-60% lightness
  
  return `hsl(${h}, ${s}%, ${l}%)`
}
