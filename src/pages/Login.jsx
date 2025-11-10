import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Store the token and user data
        if (data.token) {
          localStorage.setItem("authToken", data.token);
        }
        localStorage.setItem("currentUser", JSON.stringify(data.user || data));
        
        console.log("User Logged In:", data);
        
        // Redirect to users page
        navigate("/users");
      } else {
        setError(data.message || "❌ Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError("❌ Network error. Please check your connection and try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Welcome Back
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={credentials.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            disabled={loading}
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={credentials.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    disabled={loading}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>

          <Button
            variant="text"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => navigate("/signup")}
            disabled={loading}
          >
            Don't have an account? Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}