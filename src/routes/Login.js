import React, {useState, useEffect,  useRef} from "react";
import "css/Login.css";
import { Link, useHistory } from 'react-router-dom';
import axios from "axios"


const Login = () => {
    const [inputId, setInputId] = useState(null);
    const [inputPassword, setInputPassword] = useState(null);

    const idFocus = useRef();

    const getUser = async () => {
        await axios.get('/player/auth')
            .then(response => {
                console.log("로그인페이지");
            }).catch(err => {console.log(err)});
    }

    useEffect(() => {
        getUser();
        idFocus.current.focus();
    }, []);

    const login = async () => {
        if(inputId == "" || inputId == null) alert("ID를 입력해주세요.");
        else if(inputPassword == "" || inputPassword == null) alert("비밀번호를 입력해주세요.");
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <h1 style={{textAlign:"center", marginTop:"0", paddingBottom:"10px", fontSize:"48px"}}>LOGIN</h1>
                <form action="/player/login" method="post" className="login-form">
                    <div className="login-input-groups">
                        <input className="login-input" name="id" ref={idFocus} placeholder="ID" onChange={e => setInputId(e.target.value)}></input>
                        <input type="password" className="login-input" name="password" placeholder="PW" onChange={e => setInputPassword(e.target.value)}></input>
                    </div>
                    <div className="login-btn-groups" style={{marginTop:"30px"}}>
                    <input type="submit" value="SIGN IN" className="login-btn" onClick={login}></input>
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