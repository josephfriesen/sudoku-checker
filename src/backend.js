export function Sudoku(matrix) {

  this.matrix = matrix;

  // This method is redundant, creates an exact copy of matrix, we can just run the solutionCheck() method on matrix without creating this.rows().
  this.rows = this.getRows();

  this.cols = this.getCols();

  this.boxes = this.getBoxes();

}

Sudoku.prototype.getRows = function() {
  let rowArr = [];
  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      row.push(this.matrix[i][j]);
    }
    rowArr.push(row);
  }
  return rowArr;
};

Sudoku.prototype.getCols = function() {
  let colArr = [];
  for (let j = 0; j < 9; j++) {
    let col = [];
    for (let i = 0; i < 9; i++) {
      col.push(this.matrix[i][j]);
    }
    colArr.push(col);
  }
  return colArr;
};

Sudoku.prototype.getBoxes = function() {
  let boxArr = [];
  let loop = (starti, startj) => {
    let box = [];
    for (let i = starti; i < starti + 3; i++) {
      for (let j = startj; j < startj + 3; j++) {
        box.push(this.matrix[i][j]);
      }
    }
    return box;
  }
  for (let k = 0; k < 9; k = k + 3 ) {
    for (let l = 0; l < 9; l = l + 3) {
      let box = loop(k, l);
      boxArr.push(box);
    }
  }
  return boxArr;
};

Sudoku.prototype.entryCount = function() {
  let out = true;
  if (this.matrix.length != 9) {
    out = false;
  }
  this.matrix.forEach(function(row) {
    if (row.length != 9) {
      out = false;
    }
  })
  if (out) {
    return "Good";
  }
  else {
    return "This is not a 9x9 matrix. Please check and resubmit."
  }
}

Sudoku.prototype.entryCheck = function() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (this.matrix[i][j] % 1 != 0) {
        return "This matrix contains an entry " + this.matrix[i][j] + " that is not an integer, please check and resubmit.";
      }
      else if (this.matrix[i][j] < 1 || this.matrix[i][j] > 9) {
        return "This matrix contains an entry " + this.matrix[i][j] + " that an integer that is not between 1 and 9, please check and resubmit.";
      }
    }
  }
  return "Good";
};

Sudoku.prototype.arrCheck = function(arr) {
  const goodArr = [1,2,3,4,5,6,7,8,9];
  let out = true;
  let sorted = [];
  arr.forEach(function(elt) {
    sorted.push(elt);
  })
  sorted.sort(function(a,b) {
    return a - b;
  });
  sorted.forEach(function(elt,i) {
    if (elt !== goodArr[i]) {
      out = false;
    }
  })
  return out;
};

Sudoku.prototype.solutionCheck = function() {
  let out = true;
  this.rows.forEach(arr => {
    if (this.arrCheck(arr) == false) {
      out = false;
    }
  });
  this.cols.forEach(arr => {
    if (this.arrCheck(arr) == false) {
      out = false
    }
  });
  this.boxes.forEach(arr => {
    if (this.arrCheck(arr) == false) {
      out = false;
    }
  });
  return out;
};
