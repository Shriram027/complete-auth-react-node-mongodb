import { Router } from "express";
/**Import all controllers for the routes */
import * as controller from '../controllers/appController.js';

import Auth, {localVariables} from '../middleware/auth.js';
import  {registerMail} from '../controllers/mailer.js';


const router = Router();




/**POST Methods */
router.route('/register').post(controller.register) //Register user
router.route('/registerMail').post(registerMail); //Send mail to the user
router.route('/authenticate').post(controller.verifyUser, (req, res)=> res.end()); //authenticate user
router.route('/login').post(controller.verifyUser, controller.login); // login in app


/**Get Methods */
router.route('/user/:username').get(controller.getUser); //User with username
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP); // Generate random OTP
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP); // Verify the generated OTP
router.route('/createResetSession').get(controller.createResetSession); // Reset all variables



/** PUT Methods */
router.route('/updateuser').put(Auth, controller.updateUser); // Update user profile
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword); //Reset password





/** DELETE Methods */






export default router;