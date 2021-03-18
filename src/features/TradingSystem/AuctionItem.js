import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
const AuctionItem = ({type}) => {
    const dirpath = "/img/char_robot";
    const [auctionType, setAuctionType] = useState(null);
    const [auctionTypeClass, setAuctionTypeClass] = useState(null);
    const auction_type_class = () => {
        switch (type) {
            case "1" : setAuctionType("ON SALE"); return "type_sale";
            case "2" : setAuctionType("RENTAL"); return "type_rental";
            case "0" : return "";
        }
    }

    useEffect(() => {
        setAuctionTypeClass(auction_type_class());
    })
    return (
        <Link to="auction/1"> 
            <div className="auction-item">
                    {auctionType && (
                        <div className={`item-type ${auctionTypeClass}`}>
                        <span className>{auctionType}</span>
                        </div>
                    )
                    }
                <div className="item-img">
                    <img src={`${dirpath}/body/body_color.png`} />
                    <img src={`${dirpath}/body/body_shadow.png`}/>
                    <img src={`${dirpath}/body/body_line.png`} />
                    <img src={`${dirpath}/eyes/000.png`} />
                    <img src={`${dirpath}/mat1/0110.png`} />
                    <img src={`${dirpath}/mat2/0010.png`} />
                    <img src={`${dirpath}/mat3/0110.png`} />
                    <img src={`${dirpath}/nose_mouth/000.png`} />
                </div>
            </div>   
            <div className="item-info">
                    <div className="item-name-price">
                        <h3>gugu kkakka</h3>
                        <h3>200 YAM</h3>
                    </div>
                    <div className="dashed"></div>
                    <div className="item-detail">
                        <h4>#0Gen</h4>
                        <h4>#FEMALE</h4>
                        <h4></h4>
                    </div>
                </div> 
        </Link>
       
    )
}

export default AuctionItem;