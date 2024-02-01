import React, { useState, useEffect } from 'react'
import { changepassword } from '../../apis/changepassword';
import { useNavigate } from 'react-router-dom';
import styles from './NewPassword.module.scss';
import error from '../../assets/error.svg';
import success from '../../assets/success.svg';
export default function NewPassword({ userid }) {
    const navigate = useNavigate();
    const [password, setPassword] = useState(null);
    const [confirmpassword, setConfirm] = useState(null);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setsuccessMessage] = useState(null);

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
                setsuccessMessage("Password Changed Successfully");
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
                    <span>Password changed successfully</span>
                </div>
            )}
            <form>
                <p>Enter New Password</p>
                <input name='newpassword' value={password} onChange={handleInputChange} />
                <p>Confirm Password</p>
                <input name='newpasswordconfirm' value={confirmpassword} onChange={handleInputChange2} />
                {!passwordsMatch && <p className={styles.notmatch}>Passwords do not match</p>}
                <button onClick={handlesubmit}>Submit</button>
            </form>
        </div>
    )
}
