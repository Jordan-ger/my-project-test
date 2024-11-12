const cardsData = [
    {
        image: "one.png",
        title: "Введение в ООП",
        topics: ["Объекты", "Конструкторы", "Классы", "Наследование"]
    },
    {
        image: "two.png",
        title: "JS и DOM",
        topics: ["Подключение", "Создание элементов", "Работа с классами"]
    },
    {
        image: "three.png",
        title: "Работа с браузером",
        topics: ["Работа с cookies", "API браузера", "LocalStorage"]
    },
    {
        image: "four.png",
        title: "Адаптивный дизайн",
        topics: ["Медиазапросы", "Flexbox", "Grid-система"]
    },
    {
        image: "five.png",
        title: "Git и GitHub",
        topics: ["Основы Git", "Основы GitHub", "Работа с ветками"]
    },
    {
        image: "six.png",
        title: "Асинхронность в JavaScript",
        topics: ["Promises", "Async/Await", "Callbacks"]
    },
    {
        image: "seven.png",
        title: "Роутинг в JS",
        topics: ["Single-page applications", "Работа с URL", "React Router"]
    },
    {
        image: "eight.png",
        title: "Прототипы в JS",
        topics: ["Прототипное наследование", "Методы и свойства объектов"]
    },
    {
        image: "nine.png",
        title: "SEO-оптимизация",
        topics: ["Метатеги", "Микроданные", "SEO для JavaScript"]
    },
    {
        image: "ten.png",
        title: "Продвинутый CSS",
        topics: ["Анимации", "Псевдоклассы", "CSS-переменные"]
    }
];

let visibleCardsCount = 4;
const maxCardsCount = 10;

const container = document.getElementById('modules-container');
const toggleButton = document.getElementById('toggle-btn');

function renderCards() {
    container.innerHTML = '';
    for (let i = 0; i < visibleCardsCount; i++) {
        const cardData = cardsData[i];
        if (!cardData) continue;

        const card = document.createElement('div');
        card.classList.add('card');
        
        const cardImg = document.createElement('div');
        cardImg.classList.add('card__img');
        cardImg.style.backgroundImage = `url(./images/${cardData.image})`;
        
        const cardText = document.createElement('div');
        cardText.classList.add('card__text');
        
        const cardTitle = document.createElement('h3');
        cardTitle.classList.add('card__title');
        cardTitle.textContent = cardData.title;
        
        const cardList = document.createElement('ul');
        cardList.classList.add('card__list');
        cardData.topics.forEach(topic => {
            const listItem = document.createElement('li');
            listItem.classList.add('card__item');
            listItem.textContent = topic;
            cardList.appendChild(listItem);
        });

        cardText.appendChild(cardTitle);
        cardText.appendChild(cardList);
        card.appendChild(cardImg);
        card.appendChild(cardText);
        
        container.appendChild(card);
    }

    if (visibleCardsCount >= maxCardsCount) {
        toggleButton.textContent = 'Скрыть все';
    } else {
        toggleButton.textContent = 'Показать еще';
    }
}

toggleButton.addEventListener('click', () => {
    if (visibleCardsCount >= maxCardsCount) {
        visibleCardsCount = 4;
    } else {
        visibleCardsCount += 2;
    }
    renderCards();
});

renderCards();
