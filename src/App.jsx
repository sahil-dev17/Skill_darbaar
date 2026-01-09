import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

const AppLayout = () => {
  const location = useLocation();

  // Hide navbar on admin login page
  const hideNavbar = location.pathname === "/admin/login";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;
