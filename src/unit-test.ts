import { FenRecord } from "./fen-record"
/* cSpell:disable */

export const testBlackCanCastleKingsSide = () => {
  const fen = new FenRecord()
  fen.blackCanCastleKingsSide = false
  console.assert(fen.data === `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w Qkq - 0 1`, fen.data)
}

export const testBlackCanCastleQueensSide = () => {
  const fen = new FenRecord()
  fen.blackCanCastleQueensSide = false
  console.assert(fen.data === `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`, fen.data)
}

export const runAllTests = () => {
  testBlackCanCastleKingsSide()
  testBlackCanCastleQueensSide()
}
