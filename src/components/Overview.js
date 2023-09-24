import { useState, useEffect } from "react";
import { useNavigate, useLocation, Route, Routes } from "react-router-dom";
import SingleAnimal from "./SingleAnimal";
import { Table } from "reactstrap";

function Overview() {
    //const [hint, setHint] = useState(null);
    //setHint(useLocation().state);
    const {state} = useLocation();
    let hintState = state || null;
  const [allAnimals, setAllAnimals] = useState([]);
  const navigate = useNavigate();
  //const path = useLocation().pathname;
  const getData = async () => {
    try {
      async function fetchEntries() {
        const response = await fetch("http://127.0.0.1:8000/api/");
        const entries = await response.json();
        console.log("this is the response: ", entries);
        setAllAnimals(entries);
      }
      fetchEntries();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => getData, []);


  return (
    <div className="container">
        <div id="header"><h1>My Virtual Zoo</h1></div>
        <div>{hintState && (<div class="alert alert-success" role="alert">
  {`Entry has been ${hintState.hint}!`}
</div>)}</div>
        <table id="overview-table" class="table table-striped">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">name</th>
      <th scope="col">weight</th>
      <th scope="col">power</th>
      <th scope="col">extinction date</th>
    </tr>
  </thead>
  <tbody>
        {allAnimals.map((item, i) => (
            <tr onClick={() => {
                navigate(`${item.id}`, {
                //   state: { data: item },
                });
              }}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.weight}</td>
            <td>{item.power}</td>
            <td>{item.extinction_date ?? "-"}</td>
            </tr>
          ))}
  </tbody>
</table>
<button id="home-button" type="button" onClick={() => {navigate("/new")}}class="btn btn-primary btn-lg">Create New Entry</button>
    </div>
  )
}

export default Overview;