import React, { useEffect, useState } from "react";

const ToyImage = ({ dna, species }) => {
    const dirpath = `/img/chara_${species}`;
    const [parsedDNA, setParsedDNA] = useState();
    const [damage, setDamage] = useState(false);

    const dnaParsing = () => {
        setDamage(false);
        if(dna?.substring(1,2) === '0' && dna?.substring(3,4) === '0'){
            setDamage(true);
        }
        let mat1 = dna?.substring(7, 11);
        let mat2 = dna?.substring(11, 15);
        let mat3 = dna?.substring(15, 19);
        let eyes = dna?.substring(19, 22);
        let nose_mouth = dna?.substring(22, 25);
        let body_color = dna?.substring(25, 49);
        const dnaData = {
            damage,
            mat1,
            mat2,
            mat3,
            eyes,
            nose_mouth,
            body_color
        }
        setParsedDNA(dnaData);
    }

    const body_color_style = (body_color) => {
        const color = {
            r : parseInt(body_color.substring(0,8), 2),
            g : parseInt(body_color.substring(8,16), 2),
            b : parseInt(body_color.substring(16,24), 2),
        }
       
        const style = {
            filter : "opacity(0.5) drop-shadow(0 0 0 rgb("+color.r+" "+color.g+" "+color.b+"))",
            WebkitFilter : "opacity(0.5) drop-shadow(0 0 0 rgb("+color.r+" "+color.g+" "+color.b+"))",
        }
        return style;
    }

    useEffect(() => {
        dnaParsing();
    }, [dna])

    return (
        <>{
            parsedDNA && (
                <>
                <img alt='body_back' src={`${dirpath}/body/body_color_white.png`} />
                <img alt='body_color' style={body_color_style(parsedDNA?.body_color)} src={`${dirpath}/body/body_color_white.png`} />
                <img alt='body_shape' src={`${dirpath}/body/body_shape.png`} />
                <img alt='eyes' src={`${dirpath}/eyes/${parsedDNA?.eyes}.png`} />
                {species === "100" && <img alt='mat3_w' style={body_color_style(parsedDNA?.body_color)} src={`${dirpath}/mat3/${parsedDNA?.mat3}_w.png`} />}
                <img alt='mat3' src={`${dirpath}/mat3/${parsedDNA?.mat3}.png`} />
                <img alt='mat1' src={`${dirpath}/mat1/${parsedDNA?.mat1}.png`} />
                <img alt='mat2' src={`${dirpath}/mat2/${parsedDNA?.mat2}.png`} /> 
                <img alt='nose_mouth' src={`${dirpath}/nose_mouth/${parsedDNA?.nose_mouth}.png`} />
                {damage && <img alt='damage' src={`${dirpath}/body/damage.png`} />}
                </>
            )
        }
        </>
    )
}

export default ToyImage;