import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import "css/Profile.css";
import axios from "axios";

const Profile = () => {
    const [userId, setUserId] = useState("USER_ID");
    const [userNickname, setUserNickname] = useState("USER_NICKNAME");
    const [userIntroduce, setUserIntroduce] = useState("USER_INTRODUCE");    

    const test1 = async () => {
        await axios.get('/api').then((response) => {
            console.log("GOOD CALL TEST1");
        }).catch((err) => {console.log(err)});
    }

    const test2 = async () => {
        await axios.get('/api').then((response) => {
            console.log("GOOD CALL TEST2");
        }).catch((err) => {console.log(err)});
    }

    return(
        <div className="profile-container">
            <div className="profile-content">
                <h1 style={{textAlign:"center", marginTop:"0", paddingBottom:"50px", fontSize:"48px"}}>USER INFO</h1>           
                <div className="profile-list-groups">   
                    <table>
                        <button onClick={test1}>DB1에 저장하기</button>
                        <button onClick={test2}>DB2에 저장하기</button>
                        <tr>
                            <th><label className="profile-label">ID</label></th>
                            <td><label className="profile-label" value={userId}>{userId}</label></td>
                        </tr>
                        <tr>
                            <th><label className="profile-label">NICKNAME</label></th>
                            <td><label className="profile-label" value={userNickname}>{userNickname}</label></td>
                        </tr>
                        <tr>
                            <th><label className="profile-label">INTRODUCE</label></th>
                            <td><label className="profile-label" value={userIntroduce}>{userIntroduce}</label></td>
                        </tr>
                    </table>
                </div>
                <div className="profile-btn-groups" style={{ marginTop: "30px" }}>
                    <Link to="/profile/update" style={{ textDecoration: 'none' }}>
                        <button className="profile-btn">MODIFY</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Profile;
