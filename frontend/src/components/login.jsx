import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

export default function Login() {
  const default_form = {email:'',password:'',username:''};
  const [formdata, setFormData] = useState(default_form);
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/create-user", formdata)
      .then((res) => {
        navigate('/');
        setFormData(default_form);
      })
      .catch(err=>console.log(err));
  };
  const handleOnChange = (e, field)=>{
    setFormData(form=>({...form, [field]:e.target.value}))
  }
  return (
    <>
      <h1 className="text-center mt-8">Sign In</h1>
      <div className="mt-4 flex flex-col items-center justify-center gap-4">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            onChange={(e) => handleOnChange(e,'username')}
            value={formdata.username}
            placeholder="user name"
            type="text"
          />
          <input
            onChange={(e) => handleOnChange(e,'email')}
            value={formdata.email}
            placeholder="email"
            type="text"
          />
          <input
            onChange={(e) => handleOnChange(e,'password')}
            value={formdata.password}
            placeholder="password"
            type="password"
          />
          <button type="submit" className="btn">
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}
