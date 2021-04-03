import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import ToyImage from "features/TradingSystem/ToyImage";
import { useDispatch, useSelector } from "react-redux";
import { getMarkets, selectMarketById } from "features/TradingSystem/MarketsSlice";

const AuctionItem = ({item}) => {
    const market = useSelector((state) => selectMarketById(state,item.id));
    let auctionType = "";
    const auction_type_class = (type) => {
        switch (type) {
            case "sale" : auctionType = "ON SALE"; return "type_sale";
            case "rental" : auctionType = "RENTAL"; return "type_rental";
            case "" : return "";
        }
    }
    let auctionTypeClass = auction_type_class(market?.type);
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
                    <ToyImage dna={item.dna} species={item.species} />
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