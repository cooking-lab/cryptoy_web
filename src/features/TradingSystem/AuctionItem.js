import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
const AuctionItem = ({type, name, gene}) => {
    const dirpath = "/img/char_robot";
    const [auctionType, setAuctionType] = useState(null);
    const [auctionTypeClass, setAuctionTypeClass] = useState(null);
    
    const auction_type_class = () => {
        switch (type) {
            case "sale" : setAuctionType("ON SALE"); return "type_sale";
            case "rental" : setAuctionType("RENTAL"); return "type_rental";
            case "" : return "";
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
                    <img src={`${dirpath}/eyes/${gene.eyes}.png`} />
                    <img src={`${dirpath}/mat1/${gene.mat1}.png`} />
                    <img src={`${dirpath}/mat2/${gene.mat2}.png`} />
                    <img src={`${dirpath}/mat3/${gene.mat3}.png`} />
                    <img src={`${dirpath}/nose_mouth/${gene.nose_mouth}.png`} />
                </div>
            </div>   
            <div className="item-info">
                    <div className="item-name-price">
                        <h3>{name}</h3>
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