import React, { useEffect, useState } from 'react';
import "css/Detail.css";
import { useDispatch, useSelector } from 'react-redux';
import { selectToyById, updateMarket } from 'features/Toy/ToysSlice';
import { Button, makeStyles, TextField } from '@material-ui/core';
import ToyImage from './ToyImage';
import moment from 'moment';
import Countdown from 'react-countdown';

const AuctionAbout = ({match}) => {
    const dispatch = useDispatch();
    const toyId = match.params.id;
    const toy = useSelector((state) => selectToyById(state, toyId));
    const [sPrice, setSPrice] = useState();
    const [auctionData, setAuctionData] = useState();
    const [deadline, setDeadline] = useState();
    const [isOnTime, seIsOnTime] = useState(true);

    useEffect(() =>{
        setAuctionData(toy?.market);
        setDeadline(moment(toy?.market?.deadline)); 
    }, [toy])

    const renderer = ({days, hours, minutes, seconds, completed }) => {
        if (completed) {
            seIsOnTime(false);
            return <div>종료되었습니다.</div>;
        } else {
            return <div>{days}일 {hours}시 {minutes}분 {seconds}초</div>;
        }
    };

    const BuyOnClick = async() => {
        if(sPrice <= toy?.market?.currentPrice) { alert("현재 가격보다 높은 가격을 불러주세요."); return; }
        
        let ok = window.confirm(`${sPrice}로 입찰하시겠습니까?`);
        if(ok) {
            const data = {
                toyId,
                marketType : "sale",
                currentPrice : parseInt(sPrice),
                currentUser : "admin"
            }
            await dispatch(updateMarket(data))
            .then((res) => {
                if(res.error) {
                    alert("실패하였습니다.");
                    window.location.reload();
                }
                if(res?.payload.status === 200){
                    alert("입찰되었습니다.");
                    window.location.reload();
                    
                }
            });
            
        }
    }
    
    const RentalOnClick = async() => {
        let ok = window.confirm("대여하시겠습니까?");
        if(ok) {
            const data = {
                toyId,
                marketType : "rental",
                rentalUser : "admin"
            }
            await dispatch(updateMarket(data))
            .then(res => {
                if(res.payload.status === 200){
                    alert("장난감을 빌렸습니다! 마이룸에서 확인해 주세요.");
                    window.location.reload();
                }else{
                    alert("실패했습니다.");
                    window.location.reload();
                }
            });
            
        }
    }

    const useStyle = makeStyles({
        textfiled : {
            marginRight : '10px'
        },
        button : {
            padding : "0 30px",
            fontSize : "16px",
            fontWeight : "bold",
            backgroundColor : "#f2b591",
            color : "white",
            border : "none",
            '&:hover': {
                backgroundColor: '#d19c7d',
                borderColor: '#d19c7d',
                boxShadow: 'none',
              },
        },
        rentalButton : {
            padding : "10px 100px",
            fontSize : "16px",
            fontWeight : "bold",
            backgroundColor : "#f2b591",
            color : "white",
            border : "none",
            '&:hover': {
                backgroundColor: '#d19c7d',
                borderColor: '#d19c7d',
                boxShadow: 'none',
              },
        }
    })

    const classes = useStyle();
    
    return (
        <div className="DetailContainer">
            <div className="auction-content">
                <div className="auction-detail">
                    <div className="character-name">
                            {toy?.name}
                    </div>
                    <div className="character-owner">
                            {toy?.ownerId}
                    </div>
                    <div className="auction-head">
                        <div className="character-img">
                            {toy && <ToyImage dna={toy.dna} species={toy.species}/>}
                        </div>
                        <div className="character-info">
                            
                            {auctionData ? 
                                ( auctionData.type === 'sale' ? (
                                <>
                                <div className="character-auctionData">
                                    <div className="character-price character-currentPrice">
                                        <div>현재 가격</div>
                                        <div>{auctionData.currentPrice} <span style={{ fontSize: "16px" }}>YAM</span></div>
                                    </div>
                                    <div className="character-price character-goalPrice">
                                        <div>목표 가격</div>
                                        <div>{auctionData.goalPrice} <span style={{ fontSize: "16px" }}>YAM</span></div>
                                    </div>
                                    <div className="character-currentUser">
                                        <div>가장 높은 가격으로 입찰한 유저</div>
                                        <div>{auctionData.currentUser ? auctionData.currentUser : "첫 입찰자가 되어보세요!"}</div>
                                    </div>
                                </div>
                                    <div className="character-buy">
                                        <TextField
                                            className={classes.textfiled}
                                            id="outlined-basic"  
                                            variant="outlined" 
                                            value={sPrice}
                                            onChange={e => setSPrice(e.target.value)}
                                            disabled={!isOnTime}
                                        />
                                        <Button disabled={!isOnTime} onClick={BuyOnClick} className={classes.button} variant="contained">입찰</Button>
                                    </div>
                                </>
                                ) : (
                                    <>
                                <div className="character-auctionData">
                                    <div className="character-price character-currentPrice">
                                        <div>대여비</div>
                                        <div>{auctionData.initPrice} <span style={{ fontSize: "16px" }}>YAM</span></div>
                                    </div>
                                    <div className="character-price character-goalPrice">
                                        <div>대여 기간</div>
                                        <div>{auctionData.rentalDuration} <span style={{ fontSize: "16px" }}>일</span></div>
                                    </div>
                                    <div className="character-currentUser">
                                        <div>현재 대여중인 플레이어</div>
                                        <div>{auctionData.rentalUser ? auctionData.rentalUser : "대여 가능!"}</div>
                                    </div>
                                </div>
                                    <div className="character-buy">
                                        {auctionData?.isAvailable && isOnTime ? <Button onClick={RentalOnClick} className={classes.rentalButton} variant="contained">지금 대여하기</Button> : <Button disabled className={classes.rentalButton} variant="contained">대여 불가</Button>}
                                    </div>
                                </>
                                )
                            )
                            : <>
                                <div className="character-auctionData">
                                    <div className="nonAuction">
                                        판매중인 장난감이 아닙니다.
                                    </div>
                                </div>
                            </>
                            }
                        </div> 
                    </div>
                    { auctionData &&
                        <div className="left-day">
                            <div>
                                <div>남은 기간</div>   
                                <Countdown date={deadline} renderer={renderer} />
                                {/* <div>{leftDate.day}일 {leftDate.hour}시 {leftDate.minute}분 {leftDate.second}초</div> */}
                            </div>
                        </div>
                    }
                    <div className="auction-body">
                        <div className="toy-info">
                            <h1>장난감 정보</h1>
                            <div>
                                <ul>
                                    <li><span>종족</span> {toy?.species}</li>
                                    <li><span>세대</span> {toy?.generation} Gen</li>
                                    <li><span>성별</span> {toy?.gender}</li>
                                </ul>
                            </div>    
                        </div>
                        <div className="toy-stat">
                            <h1>Stat</h1>
                            <div>toy-stat</div>
                        </div>
                        <div className="toy-family">
                            <h1>Family</h1>
                            <div>toy-stat</div>   
                        </div>      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuctionAbout;