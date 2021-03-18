import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import "css/ProfileUpdate.css";

const ProfileUpdate = () => {
    // value name, set function = useState(initial value);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nickName, setNickName] = useState("");
    const [introduce, setIntroduce] = useState("");

    const ProfileUpdateBtnOnClick = () => {
        alert(
            `PASSWORD : ${password}<br>
            NICKNAME : ${nickName}<br>
            INTRODUCE : ${introduce}<br>
            Is it Correct?.`
            );
    }

    return (
        <div className="profile-update-container">
            <div className="profile-update-content">
                <h1 style={{ textAlign: "center", marginTop: "0", paddingBottom: "10px", fontSize: "48px" }}>MODIFY INFO</h1>
                <form className="profile-update-form" >
                    <div className="profile-update-groups">
                        <label className="profile-update-label">ID</label>
                        <span className="profile-update-input-box">
                            <input className="profile-update-input" value="User ID : cant modify" disabled></input>
                        </span>
                        <label className="profile-update-label">PW</label>
                        <span className="profile-update-input-box">
                            <input className="profile-update-input" placeholder="PW : " onChange={e => setPassword(e.target.value)}></input>
                        </span>
                        <label className="profile-update-label">CONFIRM PW </label>
                        <span className="profile-update-input-box">
                            <input className="profile-update-input" placeholder="PW : " onChange={e => setConfirmPassword(e.target.value)}></input>
                        </span>
                        <label className="profile-update-label">NICKNAME</label>
                        <span className="profile-update-input-box">
                            <input className="profile-update-input" placeholder="NICKNAME" onChange={e => setNickName(e.target.value)}></input>
                        </span>
                        <label className="profile-update-label">INTRODUCE</label>
                        <span className="profile-update-input-box">
                            <input className="profile-update-input" placeholder="INTRODUCE" onChange={e => setIntroduce(e.target.value)}></input>
                        </span>
                        <div className="profile-update-btn-groups">
                            <Link to="/home" style={{ textDecoration: 'none' }}>
                                <button onClick={ProfileUpdateBtnOnClick}type="submit" className="profile-update-btn">UPDATE</button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProfileUpdate;