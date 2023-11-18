import React, {useState} from 'react'
import styles from './login.module.scss'
import logo from '../../../assets/collegeLogo.svg'
import email from '../../../assets/email.svg'
import password from '../../../assets/password.svg'
import eyeOpen from '../../../assets/eyeOpen.svg'
import eyeClosed from '../../../assets/eyeClosed.svg'

const initial = {  email: '', password: ''};

const Login = () => {
  const [showpassword, setshowpassword]=useState(false);
  const [formData,setFormData]=useState(initial);
  const [isLogin,setIsLogin] = useState(false) ;
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
      setIsLogin(true);
    }
    const handleChange=(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value});
    };
  return (
    <div className={styles.login}>
      <div className={styles.head}>
        <img src={logo} alt='logo'/>
        <div className={styles.heading}>WELCOME TO IET- DAVV FACULTY PORTAL</div>
      </div>
      <form className={styles.form} onSubmit={handleLogin}  >
        <div className={styles.field} >
          <img src={email} alt='email'/>
          <input
            type='email'
            name='email'
            placeholder='Email' 
            required
            onChange={handleChange}
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
          />
        <img src={showpassword?eyeOpen:eyeClosed} alt='eyeopen' className={styles.eyeopen} onClick={Toggle}/>
      </div>
      <button className={styles.loginbtn}>{ isLogin ? 'Logging in':' Log in' } </button>
      </form>
    </div>
  )
}

export default Login;
