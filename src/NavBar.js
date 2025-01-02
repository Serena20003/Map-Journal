import Button from "./Components/Button";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
    const navigate = useNavigate();
    return (  
        <div>
            <Button className="navBarButton" text="Home" action={() => navigate("/")} />
            <Button className="navBarButton" text="Dashboard" action={() => navigate("/dashboard")} />
            <Button className="navBarButton" text="Map" action={() => navigate("/map")} />
        </div>
    );
}
 
export default NavBar;