import { useNavigate } from "react-router-dom";
import Button from "./Components/Button";

const Home = () => {
    const navigate = useNavigate();
    return (  
        <>
        <Button className="homeButton" text="Login" action={() => navigate("/login")} />
        <Button className="homeButton" text="Sign Up" action={() => navigate("/signup")} />
        </>
    );
}
 
export default Home;