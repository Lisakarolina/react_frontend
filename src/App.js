import './App.css';
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Route, Routes } from "react-router-dom";
import SingleAnimal from "./components/SingleAnimal";
import Overview from "./components/Overview";
import CreateAnimal from './components/CreateAnimal';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path=":id" element={<SingleAnimal />} />
      <Route path="/new" element={<CreateAnimal />} />
      <Route path="/sort/weight" element={<Overview />} />
    </Routes>
  );
}

export default App;