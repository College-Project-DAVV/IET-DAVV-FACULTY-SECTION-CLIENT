import React, { useState } from "react";
import styles from "./login.module.scss";
import logo from "../../../assets/collegeLogo.svg";
import userid from "../../../assets/userid.svg";
import password from "../../../assets/password.svg";
import eyeOpen from "../../../assets/eyeOpen.svg";
import eyeClosed from "../../../assets/eyeClosed.svg";
import { Authenticate } from "../../../apis/authentication";
import { Link, useNavigate } from "react-router-dom";
import Loadbar from "../../Loadbar/Loadbar";
const initial = { UserId: "", password: "" };

const Login = ({ setAuthorized }) => {
  const [showpassword, setshowpassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initial);
  const [authorized, setAuth] = useState(true);
  const navigate = useNavigate();
  const setSessionCookie = (username, password) => {
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + 100); // Set expiration to 15 minutes from now
    document.cookie = `pass=${password}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = `username=${username}; expires=${expirationDate.toUTCString()}; path=/`;
  };
  function Toggle() {
    var temp = document.getElementById("typepass");
    if (temp.type === "password") {
      temp.type = "text";
      setshowpassword(true);
    } else {
      temp.type = "password";
      setshowpassword(false);
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    Authenticate(formData.UserId, formData.password)
      .then((response) => {
        setFormData(initial);
        if(response===401){
          setAuth(false);
          setAuthorized(false);
          setLoading(false);
          return;
        }
        if(response.details){
          setAuthorized(true);
          localStorage.setItem("Authorized", true);
          localStorage.setItem("user", JSON.stringify(response.details));
          setAuth(true);
          setAuthorized(true);
          setSessionCookie(formData.UserId,formData.password);
          setLoading(false);
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className={styles.login}>
      <div className={styles.head}>
        <img src={logo} alt="logo" />
        <div className={styles.heading}>WELCOME TO</div>
        <div className={styles.heading} style={{ paddingTop: "0px" }}>
          IET-DAVV FACULTY PORTAL
        </div>
      </div>
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.field}>
          <img src={userid} alt="UserId" />
          <input
            name="UserId"
            placeholder="UserId"
            required
            onChange={handleChange}
            value={formData.UserId}
          />
        </div>
        <div className={styles.field}>
          <img src={password} alt="password" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="typepass"
            onChange={handleChange}
            required
            value={formData.password}
          />
          <img
            src={showpassword ? eyeOpen : eyeClosed}
            alt="eyeopen"
            className={styles.eyeopen}
            onClick={Toggle}
          />
        </div>
        <Link to="/resetpassword" className={styles.forgot}>forgot password?</Link>
        {!authorized && <p className={styles.invalid}>Invalid Credentials!!</p>}
        
        {loading ? <Loadbar /> : <button className={styles.loginbtn}> Log in</button>}
      </form>
      
    </div>
  );
};

export default Login;
