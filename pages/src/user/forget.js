import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

const theme = createTheme()

export default function SignIn() {
  const router = useRouter()
  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console

    try {
      const email = result.get("email")

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.post(`/api/user/forget`, { email }, config)
      toast.success(data.message)
      router.push("/login")
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  return (
    <ThemeProvider>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <ForwardToInboxIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Email Reset Link
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "secondary.main" }}
              >
                Submit
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/src/user/login" variant="body2">
                    Have an account ? Login
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/src/user/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
