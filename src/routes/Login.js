import React from "react";
import "css/Login.css";
import { Link } from 'react-router-dom';


const Login = () => {
    return (
        <div className="login-container">
            <div className="login-content">
                <h1 style={{textAlign:"center", marginTop:"0", paddingBottom:"10px", fontSize:"48px"}}>LOGIN</h1>
                <form className="login-form">
                    <div className="login-input-groups">
                        <input className="login-input" placeholder="ID"></input>
                        <input className="login-input" placeholder="PW"></input>
                    </div>
                    <div className="login-btn-groups" style={{marginTop:"30px"}}>
                    <Link to="/" style={{ textDecoration: 'none'}}>
                        <button className="login-btn">SIGN IN</button>
                    </Link>
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