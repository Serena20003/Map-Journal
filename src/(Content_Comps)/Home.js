import { useNavigate } from "react-router-dom";
import Button from "../Components/Button";
import { useAuth } from "../Utils/authContext";
import { signOut } from "firebase/auth";
import authIns from "../Utils/firebaseConfig";


const Home = () => {
    const nav = useNavigate();
    const {currentUser} = useAuth();

    const logoutClicked = () => {
        console.log(currentUser);
        if (currentUser) {
            signOut(authIns).then(() => {
            }).catch((e) => {
                console.log(e);
            });
        }
    }

    return (  
        <>
        {!currentUser &&
        <>
        <Button className="homeButton" text="Login" action={() => nav("/login")} />
        <Button className="homeButton" text="Sign Up" action={() => nav("/signup")} />
        </>
        }
        {currentUser &&
        <Button className="homeButton" text="Logout" action={logoutClicked} />}
        </>
    );
}
 
export default Home;