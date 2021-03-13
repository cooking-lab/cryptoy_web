import React from "react";
import { Link } from "react-router-dom";
import "css/SignUp.css"

const SignUp = () => {
    return (
        <div className="signup-container">
            <div className="signup-content">
                <h1 style={{textAlign:"center", marginTop:"0", paddingBottom:"10px", fontSize:"48px"}}>LOGO IMAGE</h1>
                <form className="signup-form">
                    <div className="signup-input-groups">
                        <label className="signup-label" style={{fontSize:"24px"}} for="id">ID</label>
                        <span className="signup-input-box">
                            <input className="signup-input" placeholder="ID"></input>
                        </span>
                        <label className="signup-label" style={{fontSize:"24px"}} for="id">PW</label>
                        <span className="signup-input-box">
                            <input className="signup-input" placeholder="PW"></input>
                        </span>
                        <label className="signup-label" style={{fontSize:"24px"}} for="id">NICKNAME</label>
                        <span className="signup-input-box">
                            <input className="signup-input" placeholder="NICKNAME"></input>
                        </span>
                    </div>
                    <div className="signup-btn-groups" style={{marginTop:"30px"}}>
                    <Link to="/" style={{ textDecoration: 'none'}}>
                        <button className="signup-btn">SUBMIT</button>
                    </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;