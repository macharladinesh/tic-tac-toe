document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const statusMessage = document.getElementById('status-message');
    const resetButton = document.getElementById('reset-button');
    const cells = [];
  
    let currentPlayer = 'X';
    let gameEnded = false;
  
    // Create cells and add click event listeners
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.id = `cell-${i}`;
      cell.addEventListener('click', () => cellClicked(i));
      gameBoard.appendChild(cell);
      cells.push(cell);
    }
  
    // Function to handle cell click
    const cellClicked = (index) => {
      if (!gameEnded && !cells[index].textContent) {
        cells[index].textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.textContent = `Current Player: ${currentPlayer}`;
      }
    };
  
    // Function to check for a winner
    const checkWinner = () => {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      for (const line of lines) {
        const [a, b, c] = line;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
          gameEnded = true;
          statusMessage.textContent = `Player ${cells[a].textContent} wins!`;
          return;
        }
      }
  
      if ([...cells].every(cell => cell.textContent)) {
        gameEnded = true;
        statusMessage.textContent = 'It\'s a tie!';
      }
    };
  
    // Reset game button
    resetButton.addEventListener('click', () => {
      cells.forEach(cell => {
        cell.textContent = '';
      });
      gameEnded = false;
      currentPlayer = 'X';
      statusMessage.textContent = `Current Player: ${currentPlayer}`;
    });
  
    statusMessage.textContent = `Current Player: ${currentPlayer}`;
  });
  