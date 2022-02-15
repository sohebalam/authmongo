import { SessionProvider } from "next-auth/react"
import Layout from "../components/Layout"
import React from "react"
import PropTypes from "prop-types"
import Head from "next/head"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material//CssBaseline"
import theme from "../theme"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { wrapper } from "../redux/store"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  // const theme = createTheme()

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <SessionProvider session={session}>
          <Layout>
            <ToastContainer />
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
        <CssBaseline />
      </ThemeProvider>
    </React.Fragment>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}

export default wrapper.withRedux(MyApp)
