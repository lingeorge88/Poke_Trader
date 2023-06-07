const player1CardImage = document.getElementById('player1CardImage');
const player2CardImage = document.getElementById('player2CardImage');
const player1ConfirmButton = document.getElementById('player1Confirm');
const player1DenyButton = document.getElementById('player1Deny');
const player2ConfirmButton = document.getElementById('player2Confirm');
const player2DenyButton = document.getElementById('player2Deny');

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

  useEffect(() => {
    // Update the card images when player1Card or player2Card changes
    player1CardImage.src = player1Card;
    player2CardImage.src = player2Card;
  }, [player1Card, player2Card]);

  player1ConfirmButton.addEventListener('click', () => handlePlayer1Confirm(player2Card));
  player1DenyButton.addEventListener('click', handlePlayer1Deny);
  player2ConfirmButton.addEventListener('click', () => handlePlayer2Confirm(player1Card));
  player2DenyButton.addEventListener('click', handlePlayer2Deny);

  return null; // Trading.js doesn't render any visible UI, so return null
};

export default Trading;
