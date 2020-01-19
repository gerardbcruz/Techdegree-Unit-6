
// Variables
let qwerty = document.getElementById('qwerty');
let phrase = document.getElementById('phrase');
const buttonReset = document.querySelector('.btn__reset');
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
  "jack of all trades master of none",
  "short end of the stick",
  "every cloud has a silver lining",
  "birds of a feather flock together"
];

//FUNCTIONS

// Return a random phrase from an array
const getRandomPhraseAsArray = arr => {
  let randomNumber = Math.floor(Math.random() * arr.length);
  const phraseArray = arr[randomNumber].split("");
  return phraseArray;
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

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

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

// Event Listeners
buttonReset.addEventListener("click", function() {
  const overlay = buttonReset.parentNode;
  overlay.style.display = "none";
})

qwerty.addEventListener("click", function(e) {
  const button = e.target;
  if (button.tagName === "BUTTON") {
    button.classList.add("chosen");
    button.disabled = "true";
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
})
