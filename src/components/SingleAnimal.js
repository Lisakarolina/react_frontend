import { useState, useEffect } from "react";
import {
  useNavigate,
  useLocation,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { Form } from "reactstrap";

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
      const response = await fetch(`http://127.0.0.1:8000/api/${data.id}/`, {
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
        //console.log(response.json())
      }
      //console.log('after put', response);
      //setData(response.json())
    }
    try {
      updateData(e);
    } catch (err) {
      //console.error(err);
      //setError(err.response.data.message)
    }
  };

  const deleteEntry = async (e) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/${data.id}/`, {
        method: "DELETE",
      });
      navigate("/", {
        state: { hint: "deleted" },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getData = async () => {
    try {
      async function fetchAnimalEntry() {
        const response = await fetch(`http://127.0.0.1:8000/api/${id}`);
        const animalEntry = await response.json();
        // make sure a null value is displayed correctly in the form
        //animalEntry.extinction_date = animalEntry.extinction_date || '';
        console.log("this is the first fetched response: ", animalEntry);
        setData(animalEntry);
      }
      fetchAnimalEntry();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => getData, []);

  const handleChange = (e) => {
    //console.log('changed!', e);
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
    //e.target.value = data[e.target.name];
    console.log("new data", data);
  };

  function calculateExtinctionDate(date, dateInfo) {
    if (date !== "") {
      if (dateInfo !== "" && dateInfo !== "DEFAULT") {
        date = dateInfo === "bc" ? parseInt(date) * -1 : parseInt(date);
      } else {
        date = parseInt(date);
      }
    }
    console.log('date',date)
    return date;
  }

  //useEffect(() => postData, []);

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
        <div className="col-auto my-1">
          <label className="mr-sm-2" for="extDate">
            Died out in Year
          </label>
          <input
            type="text"
            class="form-control"
            id="extDate"
            value={data.extinction_date}
            placeholder="Extinction Date"
            name="extinction_date"
            onChange={handleChange}
          ></input>
          <select
            className="custom-select mr-sm-2"
            id="inlineFormCustomSelect"
            name="dateInfo"
            value={data?.extinction_date < 0 ? "bc" : "ad"}
            onChange={handleChange}
          >
            <option selected>Choose...</option>
            <option value="bc">BC</option>
            <option value="ad">AD</option>
          </select>
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
      <button
        type="submit"
        className="btn btn-primary"
        onClick={postEditedData}
      >
        Edit
      </button>
      <button type="submit" className="btn btn-primary" onClick={deleteEntry}>
        Delete
      </button>
    </div>
  );
}

export default SingleAnimal;
