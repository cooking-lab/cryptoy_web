import React, { useEffect, useState } from "react";
import "css/AuctionRegister.css";
import moment from "moment";
import { useHistory } from "react-router-dom";
import ToyImage from "features/TradingSystem/ToyImage";
import { useDispatch, useSelector } from "react-redux";
import { selectAllOwnerToysNotMarket, addMarket } from "features/Toy/ToysSlice";
import { makeStyles, TextField } from "@material-ui/core";
import { getUserToys, getUserToysNotMarket } from "features/Login/UserSlice";
// import { addMarket, getMarkets } from "features/TradingSystem/MarketsSlice";

const AuctionRegister = ({match}) => {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const userToys = useSelector((state) => getUserToysNotMarket(state));
    const [isPopUp, setIsPopUp] = useState(false);
    const [active, setActive] = useState("sale");
    const [bPrice, setBPrice] = useState(null);
    const [minPrice, setMinPrice] = useState(null);
    const [deadline, setDeadline] = useState(moment().format("YYYY-MM-DDTHH:mm"));
    const [selectedToy, setSelectedToy] = useState();
    const [marketType, setMarketType] = useState("sale");

    const history = useHistory();
    const [rentalDuration, setRentalDuration] = useState(null);

    useEffect(() => {
        dispatch(getUserToys(user?.id));
        console.log(userToys);
    }, [user])

    const selectedBtnOnClick = () => {
        setIsPopUp(true);
    }

    const toggle = (position) => {
        if (position !== active) {
            setActive(position);
            setMarketType(position);
        }
    }

    const changeColor = (position) => {
        if (position === active) {
            return "#f2b591";
        }
        return "#bfb4b0"
    }

    const registerBtnOnClick = async () => {
        if (deadline < moment().format('YYYY-MM-DDTHH:mm')){
            alert("종료 날짜는 현재 시간보다 이후로 설정해 주세요.");
            return;
        }
        let data;
        if (marketType === 'sale') {
            if (bPrice) {
                data = {
                    regiNum: new Date().getTime().toString(16),
                    type: marketType,
                    toyId: selectedToy.id,
                    deadline,
                    initPrice: bPrice
                }
            } else {
                alert("필수정보를 입력해주세요.");
                return;
            }
        }
        if (marketType === 'rental') {
            if (bPrice) {
                data = {
                    regiNum: new Date().getTime().toString(16),
                    type: marketType,
                    toyId: selectedToy.id,
                    deadline,
                    initPrice: bPrice,
                }
            } else {
                alert("필수정보를 입력해주세요.");
                return;
            }
        }

        let ok = window.confirm("등록하시겠습니까?");
        if (ok) {
            await dispatch(addMarket(data))
                .then((res) => {
                    console.log(res);
                    if (res.payload.status === 200) {
                        alert("등록되었습니다.");
                        history.push('/auction/' + selectedToy.id);
                    } else {
                        alert("등록 실패");
                        history.push('/auction');
                    }

                })
        }
    }

    const useStyle = makeStyles({
        textfiled: {
            marginRight: "20px"
        }
    });

    const classes = useStyle();


    return (
        <div className="AuctionRegisterContainer">
            <div className={isPopUp ? "seletedPopup display_block" : "seletedPopup display_hidden"}>
            <div onClick={e => setIsPopUp(false)} className="cancel"><i className="fas fa-times"></i></div>
                <div className="myToysList">
                    {userToys?.map(toy => { return <div key={toy.id} onClick={() => {setSelectedToy(toy); setIsPopUp(false);}} className="myToyImage"><ToyImage dna={toy.dna} species={toy.dna.substring(4,7)} /></div> })}
                </div>
            </div>
            <div className="AuctionRegister-content">
                <div className="register-toy">
                    <div className="selectedToy">
                        {selectedToy ? (
                            <div className="myToyImage seletedToyImage"><ToyImage dna={selectedToy.dna} species={selectedToy.dna.substring(4,7)} /></div>
                        ) : (
                            <button onClick={selectedBtnOnClick} className="selectedBtn">Click</button>
                        )}
                    </div>
                    <div className="selectedToy-info">
                        {selectedToy &&
                            <>
                                <h1>{selectedToy._id}</h1>
                                {/* <div className="selectedToy-detailInfo">
                                    detail info
                        </div> */}
                                <div className="choose-input">
                                    <div className="choose-type">
                                        <h3>거래 타입</h3>
                                        <ul>
                                            <li style={{ backgroundColor: changeColor("sale") }} onClick={() => { toggle("sale"); setBPrice(null); setRentalDuration(null);}}>Sale</li>
                                            <li style={{ backgroundColor: changeColor("rental") }} onClick={() => { toggle("rental"); setBPrice(null); setMinPrice(null)}}>Rental</li>
                                        </ul>
                                    </div>
                                    {marketType === 'sale' ? 
                                            <div className="choose-price">
                                            <h3>거래 금액 정보</h3>
                                            <form noValidate autoComplete="off">
                                            <TextField
                                                className={classes.textfiled}
                                                type="number"
                                                step="0.1"
                                                defaultValue={minPrice}
                                                label="판매 가격"    
                                                onChange={e => setBPrice(e.target.value)}
                                            />
                                            {/* <TextField
                                                className={classes.textfiled}
                                                type="number"
                                                step="0.1"
                                                defaultValue={bPrice}

                                                label="바로구매금액"
                                                onChange={e => setBPrice(e.target.value)}
                                            /> */}
                                            </form>
                                        </div>
                                    :
                                            <div className="choose-price">
                                            <h3>대여 정보</h3>
                                            <TextField
                                                className={classes.textfiled}
                                                type="number"
                                                step="0.1"
                                                defaultValue={bPrice}
                                
                                                label="대여 가격"
                                                onChange={e => setBPrice(e.target.value)}
                                            />
                                            {/* <TextField
                                                className={classes.textfiled}
                                                type="number"
                                                defaultValue={rentalDuration}
                                
                                                label="일 수"
                                                onChange={e => setRentalDuration(e.target.value)}
                                            /> */}
                                        </div>
                                        
                                    }
                                    <div className="choose-deadline">
                                        <h3>거래 마감일</h3>
                                        <TextField
                                            id="datetime-local"
                                            type="datetime-local"
                                            defaultValue={deadline}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={e => setDeadline(e.target.value)}
                                        />
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