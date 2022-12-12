import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

import { BACKEND_URL } from "../constant";
import axios from "axios";
import { notifySuccess, notifyError } from "../toast";
import { MobileOffRounded } from "@mui/icons-material";
import { ToastContainer } from "react-toastify";


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const [loading, setLoading] = React.useState(false);
  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [mobile, setMobile] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [rePassword, setRePassword] = React.useState(null);
  const [age, setAge] = React.useState(null);



  const validate = ()=>{
    if(!firstName){
      notifyError("Please enter first name");
      return false;
    }
    if(!mobile){
      notifyError("Please enter mobile number");
      return false
    }
    if(!email){
      notifyError("Please enter email");
      return false
    }
    if(!password){
      notifyError("Please enter password");
      return false
    }
    if(password!== rePassword){
      notifyError("Passwords do not match");
      return false
    }
    if(!age){
      notifyError("Please enter age");
      return false
    }
    return true;
    
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const cont = validate();
    if(!cont){
      return
    }
    const temp = {
      first_name: firstName,
      last_name: lastName,
      mobile: mobile,
      email: email,
      password: password,
      re_password: rePassword,
      age: age,
    };

    axios
      .post(BACKEND_URL + "register/", temp)
      .then((data) => {
        if (data?.data?.success) {
          const temp = data?.data?.data;
          sessionStorage.setItem("user_id", temp?.user_id);
          sessionStorage.setItem("first_name", temp?.first_name);
          sessionStorage.setItem("age", temp?.age);
          sessionStorage.setItem(
            "batch_details",
            JSON.stringify(temp?.batch_details)
          );
          sessionStorage.setItem("session_active", temp?.session_active);
          
          window.open("/", "_self");
          
        } else {
          console.log(data?.data?.message);
        }
      })
      .catch((err) => {
        console.log("SOme Error Occured");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <ToastContainer />
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/NTyBbu66_SI)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <SelfImprovementIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="number"
                    fullWidth
                    name="mobile"
                    label="Phone Number"
                    id="mobile"
                    onChange={(e) => {
                      setMobile(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirm-password"
                    label="Re Enter Password"
                    type="password"
                    id="confirm-password"
                    autoComplete="new-password"
                    onChange={(e) => {
                      setRePassword(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="number"
                    fullWidth
                    required
                    name="age"
                    label="age"
                    id="age"
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? (
                  <CircularProgress style={{ color: "white" }} />
                ) : (
                  <Typography>Sign Up</Typography>
                )}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
