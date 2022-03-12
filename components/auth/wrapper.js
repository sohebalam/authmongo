import { parseCookies } from "nookies"
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Wrapper = ({ children }) => {
  const cookies = parseCookies()
  const router = useRouter()
  const { data: session } = useSession()

  const user = cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : ""

  useEffect(() => {
    if (!user) {
      router.push("/src/user/login")
    }
  }, [user, router])

  return (
    <>
      <h1>{children}</h1>
    </>
  )
}

export default Wrapper
