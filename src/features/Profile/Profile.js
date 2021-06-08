import React from 'react';
import {Link} from 'react-router-dom';
import "css/Profile.css";
import { useSelector } from 'react-redux';

const Profile = () => {
    const user = useSelector((state) => state.user.user);
    const userId = user?.id;
    const userNickname = user?.nickname;
    const userIntroduce = user?.introduction;
    const userCoinNum = user?.coin;
   
    return(
        <div className="profile-container">
            <div className="profile-content">
                <h1 style={{textAlign:"center", marginTop:"0", paddingBottom:"50px", fontSize:"48px"}}>USER INFO</h1>           
                <div className="profile-list-groups">   
                    <table>
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
                        <tr>
                            <th><label className="profile-label">COIN AMOUNT</label></th>
                            <td><label className="profile-label" value={userCoinNum}>{userCoinNum}</label></td>
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
