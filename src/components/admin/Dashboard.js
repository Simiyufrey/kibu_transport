import React, { useEffect, useRef, useState } from "react";
import "./main.css";
import "./Navbar.css";
import "./dashboard.css";
import axios from "axios";
import logo from "../../assets/kibu__logo.png";

import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import * as BIIcons from "react-icons/bi";
import * as IaIcons from "react-icons/ai";
import { Link, Navigate } from "react-router-dom";
import SmallComponents from "./SmallComponents";
import { Button, Form, Modal, Table } from "react-bootstrap";

const Dashboard = ({ children }) => {
  const [apl, setapl] = useState();
  const [app, setApp] = useState();
  const [apps, setApps] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [selected, setSelected] = useState();
  const [selectedv, setSelectedV] = useState();
  const [driver, setDriver] = useState();

  const [vehicle, setVehicle] = useState();
  const [found, setFound] = useState();

  const DownloadFile = (filename) => {
    console.log(filename);
    axios

      .get("http://localhost:5000/document", { params: { f: filename } })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const ShowModal = (t, id) => {
    if (t === "d") {
      if (drivers.length > 0) {
        setShow(true);
      } else {
        alert("No drivers available");
      }
    } else {
      if (vehicles.length > 0) {
        setShow1(true);
      } else {
        alert("No vehicles available");
      }
    }
    setSelected(id);
  };

  axios
    .get("http://localhost:5000/vehicles")
    .then((res) => {
      setVehicles(res.data);
    })
    .catch((err) => {});

  axios
    .get("http://localhost:5000/drivers")
    .then((res) => {
      setDrivers(res.data);
    })
    .catch((err) => {});
  const TApplications = async (en) => {
    const params = { en: en };

    await axios
      .get(`http://localhost:5000/totalinfo`, { params })
      .then((res) => {
        const { st, info } = res.data;
        console.log(res.data);
        if (st === 2) {
          setapl(info);
        } else if (st === 4) {
          setApp(info);
        }
      })
      .catch((err) => {});
  };

  const getDriver = async (id) => {
    await axios
      .get("http://localhost:5000/driver", {
        u_id: id,
      })
      .then((res) => {
        setFound(res.data);
        return res.data[0].SurName;
      });
  };

  TApplications("tapps");

  const QueryApplications = () => {
    let details = { u_id: JSON.parse(localStorage.getItem("user")).id };

    axios
      .get("http://localhost:5000/admin/applications")
      .then((res) => {
        setApps(res.data);
      })
      .catch((er) => {
        console.log(er);
      });
  };
  QueryApplications();

  const Approve = (id) => {
    axios.patch("http://localhost:5000/Approve", { app_id: id }).then((res) => {
      QueryApplications();
    });
  };

  useEffect(() => {
    TApplications("tapps");
    TApplications("tapprovals");
  });

  const AssignDriver = () => {
    const details = { dr_id: driver, app_id: selected };
    axios
      .patch("http://localhost:5000/driver", details)
      .then((res) => {
        setShow(false);
      })
      .catch((er) => {});
  };

  const AssignVehicle = () => {
    const details = { vh_id: vehicle, app_id: selected };
    axios
      .patch("http://localhost:5000/vehicle", details)
      .then((res) => {
        setShow1(false);
      })
      .catch((er) => {});
  };

  return (
    <>
      <div className="dashboard ">
        <div className="sub-dashboard">
          <SmallComponents
            className=""
            content={{ title: "Total applications", number: apl }}
          />
          <SmallComponents
            className=""
            content={{ title: "Total Approvals", number: app }}
          />
        </div>

        <Table
          striped
          border={true}
          className="mx-3 mt-4"
          style={{
            width: "90%",
          }}
        >
          <thead>
            <tr>
              <th>Faculty</th>
              <th>Destination</th>
              <th>Passengers</th>
              <th>De Date</th>
              <th>De time</th>
              <th>Driver</th>
              <th>Vehicle</th>
              <th>List of Passengers</th>
              <th>Date applied</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {apps.length > 0
              ? apps.map((ap) => {
                  return (
                    <tr>
                      <td>{ap.Faculty}</td>
                      <td>{ap.place_to}</td>
                      <td>{ap.Passengers}</td>
                      <td>{ap.de_date}</td>
                      <td>{ap.de_time}</td>
                      <td>
                        {ap.dr_id !== null ? (
                          ap.dr_id
                        ) : (
                          <button
                            className="btn btn-info"
                            onClick={() => ShowModal("d", ap.app_id)}
                          >
                            Assign
                          </button>
                        )}
                      </td>
                      <td>
                        {ap.vehicle_id !== null ? (
                          ap.vehicle_id
                        ) : (
                          <button
                            className="btn btn-info"
                            onClick={() => ShowModal("v", ap.app_id)}
                          >
                            Assign
                          </button>
                        )}
                      </td>
                      <td>
                        {" "}
                        <BIIcons.BiDownload
                          onClick={() => DownloadFile(ap.filepath)}
                          className="dwn_btn"
                          style={{
                            float: "right",
                            fontSize: "1.4rem",
                            color: "green",
                          }}
                        />
                      </td>
                      <td>{ap.date_applied}</td>
                      <td>
                        {ap.status === "Pending" ? (
                          <button
                            className="btn btn-warning"
                            onClick={() => Approve(ap.app_id)}
                          >
                            Approve
                          </button>
                        ) : (
                          <span className="p-2 bg-success ">{ap.status}</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </Table>

        <Modal
          show={show}
          className="d-flex justify-content-center align-items-center"
        >
          <div
            className="modal-dialog d-flex justify-content-center align-items-center  modal-dialog-centered"
            role="document"
          >
            <div className="modal-content d-flex justify-content-center align-items-center">
              <div className="modal-header">
                <h5 className="modal-title">Assign driver</h5>
              </div>
              <div className="modal-body">
                <div className="col ">
                  <form
                    action=""
                    method="post"
                    style={{
                      width: "400px",
                    }}
                    className="form-block"
                  >
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        value={selected}
                      />
                    </div>
                    <div className="form-group w-100">
                      <label for="title">Driver Name</label>
                      <select
                        className="form-select"
                        onChange={(e) => setDriver(e.target.value)}
                      >
                        <option></option>
                        {drivers.map((driver) => {
                          return (
                            <option value={driver.dr_id}>
                              {driver.OtherNames + "  "}
                              {driver.SurName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </form>
                  <div className="modal-footer">
                    <button
                      className="btn btn-info"
                      name="submit"
                      onClick={AssignDriver}
                    >
                      Assign
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          show={show1}
          className="d-flex justify-content-center align-items-center"
        >
          <div
            className="modal-dialog d-flex justify-content-center align-items-center  modal-dialog-centered"
            role="document"
          >
            <div className="modal-content d-flex justify-content-center align-items-center">
              <div className="modal-header">
                <h5 className="modal-title">Assign Vehicle</h5>
              </div>
              <div className="modal-body">
                <div className="col ">
                  <form
                    action=""
                    method="post"
                    style={{
                      width: "400px",
                    }}
                    className="form-block"
                  >
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        value={selected}
                      />
                    </div>
                    <div className="form-group w-100">
                      <label for="title">Driver Name</label>
                      <select
                        className="form-select"
                        onChange={(e) => setVehicle(e.target.value)}
                      >
                        {vehicles.map((vehicle) => {
                          return (
                            <option value={vehicle.Vehicle_No}>
                              {vehicle.type + "  "}
                              {vehicle.No_of_sits}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </form>
                  <div className="modal-footer">
                    <button
                      className="btn btn-info"
                      name="submit"
                      onClick={AssignVehicle}
                    >
                      Assign
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Dashboard;
