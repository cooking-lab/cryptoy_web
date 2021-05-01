import React, { useEffect, useState } from 'react';
import "css/Detail.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateMarket } from 'features/Toy/ToysSlice';
import { Button, CircularProgress, makeStyles, TextField } from '@material-ui/core';
import ToyImage from './ToyImage';
import Countdown from 'react-countdown';
import { getToy } from 'features/Toy/ToySlice';
import axios from 'axios';

const AuctionAbout = ({match}) => {
    const dispatch = useDispatch();
    const toyId = match.params.id;
    const toyStatus = useSelector((state) => state.toy.status);
    const toy = useSelector((state) => state.toy.toy);
    const [mama, setMama] = useState();
    const [papa, setPapa] = useState();
    const [sPrice, setSPrice] = useState();
    const [isOnTime, seIsOnTime] = useState(true);

    useEffect( () => {
        dispatch(getToy(toyId))
        .then(async(res) => {
            if(res.payload.mamaId !== ""){
                await axios.get('/toys/'+res.payload.mamaId)
                .then(res => {
                    console.log(res.data);
                    setMama(res.data)});
                await axios.get('/toys/'+res.payload.papaId)
                .then(res => setPapa(res.data));
            }else {
                setMama("none");
                setPapa("none");
            }

        });
    }, [])
    
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

    const anotherDetail = (parentId) => {
        window.location.href = "/auction/"+parentId;
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
            { toyStatus === 'loading' ? (
                <div className="loading">
                <CircularProgress color="secondary" />
                </div>
            ) : (
                <>
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
                        
                        {toy?.market ? 
                            <>
                            <div className="character-info">
                                { toy.market.type === 'sale' ? (
                                <>
                                <div className="character-auctionData">
                                    <div className="character-price character-currentPrice">
                                        <div>현재 가격</div>
                                        <div>{toy?.market.currentPrice} <span style={{ fontSize: "16px" }}>YAM</span></div>
                                    </div>
                                    <div className="character-price character-goalPrice">
                                        <div>목표 가격</div>
                                        <div>{toy?.market.goalPrice} <span style={{ fontSize: "16px" }}>YAM</span></div>
                                    </div>
                                    <div className="character-currentUser">
                                        <div>가장 높은 가격으로 입찰한 유저</div>
                                        <div>{toy?.market.currentUser ? toy?.market.currentUser : "첫 입찰자가 되어보세요!"}</div>
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
                                        <div>{toy?.market.initPrice} <span style={{ fontSize: "16px" }}>YAM</span></div>
                                    </div>
                                    <div className="character-price character-goalPrice">
                                        <div>대여 기간</div>
                                        <div>{toy?.market.rentalDuration} <span style={{ fontSize: "16px" }}>일</span></div>
                                    </div>
                                    <div className="character-currentUser">
                                        <div>현재 대여중인 플레이어</div>
                                        <div>{toy?.market.rentalUser ? toy?.market.rentalUser : "대여 가능!"}</div>
                                    </div>
                                </div>
                                    <div className="character-buy">
                                        {toy?.market?.isAvailable && isOnTime ? <Button onClick={RentalOnClick} className={classes.rentalButton} variant="contained">지금 대여하기</Button> : <Button disabled className={classes.rentalButton} variant="contained">대여 불가</Button>}
                                    </div>
                                </>
                                
                                )
                                }
                                </div>
                            </>
                            : 
                            <>
                            <div className="character-info">
                                <div className="character-auctionData">
                                    <div className="nonAuction">
                                        판매중인 장난감이 아닙니다.
                                    </div>
                                </div>
                            </div>
                            </>
                        }
                        
                    </div>
                    {toy?.market && (
                    <div className="left-day">
                        <div>
                            <div>남은 기간</div>   
                            <Countdown date={toy?.market.deadline} renderer={renderer} />
                        </div>
                    </div>
                    )}
                    
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
                            <div className="family">
                        
                            { mama ? (
                                <>
                                { mama === "none" ? (
                                    <>
                                    </>
                                ) : (
                                    <div onClick={e => anotherDetail(mama.id)} className="family-img">
                                    <ToyImage dna={mama.dna} species={mama.species}/>                       
                                    </div>
                                )
                                }
                                </>
                            )
                            : (
                                <div className="loading">
                                <CircularProgress color="secondary" />
                                </div>
                                )
                            }
                            { papa ? (
                                <>
                                { papa === "none" ? (
                                    <>
                                    </>
                                ) : (
                                    <div onClick={e => anotherDetail(papa.id)} className="family-img">
                                    <ToyImage dna={papa.dna} species={papa.species}/>                           
                                    </div>
                                )
                                }
                                </>
                            )
                            : (
                                <div className="loading">
                                <CircularProgress color="secondary" />
                                </div>
                                )
                            }
                            </div>
                        </div>      
                    </div>
                </div>
                </>
                )
            }
            </div>
        </div>
    )
}

export default AuctionAbout;