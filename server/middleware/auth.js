import jwt from 'jsonwebtoken';
import config from '../config.js'
/** auth middleware*/

export default async function Auth(req, res, next){

    try{

        //Access authorize header to validate request
        const token = req.headers.authorization.split(" "[1]);

        //retrieve the user details for the logged in user
        const decodedToken = await jwt.verify(token, config.JWT_SECRET);
        req.user = decodedToken;
        res.json(decodedToken);

        next();

    }
    catch(error){
        res.status(401).json({error:"Authentication failed...!"})
    }
}

export function localVariables(req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession: false
    }

    next();
}