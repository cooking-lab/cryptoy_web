import React, { useEffect, useState } from 'react';
import "css/Detail.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateMarket } from 'features/Toy/ToysSlice';
import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import ToyImage from './ToyImage';
import Countdown from 'react-countdown';
import axios from 'axios';
import { useHistory } from 'react-router';

const AuctionAbout = ({match}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const toyId = match.params.id;
    const [toy, setToy] = useState();
    const [mama, setMama] = useState();
    const [papa, setPapa] = useState();
    const [isOnTime, seIsOnTime] = useState(true);
    const [dimmed, setDimmed] = useState(false);

    if(dimmed){
        document.body.style.overflow = "hidden";
    }else{
        document.body.style.overflow = "unset";
    }
    
    const getToy = async() => {
        await axios.get('/toys/'+toyId)
        .then(async(res) => {
            if(res.data){
                setToy(res.data);
                if(res.data.mamaId !== ""){
                    await axios.get('/toys/'+res.data.mamaId)
                    .then(res => {
                        setMama(res.data)});
                    await axios.get('/toys/'+res.data.papaId)
                    .then(res => setPapa(res.data));
                }else {
                    setMama("none");
                    setPapa("none");
                }
            }else{
                alert('잘못된 페이지입니다.');
                history.push("/");
            }
        })
    }

    useEffect(() => {
        getToy();
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
        if(user?.coin < toy?.market.goalPrice){
            alert("코인이 부족합니다.");
            window.reload();
        }
        let ok = window.confirm(`바로 구매가 진행됩니다. 진행하시겠습니까?`);
        if(ok) {
            setDimmed(true);
            const data = {
                toyId,
                marketType : "sale",
                price : toy?.market.goalPrice,
                to : user.id,
                from : toy?.ownerId
            };
            await axios.post('/toys/markets/transaction/'+toy?.market.regiNum, data)
            .then(res => {
                setDimmed(false);
                if(res.data){
                    alert("구매가 완료되었습니다. 마이룸에서 확인해주세요!");
                    window.reload();
                }

            });
                // await dispatch(updateMarket(data))
                // .then((res) => {
                //     if(res.error) {
                //         alert("실패하였습니다.");
                //         window.location.reload();
                //     }
                //     if(res?.payload.status === 200){
                //         alert("입찰되었습니다.");
                //         window.location.reload();
                        
                //     }
                // });
        }
        
            
    }
    
    const RentalOnClick = async() => {
        let ok = window.confirm("대여하시겠습니까?");
        if(ok) {
            const data = {
                toyId,
                marketType : "rental",
                price : toy?.market.initPrice,
                to : user.id,
                from : toy?.ownerId
            }
            // 빌리는 로직 추가
            await axios.post('/toys/markets/transaction/'+toy?.market.regiNum, data)
            .then(res => {
                setDimmed(false);
                if(res.data){
                    alert("장난감을 빌렸습니다! 마이룸에서 확인해주세요!");
                    window.location.reload();
                }
            });
            // await dispatch(updateMarket(data))
            // .then(res => {
            //     if(res.payload.status === 200){
            //         alert("장난감을 빌렸습니다! 마이룸에서 확인해 주세요.");
            //         window.location.reload();
            //     }else{
            //         alert("실패했습니다.");
            //         window.location.reload();
            //     }
            // });
            
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
            padding : "10px 150px",
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
        <>
        {dimmed && 
            <>
            <div className="pending">
                <h1>Trading...</h1>
            </div>
            </>
        }
        <div className="DetailContainer">
            <div className="auction-content">
            { !toy ? (
                <div className="loading">
                <CircularProgress color="secondary" />
                </div>
            ) : (
                <>
                <div className="auction-detail">
                    <div className="character-name">
                            {toy?.id}
                    </div>
                    <div className="character-owner">
                            {toy?.ownerId}
                    </div>
                    <div className="auction-head">
                        <div className="character-img">
                            {toy && <ToyImage dna={toy.dna} species={toy.dna.substring(4,7)}/>}
                        </div>
                        
                        {toy?.market ? 
                            <>
                            <div className="character-info">
                                { toy.market.type === 'sale' ? (
                                <>
                                <div className="character-buy">
                                        {/* <TextField
                                            className={classes.textfiled}
                                            id="outlined-basic"  
                                            variant="outlined" 
                                            value={sPrice}
                                            onChange={e => setSPrice(e.target.value)}
                                            disabled={!isOnTime}
                                        /> */}
                                        <Button disabled={!isOnTime} onClick={BuyOnClick} className={classes.rentalButton} variant="contained">바로 구매</Button>
                                    </div>
                                <div className="character-auctionData">
                                    <div className="character-price character-goalPrice">
                                        <div>가격</div>
                                        <div>{toy?.market.goalPrice} <span style={{ fontSize: "16px" }}>YAM</span></div>
                                    </div>
                                    {/* <div className="character-price character-currentPrice">
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
                                    </div> */}
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
        </>
    )
}

export default AuctionAbout;