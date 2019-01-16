/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard,
//  with n rooks placed such that none of them can attack each other

var queenTest = function(n, testNumber, newNumber) {
  if (testNumber % n === newNumber % n) {
    return false;
  } else if (testNumber % n - Math.floor(testNumber / n) === newNumber % n - Math.floor(newNumber / n)) {
    return false;
  } else if (testNumber % n + Math.floor(testNumber / n) === newNumber % n + Math.floor(newNumber / n)) {
    return false;
  } else { 
    return true;
  }
};

var queenParser = function(n, ...nums) {
  var result = new Board( { n: n } );
  for (index of nums) {
    result.togglePiece(Math.floor(index / n), index % n);
  }
  return result;
};

window.findNRooksSolution = function(n) {
  
  var solution = new Board( { 'n' : n} );
  for (let i = 0; i < n; i ++) {
    solution.togglePiece(i, i);
  }

  if (!solution.hasAnyRooksConflicts()) {
    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
    return solution.rows();
  } else {
    console.log('solution failed');
  }
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var solvedBoards = [];
  var totalSolutions = 0;
  
  var recurse = function(depth = 0, ...nums) {
    if (depth === n) {
      totalSolutions++;
      return;
    }
    for (var i = 0; i < n; i ++) {
      if (!nums.includes((depth * n + i) % n)) { recurse(depth + 1, ...nums, (depth * n + i) % n) }
    }
    return;
  };
  
  recurse();
  console.log('Number of solutions for ' + n + ' rooks:', totalSolutions);
  return totalSolutions;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  
  var recurse = function(depth = 0, ...nums) {
    if (depth === n) {
      return nums;
    }
    for (var i = 0; i < n; i ++) {
      if (nums.every(num => queenTest(n, num, (depth * n + i)))) { // test for queens
        return recurse(depth + 1, ...nums, (depth * n + i))
      }
    }
    return;
  };

  var resultNums = recurse();
  var resultBoard = queenParser(n, resultNums)
  //console.log('Single solution for ' + n + ' queens:', JSON.stringify(resultBoard));
  return resultBoard.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) { //fixMe

  var totalSolutions = 0;
  
  var recurse = function(depth = 0, ...nums) {
    if (depth === n) {
      totalSolutions++;
      return;
    }
    for (var i = 0; i < n; i ++) {
      if (nums.every(num => queenTest(n, num, (depth * n + i)))) { // test for queens
        recurse(depth + 1, ...nums, (depth * n + i))
      }
    }
    return;
  };
  
  recurse();
  console.log('Number of solutions for ' + n + ' queens:', totalSolutions);
  return totalSolutions;
};


