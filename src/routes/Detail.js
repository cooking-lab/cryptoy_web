import React, { useEffect, useState } from 'react';
import "css/Detail.css";

const AuctionAbout = () => {
    const [sPrice, setSPrice] = useState(10000);
    const [cPrice, setCPrice] = useState(10000);
    const [isOnAuction, setIsOnAuction] = useState(false);
    const [auctionData, setAuctionData] = useState();
    // this is git test
    const BuyOnClick = () => {
        if(sPrice <= cPrice) { alert("현재 가격보다 높은 가격을 불러주세요."); return; }
        
        let ok = window.confirm(`${sPrice}로 입찰하시겠습니까?`);
        if(ok) {
            setCPrice(sPrice);
            alert("입찰되었습니다.");
        }
    }
    
    return (
        <div className="DetailContainer">
            <div className="auction-content">
                <div className="auction-detail">
                    <div className="auction-head">
                        <div className="character-img">
                        </div>
                        <div className="character-info">
                            <div className="character-name">
                                <h1>gugu kkakka</h1>
                            </div>
                            {isOnAuction ? (
                                <>
                                <div className="character-currentPrice">
                                    <h2>현재 가격</h2>
                                    <h3>{auctionData.currentPrice} <span style={{ fontSize: "14px" }}>/ YAM</span></h3>
                                </div>
                                <div className="character-goalPrice">
                                    <h2>목표 가격</h2>
                                    <h3>{auctionData.goalPrice} <span style={{ fontSize: "14px" }}>/ YAM</span></h3>
                                </div>

                                <div className="character-buy">
                                    <input className="character-setPrice" type="number" value={sPrice} onChange={e => setSPrice(e.target.value)} />
                                    <div onClick={BuyOnClick} className="character-buyButton">입찰</div>
                                </div>
                                </>
                            )
                            : <></>
                            }
                        </div>
                        
                    </div>
                    <div className="auction-body">
                        <div className="toy-info">
                            <h1>Infomation</h1>
                            <div>
                            <ul>
                                <li>Robot</li>
                                <li>0 Gen</li>
                                <li>2021-03-11 12:00:01</li>
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