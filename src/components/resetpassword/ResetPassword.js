import React, { useState } from 'react';
import { searchUser } from '../../apis/searchUser';
import { OTP } from "../../apis/OTP"
import NewPassword from './NewPassword';
export default function ResetPassword() {
    const [userid, setUserID] = useState(null);
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [verifyotp, setVerify] = useState(null);
    const [auth, setAuth] = useState(false);
    const [code, setCode] = useState(null);
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
        // setUserID('');
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
            // console.log(result.code);
            setCode(result.code);
            setLoading(false);
        })

    }
    return (
        <div>
            {!auth && <form>
                <p>User Id</p>
                <input
                    name="userid"
                    placeholder="userid"
                    value={userid || ''}
                    onChange={handleInputChange}
                    disabled={email && true}
                />
                <button onClick={handlesubmit} disabled={email && true}>Submit</button>
            </form>}
            {email && <div>
                <p>Send OTP to email : {email}</p>
                <button onClick={sendOTP} disabled={loading}>Send OTP</button>
            </div>}
            {code &&
                <div>
                    <form>
                        <p>User Id</p>
                        <input
                            name="otp"
                            placeholder="enter 4-digit code"
                            value={verifyotp || ''}
                            onChange={handleInputChange2}
                        />
                        <button onClick={handleverify} >Verify</button>
                    </form>
                </div>
            }
            {
                auth && <NewPassword userid={userid} />
            }
        </div>
    );
}
