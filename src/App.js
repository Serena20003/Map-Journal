import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Login from "./(Content_Comps)/Login";
import SignUp from "./(Content_Comps)/SignUp";
import Home from "./(Content_Comps)/Home";
import NotFound from "./(Content_Comps)/NotFound";
import Dashboard from "./(Content_Comps)/Dashboard";
import Map from "./(Content_Comps)/Map";
import Gallery from "./(Content_Comps)/Gallery";
import { createContext, useState, useContext } from "react";


function App() {

  const [mapName, setMapName] = useState("");
  const [geoPoint, setGeoPoint] = useState(null);

  return (
    <Router>
      <div className="App">
        <div className="flexbox">
        <NavBar />
          <div className="subflexbox">
            <SideBar mapName={mapName} setMapName={setMapName} geoPoint={geoPoint} setGeoPoint={setGeoPoint} />
            <div className="content">
              <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route exact path="/login" element={<Login />}/>
                <Route exact path="/signUp" element={<SignUp />}/>
                <Route exact path="/dashboard" element={<Dashboard />}/>
                <Route exact path="/gallery" element={<Gallery setMapName={setMapName} />}/>
                <Route path="/map" element={<Map geoPoint={geoPoint} setGeoPoint={setGeoPoint}/>}/>
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
