import React, { createRef, useEffect } from "react";
import axios from "axios";
import cookie from "react-cookies";

const Home = () => {
    console.log(cookie.load('connect.sid'));

    const getUser = async () => {
        await axios.get('/player/auth')
            .then(response => {
                console.log(response);
                console.log(response.data);
            }).catch(err => {console.log(err)});
    }

    let canvas;
    let canvasRef = createRef();

    let pos = {
        drawable : false,
        X : -1,
        Y : -1
    }
    let ctx;

    const getPosition = (event) => {
        return {
            X : event.offsetX,
            Y : event.offsetY
        }
    }

    const initDraw = (event) => {
        ctx.beginPath();
        pos = {drawable : true, ...getPosition(event)};
        ctx.moveTo(pos.X, pos.Y);
    }

    const draw = (event) => {
        if(pos.drawable) {
            pos = {...pos, ...getPosition(event)};
            ctx.lineTo(pos.X, pos.Y);
            ctx.stroke();
        }
    }

    const finishDraw = () => {
        pos = {drawable : false, X : -1, Y : -1};
    }

    useEffect(() => {
        getUser();
        
        canvas = canvasRef.current;
        ctx = canvas.getContext("2d");
        canvas.addEventListener("mousedown", initDraw);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", finishDraw);
        canvas.addEventListener("mouseout", finishDraw);
    }, []);

    return (
        <div className="content-container">
            <div className="content">
                <canvas ref={canvasRef} width="400" height={"300"} />
            </div>
        </div>
    )
}

export default Home;