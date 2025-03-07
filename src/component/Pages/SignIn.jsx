import {
    TextField,
    Button,
    Box,
    Typography,
    InputAdornment,
    IconButton,
    FormControlLabel,
    Checkbox,
    Container,
    Paper,
} from "@mui/material";
import React, { useContext, useState, useReducer, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { staysContext } from "../AppContext/TentsContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import Login from '../../assets/Register/login.jpg';
import Login1 from '../../assets/About/about3.jpg';

const initialState = {
    email: localStorage.getItem("rememberEmail") || "",
    password: localStorage.getItem("rememberPassword") || "",
    users: [],
    isLoggedIn: false,
    isAdmin: false,
    error: "",
    rememberMe: localStorage.getItem("rememberEmail") ? true : false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value };
        case "SET_USERS":
            return { ...state, users: action.value };
        case "LOGIN_SUCCESS":
            return { ...state, isLoggedIn: true, error: "" };
        case "LOGIN_FAILURE":
            return { ...state, error: action.error };
        case "SET_ADMIN":
            return { ...state, isAdmin: action.value };
        case "SET_REMEMBER_ME":
            return { ...state, rememberMe: action.value };
        default:
            return state;
    }
};

const SignIn = () => {
    const { setUserDetails, admin, setIsLoggedIn, setIsAdminLoggedIn } = useContext(staysContext);
    const [showPassword, setShowPassword] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/users")
            .then(response => {
                dispatch({ type: "SET_USERS", value: response.data });
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    }, []);

    const handleChange = (e) => {
        dispatch({ type: "SET_FIELD", field: e.target.name, value: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, users, rememberMe } = state;

        if (!email || !password) {
            dispatch({ type: "LOGIN_FAILURE", error: "Please fill in all fields." });
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            dispatch({ type: "LOGIN_FAILURE", error: "Please enter a valid email address." });
            return;
        }

        if (password.length < 6) {
            dispatch({ type: "LOGIN_FAILURE", error: "Password must be at least 6 characters." });
            return;
        }

        const user = users.find((u) => u.email === email && u.password === password);
        const adminUser = admin.find((a) => a.email === email && a.password === password);

        if (user || adminUser) {
            dispatch({ type: "LOGIN_SUCCESS" });
            toast.success(`${adminUser ? "Admin" : "User"} login successful!`, { duration: 2000 });

            if (rememberMe) {
                localStorage.setItem("rememberEmail", email);
                localStorage.setItem("rememberPassword", password);
            } else {
                localStorage.removeItem("rememberEmail");
                localStorage.removeItem("rememberPassword");
            }

            if (adminUser) {
                dispatch({ type: "SET_ADMIN", value: true });
                setIsAdminLoggedIn(true);
                setUserDetails({ email, password, adminUser });
                navigate("/admin-dash");
            } else {
                setIsLoggedIn(true);
                setUserDetails({ email, password, user });
                navigate("/");
            }
        } else {
            dispatch({ type: "LOGIN_FAILURE", error: "Invalid username or password." });
        }
    };

    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${Login})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Left Section - Form */}
            <Paper
                sx={{
                    width: { xs: "90%", sm: "80%", md: "90%" },
                    maxWidth: 1000,
                    display: "flex",
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: 8,
                }}
            >
                <Box
                    sx={{
                        width: { xs: "100%", md: "50%" },
                        p: { xs: 3, sm: 4, md: 5 },
                        bgcolor: "white",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="h4" sx={{ textAlign: "center", mb: 2, fontWeight: "bold" }}>
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: "center", mb: 3 }}>
                        Please sign in to continue
                    </Typography>
                    {state.error && (
                        <Typography sx={{ color: "red", textAlign: "center", mb: 2 }}>
                            {state.error}
                        </Typography>
                    )}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={handleChange}
                            value={state.email}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={handleChange}
                            value={state.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={state.rememberMe}
                                        onChange={(e) => dispatch({ type: "SET_REMEMBER_ME", value: e.target.checked })}
                                    />
                                }
                                label="Remember Me"
                            />
                            <Typography variant="body2">
                                <Link to="/forgot-password" style={{ textDecoration: "none", color: "#1976d2" }}>
                                    Forgot Password?
                                </Link>
                            </Typography>
                        </Box>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                bgcolor: "#464646",
                                color: "white",
                                p: 1.5,
                                "&:hover": { bgcolor: "#202020" },
                            }}
                        >
                            Sign In
                        </Button>
                        <Typography sx={{ textAlign: "center", mt: 2 }}>
                            Don't have an account? <Link to="/register">Sign Up</Link>
                        </Typography>
                    </form>
                </Box>

                {/* Right Section - Image */}
                <Box
                    sx={{
                        display: { xs: "none", md: "block" },
                        width: "50%",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <Box
                        component="img"
                        src={Login1}
                        alt="Login Background"
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            textAlign: "center",
                            p: 4,
                        }}
                    >
                        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                            Discover Your Perfect Stay
                        </Typography>
                        <Typography variant="body1">
                            Join us to explore unique accommodations and create unforgettable memories.
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default SignIn;