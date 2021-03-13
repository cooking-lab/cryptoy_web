import React, { useState } from 'react';
import "css/Auction.css";
import AuctionItem from 'features/TradingSystem/AuctionItem';
import { Link } from 'react-router-dom';

const Auction = () => {
    const [active, setActive] = useState(null);
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
    const Filter = (
        <div className="filter">
            <div className="filter-item auction-filter">
                <span className="filter-span">Auction Type</span>
                <ul>
                    <li style={{backgroundColor:changeColor(0)}} onClick={() => toggle(0)}>for sale</li>
                    <li style={{backgroundColor:changeColor(1)}} onClick={() => toggle(1)}>siring</li>
                    <li style={{backgroundColor:changeColor(2)}} onClick={() => toggle(2)}>others</li>
                </ul>
            </div>
            <div className="filter-item species-filter">
                <span className="filter-span">Species</span>
                <ul>
                    <li style={{backgroundColor:changeColor(3)}} onClick={() => toggle(3)}>Doll</li>
                    <li style={{backgroundColor:changeColor(4)}} onClick={() => toggle(4)}>Car</li>
                    <li style={{backgroundColor:changeColor(5)}} onClick={() => toggle(5)}>Robot</li>
                </ul>
            </div>
            <div className="filter-item price-filter">
                <span className="filter-span">Price</span>
                <label for="slider">Slider:</label>
                <input name="slider" id="slider" type="range" min="0" max="100" value="50"/>
                <label for="slider-fill">Slider with fill and step of 50:</label>
                <input name="slider-fill" id="slider-fill" type="range" min="0" max="1000" step="50" value="60" data-highlight="true"/>
            </div>
        </div>
    )
    return (
        <div className="auction-container">
            <div className="auction-content">
            {Filter}
                <div className="auction-item-groups">
                    <AuctionItem />
                    <AuctionItem />
                    <AuctionItem />
                    <AuctionItem />
                    <AuctionItem />
                </div>
            <Link to="/auction/register"><button className="auction-register">REGISTER</button></Link>
            </div>
        </div>
    )
}

export default Auction;