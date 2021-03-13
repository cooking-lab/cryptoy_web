import React, { useState } from "react";
import "css/AuctionRegister.css";
import { Redirect, useHistory } from "react-router-dom";

const AuctionRegister = () => {
    const [isSelected, setIsSelected] = useState(false);
    const [isPopUp, setIsPopUp] = useState(false);
    const [active, setActive] = useState(null);
    const [bPrice, setBPrice] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [deadline, setDeadline] = useState(new Date().toISOString().substring(0, 10));
    const history = useHistory();


    const selectedBtnOnClick = () =>{
        setIsPopUp(true);
    }

    const selectedPopupBtnOnClick = () => {
        setIsSelected(true);
        setIsPopUp(false);
    }

    const toggle = (position) => {
        if(position === active){
            // 지금 액티브 되어있다면
            setActive(null);
        }else{
            setActive(position);
        }
    }
    const changeColor = (position) => {
        if(position === active){
            return "#f2b591";
        }
        return "#bfb4b0"
    }

    const item = {
        name : "gugu kkakka",
        gen : 0,
        createdAt : "2021-03-11"
    }

    const registerBtnOnClick = () => {
        if(deadline < new Date().toISOString().substring(0, 10)){
            alert("종료 시점은 현재 날짜 이후만 가능합니다.");
            return;
        }
        if(bPrice && minPrice) {
            let ok = window.confirm("등록하시겠습니까?");
            if(ok) {
                alert("등록되었습니다.");
                history.push('/auction/:id');
            }
        }else{
            alert("필요한 정보를 입력해주세요.");
        }
    }

    return (
        <div className="AuctionRegisterContainer">
            <div className={isPopUp ? "seletedPopup display_block" : "seletedPopup display_hidden" }>
                <button onClick={selectedPopupBtnOnClick} className="selectedPopup-button">SELECT</button>
            </div>
            <div className="AuctionRegister-content">
                <div className="register-toy">
                    <div className="selectedToy">
                        { isSelected ? (
                            <h3>Toy Picture</h3>
                        ) : (
                            <button onClick={selectedBtnOnClick} className="selectedBtn">Click</button>
                        )}
                    </div>
                    <div className="selectedToy-info">
                        { isSelected && 
                        <>
                        <h1>{item.name}</h1>
                        <div className="selectedToy-detailInfo">
                            detail info
                        </div>
                        <div className="choose-input">
                            <div className="choose-type">
                                <h3>Register Type</h3>
                                <ul>
                                    <li style={{backgroundColor:changeColor(0)}} onClick={() => toggle(0)}>Sale</li>
                                    <li style={{backgroundColor:changeColor(1)}} onClick={() => toggle(1)}>Rental</li>
                                </ul>
                            </div>
                            <div className="choose-price">
                                <h3>Register Price</h3>
                                <input type="number" value={minPrice} placeholder="최저매각가격" onChange={e=> setMinPrice(e.target.value)}/>
                                <input type="number" value={bPrice} placeholder="바로구매가격" onChange={e=> setBPrice(e.target.value)} />
                            </div>
                            <div className="choose-deadline">
                                <h3>Register Deadline</h3>
                                <input type="date" value={deadline} onChange={e=> setDeadline(e.target.value)}/>
                            </div>
                        </div></>}

                    </div>

                </div>
                <button onClick={registerBtnOnClick} className="registerBtn">REGISTER</button>
            </div>
        </div>
    )
}

export default AuctionRegister; 