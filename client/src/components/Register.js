import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/profile.png";
import styles from "../styles/UserName.module.css";
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { passwordValidate } from "../helper/validate";

export default function Register() {


const formik = useFormik({
  initialValues:{
    email:"",
    username:"",
    password:""
  },
  validate: passwordValidate,
  validateOnBlur:false,
  validateOnChange:false,
  onSubmit: async values =>{
    console.log(values);
  }
})



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
            <div className="profile flex justify-center py-2">
              <label htmlFor="profile">
              <img className={styles.profile_img} src={avatar} alt="avatar" />
              </label>
              <input type="file"  id='profile' name="profile"/>
            </div>
            <div className="textbox flex flex-col items-center gap-2">
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
