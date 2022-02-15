import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  console.log(session)
  if (session) {
    return (
      <>
        <h1>Home</h1>
        {/* Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button> */}
      </>
    )
  }
  return (
    <>
      <h1>Home</h1>
      {/* Not signed in <br />
      <button onClick={() => signIn("google")}>Sign in</button> */}
    </>
  )
}
