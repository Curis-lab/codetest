import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

// import Navbar from "./navbar";

const Layout = () => {
  return (
    <div>
      <h1>Hello</h1>
      <Outlet />
    </div>
  );
};

export default Layout;
