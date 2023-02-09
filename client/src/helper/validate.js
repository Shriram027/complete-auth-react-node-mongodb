import toast from "react-hot-toast";

/**Validate login username */
export async function usernamevalidate(values){
    const errors = await usernameverify({}, values);
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

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

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

/** Validate reset password */
export async function resetPasswordValidation(values){
    const errors = await passwordverify({}, values);

    if(values.password !== values.confirm_password){
        errors.exist = toast.error("Password not match")
    }

    return errors;

}