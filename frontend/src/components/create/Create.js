import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    contacts: "",
  });
  const { name, email, contacts } = values;
  const navigate = useNavigate();
  const handleInput = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !contacts) {
      alert("Please Fill All the given rows");
    } else {
      await axios
        .post("http://localhost:5000/api/create", values)
        .then((resp) => {
          navigate("/");
          alert("Record inserted successfull");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="containers">
        <div className="con-form">
          <form action="" method="post" onSubmit={handleSubmit}>
            <h3>Add Students</h3>
            <div class="mb-3">
              <label for="exampleInputName" class="form-label">
                Enter Name
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputName"
                name="name"
                value={name}
                aria-describedby="nameHelp"
                onChange={handleInput}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email Email
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                name="email"
                value={email}
                aria-describedby="emailHelp"
                onChange={handleInput}
              />
              <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleInputTel" class="form-label">
                Enter Your Contacts
              </label>
              <input
                type="tel"
                class="form-control"
                id="exampleInputTel"
                name="contacts"
                value={contacts}
                onChange={handleInput}
              />
            </div>
            <div className="d-flex justify-content-between">
              <button type="submit" value="Submit" class="btn btn-primary">
                Submit
              </button>
              <Link to={"/"}>
                <input
                  type="button"
                  value="Go Back"
                  class="btn btn-primary"
                ></input>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
