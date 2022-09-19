import React, { createRef, useEffect, useState } from "react";
import "./login.css";
import { Form, Button, Alert } from "react-bootstrap";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  let navi = useNavigate();

  const u_ref = createRef();
  const p_ref = createRef();

  const [pass, setPass] = useState("");
  const [visible, setVisible] = useState(false);
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState("");
  const [aler1, setAlert] = useState({
    msg: "",
    show: false,
    iserror: false,
  });
  const t = 1500;
  const LoginAcc = (e) => {
    var info = { u_name: user, u_pass: pass };

    if (user === "") {
      ShowAlert("Enter Username", true);
      u_ref.current.focus();
    } else if (pass === "") {
      ShowAlert("Enter Password", true);
      p_ref.current.focus();
    } else {
      axios
        .post("http://localhost:5000/login", info)
        .then((res) => {
          const msg = res.data.msg;

          if (msg === 1) {
            const d = res.data.data[0];
            ShowAlert("Login Successful! ", false);
            localStorage.setItem(
              "user",
              JSON.stringify({
                id: d.user_id,
                name: d.SurName,
                role: d.role,
                email: d.email,
              })
            );
            const u = localStorage.getItem("user");
          } else if (msg === 2) {
            ShowAlert("Incorrect Login Credentials", true);
          }
        })

        .catch((err) => {
          ShowAlert("" + err, true);
          Clear();
        });
    }
  };
  const ShowAlert = (m, e) => {
    setAlert((al) => {
      return {
        ...al,
        show: true,
        msg: m,
        iserror: e,
      };
    });
  };
  const Clear = () => {
    setUser("");
    setPass("");
  };
  useEffect(() => {
    if (aler1.show) {
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
    <>
      {" "}
      {localStorage.getItem("user") !== null ? (
        JSON.parse(localStorage.getItem("user")).role === "staff" ? (
          <Navigate to={"/users"}></Navigate>
        ) : (
          <Navigate to={"/admin"}></Navigate>
        )
      ) : (
        <div className="login__container">
          <div>
            <div
              style={{
                width: "350px",
                height: "60px",
              }}
            >
              <Alert
                show={aler1.show}
                className="p-0 d-flex justify-content-center align-items-center"
              >
                <p
                  className="p-0 m-1 m1 labels2"
                  style={{
                    color: aler1.iserror ? "red" : "green",
                  }}
                >
                  {aler1.msg}
                </p>
              </Alert>
            </div>
            <Form
              className="login__form rounded border"
              encType="multipart/form-data"
            >
              <label className="labels1">Login Here</label>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  ref={u_ref}
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  placeholder="Enter Reg No or staff no *"
                />{" "}
              </div>
              <div
                className="form-group"
                style={{
                  position: "relative",
                }}
              >
                {visible ? (
                  <input
                    className="form-control"
                    onChange={(e) => setPass(e.target.value)}
                    type="text"
                    ref={p_ref}
                    value={pass}
                    placeholder="Enter Password *"
                  />
                ) : (
                  <input
                    className="form-control"
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    ref={p_ref}
                    value={pass}
                    placeholder="Enter Password *"
                  />
                )}

                {visible ? (
                  <BsEyeSlash
                    onClick={(e) => setVisible(!visible)}
                    style={{
                      position: "absolute",
                      top: "50%",
                      cursor: "pointer",
                      transform: "translate(-50%,-50%)",
                      right: "0",
                    }}
                  />
                ) : (
                  <BsEye
                    onClick={(e) => setVisible(!visible)}
                    style={{
                      position: "absolute",
                      top: "50%",
                      cursor: "pointer",
                      transform: "translate(-50%,-50%)",
                      right: "0",
                    }}
                  />
                )}
              </div>
              <Button onClick={LoginAcc} className="login__btn">
                Login
              </Button>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
