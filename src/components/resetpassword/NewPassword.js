import React, { useState, useEffect } from 'react'
import { changepassword } from '../../apis/changepassword';
import { useNavigate } from 'react-router-dom';
import styles from './NewPassword.module.scss';
import error from '../../assets/error.svg';
import success from '../../assets/success.svg';
import eyeOpen from "../../assets/eyeOpen.svg";
import eyeClosed from "../../assets/eyeClosed.svg";
export default function NewPassword({ userid }) {
    const navigate = useNavigate();
    const [showpassword1, setshowpassword1] = useState(false);
    const [showpassword2, setshowpassword2] = useState(false);
    const [password, setPassword] = useState(null);
    const [confirmpassword, setConfirm] = useState(null);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setsuccessMessage] = useState(null);
    function Toggle1() {
        var temp = document.getElementById("typepass1");
        if (temp.type === "password") {
          temp.type = "text";
          setshowpassword1(true);
        } else {
          temp.type = "password";
          setshowpassword1(false);
        }
      }
    function Toggle2() {
        var temp = document.getElementById("typepass2");
        if (temp.type === "password") {
          temp.type = "text";
          setshowpassword2(true);
        } else {
          temp.type = "password";
          setshowpassword2(false);
        }
      }
    useEffect(() => {
        if (errorMessage) {
            const timeout = setTimeout(() => {
                setErrorMessage(null);
                navigate("/");
            }, 5000);

            return () => clearTimeout(timeout);

        }
        if (successMessage) {
            const timeout = setTimeout(() => {
                setErrorMessage(null);
                navigate("/");
            }, 5000);

            return () => clearTimeout(timeout);

        }
    }, [errorMessage, successMessage]);

    const handleInputChange = (event) => {
        setPassword(event.target.value);
    };
    const handleInputChange2 = (event) => {
        setPasswordsMatch(password === event.target.value);
        setConfirm(event.target.value);

    };
    const handlesubmit = (e) => {
        e.preventDefault();
        if (password !== confirmpassword) {
            setPasswordsMatch(false);
            return;
        }
        setPasswordsMatch(true);
        changepassword(userid, password).then((result) => {
            if (result === 401) {
                setErrorMessage("Unable to change password");
                console.log("Unable to change password");

            }
            else {
                setsuccessMessage(result.message);
                console.log(result);
                console.log("Password changed successfully");

            }
        })
    }
    if (userid === null) {
        return;
    }
    return (
        <div className={styles.newpass}>
            {errorMessage && (
                <div className={styles.errorPopup}>
                    <img src={error} alt='/' />
                    <span>Unable to change password</span>
                </div>
            )}
            {successMessage && (
                <div className={styles.errorPopup}>
                    <img src={success} alt='/' />
                    <span>{successMessage}</span>
                </div>
            )}
            <form>
                <p>Enter New Password</p>
                <div className={styles.field}>
                    <input id="typepass1" name='newpassword' type="password" className={styles.input1} value={password} onChange={handleInputChange} />
                    <img
                      src={showpassword1 ? eyeOpen : eyeClosed}
                      alt="eyeopen"
                      className={styles.eyeopen}
                      onClick={Toggle1}
                    />
                </div>
                <p>Confirm Password</p>
                <div className={styles.field}>
                    <input id="typepass2" type="password" name='newpasswordconfirm' className={styles.input1} value={confirmpassword} onChange={handleInputChange2} />
                    <img
                      src={showpassword2 ? eyeOpen : eyeClosed}
                      alt="eyeopen"
                      className={styles.eyeopen}
                      onClick={Toggle2}
                    />
                </div>
                {!passwordsMatch && <p className={styles.notmatch}>Passwords do not match</p>}
                <button onClick={handlesubmit}>Submit</button>
            </form>
        </div>
    )
}
