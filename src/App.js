import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddProject from "./components/AddProject";
import Header from "./components/Header";
import Home from "./pages/Home";
import EditProject from "./components/EditProject";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addproject" element={<AddProject />} />
        <Route path="/editproject/:index" element={<EditProject />} />
      </Routes>
    </>
  );
}

export default App;
