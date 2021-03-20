import React, {useState} from "react";
import { Link } from "react-router-dom";
import "css/SignUp.css"
import axios from "axios";

const SignUp = () => {
    const [id, setId] = useState(null);
    const [password, setPassword] = useState(null);
    const [nickname, setNickname] = useState(null);

    const changeIdBox = async () => {
        const response = await axios.post('/player/checkid', {
            id:id,
        })
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
        console.log("check ID fin");
    }

    const SignUpBtnOnClick = () => {
        alert(`ID : ${id}
                PASSWORD : ${password}
                NICKNAME : ${nickname}
                Is it Correct?`);
        submit();
    }

    const submit = async () => {
        const response = await axios.post('/player/signup', {
            id:id,
            password:password,
            nickname:nickname,
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error)
        });
        console.log("send");
    }

    return (        
        <div className="signup-container">
            <div className="signup-content">
                <h1 style={{textAlign:"center", marginTop:"0", paddingBottom:"10px", fontSize:"48px"}}>LOGO IMAGE</h1>
                <form className="signup-form">
                    <div className="signup-input-groups">
                        <label className="signup-label">ID</label>
                        <span className="signup-input-box">
                            <input className="signup-input for-id" placeholder="ID" onBlur={changeIdBox} onChange={e => setId(e.target.value)}></input>
                            <span className="error-next-box" id="id-msg"></span>
                        </span>
                        <label className="signup-label">PW</label>
                        <span className="signup-input-box">
                            <input className="signup-input" placeholder="PW" onChange={e => setPassword(e.target.value)}></input>
                        </span>
                        <label className="signup-label">NICKNAME</label>
                        <span className="signup-input-box">
                            <input className="signup-input" placeholder="NICKNAME" onChange={e => setNickname(e.target.value)}></input>
                        </span>
                    </div>
                    <div className="signup-btn-groups">
                    <Link to="/" style={{ textDecoration: 'none'}}>
                        <button onClick={SignUpBtnOnClick} className="signup-btn">SUBMIT</button>
                    </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;