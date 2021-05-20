import React, { useState, useEffect } from "react";
import { Link , useHistory } from "react-router-dom";
import "css/SignUp.css"
import axios from "axios";

const SignUp = () => {
    // control Link
    const history = useHistory();

    // input
    const [id, setId] = useState(null);
    const [password, setPassword] = useState(null);
    const [nickname, setNickname] = useState(null);

    // check for sign up
    const [checkIdBox, setCheckIdBox] = useState(false);
    const [checkPasswordBox, setCheckPasswordBox] = useState(false);
    const [checkNicknameBox, setCheckNicknameBox] = useState(false);
    // -> set 함수를 호출한 '위치'가 종료되어야만 변수 반영됨, => 렌더링을 다시하기 때문
    const [dimmed, setDimmed] = useState(false);

    if(dimmed){
        document.body.style.overflow = "hidden";
    }else{
        document.body.style.overflow = "unset";
    }

    // useEffect(() => {
    //     console.log("아이디 박스의 내용이 변했네요");
    //     console.log(checkIdBox);
    // },[checkIdBox]);
    
    // useEffect(() => {
    //     console.log("비밀번호 박스의 내용이 변했네요");
    //     console.log(checkPasswordBox);
    // },[checkPasswordBox]);
    
    // useEffect(() => {
    //     console.log("닉네임 박스의 내용이 변했네요");
    //     console.log(checkNicknameBox);
    // },[checkNicknameBox]);

    const changeIdBox = async () => {
        await axios.post('/player/checkid', {
            id:id,
        })
        .then((response) => {
            const idMsg = document.getElementById('id-msg');
            idMsg.style.color = "red";
            setCheckIdBox(false);
            if(response.data == ""){
                if(id == null || id == "") idMsg.innerHTML = "필수 항목입니다.";                    
                else { 
                    idMsg.style.color = "green";
                    idMsg.innerHTML = "사용 가능한 ID입니다";
                    setCheckIdBox(true);
                }
            }
            else idMsg.innerHTML = "이미 사용 중인 ID 입니다";            
            idMsg.style.display ='block';            
        }).catch((error) => {
            console.log(error);
        });
    }

    const changePwBox = () => {
        const pwMsg = document.getElementById('pw-msg');
        pwMsg.style.color = "red";
        setCheckPasswordBox(false);
        if(password == null || password == "") {
            pwMsg.innerHTML = "필수 항목입니다.";
            pwMsg.style.display ='block';
        }
        else {
            pwMsg.innerHTML = ""
            pwMsg.style.display ='none';
            setCheckPasswordBox(true);
        }
    }
    
    const changeNicknameBox = () => {
        const nnMsg = document.getElementById('nn-msg');
        nnMsg.style.color = "red";
        setCheckNicknameBox(false);
        if(nickname == null || nickname == "") {
            nnMsg.innerHTML = "필수 항목입니다.";
            nnMsg.style.display ='block';
        }
        else {
            nnMsg.innerHTML = "";
            nnMsg.style.display = 'none';
            setCheckNicknameBox(true);
        }
    }

    const SignUpBtnOnClick = () => {
        if(checkIdBox && checkPasswordBox && checkNicknameBox){
            alert(`ID : ${id}\nPASSWORD : ${password}\nNICKNAME : ${nickname}\nIs it Correct?`);
            submit();
        }else{
            if(!checkIdBox) alert(`아이디를 확인해주세요.`);
            else if(!checkPasswordBox) alert(`비밀번호는 필수 항목입니다.`);
            else if(!checkNicknameBox) alert(`닉네임은 필수 항목입니다.`);            
            history.push("/login/signup");
        }
    }

    const submit = async () => {
        setDimmed(true);
        await axios.post('/player/signup', {
            id:id,
            password:password,
            nickname:nickname,
        })
        .then((response) => {
            setDimmed(false);
            if(response.status === 200){
                alert(`회원가입이 완료되었습니다.\n로그인페이지로 이동합니다.`);
                history.push("/login");
            }else{
                alert('잠시후 다시 시도하세요.');
                history.push('/');
            }
        })
        .catch((error) => {
            console.log(error)
        });
        console.log("send");
    }

    return (
        <>
        {dimmed && 
            <>
            <div className="pending">
                <h1>캐릭터 생성중...</h1>
            </div>
            </>
        }
        <div className="signup-container">
            <div className="signup-content">
                <h1 style={{textAlign:"center", marginTop:"0", paddingBottom:"10px", fontSize:"48px"}}>WELCOME!</h1>
                <form className="signup-form">
                    <div className="signup-input-groups">
                        <label className="signup-label">ID</label>
                        <span className="signup-input-box">
                            <input className="signup-input for-id" placeholder="ID" onBlur={changeIdBox} onChange={e => setId(e.target.value)} required></input>
                        </span>
                        <span className="error-next-box" id="id-msg"></span>
                        <label className="signup-label">PW</label>
                        <span className="signup-input-box">
                            <input className="signup-input" type="password" placeholder="PW" onBlur={changePwBox} onChange={e => setPassword(e.target.value)} required></input>
                        </span>
                        <span className="error-next-box" id="pw-msg"></span>
                        <label className="signup-label">NICKNAME</label>
                        <span className="signup-input-box">
                            <input className="signup-input" placeholder="NICKNAME" onBlur={changeNicknameBox} onChange={e => setNickname(e.target.value)} required></input>
                        </span>
                        <span className="error-next-box" id="nn-msg"></span>
                    </div>
                    <div className="signup-btn-groups">
                        <button onClick={SignUpBtnOnClick} className="signup-btn">SUBMIT</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default SignUp;