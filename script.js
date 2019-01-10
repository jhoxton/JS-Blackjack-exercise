//Card vars
let suits = ['Hearts','Diamonds','Clubs', 'Spades'];
let values = ['Ace','King','Queen','Jack',
              '10','9','8','7','6','5','4','3','2'];
//Dom vars
let textArea = document.getElementById('text-area');
let newGame= document.getElementById('new-game-butt');
let hitButton = document.getElementById('hit-butt');
let stayButton = document.getElementById('stay-butt');

//Game vars
let gameStarted = false;
    gameOver = false;
    playerWon = false;
    dealerCards = [];
    playerCards = [];
    dealerScore = 0;
    playerScore = 0;
    deck = [];

hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

//Event listener to start a new game
newGame.addEventListener('click', function(){
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  
  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [ getNextCard(), getNextCard() ];
  playerCards = [ getNextCard(), getNextCard() ];
  
  newGame.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  showStatus();
})

hitButton.addEventListener('click', function() {
  playerCards.push(getNextCard())
  checkForEndofGame();
  showStatus();
})

stayButton.addEventListener('click', function() {
  gameOver = true;
  checkForEndofGame();
  showStatus();
})

function createDeck() {
  let deck = [];
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let valIdx = 0; valIdx < values.length; valIdx++) {
      let card = {
          suit: suits[suitIdx],
          value: values[valIdx]
      };
      deck.push(card);
    }
  }
  return deck;
}

function shuffleDeck(deck) {
  for(let i = 0; i <deck.length; i ++) {
    let swapIndx = Math.trunc(Math.random() * deck.length);
    let tmp = deck[swapIndx];
    deck[swapIndx] = deck[i];
    deck[i] = tmp;
  }
}

function getNextCard() {
  return deck.shift();
}

//Return the cards details
function getCardString(card) {
  return card.value + " of " + card.suit;
}
function getCardNumericValue(card) {
  switch(card.value) {
    case 'Ace':
     return 1;
    case '2':
     return 2;
    case '3':
     return 3;
    case '4':
     return 4;
    case '5':
     return 5;
    case '6':
     return 6;
    case '7':
     return 7;
    case '8':
     return 8;
    case '9':
     return 9;
    default:
      return 10;
  }
}

function getScore(cardArray){
  let score =0;
  let hasAce = false;
  for(let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if (card.value === "Ace") {
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}

function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}
function checkForEndofGame(){
  updateScores();
  
  if(gameOver) {
    //Let dealer take more cards
    while(dealerScore < playerScore
      && playerScore <= 21
      && dealerScore <= 21) {
    dealerCards.push(getNextCard());
    updateScores();
    }
  }
  if (playerScore > 21) {
    playerWon = false;
    gameOver = true;
    
  } else if (dealerScore > 21) {
    playerWon = true;
    gameOver = true;
  } 
  else if (gameOver) {
    
    if (playerScore > dealerScore) {
      playerWon = true;
    } else {
      playerWon = false;
    }
    
  }
}


function showStatus() {
  if (!gameStarted) {
    textArea.innerText = "Welcom to BlackJack (and hookers...)"
    return;
  }
  
  let dealerCardString = ' ';
  for (let i =0; i < dealerCards.length; i++) {
    dealerCardString += getCardString(dealerCards[i]) + '\n'
  }
  let playerCardString = ' ';
  for (let i =0; i < playerCards.length; i++) {
    playerCardString += getCardString(playerCards[i]) + '\n'
}
  updateScores();
  
  textArea.innerText = 
  'Dealer has:\n ' +
  dealerCardString +
  'Score: ' + dealerScore + '\n\n' +
  
  'Player has:\n ' +
  playerCardString +
  'Score: ' + playerScore + '\n\n';
  
  if(gameOver) {
    if(playerWon===true) {
      textArea.innerText += 'You won'
    } else if (playerWon ===false) {
      textArea.innerText += 'Dealer won'
    }
    
  newGame.style.display = 'inline';
  hitButton.style.display = 'none';
  stayButton.style.display = 'none';
  }
  
  // Check card loop
  //   for(let i=0; i<deck.length; i++) {
  //   textArea.innerText += "\n" + getCardString(deck[i]);
  // }
  //
}

