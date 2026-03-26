let firstCard = null;
let secondCard = null;
let lockBoard = false;
let timerId = null;
let timeLeft = 60;

const startBtn = document.getElementById('start-btn');
const gridInput = document.getElementById('grid-input');
const setupDiv = document.getElementById('setup-container');
const gameArea = document.getElementById('game-area');
const board = document.getElementById('game-board');
const timerDisplay = document.getElementById('seconds');
const restartBtn = document.getElementById('restart-btn');

// Начать игру
startBtn.addEventListener('click', () => {
    let size = parseInt(gridInput.value);

    // ПРОВЕРКА: Если число нечетное, меньше 2 или больше 10 — сброс на 4
    if (isNaN(size) || size % 2 !== 0 || size < 2 || size > 10) {
        size = 4;
        gridInput.value = 4;
    }

    setupDiv.style.display = 'none';
    gameArea.style.display = 'block';
    
    initGame(size);
});

function initGame(size) {
    const totalCards = size * size;
    const numbers = createNumbersArray(totalCards / 2);
    const shuffledNumbers = shuffle(numbers);

    // Настройка сетки CSS
    board.style.gridTemplateColumns = `repeat(${size}, 80px)`;

    shuffledNumbers.forEach(num => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-back"></div>
            <div class="card-front">${num}</div>
        `;
        card.addEventListener('click', () => flipCard(card));
        board.appendChild(card);
    });

    startTimer();
}

function flipCard(card) {
    if (lockBoard || card === firstCard || card.classList.contains('open')) return;

    card.classList.add('open');

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    checkMatch();
}

function checkMatch() {
    let isMatch = firstCard.innerHTML === secondCard.innerHTML;
    isMatch ? success() : unflip();
}

function success() {
    firstCard.classList.add('success');
    secondCard.classList.add('success');
    resetState();
    
    // Проверка победы
    if (document.querySelectorAll('.card.success').length === document.querySelectorAll('.card').length) {
        clearInterval(timerId);
        setTimeout(() => alert('Победа! Все пары найдены.'), 500);
        restartBtn.style.display = 'block';
    }
}

function unflip() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('open');
        secondCard.classList.remove('open');
        resetState();
    }, 1000);
}

function resetState() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function startTimer() {
    timerId = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerId);
            lockBoard = true;
            alert('Время вышло! Попробуйте снова.');
            restartBtn.style.display = 'block';
        }
    }, 1000);
}

// Утилиты
function createNumbersArray(count) {
    let arr = [];
    for (let i = 1; i <= count; i++) arr.push(i, i);
    return arr;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

restartBtn.addEventListener('click', () => location.reload());