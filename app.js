let userScore = 0;
let computerScore = 0;

const userScore_span = document.getElementById('user-score');
const computerScore_span = document.getElementById('computer-score');
const scoreBoard_div = document.querySelector('.score-board');
const result_p = document.querySelector('.result > p');
const rock_div = document.getElementById('r');
const paper_div = document.getElementById('p');
const scissors_div = document.getElementById('s');
const contractAddress = "0x33e1bC1276a82F0B99b93459057483aFde917a88";
const abi = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "userChoice",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "computerChoice",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "result",
        "type": "string"
      }
    ],
    "name": "addGameResult",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "gameResults",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "userChoice",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "computerChoice",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "result",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "gameResultsLength",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const provider = new ethers.providers.Web3Provider(window.ethereum, 97);
let signer;
let contract;

// Prompt the user to connect their wallet and initialize the signer and contract
ethereum.request({ method: "eth_requestAccounts" }).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    contract = new ethers.Contract(contractAddress, abi, signer);
  });
});
function updateScore(userScore, computerScore) {
  userScore_span.innerHTML = userScore;
  computerScore_span.innerHTML = computerScore;
}

// Define the function to get the computer's choice
function getComputerChoice() {
  const choices = ['r', 'p', 's'];
  const randomNumber = Math.floor(Math.random() * 3);
  return choices[randomNumber];
}
function updateScore(userScore, computerScore) {
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    
    // Call the smart contract's addGameResult function with the current scores and game result
    const result = determineWinner(userScore, computerScore);
    contract.addGameResult(userScore, computerScore, result);
  }
  
 
  function game(userChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(userChoice, computerChoice);
    if (result === "You win!") {
      userScore++;
    } else if (result === "Computer wins!") {
      computerScore++;
    }
    updateScore(userScore, computerScore);
    // ... the rest of your game logic
  }
    
// Define the function to determine the winner of the game
function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
      return "It's a tie!";
    } else if (
      (userChoice === 'r' && computerChoice === 's') ||
      (userChoice === 'p' && computerChoice === 'r') ||
      (userChoice === 's' && computerChoice === 'p')
    ) {
      return "You win!";
    } else {
      return "Computer wins!";
    }
  }