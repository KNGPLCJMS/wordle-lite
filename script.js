import { wordList } from "./wordList.js";
import { ansList } from "./wordList.js";
import { wordHash } from "./wordList.js";
const oT = document.getElementById("overText")
let started = false
const lbNL = document.querySelectorAll(".LBDB");
let wtl = 0;
let curCol = 0;
let indxPNT = 0;
let ansst;
let ansar;
let guesses = 0;
let boxColArr = new Array(30).fill(3);

function start(){
    console.log("start() run")
    ansst = ansList[Math.floor(Math.random() * ansList.length)];

    //ansst="apple" //used for testing

    for(let i = 0; i < lbNL.length; i++){
        lbNL[i].textContent = "";
        lbNL[i].style.backgroundColor = "rgb(180, 186, 186)";
    }

    ansar =[...ansst];
    boxColArr = Array(30).fill(3);
    curCol=0;
    indxPNT=0; 
    started =true;
    guesses = 0;
    document.getElementById("startBut").disabled=true;
    document.getElementById("over").style.display="none";
    console.log("start() end")
}
let inputAr = [];
document.getElementById("startBut").addEventListener("click", start);
document.addEventListener("keydown", function(event) {
   if(started){ if (/^[a-zA-Z]$/.test(event.key)) {
        keyIn(event.key);
    }
    if(event.key=="Enter"){
        //checkGuess();
        if (checkGuess()){
            const colray = answerCheck();
            console.log("valid");
            console.log(colray);
            for (let i = 0; i<=4; i++){
                boxColArr[curCol*5+i]=colray[i];
            }
            console.log(boxColArr);
            curCol++;
            indxPNT=0;
            setTimeout(()=>{if (colray.every(color => color === 0)){
                document.getElementById("startBut").disabled=false;
                document.getElementById("over").style.display="flex";
                started = false;
                oT.textContent="You Won!"
                return; 
            }
            if (curCol>5&&started){
                document.getElementById("startBut").disabled=false;
                document.getElementById("over").style.display="flex";
                started = false;
                oT.textContent="The word was "+ansst
                
            }},1000);
            

        } else{
            console.log("invalid")
        }
    }
    if(event.key=="Backspace"){
        letRem();
    }

}});

function letRem(){
    let tempAd = 0;
    if (curCol>5){
        curCol=5;
    }
    if (indxPNT>4){
        indxPNT=4;
        tempAd=1;
    }
    if (curCol<0){
        curCol=0;
    }
    if (indxPNT<=0){
        indxPNT=0;
        return;
    }

    const indx = (curCol*5)+indxPNT-1+tempAd;
    lbNL[indx].textContent = "";
    indxPNT--;
    indxPNT+=tempAd;
}
function keyIn(keyLet){
    if (curCol>5){
        curCol=5;
    }
    if (indxPNT>4){
        return;
    }
    if (curCol<0){
        curCol=0;
    }
    if (indxPNT<0){
        indxPNT=0;
    }
    const indx = (curCol*5)+indxPNT;
    lbNL[indx].textContent = keyLet.toUpperCase();
    indxPNT++;
}
function checkGuess(){
  const incr = curCol * 5;

  let fg = "";
  for (let i = 0; i < 5; i++){
    const el = lbNL[incr + i];
    if (!el) return false;

    const ch = (el.textContent ?? "").trim();
    if (ch === "") return false;

    fg += ch;
  }

  return wordHash.has(fg.toLowerCase());
}
function answerCheck(){
    let colray = [2, 2, 2, 2, 2]; 
    let gueray = [];
    let ansarCopy = [...ansar]; 
    const incr = curCol * 5;

    for (let i = 0; i < 5; i++){
        const gai = lbNL[incr + i].textContent.toLowerCase();
        gueray[i] = gai;
        if (gai == ansar[i]){
            colray[i] = 0;
            ansarCopy[i] = null; 
        }
    }
    

    for (let i = 0; i < 5; i++){
        if (colray[i] !== 0){ 
            const gai = gueray[i];
            const indexInCopy = ansarCopy.indexOf(gai);
            if (indexInCopy !== -1){
                colray[i] = 1; 
                ansarCopy[indexInCopy] = null;
            } else {
                colray[i] = 2;
            }
        }
    }
    const guessStartIndex = curCol * 5;
    for(let i = 0; i < 5; i++){
        const boxIndex = guessStartIndex + i;
        setTimeout(() => {
            lbNL[boxIndex].classList.add("flipping");
            setTimeout(() => {
                lbNL[boxIndex].classList.remove("flipping");
            }, 600); 
        }, i * 100); 
    }
    return colray;
}


function validWord(string){
    return wordHash.has(string);
}
function draw(){

    let indx = (curCol*5)+indxPNT;
    let addsafe=0;
    if(indxPNT>4){
        addsafe=-1;
    }
    for(let i = 0; i<lbNL.length; i++){
        if(i!=indx&&lbNL[i]!=null){lbNL[i].style.border="3px solid rgb(85,83,83)"}
        

        let bgColor;
        if(boxColArr[i]==0){
            bgColor = "rgb(100, 224, 83)"; 
        }
        else if (boxColArr[i]==1){
            bgColor = "rgb(197, 209, 66)"; 
        } else if (boxColArr[i]==2){
            bgColor = "rgb(124, 127, 127)"; 
        } else if (boxColArr[i]==3){
            bgColor = "rgb(180, 186, 186)";
        }
        
        
        lbNL[i].style.backgroundColor = bgColor;
        
    }
    
    if (curCol*5+indxPNT+addsafe!=indx){
        indx--;
    }

    lbNL[indx].style.border = "3px solid rgb(0,0,0)"
}


setInterval(draw, 100);
/*
Documentation

Variables:
wordList- Array of all words.
wordHash- A set of all words.
lbNL- All boxes of letters stored as a nodelist.
wtl
*/