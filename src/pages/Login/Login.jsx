import * as React from "react";
import "./login.css";
import {
  Box,
  Button,
  Container,
  FormControl,
  Checkbox,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
  TextField,
  InputAdornment,
  Link,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ForgotPassword from "../../Component/ForgotPassword/ForgotPassword";

const theme = createTheme();

export default function Login(props) {
  const [forgotPass, setForgotPass] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [inpField, setInpField] = React.useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleForgot = () => {
    setForgotPass((prev) => !prev);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handelChange = (event, key) => {
    setInpField({ ...inpField, [key]: event.target.value });
  };

  const handelLogin = async () => {
    if (inpField.email.trim() === "" || inpField.password.trim() === "") {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      props.showLoader?.();

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        inpField,
        { withCredentials: true }
      );

      // Store in localStorage
      if (response.data && response.data.user && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("isLogin", true);
      } else {
        toast.error("Login response missing user data");
        return;
      }

      // Call any handler from props
      props.handelLogin?.(true);

      // Navigate based on role
      if (response.data.user.role === "student") {
        navigate(`/student/${response.data.user._id}`);
      } else {
        navigate("/admin/dashboard");
      }

      toast.success(response.data.message || "Login successful!");
    } catch (err) {
      const msg =
        err?.response?.data?.error || "Login failed. Please try again.";
      toast.error(msg);
    } finally {
      props.hideLoader?.();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handelLogin();
  };

  // Add this function to handle signup navigation
  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="login-page">
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              boxShadow: 3,
              borderRadius: 2,
              backgroundColor: "background.paper",
            }}
          >
            <Typography component="h1" variant="h5">
              <b>Login</b>
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                required
                fullWidth
                value={inpField.email}
                onChange={(e) => handelChange(e, "email")}
                label="Email"
                name="email"
                type="email"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />

              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  value={inpField.password}
                  name="password"
                  onChange={(e) => handelChange(e, "password")}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <FormControlLabel
                control={<Checkbox name="remember" color="primary" />}
                label="Remember me"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2, mb: 2 }}
              >
                Log In
              </Button>

              <Stack direction="row" justifyContent="space-between">
                {/* Fixed: Use onClick instead of href */}
                <Link 
                  onClick={handleSignupClick}
                  variant="body2"
                  sx={{ cursor: 'pointer' }}
                >
                  Sign up
                </Link>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={handleForgot}
                  variant="body2"
                >
                  Forgot password?
                </div>
              </Stack>
            </Box>
          </Box>
        </Container>

        {forgotPass && (
          <ForgotPassword
            onCancel={handleForgot}
            showLoader={props.showLoader}
            hideLoader={props.hideLoader}
          />
        )}
      </div>
    </ThemeProvider>
  );
}