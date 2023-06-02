// Player cards
let player1Card = '';
let player2Card = '';

// Player 1 elements
const player1CardElement = document.getElementById('player1Card');
const player1ConfirmButton = document.getElementById('player1Confirm');
const player1DenyButton = document.getElementById('player1Deny');

// Player 2 elements
const player2CardElement = document.getElementById('player2Card');
const player2ConfirmButton = document.getElementById('player2Confirm');
const player2DenyButton = document.getElementById('player2Deny');

// Add event listeners for Player 1 buttons
player1ConfirmButton.addEventListener('click', () => {
  confirmTrade('player1');
});

player1DenyButton.addEventListener('click', () => {
  denyTrade();
});

// Add event listeners for Player 2 buttons
player2ConfirmButton.addEventListener('click', () => {
  confirmTrade('player2');
});

player2DenyButton.addEventListener('click', () => {
  denyTrade();
});

// Function to confirm the trade
function confirmTrade(player) {
  if (player === 'player1') {
    player1CardElement.textContent = player2Card;
    player2CardElement.textContent = player1Card;
  } else if (player === 'player2') {
    player1CardElement.textContent = player2Card;
    player2CardElement.textContent = player1Card;
  }

  alert('Trade confirmed!');
}

// Function to deny the trade
function denyTrade() {
  player1CardElement.textContent = player1Card;
  player2CardElement.textContent = player2Card;

  alert('Trade denied!');
}

// Function to update player cards
function updatePlayerCards(card1, card2) {
  player1Card = card1;
  player2Card = card2;

  player1CardElement.textContent = player1Card;
  player2CardElement.textContent = player2Card;
}

// Function to retrieve player cards from the deck
function getPlayerCards() {
  // Make an API request to the deck URL and retrieve player cards
  // Replace the deckURL with your actual deck URL or API endpoint
  const deckURL = 'https://example.com/deck';

  fetch(deckURL)
    .then((response) => response.json())
    .then((data) => {
      // Update player cards with the retrieved data
      updatePlayerCards(data.player1Card, data.player2Card);
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

// Call the getPlayerCards function to retrieve player cards
getPlayerCards();
