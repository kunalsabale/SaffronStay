"use client"

import {
  AppBar,
  Box,
  Button,
  Menu,
  MenuItem,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  Badge,
} from "@mui/material"
import { Link, NavLink, useNavigate } from "react-router-dom"
import MenuIcon from "@mui/icons-material/Menu"
import { FaUser } from "react-icons/fa"
import { MdPerson, MdLogout } from "react-icons/md"
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"
import BookmarkBorderOutlined from "@mui/icons-material/BookmarkBorderOutlined"
import Logo from "../../assets/HomePage/s.png"
import { useContext, useEffect, useState } from "react"
import { staysContext } from "../AppContext/TentsContext"
import axios from "axios"

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, userDetails, setUserDetails, addBookmark, setAddBookmark, addCart, setAddCart } =
    useContext(staysContext)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:5000/bookmark")
      .then((resp) => setAddBookmark(resp.data))
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    axios
      .get("http://localhost:5000/cart")
      .then((resp) => setAddCart(resp.data))
      .catch((error) => console.log(error))
  }, [addCart])

  const bookmarkCount = addBookmark.length
  const cartCount = addCart.length

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserDetails({ email: "", password: "" })
    navigate("/") // Redirect to home page
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Tours", to: "/stays" },
    { label: "About Us", to: "/aboutus" },
    { label: "Contact", to: "/contactus" },
  ]

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
      <Typography variant="h6" sx={{ p: 2, fontWeight: "bold", color: "primary.main" }}>
        SaffronStays
      </Typography>
      <List>
        {navLinks.map((link) => (
          <ListItem button key={link.to} component={Link} to={link.to}>
            <ListItemText primary={link.label} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2 }}>
        {isLoggedIn ? (
          <Button variant="outlined" onClick={handleLogout} fullWidth sx={{ mb: 2 }}>
            Logout
          </Button>
        ) : (
          <Button variant="contained" component={Link} to="/login" fullWidth sx={{ mb: 2 }}>
            Login
          </Button>
        )}
      </Box>
    </Box>
  )

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "white", color: "black", boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Hamburger Menu for Mobile */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: "block", sm: "none" }, mr: 2 }}
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>

        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link to="/">
            <img src={Logo || "/placeholder.svg"} alt="logo" style={{ width: "150px", height: "40px" }} />
          </Link>
        </Box>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 4 }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                color: isActive ? "#1976d2" : "black",
                textDecoration: "none",
                fontWeight: isActive ? "bold" : "normal",
                "&:hover": { color: "#1976d2" },
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </Box>

        {/* Icons and User Menu */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Cart */}
          <IconButton component={Link} to="/cart" sx={{ color: "black" }}>
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingBagIcon />
            </Badge>
          </IconButton>

          {/* Bookmark */}
          <IconButton component={Link} to="/bookmark" sx={{ color: "black" }}>
            <Badge badgeContent={bookmarkCount} color="primary">
              <BookmarkBorderOutlined />
            </Badge>
          </IconButton>

          {/* User Dropdown */}
          {isLoggedIn ? (
            <Box>
              <Button
                onClick={handleClick}
                variant="contained"
                sx={{
                  backgroundColor: "white",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  textTransform: "none",
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                <MdPerson />
                {userDetails?.username || userDetails?.email?.split("@")[0] || "User"}
              </Button>

              {/* Dropdown Menu */}
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    boxShadow: 3,
                    borderRadius: "8px",
                    minWidth: "150px",
                  },
                }}
              >
                {/* My Profile */}
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/userprofile"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <MdPerson size={20} />
                  My Profile
                </MenuItem>

                {/* Booking History */}
                <MenuItem
                  onClick={handleClose}
                  component={Link}
                  to="/bookinghistory"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <ShoppingBagIcon />
                  Booking History
                </MenuItem>

                {/* Logout */}
                <MenuItem
                  onClick={() => {
                    handleClose()
                    handleLogout()
                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "red",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <MdLogout size={20} />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              variant="contained"
              component={Link}
              to="/login"
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 1,
                backgroundColor: "white",
                color: "black",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              <FaUser />
              Login
            </Button>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}>
        {drawer}
      </Drawer>
    </AppBar>
  )
}

export default Navbar

