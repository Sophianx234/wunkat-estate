// Authentication utility functions
// TODO: Replace with NextAuth.js configuration in production

export interface User {
  id: string
  email: string
  name?: string
}

export function getUser(): User | null {
  if (typeof window === "undefined") {
    return null
  }

  const userStr = localStorage.getItem("user")
  if (!userStr) return null

  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user")
  }
}

export function isAuthenticated(): boolean {
  return getUser() !== null
}
