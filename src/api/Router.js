import reactDom from "react-dom";
import React from "react";
import { HashRouter as Router, Route } from 'react-router-dom';
import Navigation from "./Navigation";
import Auction from "routes/Auction";
import Home from "routes/Home";
import Login from "routes/Login";
import AuctionAbout from "features/TradingSystem/AuctionAbout";
import SignUp from "features/Login/SignUp";


const AppRouter = () => {
    return (
        <>
            <Router>
                <Navigation />
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/auction'>
                    <Auction />
                </Route>
                <Route exact path='/auction/:id'>
                    <AuctionAbout />
                </Route>
                <Route exact path='/login'>
                    <Login />
                </Route>
                <Route exact path='/login/signup'>
                    <SignUp />
                </Route>
            </Router>
            <footer>
            FOOTER
            </footer>
        </>
        
    )
}

export default AppRouter;