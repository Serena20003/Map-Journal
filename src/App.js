import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Login from "./(Content_Comps)/Login";
import SignUp from "./(Content_Comps)/SignUp";
import Home from "./(Content_Comps)/Home";
import NotFound from "./(Content_Comps)/NotFound";
import Dashboard from "./(Content_Comps)/Dashboard";
import Map from "./(Content_Comps)/Map";
import { createContext, useState, useContext } from "react";


function App() {

  const AppStateContext = createContext();
  const [addPoint, setAddPoint] = useState(false);
  const [addLine, setAddLine] = useState(false);

  return (
    <Router>
      
      <div className="App">
        <div className="flexbox">
          <SideBar />
          <div className="subflexbox">
            <NavBar />
            <div className="content">
              <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route exact path="/login" element={<Login />}/>
                <Route exact path="/signUp" element={<SignUp />}/>
                <Route exact path="/dashboard" element={<Dashboard />}/>
                <Route exact path="/map" element={<Map />}/>
                <Route path="*" element={<NotFound />}/>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
