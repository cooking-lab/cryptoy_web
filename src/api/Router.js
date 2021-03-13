import reactDom from "react-dom";
import React from "react";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from "./Navigation";
import Auction from "routes/Auction";
import Home from "routes/Home";
import AuctionRegister from "routes/AuctionRegister";
import AuctionAbout from "routes/Detail";

const AppRouter = () => {
    return (
        <>
            <Router>
                <Navigation />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/auction' component={Auction} />
                    <Route exact path='/auction/register' component={AuctionRegister} />
                    <Route exact path='/auction/:id' component={AuctionAbout} />
                </Switch>
            </Router>
            <footer>
            FOOTER
            </footer>
        </>
        
    )
}

export default AppRouter;