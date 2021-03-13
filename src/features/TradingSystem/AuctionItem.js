import React from "react";
import {Link} from "react-router-dom";
const AuctionItem = () => {
    const dirpath = "/img/char_robot";
    return (
       <div className="auction-item">
            <Link to="auction/1">
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
            <div className="item-info">
                <span>item info</span>
            </div> 
            </Link>
        </div>
       
    )
}

export default AuctionItem;