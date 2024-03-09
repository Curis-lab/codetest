import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./components/home";
import CreatePostForm from "./components/category-post-form";
import Login from "./components/login";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home/>}></Route>
            <Route path="create-post" element={<CreatePostForm/>}></Route>
            <Route path="sign-in" element={<Login/>}></Route>
            <Route path="*" element={<h2>Not found page</h2>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
