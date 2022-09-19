import React, { useState } from "react";
import { Table } from "react-bootstrap";
import logo from "../../assets/kibu__logo.png";
import axios from "axios";
import jsPDF from "jspdf";
import Pdf from "./Pdf";
export const MyApplications = () => {
  const [apps, setApps] = useState([{}]);

  const Download = (details) => {
    Pdf(details);
  };
  const QueryApplications = () => {
    let details = { u_id: JSON.parse(localStorage.getItem("user")).id };

    axios
      .get("http://localhost:5000/applications", { params: details })
      .then((res) => {
        setApps(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };
  QueryApplications();
  return (
    <div>
      <div
        className=" mx-3 mt-3 bg-light d-flex "
        style={{ width: "90%", boxShadow: "2px 2px 2px inset gray" }}
      >
        <h3 className="label1  w-100 text-center">My Applications</h3>
      </div>
      <Table
        striped
        border={true}
        className="mx-3"
        style={{
          width: "90%",
        }}
      >
        <thead>
          <tr>
            <th>Destination</th>
            <th>Passengers</th>
            <th>De Date</th>
            <th>De time</th>
            <th>Driver</th>
            <th>Vehicle No</th>
            <th>Date applied</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {apps.length > 0
            ? apps.map((ap) => {
                return (
                  <tr>
                    <td>{ap.place_to}</td>
                    <td>{ap.Passengers}</td>
                    <td>{ap.de_date}</td>
                    <td>{ap.de_time}</td>
                    <td>{ap.SurName + "  " + ap.OtherNames}</td>
                    <td>{ap.Vehicle_No}</td>
                    <td>{ap.place_to}</td>
                    <td>
                      {ap.status === "Approved" ? (
                        <button
                          onClick={() => Download(ap)}
                          className="btn btn-success p-1"
                        >
                          Download permit
                        </button>
                      ) : (
                        <span>{ap.status}</span>
                      )}
                    </td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </Table>
    </div>
  );
};
