import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import ToyImage from "features/TradingSystem/ToyImage";

const AuctionItem = ({item}) => {
    const [auctionType, setAuctionType] = useState(null);
    const [auctionTypeClass, setAuctionTypeClass] = useState(null);

    const getMarketDB = async(id) => {
        let url = '/toys/market/' + id;
        await axios.get(url)
        .then(res => {
            setAuctionTypeClass(auction_type_class(res.data.type));
        })
    }

    const checkIsOnMarket = () => {
        if(item.market){
            getMarketDB(item.id);
        }
    }
    
    const auction_type_class = (type) => {
        switch (type) {
            case "sale" : setAuctionType("ON SALE"); return "type_sale";
            case "rental" : setAuctionType("RENTAL"); return "type_rental";
            case "" : return "";
        }
    }

    useEffect(() => {
        checkIsOnMarket();
    }, []);

    return (
        <Link to={`auction/${item.id}`}> 
            <div className="auction-item">
                    {auctionType && (
                        <div className={`item-type ${auctionTypeClass}`}>
                        <span className>{auctionType}</span>
                        </div>
                    )
                    }
                <div className="item-img">
                    <ToyImage dna={item.dna} />
                </div>
            </div>   
            <div className="item-info">
                    <div className="item-name-price">
                        <h3>{item.name}</h3>
                        <h3>200 YAM</h3>
                    </div>
                    <div className="dashed"></div>
                    <div className="item-detail">
                        <h4>#{item.generation}Gen</h4>
                        <h4>#{item.gender}</h4>
                        <h4></h4>
                    </div>
                </div> 
        </Link>
       
    )
}

export default AuctionItem;