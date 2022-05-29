const wordDisplay = document.getElementById("word");
const wrongLettersDisplay = document.getElementById("wrong-letters");
const resetButton = document.getElementById("reset-button");
const endGamePopup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const keyboardButtons = document.getElementById("keyboard");

const figureParts = document.querySelectorAll(".figure-part");

const words = [
  "animation",
  "branch",
  "computing",
  "dimension",
  "evaluation",
  "find",
  "github",
  "homepage",
  "internet",
  "javascript",
  "knowledge",
  "limitation",
  "management",
  "network",
  "operating",
  "programming",
  "qualitative",
  "resolve",
  "solution",
  "teammate",
  "universal",
  "validate",
  "without",
  "xenon",
  "youtube",
  "zephyr",
];

let answer = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//Show hidden word
function updateWordDisplay() {
  wordDisplay.innerHTML = `
    ${answer
      .split("")
      .map(
        (letter) => `
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ""}
        </span>
        `
      )
      .join("")}
    `;

  const innerWord = wordDisplay.innerText.replace(/\n/g, "");

  if (innerWord === answer) {
    finalMessage.innerText = "You win!";
    endGamePopup.style.display = "flex";
  }
}

// Update the wrong letters
function updateWrongLettersDisplay() {
  //Display wrong letters
  wrongLettersDisplay.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

  //Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  //Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText =
      "You lost... The correct answer is '" + answer + "'.";
    endGamePopup.style.display = "flex";
  }
}

//Show notification
function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

//Generate a keyboard for touchscreen
function generateKeyboardButtons() {
  keyboardButtons.innerHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `<button onClick="handleGuess('` +
        letter +
        `')">` +
        letter +
        `</button>`
    )
    .join("");
}

function handleGuess(letter) {
  if (!answer.includes(letter) && !wrongLetters.includes(letter)) {
    wrongLetters.push(letter);

    updateWrongLettersDisplay();

    return;
  }

  if (answer.includes(letter) && !correctLetters.includes(letter)) {
    correctLetters.push(letter);

    updateWordDisplay();

    return;
  }

  showNotification();
}

//Keydown letter press
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    handleGuess(letter);
  }
});

//Restart game and play again
resetButton.addEventListener("click", () => {
  //Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  answer = words[Math.floor(Math.random() * words.length)];

  updateWordDisplay();

  updateWrongLettersDisplay();

  endGamePopup.style.display = "none";
});

updateWordDisplay();
generateKeyboardButtons();
1;
