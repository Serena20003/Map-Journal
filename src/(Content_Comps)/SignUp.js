import { authIns }  from "../Utils/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Input from "../Components/Input";
import { useState } from "react";
import Button from "../Components/Button";
import useAuthValidation from "../Utils/useAuthValidation";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {errors, validate} = useAuthValidation();
    const nav = useNavigate();

    const signUpClicked = (e) => {
        e.preventDefault();
        console.log("signing up");
        validate({email: email, password: password, confirmPassword: confirmPassword})
        // need to use .then here because validation is a promise and
        // otherwise the code will not wait for validation result
        .then((validation) => {
            if (validation === true) {
                console.log(`validated. email: ${email}, password: ${password}`);
                createUserWithEmailAndPassword(authIns, email, password)
                .then(() => {
                    nav('/dashboard');
                }).catch((e) => {
                    console.log(e);
                });
                updateProfile(authIns.currentUser, {displayName: username})
                .then(() => {
                    // Profile updated!
                    // ...
                  }).catch((error) => {
                    console.log(error);
                  });
            } else {
                console.log('not validated');
                console.log(errors);
            }
        });

    };

    return (  
        <>
        <form onSubmit={signUpClicked}>
        <Input id="signUpUsername" className="signUpTextField" label="Username" value={username} setValue={setUsername} />
            <Input id="signUpEmail" className="signUpTextField" label="Email" value={email} setValue={setEmail} />
            <Input id="signUpPassword" type="password" className="signUpTextField" label="Password" value={password} setValue={setPassword} />
            <Input id="signUpConfirmPassword" type="password" className="signUpTextField" label="Confirm Password" value={confirmPassword} setValue={setConfirmPassword} />
            <Button className="signUpButton" text="Create Account"/> 
        </form>
        </>
    );
}
 
export default SignUp;