import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import EnquiryPage from "./pages/EnquiryPage";
import ScrollToTop from "./components/ScrollToTop";

const AppLayout = () => {
  const location = useLocation();

  // Hide navbar & footer on admin login page
  const hideLayout = location.pathname === "/admin/login";

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses/>} />
            <Route path="/course/:slug" element={<CourseDetails />} />
            <Route path="/enquiry/:slug" element={<EnquiryPage />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
     <ScrollToTop />
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;
