const boxes = document.querySelectorAll('.btn');
const resetGame = document.querySelector('#resetBtn');
const winner = document.querySelector('#winner');
const newGame = document.querySelector('#newGame');
const turn = document.querySelector('#turn');

let count = 0;

let turn0 = true;

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

boxes.forEach(box =>{
    box.addEventListener('click', (e) => {
        e.preventDefault();
        if(turn0){
            box.innerHTML = '0';
            box.style.color = "#3a86ff";
            turn0 = false;
            turn.innerHTML = "Player 2 Turns";
        }
        else{
            box.innerHTML = 'X';
            box.style.color = "#ff006e";
            turn0 = true;
            turn.innerHTML = "Player 1 Turns";
        }
        box.disabled = true;
        count++;

        checkWinner();
    })
})

let disableBoxes = () => {
    boxes.forEach(box =>{
        box.disabled = true;
    })
}
let enableBoxes = () =>{
    boxes.forEach(box =>{
        box.disabled = false;
        box.innerHTML = '';
    })
    count = 0;
}

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerHTML;
        let pos2Val = boxes[pattern[1]].innerHTML;
        let pos3Val = boxes[pattern[2]].innerHTML;

        if(pos1Val !== '' && pos2Val !== '' && pos3Val !== ''){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                // show winner
                if(pos1Val === '0'){
                    winner.innerHTML = `Winner is Player 1`;
                }
                else{
                    winner.innerHTML = `Winner is Player 2`;
                }
                // pause game
                disableBoxes();
                turn.style.display = "none";
                resetGame.disabled = true;
                newGame.style.display = "inline-block";
                return;
            }
        }
        if(count === 9){
            winner.innerHTML = `Draw`;
            turn.style.display = "none";
            resetGame.disabled = true;
            newGame.style.display = "inline-block";
        }
    }
}

newGame.addEventListener('click', (e) =>{
    e.preventDefault();
    enableBoxes();
    turn.innerHTML = "Player 1 Turns";
    turn.style.display = "inline-block";
    winner.innerHTML = "";
    resetGame.disabled = false;
    newGame.style.display = "none";
})

resetGame.addEventListener('click', (e) =>{
    turn.innerHTML = "Player 1 Turns";
    turn.style.display = "inline-block";
    e.preventDefault();
    enableBoxes();
})