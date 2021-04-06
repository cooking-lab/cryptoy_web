import React, { useEffect, useState } from "react";
import "css/AuctionRegister.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ToyImage from "features/TradingSystem/ToyImage";
import { useDispatch, useSelector } from "react-redux";
import { selectAllOwnerToys,selectAllOwnerToysNotMarket } from "features/Toy/ToysSlice";
import { addMarket, getMarkets } from "features/TradingSystem/MarketsSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const AuctionRegister = () => {
    const userId = "admin";
    const dispatch = useDispatch();
    const marketStatus = useSelector((state) => state.markets.status);
    const userToys = useSelector((state) => selectAllOwnerToysNotMarket(state, userId));
    const [isSelected, setIsSelected] = useState(false);
    const [isPopUp, setIsPopUp] = useState(false);
    const [active, setActive] = useState("sale");
    const [bPrice, setBPrice] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [deadline, setDeadline] = useState(new Date().toISOString().substring(0, 10));
    const [selectedToy, setSelectedToy] = useState();
    const [marketType, setMarketType] = useState("sale");
    const history = useHistory();

    useEffect(() => {
        if(marketStatus === 'idle')
            dispatch(getMarkets());
    }, [dispatch, marketStatus])

    const selectedBtnOnClick = () =>{
        setIsPopUp(true);
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

                await dispatch(addMarket(data))
                .then((res) => {
                    if(res.payload.status === 200) {
                        alert("등록되었습니다.");
                            
                        history.push('/auction/'+selectedToy.id);
                    }else{
                        alert("등록 실패");
                        history.push('/auction');
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
                    {userToys?.map(toy => {return <div key={toy.id} onClick={() => selectedPopupBtnOnClick(toy)} className="myToyImage"><ToyImage  dna={toy.dna} species={toy.species} /></div>})}
                </div>   
            </div>
            <div className="AuctionRegister-content">
                <div className="register-toy">
                    <div className="selectedToy">
                        { isSelected ? (
                            <div className="myToyImage seletedToyImage"><ToyImage dna={selectedToy?.dna} species={selectedToy?.species} /></div>
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