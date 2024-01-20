import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Overview() {
    const {state} = useLocation();
    let hintState = state || null;
  const [allAnimals, setAllAnimals] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    const getData = async () => {
    try {
      async function fetchEntries() {
        const response = await fetch("http://127.0.0.1/api/");
        const entries = await response.json();
        setAllAnimals(entries);
      }
      fetchEntries();
    } catch (err) {
      console.error(err);
    };
    
  };
  getData();
}, []);


  return (
    <div className="container">
        <div id="header"><h1>My Virtual Zoo</h1></div>
        <div>{hintState && (<div class="alert alert-success alert-dismissible fade show" role="alert">
        {`Entry has been ${hintState.hint}!`}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button> 
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
                navigate(`${item.id}`);
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