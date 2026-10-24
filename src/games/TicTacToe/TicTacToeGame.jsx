import React, { useState, useEffect, useCallback } from 'react';
import sound from '../../utils/sound';
import confetti from 'canvas-confetti';
import { RotateCcw, Award, Users, Bot, Zap, Volume2, VolumeX } from 'lucide-react';
import './TicTacToe.css';

const WINNING_COMBOS = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Col 1
  [1, 4, 7], // Col 2
  [2, 5, 8], // Col 3
  [0, 4, 8], // Diagonal 1
  [2, 4, 6]  // Diagonal 2
];

export default function TicTacToeGame() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameMode, setGameMode] = useState('ai'); // 'ai' or 'pvp'
  const [difficulty, setDifficulty] = useState('hard'); // 'easy', 'normal', 'hard'
  const [winner, setWinner] = useState(null); // 'X', 'O', 'draw', or null
  const [winningLine, setWinningLine] = useState(null);
  const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 });
  const [soundEnabled, setSoundEnabled] = useState(!sound.isMuted());
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Check victory status
  const checkWinner = useCallback((currentBoard) => {
    for (let combo of WINNING_COMBOS) {
      const [a, b, c] = combo;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return { winner: currentBoard[a], line: combo };
      }
    }
    if (currentBoard.every(cell => cell !== null)) {
      return { winner: 'draw', line: null };
    }
    return null;
  }, []);

  // Minimax Algorithm for unbeatable Hard AI
  const minimax = useCallback((newBoard, depth, isMaximizing) => {
    const result = checkWinner(newBoard);
    if (result) {
      if (result.winner === 'O') return 10 - depth;
      if (result.winner === 'X') return depth - 10;
      if (result.winner === 'draw') return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!newBoard[i]) {
          newBoard[i] = 'O';
          const score = minimax(newBoard, depth + 1, false);
          newBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!newBoard[i]) {
          newBoard[i] = 'X';
          const score = minimax(newBoard, depth + 1, true);
          newBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }, [checkWinner]);

  // Find best move for AI
  const getAiMove = useCallback((currentBoard, diff) => {
    const availableMoves = [];
    currentBoard.forEach((val, idx) => {
      if (!val) availableMoves.push(idx);
    });

    if (availableMoves.length === 0) return null;

    // Easy mode: purely random
    if (diff === 'easy') {
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      return availableMoves[randomIndex];
    }

    // Normal mode: 50% minimax, 50% random
    if (diff === 'normal' && Math.random() < 0.45) {
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      return availableMoves[randomIndex];
    }

    // Hard mode: Minimax
    let bestScore = -Infinity;
    let move = availableMoves[0];

    for (let i of availableMoves) {
      currentBoard[i] = 'O';
      const score = minimax(currentBoard, 0, false);
      currentBoard[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
    return move;
  }, [minimax]);

  // Handle cell click
  const handleCellClick = (index) => {
    if (board[index] || winner || isAiThinking) return;

    const newBoard = [...board];
    const currentSymbol = isXNext ? 'X' : 'O';
    newBoard[index] = currentSymbol;
    setBoard(newBoard);

    if (soundEnabled) {
      sound.playPiece(currentSymbol === 'X');
    }

    const outcome = checkWinner(newBoard);
    if (outcome) {
      handleGameOver(outcome.winner, outcome.line);
      return;
    }

    const nextIsX = !isXNext;
    setIsXNext(nextIsX);

    // AI Turn triggered if in AI mode and it's now O's turn
    if (gameMode === 'ai' && nextIsX === false) {
      setIsAiThinking(true);
      setTimeout(() => {
        const aiMove = getAiMove(newBoard, difficulty);
        if (aiMove !== null) {
          newBoard[aiMove] = 'O';
          setBoard([...newBoard]);
          if (soundEnabled) {
            sound.playPiece(false);
          }

          const aiOutcome = checkWinner(newBoard);
          if (aiOutcome) {
            handleGameOver(aiOutcome.winner, aiOutcome.line);
          } else {
            setIsXNext(true);
          }
        }
        setIsAiThinking(false);
      }, 420);
    }
  };

  const handleGameOver = (resWinner, line) => {
    setWinner(resWinner);
    setWinningLine(line);

    if (resWinner === 'X') {
      setScores(prev => ({ ...prev, x: prev.x + 1 }));
      if (soundEnabled) sound.playWin();
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#8b5cf6', '#ec4899']
      });
    } else if (resWinner === 'O') {
      setScores(prev => ({ ...prev, o: prev.o + 1 }));
      if (soundEnabled) sound.playWin();
    } else {
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
      if (soundEnabled) sound.playDraw();
    }
  };

  // Restart current round
  const restartRound = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
    setIsAiThinking(false);
    if (soundEnabled) sound.playClick();
  };

  // Reset entire match scores
  const resetMatch = () => {
    restartRound();
    setScores({ x: 0, o: 0, draws: 0 });
  };

  const toggleSound = () => {
    const newState = sound.toggleMute();
    setSoundEnabled(!newState);
  };

  return (
    <div className="ttt-container">
      {/* Game Header Controls */}
      <div className="ttt-header">
        <div className="ttt-mode-toggles">
          <button
            type="button"
            className={`ttt-mode-btn ${gameMode === 'ai' ? 'active' : ''}`}
            onClick={() => { setGameMode('ai'); restartRound(); }}
            aria-label="Play versus AI Bot"
          >
            <Bot size={16} /> vs AI Bot
          </button>
          <button
            type="button"
            className={`ttt-mode-btn ${gameMode === 'pvp' ? 'active' : ''}`}
            onClick={() => { setGameMode('pvp'); restartRound(); }}
            aria-label="Play 2-Player Local Duel"
          >
            <Users size={16} /> 2-Player Duel
          </button>
        </div>

        {gameMode === 'ai' && (
          <div className="ttt-difficulty-pills">
            <span className="diff-label">AI Level:</span>
            {['easy', 'normal', 'hard'].map((lvl) => (
              <button
                key={lvl}
                type="button"
                className={`diff-btn ${difficulty === lvl ? 'active' : ''}`}
                onClick={() => { setDifficulty(lvl); restartRound(); }}
              >
                {lvl.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          className="ttt-sound-btn"
          onClick={toggleSound}
          title={soundEnabled ? 'Mute audio' : 'Unmute audio'}
          aria-label={soundEnabled ? 'Mute audio' : 'Unmute audio'}
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>

      {/* Scoreboard */}
      <div className="ttt-scoreboard">
        <div className={`score-card x-card ${isXNext && !winner ? 'current-turn' : ''}`}>
          <div className="player-badge">PLAYER X</div>
          <div className="player-sub">{gameMode === 'ai' ? 'You (Human)' : 'Player 1'}</div>
          <div className="score-num">{scores.x}</div>
        </div>

        <div className="score-card draw-card">
          <div className="player-badge">DRAWS</div>
          <div className="player-sub">Tied Matches</div>
          <div className="score-num">{scores.draws}</div>
        </div>

        <div className={`score-card o-card ${!isXNext && !winner ? 'current-turn' : ''}`}>
          <div className="player-badge">PLAYER O</div>
          <div className="player-sub">{gameMode === 'ai' ? `AI (${difficulty})` : 'Player 2'}</div>
          <div className="score-num">{scores.o}</div>
        </div>
      </div>

      {/* Game Status Banner */}
      <div className="ttt-status-banner">
        {winner === 'X' && (
          <div className="status-message win-x">
            <Award size={20} /> Victory for Player X! 🎉
          </div>
        )}
        {winner === 'O' && (
          <div className="status-message win-o">
            <Award size={20} /> {gameMode === 'ai' ? 'AI Bot Claims Victory! 🤖' : 'Player O Wins! 🏆'}
          </div>
        )}
        {winner === 'draw' && (
          <div className="status-message draw">
            <Zap size={20} /> It&apos;s a Stalemate Draw! ⚔️
          </div>
        )}
        {!winner && (
          <div className="status-message ongoing">
            {isAiThinking ? (
              <span className="ai-thinking">AI Bot is calculating optimal move...</span>
            ) : (
              <span>
                Current Move: <strong className={isXNext ? 'text-x' : 'text-o'}>{isXNext ? 'Player X' : 'Player O'}</strong>
              </span>
            )}
          </div>
        )}
      </div>

      {/* 3x3 Grid Board */}
      <div className="ttt-board" role="grid" aria-label="Tic Tac Toe 3x3 Board">
        {board.map((cellValue, idx) => {
          const isWinningCell = winningLine && winningLine.includes(idx);
          return (
            <button
              key={idx}
              type="button"
              className={`ttt-cell ${cellValue ? `cell-${cellValue.toLowerCase()}` : ''} ${isWinningCell ? 'winning-cell' : ''}`}
              onClick={() => handleCellClick(idx)}
              disabled={!!cellValue || !!winner || isAiThinking}
              aria-label={`Cell ${idx + 1}, ${cellValue || 'Empty'}`}
            >
              {cellValue && (
                <span className="cell-content">
                  {cellValue}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Action Controls */}
      <div className="ttt-actions">
        <button
          type="button"
          className="btn-restart primary"
          onClick={restartRound}
          aria-label="Restart Current Round"
        >
          <RotateCcw size={18} /> Restart Round
        </button>

        <button
          type="button"
          className="btn-restart secondary"
          onClick={resetMatch}
          aria-label="Reset Match Scores"
        >
          Reset Match Scores
        </button>
      </div>
    </div>
  );
}
