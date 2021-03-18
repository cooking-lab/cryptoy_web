import React, { useState } from 'react';
import "css/Auction.css";
import AuctionItem from 'features/TradingSystem/AuctionItem';
import { Link } from 'react-router-dom';

const Auction = () => {
    const [active, setActive] = useState(null);
    const [isChecked, setIsChecked] = useState([]);
    const [filterPrice, setFilterPrice] = useState(1000);

    const checkboxOnChange = (e) => {
        const id = e.target.id;
        const checked = e.target.checked;
        if(checked){
            setIsChecked([...isChecked, id]);
        }else{
            setIsChecked(isChecked.filter(f => f !== id));
        }
    }

    const AUCTION_TYPE = [
        {
            type : "sale",
            name : "for sale"
        },
        {
            type : "rental",
            name : "rental"
        },
        {
            type : "a_others",
            name : "others"
        }
    ]
    const SPECIES_TYPE = [
        {
            type : "doll",
            name : "Doll"
        },
        {
            type : "car",
            name : "Car"
        },
        {
            type : "robot",
            name : "Robot"
        }
    ]
    const OPTION = ({type, name}) => {
        return (
            <section>
                <input type="checkbox" id={type} onChange={checkboxOnChange} />
                <label for={type}>{name}</label>
            </section>  
        )
    }
    // const toggle = (position) => {
    //     if(position === active){
    //         setActive(null);
    //     }else{
    //         setActive(position);
    //     }
    // }
    // const changeColor = (position) => {
    //     if(position === active){
    //         return "#f2b591";
    //     }
    //     return "#bfb4b0"
    // }
    const Filter = (
        <>
        <div className="filter-searchBtn">SEARCH</div>
        <p >&nbsp;</p>
        <div className="filter">
            <div className="filter-item auction-filter">
                <span className="filter-span">Auction Type</span>
                    {AUCTION_TYPE.map(a => { return <OPTION {...a}/>})}
                {/* <ul>
                    <li style={{backgroundColor:changeColor(0)}} onClick={() => toggle(0)}>for sale</li>
                    <li style={{backgroundColor:changeColor(1)}} onClick={() => toggle(1)}>siring</li>
                    <li style={{backgroundColor:changeColor(2)}} onClick={() => toggle(2)}>others</li>
                </ul> */}
            </div>
            <div className="filter-item species-filter">
                <span className="filter-span">Species</span>
                {/* <ul>
                    <li style={{backgroundColor:changeColor(3)}} onClick={() => toggle(3)}>Doll</li>
                    <li style={{backgroundColor:changeColor(4)}} onClick={() => toggle(4)}>Car</li>
                    <li style={{backgroundColor:changeColor(5)}} onClick={() => toggle(5)}>Robot</li>
                </ul> */}
            </div>
            <div className="filter-item price-filter">
                <span className="filter-span">Price : {filterPrice}</span>
                <input name="slider-fill" className="slider-price" id="slider-fill" type="range" min="0" max="1000" step="10" value={filterPrice} data-highlight="true" onChange={e => setFilterPrice(e.target.value)}/>
            </div>
        </div>
        </>
    )
    return (
        <div className="auction-container">
            <div className="auction-content">
            {Filter}
                <div className="auction-item-groups">
                    <AuctionItem type="1"/>
                    <AuctionItem type="2"/>
                    <AuctionItem type="0"/>
                    <AuctionItem type="1"/>
                    <AuctionItem type="2"/>
                </div>
            <Link to="/auction/register"><button className="auction-register">REGISTER</button></Link>
            </div>
        </div>
    )
}

export default Auction;