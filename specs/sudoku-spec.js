import { Sudoku } from './../src/backend.js';
import { matrix, matrixNotEnoughEntries, matrixContainsGarbage, matrixOutOfRange, matrixNotASolution } from './../src/constants.js';

describe('Sudoku object and associated prototypes', function() {

  let sudokuTestObj;
  let rand;

  beforeEach(function() {
    sudokuTestObj = new Sudoku(matrix);
    rand = Math.floor(Math.random()*9);
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

  it('should test that rows of matrix match rows of object.rows.', function() {
    expect(sudokuTestObj.matrix[rand]).toEqual(sudokuTestObj.rows[rand]);
  });

  it('should test that columns of matrix match columns of .cols()', function() {
    let col = [];
    for (var i = 0; i < 9; i++) {
      col.push(matrix[i][rand]);
    }
    expect(col).toEqual(sudokuTestObj.cols[rand]);
  });

  it('should test that 3x3 boxes of matrix match boxes of .boxes()', function() {
    let n = Math.floor(Math.random()*3);
    let m = Math.floor(Math.random()*3);
    // console.log("karma is updating, i think?");
    let getBox;
    if (n == 0) {
      getBox = sudokuTestObj.boxes[m];
    }
    else if (n == 1) {
      getBox = sudokuTestObj.boxes[m+3];
    }
    else if (n == 2) {
      getBox = sudokuTestObj.boxes[m+6];
    }
    expect(sudokuTestObj.matrix[3*n][3*m]).toEqual(getBox[0]);
    expect(sudokuTestObj.matrix[3*n+1][3*m+1]).toEqual(getBox[4]);
    expect(sudokuTestObj.matrix[3*n+2][3*m+2]).toEqual(getBox[8]);
  });

  it('should test an array, return true if that array is a permutation of 1,2, ... 9, and return false if not.', function() {
    let good = [4,2,1,7,5,9,3,6,8];
    let bad = [1,4,8,3,7,3,9,2,5];
    good = sudokuTestObj.arrCheck(good);
    bad = sudokuTestObj.arrCheck(bad);
    expect(bad).toBe(false);
    expect(good).toBe(true);
  });

  it('should test that all possible arrays are valid permutations of 1 through 9, and return false if not.', function() {
    let bad = new Sudoku(matrixNotASolution);
    expect(sudokuTestObj.solutionCheck()).toBe(true);
    expect(bad.solutionCheck()).toBe(false);
  });

});
