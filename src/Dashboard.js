import Button from "./Components/Button";
import authIns from "./Utils/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    const nav = useNavigate();
    const logoutClicked = () => {
        console.log(authIns.currentUser);
        signOut(authIns).then(() => {
            nav("/");
        }).catch((e) => {
            console.log(e);
        });
    }
    return (  
        <div>
            <Button className="logOutButton" text="Log out" action={logoutClicked}/>
        </div>
    );
}
 
export default Dashboard;