const Cell = (row, col) => {
    const target = document.querySelector(`.cell.row${row}.col${col}`);
    const showDetails = () => console.log(target);
    const getRowNum = () => {
        return Number.parseInt(target.classList[1][3]);
    }
    const getColNum = () => {
        return Number.parseInt(target.classList[2][3]);
    }
    const paintCell = (turn) => {
        target.classList.add(turn);
        target.innerHTML = turn.toUpperCase();
    }
    const clearCell = () => {
        target.classList.remove("o");
        target.classList.remove("x");
        target.innerHTML = "";
    }
    return {
        target,
        paintCell, 
        showDetails, 
        clearCell, 
        getRowNum,
        getColNum
    }
}

const gameboard = (() => {
    grid = [];
    arr = [];
    for (let row = 1; row <= 3; row++) {
        let rowArr = [];
        for (let col = 1; col <= 3; col++) {
            let cell = Cell(row, col);

            listen(cell);

            rowArr.push("");
            grid.push(cell);
        }
        arr.push(rowArr);
    }

    const turnCounterCreator = (start) => {
        let turnCounter = start + 1;
        return () => {
            console.log(turnCounter);
            turnCounter++;
        };
    };

    const turnCounter = turnCounterCreator(0);

    function listen(cell) {
        cell.target.addEventListener("click", () => {
            cell.paintCell(turn);
            arr[cell.getRowNum()-1][cell.getColNum()-1] = turn;
            reverseTurn();
            turnCounter();
            checkWinner();
        });
    }

    function checkWinner(){
        
    }

    function reverseTurn(){
        let htmlTurn = document.querySelector(".turn");
        if (turn == "x") {
            htmlTurn.classList.remove("x");
            htmlTurn.classList.add("o");
            htmlTurn.innerHTML = "COMPUTER'S TURN"
            turn = "o";
        } else {
            htmlTurn.classList.remove("o");
            htmlTurn.classList.add("x");
            htmlTurn.innerHTML = "YOUR TURN"
            turn = "x";
        }
    }

    const clearGameBoard = () => {
        for (let cell of grid) {
            cell.clearCell();
        }
    }

    const showGameboard = () => {
        console.log(grid);
    }

    return {clearGameBoard, showGameboard}
})();

let turn = "x";

gameboard.clearGameBoard();