const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('reset-btn');

let currentPlayer = 'X';
let gameOver = false;
let gameBoard = ['', '', '', '', '', '', '', '', ''];

function handleCellClick(event) {
  const cellIndex = parseInt(event.target.dataset.cellIndex);
  if (!gameOver && gameBoard[cellIndex] === '') {
    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    checkWinner();
    switchTurn();
  }
}

function checkWinner() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (gameBoard[a] === currentPlayer && gameBoard[b] === currentPlayer && gameBoard[c] === currentPlayer) {
      alert(`Player ${currentPlayer} Wins!`);
      gameOver = true;
      return;
    }
  }

  // Check for a tie
  if (!gameOver && gameBoard.every(cell => cell !== '')) {
    alert('It\'s a Tie!');
    gameOver = true;
  }
}

function switchTurn() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
  
  function resetGame() {
    currentPlayer = 'X';
    gameOver = false;
    gameBoard.fill('');
    cells.forEach(cell => cell.textContent = '');
  }
  
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
  resetBtn.addEventListener('click', resetGame);
  