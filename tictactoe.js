class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = {
            X: 0,
            O: 0
        };
        
        this.winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // 가로
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // 세로
            [0, 4, 8], [2, 4, 6] // 대각선
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells = document.querySelectorAll('[data-cell]');
        this.statusElement = document.getElementById('status');
        this.restartBtn = document.getElementById('restart-btn');
        this.resetScoreBtn = document.getElementById('reset-score-btn');
        
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
        
        this.restartBtn.addEventListener('click', () => this.restartGame());
        this.resetScoreBtn.addEventListener('click', () => this.resetScore());
        
        this.loadScores();
        this.updateStatus();
    }
    
    handleCellClick(index) {
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        this.board[index] = this.currentPlayer;
        this.cells[index].textContent = this.currentPlayer;
        this.cells[index].classList.add(this.currentPlayer.toLowerCase());
        
        if (this.checkWin()) {
            this.handleWin();
        } else if (this.checkDraw()) {
            this.handleDraw();
        } else {
            this.switchPlayer();
        }
    }
    
    checkWin() {
        for (let condition of this.winningConditions) {
            const [a, b, c] = condition;
            if (this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]) {
                return condition;
            }
        }
        return false;
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.saveScores();
        this.updateScores();
        
        const winningCells = this.checkWin();
        winningCells.forEach(index => {
            this.cells[index].classList.add('winning');
        });
        
        this.statusElement.textContent = `플레이어 ${this.currentPlayer}가 승리했습니다!`;
        this.statusElement.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        
        setTimeout(() => {
            this.showWinAnimation();
        }, 500);
    }
    
    handleDraw() {
        this.gameActive = false;
        this.statusElement.textContent = '무승부입니다!';
        this.statusElement.style.background = 'linear-gradient(135deg, #ffc107, #fd7e14)';
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateStatus();
    }
    
    updateStatus() {
        this.statusElement.textContent = `플레이어 ${this.currentPlayer}의 차례입니다`;
        this.statusElement.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    }
    
    updateScores() {
        document.getElementById('score-x').textContent = this.scores.X;
        document.getElementById('score-o').textContent = this.scores.O;
    }
    
    restartGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning');
        });
        
        this.updateStatus();
    }
    
    resetScore() {
        this.scores = { X: 0, O: 0 };
        this.saveScores();
        this.updateScores();
        
        // 점수 초기화 애니메이션
        const scoreElements = document.querySelectorAll('.score');
        scoreElements.forEach(score => {
            score.style.transform = 'scale(1.2)';
            setTimeout(() => {
                score.style.transform = 'scale(1)';
            }, 200);
        });
    }
    
    saveScores() {
        localStorage.setItem('tictactoe-scores', JSON.stringify(this.scores));
    }
    
    loadScores() {
        const savedScores = localStorage.getItem('tictactoe-scores');
        if (savedScores) {
            this.scores = JSON.parse(savedScores);
            this.updateScores();
        }
    }
    
    showWinAnimation() {
        // 승리 애니메이션 효과
        const winningCells = this.checkWin();
        winningCells.forEach((index, i) => {
            setTimeout(() => {
                this.cells[index].style.transform = 'scale(1.2) rotate(360deg)';
                setTimeout(() => {
                    this.cells[index].style.transform = 'scale(1) rotate(0deg)';
                }, 300);
            }, i * 100);
        });
    }
}

// 게임 시작
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
    
    // 키보드 네비게이션 지원
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            window.location.href = 'index.html';
        }
    });
    
    // 터치 디바이스 최적화
    let touchStartY = 0;
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;
        
        // 위로 스와이프하면 게임 재시작
        if (diff > 50) {
            document.getElementById('restart-btn').click();
        }
    });
    
    console.log('틱택토 게임이 로드되었습니다! 🎮');
}); 