import React, { useEffect } from "react";
import axios from "axios";

const Home = () => {
    const getUser = async () => {
        console.log("홈");
        await axios.get('/player/auth')
            .then(response => {
                console.log(response);
                console.log(response.data);
            }).catch(err => {console.log(err)});
    }

    useEffect(() => {
        getUser();    
    }, []);

    return (
        <div className="content-container">
            <div className="content">
            SH
            </div>
        </div>
    )
}

export default Home;