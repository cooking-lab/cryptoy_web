import React, {useState} from "react";
import { Link } from "react-router-dom";
import "css/SignUp.css"
import axios from "axios";

const SignUp = () => {
    const [ID, setID] = useState(null);
    const [password, setPassword] = useState(null);
    const [nickname, setNickname] = useState(null);
    const SignUpBtnOnClick = () => {
        alert(`ID : ${ID}
                PASSWORD : ${password}
                NICKNAME : ${nickname}
                Is it Correct?`);
        submit();
    }

    const submit = async () => {
        // add condition for submit (restrict ID, PW)
        // const client = axios.create();    
        const response = await axios.post('/api', {
            ID:ID,
            PASSWORD:password,
            NICKNAME:nickname,
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
                            <input className="signup-input" placeholder="ID" onChange={e => setID(e.target.value)}></input>
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