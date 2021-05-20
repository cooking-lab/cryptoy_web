import axios from "axios";
import ToyImage from "features/TradingSystem/ToyImage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllOwnerToysNotMarket, selectToyById, breeding } from "./ToysSlice";
import { getToys } from "./ToysSlice";
import "css/Breeding.css";

const Breeding = () => {
    const userId = useSelector((state) => state.user.user?.id);
    const dispatch = useDispatch();
    const toys = useSelector((state) => selectAllOwnerToysNotMarket(state, userId));
    const [papaId, setPapaId] = useState();
    const [mamaId, setMamaId] = useState();
    const [babyId, setBabyId] = useState();
    const papaToy = useSelector(state => selectToyById(state, papaId));
    const mamaToy = useSelector(state => selectToyById(state, mamaId));
    const babyToy = useSelector(state => selectToyById(state, babyId));
    const breedingStatus = useSelector(state => state.toys.breedingStatus);
    const breedingError = useSelector(state => state.toys.error);

    let content;
    if(breedingStatus === 'loading'){
        content = <div className="loading">Loading...</div>
    }else if(breedingStatus === 'succeeded'){
        content = babyToy ? <ToyImage dna={babyToy.dna} species={babyToy.species}/> : null;
    }else if(breedingStatus === 'failed') {
        content = breedingError;
    }
    // else if(toysStatus === 'failed'){
    //     content = <div>{error}</div>
    // };
    useEffect(() => {
        dispatch(getToys());
    }, [])

    const breedingOnClick = async(e) => {
        e.preventDefault();
        await dispatch(breeding({mamaId, papaId, userId}))
        .then(res => {
            console.log(res.payload);
            const resStatus = res.payload.status;
            if(resStatus === 200) {
                alert("교배 성공");
                setBabyId(res.payload.toy.id);
            }else{
                alert(res.payload.error);
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <>
        <div>
            {toys?.map(toy => {
                return <p>{toy.species} ( {toy.gender} ) : {toy.id}</p>
            })}
        </div>
        <div>
            <input type="text" placeholder="papaId" value={papaId} onChange={e => setPapaId(e.target.value)} />
            <input type="text" placeholder="mamaId" value={mamaId} onChange={e => setMamaId(e.target.value)} />
            <button onClick={breedingOnClick}>교배하기</button>
        </div>
        <div className="breedingImage">
            <div>
               {papaToy && <ToyImage dna={papaToy.dna} species={papaToy.species}/>}
            </div>
            <div>
               {mamaToy && <ToyImage dna={mamaToy.dna} species={mamaToy.species}/>}            
            </div>
            <div>
                {content}
            </div>
        </div>
        </>
    )
}

export default Breeding;