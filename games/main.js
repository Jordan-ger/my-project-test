let pairsCount = 0;
let cardsArray = [];
let openedCards = [];
let matchedCards = 0;
let timerInterval;
let timeLeft = 0;
let gameActive = false;  


const pairsInput = document.getElementById("pairsInput");
const startGameBtn = document.getElementById("startGameBtn");
const cardsContainer = document.getElementById("cardsContainer");
const timerDisplay = document.getElementById("time");
const restartGameBtn = document.getElementById("restartGameBtn");
const stopGameBtn = document.getElementById("stopGameBtn");  


function startGame() {
    gameActive = true;  
    pairsCount = parseInt(pairsInput.value);
    if (pairsCount < 1 || isNaN(pairsCount)) {
        alert("Введите корректное количество пар");
        return;
    }

    
    cardsArray = [];
    for (let i = 1; i <= pairsCount; i++) {
        cardsArray.push(i, i);
    }

    
    cardsArray = shuffle(cardsArray);

    
    cardsContainer.innerHTML = '';
    matchedCards = 0;
    openedCards = [];

    cardsArray.forEach(number => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.dataset.number = number;
        cardElement.addEventListener("click", onCardClick);
        cardsContainer.appendChild(cardElement);
    });

    
    timeLeft = pairsCount * 5;
    timerDisplay.textContent = timeLeft;
    startTimer();

    
    restartGameBtn.classList.add("hidden");
    stopGameBtn.classList.remove("hidden"); 
}


function restartGame() {
    restartGameBtn.classList.add("hidden");
    stopGameBtn.classList.add("hidden");  
    startGame();
}


function startTimer() {
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
        } else {
            clearInterval(timerInterval);
            alert("Время вышло! Игра завершена.");
        }
    }, 1000);
}


function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}


function onCardClick(event) {
    if (!gameActive) return;  

    const card = event.target;

    
    if (card.classList.contains("opened") || card.classList.contains("matched")) return;

    
    card.classList.add("opened");
    card.textContent = card.dataset.number;
    openedCards.push(card);

    
    if (openedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}


function checkMatch() {
    const [card1, card2] = openedCards;

    if (card1.dataset.number === card2.dataset.number) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedCards++;
    } else {
        card1.classList.remove("opened");
        card2.classList.remove("opened");
        card1.textContent = '';
        card2.textContent = '';
    }

    
    if (matchedCards === pairsCount) {
        clearInterval(timerInterval);
        alert("Поздравляем! Вы победили!");
        restartGameBtn.classList.remove("hidden");
    }

    openedCards = [];
}


function stopGame() {
    gameActive = false;  
    clearInterval(timerInterval);  
    alert("Игра остановлена!");  
    
    restartGameBtn.classList.remove("hidden");
    stopGameBtn.classList.add("hidden");
    
    cardsContainer.innerHTML = '';
    
    timerDisplay.textContent = '';
    pairsInput.disabled = false;
}


startGameBtn.addEventListener("click", startGame);

restartGameBtn.addEventListener("click", restartGame);

stopGameBtn.addEventListener("click", stopGame);
