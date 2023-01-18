/* Forsyth–Edwards Notation: https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation#:~:text=Forsyth%E2%80%93Edwards%20Notation%20(FEN),Scottish%20newspaper%20journalist%20David%20Forsyth. */
/* cSpell:disable */
export const DefaultFenData: string = `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`
export const EmptyFenData: string = `8/8/8/8/8/8/8/8 w KQkq - 0 1`
/* cSpell:ensable */

enum FenParts {
  PIECE_PLACEMENT_DATA,
  ACTIVE_COLOR,
  CASTLING_AVAILABILITY,
  EN_PASSANT_TARGET_SQUARE,
  HALF_MOVE_CLOCK,
  FULL_MOVE_NUMBER,
}

export class FenRecord {
  data: string
  constructor(data: string = DefaultFenData) {
    this.data = data
  }

  clear() {
    this.data = DefaultFenData
  }

  get activeColor() {
    return this._dataParts[FenParts.ACTIVE_COLOR]
  }

  get _dataParts(): string[] {
    return this.data.split(" ")
  }

  get piecePlacementData(): string {
    return this._dataParts[FenParts.PIECE_PLACEMENT_DATA]
  }

  get board() {
    const data = this.piecePlacementData.split("/")
    const board = Array(8)

    for (let r = 0; r < board.length; r++) {
      board[r] = Array(8).fill(" ")
      let c = 0

      for (let n = 0; n < data[r].length; n++) {
        const ch: string = data[r][n]
        if (isNaN(Number(ch))) board[r][c++] = ch
        else c += +ch
      }
    }

    return board
  }

  get castlingAvailability(): string {
    return this._dataParts[FenParts.CASTLING_AVAILABILITY]
  }

  get whiteCanCastleQueensSide(): boolean {
    return this.castlingAvailability.includes("k")
  }

  set whiteCanCastleQueensSide(value) {
    this.castlingAvailability.includes("q")
  }

  get blackCanCastleQueensSide(): boolean {
    return this.castlingAvailability.includes("K")
  }

  set blackCanCastleQueensSide(value) {
    this.castlingAvailability.includes("Q")
  }

  get enPassantSquare(): string {
    return this._dataParts[FenParts.EN_PASSANT_TARGET_SQUARE]
  }

  get fullMoveNumber(): number {
    return Number(this._dataParts[FenParts.FULL_MOVE_NUMBER])
  }

  get halfMoveClock(): number {
    return Number(this._dataParts[FenParts.HALF_MOVE_CLOCK])
  }
}

function startsWithCapital(word: string): boolean {
  return word.charAt(0) === word.charAt(0).toUpperCase()
}
