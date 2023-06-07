import React, { useState } from 'react';

const CardTrade = () => {
  const [player1Card, setPlayer1Card] = useState('');
  const [player2Card, setPlayer2Card] = useState('');

  const handlePlayer1Confirm = () => {
    // Update the cards when Player 1 confirms the trade
    setPlayer1Card(player2Card);
    setPlayer2Card(player1Card);
    alert('Trade confirmed!');
  };

  const handlePlayer1Deny = () => {
    // Reset the cards when Player 1 denies the trade
    alert('Trade denied!');
  };

  const handlePlayer2Confirm = () => {
    // Update the cards when Player 2 confirms the trade
    setPlayer1Card(player2Card);
    setPlayer2Card(player1Card);
    alert('Trade confirmed!');
  };

  const handlePlayer2Deny = () => {
    // Reset the cards when Player 2 denies the trade
    alert('Trade denied!');
  };

  return (
    <div>
      <h1>Card Trading</h1>
      <div>
        <h2>Player 1</h2>
        <p>Card: {player1Card}</p>
        <button onClick={handlePlayer1Confirm}>Confirm</button>
        <button onClick={handlePlayer1Deny}>Deny</button>
      </div>
      <div>
        <h2>Player 2</h2>
        <p>Card: {player2Card}</p>
        <button onClick={handlePlayer2Confirm}>Confirm</button>
        <button onClick={handlePlayer2Deny}>Deny</button>
      </div>
    </div>
  );
};

export default CardTrade;
