import { useState } from "react";
import { authIns } from "./firebaseConfig";
import { validatePassword } from "firebase/auth";

const useAuthValidation = () => {
    const [errors, setErrors] = useState({});
    const validate = async (values) => {
        const newErrors = {};
        if (!/\S+@\S+\.\S+/.test(values.email)) {
            newErrors.email = 'Invalid email. ';
        }
        try {
            const status = await validatePassword(authIns, values.password);
            if (!status.isValid) {
                // need to create an error message for each requirement
                newErrors.password = 'Password is not strong enough: ';
                if (!status.meetsMinPasswordLength) {newErrors.password += "password needs to be at least 6 characters; ";}
                if (!status.containsLowercaseLetter) {newErrors.password += 'missing lowercase letter; ';}
                if (!status.containsUppercaseLetter) {newErrors.password += 'missing uppercase letter; ';}
                if (!status.containsNumericCharacter) {newErrors.password += 'missing numeric letter; ';}
                if (!status.containsNonAlphanumericCharacter) {newErrors.password += 'missing non-alphanumeric symbol; ';}
                if (!status.meetsMaxPasswordLength) {newErrors.password += "password needs to be less than 4096 characters; ";}
            }
        } catch(e) {
            console.log(e);
        }
        if (values.password !== values.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match. ';
        }
        setErrors(newErrors);
        return (Object.keys(newErrors).length === 0);
    }
    return ({errors, validate});
}
 
export default useAuthValidation;