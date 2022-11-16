const imgsList = [
    'img/01.webp',
    'img/02.webp',
    'img/03.webp',
    'img/04.webp',
    'img/05.webp'
];

const mainContainerEl = document.querySelector('div.banner-container');
const cardsContainerEl = document.getElementById('my-cards-container');
const rootEl = document.documentElement;
const rootStyles = rootEl.style;
const prevBtnEl = document.getElementById('prev-btn');
const nextBtnEl = document.getElementById('next-btn');

let lastIndex = imgsList.length - 1;
let currentIndex = 0;
let cssImgsNumber = rootStyles.setProperty('--imgs-number', imgsList.length);

for (i = 0; i < imgsList.length; i++) {
    const bannerImg = document.createElement('img');
    bannerImg.src = imgsList[i];
    bannerImg.classList.add('my-img');

    const card = document.createElement('div');
    card.classList.add('my-card');
    const cardImg = document.createElement('img');
    cardImg.src = imgsList[i];
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    if (i === 0){
        bannerImg.classList.add('active');
        card.classList.add('active');
    };

    mainContainerEl.append(bannerImg);

    cardsContainerEl.append(card);

    card.append(cardImg);
    card.append(overlay);
    
}

nextBtnEl.addEventListener('click', function () {
    let currentImg = document.querySelector(`div.banner-container > img:nth-child(${currentIndex + 1})`);
    currentImg.classList.remove('active');

    let currentCard = document.querySelector(`#my-cards-container > div:nth-child(${currentIndex + 1})`);
    currentCard.classList.remove('active');

    currentIndex++;

    if (currentIndex > lastIndex) {
        currentIndex = 0;
    }

    let nextImg = document.querySelector(`div.banner-container > img:nth-child(${currentIndex + 1})`);
    nextImg.classList.add('active');

    let nextCard = document.querySelector(`#my-cards-container > div:nth-child(${currentIndex + 1})`);
    nextCard.classList.add('active');
});

prevBtnEl.addEventListener('click', function () {
    let currentImg = document.querySelector(`div.banner-container > img:nth-child(${currentIndex + 1})`);
    currentImg.classList.remove('active');

    let currentCard = document.querySelector(`#my-cards-container > div:nth-child(${currentIndex + 1})`);
    currentCard.classList.remove('active');

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = lastIndex;
    }

    let nextImg = document.querySelector(`div.banner-container > img:nth-child(${currentIndex + 1})`);
    nextImg.classList.add('active');

    let nextCard = document.querySelector(`#my-cards-container > div:nth-child(${currentIndex + 1})`);
    nextCard.classList.add('active');
});

