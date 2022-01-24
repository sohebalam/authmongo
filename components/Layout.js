import { Container } from "@mui/material"
import Header from "./Header"
const Layout = ({ children }) => {
  return (
    <>
      <Container>
        <Header />
        {children}
      </Container>
    </>
  )
}

export default Layout
