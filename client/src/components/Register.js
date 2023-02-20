import React, {useState} from "react";
import { Link, useNavigate} from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/UserName.module.css";
import toast, {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { userRegisterValidation } from "../helper/validate";
import convertToBase64 from '../helper/convert';
import { registerUser } from "../helper/helper";

export default function Register() {

  const [file, setFile] = useState();
  const navigate = useNavigate()


const formik = useFormik({
  initialValues:{
    email:"",
    username:"",
    password:""
  },
  validate: userRegisterValidation,
  validateOnBlur:false,
  validateOnChange:false,
  onSubmit: async values =>{
    values = await Object.assign(values, {profile: file || ''})
    let registerPromise = registerUser(values);
    toast.promise(registerPromise, {
      loading:'Creating...!',
      success: <b>Register Successfully...!</b>,
      error: <b>Could not register...!</b>
    })
    console.log(values);
    registerPromise.then(function(){navigate('/')})
  }
})

/**Formik doesn't support file upload so we need to create handler for it */
const onUpload =  async e =>{
  const base64  = await convertToBase64(e.target.files[0]);
  setFile(base64);
}



  return (
    <div className="container mx-auto">
      <Toaster position="top-center"></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{width:"45%", paddingTop:'3em', height:'90%'}}>
          <div className="title flex flex-col items-center">
            <h6 className="text-5xl font-bold">Register User</h6>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
            Happy to join us!
            </span>
          </div>
          <form  onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center items-center py-2">
              <label htmlFor="profile">
              <img className={styles.profile_img} src={file || avatar} alt="avatar" />
              </label>
              <input  onChange={onUpload}  type="file"  id='profile' name="profile"/>
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('email')}  className={styles.textbox} type="email" placeholder="Email" />
              <input {...formik.getFieldProps('username')}  className={styles.textbox} type="text" placeholder="Username" />
              <input {...formik.getFieldProps('password')}  className={styles.textbox} type="password" placeholder="Password" />
              <button className={styles.btn} type="submit">Register</button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                {"  "}
               Already registered ? 
                {"  "}
                <Link className=" text-red-500" to="/">
                  Login now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
