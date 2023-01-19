import { FenRecord } from "./fen-record"
/* cSpell:disable */

export const testBlackCanCastleKingsSide = (): boolean => {
  const fen = new FenRecord()
  fen.blackCanCastleKingsSide = false
  const result = fen.data === `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w Qkq - 0 1`
  console.assert(result, fen.data)
  return result
}

export const testBlackCanCastleQueensSide = (): boolean => {
  const fen = new FenRecord()
  fen.blackCanCastleQueensSide = false
  const result = fen.data === `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w Kkq - 0 1`
  console.assert(result, fen.data)
  return result
}

export const runAllTests = () => {
  let passed = 0
  if (testBlackCanCastleKingsSide()) passed++
  if (testBlackCanCastleQueensSide()) passed++

  return {
    totalTest: 2,
    passed,
  }
}
