import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const View = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/getone/${id}`)
      .then((response) => {
        // setUser({ ...res.data[0] });
        setData(response.data);
      })
      .catch((err) => err);
  }, [id]);
  return (
    <div>
      <div className="containers">
        <div className="con-form">
          <div className="card">
            <div className="card-header">
              <h3>User Contacts Details</h3>
            </div>
            <div className="container p-3 text-center">
              <strong>ID:</strong>
              <span className="ps-2">{data.id}</span>

              <br />
              <br />
              <strong>Name:</strong>
              <span className="ps-2 fs-5">{data.name}</span>
              <br />
              <br />
              <strong>Email:</strong>
              <span className="ps-2">{data.email}</span>
              <br />
              <br />
              <strong>Contacts:</strong>
              <span className="ps-2">{data.contacts}</span>
              <br />
              <br />
              <Link to={"/"}>
                <input
                  type="button"
                  value="Go Back"
                  class="btn btn-primary"
                ></input>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default View;
