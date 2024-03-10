import { Link } from "react-router-dom";

import add from "../assets/add.svg";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const [auth, setAuth] = useState(false);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8080/")
      .then((res) => {
        if (res.data.status === "success") {
          setAuth(true);
        } else {
          setAuth(false);
        }
      })
      .catch((err) => console.log("Error in setAth"));
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:8080/logout")
      .then((res) => {
        if (res.data.status === "success") {
          setAuth(false);
        } else {
          setAuth(true);
        }
      })
      .catch((err) => console.log("logout error"));
  };
  return (
    <div className="flex justify-between pb-4 border-b mb-4">
      <div className="">
        <Link to={"/"}>
          <h1 className="text-dark text-4xl font-bold tracking-tighter">
            Tech News
          </h1>
        </Link>
        <p className="text-sm">
          Exploring tomorrow&apos;s Invotions&#39;
          <br /> One Byte at a Time.
        </p>
      </div>
      <div className="flex items-center">
        {auth ? (
          <>
            <Link className="flex gap-2 m-2 cursor-pointer" to="/create-post">
              <span>
                <img src={add} alt="add" width={25} height={25} />
              </span>
              create Page
            </Link>
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link className="btn" to="/sign-in">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
