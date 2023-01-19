let id = window.location.pathname.split('/').pop()

if (window.location.pathname.includes('analysis'))
    location.href = `https://www.chess.com/game/live/${id}?tab=review`

console.clear()

let game = {
    id: id,
    href: '',
    boards: null,
    fullMoveNumber: -1
}

let moveSet = null
const playsSelector = `[data-ply].node`

initGame()
addEventListener()

function initGame() {
    game.id = window.location.pathname.split('/').pop()
    game.href = window.location.href
    game.boards = {}
    game.fullMoveNumber = document.querySelectorAll(`${playsSelector}`).length
    /* <div data-ply="1" class="white node">d4</div> */
    const plays = document.querySelectorAll(`${playsSelector}`)

    plays.forEach((play) => {
        if (play.classList.contains('white') || play.classList.contains('black')) {
            const notation = play.textContent
            game.boards[notation] = null
        }
    })
}

function addEventListener() {
    moveSet = new Set()

    document.removeEventListener("click", clickListener, false)
    document.addEventListener("click", clickListener, false)

    function clickListener(e) {
        /* <div data-ply="3" class="white node selected"><span class="icon-font-chess bishop-white" data-figurine="B"></span>f4</div> */
        const play = document.querySelector(`${playsSelector}.selected`)
        if (!(play.classList.contains('white') || play.classList.contains('black'))) return

        const notation = play.textContent
        game.boards[notation] = currentBoard()

        moveSet.add(notation)
        console.log(moveSet.size)
        if (moveSet.size === game.fullMoveNumber) {
            console.log("Done!")
            console.log(game)
            postGame(game)
        }
    }
}

function currentBoard() {
    /* <div class="piece wr square-11" style=""></div> */
    let board = []
    for (let r = 0; r < 8; r++) {
        board.push(Array(8).fill(''))
        for (let c = 0; c < 8; c++) {
            const piece = document.querySelector(`.square-${r + 1}${c + 1}`)
            if (piece) {
                const pieceClass = piece.classList[1]
                const color = pieceClass[0]
                const notation = color === 'b' ? pieceClass[1].toUpperCase() : pieceClass[1]
                board[r][c] = notation
            }
        }
    }
    return board
}

function postGame(game) {
    fetch(`http://localhost/npm-packages/fen-record/src/filesaver.php?game-id=${game.id}`, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(game),
    }).then(result => result.json()).then(result => console.log(result)).catch(error => console.log(error))
}