/** To make api request */
import axios from 'axios';
import jwt from 'jwt-decode';


/**To get username from Token */
export async function getUsername(){
    const token = localStorage.getItem('token');
    if(!token) return Promise.reject("Can not find token...!");
    let decode = jwt(token);
    console.log(decode);
    return decode;
}

/**Base url */
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


/**Authenticate function */
export async function authenticate(username){
    try{
        return await axios.post("/api/authenticate", {username});

    }
    catch(error){
        return {error:"Username doesn't exist...!"}

    }
}

/**Get user detail */
export async function getUser({username}){
    try{
      const {data} =  await axios.get(`/api/user/${username}`);
      return {data};

    }
    catch(error){
        return {error:"Password doesn't Match...!"}
    }
}

/**register user function */
export async function registerUser(credentials){
    try{
        const {data : {msg}, status} = await axios.post(`/api/register`, credentials);

        let {username, email} = credentials;

        if(status === 201){
            await axios.post("/api/registerMail", {username, userEmail:email, text: msg})
        }
        return Promise.resolve(msg);

    }
    catch(error){
        return Promise.reject({error});
    }
}

/**Login user */
export async function verifyPassword({username, password}){
    try{
        if(username){
           const {data} =  await axios.post('/api/login', {username, password});
           return Promise.resolve({data});
        }

    }
    catch(error){
        return Promise.reject({error:"Password doesn't match...!"})
    }

}

/**Update user data */
export async function updateUser(response){
    try{
        const token = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser', response, {headers:{"Authorization": `Bearer ${token}`}});
        return Promise.resolve({data});

    }
    catch(error){
        return Promise.reject({error:"Couldn't update profile...!"})
    }
}

/**Generate OTP */
export async function generateOTP(username){
    try{
        const {data : {code}, status} = await axios.get('/api/generateOTP', {params: {username}});
        if(status === 201){
            let {data : {email}} = await getUser({username});
            let text = `Your password recovery OTP is ${code}. Please verify and recover your password.`;
            await axios.post('/api/registerMail',{username, userEmail: email, text, subject:"Password Recovery OTP"})
        }
        return Promise.resolve({code});
    }
    catch(error){
        return Promise.reject({error});
    }
}

/**Verify OTP */
export async function verifyOTP({username, code}){
    try{
       const {data, status} =  await axios.get('/api/verifyOTP', {params: {username, code}});
       return {data, status};

    }
    catch(error){
        return Promise.reject(error);
    }
}

/**Reset Password */
export async function resetPassword({username, password}){
    try{
        const {data, status} = await axios.put('/api/resetPassword',{username, password});
        return Promise.resolve({data, status});

    }
    catch(error){
        return Promise.reject({error});
    }
}