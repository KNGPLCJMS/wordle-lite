import { wordList } from "./wordList.js";
import { wordHash } from "./wordList.js";

const lbNL = document.querySelectorAll(".LBDB");
let wtl = 0;
let curCol = 0;
let indxPNT = 0;
let ansst;
let ansar;
let guesses = 0;

function start(){
    console.log("start() run")
    ansst = wordList[Math.floor(Math.random() * wordList.length)];
    ansar =[...ansst];
    curCol=0;
    indxPNT=0;
    guesses = 0;
    document.getElementById("startBut").disabled=true;
    console.log("start() end")
}
let inputAr = [];
document.getElementById("startBut").addEventListener("click", start);
document.addEventListener("keydown", function(event) {
    if (/^[a-zA-Z]$/.test(event.key)) {
        keyIn(event.key);
    }
    if(event.key=="Enter"){

    }
    if(event.key=="Backspace"){
        letRem();
    }

});

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
function guess(){
    
}
function validWord(string){
    return wordHash.has(string);
}
/*
Documentation

Variables:
wordList- Array of all words.
wordHash- A set of all words.
lbNL- All boxes of letters stored as a nodelist.
wtl
*/