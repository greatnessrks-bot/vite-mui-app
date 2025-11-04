import { useState, useEffect } from "react";
import { Box, Paper, Typography, Button, CircularProgress, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"; 

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://students-learning-api.onrender.com/api/auth/${id}`
        );
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch user details");
        setLoading(false);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">User Not Found</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold">
          User Details
        </Typography>

        <Typography sx={{ mb: 1 }}>
          <b>ID:</b> {user._id}
        </Typography>
        <Typography sx={{ mb: 1 }}>
          <b>Name:</b> {user.firstName} {user.lastName}
        </Typography>
        <Typography sx={{ mb: 1 }}>
          <b>Email:</b> {user.email}
        </Typography>
        <Typography sx={{ mb: 1 }}>
          <b>Phone:</b> {user.phoneNumber}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <b>Address:</b> {user.address || "N/A"}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <b>Role:</b> {user.isAdmin ? "Admin" : "User"}
        </Typography>

        <Button variant="contained" fullWidth onClick={() => navigate(-1)}>
          Back
        </Button>
      </Paper>
    </Box>
  );
};

export default UserDetails;