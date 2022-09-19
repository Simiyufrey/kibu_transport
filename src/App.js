import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Application } from "./components/staff/Application";
import Main from "./components/staff/Main";
import Logout from "./components/acc/Logout";
import Login from "./components/acc/Login";
import Main2 from "./components/admin/Main";
import Dashboard from "./components/admin/Dashboard";
import { MyApplications } from "./components/staff/MyApplications";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/users"
            element={
              <Main>
                <Application />
              </Main>
            }
          ></Route>
          <Route
            exact
            path="/users/Myapplications"
            element={
              <Main>
                <MyApplications />
              </Main>
            }
          ></Route>
          <Route
            path="/admin"
            element={
              <Main2>
                <Dashboard />
              </Main2>
            }
          ></Route>
          <Route path="/" element={<Login />}></Route>

          <Route path="/logout" element={<Logout />}></Route>

          <Route path="/admin" element={<Login></Login>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
