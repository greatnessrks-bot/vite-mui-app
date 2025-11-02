import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static" color="primary" sx={{ mb: 3 }}>
      <Toolbar>
        {/* Brand / Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Vite Assignment
        </Typography>

        {/* Navigation Buttons */}
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Sign Up
          </Button>

          {/* Special Users Button */}
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/users"
            sx={{ ml: 2 }}
          >
            View Users
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}