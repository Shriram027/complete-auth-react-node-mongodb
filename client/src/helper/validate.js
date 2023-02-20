import toast from "react-hot-toast";
import { authenticate } from "./helper";

/**Validate login username */
export async function usernamevalidate(values){
    const errors = await usernameverify({}, values);

    if(values.username){
        const {status} = await authenticate(values.username);

        if(status !== 200){
            errors.exist = toast.error("User does not exist...!");
        }

    }
    return errors;
}

/** validate username */
function usernameverify(error = {}, values){
    if(!values.username){
        error.username = toast.error('username required...!');
    }
    // else if(values.username.includes("")){
    //     error.username = toast.error("Invalid username...!");
    // }
    return error;
}

/** validate password */

function passwordverify(error = {}, values){

    const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

    if(!values.password){
        error.password = toast.error('Password required...!');
    }
    // else if(values.password.includes(" ")){
    //     error.password = toast.error("Invalid password...!");
    // }
    else if(values.password.length < 4){
        error.password = toast.error("Password must be more than 4 character..!");
    }
    else if(!specialChars.test(values.password)){
        error.password = toast.error("Password must have a special character...!");
    }
    return error;
}

export async function passwordValidate(values){
    const errors = await passwordverify({}, values);

    return errors;
}

/** Validate email */
function emailVerify(error = {}, values){
    if(!values.email){
        error.email = toast.error("Email required...!");
    }
    else if(!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i.test(values.email)){
        error.email = toast.error("Invalid email address...!")
    }

    return error;
}

/** Validate reset password */
export async function resetPasswordValidation(values){
    const errors = await passwordverify({}, values);

    if(values.password !== values.confirm_password){
        errors.exist = toast.error("Password not match")
    }

    return errors;

}

/** Validate user register page */
export async function userRegisterValidation(values){
    const errors = usernameverify({}, values);
    passwordverify(errors, values);
    emailVerify(errors, values);

    return errors;
}

/** Validate profile page */
export async function profileValidation(values){
    const errors = emailVerify({}, values);
    return errors;
}