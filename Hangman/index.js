//1. import with any name you want what is in words.js

import words from './words.js'


//global variables that we will use all over the code
const GUSSES=6;
let wrongGuesses=0;
let randomWord;
let underScores;


// start game function: 1. generate a random word from words.js (showing the hint )
//2. generate the underscores to match the length of the word we randomly generated 

function startGame(){
//2. getting the length of all the words we have in the array of words 
let len=words.length;
// 3.randomizing an index to generate a new word everytime 
let randomIndex= Math.floor(Math.random()*len);

// Math.random generate a random number from 0-0.99
// *10 (length of objects in the array in words.js) will makes us randomize from 0 to 9.99 
// floor will make it from 0-9

randomWord=words[randomIndex]
let hint=document.querySelector('.hint-text');
hint.innerText=randomWord.hint;
console.log(randomWord.hint);


// speicifying the how many underscores do we have according to the length 
// of the randomly generated word 
let s=""
for (let i=0;i<randomWord.word.length;i++){
    s+="_ "
}

console.log(randomWord.word)
console.log(s)

underScores=document.querySelector('.underscores h2');
underScores.innerText=s

// enabling all buttons
document.querySelectorAll('.btn').forEach(function(button){
        button.removeAttribute('disabled');
    });
    // reseting wrong Guesses to start counting from the start 
    wrongGuesses=0; 
    // rendering it 
    document.querySelector('.Incorrect').innerText=`${wrongGuesses} / 6`;
    // re-hide the won or lose 
    document.querySelector('.alert').classList.add('hidden');
    // restart the default start image 
    document.querySelector('.pictures img').setAttribute('src','./images/hangman-0.svg');

}

startGame();    //first call (once the website loads)

// adding event listeners to buttons
// querySelectorALL returns an array of elements (nodelist)

let buttons=document.querySelectorAll('.btn');
//loop over each element of the array of buttons and add an event listener
buttons.forEach(function(button){
    button.addEventListener("click",function(e){
        // console.log(e.target.innerText) thi will print the letter within the button 
        //checking if e.target.innerText is included in the word 
        let letterPressed=e.target.innerText;
        //that is if the choosen element was correct
         e.target.setAttribute('disabled',true);
        if (randomWord.word.includes(letterPressed)){
            underScores.innerText=underscoresAndLetters(letterPressed,randomWord.word,underScores.innerText);
            if(! underScores.innerText.includes('_')){
                let alert=document.querySelector('.alertp')
                alert.innerText='YOU WON!';
                document.querySelector('.alert').classList.remove('hidden');
                disableAllButtons();
            }
        }
        // else if it doesnt include it decrement the # of gusses and display the next image
        else{
            wrongGuesses++;
            document.querySelector('.Incorrect').innerText=`${wrongGuesses} / 6`;
            let image=document.querySelector('.pictures img');
            let source =image.setAttribute('src',`./images/hangman-${wrongGuesses}.svg`);
            if(wrongGuesses===GUSSES){
                let alert=document.querySelector('.alertp')
                alert.innerText='YOU LOSE!';
                document.querySelector('.alert').classList.remove('hidden');
                disableAllButtons();
            }
        }
    })
})

let button=document.querySelector('.icon');
button.addEventListener('click',function(){
    startGame();
})


function underscoresAndLetters(letter,word,displayedWord){
    // converted the displayedWord into an array 
    // trim removed the spaces before or after the string 
    // split (delimeter is the space)extract elements (what separates them are spaces)
    // becomes: ["_", "_", "_", "_"]
    let displayedArr=displayedWord.trim().split(" ");

    // Suppose letter = "o"
    // word = "code"
    for(let i=0;i<word.length;i++){
        if(word[i]===letter){
            displayedArr[i]=letter;
        }
    }
    // now: ["_", "o", "_", "_"]

    return displayedArr.join(" ");
    // joins all the contents of the array and separates them 
    //using spaces between each element 
}

function disableAllButtons(){
    let buttons=document.querySelectorAll('.btn');
    buttons.forEach(function(button){
        button.setAttribute('disabled',true);
    })
}