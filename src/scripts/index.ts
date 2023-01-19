import { runAllTests } from "./unit-test"
import { game as g } from "./test-data/448600279"
import { board2d, squares } from "./preview-test"
import { FenRecord } from "./fen-record"

const record = new FenRecord()
const board = record.board

function initPreview2d() {
  for (let r = 0, n = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++, n++) {
      board2d[r][c].dataset.role = board[r][c]
    }
  }
}

initPreview1d()

function initPreview1d() {
  const list = board.flat()
  for (let i = 0; i < list.length; i++) {
    squares[i].dataset.role = list[i]
  }
}

console.log(Object.entries(g))
