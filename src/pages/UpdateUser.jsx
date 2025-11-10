import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  // Get the user ID from the URL (e.g., /users/edit/12345)
  const { id } = useParams();
  const navigate = useNavigate();

  // State to store form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  // State for loading, success, and error messages
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info"); // 'success', 'error', 'info'

  // STEP 1: Fetch the user's current data when page loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://students-learning-api.onrender.com/api/auth/update/${id}`
        );
        
        // Pre-fill the form with existing user data
        setFormData({
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          email: response.data.email || "",
          phoneNumber: response.data.phoneNumber || "",
          address: response.data.address || "",
        });
        
        setLoading(false);
      } catch (err) {
        // setMessage("Failed to load user data");
        setMessageType("error");
        setLoading(false);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  // STEP 2: Handle input changes
  // This function runs every time you type in any field
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update only the field that changed
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // STEP 3: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setUpdating(true);
    setMessage("");

    try {
      const authToken = localStorage.getItem("authToken");
      
      // Send PUT request to update user
      const response = await axios.put(
        `https://students-learning-api.onrender.com/api/auth/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        setMessage("User updated successfully!");
        setMessageType("success");
        
        // Wait 2 seconds then go back to users list
        setTimeout(() => {
          navigate("/users");
        }, 2000);
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to update user. Please try again."
      );
      setMessageType("error");
    } finally {
      setUpdating(false);
    }
  };

  // STEP 4: Handle cancel button
  const handleCancel = () => {
    navigate("/users"); // Go back to users list
  };

  // Show loading spinner while fetching user data
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
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Update User
        </Typography>

        {/* Show success or error message */}
        {message && (
          <Alert severity={messageType} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
          
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={updating}
          >
            {updating ? "Updating..." : "Update"}
          </Button>

          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
            onClick={handleCancel}
            disabled={updating}
          >
            Cancel
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default UpdateUser;