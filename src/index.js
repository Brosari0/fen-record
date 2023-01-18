
/* Forsyth–Edwards Notation: https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation#:~:text=Forsyth%E2%80%93Edwards%20Notation%20(FEN),Scottish%20newspaper%20journalist%20David%20Forsyth. */
/* cSpell:disable */
export const DefaultFenData = `rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1`
export const EmptyFenData = `8/8/8/8/8/8/8/8 w KQkq - 0 1`
const FenParts = {
    PIECE_PLACEMENT_DATA: 0,
    ACTIVE_COLOR: 1,
    CASTLING_AVAILABILITY: 2,
    EN_PASSANT_TARGET_SQUARE: 3,
    HALF_MOVE_CLOCK: 4,
    FULL_MOVE_NUMBER: 5
}
/* cSpell:enable */
export class FenRecord {
    constructor(data = DefaultFenData) {
        this.data = data
    }

    clear() {
        this.data = fen
    }

    get activeColor() {
        return this._dataParts[1]
    }

    get board() {
        const data = this.piecePlacementData.split('/')
        const board = Array(8)
        window.board = board
        for (let r = 0; r < board.length; r++) {
            board[r] = Array(8).fill(" ")
            let c = 0

            for (let n = 0; n < data[r].length; n++) {
                const ch = data[r][n]
                if (isNaN(ch))
                    board[r][c++] = ch
                else
                    c += +ch
            }
        }

        return board
    }

    get whiteCanCastleQueensSide() {
        return this.castlingAvailability.includes('k')
    }

    set whiteCanCastleQueensSide(value) {
        return this.castlingAvailability.includes('q')
    }

    get blackCanCastleQueensSide() {
        return this.castlingAvailability.includes('K')
    }

    set blackCanCastleQueensSide(value) {
        return this.castlingAvailability.includes('Q')
    }

    get castlingAvailability() {
        return this._dataParts[FenParts.CASTLING_AVAILABILITY]
    }

    get enPassantSquare() {
        return this._dataParts[FenParts.EN_PASSANT_TARGET_SQUARE]
    }

    get fullMoveNumber() {
        return this._dataParts[FenParts.FULL_MOVE_NUMBER]
    }

    get halfMoveClock() {
        return this._dataParts[FenParts.HALF_MOVE_CLOCK]
    }

    get piecePlacementData() {
        return this._dataParts[FenParts.PIECE_PLACEMENT_DATA]
    }

    get _dataParts() {
        return this.data.split(' ')
    }

}

function startsWithCapital(word) {
    return word.charAt(0) === word.charAt(0).toUpperCase()
}

