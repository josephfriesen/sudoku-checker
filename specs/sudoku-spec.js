import { Sudoku } from './../src/backend.js';

describe('Sudoku object and associated prototypes', function() {

  let sudokuTestObj;
  const matrix = [
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9]
  ];
  const matrixNotEnoughEntries = [
    [5,3,4,6,7,8,9,1],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9]
  ];
  const matrixContainsGarbage = [
    [5,3,4,6,7,"hi",9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9]
  ];
  const matrixOutOfRange = [
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,9,7,6,1,4,2,3],
    [4,2,6,8,5,3,7,87,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9]
  ];
  const matrixNotASolution = [
    [5,3,4,6,7,8,9,1,2],
    [6,7,2,1,9,5,3,4,8],
    [1,9,8,3,4,2,5,6,7],
    [8,5,1,7,6,9,4,2,3],
    [4,2,6,8,5,3,7,9,1],
    [7,1,3,9,2,4,8,5,6],
    [9,6,1,5,3,7,2,8,4],
    [2,8,7,4,1,9,6,3,5],
    [3,4,5,2,8,6,1,7,9]
  ];

  beforeEach(function() {
    sudokuTestObj = new Sudoku(matrix);
  });

  it('should test all entries of a given matrix and determine if they are all integers', function() {
    let sudokuGarbage = new Sudoku(matrixContainsGarbage);
    expect(sudokuGarbage.entryCheck()).toContain("not an integer");
    expect(sudokuTestObj.entryCheck()).toEqual("Good");
  });

  it('should test that a given matrix is complete with 81 valid entries', function() {
    let sudokuBad = new Sudoku(matrixNotEnoughEntries);
    expect(sudokuTestObj.entryCount()).toEqual("Good");
    expect(sudokuBad.entryCount()).not.toEqual("Good");
  });

  it('should test that all inputted integer values are in the range of 1 to 9.', function() {
    let sudokuOutOfRange = new Sudoku(matrixOutOfRange);
    let sudokuGarbage = new Sudoku(matrixContainsGarbage);
    expect(sudokuOutOfRange.entryCheck()).toContain("not between 1 and 9");
    expect(sudokuTestObj.entryCheck()).toEqual("Good");
  });

});
