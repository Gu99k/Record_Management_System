import React, { useEffect, useState } from "react";
import Button from "../buttons/Button";
import axios from "axios";
import Styles from "./Students.module.css";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Students = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/api/getall")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => err);
  }, []);
  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you like to Delete");
    if (confirm) {
      try {
        await axios.delete(`/api/delete/${id}`);
        alert("Record Deleted successfull");
        navigate("/");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="containers">
        <div className="con_data">
          <nav class="navbar navbar-dark bg-mynav">
            <div class="container-fluid">
              <Link class="navbar-brand" href="#">
                My Crud App
              </Link>
            </div>
          </nav>

          <div class="container">
            <div class="d-flex bd-highlight mb-3">
              <div class="me-auto p-2 bd-highlight">
                <h2>Users</h2>
              </div>
              <div class="p-2 bd-highlight">
                <Link to={"/create"}>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    onclick="showUserCreateBox()"
                  >
                    Create
                  </button>
                </Link>
              </div>
            </div>

            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th className={Styles.t_head} scope="col">
                      S.No.
                    </th>
                    <th className={Styles.t_head} scope="col">
                      Nmae
                    </th>
                    <th className={Styles.t_head} scope="col">
                      Email
                    </th>
                    <th className={Styles.t_head} scope="col">
                      Contacts
                    </th>
                    <th className={Styles.t_head} scope="col">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody id="mytable">
                  {data.map((data, index) => {
                    return (
                      <tr key={data._id}>
                        <th className={Styles.t_head} scope="row">
                          {" "}
                          {index + 1}{" "}
                        </th>
                        <td>{data.name} </td>
                        <td className={Styles.email_data}>{data.email} </td>
                        <td>{data.contacts} </td>
                        <td>
                          <Link to={`/update/${data._id}`}>
                            <Button text="Update" color={Styles.green} />
                          </Link>

                          <Button
                            text="delete"
                            color={Styles.red}
                            onClick={(e) => handleDelete(data._id)}
                          />

                          <Link to={`/view/${data._id}`}>
                            <Button text="view" color={Styles.aqua} />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Students;
