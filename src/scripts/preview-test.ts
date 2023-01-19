const fileValues = ["a", "b", "c", "d", "e", "f", "g", "h"]
class ChessCoords {
  file(c) {
    return fileValues[c]
  }

  rank(r) {
    return Math.abs(r - 8)
  }

  a1Notation(r, c) {
    return `${this.file(c)}${this.rank(r)}`
  }

  rc(a1Notation) {}
}

const blackTray: any = document.querySelector(".black-tray")
const whiteTray: any = document.querySelector(".white-tray")
export const boardElement: any = document.querySelector(".board")

const chessCoords = new ChessCoords()
/* cSpell:disable */
const trayPieces = "pnbrqke"

blackTray.innerHTML = trayPieces
  .toUpperCase()
  .split("")
  .map((ch) => `<div data-role="${ch}" draggable="true"></div>`)
  .join("\n")

whiteTray.innerHTML = trayPieces
  .split("")
  .map((ch) => `<div data-role="${ch}"draggable="true"></div>`)
  .join("\n")

boardElement.innerHTML = `<div data-role=""><span></span></div>`.repeat(64)
/* cSpell:enable */

export const squares: any = boardElement.querySelectorAll(`div[data-role]`)
export const board2d = new Array()
for (let r = 0, n = 0; r < 8; r++) {
  board2d.push(new Array(8))
  for (let c = 0; c < 8; c++, n++) {
    const square = squares[n]
    board2d[r][c] = square
    square.dataset.a1Notation = chessCoords.a1Notation(r, c)
    square.dataset.rank = chessCoords.rank(r)
    square.dataset.file = chessCoords.file(c)
    square.ondblclick = () => (square.dataset.role = "")
  }
}

const draggablePieces: any = document.querySelectorAll(`section.tray div[data-role]`)

draggablePieces.forEach((p) => (p.ondragstart = (e) => e.dataTransfer.setData("text/plain", e.target.dataset.role)))

boardElement.ondragover = (e) => {
  e.preventDefault()
  e.dataTransfer.dropEffect = "move"
}

boardElement.ondrop = (e) => {
  e.preventDefault()
  const target = e.target.tagName === "DIV" ? e.target : e.target.parentElement
  const role = e.dataTransfer.getData("text/plain")

  if (role.toUpperCase() === "E") {
    if (!(target.dataset.rank == 3 || target.dataset.rank == 6)) return
    if (target.dataset.rank == 3 && role != "e") return
    if (target.dataset.rank == 6 && role != "E") return
    const empessant: any = document.querySelector(`section.board div[data-role=e]`)
    if (empessant) empessant.dataset.role = ""
  }
  target.dataset.role = role
}
