function solveNQueens(n) {
    const result = [];
    const board = Array.from({ length: n }, () => Array(n).fill('.'));
  
    function isSafe(row, col) {
      for (let i = 0; i < row; i++) {
        if (board[i][col] === 'Q') {
          return false;
        }
      }
  
      for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 'Q') {
          return false;
        }
      }
  
      for (let i = row, j = col; i >= 0 && j < n; i--, j++) {
        if (board[i][j] === 'Q') {
          return false;
        }
      }
  
      return true;
    }
  
    function solve(row) {
      if (row === n) {
        result.push(board.map(row => row.join('')));
        return;
      }
  
      for (let col = 0; col < n; col++) {
        if (isSafe(row, col)) {
          board[row][col] = 'Q';
          solve(row + 1);
          board[row][col] = '.';
        }
      }
    }
  
    solve(0);
    return result;
  }
  
  // Example: Solve N-Queens for N = 4
  const solutions = solveNQueens(2);
  console.log(solutions);
  