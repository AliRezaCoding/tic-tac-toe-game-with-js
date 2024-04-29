'use strict';

// ELEMENTS

const gameCells = document.querySelectorAll('.cell')
const firstPlayer = document.querySelector('.player1')
const secondPlayer = document.querySelector('.player2')
const btnRestart = document.querySelector('.btn-restart')


/////////////////////////
let player1 = 'X'
let player2 = 'O'
let playerTurn = player1

// Winner (gameCells) Positions
let position1, position2, position3
/////////////////////////


// 1.
const startGame = function () {
    gameCells.forEach(cell => {
        cell.addEventListener('click', handleClick)
    })
}

// 2.
const handleClick = function (e) {
    if (!(e.target.textContent === '')) return

    e.target.textContent = playerTurn

    if (checkWin()) {

        // Giving Styls For Winner gameCells Position
        gameCells[position1].style.color =
        gameCells[position2].style.color = 
        gameCells[position3].style.color = '#5f5fc4';

        endGame()
    } else if (checkTie()) {
        endGame()
    } else {
        changePlayerTurn()
    }
}

// 3.
const checkWin = function () {
    const winningCondations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i = 0 ; i < winningCondations.length ; i++) {
        const [pos1, pos2, pos3] = winningCondations[i];
        
        if (
            gameCells[pos1].textContent !== '' &&
            gameCells[pos1].textContent ===
            gameCells[pos2].textContent &&
            gameCells[pos2].textContent ===
            gameCells[pos3].textContent
            ) {
                // Setting The Winner gameCells Position
                position1 = pos1;
                position2 = pos2;
                position3 = pos3;
                return true;
            }
    };

    return false;
}

// 4.
const checkTie = function () {
    let emptyCells = 0

    gameCells.forEach(cell => {
        if(cell.textContent === '') emptyCells ++
    })

    return emptyCells === 0 && !checkWin()
}

// 5.
const endGame = function () {
    gameCells.forEach(cell => {
        cell.removeEventListener('click', handleClick)
        cell.classList.add('disabled')
    })
}

// 6.
const changePlayerTurn = function () {
    playerTurn = playerTurn === player1 ? player2 : player1;
    
    firstPlayer.classList.toggle('player-active')
    secondPlayer.classList.toggle('player-active')
}

startGame();



const restartGame = function () {
    gameCells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');
        cell.style.color = '#fff';
    });

    secondPlayer.classList.remove('player-active');
    firstPlayer.classList.add('player-active');

    startGame();
}
btnRestart.addEventListener('click', restartGame)