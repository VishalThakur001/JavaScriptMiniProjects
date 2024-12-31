const choices = document.querySelectorAll('.choice');
const userScore = document.querySelector('#userScore');
const compScore = document.querySelector('#compScore');
const result = document.querySelector('#result');
const msg = document.querySelector('#msg');

let user = 0;
let computer = 0;
let time = 3000;

function setChoices(enabled){
    choices.forEach((choice) =>{
        choice.disabled = !enabled;
    })
}

function showResult(showMsg, showResult, color){
    result.innerHTML = `${showResult}`;
    msg.innerHTML = `${showMsg}`;
    msg.style.backgroundColor =  `${color}`;
    result.style.display = 'inline-block';

    setTimeout(() => {
        msg.innerHTML = "Pick your move";
        msg.style.backgroundColor =  '#D81E5B';
        result.style.display = 'none';
    }, time);
}

function draw(){
    showResult("OOP's", "It's a draw", "#23395B");
}

function showWinner(userWins){
    if(userWins){
        showResult("WOW", "You win", "#5B8C5A");
        user++;
        userScore.innerHTML = user;
    }
    else{
        showResult("SORRY", "You loose", "red");
        computer++;
        compScore.innerHTML = computer;
    }
}

const checkResult = (userChoice, compChoice) =>{
    if(userChoice === compChoice){
        draw();
    }
    else{
        let userWins = true;
        if(userChoice === 'rock'){
            userWins = (compChoice === 'paper') ? false : true;
        }
        else if(userChoice === 'paper'){
            userWins = (compChoice === 'scissors') ? false : true;
        }
        else{
            userWins = (compChoice === 'rock') ? false : true;
        }
        showWinner(userWins);
    }
}

const compChoice = () => {
    let num = Math.floor(Math.random()*3);
    return choices[num].id;
}

const playGame = (userChoice)=>{
    checkResult(userChoice, compChoice());
}

choices.forEach((choice) => {
    choice.addEventListener('click', e =>{
        e.preventDefault();
        playGame(choice.id);
        setChoices(false);
        setTimeout(() => {
            setChoices(true);
        }, time);
    })
})