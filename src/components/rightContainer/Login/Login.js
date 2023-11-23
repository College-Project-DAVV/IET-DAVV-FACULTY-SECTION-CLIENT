import React, {useState} from 'react'
import styles from './login.module.scss'
import logo from '../../../assets/collegeLogo.svg'
import email from '../../../assets/email.svg'
import password from '../../../assets/password.svg'
import eyeOpen from '../../../assets/eyeOpen.svg'
import eyeClosed from '../../../assets/eyeClosed.svg'
import { Authenticate } from "../../../apis/authentication"
import { useNavigate } from 'react-router-dom'
const initial = { UserId: '',password: ''};

const Login = ({setAuthorized}) => {
  const [showpassword, setshowpassword]=useState(false);
  const [formData,setFormData]=useState(initial);
  const [authorized,setAuth]=useState(true);
 const navigate = useNavigate();
  function Toggle() {
    var temp = document.getElementById("typepass");
    if (temp.type === "password") {
        temp.type = "text";
        setshowpassword(true);
    }
    else {
        temp.type = "password";
        setshowpassword(false);
    }
    }
    const handleLogin =async (e)=>{
      e.preventDefault();
      Authenticate(formData.UserId,formData.password).then((response)=>{
        if(response.status===401){setAuth(false);console.log("Unauthorized");}
        else if(response.status===200){setAuthorized(true);console.log("authorized");navigate("/dashboard");localStorage.setItem("Authorized",true);}
        else console.log("Internal ServerError");
        setFormData(initial);
      }).catch((err)=>{console.log(err);})
    }
    const handleChange=(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value});
    };
  return (
    <div className={styles.login}>
      <div className={styles.head}>
        <img src={logo} alt='logo'/>
        <div className={styles.heading}>WELCOME TO</div>
        <div className={styles.heading} style={{paddingTop:"0px"}}>IET-DAVV FACULTY PORTAL</div>
      </div>
      <form className={styles.form} onSubmit={handleLogin}  >
        <div className={styles.field} >
          <img src={email} alt='UserId'/>
          <input
            name='UserId'
            placeholder='UserId' 
            required
            onChange={handleChange}
            value={formData.UserId}
          />
        </div> 
        <div className={styles.field} >
        <img src={password} alt='password' />
        <input
          type='password' 
          name='password'
          placeholder='Password'
          id="typepass"
          onChange={handleChange}
          required
          value={formData.password}
          />
        <img src={showpassword?eyeOpen:eyeClosed} alt='eyeopen' className={styles.eyeopen} onClick={Toggle}/>
      </div>
      {!authorized&&<p className={styles.invalid}>Invalid Credentials!!</p>}
      <button className={styles.loginbtn}> Log in</button>
      </form>
    </div>
  )
}

export default Login;
