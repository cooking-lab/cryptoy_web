import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "css/Scene.css";
import ToyImage from "features/TradingSystem/ToyImage";
import axios from "axios";
import { getUserToys, getUserToysNotMarket, postToy } from "features/Login/UserSlice";

const Scene = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const toysNotMarket = useSelector((state) => getUserToysNotMarket(state));
    const toys = useSelector((state) => state.user.toys);
    const [channel, setChannel] = useState(0); // 0 : mixzone, 1 : shop, 2 : room
    
    // 마이룸에 캐릭터를 띄울 페이지
    const [pageNum, setPageNum] = useState(0);
    const [myRoomCharacterList, setMyRoomCharacterList] = useState();

    const [gameStatus, setGameStatus] = useState('start');
    const [totalScore, setTotalScore] = useState();
    const [ranking, setRanking] = useState(null);
    //const [content, setContent] = useState();
    
    
    useEffect(() => {
        dispatch(getUserToys(user?.id));
    }, [user])
    
    

    useEffect(() => {
        setMyRoomCharacterList(toys.slice(pageNum * 6, (pageNum+1) * 6));
    }, [toys])

    useEffect(() => {
        console.log(pageNum);
        setMyRoomCharacterList(toys.slice(pageNum * 6, (pageNum+1) * 6));
    }, [pageNum])

    useEffect(() => {
        setMyRoomCharacterList(toys.slice(pageNum * 6, (pageNum+1) * 6));
    }, [toys])

    useEffect(() => {
        console.log(pageNum);
        setMyRoomCharacterList(toys.slice(pageNum * 6, (pageNum+1) * 6));
    }, [pageNum])

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
                if(lChar.dna.charAt(2) !== '0') {
                    alert("왼쪽에는 남자를 선택해주세요.");
                    avail = false;
                }
                if(rChar.dna.charAt(2) !== '1') {
                    alert("오른쪽에는 여자를 선택해주세요.");
                    avail = false;
                }
                if(avail) {
                    setDimmed(true);
                    await axios.post("/toys/breeding", {userId : user.id, papaId : lChar.id, mamaId : rChar.id})
                    .then(res => {
                        setDimmed(false);
                        if(res.data.status === 200) {
                            alert("교배가 완료되었습니다.");
                            setBaby(res.data.toy);
                            dispatch(postToy(res.data.toy));
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
        // 게임에 대한 변수
        const [sellFirst, setSellFirst] = useState();
        const [sellSecond, setSellSecond] = useState();
        const [sellThird, setSellThird] = useState();
        const [gameTimer, setGameTimer] = useState(180);
        const [score, setScore] = useState(0);
        const [mission, setMission] = useState();
        const [missionTimer, setMissionTimer] = useState(0);       

        const startBtnOnClick = () => {
            setScore(0);
            setSellFirst(null);
            setSellSecond(null);
            setSellThird(null);
            setGameTimer(180);
            setGameStatus('ongoing');
            setMissionTimer(5);
            initMission();
            setRanking(null);
            setTotalScore(0);
        }

        const chooseAnswer = (dna) => {
            let flag = true;
            if(mission && mission.species === dna.substring(4, 7)) {
                mission.mats.map(mat => {
                    switch(mat.num) {
                        case 1 : {
                            if(mat.mat !== dna.substring(7, 11)){
                              
                                flag = false;
                            }
                            break;
                        }
                        case 2 : {
                            if(mat.mat !== dna.substring(11, 15)) {
                             
                                flag = false;
                            }
                            break;
                        }
                        case 3 : {
                            if(mat.mat !== dna.substring(15, 19)){
                        
                                flag = false;
                            }
                            break;
                        }
                    }
                })
                if(flag) {
                    return true;
                }
            }
            return false;
        }
    
        const checkAnswer = (dna) => {
            if(chooseAnswer(dna)) {
                setScore(prev => prev + mission.mats.length * 10);
                setMissionTimer(5);
                initMission();
            }
        }

        const initMission  = () => {
            const species = ['100', '010', '001'];
            var mat = [null, null, null];
            const sp = species[Math.floor(Math.random() * 3)];
            
            for(var i=0; i<3; i++) {
                var matNum = Math.floor(Math.random() * 3)+1; // 1 ~ 3
                switch (sp) {
                    case '100' : {
                        // doll
                        if(matNum === 1) {
                            mat[matNum-1] = Math.floor(Math.random() * 6).toString(2).padStart(4, '0'); // 0 ~ 5
                        }else if(matNum === 2) {
                            const matLists = ['0000', '0001', '0110', '0111'];
                            mat[matNum-1] = matLists[Math.floor(Math.random() * 4)];
                        }else if(matNum === 3) {
                            mat[matNum-1] = Math.floor(Math.random() * 6).toString(2).padStart(4, '0'); // 0 ~ 5
                        }
                        break;
                    }
                    case '010' : {
                        // robot
                        if(matNum === 1) {
                            mat[matNum-1] = (Math.floor(Math.random() * 5)+6).toString(2).padStart(4, '0'); // 6 ~ 10
                        }else if(matNum === 2) {
                            const matLists = ['0010', '0011', '0100', '0110', '0111'];
                            mat[matNum-1] = matLists[Math.floor(Math.random() * 5)];
                        }else if(matNum === 3) {
                            mat[matNum-1] = (Math.floor(Math.random() * 5)+6).toString(2).padStart(4, '0'); // 6 ~ 10
                        }
                        break;
                    }
                    case '001' : {
                        // car
                        if(matNum === 1) {
                            mat[matNum-1] = (Math.floor(Math.random() * 5)+11).toString(2).padStart(4, '0'); // 11 ~ 15
                        }else if(matNum === 2) {
                            const matLists = ['0101', '0110', '0111'];
                            mat[matNum-1] = matLists[Math.floor(Math.random() * 3)];
                        }else if(matNum === 3) {
                            mat[matNum-1] = (Math.floor(Math.random() * 5)+11).toString(2).padStart(4, '0'); // 11 ~ 15
                        }
                        break;
                    }
                    default : {
                        
                    }
                }
            }
            var cnt = 0;
            for(var i=0; i<3; i++) {
                if(mat[i]) cnt++;
            }
        
            if(cnt > 1) {
                if(Math.floor(Math.random()*2)) {
                    mat[Math.floor(Math.random() * 3)] = null;
                }
            }
            
            let missionData = {
                species : sp,
                mats : []
            };
    
            for(var i=0; i<3; i++) {
                if(mat[i]) {
                    const temp = {
                        num : i+1,
                        mat : mat[i]
                    };
                    missionData.mats.push(temp);
                }
            }
            setMission(missionData);
        }

        const nextMission = () => {
            if(gameStatus === 'ongoing') {
                setGameTimer(prev => prev - 5);
                initMission();
                setMissionTimer(5);
            }
        }

        const postRanking = async() => {
            await axios.get('/game?score='+score)
            .then(res => {
                if(res.status === 200){
                    setRanking(res.data.ranking);
                    setTotalScore(score);
                    console.log("over");
                    setGameStatus('gameover');
                }
            })
        }
    
        useEffect(() => {
            if(gameStatus === 'ongoing' && gameTimer > 0 ) {
                const count = setInterval(() => {
                    setGameTimer(gameTimer - 1);
                }, 1000);
                return () => clearInterval(count);
            }
            if(gameTimer <= 0 && gameStatus === 'ongoing'){
                //setGameStatus('gameover');
                postRanking();
            }
        }, [gameTimer, gameStatus])

        let gameDir;
            if(gameStatus === 'start'){
                gameDir = (<div className="startButton"><p onClick={startBtnOnClick}>START</p></div>);
            }else if(gameStatus === 'ongoing') {
                gameDir = (<div onClick={nextMission} className="missionImgs">
                    {mission && mission.mats?.map(m => {
                        return <img src={`/img/game/chara_${mission.species}/mat${m.num}/${m.mat}.png`} />
                    })}
                </div>)
            }else if(gameStatus === 'rankingLoading') {
                gameDir = (<div className="gameover"></div>)
            }else if(gameStatus === 'gameover') {
                gameDir = (<div className="gameover">
                <p>GAMEOVER</p>
                <p>{totalScore}</p>
                <p>상위 {ranking}%</p>
                <p onClick={e => setGameStatus('start')}>다시하기</p>
            </div>)
            }
            
    
        useEffect(() => {
            if(missionTimer > 0 && gameStatus === 'ongoing') {
                const counter = setInterval(() => {
                    setMissionTimer(missionTimer-1);
                }, 1000);
                return () => clearInterval(counter);
            }
            if(missionTimer === 0 && gameStatus === 'ongoing') {
                if(sellFirst && checkAnswer(sellFirst.dna)){
                    setScore(prev => prev + mission.mats.length * 10);
                }else if(sellSecond && checkAnswer(sellSecond.dna)) {
                    setScore(prev => prev + mission.mats.length * 10);
                }else if(sellThird && checkAnswer(sellThird.dna)) {
                    setScore(prev => prev + mission.mats.length * 10);
                }
                initMission();
                setMissionTimer(5);
            }
        }, [missionTimer])

        return (
            <>
            <div className="basic_bg" style={{backgroundImage:`url("/img/background_shop/bg_shop.png")`, backgroundSize:'cover'}}>
                <img onClick={e=> uiBtnOnClick(0)} className="ui_button ui_button_left" src="/img/background_UI_resized/arrow_mix_left.png" />
                <img onClick={e=> uiBtnOnClick(2)} className="ui_button ui_button_right" src="/img/background_UI_resized/arrow_shelf_right.png" />
                <img className="customer_img" src="/img/background_shop/bg_shop_chara1.png" />
                
                <img onClick={nextMission} className="message_box" src="/img/background_shop/bg_shop_sbubble.png" />
                <img className="bell_img" src="/img/background_shop/bg_shop_bell.png" />
                    {gameDir}
                <div className="gameScore">
                    {score}
                </div>
                <div className="gameTimer">
                    남은 시간 : {gameTimer}
                </div>
                <div className="selling_toys">
                    { select === 1 && <SimpleShelf setSelect={setSelect} setChar={setSellFirst} except={[]}/>}
                    {sellFirst && <div onClick={e => checkAnswer(sellFirst.dna)} className="selling_item_first selling_item">
                        <ToyImage dna={sellFirst.dna} species={sellFirst.dna.substring(4,7)} />
                    </div>}
                    <div onClick={e=> setSelect(1)} className="selling_not_first selling_not">
                        <i  class="fas fa-plus-circle"></i>
                    </div>
                    
                    { select === 2 && <SimpleShelf setSelect={setSelect} setChar={setSellSecond} except={[]}/>}
                    {sellSecond && <div onClick={e => checkAnswer(sellSecond.dna)} className="selling_item_second selling_item">
                        <ToyImage dna={sellSecond.dna} species={sellSecond.dna.substring(4,7)} />
                    </div>}
                    <div onClick={e=> setSelect(2)} className="selling_not_second selling_not">
                        <i  class="fas fa-plus-circle"></i>
                    </div>
                    
                    { select === 3 && <SimpleShelf setSelect={setSelect} setChar={setSellThird} except={[]}/>}
                    {sellThird && <div onClick={e => checkAnswer(sellThird.dna)} className="selling_item_third selling_item">
                        <ToyImage dna={sellThird.dna} species={sellThird.dna.substring(4,7)} />
                    </div>}
                    <div onClick={e=> setSelect(3)} className="selling_not_third selling_not">
                        <i  class="fas fa-plus-circle"></i>
                    </div>
                
                </div>
            </div>
            </>            
        )
    }

    const SimpleShelf = ({setSelect, setChar, except}) => {
        return (
            <>
            <div className="basic_bg simple_shelf" style={{backgroundImage:`url("/img/background_shelf/bg_shelf_final.png")`, backgroundSize:'cover'}} >
                <div className="cancel"><i onClick={e => setSelect(false)} className="fas fa-times"></i></div>
                <div className="chara_item_list">
                    {toysNotMarket?.filter(toy => !except.includes(toy._id)).map(toy => {
                        return <div key={toy.id} onClick={e => {setChar(toy); setSelect(false);}} className="chara_item">
                            <span>{toy.dna.charAt(2) === '0' ? "MALE" : "FEMALE"}</span>
                            <ToyImage dna={toy.dna} species={toy.dna.substring(4,7)}/>
                            </div>
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

        const previousPage = () => {
            if(pageNum - 1 < 0) setPageNum(0);
            else setPageNum(pageNum - 1);
        }

        const nextPage = () => {
            if((pageNum + 1) * 6 < toys.length) setPageNum(pageNum + 1);
            else setPageNum(pageNum);
        }

        return (
            <>
            <div className="basic_bg" style={{backgroundImage:`url("/img/background_shelf/bg_shelf_final.png")`, backgroundSize:'cover'}}>
                <img onClick={e=> uiBtnOnClick(1)} className="ui_button ui_button_left" src="/img/background_UI_resized/arrow_shop_left.png" />
                <img onClick={e=> uiBtnOnClick(0)} className="ui_button ui_button_right" src="/img/background_UI_resized/arrow_mix_right.png" />
                <div className="chara_item_list">
                    {myRoomCharacterList?.map(toy => {
                        return <div onClick={e => moveDetail(toy.id)} key={toy.id} className="chara_item">
                        <ToyImage dna={toy.dna} species={toy.dna.substring(4, 7)}/>
                    </div>  
                    })}
                </div>                
                <button className="myroom_move_btn" id="previous_page" onClick={previousPage}>◀</button>
                <button className="myroom_move_btn" id="next_page" onClick={nextPage}>▶</button>
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
        content  = <h1>로그인 후 사용할 수 있습니다.</h1>;
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