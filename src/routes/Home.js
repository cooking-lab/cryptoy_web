import React, { useEffect } from "react";
import Scene from "features/Game/Scene";

const Home = () => {   
    const style = {
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    };

    return (
        <div className="content-container" >
            <div className="content" style={style}>
                <Scene />            
            </div>
        </div>
    )
}

export default Home;