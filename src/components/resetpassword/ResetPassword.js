import React, { useState } from 'react';
import { searchUser } from '../../apis/searchUser';
import { OTP } from "../../apis/OTP"
import NewPassword from './NewPassword';
import styles from './ResetPassword.module.scss';
import reset from '../../assets/resetIcon.svg';
export default function ResetPassword() {
    const [userid, setUserID] = useState(null);
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [verifyotp, setVerify] = useState(null);
    const [auth, setAuth] = useState(false);
    const [code, setCode] = useState(null);
    const [otpSent, setOtpSent] = useState(false);
    const handleInputChange = (event) => {
        setUserID(event.target.value);
    };
    const handleInputChange2 = (event) => {
        setVerify(event.target.value);
    };
    const handleverify = (e, enteredcode) => {
        e.preventDefault();
        if (verifyotp + "" === code + "") {
            console.log("Verified");
            setAuth(true);
        }
        else {
            console.log("Incorrect Code");
        }
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        // // setUserID('');
        setLoading(true);
        searchUser(userid).then((result) => {
            // console.log(result.details.email);
            setEmail(result.details.email);
            setLoading(false);
        })
        

    }
    const sendOTP = (e) => {
        e.preventDefault();
        setLoading(true);
        OTP(email).then((result) => {
            console.log(result.code);
            setCode(result.code);
            setOtpSent(true);
            setLoading(false);
        })

    }
    return (
        <div className={styles.reset}>
            <div className={styles.heading}>
                    <img src={reset} alt='/'/>
                    <div className={styles.head}>Reset Password</div>
            </div>
            {!auth && !email && !otpSent && <form>
            {/* {!auth && <form> */}
                <p>Enter User Id</p>
                <input
                    name="userid"
                    placeholder="Enter User ID here"
                    value={userid || ''}
                    onChange={handleInputChange}
                    disabled={email && true}
                />
                <button onClick={handlesubmit} disabled={email && true}>Submit</button>
            </form>}
            {email && !auth && !otpSent && 
            // {email && 
            <div className={styles.field}>
                <span>Send OTP to email : {email}</span>
                <p>We will send a One Time password to your email which you have to enter here to continue to reset your password.</p>
                <button onClick={sendOTP} disabled={loading} >Send OTP</button>
            </div> 
             }  
            {code && !auth && otpSent &&
            // {code && 
                     <form style={{paddingTop : "1rem"}}>
                        <p>Enter 4-digit OTP code sent to your email</p>
                        <input
                            name="otp"
                            placeholder="Enter OTP here"
                            value={verifyotp || ''}
                            onChange={handleInputChange2}
                        />
                        <button onClick={handleverify} >Verify</button>
                    </form> 
            } 
            {
                auth && 
                <NewPassword userid={userid} />
            }
        </div>
    );
}
