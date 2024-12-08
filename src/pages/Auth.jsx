import React, { useState } from "react";
import "./Auth.css";
import { HideLoading, ShowLoading } from "../redux/loaderSlice.js";
import {useDispatch} from "react-redux"
import { useGoogleLogin } from "@react-oauth/google";
import { createAccount, loginAccount, loginWithGoogle } from "../redux/usersSlice.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  // Sign Up form state
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Sign In form state
  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });

  // Handle input changes for Sign Up form
  const handleSignUpChange = (e) => {
    setSignUpForm({
      ...signUpForm,
      [e.target.name]: e.target.value,
    });
  };

  // Handle input changes for Sign In form
  const handleSignInChange = (e) => {
    setSignInForm({
      ...signInForm,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Sign Up form submission
  const handleSignUpSubmit =async (e) => {
    e.preventDefault();    
    try{
      dispatch(ShowLoading())
      const response = await dispatch(createAccount(signUpForm))
      dispatch(HideLoading())
      if(response?.payload?.success){
        navigate("/blog/blogList")
        setSignUpForm({
          name: "",
          email: "",
          password: "",
        })
      }
      
    }
    catch(error){
        dispatch(HideLoading())
        toast.error(error.message);
    }
  };

  // Handle Sign In form submission
  const handleSignInSubmit =async (e) => {
    e.preventDefault();
    try{
      dispatch(ShowLoading())
      const response = await dispatch(loginAccount(signInForm))
      dispatch(HideLoading())
      if(response?.payload?.success){
        console.log(response);
        navigate("/blog/blogList")    
        setSignInForm({
          email: "",
          password: "",
        })
      }
      
    }
    catch(error){
        dispatch(HideLoading())
        toast.error(error.message);
    }    
  };

  const responseFromGoogle=async (response)=>{
    try{
      if(response.code){
        dispatch(ShowLoading())
        const res=await dispatch(loginWithGoogle(response.code))
        dispatch(HideLoading())
        if(res?.payload?.success){
          console.log(response);
          navigate("/blog/blogList")
      }
    }
         
    }
    catch(error){
      dispatch(HideLoading())
        message.error(error.message);
    }
  }
    const SignInWithGoogle=useGoogleLogin({
      onSuccess:responseFromGoogle,
      onError:responseFromGoogle,
      flow:"auth-code"
    })

  const handleSignUpClick = () => {
    setIsRightPanelActive(true);
  };

  const handleSignInClick = () => {
    setIsRightPanelActive(false);
  };
  

  return (
    <div
      className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}
      id="container"
    >
      {/* Sign Up Form */}
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignUpSubmit}>
          <h1>Create Account</h1>
          
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={signUpForm.name}
            onChange={handleSignUpChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signUpForm.email}
            onChange={handleSignUpChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signUpForm.password}
            onChange={handleSignUpChange}
          />
          <button type="submit" className="bg-red-500">Sign Up</button>

          <div className="social-container cursor-pointer">
            <div  onClick={SignInWithGoogle}>
          <span className="relative bottom-2 font-bold">Sign In with</span>
          <a  className="social"><FcGoogle className="w-6 h-6"/></a>
          </div>
          </div>
          
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleSignInSubmit}>
          <h1>Sign in</h1>
                    <input
            type="email"
            name="email"
            placeholder="Email"
            value={signInForm.email}
            onChange={handleSignInChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signInForm.password}
            onChange={handleSignInChange}
          />
          <button type="submit" className="bg-red-500">Sign In</button>
          
          <div className="social-container cursor-pointer">
            <div  onClick={SignInWithGoogle}>
          <span className="relative bottom-2 font-bold">Sign In with</span>
          <a  className="social"><FcGoogle className="w-6 h-6"/></a>
          </div>
          </div>
        </form>
      </div>

      {/* Overlay */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" onClick={handleSignInClick}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="ghost" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
