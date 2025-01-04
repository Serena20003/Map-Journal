import { useAuth } from "../Utils/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import Input from "../Components/Input";
import { useState } from "react";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";
import { authIns }  from "../Utils/firebaseConfig";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    const loginClicked = ((e) => {
        e.preventDefault();
        console.log("logging in");
        signInWithEmailAndPassword(authIns, email, password).then(() => {
            console.log("login success!");
            nav('/dashboard');
        }).catch(e => {
            console.log(e)
        });
    });
    return (  
        <>
        <form onSubmit={loginClicked}>
            <Input id="loginEmail" className="loginTextField" label="Email" value={email} setValue={setEmail} />
            <Input id="loginPassword" type="password" className="loginTextField" label="Password" value={password} setValue={setPassword} />
            <Button className="loginButton" text="Login"/> 
        </form>
        </>
    );
}
 
export default Login;