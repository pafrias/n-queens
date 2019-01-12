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
  
  var totalSolutions = 0;
  var parentBoard = new Board({ n: n });
  parentBoard.counter = 0;
  parentBoard.depth = 0;
  var deeper = function(prevBoard) {
    prevBoard.togglePiece(Math.floor(prevBoard.counter / n), prevBoard.counter % n);
    prevBoard.depth++;
    if (!prevBoard.hasAnyRooksConflicts(1)) {
      if (prevBoard.depth === n) {
        totalSolutions++;
        prevBoard.togglePiece(Math.floor(prevBoard.counter / n), prevBoard.counter % n);
        return null;
      } else {
        var parentRows = prevBoard.rows().slice(0);
        var child = new Board(parentRows);
        child.depth = prevBoard.depth;
        child.counter = (Math.floor(prevBoard.counter / n) + 1) * n;
        if (child._isInBounds(Math.floor(child.counter / n), child.counter % n)) {
          deeper(child);
        }
      }
    }
    prevBoard.togglePiece(Math.floor(prevBoard.counter / n), prevBoard.counter % n);
    prevBoard.depth--;
    prevBoard.counter++;
    if ((prevBoard.depth >= Math.floor(prevBoard.counter / n)) && 
      prevBoard._isInBounds(Math.floor(prevBoard.counter / n), prevBoard.counter % n)) {
      deeper(prevBoard);
    } else {
      return null;
    }
  };
  
  deeper(parentBoard);
  console.log('Number of solutions for ' + n + ' rooks:', totalSolutions);
  return totalSolutions;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  
  
  var solution = null;
  var parentBoard = new Board({ n: n });
  if (n === 0) return parentBoard;
  parentBoard.counter = 0;
  parentBoard.depth = 0; // pieces left to place
  var deeper = function(prevBoard) {
    prevBoard.togglePiece(Math.floor(prevBoard.counter / n), prevBoard.counter % n);
    prevBoard.depth++;
    if (!prevBoard.hasAnyQueensConflicts(1)) { //if board checks out
      if (prevBoard.depth === n) {
        solution = prevBoard.rows();
        return null;
      } else {
        var parentRows = prevBoard.rows().slice(0); // inheritance?
        var child = new Board(parentRows);
        child.depth = prevBoard.depth;
        child.counter = (Math.floor(prevBoard.counter / n) + 1) * n;
        if (child._isInBounds(Math.floor(child.counter / n), child.counter % n)) {
          deeper(child);
        }
      }
    }
    if (solution !== null) {
      return null;
    }
    prevBoard.togglePiece(Math.floor(prevBoard.counter / n), prevBoard.counter % n);
    prevBoard.depth--;
    prevBoard.counter++;
    if (prevBoard._isInBounds(Math.floor(prevBoard.counter / n), prevBoard.counter % n)) {
      deeper(prevBoard);
    } else {
      return null;
    }
  };
  
  deeper(parentBoard);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution || parentBoard.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  
  if (n === 0) return 1;

  var totalSolutions = 0;
  var parentBoard = new Board({ n: n });
  parentBoard.counter = 0;
  parentBoard.depth = 0; // pieces left to place
  var deeper = function(prevBoard) {
    prevBoard.togglePiece(Math.floor(prevBoard.counter / n), prevBoard.counter % n);
    prevBoard.depth++;
    if (!prevBoard.hasAnyQueensConflicts(1)) { //if board checks out
      if (prevBoard.depth === n) {
        totalSolutions++;
        prevBoard.togglePiece(Math.floor(prevBoard.counter / n), prevBoard.counter % n);
        return null; // break out of base case?
      } else {
        var parentRows = prevBoard.rows().slice(0);
        var child = new Board(parentRows);
        child.depth = prevBoard.depth;
        child.counter = (Math.floor(prevBoard.counter / n) + 1) * n;
        if (child._isInBounds(Math.floor(child.counter / n), child.counter % n)) {
          deeper(child);
        }
      }
    }
    prevBoard.togglePiece(Math.floor(prevBoard.counter / n), prevBoard.counter % n);
    prevBoard.depth--;
    prevBoard.counter++;
    if ((prevBoard.depth >= Math.floor(prevBoard.counter / n)) && 
      prevBoard._isInBounds(Math.floor(prevBoard.counter / n), prevBoard.counter % n)) {
      deeper(prevBoard);
    } else {
      return null;
    }
  };
  
  deeper(parentBoard);
  
  console.log('Number of solutions for ' + n + ' queens:', totalSolutions);
  return totalSolutions;
};

/*
  skip used columns
  skip used diagonals
  
  memoization and rotation 0.o
*/


