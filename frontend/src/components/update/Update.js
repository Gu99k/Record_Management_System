import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const Update = () => {
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

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/getone/${id}`)
      .then((res) => {
        console.log(res);
        setValues(...res.data[1]);
      })
      .catch((err) => err);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !contacts) {
      alert("Please Fill All the given rows");
    } else {
      await axios
        .put(`http://localhost:5000/api/update/${id}`, values)
        .then((resp) => {
          alert("Record Updated successfull");
          navigate("/");
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
            <h3>Update Students</h3>
            <div class="mb-3">
              <label for="exampleInputName" class="form-label">
                Enter Name
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleInputName"
                name="name"
                value={values.name}
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
                value={values.email}
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
                value={values.contacts}
                onChange={handleInput}
              />
            </div>
            <div className="d-flex justify-content-between">
              <input
                type="submit"
                value="Update"
                class="btn btn-primary"
              ></input>
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

export default Update;
