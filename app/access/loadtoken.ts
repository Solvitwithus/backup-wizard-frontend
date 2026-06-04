"use client"

import { useEffect, useState } from "react"

export function useToken() {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    async function getToken() {
      const res = await fetch("/api/getCookie")
      const data = await res.json()
      setToken(data.token)
    }

    getToken()
  }, [])

  return token
}



export async function revokeToken() {
  try {
    const res = await fetch("/api/revokeCookie", { method: "POST" })

    // Guard against HTML error pages (500s from Next.js)
    const contentType = res.headers.get("content-type") ?? ""
    if (!contentType.includes("application/json")) {
      console.log("revokeCookie returned non-JSON:", res.status, contentType)
      return false
    }

    const body = await res.json()
    console.log("revoke status:", res.status, "body:", body)
    if (!res.ok) throw new Error("Failed to revoke token")
    return true
  } catch (err) {
    console.log("Error revoking token:", err)
    return false
  }
}