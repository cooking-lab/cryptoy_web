import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from "./Navigation";
import Auction from "routes/Auction";
import Home from "routes/Home";
import Login from "routes/Login";
import SignUp from "features/Login/SignUp";
import AuctionRegister from "routes/AuctionRegister";
import AuctionAbout from "features/TradingSystem/Detail";
import Profile from "features/Profile/Profile";
import ProfileUpdate from "features/Profile/ProfileUpdate";
import Breeding from "features/Toy/Breeding";
import Description from "./Description";

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
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/login/signup' component={SignUp} />
                    <Route exact path='/profile' component={Profile} />
                    <Route exact path='/profile/update' component={ProfileUpdate} />
                    <Route exact path='/breeding' component={Breeding} />
                </Switch>
            </Router>
            <Description />
        </>
    )
}

export default AppRouter;