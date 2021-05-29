import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "css/Scene.css";
import ToyImage from "features/TradingSystem/ToyImage";
import axios from "axios";
import { getUserToys, getUserToysNotMarket } from "features/Login/UserSlice";

const Scene = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const toysNotMarket = useSelector((state) => getUserToysNotMarket(state));
    const toys = useSelector((state) => state.user.toys);
    const [channel, setChannel] = useState(0); // 0 : mixzone, 1 : shop, 2 : room
    const [sellFirst, setSellFirst] = useState();
    const [sellSecond, setSellSecond] = useState();
    const [sellThird, setSellThird] = useState();

    // 게임에 대한 변수
    const [gameStatus, setGameStatus] = useState('start');
    const [timer, setTimer] = useState(0);
    const [score, setScore] = useState(0);

    let gameDir;
    if(gameStatus === 'start'){
        gameDir = <div className="startButton"><p onClick={e => {setGameStatus('ongoing'); setTimer(2);}} >START</p></div>
    }else if(gameStatus === 'ongoing') {
        gameDir = <></>
    }else if(gameStatus === 'gameover') {
        gameDir = <div className="gameover">
            <p>GAMEOVER</p>
            <p>{score}</p>
            <p>상위 1%</p>
            <p onClick={e => setGameStatus('start')}>다시하기</p>
            </div>
    }

    useEffect(() => {
        if(timer > 0) {
            const counter = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
            return () => clearInterval(counter);
        }
        if(timer === 0 && gameStatus === 'ongoing') {
            setGameStatus('gameover');
        }
    }, [timer])

    
    useEffect(() => {
        dispatch(getUserToys(user?.id));
    }, [user])

    const uiBtnOnClick = (ch) => {
        setChannel(ch);
    }

    const MixZone = () => {
        const [lChar, setLChar] = useState();
        const [rChar, setRChar] = useState();
        const [baby, setBaby] = useState();
        const [select, setSelect] = useState(0);
        const [dimmed, setDimmed] = useState(false);

        if(dimmed){
            document.body.style.overflow = "hidden";
        }else{
            document.body.style.overflow = "unset";
        }

        const breedingOnClick = async() => {
            if(lChar && rChar) {
                var avail = true;
                if(lChar.dna.charAt(3) !== '0') {
                    alert("왼쪽에는 남자를 선택해주세요.");
                    avail = false;
                }
                if(rChar.dna.charAt(3) !== '1') {
                    alert("오른쪽에는 여자를 선택해주세요.");
                    avail = false;
                }
                if(avail) {
                    setDimmed(true);
                    await axios.post("/toys/breeding", {userId : user.id, papaId : lChar.id, mamaId : rChar.id})
                    .then(res => {
                        setDimmed(false);
                        if(res.status === 200) {
                            alert("교배가 완료되었습니다.");
                            setBaby(res.data.toy);
                        }else{
                            alert(res.data.error);
                        }
                    })
                }
            }else {
                alert("교배 대상을 선택해주세요.");
            }
        }

        return (
            <>
            {dimmed && 
            <>
            <div className="pending">
                <h1>교배중...</h1>
            </div>
            </>
            }
            <div className="basic_bg" style={{backgroundImage:`url("/img/background_mix/bg_mix.png")`, backgroundSize:'cover'}}>
                <img onClick={e => uiBtnOnClick(2)} className="ui_button ui_button_left" src="/img/background_UI_resized/arrow_shelf_left.png" />
                <img onClick={e => uiBtnOnClick(1)} className="ui_button ui_button_right" src="/img/background_UI_resized/arrow_shop_right.png" />
                <img onClick={breedingOnClick} className="red_button" src="/img/background_mix/bg_mix_btn_normal.png" />
                <div className="left_mixBox mixBox">
                    { select === 1 && <SimpleShelf setSelect={setSelect} setChar={setLChar} except={[rChar?.id]}/>}
                    { lChar ? (
                        <>
                        <div onClick={e => setSelect(1)} className="mixBox_toy_left mixBox_toy">
                            <ToyImage dna={lChar.dna} species={lChar.dna.substring(4,7)} />
                        </div>
                        </>
                    ) :
                        <>
                        <img onClick={e => setSelect(1)} className="star_button star_button_left" src="/img/stars.png" />
                        </>
                    }
                    </div>
                <div className="right_mixBox mixBox">
                    { select === 2 && <SimpleShelf setSelect={setSelect} setChar={setRChar} except={[lChar?.id]}/>}
                    { rChar ? (
                        <>
                        <div onClick={e => setSelect(2)} className="mixBox_toy_right mixBox_toy">
                            <ToyImage dna={rChar.dna} species={rChar.dna.substring(4,7)} />
                        </div>
                        </>
                    ) : 
                    <>
                        <img onClick={e => setSelect(2)} className="star_button star_button_right" src="/img/stars.png" />
                        </>
                    }
                </div>
                <div className="baby_box">
                    { baby && 
                        <ToyImage dna={baby.dna} species={baby.dna.substring(4,7)} />
                    }
                    </div>
            </div>
            </>
        )
    }

    const ShopZone = () => {
        const [select, setSelect] = useState(0);

        return (
            <>
            <div className="basic_bg" style={{backgroundImage:`url("/img/background_shop/bg_shop.png")`, backgroundSize:'cover'}}>
                <img onClick={e=> uiBtnOnClick(0)} className="ui_button ui_button_left" src="/img/background_UI_resized/arrow_mix_left.png" />
                <img onClick={e=> uiBtnOnClick(2)} className="ui_button ui_button_right" src="/img/background_UI_resized/arrow_shelf_right.png" />
                <img className="customer_img" src="/img/background_shop/bg_shop_chara1.png" />
                <img className="message_box" src="/img/background_shop/bg_shop_sbubble.png" />
                <img className="bell_img" src="/img/background_shop/bg_shop_bell.png" />
                {gameDir}
                <div className="gameScore">
                    {score}
                </div>
                <div className="gameTimer">
                    남은 시간 : {timer}
                </div>
                <div className="selling_toys">
                { select === 1 && <SimpleShelf setSelect={setSelect} setChar={setSellFirst} except={[]}/>}
                    {sellFirst ? (
                        <>
                        <div onClick={e=> setSelect(1)} className="selling_item_first selling_item">
                            <ToyImage dna={sellFirst.dna} species={sellFirst.dna.substring(4,7)} />
                        </div>
                        </>
                    ) : (
                        <>
                        <div onClick={e=> setSelect(1)} className="selling_not_first selling_not">
                            <i  class="fas fa-plus-circle"></i>
                        </div>
                        </>
                    )}
                    { select === 2 && <SimpleShelf setSelect={setSelect} setChar={setSellSecond} except={[]}/>}
                    {sellSecond ? (
                        <>
                        <div onClick={e=> setSelect(2)} className="selling_item_second selling_item">
                            <ToyImage dna={sellSecond.dna} species={sellSecond.dna.substring(4,7)} />
                        </div>                        
                        </>
                    ) : (
                        <>
                        <div onClick={e=> setSelect(2)} className="selling_not_second selling_not">
                            <i class="fas fa-plus-circle"></i>
                        </div>
                        </>
                    )}
                    { select === 3 && <SimpleShelf setSelect={setSelect} setChar={setSellThird} except={[]}/>}
                    {sellThird ? (
                        <>
                        <div onClick={e=> setSelect(3)} className="selling_item_third selling_item">
                            <ToyImage dna={sellThird.dna} species={sellThird.dna.substring(4,7)} />
                        </div>                        
                        </>
                    ) : (
                        <>
                        { select === 3 && <SimpleShelf setSelect={setSelect} setChar={setSellThird} except={[]}/>}
                        <div onClick={e=> setSelect(3)} className="selling_not_third selling_not">
                            <i class="fas fa-plus-circle"></i>
                        </div>
                        </>
                    )}
                </div>
            </div>
            </>            
        )
    }

    const SimpleShelf = ({setSelect, setChar, except}) => {
        return (
            <>
            <div className="basic_bg simple_shelf" style={{backgroundImage:`url("/img/background_shelf/bg_shelf_final.png")`, backgroundSize:'cover'}} >
                <div onClick={e => setSelect(false)} className="cancel"><i className="fas fa-times"></i></div>
                <div className="chara_item_list">
                    {toysNotMarket?.filter(toy => !except.includes(toy._id)).map(toy => {
                        return <div key={toy.id} onClick={e => {setChar(toy); setSelect(false);}} className="chara_item"><ToyImage dna={toy.dna} species={toy.dna.substring(4,7)}/></div>
                    })}
                </div>
            </div>
            </>
        )
    }

    const ShelfZone = () => {
        const moveDetail = (toyId) => {
            var ok = window.confirm("해당 캐릭터 페이지로 이동하시겠습니까?");
            if(ok) {
                window.location.href = "/auction/"+toyId;
            }
        }
        return (
            <>
            <div className="basic_bg" style={{backgroundImage:`url("/img/background_shelf/bg_shelf_final.png")`, backgroundSize:'cover'}}>
                <img onClick={e=> uiBtnOnClick(1)} className="ui_button ui_button_left" src="/img/background_UI_resized/arrow_shop_left.png" />
                <img onClick={e=> uiBtnOnClick(0)} className="ui_button ui_button_right" src="/img/background_UI_resized/arrow_mix_right.png" />
                <div className="chara_item_list">
                    {toys?.map(toy => {
                        return <div onClick={e => moveDetail(toy.id)} key={toy.id} className="chara_item"><ToyImage dna={toy.dna} species={toy.dna.substring(4, 7)}/></div>
                    })}
                </div>
                
            </div>
            </>            
        )
    }

    let content;
    if(user){
        if(channel === 0) {
            content = <MixZone />;
        }else if(channel === 1) {
            content = <ShopZone />;
        }else if(channel === 2) {
            content = <ShelfZone />;
        }
    }else {
        content = <h1>로그인 후 사용할 수 있습니다.</h1>
    }
    
    
    return (
        <>
        <div className="SceneContainer" >
            {content}
        </div>
        </>
    )
}

export default Scene;