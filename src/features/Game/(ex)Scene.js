import axios from "axios";
import ToyImage from "features/TradingSystem/ToyImage";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import $ from "jquery";
import "css/Scene.css";

const Scene = () => {
    const user = useSelector((state) => state.user.user);
    const toys = user?.characterList;
    
    //dna parsing variables
    const [gender, setGender] = useState([]);
    const [species, setSpecies] = useState([]);
    const [mat1, setMat1] = useState([]);
    const [mat2, setMat2] = useState([]);
    const [mat3, setMat3] = useState([]);
    const [eye, setEye] = useState([]);
    const [noseMouth, setNoseMouth] = useState([]);
    const [colorR, setColorR] = useState([]);
    const [colorG, setColorG] = useState([]);
    const [colorB, setColorB] = useState([]);
    const [damage, setDamage] = useState([]);
    // var gender=[];
    // var species=[];
    // var mat1=[];
    // var mat2=[];
    // var mat3=[];
    // var eye=[];
    // var nose_mouth=[];
    // var color_r=[];
    // var color_g=[];
    // var color_b=[];
    // var damage=[]; 
    
    var Fsending, Msending;
    //timer
    var time;
    //player info
    var stone;
    
    //for shop scene
    var sellingChara=[0, 0, 0];
    var cParts=["0", "0", "0"]; // 샵에서 말풍선 안에 들어있는 부분  손님이 고르는거 -> 구현이 아직 안됨
    
    //for popupbex in mix scene
    var PopUpFlag=0;
    var genderbox="";
    
    //for shelf scene
    var ShelfFlag=0;

    var userPart;	//유저가 요구하는 파츠
	var userDna;	//유저가 요구하는 파츠의 DNA값

	var chosenChara;
	$(".gamebox").click(function(){
		var chosenChara=$(this).attr("id").substr(4, 1);		
	});

    /*****************Mix Scene***************/
	$(".ChooseButton").click(function(){
        $(".PopBox").css("outline", "");
		$("#ChoosePopUp").css("display", "block");
		genderbox=$(this).attr("id");
		genderbox=genderbox.substr(0,1);
	});
	
	
	var chosenbox; //네 개의 박스 중 선택된 박스
	//팝업창에서 하나의 캐릭터 박스 선택했을 때
    $(".PopBox").click(function () {
         chosenbox=$(this).attr("id");
         $(".PopBox").css("outline", "");
         $("#"+chosenbox).css("outline", "solid 2px red");
    });
    $(".PopBox").dblclick(function(){
    	window.location.href="https://www.naver.com/";
    });
    //선택 팝업창에서 확인 눌렀을 때 
    $("#ChooseOK").click(function(){
    	$("#"+genderbox+"ChooseButton").css("opacity", "0");
		$("#ChoosePopUp").css("display", "none");
		if(genderbox=='M'){
			Msending=(PopUpFlag)*4+parseInt(chosenbox.substr(3, 1))-1;
		}
		else if(genderbox=='F'){
			Fsending=(PopUpFlag)*4+parseInt(chosenbox.substr(3, 1))-1;
		}
		getCharaResource(parseInt(PopUpFlag)*4+parseInt(chosenbox.substr(3, 1))-1, genderbox+"box");
		$("#"+genderbox+"box").css("display", "block");
		PopUpFlag=0;
    });
    //선택 팝업창에서 취소 눌렀을 때 
    $("#ChooseNo").click(function(){
		$("#ChoosePopUp").css("display", "none");
		PopUpFlag=0;
    });
    //선택 팝업창에서 왼쪽 화살표 눌렀을 때 
    $("#PopLeft").click(function(){
    	if(PopUpFlag>0)
    		PopUpFlag--;
    	else
    		return;

		LoadChara(4, "box", PopUpFlag);
    });
    //선택 팝업창에서 오른쪽 화살표 눌렀을 때
    $("#PopRight").click(function(){
    	//alert(parseInt(charanum/4));
    	if(PopUpFlag<(parseInt(toys?.length/4)))
    		PopUpFlag++;
    	else
    		return;

		LoadChara(4, "box", PopUpFlag);
    });

    //교배 시작 버튼 눌렀을 때, 서버로 id 정보 보내서 답변 받기
    $("#MixButton").click(function(){
	
		alert("M:"+Msending+" F:"+Fsending);

		if(typeof Msending === 'undefined'){
			alert("아빠를 선택해주세요");
			return;
		}
		if(typeof Fsending === 'undefined'){
			alert("엄마를 선택해주세요");
			return;
		}

		var newcharnum=(Msending+Fsending)/2;
		alert(newcharnum);
		$("#Nbox").css("display", "block");
		getCharaResource(newcharnum, "Nbox");
    });

    	/*****************Shelf Scene***************/
	var chosenShelf;	//shelf 중 골라진 칸의 html tag id

    $("#ShelfLeft").click(function(){
    	if(ShelfFlag>0)
    		ShelfFlag--;
    	else
    		return;

		LoadChara(8, "sbox", ShelfFlag);	
    });

    $("#ShelfRight").click(function(){
    	if(ShelfFlag<(parseInt(toys?.length/8)))
    		ShelfFlag++;
    	else
    		return;

		LoadChara(8, "sbox", ShelfFlag);
    });

    
    $(".shelfbox").click(function(){
    	 chosenShelf=$(this).attr("id");
      
         $(".shelfbox").css("outline", "");
         $("#"+chosenShelf).css("outline", "solid 2px red");
    });
    
    $("#SelectionButton").click(function(){
    	$("#SelectionPopUp").css("display","block");
    
    	getCharaResource(sellingChara[0], "Pbox1");
    	getCharaResource(sellingChara[1], "Pbox2");
    	getCharaResource(sellingChara[2], "Pbox3");
    	
    });

    $(".Pbox").click(function(){
    	var chosenNum=$(this).attr("id").substr(4,1)-1;
        $(".Pbox").css("outline", "");
        $("#Pbox"+(chosenNum+1)).css("outline", "solid 2px red");

        sellingChara[chosenNum]=parseInt(ShelfFlag*8)+parseInt(chosenShelf.substr(4,1))-1;
    });

    $("#ChooseSNo").click(function(){
    	$("#SelectionPopUp").css("display","none");
    });
    $("#ChooseSYes").click(function(){
    	$("#SelectionPopUp").css("display","none");

    	//reload gameboxes
    	getCharaResource(sellingChara[0], "Gbox1");
    	getCharaResource(sellingChara[1], "Gbox2");
    	getCharaResource(sellingChara[2], "Gbox3");
    });
	
	/*****************etcetra***************/
	//changing scene by clicking arrow buttons
    $(".arrowButton").click(function(){
    	var c_scene=$(this).attr("id").substr(6, 3);
    	if(c_scene=="sho"){
    		$(".scene").css("display", "none");
    		$("#ShopScene").css("display", "block");
    	}
    	else if(c_scene=="mix"){
    		$(".scene").css("display", "none");
    		$("#MixScene").css("display", "block");
    	}
    	else if(c_scene=="she"){
    		$(".scene").css("display", "none");
    		$("#ShelfScene").css("display", "block");
    	}
    	else
    		alert("scene error");
    });

    function parseDna(chdna, arrnum){
        gender[arrnum]=chdna.substr(0, 4);
        species[arrnum] = chdna.substr(4, 3);
        mat1[arrnum]=chdna.substr(7, 4);
        mat2[arrnum]=chdna.substr(11, 4);
        mat3[arrnum]=chdna.substr(15, 4);
        eye[arrnum]=chdna.substr(19, 3);
        nose_mouth[arrnum] = chdna.substr(22, 3);
        color_r[arrnum] = chdna.substr(25, 8);
        color_g[arrnum] = chdna.substr(33, 8);
        color_b[arrnum] = chdna.substr(41, 8);
        damage[arrnum] = chdna.substr(49, 2);
    }

    function getCharaResource(dnanum, boxname){
        var species_route;
        if(species[dnanum]==="001"){		//car
            species_route="chara_car";
        }
        else if(species[dnanum]==="010"){//robots
            species_route="chara_robot";
        }
        else if(species[dnanum]==="100"){//doll
            species_route="chara_doll";
        }
        else{
            
        }
        console.log("what? ", species_route);
        $("#"+boxname+"_body_white").attr("src", "\\img\\"+species_route+"\\body\\body_color_white.png");
        $("#"+boxname+"_body_color").attr("src", "\\img\\"+species_route+"\\body\\body_color_white.png");
        $("#"+boxname+"_body_shape").attr("src", "\\img\\"+species_route+"\\body\\body_shape.png");
        if(damage=="00")
            $("#"+boxname+"_body_damage").attr("src", "\\img\\"+species_route+"\\body\\damage.png");
        else
            $("#"+boxname+"_body_damage").attr("src", "\\img\\blank.png");
    
        $("#"+boxname+"_eyes").attr("src", "\\img\\"+species_route+"\\eyes\\"+eye[dnanum]+".png");
        $("#"+boxname+"_nose_mouth").attr("src", "\\img\\"+species_route+"\\nose_mouth\\"+nose_mouth[dnanum]+".png");
        $("#"+boxname+"_mat1").attr("src", "\\img\\"+species_route+"\\mat1\\"+mat1[dnanum]+".png");
    
        if((parseInt(mat2[dnanum],2)>=0)&&(parseInt(mat2[dnanum], 2)<8))
            $("#"+boxname+"_mat2").attr("src", "\\img\\"+species_route+"\\mat2\\"+mat2[dnanum]+".png");
        else
            $("#"+boxname+"_mat2").attr("src", "\\img\\blank.png");
        
        $("#"+boxname+"_mat3").attr("src", "\\img\\"+species_route+"\\mat3\\"+mat3[dnanum]+".png");
    
        //change body color based on parsed color dna
        $("#"+boxname+"_body_color").css('filter',"opacity(0.5) drop-shadow(0 0 0 rgb("+parseInt(color_r[dnanum], 2)+" "+parseInt(color_g[dnanum], 2)+" "+parseInt(color_b[dnanum], 2)+"))" );
        $("#"+boxname+"_body_color").css('-webkit-filter',"opacity(0.5) drop-shadow(0 0 0 rgb("+parseInt(color_r[dnanum], 2)+" "+parseInt(color_g[dnanum], 2)+" "+parseInt(color_b[dnanum], 2)+"))" );
        
    }
    
    function StartButtonMouseDown(e){
        e.preventDefault();
        $("#MixButtonimg").attr("src", "/img/background_mix/bg_mix_btn_pressed.png");
    }
    function StartButtonMouseUp(e){
        e.preventDefault();
        $("#MixButtonimg").attr("src", "/img/background_mix/bg_mix_btn_normal.png");
    }
    
    //함수로 shelf의 character box 여덟칸 생성
    function SetShelf(){
        var shelfTag=function(){
            var result="";
            for(var i=1; i<=8; i++){
                //html tag 생성
                result+="<div id='sbox"+i+"' class='shelfbox'><img id='sbox"+i+"_body_white'><img id='sbox"+i+"_body_color'><img id='sbox"+i+"_body_shape'><img id='sbox"+i+"_body_damage'><img id='sbox"+i+"_eyes'><img id='sbox"+i+"_nose_mouth'><img id='sbox"+i+"_mat1'><img id='sbox"+i+"_mat2'><img id='sbox"+i+"_mat3'></div>"
                //css로 위치 잡기
            }
            return result;
        }
    
        $("#shelfboxes").html(shelfTag);
    
        for(var i=1; i<=8; i++){
            var top;
            var left=120+100*((i-1)%4);
    
            if(i<=4)
                top=120;
            else
                top=220;
    
            $("#sbox"+i).css("top",top+"px");
            $("#sbox"+i).css("left",left+"px");
        }
    }
    
    //character 리스트를 쭉 보여줄때 사용하는 함수
    function LoadChara(boxnum, boxname, flagname){
        for(var i=0; i<boxnum; i++){
            
            if(typeof toys[flagname*boxnum+i]?._DNA === 'undefined') {
                // does not exist
                $("#"+boxname+(i+1)).css("display", "none");
                //break;
            }else {
                // does exist
                console.log("보관함 ", toys[flagname*boxnum+i]?._DNA , "  ", boxname);
                $("#"+boxname+(i+1)).css("display", "block");
                getCharaResource(flagname*boxnum+i, boxname+(i+1));
            }
        }
    }
    
    function randomParts(){	//랜덤으로 파츠 고르는 함수
        var rSpecies=Math.floor(Math.random()*3);
        var rMat1, rMat2, rMat3;
    
        if(rSpecies==0){//봉제인형
            rMat1=Math.floor(Math.random()*6);
            rMat2=Math.floor(Math.random()*4);
            if(rMat2==2||rMat2==3){
                rMat2+=4;
            }
            rMat3=Math.floor(Math.random()*6);
        }
        else if(rSpecies==1){//로봇
            rMat1=Math.floor(Math.random()*5)+4;
            rMat2=Math.floor(Math.random()*5)+2;
            if(rMat2==5||rMat2==6){
                rMat2+=1;
            }
            rMat3=Math.floor(Math.random()*5)+6;
        }
        else if(rSpecies==2){//자동차
            rMat1=Math.floor(Math.random()*5)+11;
            rMat2=Math.floor(Math.random()*3)+5;
            rMat3=Math.floor(Math.random()*5)+11;
        }
        else{alert("random species error")}
    
        cParts[0]=rMat1.toString(2);
        cParts[1]=rMat2.toString(2);
        cParts[2]=rMat3.toString(2);
    
        cParts[0]=numberPad(cParts[0],4);
        cParts[1]=numberPad(cParts[1],4);
        cParts[2]=numberPad(cParts[2],4);
    
    }
    
    function timer(){
    
    }
    
    //자리수 맞춰 0붙여 출력하는 함수
    function numberPad(n, width) {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    }

    useEffect(() => {
        SetShelf();
        randomParts();
    }, [])

    useEffect(() => {
        if(toys) {
            console.log(toys);
            for(var i=0; i<toys.length; i++){
                parseDna(toys[i]._DNA, i);
            }
            LoadChara(4, "box", PopUpFlag);
            LoadChara(8, "sbox", ShelfFlag);

            getCharaResource(sellingChara[0],"Gbox1");
            getCharaResource(sellingChara[1],"Gbox2");
            getCharaResource(sellingChara[2],"Gbox3");
        }
    }, [toys])

    return (
        <>
        {!user ? (
            <>
            <h1>로그인 후 게임이 가능합니다.</h1>
            </>
        ) : (
            <>
            <div id="ShopScene" className="scene" style={{backgroundImage:`url("/img/background_shop/bg_shop.png")`, backgroundSize:'cover'}}>
                <div id="customer"></div>
                <div id="sbubble">
                    <div id="part1" className="cpart"></div>
                    <div id="part2" className="cpart"></div>
                    <div id="part3" className="cpart"></div>
                </div>
                <div id="Gbox1" className="gamebox">
                    <img id="Gbox1_body_white" />
                    <img id="Gbox1_body_color" />
                    <img id="Gbox1_body_shape" />
                    <img id="Gbox1_body_damage" />
                    <img id="Gbox1_eyes" />
                    <img id="Gbox1_nose_mouth" />
                    <img id="Gbox1_mat1" />
                    <img id="Gbox1_mat2" />
                    <img id="Gbox1_mat3" />	
                </div>
                <div id="Gbox2" className="gamebox">
                    <img id="Gbox2_body_white" />
                    <img id="Gbox2_body_color" />
                    <img id="Gbox2_body_shape" />
                    <img id="Gbox2_body_damage" />
                    <img id="Gbox2_eyes" />
                    <img id="Gbox2_nose_mouth" />
                    <img id="Gbox2_mat1" />
                    <img id="Gbox2_mat2" />
                    <img id="Gbox2_mat3" />         
                </div>
                <div id="Gbox3" className="gamebox">
                    <img id="Gbox3_body_white" />
                    <img id="Gbox3_body_color" />
                    <img id="Gbox3_body_shape" />
                    <img id="Gbox3_body_damage" />
                    <img id="Gbox3_eyes" />
                    <img id="Gbox3_nose_mouth" />
                    <img id="Gbox3_mat1" />
                    <img id="Gbox3_mat2" />
                    <img id="Gbox3_mat3" />
                </div>
                <button id="arrow_shelf_right" className="arrowButton home_button" >
                    <img src="/img/background_UI_resized/arrow_shelf_right.png" />
                </button>
                <button id="arrow_mix_left" className="arrowButton home_button">
                    <img src="/img/background_UI_resized/arrow_mix_left.png" />
                </button>
            </div>
            <div id="MixScene" className="scene"  style={{backgroundImage:`url("/img/background_mix/bg_mix.png")`, backgroundSize:'cover'}}>
               
                <div id="Mbox" className="charabox">
                    <img id="Mbox_body_white" />
                    <img id="Mbox_body_color" />
                    <img id="Mbox_body_shape" />
                    <img id="Mbox_body_damage" />
                    <img id="Mbox_eyes" />
                    <img id="Mbox_nose_mouth" />
                    <img id="Mbox_mat1" />
                    <img id="Mbox_mat2" />
                    <img id="Mbox_mat3" /> 
                </div>
                <div id="Fbox" className="charabox">
                    <img id="Fbox_body_white" />
                    <img id="Fbox_body_color" />
                    <img id="Fbox_body_shape" />
                    <img id="Fbox_body_damage" />
                    <img id="Fbox_eyes" />
                    <img id="Fbox_nose_mouth" />
                    <img id="Fbox_mat1" />
                    <img id="Fbox_mat2" />
                    <img id="Fbox_mat3" />
                </div>
                <div id="Nbox" className="charabox">
                    <img id="Nbox_body_white" />
                    <img id="Nbox_body_color" />
                    <img id="Nbox_body_shape" />
                    <img id="Nbox_body_damage" />
                    <img id="Nbox_eyes" />
                    <img id="Nbox_nose_mouth" />
                    <img id="Nbox_mat1" />
                    <img id="Nbox_mat2" />
                    <img id="Nbox_mat3" />
                </div>
                <button id="MixButton" className="home_button">
                    <img id="MixButtonimg" src="/img/background_mix/bg_mix_btn_normal.png" onMouseDown={e => StartButtonMouseDown(e)} onMouseUp={e => StartButtonMouseUp(e)}  />
                </button>

                <button id="MChooseButton" className="ChooseButton home_button">
                    <img src="/img/stars.png" />
                </button>
                <button id="FChooseButton" className="ChooseButton home_button">
                    <img src="/img/stars.png" />
                </button>

                <div id="ChoosePopUp">
                    <p>자세히 보려면 더블클릭</p>
                    <div id="box1" className="PopBox">
                        <img id="box1_body_white" />
                        <img id="box1_body_color" />
                        <img id="box1_body_shape" />
                        <img id="box1_body_damage" />
                        <img id="box1_eyes" />
                        <img id="box1_nose_mouth" />
                        <img id="box1_mat1" />
                        <img id="box1_mat2" />
                        <img id="box1_mat3" />
                    </div>
                    <div id="box2" className="PopBox">
                        <img id="box2_body_white" />
                        <img id="box2_body_color" />
                        <img id="box2_body_shape" />
                        <img id="box2_body_damage" />
                        <img id="box2_eyes" />
                        <img id="box2_nose_mouth" />
                        <img id="box2_mat1" />
                        <img id="box2_mat2" />
                        <img id="box2_mat3" />
                    </div>
                    <div id="box3" className="PopBox">
                        <img id="box3_body_white" />
                        <img id="box3_body_color" />
                        <img id="box3_body_shape" />
                        <img id="box3_body_damage" />
                        <img id="box3_eyes" />
                        <img id="box3_nose_mouth" />
                        <img id="box3_mat1" />
                        <img id="box3_mat2" />
                        <img id="box3_mat3" />
                    </div>
                    <div id="box4" className="PopBox">
                        <img id="box4_body_white" />
                        <img id="box4_body_color" />
                        <img id="box4_body_shape" />
                        <img id="box4_body_damage" />
                        <img id="box4_eyes" />
                        <img id="box4_nose_mouth" />
                        <img id="box4_mat1" />
                        <img id="box4_mat2" />
                        <img id="box4_mat3" />
                    </div>
                    <button id="PopLeft" className="home_button">◀</button>
                    <button id="ChooseNo" className="home_button">취소</button>
                    <button id="ChooseOK" className="home_button">확인</button>
                    <button id="PopRight" className="home_button">▶</button>
                </div>

                <button id="arrow_shop_right" className="arrowButton home_button" >
                    <img src="/img/background_UI_resized/arrow_shop_right.png" />
                </button>
                <button id="arrow_shelf_left" className="arrowButton home_button">
                    <img src="/img/background_UI_resized/arrow_shelf_left.png" />
                </button>
                    
            </div>
            <div id="ShelfScene" className="scene" style={{backgroundImage:`url("/img/background_shelf/bg_shelf_final.png")`, backgroundSize:'cover'}}>
    
                <div id="shelfboxes">
                    
                </div>
                <div id="SelectionPopUp">
                    <div id="Pbox1" className="Pbox">
                        <img id="Pbox1_body_white"/>
                        <img id="Pbox1_body_color"/>
                        <img id="Pbox1_body_shape"/>
                        <img id="Pbox1_body_damage"/>
                        <img id="Pbox1_eyes"/>
                        <img id="Pbox1_nose_mouth"/>
                        <img id="Pbox1_mat1"/>
                        <img id="Pbox1_mat2"/>
                        <img id="Pbox1_mat3"/>
                    </div>
                    <div id="Pbox2" className="Pbox">
                        <img id="Pbox2_body_white"/>
                        <img id="Pbox2_body_color"/>
                        <img id="Pbox2_body_shape"/>
                        <img id="Pbox2_body_damage"/>
                        <img id="Pbox2_eyes"/>
                        <img id="Pbox2_nose_mouth"/>
                        <img id="Pbox2_mat1"/>
                        <img id="Pbox2_mat2"/>
                        <img id="Pbox2_mat3"/>
                    </div>
                    <div id="Pbox3" className="Pbox">
                        <img id="Pbox3_body_white" />
                        <img id="Pbox3_body_color"/>
                        <img id="Pbox3_body_shape"/>
                        <img id="Pbox3_body_damage"/>
                        <img id="Pbox3_eyes"/>
                        <img id="Pbox3_nose_mouth"/>
                        <img id="Pbox3_mat1"/>
                        <img id="Pbox3_mat2"/>
                        <img id="Pbox3_mat3"/>
                    </div>
                    <button id="ChooseSNo" className="home_button">취소</button>
                    <button id="ChooseSYes" className="home_button">확인</button>
                </div>
                <button id="SelectionButton" className="home_button">선택</button>
                <button id="ShelfLeft" className="home_button">◀</button>
                <button id="ShelfRight" className="home_button">▶</button>
                
                <button id="arrow_mix_right" className="arrowButton home_button" >
                    <img src="/img/background_UI_resized/arrow_mix_right.png" />
                </button>
                <button id="arrow_shop_left" className="arrowButton home_button">
                    <img src="/img/background_UI_resized/arrow_shop_left.png" />
                </button>
            </div>
            </>
        )}

    </>
    )
}

export default Scene;