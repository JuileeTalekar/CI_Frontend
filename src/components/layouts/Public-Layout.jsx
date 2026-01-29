import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

export const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
    
    
  );
};