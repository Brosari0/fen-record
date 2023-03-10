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

  movePieceByRowCol(fromR: number, fromC: number, toR: number, toC: number) {
    const board = this.board
    board[toR][toC] = board[fromR][fromC]
    board[fromR][fromC] = ""
    this.board = board
  }

  set board(value: string[][]) {
    const board: string[][] = this.board /* copy the current board[][] */
    // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR
    const newRowValues: string[] = [] /* holds the new row values */
    for (let r = 0; r < board.length; r++) {
      const row = board[r] /* references the current board row */
      let counter = 0 /* tracks the number of empty squares as the row column is iterated over */
      let rowResult = "" /* stores the string notation of the current row */
      for (let c = 0; c < row.length; c++) {
        if (row[c] === "") {
          /* Current square is empty */
          counter++
        } else {
          /* Current square contains a piece */
          if (counter > 0) {
            /* take the count of empty square before this column and append it to the current row result*/
            rowResult += counter
            counter = 0 /* Resset the empty square counter */
          }
          rowResult += row[c] /* Add the current piece to the row result */
        }
      }
      if (counter > 0) rowResult += counter
      /* Add the current row result to the values array */
      newRowValues.push(rowResult)
    }

    const list = this._dataParts
    /* Join the new row values deleimited with a forword slash 
    and  assign it to the piece placement element */
    list[FenParts.PIECE_PLACEMENT_DATA] = newRowValues.join("/")

    /* Update the string data */
    this.data = list.join(" ")
  }

  get board(): string[][] {
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

  get isWhitesMove(): boolean {
    return this._dataParts[FenParts.ACTIVE_COLOR] === "w"
  }

  set isWhitesMove(isWhite: boolean) {
    const list = this._dataParts
    list[FenParts.ACTIVE_COLOR] = isWhite ? "w" : "b"
    this.data = list.join(" ")
  }

  private get _dataParts(): string[] {
    return this.data.split(" ")
  }

  get piecePlacementData(): string {
    return this._dataParts[FenParts.PIECE_PLACEMENT_DATA]
  }

  private updateCastlingAvailability(blackKingSide: boolean, blackQueenSide: boolean, whiteKingSide: boolean, whiteQueenSide: boolean) {
    const list = this._dataParts
    list[FenParts.CASTLING_AVAILABILITY] = `${blackKingSide ? "K" : ""}${blackQueenSide ? "Q" : ""}${whiteKingSide ? "k" : ""}${whiteQueenSide ? "q" : ""}`
    this.data = list.join(" ")
  }

  get castlingAvailability(): string {
    return this._dataParts[FenParts.CASTLING_AVAILABILITY]
  }

  get blackCanCastleKingsSide(): boolean {
    return this.castlingAvailability.includes("K")
  }

  get blackCanCastleQueensSide(): boolean {
    return this.castlingAvailability.includes("Q")
  }

  get whiteCanCastleKingsSide(): boolean {
    return this.castlingAvailability.includes("k")
  }

  get whiteCanCastleQueensSide(): boolean {
    return this.castlingAvailability.includes("q")
  }

  set blackCanCastleKingsSide(value) {
    this.updateCastlingAvailability(value, this.blackCanCastleQueensSide, this.whiteCanCastleKingsSide, this.whiteCanCastleQueensSide)
  }

  set blackCanCastleQueensSide(value) {
    this.updateCastlingAvailability(this.blackCanCastleKingsSide, value, this.whiteCanCastleKingsSide, this.whiteCanCastleQueensSide)
  }

  set whiteCanCastleKingsSide(value) {
    this.updateCastlingAvailability(this.blackCanCastleKingsSide, this.blackCanCastleQueensSide, value, this.whiteCanCastleQueensSide)
  }

  set whiteCanCastleQueensSide(value) {
    this.updateCastlingAvailability(this.blackCanCastleKingsSide, this.blackCanCastleQueensSide, this.whiteCanCastleKingsSide, value)
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

  set fullMoveNumber(value) {
    const list = this._dataParts
    list[FenParts.FULL_MOVE_NUMBER] = `${value}`
    this.data = list.join(" ")
  }

  set halfMoveClock(value) {
    const list = this._dataParts
    list[FenParts.HALF_MOVE_CLOCK] = `${value}`
    this.data = list.join(" ")
  }

  incrementFullMoveNumber(): number {
    this.fullMoveNumber += 1
    return this.fullMoveNumber
  }

  incrementhalfMoveClock(): number {
    this.halfMoveClock += 1
    return this.halfMoveClock
  }
}

function startsWithCapital(word: string): boolean {
  return word.charAt(0) === word.charAt(0).toUpperCase()
}
