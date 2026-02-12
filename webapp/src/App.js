import React, { useState } from 'react';
import './App.css';

const opponents = [
  {
    name: 'Fire Master',
    description: 'A fiery boss who favors Rock!',
    pattern: (round) => (round % 3 === 0 ? 'rock' : ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)]),
    color: '#ff6b6b',
  },
  {
    name: 'Shadow Ninja',
    description: 'A sneaky ninja who changes moves often!',
    pattern: (round) => ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)],
    color: '#22223b',
  },
  {
    name: 'Robot Overlord',
    description: 'A calculating robot who adapts!',
    pattern: (round, playerHistory) => {
      if (playerHistory.length === 0) return ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
      // Try to counter player
      const last = playerHistory[playerHistory.length - 1];
      if (last === 'rock') return 'paper';
      if (last === 'paper') return 'scissors';
      return 'rock';
    },
    color: '#00b4d8',
  },
];

const moves = ['rock', 'paper', 'scissors'];

function getResult(player, computer) {
  if (player === computer) return 'tie';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'scissors' && computer === 'paper') ||
    (player === 'paper' && computer === 'rock')
  ) return 'win';
  return 'lose';
}

function App() {
  const [stage, setStage] = useState(0);
  const [round, setRound] = useState(1);
  const [playerMove, setPlayerMove] = useState('');
  const [computerMove, setComputerMove] = useState('');
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [showNext, setShowNext] = useState(false);


  const opponent = opponents[stage];

  function handleMove(move) {
    const player = move.toLowerCase();
    if (!moves.includes(player)) {
      setResult('invalid');
      return;
    }
    let comp;
    if (stage === 2) {
      comp = opponent.pattern(round, history);
    } else {
      comp = opponent.pattern(round);
    }
    setPlayerMove(player);
    setComputerMove(comp);
    const res = getResult(player, comp);
    setResult(res);
    setHistory([...history, player]);
    if (res === 'win') setScore(score + 1);
    if (res === 'win' && score + 1 === 3 && !achievements.includes('Win Streak!')) {
      setAchievements([...achievements, 'Win Streak!']);
    }
    setShowNext(true);
  }

  function handleNext() {
    if (round === 5) {
      if (stage < opponents.length - 1) {
        setStage(stage + 1);
        setRound(1);
        setScore(0);
        setHistory([]);
        setPlayerMove('');
        setComputerMove('');
        setResult('');
        setShowNext(false);
      } else {
        setAchievements([...achievements, 'Game Complete!']);
      }
    } else {
      setRound(round + 1);
      setPlayerMove('');
      setComputerMove('');
      setResult('');
      setShowNext(false);
    }
  }

  function resetGame() {
    setStage(0);
    setRound(1);
    setScore(0);
    setHistory([]);
    setPlayerMove('');
    setComputerMove('');
    setResult('');
    setAchievements([]);
    setShowNext(false);
  }

  // Animated character avatars
  // Tekken-style animation class
  const tekkenClass = 'tekken-move';
  // Simple animated avatars
  const avatarMap = {
    'Fire Master': (
      <div className={`avatar fire-master ${tekkenClass}`}>
        <div className="flame"></div>
        <div className="face">🔥</div>
      </div>
    ),
    'Shadow Ninja': (
      <div className={`avatar shadow-ninja ${tekkenClass}`}>
        <div className="ninja"></div>
        <div className="face">🥷</div>
      </div>
    ),
    'Robot Overlord': (
      <div className={`avatar robot-overlord ${tekkenClass}`}>
        <div className="robot"></div>
        <div className="face">🤖</div>
      </div>
    ),
  };

  return (
    <div className="app" style={{ background: opponent.color }}>
      <div className="story">
        <h2>Stage {stage + 1}: {opponent.name}</h2>
        <p>{opponent.description}</p>
        <div className="character-animation">
          {avatarMap[opponent.name]}
        </div>
      </div>
      <div className="score">Score: {score}</div>
      <div className="achievements">
        {achievements.map((a, i) => (
          <span key={i} className="achievement">{a}</span>
        ))}
      </div>
      <div className="game">
        <div className="round">Round {round}/5</div>
        {!showNext && (
          <div className="moves">
            {moves.map((m) => (
              <button key={m} onClick={() => handleMove(m)}>{m.charAt(0).toUpperCase() + m.slice(1)}</button>
            ))}
          </div>
        )}
        {result && result !== 'invalid' && (
          <div className="result">
            <div className="player-move">You chose: <b>{playerMove}</b></div>
            <div className="computer-move">{opponent.name} chose: <b>{computerMove}</b></div>
            <div className={result}>{result === 'win' ? 'You win!' : result === 'lose' ? 'You lose!' : 'Tie!'}</div>
            {/* Animate avatar on move */}
            <div className="character-move-animation">
              {avatarMap[opponent.name]}
            </div>
          </div>
        )}
        {result === 'invalid' && <div className="invalid">Invalid move! Please choose rock, paper, or scissors.</div>}
        {showNext && (
          <button className="next" onClick={handleNext}>{round === 5 && stage < opponents.length - 1 ? 'Next Stage' : round === 5 ? 'Finish' : 'Next Round'}</button>
        )}
      </div>
      {achievements.includes('Game Complete!') && (
        <div className="end">
          <h2>Congratulations! You completed the game!</h2>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default App;
