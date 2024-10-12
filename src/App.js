import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddProject from "./components/AddProject";
import Header from "./components/Header";
import Home from "./pages/Home";
import EditProject from "./components/EditProject";
import PaymentData from "./components/PaymentData";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addproject" element={<AddProject />} />
        <Route path="/editproject/:index" element={<EditProject />} />
        <Route path="/paymentdata" element={<PaymentData />} />
      </Routes>
    </>
  );
}

export default App;
