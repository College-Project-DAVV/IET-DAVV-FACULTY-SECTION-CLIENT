import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import styles from "./login.module.scss";
// import logo from "../../assets/logo2.svg";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [isLoginUnsucessfull, setLoginStatus] = useState(false);
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
 
  const redirectToExternalUrl = () => {
    window.location.href =
      `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/admin.directory.user https://www.googleapis.com/auth/admin.directory.user.readonly https://www.googleapis.com/auth/classroom.courseworkmaterials https://www.googleapis.com/auth/classroom.topics.readonly https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.rosters https://www.googleapis.com/auth/classroom.coursework.students.readonly https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/classroom.profile.emails https://www.googleapis.com/auth/classroom.profile.photos https://www.googleapis.com/auth/classroom.courses&access_type=offline&redirect_uri=${REDIRECT_URI}&response_type=code&client_id=${CLIENT_ID}`;
  };
  const generateToken = (code) => {
    if (!code) return "NAN";
    console.log(code);
    const url = `${SERVER_BASE_URL}/googleAuth?code=${code}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        localStorage.setItem("UserToken", JSON.stringify(data));
        console.log(data);
        navigate("/search");
      })
      .catch((error) => {
        setLoginStatus(true);
        // navigate("/dashboard")
        alert("Google Login Failed. Please Try Again")
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const codeValue = url.searchParams.get("code");
    const decodedCodeValue = decodeURIComponent(codeValue);
    if (decodedCodeValue) {
      setCode(decodedCodeValue);
      generateToken(decodedCodeValue);
      if (localStorage.getItem("UserToken")) {
        navigate("/search");
      }
    }
  }, [code,navigate]);
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginText}>LOGIN</div>
      <div className={styles.loginContent}>
        <p>IET-DAVV</p>
        <div className={styles.GoogleLogin}>
          <GoogleLogin
            color="primary"
            fullWidth="true"
            shape="pill"
            variant="contained"
            size="large"
            onSuccess={(credentialResponse) => {
              var decoded = jwt_decode(credentialResponse.credential);
              const result = {
                result: decoded,
                token: credentialResponse.credential,
              };
              localStorage.setItem("profile", JSON.stringify(result));
              if (result) {
                redirectToExternalUrl();
              }
            }}
            cookiePolicy="single_host_origin"
            onError={() => {
              setLoginStatus(true);
              console.log("Login Failed");
            }}
          />
        </div>
        {isLoginUnsucessfull && (
          <p className={styles.loginUnsucess}>Login unsuccessful! Try Again.</p>
        )}
      </div>
    </div>
  );
};
export default Login;