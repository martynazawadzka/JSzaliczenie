const sudoku = require('./sudokuExample');

const isInRow = (row, newNumber) => row.some(number => number === newNumber);

const isInColumn = (columnIndex, newNumber, sudoku) => {
  const column = [];
  sudoku.map(row => column.push(row[columnIndex]));
  return column.some(number => number === newNumber);
};

getIndexes = currentIndex => {
  if (currentIndex % 3 === 0) {
    return [
      Number(currentIndex),
      Number(currentIndex) + 1,
      Number(currentIndex) + 2
    ];
  } else if (currentIndex % 3 === 1) {
    return [
      Number(currentIndex) - 1,
      Number(currentIndex),
      Number(currentIndex) + 1
    ];
  } else if (currentIndex % 3 === 2) {
    return [
      Number(currentIndex) - 2,
      Number(currentIndex) - 1,
      Number(currentIndex)
    ];
  }
};

const findSquareIndexes = (cellI, cellJ) => {
  const rowIndexes = getIndexes(cellI);
  const columnIndexes = getIndexes(cellJ);

  return {
    rowIndexes,
    columnIndexes
  };
};

const isInSquare = (cellI, cellJ, number, sudoku) => {
  const squareIndexes = findSquareIndexes(cellI, cellJ);

  for (row of squareIndexes.rowIndexes) {
    for (column of squareIndexes.columnIndexes) {
      if (sudoku[row][column] === number) {
        return true;
      }
    }
  }
};

const checkOneCell = (cellI, cellJ, number, sudoku) => {
  if (
    !isInRow(sudoku[cellI], number) &&
    !isInColumn(cellJ, number, sudoku) &&
    !isInSquare(cellI, cellJ, number, sudoku)
  ) {
    return {
      cellI,
      cellJ
    };
  }
};

const squareSolver = (cellI, cellJ, number, sudoku) => {
  const squareIndexes = findSquareIndexes(cellI, cellJ);
  const matchingCells = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const rowIndex = squareIndexes.rowIndexes[i];
      const columnIndex = squareIndexes.columnIndexes[j];
      if (sudoku[rowIndex][columnIndex] === 0) {
        const cell = checkOneCell(rowIndex, columnIndex, number, sudoku);
        if (cell) {
          matchingCells.push(cell);
        }
      }
    }
  }
  if (matchingCells.length === 1) {
    sudoku[matchingCells[0].cellI][matchingCells[0].cellJ] = number;
  }
};

const isNotSolved = sudoku =>
  sudoku.some(row => row.some(number => number === 0));

const solver = sudoku => {
  let counter = 0;
  while (isNotSolved(sudoku)) {
    for (let i = 0; i < sudoku.length; i++) {
      for (let j = 0; j < sudoku[i].length; j++) {
        for (let k = 1; k < 10; k++) {
          squareSolver(i, j, k, sudoku);
        }
      }
    }
    counter++;
  }
};

solver(sudoku);
console.log(sudoku);
