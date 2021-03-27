import React, { useState } from "react";
import "css/AuctionRegister.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ToyImage from "features/TradingSystem/ToyImage";

const AuctionRegister = () => {
    const userId = "admin";
    const [userToys, setUserToys] = useState();
    const [isSelected, setIsSelected] = useState(false);
    const [isPopUp, setIsPopUp] = useState(false);
    const [active, setActive] = useState("sale");
    const [bPrice, setBPrice] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [deadline, setDeadline] = useState(new Date().toISOString().substring(0, 10));
    const [selectedToy, setSelectedToy] = useState();
    const [marketType, setMarketType] = useState("sale");
    const history = useHistory();

    const getUserToys = async() => {
        const url = '/toys/owner/' + userId;
        await axios.get(url)
        .then(res => setUserToys(res.data));
    }

    const selectedBtnOnClick = () =>{
        setIsPopUp(true);
        getUserToys();
    }

    const selectedPopupBtnOnClick = (toy) => {
        setIsSelected(true);
        setIsPopUp(false);
        setSelectedToy(toy);
    }

    const toggle = (position) => {
        if(position !== active){
            setActive(position);
            setMarketType(position);
        }
    }
    const changeColor = (position) => {
        if(position === active){
            return "#f2b591";
        }
        return "#bfb4b0"
    }

    const registerBtnOnClick = async() => {
        if(deadline < new Date().toISOString().substring(0, 10)){
            alert("종료 날짜는 현재 날짜보다 이후로 설정해주세요.");
            return;
        }
        if(bPrice && minPrice) {
            let ok = window.confirm("등록하시겠습니까?");
            if(ok) {
                const data = {
                    regiNum : new Date().getTime().toString(16),
                    type : marketType,
                    toyId : selectedToy.id,
                    deadline,
                    initPrice : minPrice,
                    currentPrice : minPrice,
                    goalPrice : bPrice
                }
                await axios.post('toys/market/register', data)
                .then((res, err) => {
                    if(err) alert("등록 실패");
                    else {
                        console.log(res.data);
                        alert("등록되었습니다.");
                        history.push('/auction/'+selectedToy.id);
                    }
                })
               
            }
        }else{
            alert("필수정보를 입력해주세요.");
        }
    }

    return (
        <div className="AuctionRegisterContainer">
            <div className={isPopUp ? "seletedPopup display_block" : "seletedPopup display_hidden" }>
                <div className="myToysList">
                    {userToys?.map(toy => {return <div onClick={() => selectedPopupBtnOnClick(toy)} className="myToyImage"><ToyImage dna={toy.dna} /></div>})}
                </div>   
            </div>
            <div className="AuctionRegister-content">
                <div className="register-toy">
                    <div className="selectedToy">
                        { isSelected ? (
                            <div className="myToyImage seletedToyImage"><ToyImage dna={selectedToy?.dna} /></div>
                        ) : (
                            <button onClick={selectedBtnOnClick} className="selectedBtn">Click</button>
                        )}
                    </div>
                    <div className="selectedToy-info">
                        { isSelected && 
                        <>
                        <h1>{selectedToy?.name}</h1>
                        <div className="selectedToy-detailInfo">
                            detail info
                        </div>
                        <div className="choose-input">
                            <div className="choose-type">
                                <h3>Register Type</h3>
                                <ul>
                                    <li style={{backgroundColor:changeColor("sale")}} onClick={() => toggle("sale")}>Sale</li>
                                    <li style={{backgroundColor:changeColor("rental")}} onClick={() => toggle("rental")}>Rental</li>
                                </ul>
                            </div>
                            <div className="choose-price">
                                <h3>Register Price</h3>
                                <input type="number" value={minPrice} placeholder="최소매각금액" onChange={e=> setMinPrice(e.target.value)}/>
                                <input type="number" value={bPrice} placeholder="바로구매금액" onChange={e=> setBPrice(e.target.value)} />
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