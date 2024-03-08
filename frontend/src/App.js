import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./components/home";
// import Layout from "./components/layout";
// import Home from './home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home/>}></Route>
            <Route path="folder" element={<h2>FileCAll</h2>}></Route>
            <Route path="*" element={<h2>Not found page</h2>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;