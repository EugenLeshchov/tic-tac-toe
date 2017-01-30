class TicTacToe {
    constructor(size = 3) {
        // set internal game field parameters
        this._size = size;

        // initializing game field with certain number of rows and columns
        this._gameField = [];
        for (let index = 0; index < size; index++) {
            this._gameField.push(new Array(this._size).fill(null));
        }

        // give first turn to X
        this._currentSymbol = 'x';
        this._emptyCellsNumber = size * size;

        this._isWon = false;
        this._isDraw = false;
        this._winnerSymbol = '';
    }

    revertCurrentPlayerSymbol() {
        if (this._currentSymbol !== 'x') return this._currentSymbol = 'x';
        return this._currentSymbol = 'o';
    }

    getCurrentPlayerSymbol() {
        return this._currentSymbol;
    }

    checkPosition(rowIndex, columnIndex) {
        const isIdentical = (symbol) => symbol === this._currentSymbol;

        return this._isWon = this._gameField[rowIndex].every(isIdentical)
                || this._gameField.map((row) => {
                        return row[columnIndex];
                    }).every(isIdentical)
                || this._gameField.map((row, rowIndex) => {
                    return row.filter((symbol, colIndex) => {
                        return colIndex === rowIndex;
                    })[0]
                }).every(isIdentical)
                || this._gameField.map((row, rowIndex) => {
                    return row.filter((symbol, colIndex) => {
                        return colIndex + rowIndex === this._size - 1;
                    })[0]
                }).every(isIdentical);
    }

    reduceEmptyCellsNumber() {
        this._emptyCellsNumber--;
        this._isDraw = !this._emptyCellsNumber;
    }

    nextTurn(rowIndex, columnIndex) {
        if (this._gameField[rowIndex][columnIndex] === null
                && !this.isFinished()) {
            this._gameField[rowIndex][columnIndex] = this.getCurrentPlayerSymbol();

            if (this.checkPosition(rowIndex, columnIndex)) {
                this._winnerSymbol = this.getCurrentPlayerSymbol();
            }
            this.reduceEmptyCellsNumber();
            this.revertCurrentPlayerSymbol();
        }
    }

    isFinished() {
        return this._isDraw || this._isWon;
    }

    getWinner() {
        if (this._isWon) return this._winnerSymbol;
        return null;
    }

    noMoreTurns() {
        return !this._emptyCellsNumber;
    }

    isDraw() {
        return this._isDraw && !this._isWon;
    }

    getFieldValue(rowIndex, colIndex) {
        return this._gameField[rowIndex][colIndex];
    }
}

debugger;

module.exports = TicTacToe;
