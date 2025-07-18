import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3000/api"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
