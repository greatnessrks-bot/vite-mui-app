import { useState } from "react"
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { Link } from "react-router-dom"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const toggleDrawer = (state) => () => setOpen(state)

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Login", path: "/login" },
    { title: "Sign Up", path: "/signup" },
    { title: "View Users", path: "/users", isSpecial: true },
  ]

  return (
    <>
      <AppBar position="static" color="primary" sx={{ mb: 3 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Vite Assignment
          </Typography>

          {/* Desktop links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navLinks.map((link, index) =>
              link.isSpecial ? (
                <Button
                  key={index}
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to={link.path}
                >
                  {link.title}
                </Button>
              ) : (
                <Button
                  key={index}
                  color="inherit"
                  component={Link}
                  to={link.path}
                >
                  {link.title}
                </Button>
              )
            )}
          </Box>

          {/* Mobile menu */}
          <IconButton
            edge="end"
            color="inherit"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, mt: 2 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {navLinks.map((link, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton component={Link} to={link.path}>
                  <ListItemText primary={link.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}
