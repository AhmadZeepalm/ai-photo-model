import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Model from "./Model/Model";
import Navbar from "../../Components/Navbar/Navbar";
import Credits from "./Credits/Credits";
import ShowcaseModel from "../../Components/ShowcaseModel/ShowcaseModel";
export default function index() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<ShowcaseModel />} />
        <Route path="/photo-maker" element={<Model />} />
        <Route path="/credits" element={<Credits />} />
      </Routes>
    </>
  );
}
