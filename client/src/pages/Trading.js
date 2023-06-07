import React, { useState } from 'react';

const Trading = ({ selectedCard }) => {
  const [player1Card, setPlayer1Card] = useState('');
  const [player2Card, setPlayer2Card] = useState('');
  const [player1Confirmed, setPlayer1Confirmed] = useState(false);
  const [player2Confirmed, setPlayer2Confirmed] = useState(false);

  const handlePlayer1Confirm = () => {
    setPlayer1Confirmed(true);
    alert('Player 1 confirmed the trade!');
  };

  const handlePlayer1Deny = () => {
    setPlayer1Confirmed(false);
    alert('Player 1 denied the trade!');
  };

  const handlePlayer2Confirm = () => {
    setPlayer2Confirmed(true);
    alert('Player 2 confirmed the trade!');
  };

  const handlePlayer2Deny = () => {
    setPlayer2Confirmed(false);
    alert('Player 2 denied the trade!');
  };

  const handleTrade = () => {
    if (player1Confirmed && player2Confirmed) {
      setPlayer1Card(player2Card);
      setPlayer2Card(selectedCard);
      setPlayer1Confirmed(false);
      setPlayer2Confirmed(false);
      alert('Trade confirmed!');
    } else {
      alert('Both players must confirm the trade!');
    }
  };

  return (
    <div>
      <h1>Card Trading</h1>
      <div>
        <h2>Player 1</h2>
        <p>Card: {player1Card}</p>
        {player1Confirmed ? (
          <p>Trade confirmed!</p>
        ) : (
          <button id="player1Confirm" onClick={handlePlayer1Confirm}>
            Confirm Trade
          </button>
        )}
        <button id="player1Deny" onClick={handlePlayer1Deny}>
          Deny Trade
        </button>
      </div>
      <div>
        <h2>Player 2</h2>
        <p>Card: {player2Card}</p>
        {player2Confirmed ? (
          <p>Trade confirmed!</p>
        ) : (
          <button id="player2Confirm" onClick={handlePlayer2Confirm}>
            Confirm Trade
          </button>
        )}
        <button id="player2Deny" onClick={handlePlayer2Deny}>
          Deny Trade
        </button>
      </div>
      <button onClick={handleTrade}>Trade</button>
    </div>
  );
};

export default Trading;
