import React, { useEffect, useState } from "react";

const ToyImage = ({ dna }) => {
    const dirpath = "/img/char_robot";
    const [parsedDNA, setParsedDNA] = useState();

    const dnaParsing = () => {
        let mat1 = dna.substring(7, 11);
        let mat2 = dna.substring(11, 15);
        let mat3 = dna.substring(15, 19);
        let eyes = dna.substring(19, 22);
        let nose_mouth = dna.substring(46, 49);
        const dnaData = {
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
            <img src={`${dirpath}/body/body_color.png`} />
            <img src={`${dirpath}/body/body_shadow.png`} />
            <img src={`${dirpath}/body/body_line.png`} />
            <img src={`${dirpath}/eyes/${parsedDNA?.eyes}.png`} />
            <img src={`${dirpath}/mat1/${parsedDNA?.mat1}.png`} />
            <img src={`${dirpath}/mat2/${parsedDNA?.mat2}.png`} />
            <img src={`${dirpath}/mat3/${parsedDNA?.mat3}.png`} />
            <img src={`${dirpath}/nose_mouth/${parsedDNA?.nose_mouth}.png`} />
        </>
    )
}

export default ToyImage;