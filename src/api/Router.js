import reactDom from "react-dom";
import React from "react";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from "./Navigation";
import Home from "routes/Home";
import Auction from "routes/Auction";
import AuctionRegister from "routes/AuctionRegister";
import Detail from "routes/Detail";
import Login from "routes/Login";
import SignUp from "features/Login/SignUp";

const AppRouter = () => {
    return (
        <>
            <Router>
                <Navigation />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/auction' component={Auction} />
                    <Route exact path='/auction/register' component={AuctionRegister} />
                    <Route exact path='/auction/:id' component={Detail} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/login/signup' component={SignUp} />
                </Switch>
            </Router>
            <footer>
            FOOTER
            </footer>
        </>
        
    )
}

export default AppRouter;