import { Outlet } from "react-router-dom";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";

const RootLayout = () => {
  return (
    <div className="root-layout">
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
