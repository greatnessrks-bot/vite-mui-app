import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      // Check if user is logged in
      const currentUser = localStorage.getItem("currentUser");
      const authToken = localStorage.getItem("authToken");
      
      if (!currentUser) {
        alert("⚠️ Please login to view this page");
        navigate("/login");
        return;
      }

      try {
        const headers = {
          "Content-Type": "application/json",
        };

        // Add token to headers if available
        if (authToken) {
          headers["Authorization"] = `Bearer ${authToken}`;
        }

        const response = await fetch(
          "https://students-learning-api.onrender.com/api/auth",
          {
            method: "GET",
            headers: headers,
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUsers(Array.isArray(data) ? data : []);
        } else {
          setError(data.message || "Failed to fetch users");
        }
      } catch (err) {
        setError("Network error. Please check your connection.");
        console.error("Fetch users error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  // Handle view user details
  const handleViewUser = (userId) => {
    navigate(`/users/${userId}`);
  };

  // Handle edit user
  const handleEditUser = (userId) => {
    navigate(`/users/edit/${userId}`);
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  // Close delete dialog
  const handleCloseDialog = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  // Confirm delete user
  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    try {
      const authToken = localStorage.getItem("authToken");
      const headers = {
        "Content-Type": "application/json",
      };

      if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`;
      }

      const response = await fetch(
        `https://students-learning-api.onrender.com/api/auth/${userToDelete._id}`,
        {
          method: "DELETE",
          headers: headers,
        }
      );

      if (response.ok) {
        // Remove user from state
        setUsers(users.filter((user) => user._id !== userToDelete._id));
        alert("✅ User deleted successfully!");
      } else {
        const data = await response.json();
        alert(`❌ Failed to delete user: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      alert("❌ Network error. Please try again.");
      console.error("Delete user error:", err);
    } finally {
      handleCloseDialog();
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("authToken");
    alert("✅ Logged out successfully!");
    navigate("/login");
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <Container sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 6 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5">Registered Users ({users.length})</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {users.length === 0 ? (
        <Typography align="center" sx={{ mt: 3 }}>
          No registered users yet.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2" }}>
                <TableCell sx={{ color: "white" }}>
                  <strong>First Name</strong>
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  <strong>Last Name</strong>
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  <strong>Email</strong>
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  <strong>Phone Number</strong>
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  <strong>Address</strong>
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  <strong>Role</strong>
                </TableCell>
                <TableCell sx={{ color: "white" }}>
                  <strong>Registered Date</strong>
                </TableCell>
                <TableCell sx={{ color: "white" }} align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} hover>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.address || "N/A"}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.isAdmin ? "Admin" : "User"}
                      color={user.isAdmin ? "error" : "primary"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => handleViewUser(user._id)}
                      >
                        View
                      </Button>
                      <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        onClick={() => handleEditUser(user._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteClick(user)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete user{" "}
            <strong>
              {userToDelete?.firstName} {userToDelete?.lastName}
            </strong>
            ? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}