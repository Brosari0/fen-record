import { FenRecord } from "./fen-record"

const fen = new FenRecord()
// fen.blackCanCastleKingsSide = false

console.log(fen)
console.table(fen.board)