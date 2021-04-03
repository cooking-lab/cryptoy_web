import React, { useEffect, useState } from "react";

const ToyImage = ({ dna, species }) => {
    const dirpath = `/img/chara_${species}/`;
    const [parsedDNA, setParsedDNA] = useState();
    const [damage, setDamage] = useState(false);

    const dnaParsing = () => {
        if(dna.substring(3,4) === '0'){
            setDamage(true);
        }
        let mat1 = dna.substring(7, 11);
        let mat2 = dna.substring(11, 15);
        let mat3 = dna.substring(15, 19);
        let eyes = dna.substring(19, 22);
        let nose_mouth = dna.substring(46, 49);
        const dnaData = {
            damage,
            mat1,
            mat2,
            mat3,
            eyes,
            nose_mouth
        }
        setParsedDNA(dnaData);
    }

    useEffect(() => {
        dnaParsing();
    }, [])

    return (
        <>
            <img src={`${dirpath}/body/body_color_white.png`} />
            <img src={`${dirpath}/body/body_shape.png`} />
            {damage ? <img src={`${dirpath}/body/damage.png`} /> : null}
            <img src={`${dirpath}/eyes/${parsedDNA?.eyes}.png`} />
            <img src={`${dirpath}/mat1/${parsedDNA?.mat1}.png`} />
            <img src={`${dirpath}/mat2/${parsedDNA?.mat2}.png`} />
            <img src={`${dirpath}/mat3/${parsedDNA?.mat3}.png`} />
            <img src={`${dirpath}/nose_mouth/${parsedDNA?.nose_mouth}.png`} />
        </>
    )
}

export default ToyImage;