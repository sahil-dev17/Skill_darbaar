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
import AddCourse from "./components/admin/AddCourse";
import CourseEnquiry from "./components/admin/CourseEnquiry";
import QrPage from "./pages/QrPage";
import PaymentDetails from "./components/admin/PaymentDetails";
import Settings from "./components/admin/Settings";
const AppLayout = () => {
  const location = useLocation();

  // Hide navbar & footer on admin login page
  // const hideLayout = location.pathname === "/admin/login";
  // const hideLay = location.pathname === "/dashboard";

   const hideLayout =
    location.pathname === "/admin/login" ||
    location.pathname.startsWith("/dashboard");

  return (
    <>
      {!hideLayout && <Navbar />}
      {/* {!hideLay && <Dashboard />} */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses/>} />
            <Route path="/course/:slug" element={<CourseDetails />} />
            <Route path="/enquiry/:slug" element={<EnquiryPage />} />
            <Route path="/qr/:slug" element={<QrPage />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/admin/login" element={<AdminLogin />} />
       <Route path="/dashboard" element={<Dashboard />}>
  <Route path="add-course" element={<AddCourse />} />
  <Route path="enquiry" element={<CourseEnquiry />} />
  <Route path="payment" element={<PaymentDetails />} />
  <Route path="settings" element={<Settings />} />
</Route>
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
