import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import NotFound from "./NotFound";
import Dashboard from "./Dashboard";


function App() {
  return (
    <Router>
      <div className="App">
        <SideBar />
        <NavBar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/login" element={<Login />}/>
            <Route exact path="/signUp" element={<SignUp />}/>
            <Route exact path="/dashboard" element={<Dashboard />}/>
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
