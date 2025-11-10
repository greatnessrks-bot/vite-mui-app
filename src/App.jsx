import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";  // renamed from Register
import Users from "./pages/Users";
import Navbar from "./components/Navbar";
import ViewUsers from "./pages/UserDetails";
import UpdateUser from "./pages/UpdateUser";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />  {/* updated path */}
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<ViewUsers />} />
        <Route path="/users/edit/:id" element={<UpdateUser />} />
      </Routes>
    </>
  );
}

export default App;
