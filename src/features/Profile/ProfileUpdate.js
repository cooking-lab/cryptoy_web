import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import "css/ProfileUpdate.css";
import { useSelector } from 'react-redux';
import axios from 'axios';


const ProfileUpdate = () => {
    const history = useHistory();
    const user = useSelector((state) => state.user.user);
    const [id, setId] = useState(user?.id);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nickname, setNickname] = useState(user?.nickname);
    const [introduction, setIntroductione] = useState(user?.introduction);

    const updateProfile = async(e) => {
        e.preventDefault();
        if(confirmPassword !== password){
            alert("비밀번호를 다시 확인해 주세요.");
        }else{
            let ok = window.confirm(
                `PASSWORD : ${password}\nNICKNAME : ${nickname}\nINTRODUCTION : ${introduction}\nIs it Correct?.`
            )
            if(ok) {
                const data = {
                    id,
                    password,
                    nickname,
                    introduction
                };
                await axios.post('/player/profile/', data)
                .then(res => {
                    if(res.status === 200){
                        alert("변경되었습니다.");
                        window.location.reload();
                    }else{
                        alert("잠시후 다시 시도하세요.");
                        window.location.reload();
                    }
                }).catch((error) => {
                    console.log(error);
                })
            }            
        }
    }

    return (
        <div className="profile-update-container">
            <div className="profile-update-content">
                <h1 style={{ textAlign: "center", marginTop: "0", paddingBottom: "10px", fontSize: "48px" }}>MODIFY INFO</h1>
                <form className="profile-update-form" >
                    <div className="profile-update-groups">
                        <label className="profile-update-label">ID</label>
                        <span className="profile-update-input-box">
                            <input className="profile-update-input" value={user?.id} disabled></input>
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
                            <input className="profile-update-input" value={nickname} onChange={e => setNickname(e.target.value)}></input>
                        </span>
                        <label className="profile-update-label">INTRODUCE</label>
                        <span className="profile-update-input-box">
                            <input className="profile-update-input" placeholder="INTRODUCTION" value={introduction} onChange={e => setIntroductione(e.target.value)}></input>
                        </span>
                        <div className="profile-update-btn-groups">
                            <button onClick={updateProfile} className="profile-update-btn">UPDATE</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProfileUpdate;
