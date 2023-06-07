import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Trading = () => {
  const [player1Card, setPlayer1Card] = useState('');
  const [player2Card, setPlayer2Card] = useState('');

  const handlePlayer1Confirm = (card) => {
    // Update the cards when Player 1 confirms the trade
    setPlayer1Card(card);
    alert('Trade confirmed!');
  };

  const handlePlayer1Deny = () => {
    // Reset the cards when Player 1 denies the trade
    alert('Trade denied!');
  };

  const handlePlayer2Confirm = (card) => {
    // Update the cards when Player 2 confirms the trade
    setPlayer2Card(card);
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
        <button onClick={() => handlePlayer1Confirm(player2Card)}>Confirm</button>
        <button onClick={handlePlayer1Deny}>Deny</button>
      </div>
      <div>
        <h2>Player 2</h2>
        <p>Card: {player2Card}</p>
        <button onClick={() => handlePlayer2Confirm(player1Card)}>Confirm</button>
        <button onClick={handlePlayer2Deny}>Deny</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Button component={Link} to="/home">
          Home
        </Button>
      </div>
    </div>
  );
};

export default Trading;
