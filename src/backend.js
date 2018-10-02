export function Sudoku(matrix) {
  this.goodArr = [1,2,3,4,5,6,7,8,9];

  this.matrix = matrix;

  this.rows = function() {
    let rowArr = [];
    let row = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 0; j++) {
        row.push(matrix[i][j]);
      }
      rowArr.push(row);
    }
    return rowArr;
  };

  this.cols = function() {
    let colArr = [];
    let col = [];
    for (let j = 0; j < 9; j++) {
      for (let i = 0; i < 9; i++) {
        col.push(matrix[i][j]);
      }
      colArr.push(col);
    }
    return colArr;
  };

  this.boxes = function() {
    let boxArr = [];
    let box = [];
    let loop = function(starti, startj) {
      let box = [];
      for (let i = starti; i < starti + 3; i++) {
        for (let j = startj; j < startj + 3; j++) {
          box.push(matrix[i][j]);
        }
      }
      return box;
    }
    for (let k = 0; k < 9; k = k + 3 ) {
      for (let l = 0; l < 9; l = l + 3) {
        box = loop(k, l);
        boxArr.push(box);
      }
    }
    return boxArr;
  };
}

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
  let out = true;
  let sorted = [];
  arr.forEach(function(elt) {
    sorted.push(elt);
  })
  sorted.sort(function(a,b) {
    return b - a;
  });
  sorted.forEach(function(elt,i) {
    if (elt != this.goodArr[i]) {
      out = false;
    }
  })
  return out;
};

Sudoku.prototype.solutionCheck = function() {
  this.rows.forEach(function(arr) {
    if (!this.arrCheck(arr)) {
      return false;
    }
  })
  this.cols.forEach(function(arr) {
    if (!this.arrCheck(arr)) {
      return false;
    }
  })
  this.boxes.forEach(function(arr) {
    if (!this.arrCheck(arr)) {
      return false;
    }
  })
  return true;
};
