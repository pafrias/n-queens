// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function(skipRows) {
      if (skipRows) {
        return this.hasAnyColConflicts();
      } else {
        return (
          this.hasAnyRowConflicts() ||
          this.hasAnyColConflicts()
        );
      }
      
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function(skipRows) {
      return this.hasAnyRooksConflicts(skipRows) || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) { 
      
      var rows = this.rows();
      var n = rows[0].length;
      var sum = 0;
      for (let i = 0; i < n; i++) {
        sum += rows[rowIndex][i];
      }
      if (sum > 1) {
        return true;
      }
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() { 
      
      var n = this.rows().length;
      for (let i = 0; i < n; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var rows = this.rows();
      var n = rows[0].length;
      var sum = 0;
      for (let i = 0; i < n; i++) {
        sum += rows[i][colIndex];
      }
      if (sum > 1) {
        return true;
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var n = this.rows().length;
      for (let i = 0; i < n; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(colIndex) { 
      
      /*
      1,1  2,2,  3,3 should all act as 0,0
      1,2  2,3       should act as 0,1
      2,1  3,2       should act as 1,0
      etc...
      
      which, if we're resolving to the sides anyway...
      --> why not just take negative arguments?
      
      negative number route:
      1) if colIndex is a non-negative number (do what we already did)
      --> set n to length minus the col index
      --> loop over the rows n times
      ----> starting col is colIndex (maybe 0) plus i, starting row is 0 plus i
      ----> add value to sum, increase i by one
      ----> check for plural sum (celebrate)
      2) otherwise, we're negative
      --> set a variable to positive colIndex?
      --> n becomes n - positive Index
      --> loop over the rows n times
      ----> starting col is 0 plus i, starting row is positive Index
      ----> add value to sum, increase i by one
      ----> check for plural sum (celebrate)
      */
      
      var rows = this.rows();
      var sum = 0;
      
      if (colIndex >= 0) {
        var n = rows.length - colIndex;
        for (let i = 0; i < n; i++) {
          sum += rows[i][colIndex + i];
        }
      } else {
        var n = rows.length + colIndex;
        for (let i = 0; i < n; i++) {
          sum += rows[i - colIndex][i];
        }
      }
      
      if (sum > 1) {
        return true;
      }
      return false;      
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var n = this.rows().length - 1;
      for (let i = -n; i < n; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) { // check top row squares
          return true;
        }
      }
      return false;
    },


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(colIndex) {
      var rows = this.rows();
      var sum = 0;
      
      if (colIndex < rows.length) {
        var n = colIndex + 1;
        for (let i = 0; i < n; i++) {
          sum += rows[i][colIndex - i];
        }
      } else {
        var n = (2 * rows.length) - colIndex;
        for (let i = 1; i < n; i++) { //we set i = 1 to start at the correct row. (and simplifies the expressions)
          sum += rows[colIndex - rows.length + i][rows.length - i];
        }
        
      }
      
      if (sum > 1) {
        return true;
      }
      return false;      
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var n = 2 * this.rows().length - 3;
      for (let i = 1; i <= n; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) { // check top row squares
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
