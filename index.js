const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
// console.log(messages); troubleshooting messsages variable
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber ;
let attempts = 0;
let maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  let guess = parseInt(guessInput.value, 10);
  attempts += 1; // set attempts +=1  OR could write attempts = attempts + 1

  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;

    console.log(messages[elementIndex]) // added console log 
  }

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      tooHighMessage.style.display = '';  // change low to high
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
  }
/* bug: deleted fourth set of = */
  if (attempts === maxNumberOfAttempts) { 
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = '';

  resetButton.style.display = '';
}

//deleted = because it creates one too many loops
function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) { 
    messages[elementIndex].style.display = 'none';
  }
}
/* bug: fixed from funtion to function */
function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Changed this from maxNumberOfAttempts to number of attempts
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false; /* bug: incorrect spelling from disabeld to disabled */
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();




/* 

Pay attention to the error in the console; it is related to how you declare the variable to which you reassign a value. 
It should not be a constant.

Also, log messages[elementIndex] to the console inside the hideAllMessages function to fix the condition 
elementIndex <= messages.length inside the for loop (it is currently incorrect).

There is no need to assign a value to targetNumber , as it is assigned randomly in the code.
Additionally, you need to fix the output of messages depending on the number entered by the user. This will be much easier after fixing the bugs described above.

*/