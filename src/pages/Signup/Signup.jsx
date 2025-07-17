import * as React from "react";
import "./signup.css";
import {
  Box,
  Button,
  Container,
  FormControl,
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
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import NumbersIcon from "@mui/icons-material/Numbers";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const theme = createTheme();

export default function Signup(props) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [inpField, setInpField] = React.useState({
    email: "",
    password: "",
    name: "",
    roll: "",
  });

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handelChange = (event, key) => {
    setInpField({ ...inpField, [key]: event.target.value });
  };

  const handelRegister = async () => {
    if (
      inpField.name.trim() === "" ||
      inpField.password.trim() === "" ||
      inpField.email.trim() === "" ||
      inpField.roll.trim() === ""
    ) {
      return toast.error("Invalid Credentials");
    }

    if (inpField.name.length < 4)
      return toast.error("Name should be greater than 3 Characters");

    if (inpField.password.length < 4)
      return toast.error("Password should be greater than 3 Characters");

    props.showLoader?.();

    try {
      const res = await axios.post(
        "http://localhost:4000/api/auth/register",
        inpField,
        { validateStatus: () => true }  
      );

      
      if (res.status === 201 || res.status === 200) {
        toast.success(res.data?.message || "User registered successfully");
        setInpField({ name: "", email: "", password: "", roll: "" });
        navigate("/login");
      } else {
        toast.error(res.data?.error || "Registration failed. Try again.");
      }

    } catch (err) {
      console.error("Register error:", err);
      toast.error(err?.response?.data?.error || "Registration failed");
    } finally {
      props.hideLoader?.();
    }
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
            <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
              <b>Register</b>
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                required
                fullWidth
                label="Name"
                value={inpField.name}
                onChange={(e) => handelChange(e, "name")}
                name="name"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AssignmentIndIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                fullWidth
                label="Email"
                value={inpField.email}
                onChange={(e) => handelChange(e, "email")}
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
              <TextField
                required
                fullWidth
                label="Roll No"
                value={inpField.roll}
                onChange={(e) => handelChange(e, "roll")}
                name="roll"
                type="text"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <NumbersIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  value={inpField.password}
                  onChange={(e) => handelChange(e, "password")}
                  name="password"
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
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handelRegister}
                sx={{ mt: 2, mb: 2 }}
              >
                Register
              </Button>
              <Stack direction="row" justifyContent="space-between">
                <Link href="/login" variant="body2">
                  Already have an account? Login
                </Link>
              </Stack>
            </Box>
          </Box>
        </Container>
       
      </div>
    </ThemeProvider>
  );
}
