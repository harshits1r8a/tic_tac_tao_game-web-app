// Required Variables
let playGame = true;
let cnt = 0
let draw = 0
let scoreX = 0
let scoreO = 0
// let round = 0



const O = `<i class="cellxo fa-regular fa-circle"></i>`
const o = `<i class="turnxo fa-regular fa-circle"></i>`
const X = `<i class="cellxo fa-solid fa-x"></i>`
const x = `<i class="turnxo fa-solid fa-x"></i>`


// Game play screen
const turn = document.querySelector('.turn')
let round = document.querySelector('.round')
let cells = document.querySelectorAll('.cell')

// state symbole






// winning condition

function winningCond() {

    function winred(i, j, k) {
        cells[i].style.color = 'red'
        cells[j].style.color = 'red'
        cells[k].style.color = 'red'
        ++round.innerHTML
        const winElement = cells[i].innerHTML
        const winner = (winElement === O) ? 'Circle' : 'Cross'
        // score updating
        if (winner === 'Circle') {
            scoreO++
            // console.log(scoreO);
        }
        if (winner === 'Cross') {
            scoreX++
            // console.log(scoreX);
        }

        // console.log(winner);
        playGame = false;
        setTimeout(() => {
            resetGame()
        }, 1500)
    }

    // Column Condition

    if (((cells[0].innerHTML === cells[1].innerHTML) && (cells[1].innerHTML === cells[2].innerHTML)) && ((cells[2].innerHTML === O) || (cells[2].innerHTML === X))) {
        winred(0, 1, 2)
        return;
    }
    if (((cells[3].innerHTML === cells[4].innerHTML) && (cells[4].innerHTML === cells[5].innerHTML)) && ((cells[5].innerHTML === O) || (cells[5].innerHTML === X))) {
        winred(3, 4, 5)
        return;
    }
    if (((cells[6].innerHTML === cells[7].innerHTML) && (cells[7].innerHTML === cells[8].innerHTML)) && ((cells[8].innerHTML === O) || (cells[8].innerHTML === X))) {
        winred(6, 7, 8)
        return;
    }

    // Row condition

    if (((cells[0].innerHTML === cells[3].innerHTML) && (cells[3].innerHTML === cells[6].innerHTML)) && ((cells[6].innerHTML === O) || (cells[6].innerHTML === X))) {
        winred(0, 3, 6)
        return;
    }
    if (((cells[1].innerHTML === cells[4].innerHTML) && (cells[4].innerHTML === cells[7].innerHTML)) && ((cells[7].innerHTML === O) || (cells[7].innerHTML === X))) {
        winred(1, 4, 7)
        return;
    }
    if (((cells[2].innerHTML === cells[5].innerHTML) && (cells[5].innerHTML === cells[8].innerHTML)) && ((cells[8].innerHTML === O) || (cells[8].innerHTML === X))) {
        winred(2, 5, 8)
        return;
    }

    // Diagonal Condition
    if (((cells[0].innerHTML === cells[4].innerHTML) && (cells[4].innerHTML === cells[8].innerHTML)) && ((cells[8].innerHTML === O) || (cells[8].innerHTML === X))) {
        winred(0, 4, 8)
        return;
    }
    if (((cells[2].innerHTML === cells[4].innerHTML) && (cells[4].innerHTML === cells[6].innerHTML)) && ((cells[6].innerHTML === O) || (cells[6].innerHTML === X))) {
        winred(2, 4, 6)
        return;

    }


}

function getName(){
    const player_o = document.getElementById('player-o')
    const player_x = document.getElementById('player-x')
    return  [player_o,player_x]
}


function removeName(){
    document.getElementById('player-o').value = ''
    document.getElementById('player-x').value = ''
}



// Start Game
function startgame() {
    playGame = true;
    let state = true

    cells.forEach((elm) => {
        elm.addEventListener('click', (e) => {

            // error for double click
            if (elm.innerHTML.trim() !=='') {
                elm.style.color = 'red'
                let wrong = new Audio('./audio/beep.mp3')
                wrong.play()
                setTimeout(() => {
                    elm.style.color = 'inherit'
                }, 777)
                return; // Cell is already filled, do nothing
            }
            else {

                if (playGame) {
                    if (state) {
                        elm.innerHTML = `${O}`
                        state = false;
                        turn.innerHTML = `${o}`
                        let soundO = new Audio('./audio/OTone.mp3')
                        soundO.play()
                        winningCond()
                        cnt++
                        if (cnt >= 9) {
                            ++round.innerHTML
                            draw++
                            setTimeout(() => {
                                resetGame()
                            }, 1000)
                        }
                    } else {
                        elm.innerHTML = `${X}`
                        state = true;
                        turn.innerHTML = `${x}`
                        let soundX = new Audio('./audio/xTone.mp3')
                        soundX.play()
                        winningCond()
                        cnt++
                        if (cnt >= 9) {
                            ++round.innerHTML
                            draw++
                            setTimeout(() => {
                                resetGame()
                            }, 1000)
                        }
                    }
                }
            }


        }, true)
    })
}

function resetGame() {
    playGame = true
    cnt = 0
    cells.forEach((elm) => {
        elm.innerHTML = '';
        elm.style.color = 'inherit'
    })
}

// function resetFullGame(){
//     playGame = true
//     cnt = 0
//     draw = 0
//     scoreO = 0
//     scoreX = 0
//     round.innerHTML = 0
//     console.log(cells);
//     cells.forEach((elm) => {
//         elm.innerHTML = '';
//         elm.style.color = 'inherit'
//     })
//     console.log(cells);
// }

function resultgame() {
    document.querySelector('.r').innerHTML = round.innerHTML
    document.querySelector('.d').innerHTML = draw
    document.querySelector('.x').innerHTML = scoreX
    document.querySelector('.o').innerHTML = scoreO
    
    
    
    const playerArr = getName()
    
    
    if (scoreX > scoreO) {
        document.querySelector('.win-person').innerHTML = playerArr[1].value
        document.querySelector('.win-logo').innerHTML = x
    }
    if (scoreX < scoreO) {
        document.querySelector('.win-person').innerHTML = playerArr[0].value
        // document.querySelector('.win-person').innerHTML = player_o
        document.querySelector('.win-logo').innerHTML = o
    }
    if (scoreX == scoreO) {
        document.querySelector('.win-person').innerHTML = "DRAW!"
        document.querySelector('.win-person').style.fontSize = '2rem'
        document.querySelector('.win-person').style.textAlign = 'center'
        document.querySelector('.win-person').style.fontWeight = "600"
    }
    

}





// movement of page
const enterpage = document.getElementById('enterpage')
const playpage = document.getElementById('playpage')
const resultpage = document.getElementById('resultpage')
const finishgame = document.getElementById('finishgame')
const restart = document.getElementById('restart')

const start_btn = document.querySelector('.start-btn')
start_btn.addEventListener('click', (e) => {
    // resetGame()
     const playerArr = getName()
    if (!playerArr[0].value || !playerArr[1].value) {
        alert("Enter player name")
        return
    }else {
        startgame()
        enterpage.style.display = 'none'
        playpage.style.display = 'flex'
    }

})

finishgame.addEventListener('click', (e) => {
    resultgame()
    playpage.style.display = 'none'
    resultpage.style.display = 'flex'

})

restart.addEventListener('click', (e) => {
    // resetGame()
    // resetFullGame()
    removeName()
    resultpage.style.display = 'none'
    enterpage.style.display = 'flex'
    window. location. reload()
})
