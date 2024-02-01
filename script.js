const colors = ['R', 'G', 'B', 'P', 'Y', 'O'];

let code = [...Array(4)].map(() => colors[Math.floor(Math.random() * colors.length)]);

let hiddenCode = document.getElementById('hiddenCode');

for (let i = 0; i < 4; i++) {
    let cell = document.createElement('div');
    cell.className = 'cell ' + code[i];
    hiddenCode.appendChild(cell);
}

let userInput = document.getElementById('userInput');
let submitGuess = document.getElementById('submitGuess');
let feedback = document.getElementById('feedback');
let gameBoard = document.getElementById('gameBoard');
let attemptsElement = document.getElementById('attempts');

let attempts = 0;

let colorPalette = document.getElementById('colorPalette');
let paletteColors = colorPalette.getElementsByClassName('color');

for (let i = 0; i < paletteColors.length; i++) {
    paletteColors[i].addEventListener('click', function() {
        // Check if the user has already selected 4 colors
        if (userInput.value.length < 4) {
            let color = this.className.split(' ')[1]; // Get the color from the class
            userInput.value += color; // Add the color to the user's guess

            // If the user has selected 4 colors, submit the guess and clear the input
            if (userInput.value.length === 4) {
                submitGuess.click();
                userInput.value = '';
            }
        }
    });
}
submitGuess.addEventListener('click', () => {
    attempts++;

    attemptsElement.textContent = 'Number of attempts: ' + attempts;

    let guess = userInput.value.toUpperCase().split('');
    let feedbackMessage = '';

    if (guess.length !== 4) {
        feedbackMessage = 'Please enter four letters.';
    } else {
        let correctColors = 0;
        let correctPositions = 0;
        let incorrectColors = 0;

        let codeCopy = [...code];
        let guessCopy = [...guess];

        for (let i = 0; i < 4; i++) {
            if (guess[i] === code[i]) {
                correctPositions++;
                codeCopy[i] = guessCopy[i] = null;
            }
        }

        for (let i = 0; i < 4; i++) {
            if (guessCopy[i] && codeCopy.includes(guessCopy[i])) {
                correctColors++;
                codeCopy[codeCopy.indexOf(guessCopy[i])] = null;
            } else if (guessCopy[i] && !codeCopy.includes(guessCopy[i]) && colors.includes(guessCopy[i])) {
                incorrectColors++;
            }
        }

        feedbackMessage = `Positions correct: ${correctPositions},\n`;
        feedbackMessage += `Mauvaises Positions: ${correctColors},\n`;
        feedbackMessage += `Incorrect colors: ${incorrectColors}`;

        if (correctPositions === 4) {
            feedbackMessage = 'Gagner!';
            hiddenCode.style.display = 'flex';
        } else if (attempts >= 12) {
            feedbackMessage = 'Game Over!';
            hiddenCode.style.display = 'flex';
        }

        let row = document.createElement('div');
        row.className = 'row';

        for (let i = 0; i < 4; i++) {
            let cell = document.createElement('div');
            cell.className = 'cell ' + guess[i];
            row.appendChild(cell);
        }

        let feedbackElement = document.createElement('div');
        feedbackElement.textContent = feedbackMessage;
        row.appendChild(feedbackElement);

        gameBoard.appendChild(row);
    }

    feedback.textContent = feedbackMessage;
    userInput.value = '';
});