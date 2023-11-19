// Required Variables
let playGame = true;
let cnt = 0
let widraw = 0



const O = `<i class="cellxo fa-regular fa-circle"></i>`
const o = `<i class="turnxo fa-regular fa-circle"></i>`
const X = `<i class="cellxo fa-solid fa-x"></i>`
const x = `<i class="turnxo fa-solid fa-x"></i>`


// Game play screen
const turn = document.querySelector('.turn')
const round = document.querySelector('.round')
const cells = document.querySelectorAll('.cell')

// state symbole






// winning condition

function winningCond() {

    function winred(i, j, k) {
        cells[i].style.color = 'red'
        cells[j].style.color = 'red'
        cells[k].style.color = 'red'
        // let a = cells[i].innerHTML
        // a.classList.add('animated-character')
        // let b = cells[j]
        // b.classList.add('animated-character')
        // let c = cells[k]
        // c.classList.add('animated-character')
        ++round.innerHTML
        const winElement = cells[i].innerHTML
        const winner = (winElement === O)? 'Circle' : 'Cross'
        console.log(winner);
        playGame = false;
        setTimeout(() => {
            resetGame()
        }, 2000)
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



// Start Game
function startgame() {
    playGame = true;

    const player_o = document.getElementById('player-o').value
    const player_x = document.getElementById('player-x').value

    let Xscore = 0
    let Oscore = 0


    let state = true


    cells.forEach((elm) => {
        elm.addEventListener('click', (e) => {

            // error for double click
            if (elm.innerHTML.trim() !== '') {
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
                            widraw++
                            setTimeout(() => {
                                resetGame()
                            }, 2000)
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
                            widraw++
                            setTimeout(() => {
                                resetGame()
                            }, 2000)
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
        elm.textContent = '';
        elm.style.color = 'inherit'
    })
}

function resultgame(name, totalround, winscore) {

}





// movement of page
const enterpage = document.getElementById('enterpage')
const playpage = document.getElementById('playpage')
const resultpage = document.getElementById('resultpage')
const finishgame = document.getElementById('finishgame')
const restart = document.getElementById('restart')

const start_btn = document.querySelector('.start-btn')
start_btn.addEventListener('click', (e) => {
    // const player_o = document.getElementById('player-o').value
    // const player_x = document.getElementById('player-x').value
    // if (!player_x || !player_o) {
    //     alert("Enter player name")
    // } else {
    //     startgame()
    //     enterpage.style.display = 'none'
    //     playpage.style.display = 'flex'
    // }

    startgame()
    enterpage.style.display = 'none'
    playpage.style.display = 'flex'

})

finishgame.addEventListener('click', (e) => {
    console.log(round.innerHTML);
    playpage.style.display = 'none'
    resultpage.style.display = 'flex'

})

restart.addEventListener('click', (e) => {
    resultpage.style.display = 'none'
    enterpage.style.display = 'flex'

})
