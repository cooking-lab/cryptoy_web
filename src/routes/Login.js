import React, {useState} from "react";
import "css/Login.css";
import { Link, useHistory } from 'react-router-dom';
import axios from "axios"


const Login = () => {
    const history = useHistory();
    const [inputId, setInputId] = useState(null);
    const [inputPassword, setInputPassword] = useState(null);
    
    const login = async () => {
        console.log(inputId);
        console.log(inputPassword);
        if(inputId == "" || inputId == null) alert("ID를 입력해주세요.");
        else if(inputPassword == "" || inputPassword == null) alert("비밀번호를 입력해주세요.");
        else {
            await axios.post('/player/login', {
                id: inputId,
                password: inputPassword
            }).then(response => {
                if (inputId == response.data.id && inputId == response.data.password) history.push("/");
                else {
                    alert(`아이디 혹은 비밀번호가 일치하지 않습니다.`);
                    history.push("/login");
                }
            }).catch(err => { console.log(err) })
        }
        
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <h1 style={{textAlign:"center", marginTop:"0", paddingBottom:"10px", fontSize:"48px"}}>LOGIN</h1>
                <form className="login-form">
                    <div className="login-input-groups">
                        <input className="login-input" placeholder="ID" onChange={e => setInputId(e.target.value)}></input>
                        <input className="login-input" placeholder="PW" onChange={e => setInputPassword(e.target.value)}></input>
                    </div>
                    <div className="login-btn-groups" style={{marginTop:"30px"}}>
                    <button className="login-btn" onClick={login}>SIGN IN</button>
                    <Link to="/login/signup" style={{ textDecoration: 'none'}}>
                        <button className="login-btn">SIGN UP</button>
                    </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;