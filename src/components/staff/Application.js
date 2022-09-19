import React, { createRef, useEffect, useState } from "react";
import { Alert, Button, Form, ToggleButton } from "react-bootstrap";
import { Faculties } from "./Data";
import * as FiIcons from "react-icons/fi";
import logo from "../../assets/kibu__logo.png";
import Spinner from "../spinner/Spinner";
import { BiCheckbox, BiShowAlt } from "react-icons/bi";
import axios from "axios";
export const Application = () => {
  const [fac, setFac] = useState("");
  const [passengers, setPass] = useState(0);

  const [inp, setInp] = useState({
    msg: "Type instead",
    checked: true,
  });

  const [selectedFile, setSelectedFile] = useState("");
  const [dedate, setDedate] = useState("");
  const [detime, setDetime] = useState("");
  const [ofpf, setOFpf] = useState("");
  const [redate, setRedate] = useState("");
  const [From, setFrom] = useState("");
  const [To, setTo] = useState("");

  const [showSpinner, setShowSpinner] = useState(false);
  const [allowance, setAllowance] = useState(0);
  const [retime, setRetime] = useState("");
  const [alert1, setAlert] = useState({
    msg: "Select missed year",
    show: false,
    iserror: false,
  });
  let t = 2000;

  const user = JSON.parse(localStorage.getItem("user"));

  const ChooseFile = (e) => {
    document.getElementsByName("doc")[0].click();
    document.getElementsByName("doc")[0].change = (ex) => {
      console.log(ex.target);
    };
  };
  const Alerting = (text, err) => {
    setAlert((al) => {
      return {
        ...al,
        msg: text,
        show: true,
        iserror: err,
      };
    });
  };
  const HandLeSubmit = (e) => {
    e.preventDefault();
    if (fac === "") {
      Alerting("Faculty /department required", true, true);
    } else if (passengers === 0) {
      Alerting("Specify  passengers number", true, true);
    } else if (selectedFile === "") {
      Alerting("A file of passengers needed", true, true);
    } else if (fac === "") {
      Alerting("Faculty /department required", true, true);
    } else if (To === "") {
      Alerting("Destination required", true, true);
    } else if (dedate === "") {
      Alerting("Departure date required", true, true);
    } else if (detime === "") {
      Alerting("Departure time required", true, true);
    } else if (redate === "") {
      Alerting("Specify return date", true, true);
    } else if (retime === "") {
      Alerting("Specify return time", true, true);
    } else if (allowance === 0) {
      Alerting("Specify Driver's allowance ", true, true);
    } else if (ofpf === "") {
      Alerting("Enter PF Number of officer in charge", true, true);
    } else {
      setShowSpinner(true);

      let data = new FormData();
      data.append("file", selectedFile);
      axios
        .post("http://localhost:5000/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          const filepath = res.data;
          const details = {
            u_id: user.id,
            fac: fac,
            pass: passengers,
            file: filepath,
            dest: To,
            pl: From,
            de_date: dedate,
            de_time: detime,
            re_date: redate,
            re_time: retime,
            all: allowance,
            ofpf: ofpf,
          };
          axios
            .post("http://localhost:5000/applications", details)
            .then((res) => {
              if (res.data.err == 1) {
                Alerting(res.data.msg, false);
              } else {
                Alerting(res.data.msg, true);
              }
              setShowSpinner(false);
            })
            .catch((err) => {
              Alerting("Failed " + err, true);
              setShowSpinner(false);
            });
        })
        .catch((err) => {
          setShowSpinner(false);
        });
    }
  };
  useEffect(() => {
    if (alert1.show) {
      setTimeout(() => {
        setAlert((al) => {
          return {
            ...al,
            show: false,
          };
        });
      }, t);
    }
  });

  return (
    <div>
      <Alert
        show={alert1.show}
        className="p-0 d-flex fade "
        dismissible
        style={{
          maxWidth: "500px",
          margin: "auto",
          width: "500px",
          top: "70px",
          left: "50%",
          position: "fixed",
          transform: "translate(-50%,0)",
          alignSelf: "center",
          zIndex: "1000",
        }}
      >
        <p
          className="label3 text-center col-10 mt-2"
          style={
            alert1.iserror
              ? { color: "red", fontSize: "1.2rem" }
              : { color: "blue", fontSize: "1.2rem" }
          }
        >
          {alert1.msg}
        </p>
      </Alert>
      <div
        className="bg-light w-100 justify-content-center d-flex align-items-center justify-content-center"
        style={{
          height: "60px",
          margin: "10px",
        }}
      >
        <h3>Kibabii university Transport Requistion Application</h3>
      </div>
      <div className="d-flex flex-column justify-content-center">
        <h3 className="label1 font-weight-bold">Part 1</h3>
        <h4 className="label1 font-weight-bold">
          TRAVEL DETAILS COMPLETED BY THE APPLICANT OF THE DEPARTMENT/FACULTY
        </h4>
        <Spinner show={showSpinner} />
        <Form
          className="w-75 mx-4 rounded border p-3 d-flex flex-column"
          style={{
            maxWidth: "800px",
          }}
        >
          <div className="form-group">
            <label className="mt-3">Faculty </label>
            <br></br>

            <label className="mx-3 mb-1">{inp.msg}</label>
            <input
              checked={inp.checked}
              onChange={(e) =>
                setInp((inps) => {
                  return {
                    ...inps,
                    checked: !inps.checked,
                  };
                })
              }
              type="checkbox"
            />
            {!inp.checked ? (
              <select
                className="form-select"
                onChange={(e) => setFac(e.target.value)}
              >
                {Faculties.map((fac) => {
                  return <option value={fac.id}>{fac.name}</option>;
                })}
              </select>
            ) : (
              <input
                onChange={(e) => setFac(e.target.value)}
                type="text"
                placeholder="Faculty /department"
                className="mt-1 form-control"
              />
            )}
          </div>

          <div className="form-group">
            <label className="mt-3">Number of passengers</label>
            <input
              type="number"
              onChange={(e) => setPass(e.target.value)}
              placeholder="Number passengers "
              className="mt-1 form-control"
            />
            <div
              className="p-0 my-3 border bg-light rounded"
              style={{
                maxWidth: "300px",
                margin: "auto",
                width: "250px",
                transition: "all 0.3s ease",
                overflow: "hidden",
                height: "120px",
              }}
            >
              <header className="labels2 text-center">
                Upload list of Passengers
              </header>
              <div
                style={{
                  margin: "10px",
                  height: "80px",
                }}
                className="d-flex justify-content-center flex-column  bg-success align-items-center"
              >
                <p
                  className="labels3"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "50px",
                  }}
                >
                  {selectedFile.name}
                </p>
                <FiIcons.FiUploadCloud
                  onClick={ChooseFile}
                  style={{
                    fontSize: "3rem",
                    transform: "rotate(180deg)",
                    cursor: "pointer",
                  }}
                />
                <input
                  type="file"
                  name="doc"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    let ext = ["pdf", "docx", "csv", "xlsx"];
                    let set = false;
                    ext.forEach((ex) => {
                      const arr = file.name.split(".");
                      if (arr[arr.length - 1] === ex) {
                        set = true;
                      }
                    });

                    if (set) {
                      setSelectedFile(file);
                    } else {
                      setAlert((al) => {
                        return {
                          ...al,
                          show: true,
                          msg: "Select a valid pdf or word file",
                          iserror: true,
                        };
                      });
                      setSelectedFile("");
                    }
                  }}
                  style={{
                    display: "none",
                  }}
                />
              </div>
            </div>
            <div>
              <p className="label1 mb-1">Details of Trip</p>
              <div className="d-flex">
                <div className="form-group">
                  <label className="mt-1">From </label>
                  <input
                    type="text"
                    onChange={(e) => {
                      setFrom(e.target.value);
                    }}
                    placeholder="FROM"
                    className="mt-1 form-control"
                  />
                </div>
                <div className="form-group mx-3">
                  <label className="mt-1">To</label>
                  <input
                    type="text"
                    placeholder="TO"
                    onChange={(e) => {
                      setTo(e.target.value);
                    }}
                    className="mt-1 form-control"
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="label1 mb-1">Departure date</p>
              <div className="d-flex">
                <div className="form-group">
                  <label className="mt-1">Date </label>
                  <input
                    onChange={(e) => {
                      setDedate(e.target.value);
                    }}
                    type="date"
                    placeholder="FROM"
                    className="mt-1 form-control"
                  />
                </div>
                <div className="form-group mx-3">
                  <label className="mt-1">Time</label>
                  <input
                    onChange={(e) => {
                      setDetime(e.target.value);
                    }}
                    type="time"
                    placeholder="TO"
                    className="mt-1 form-control"
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="label1 mb-1">Return Date</p>
              <div className="d-flex">
                <div className="form-group">
                  <label className="mt-1">Date </label>
                  <input
                    onChange={(e) => {
                      setRedate(e.target.value);
                    }}
                    type="date"
                    placeholder="FROM"
                    className="mt-1 form-control"
                  />
                </div>
                <div className="form-group mx-3">
                  <label className="mt-1">Time</label>
                  <input
                    onChange={(e) => {
                      setRetime(e.target.value);
                    }}
                    type="time"
                    placeholder="TO"
                    className="mt-1 form-control"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="mt-3">Drivers Allowance </label>
            <input
              type="number"
              placeholder=""
              onChange={(e) => {
                setAllowance(e.target.value);
              }}
              value={allowance}
              className="mt-1 form-control"
            />
          </div>

          <div>
            <p className="label1 mb-1">Officer Incharge of Trip</p>
            <div className="d-flex">
              <div className="form-group mx-3">
                <label className="mt-1">PF No</label>
                <input
                  onChange={(e) => {
                    setOFpf(e.target.value);
                  }}
                  type="text"
                  placeholder="officer's PF No"
                  className="mt-1 form-control"
                />
              </div>
            </div>
          </div>

          <Button className="btn-info  d-flex  my-3 " onClick={HandLeSubmit}>
            <Spinner show={showSpinner} />
            <span className="ms-4 "> Submit</span>
          </Button>
        </Form>
      </div>
    </div>
  );
};
