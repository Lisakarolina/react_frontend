//import React, { useEffect, useState } from 'react';
import './App.css';
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Route, Routes } from "react-router-dom";
//import EntryCard from "./components/EntryCard";
import SingleAnimal from "./components/SingleAnimal";
import Overview from "./components/Overview";
import CreateAnimal from './components/CreateAnimal';
//import Posts from './components/Posts';

// function App() {
// 	const [allAnimals, setAllAnimals] = useState(null);

// 	useEffect(() => {
// 		const apiUrl = `http://127.0.0.1:8000/api/`;
// 		fetch(apiUrl)
// 			.then((data) => data.json())
// 			.then((animals) => {
// 				setAllAnimals(animals);
// 			});
// 	}, []);
// 	return (
// 		<div className="App">
// 			<h1>Latest Animals</h1>
// 			<div>
//         {this.state.allAnimals.map(item => {
//           return <h3>item</h3>
//         })}
//       </div>
// 		</div>
// 	);
// }



function App() {
  // const [entries, setEntries] = useState([]);
  // const navigate = useNavigate();
  // const path = useLocation().pathname;
  // //const path2 = "haha";
  // const getData = async () => {
  //   try {
  //     async function fetchEntries() {
  //       const response = await fetch("http://localhost:8000/api/entries");
  //       const blogEntries = await response.json();
  //       console.log("this is the response: ", blogEntries);
  //       setEntries(blogEntries);
  //     }
  //     fetchEntries();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  //
  // useEffect(() => getData, []);

  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path=":id" element={<SingleAnimal />} />
      <Route path="/new" element={<CreateAnimal />} />
    </Routes>
  );
}

export default App;