import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Common/Navbar";
import Footer from "../Pages/Common/Footer";

const MainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar/>
      
      <Outlet />
      {/* <Footer/> */}
    </div>
  );
};

export default MainLayout;
