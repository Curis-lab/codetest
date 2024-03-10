import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {

  //implement login
  
  const [isLogin, setIsLogin] = useState(true);
  const default_reg = { email: "", password: "", username: "" };
  const default_login = { email: "", password: "" };
  const [formdata, setFormData] = useState(
    isLogin ? default_login : default_reg
  );

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      axios
        .post("http://localhost:8080/login", formdata)
        .then((res) => {
          navigate("/");
          setFormData(default_login);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:8080/registration", formdata)
        .then((res) => {
          navigate("/");
          setFormData(default_reg);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleOnChange = (e, field) => {
    setFormData((form) => ({ ...form, [field]: e.target.value }));
  };

  return (
    <>
      <h1 className="text-center mt-8">{isLogin? 'Login':'Sign In'}</h1>
      <div className="mt-4 flex flex-col items-center justify-center gap-4">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          {isLogin ? (
            <></>
          ) : (
            <>
              <input
                onChange={(e) => handleOnChange(e, "username")}
                value={formdata.username}
                placeholder="user name"
                type="text"
              />
            </>
          )}
          <input
            onChange={(e) => handleOnChange(e, "email")}
            value={formdata.email}
            placeholder="email"
            type="text"
          />
          <input
            onChange={(e) => handleOnChange(e, "password")}
            value={formdata.password}
            placeholder="password"
            type="password"
          />
          <button type="submit" className="btn">
            {isLogin? 'Login':'Sign in'}
          </button>
        </form>
        <p className="text-sm text-gray-500">Are you agree with our team and policy</p>
        <button className="btn" onClick={()=>setIsLogin(e=>!e)}>{isLogin?'Create an account':'Login'}</button>
      </div>
    </>
  );
}
