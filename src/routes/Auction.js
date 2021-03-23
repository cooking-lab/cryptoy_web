import React, { useEffect, useState } from 'react';
import "css/Auction.css";
import AuctionItem from 'features/TradingSystem/AuctionItem';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Auction = () => {
    const [items, setItems] = useState([]);
    const [toys, setToys] = useState([]);
    const [isChecked, setIsChecked] = useState([]);
    const [filterPrice, setFilterPrice] = useState(1000);

    const getAllToys = async()=> (
        await axios.get('/toys')
        .then(res => {
            console.log(res.data);
            setToys(res.data);
        })
    )

    useEffect(() => {
        getAllToys();
    }, []);

    const checkboxOnChange = e => {
        setIsChecked({ ...isChecked, [e.target.id]: e.target.checked });
    };

    useEffect(() => {
        console.log(isChecked);
    }, [isChecked])

    const changeColor = (check) => {
        if(check) {
            return "#f2b591";
        }else{
            return "#bfb4b0";
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
            type : "others",
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
            <>
                <input type="checkbox" checked={isChecked[type]} id={type} onChange={checkboxOnChange} />
                <label style={{backgroundColor:changeColor(isChecked[type])}} for={type}>{name}</label>
            </>  
        )
    }

    const Filter = (
        <>
        <div className="filter-searchBtn">SEARCH</div>
        <p >&nbsp;</p>
        <div className="filter">
            <div className="filter-item auction-filter">
                <span className="filter-span">Auction Type</span>
                    <section>
                     {AUCTION_TYPE.map(a => { return <OPTION {...a}/>})}
                    </section>
            </div>
            <div className="filter-item species-filter">
                <span className="filter-span">Species</span>
                    <section>
                        {SPECIES_TYPE.map(a => { return <OPTION {...a}/>})}
                    </section>
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
                    {toys?.map(i => { return <AuctionItem item={i} />})}
                </div>
            <Link to="/auction/register"><button className="auction-register">REGISTER</button></Link>
            </div>
        </div>
    )
}

export default Auction;