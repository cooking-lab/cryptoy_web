import React, { useEffect, useState } from 'react';
import "css/Auction.css";
import AuctionItem from 'features/TradingSystem/AuctionItem';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getToys, selectAllFilteredToys, updateFilteredToys } from 'features/Toy/ToysSlice';
import { CircularProgress, makeStyles, Slider } from '@material-ui/core';
// import { getMarkets } from 'features/TradingSystem/MarketsSlice';

const Auction = () => {
    const dispatch = useDispatch();
    let toys = useSelector((state) => state.toys.toys);
    const filteredToys = useSelector(selectAllFilteredToys);
    //const marketStatus = useSelector((state) => state.markets.status);
    const toysStatus = useSelector((state) => state.toys.status);
    const error = useSelector((state) => state.toys.error);
    const [onFilter, setOnFilter] = useState(false);

    if(onFilter) {
        toys = filteredToys;
    }

    useEffect(() => {
        if(toysStatus === 'idle'){
            dispatch(getToys());
        }
    }, [toysStatus, dispatch]);

    let content;
    if(toysStatus === 'loading'){
        content = <div className="loading"><CircularProgress color="secondary" /></div>
    }else if(toysStatus === 'succeeded'){
        console.log(toys);
        content = toys.map(toy => (
             <AuctionItem key={toy.id} item={toy} />
        ));
        
    }else if(toysStatus === 'failed'){
        content = <div>{error}</div>
    };

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
            type : "other",
            name : "other"
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

    const [isSpeciesChecked, setIsSpeciesChecked] = useState({
            'doll' : true,
            'car' : true,
            'robot' : true
        });
    const [isMarketChecked, setIsMarketChecked] = useState({
        'sale' : true,
        'rental' : true,
        'other' : true
    });

    const [filterPrice, setFilterPrice] = useState([0, 10000]);

    const speciesCheckboxOnChange = e => {
        setIsSpeciesChecked({ ...isSpeciesChecked, [e.target.id]: e.target.checked });
    };

    const marketCheckboxOnChange = e => {
        setIsMarketChecked({ ...isMarketChecked, [e.target.id]: e.target.checked });
    };

    const changeColor = (check) => {
        if(check) {
            return "#f2b591";
        }else{
            return "#bfb4b0";
        }
    }

    
    const SPECIES_OPTION = ({type, name}) => {
        return (
            <>
                <input type="checkbox" checked={isSpeciesChecked[type]} id={type} onChange={speciesCheckboxOnChange} />
                <label style={{backgroundColor:changeColor(isSpeciesChecked[type])}} htmlFor={type}>{name}</label>
            </>  
        )
    }

    const MARKET_OPTION = ({type, name}) => {
        return (
            <>
                <input type="checkbox" checked={isMarketChecked[type]} id={type} onChange={marketCheckboxOnChange} />
                <label style={{backgroundColor:changeColor(isMarketChecked[type])}} htmlFor={type}>{name}</label>
            </>  
        )
    }

    const onFilterSubmit = () => {
        let auction_filter = [];
        let species_filter = [];
        AUCTION_TYPE.map(at => {
            if(isMarketChecked[at.type]){
                auction_filter.push(at.type);
            }
        })
        SPECIES_TYPE.map(at => {
            if(isSpeciesChecked[at.type]){
                species_filter.push(at.type);
            }
        })
        const data = {
            auction_filter,
            species_filter,
            filterPrice
        }
        dispatch(updateFilteredToys(data));
        setOnFilter(true);
    }

    const useStyle = makeStyles({
        root : {
            color : "rgb(242, 181, 145)"
        }
    })

    const classes = useStyle();

    const Filter = (
        <>
        <div onClick={onFilterSubmit} className="filter-searchBtn">SEARCH</div>
        <p >&nbsp;</p>
        <div className="filter">
            <div className="filter-item auction-filter">
                <span className="filter-span">Auction Type</span>
                    <section>
                     {AUCTION_TYPE.map(a => { return <MARKET_OPTION key={a.type} {...a}/>})}
                    </section>
            </div>
            <div className="filter-item species-filter">
                <span className="filter-span">Species</span>
                    <section>
                        {SPECIES_TYPE.map(a => { return <SPECIES_OPTION key={a.type} {...a}/>})}
                    </section>
            </div>
            <div className="filter-item price-filter">
                <span className="filter-span">Price : {filterPrice[0]} ~ {filterPrice[1]}</span>
                <Slider
                className={classes.root}
                max={10000}
                min={0}
                step={10}
                value={filterPrice}
                onChange={(e, newValue) => setFilterPrice(newValue)}
                valueLabelDisplay="auto"
                marks={true}
            />
            </div>
        </div>
        </>
    )
    return (
        <div className="auction-container">
            <div className="auction-content">
            {Filter}
            <Link to="/auction/register"><button className="auction-register">REGISTER</button></Link>
                <div className="auction-item-groups">
                    {content}
                </div>
            
            </div>
        </div>
    )
}

export default Auction;