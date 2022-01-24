import { useState } from "react"
import axios from "axios"
import cookie from "js-cookie"
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { useRouter } from "next/router"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const { data: session } = useSession()

  const SubmitHandler = async (e) => {
    e.preventDefault()

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const { data } = await axios.post(`/api/login`, { email, password }, config)

    cookie.set("token", data?.token)
    cookie.set("user", JSON.stringify(data?.user))
    router.push("/")
  }

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("google")}>Sign in</button>
      <form onSubmit={SubmitHandler}>
        <h1>Login </h1>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}

export default Login
