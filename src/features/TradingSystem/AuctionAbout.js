import React, { useState } from 'react';
import "css/AuctionAbout.css";

const AuctionAbout = () => {
    const [sPrice, setSPrice] = useState(10000);
    return (
        <div className="auction-about-container">
            <div className="auction-content">
                <div className="auction-detail">
                    <div className="auction-head">
                        <div className="character-img">
                        </div>
                        <div className="character-info">
                            <div className="character-name">
                                <h1>gugu kkakka</h1>
                            </div>
                            <div className="character-currentPrice">
                                <h2>현재 가격</h2>
                                <h3>10,000 <span style={{ fontSize: "14px" }}>/ YAM</span></h3>
                            </div>
                            <div className="character-goalPrice">
                                <h2>목표 가격</h2>
                                <h3>20,000 <span style={{ fontSize: "14px" }}>/ YAM</span></h3>
                            </div>

                            <div className="character-buy">
                                <input className="character-setPrice" type="number" value={sPrice} onChange={e => setSPrice(e.target.value)} />
                                <div className="character-buyButton">입찰</div>
                            </div>
                        </div>
                    </div>
                    <div className="auction-body">
                        <div className="owner-info">
                            <h1>Owner</h1>
                            <span>hyunny</span>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuctionAbout;