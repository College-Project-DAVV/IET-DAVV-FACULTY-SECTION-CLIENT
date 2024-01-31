import React, { useState } from 'react'
import { changepassword } from '../../apis/changepassword';
import { useNavigate } from 'react-router-dom';
export default function NewPassword({ userid }) {
    const navigate = useNavigate();
    const [password, setPassword] = useState(null);
    const [confirmpassword, setConfirm] = useState(null);
    const handleInputChange = (event) => {
        setPassword(event.target.value);
    };
    const handleInputChange2 = (event) => {
        setConfirm(event.target.value);
    };
    const handlesubmit = (e) => {
        e.preventDefault();
        if (password !== confirmpassword) return;
        changepassword(userid, password).then((result) => {
            if (result === 401) {
                console.log("Unable to change password");
            }
            else {
                console.log("Password changed successfully");
                navigate("/");
            }
        })
    }
    if (userid === null) {
        return;
    }
    return (
        <div>
            <form>
                <p>Enter New Password</p>
                <input name='newpassword' value={password} onChange={handleInputChange} />
                <p>Confirm Password</p>
                <input name='newpasswordconfirm' value={confirmpassword} onChange={handleInputChange2} />
                <button onClick={handlesubmit}>Submit</button>
            </form>
        </div>
    )
}
