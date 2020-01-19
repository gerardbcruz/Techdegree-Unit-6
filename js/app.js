
// Variables
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const buttonReset = document.querySelector('.btn__reset');
const overlay = buttonReset.parentNode;
const scoreBoard = document.getElementById('scoreboard');
let missCount = 0;

let phrases = [
  "like father like son",
  "what goes up must come down",
  "a chip on your shoulder",
  "back to the drawing board",
  "knock your socks off",
  "head over heels",
  "curiosity killed the cat",
  "short end of the stick"
];

//FUNCTIONS

// Initializes and resets game
const resetGame = () => {
  // Resets Overlay
  overlay.style.display = "none";
  overlay.className = "start";

  // Resets keyboard buttons
  const keyboardButtons = document.querySelectorAll("button");
  for(i = 0; i < keyboardButtons.length; i++) {
    keyboardButtons[i].classList.remove("chosen");
    keyboardButtons[i].disabled = false;
  }

  // Resets the phrase to blank and adds new phrase
  phrase.innerHTML = "";
  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);

  // Resets the hearts images to full
  const hearts = document.querySelectorAll(".tries");
  for (let i=0; i < hearts.length; i++) {
      hearts[i].children[0].src = 'images/liveHeart.png';
  }

  // Resets the missed counter back to 0
  missCount = 0;
}

// Return a random phrase from an array
const getRandomPhraseAsArray = arr => {
  let randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber].split("");
}

// Adds the letters of a string to the display
const addPhraseToDisplay = arr => {
  for(i = 0; i < arr.length ; i++) {
    let li = document.createElement("li");
    li.textContent = arr[i];
    phrase.appendChild(li);
    if ( !(arr[i].indexOf(" ") > -1) ) {
      li.classList.add("letter");
    } else {
      li.classList.add("space");
    }
  }
}

// Check if a letter is in the phrase
const checkLetter = button => {
  let lis = document.getElementsByClassName("letter");
  let matchFound = null;
  for (i = 0; i < lis.length; i++) {
    if (button.textContent === lis[i].textContent) {
      lis[i].classList.add("show");
      matchFound = button.textContent;
    }
  }
  return matchFound;
}

// Change the overlay depending on the outcome
const changeOverlay = (result, message) => {
  overlay.className = result;
  overlay.children[0].textContent = message;
  overlay.style.display = "flex";
  buttonReset.textContent = "Try Again";
}

// Check if the game is won or lost
const checkWin = () => {
  const letter = document.querySelectorAll(".letter");
  const show = document.querySelectorAll(".show");

  if (letter.length === show.length) {
    changeOverlay("win", "You Won")
  }

  if (missCount > 4) {
    changeOverlay("lose", "You Lost");
  }
}

// EVENT LISTENERS

// Listen for clicks on buttonReset
buttonReset.addEventListener("click", function() {
  resetGame();
})

// Listen for clicks on the screen keyboard
qwerty.addEventListener("click", function(e) {
  const button = e.target;
  if (button.tagName === "BUTTON") {
    button.classList.add("chosen");
    button.disabled = true;
    const letterFound = checkLetter(button);
    if (letterFound === null) {
      // replace liveHeart with lostHeart img
      const hearts = document.querySelectorAll(".tries");
      for (let i=0; i < hearts.length; i++) {
        if (hearts[i].children[0].src.indexOf("live") > -1) {
          hearts[i].children[0].src = 'images/lostHeart.png';
          break;
        }
      }
      missCount += 1;
    }
  }
  checkWin();
})
