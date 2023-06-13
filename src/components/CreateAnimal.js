import { useState, useEffect } from "react";
import { useNavigate, useLocation, Route, Routes } from "react-router-dom";
import { Form } from "reactstrap";

function CreateAnimal() {
  const [data, setData] = useState({
    name: "",
    weight: "",
    power: "",
    extinction_date: "",
    dateInfo: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  //const path = useLocation().pathname;
  const postData = async (e) => {
    try {
      async function postData(e) {
        e.preventDefault();
        // prepare the data of the new animal
        data.weight = Number(
          parseFloat(data.weight.replace(",", ".")).toFixed(3)
        );
        if (data.extinction_date !== "") {
          if (data.dateInfo !== "" && data.dateInfo !== "DEFAULT") {
            data.extinction_date =
              data.dateInfo === "bc"
                ? parseInt(data.extinction_date) * -1
                : parseInt(data.extinction_date);
          } else {
            data.extinction_date = parseInt(data.extinction_date);
          }
        }
        const response = await fetch("http://127.0.0.1:8000/api/new", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (response.status === 200) {
          navigate("/", {
            state: { hint: "created" },
          });
        } else {
            response.json().then((response) => setError(response));
        }

        console.log(response);
      }
      postData(e);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    console.log("changed!", e);
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
    console.log("new data", data);
  };

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
      <form id="createForm">
        <div className="form-group">
          <label htmlFor="name">Name of Animal</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight</label>
          <input
            type="text"
            className="form-control"
            id="weight"
            placeholder="Enter (approximate) weight in Kg"
            name="weight"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="super-power">Super Power</label>
          <textarea
            className="form-control"
            id="super-power"
            rows="3"
            name="power"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="extDate">Died out in Year</label>
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              id="extDate"
              placeholder="Extinction Date"
              name="extinctionDate"
              onChange={handleChange}
            ></input>
          </div>
          <div className="col-md-8">
            <select
              className=""
              id="inlineFormCustomSelect"
              name="dateInfo"
              onChange={handleChange}
            >
              <option value="DEFAULT">Choose...</option>
              <option value="bc">BC</option>
              <option value="ad">AD</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" onClick={postData}>
          Create
        </button>
      </form>
      <div>
        {/* {error &&
          Object.keys(error).map(function (item, index) {
            return error[item].map((data) => (
              <div class="alert alert-danger" role="alert">
                {`${item}: ${data}`}
              </div>
            ));
          })} */}
      </div>
    </div>
  );
}

export default CreateAnimal;