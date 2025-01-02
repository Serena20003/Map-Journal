import Button from "../Components/Button";
import { useAuth } from "../Utils/authContext";
import { signOut } from "firebase/auth";
import authIns from "../Utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    const { currentUser } = useAuth();
    const nav = useNavigate();
    const logoutClicked = () => {
        console.log(currentUser);
        if (currentUser) {
            signOut(authIns).then(() => {
                nav("/");
            }).catch((e) => {
                console.log(e);
            });
        } else {
            nav("/");
        }
    }
    return (  
        <div>
            {currentUser && <Button className="logOutButton" text="Log out" action={logoutClicked}/>}
            {!currentUser && <Button className="logOutButton" text="Not logged in, go Home" action={logoutClicked}/>}
        </div>
    );
}
 
export default Dashboard;