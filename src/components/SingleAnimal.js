import { useState, useEffect } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

function SingleAnimal() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const postEditedData = async (e) => {
    async function updateData(e) {
      e.preventDefault();
      // prepare the data of the new animal
      let correctWeight = Number(
        parseFloat(data.weight.replace(",", ".")).toFixed(3)
      );
      let correctExtinctionDate = calculateExtinctionDate(
        data.extinction_date,
        data.dateInfo
      );
      setData((data) => ({
        ...data,
        extinction_date: correctExtinctionDate,
        weight: correctWeight,
      }));
      console.log("data ready ?", data);
      const response = await fetch(`http://127.0.0.1/api/${data.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        navigate("/", {
          state: { hint: "edited" },
        });
      } else {
        response.json().then((response) => setError(response));
      }
    }
    try {
      updateData(e);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteEntry = async (e) => {
    try {
      const response = await fetch(`http://127.0.0.1/api/${data.id}/`, {
        method: "DELETE",
      });
      navigate("/", {
        state: { hint: "deleted" },
      });
    } catch (err) {
      console.error(err);
      alert('An error occurred whith deleting the data.');
    }
  };

  useEffect(() => {
    const getData = async () => {
    try {
      async function fetchAnimalEntry() {
        const response = await fetch(`http://127.0.0.1/api/${id}`);
        const animalEntry = await response.json();
        setData(animalEntry);
      }
      fetchAnimalEntry();
    } catch (err) {
      console.error(err);
      alert('An error occurred while fetching the data.')
    }
  };
  getData();
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleDateInfoChange = (e) => {
    // make sure ac/bc date format is translated to regular integers
    let multiplier = 1;
    if((e.target.value) === "bc") {
      multiplier = -1;
    }
    
    setData((data) => ({
      ...data,
      extinction_date: Math.abs(data.extinction_date) * multiplier,
    }));
  };

  function calculateExtinctionDate(date, dateInfo) {
    if (date !== "") {
      if (dateInfo !== "" && dateInfo !== "DEFAULT") {
        return dateInfo === "bc" ? parseInt(date) * -1 : parseInt(date);
      }
      return parseInt(date);
    }
    return null;
  }

  return (
    <div>
      <button
        id="home-button"
        type="button"
        onClick={() => {
          navigate("/");
        }}
        class="btn btn-primary btn-lg"
      >
        Back to Table
      </button>
      <form id="detailForm">
        <div className="form-group">
          <label for="name">Name of Animal</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label for="weight">Weight</label>
          <input
            type="text"
            class="form-control"
            id="weight"
            value={data.weight}
            placeholder="Enter (approximate) weight in Kg"
            name="weight"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label for="super-power">Super Power</label>
          <textarea
            class="form-control"
            id="super-power"
            rows="3"
            name="power"
            value={data.power}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="extDate">Died out in Year</label>
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              id="extDate"
              placeholder="Extinction Date"
              name="extinction_date"
              onChange={handleChange}
              value={(data.extinction_date === null  || data.extinction_date === "") ? "" : Math.abs(data.extinction_date)}
            ></input>
          </div>
          <div className="col-md-4">
            <select
              className=""
              id="inlineFormCustomSelect"
              name="dateInfo"
              onChange={handleDateInfoChange}
              value={data.extinction_date < 0 ? "bc" : "ad"}
            >
              <option value="DEFAULT">Choose...</option>
              <option value="bc">BC</option>
              <option value="ad">AD</option>
            </select>
          </div>
        </div>
      </form>
      <div>
        {error &&
          Object.keys(error).map(function (item, index) {
            return error[item].map((data) => (
              <div class="alert alert-danger" role="alert">
                {`${item}: ${data}`}
              </div>
            ));
          })}
      </div>
      <div id="button-panel">
      <button
        type="submit"
        className="btn btn-primary"
        onClick={postEditedData}
      >
        Edit
      </button>
      <button type="submit" className="btn btn-primary" onClick={deleteEntry}>
        Delete
      </button></div>
    </div>
  );
}

export default SingleAnimal;
