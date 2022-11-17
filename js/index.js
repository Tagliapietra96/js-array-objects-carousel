//*******************************************************************
//***************************FUNZIONI********************************
//*******************************************************************

/**
 * Funzione uguale a document.querySelector() ma riassunta in meno caratteri
 * @param {string} querySelector Indica un selettore css valido
 * @returns 
 */
function el(querySelector) {
    let domElement;
    if (querySelector === ':root' || querySelector === 'root') {
        domElement = document.documentElement;
    } else {
        domElement = document.querySelector(querySelector);
    };
    return domElement;
};

/**
 * Funzione che crea automaticamente un elemento HTML specificandolo
 * tramite l'argomento 'type'.
 * Possiamo anche specificare da 1 a 3 classi aggiuntive di 
 * qualsiasi genere
 * @param {string} type tipo di tag da creare
 * @param {string} class1 classe aggiuntiva
 * @param {string} class2 classe aggiuntiva
 * @param {string} class3 classe aggiuntiva
 * @returns 
 */
function elGenerator(type, class1, class2, class3) {
    let newElement = document.createElement(type);

    if (class3 !== undefined) {
        newElement.classList.add(class3);
    };

    if (class2 !== undefined) {
        newElement.classList.add(class2);
    };

    if (class1 !== undefined) {
        newElement.classList.add(class1);
    };

    return newElement;
};

/**
 * Funzione che crea automaticamente un elemento HTML img al quale
 * dovremo assegnare un percorso 'src' per caricare l'immagine.
 * Possiamo anche specificare 1 o 2 classi aggiuntive di 
 * qualsiasi genere
 * @param {string} src percorso dell' immagine
 * @param {string} class1 classe aggiuntiva
 * @param {string} class2 classe aggiuntiva
 * @returns 
 */
function imgGenerator(src, class1, class2) {
    let newImg = document.createElement('img');
    newImg.src = src;

    if (class2 !== undefined) {
        newImg.classList.add(class2);
    };

    if (class1 !== undefined) {
        newImg.classList.add(class1);
    };

    return newImg;
};

/**
 * funzione che in automatico aggiunge la classe active all'elemento indicato 
 * tramite selettore css
 * @param {string} querySelector inserisci un selettore css valido
 */
function addActive(querySelector) {
    const domElement = document.querySelector(querySelector);
    domElement.classList.remove('active');
    domElement.classList.add('active');
};

/**
 * funzione che in automatico toglie la classe active all'elemento indicato 
 * tramite selettore css
 * @param {string} querySelector inserisci un selettore css valido
 */
function removeActive(querySelector) {
    const domElement = document.querySelector(querySelector);
    domElement.classList.remove('active');
};

/**
 * funzione che fa slittare il focus su l'oggeto del carosello successivo
 */
function nextObj(){
    removeActive(`div.banner-container > .banner:nth-child(${currentIndex + 1})`);
    removeActive(`#my-cards-container > div:nth-child(${currentIndex + 1})`);

    currentIndex++;

    if (currentIndex > lastIndex) {
        currentIndex = 0;
    };

    addActive(`div.banner-container > .banner:nth-child(${currentIndex + 1})`);
    addActive(`#my-cards-container > div:nth-child(${currentIndex + 1})`);
}

/**
 * funzione che fa slittare il focus su l'oggeto del carosello precedente
 */
function prevObj() {
    removeActive(`div.banner-container > .banner:nth-child(${currentIndex + 1})`);
    removeActive(`#my-cards-container > div:nth-child(${currentIndex + 1})`);

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = lastIndex;
    };

    addActive(`div.banner-container > .banner:nth-child(${currentIndex + 1})`);
    addActive(`#my-cards-container > div:nth-child(${currentIndex + 1})`);
}

//*******************************************************************
//***************************VARIABILI*******************************
//*******************************************************************

const imgsList = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morale',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    },
    {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    },
    {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    },
    {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
    },
    {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];

let lastIndex = imgsList.length - 1;
let currentIndex = 0;
let cssImgsNumber = el(':root').style.setProperty('--imgs-number', imgsList.length);

//*******************************************************************
//*****************************EVENTI********************************
//*******************************************************************

imgsList.forEach((element, i) => {
    const banner = elGenerator('div', 'banner');
    const bannerImg = imgGenerator(element.image);
    const txtContainer = elGenerator('div', 'txt-container');
    const title = elGenerator('h2');
    title.innerHTML = element.title;
    const text = elGenerator('h3');
    text.innerHTML = element.text;
    txtContainer.append(title);
    txtContainer.append(text);
    banner.append(bannerImg);
    banner.append(txtContainer);


    const card = elGenerator('div', 'my-card');
    const cardImg = imgGenerator(element.image);
    const overlay = elGenerator('div', 'overlay');
    card.append(cardImg);
    card.append(overlay);

    if (i === 0) {
        banner.classList.add('active');
        card.classList.add('active');
    };

    el('div.banner-container').append(banner);
    el('#my-cards-container').append(card);

    card.addEventListener('click', () => {
        let thisIndex = i;

        removeActive(`div.banner-container > .banner:nth-child(${currentIndex + 1})`);
        removeActive(`#my-cards-container > div:nth-child(${currentIndex + 1})`);

        currentIndex = thisIndex;

        addActive(`div.banner-container > .banner:nth-child(${currentIndex + 1})`);
        addActive(`#my-cards-container > div:nth-child(${currentIndex + 1})`);
    });
});

el('#next-btn').addEventListener('click', nextObj);
el('#prev-btn').addEventListener('click', prevObj);

let nextInterval;
let prevInterval;

el('#start-btn').addEventListener('click', () => {
    clearInterval(nextInterval);
    clearInterval(prevInterval);
    nextInterval = setInterval(nextObj, 3000);
});
el('#stop-btn').addEventListener('click', () => {
    clearInterval(nextInterval);
    clearInterval(prevInterval);
});
el('#invert-btn').addEventListener('click', () => {
    clearInterval(nextInterval);
    clearInterval(prevInterval);
    prevInterval = setInterval(prevObj, 3000);
});