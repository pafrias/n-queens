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
  // make a board
  // put rooks on the midline
  // check the board
  // if it passes all tests
  //   return solution
  
  
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  
  /*
    no current optimizations:
    - what if counter is too big for pieces remaining?
    - inheritance issues
    
    possible optimizations:
    - should only check the first row
    - memoize the successful arrays in first quadrent
    -- different for odd n and even n
    -- difficulty is linear algebra
    -- 
    
    1) make a total variable
    2) make a new board with "n"
    3) assign board a counter
    4) assign board a remaining pieces / depth
    5) declare our recursive function of board
    --> toggle using counter / length and counter modulo length
    --> is this a valid board?
    ---> do we have pieces remaining?
    -----> make a child
    -----> increment counter
    -----> child pieces increments down
    -----> call recursive function on child
    ---> else no pieces remaining?
    ----> increment total
    --> toggle piece off using counter / length and counter modulo length
    --> increment counter
    --> recall recursive function on board will traverse the tree horizontally
    6) call recursive on new board
    7) return total and pop champagne
    --> else get frustrated
  */
  
  var total = 0;
  var parentBoard = new Board({ n: n });
  parentBoard.counter = 0;
  parentBoard.depth = 0; // pieces left to place
  var deeper = function(prevBoard) {
    //could create child?
    prevBoard.togglePiece(Math.floor(prevBoard.counter / n), prevBoard.counter % n);
    prevBoard.depth++;
    if (!prevBoard.hasAnyRooksConflicts()) { //if board checks out
      if (prevBoard.depth === n) {
        total++;
        prevBoard.togglePiece(Math.floor(prevBoard.counter / n), prevBoard.counter % n);
        return null; // break out of base case?
      } else {
        var parentRows = prevBoard.rows().slice(0); // inheritance?
        var child = new Board(parentRows);
        child.counter = prevBoard.counter + 1;
        child.depth = prevBoard.depth;
        if (child._isInBounds(Math.floor(child.counter / n), child.counter % n)) {
          deeper(child);
        }
        // prevBoard.togglePiece(Math.floor(prevBoard.counter / n), prevBoard.counter % n);
        // return null;
      }
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
  console.log('Number of solutions for ' + n + ' rooks:', total);
  return total;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme




  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
