import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

// import Navbar from "./navbar";

const Layout = () => {
  return (
    <div className="lg:max-w-[900px] lg:px-16 mx-auto py-8 shadow-xl flex flex-col px-8">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
