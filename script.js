import { wordList } from "./wordList";
import { wordHash } from "./wordList";

const lbNL = document.querySelectorAll(".LBDB")
let wtl = 0
let curPos = 0

function start(){
    const ansst = wordList[Math.floor(Math.random() * wordList.length)];
    const ansar =[...ansst];
    let guesses = 0;
}
let inputAr = [];
document.addEventListener("keydown", function(event) {
    if (/^[a-zA-Z]$/.test(event.key)) {
    
    }
    if(event.key=="Enter"){

    }

});

function keyIn(){

}
function guess(){
    
}
function validWord(string){
    return wordHash.has(string)
}
