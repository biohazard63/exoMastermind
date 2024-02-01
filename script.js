const colors = ['R', 'G', 'B', 'P', 'Y', 'O'];
let code = [...Array(4)].map(() => colors[Math.floor(Math.random() * colors.length)]);
let attempts = 0;

document.getElementById('hiddenCode').innerHTML = code.map(color => `<div class="cell ${color}"></div>`).join('');

let userInput = document.getElementById('userInput');
let submitGuess = document.getElementById('submitGuess');

Array.from(document.getElementsByClassName('color')).forEach(colorDiv => {
    colorDiv.addEventListener('click', function () {
        if (userInput.value.length < 4) {
            userInput.value += this.className.split(' ')[1];
            if (userInput.value.length === 4) {
                submitGuess.click();
                userInput.value = '';
            }
        }
    });
});

submitGuess.addEventListener('click', () => {
    attempts++;
    document.getElementById('attempts').textContent = 'Nombre de  tentatives : ' + attempts;

    let guess = userInput.value.toUpperCase().split('');
    let feedbackMessage = '';

    if (guess.length !== 4) {
        feedbackMessage = '';
    } else {
        let correctPositions = guess.filter((g, i) => g === code[i]).length;
        let correctColors = guess.filter((g, i) => g !== code[i] && code.includes(g)).length;
        let incorrectColors = guess.filter(g => !code.includes(g) && colors.includes(g)).length;

        feedbackMessage = `Positions correct: ${correctPositions},\n`;
        feedbackMessage += `Mauvaises Positions: ${correctColors},\n`;
        feedbackMessage += `Incorrect colors: ${incorrectColors}`;

        if (correctPositions === 4 || attempts >= 12) {
            feedbackMessage = correctPositions === 4 ? 'Gagner!' : 'Game Over!';
            document.getElementById('hiddenCode').style.display = 'flex';
        }

        document.getElementById('gameBoard').innerHTML += `
            <div class="row">
                ${guess.map(g => `<div class="cell ${g}"></div>`).join('')}
                <div>${feedbackMessage}</div>
            </div>
        `;
    }

    document.getElementById('feedback').textContent = feedbackMessage;
    userInput.value = '';
});