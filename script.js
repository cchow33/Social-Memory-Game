// Step 1: Declare Variables
const section = document.querySelector('section');
const matchesCount = document.querySelector('.matchesCount');
const counter = document.querySelector('.counter');
// const playerLivesCount = document.querySelector('.playerLivesCount');
// let playerLives = 10;
let matches = 0 ;
let secondsleft = 60;

// Step 2: Render Text
// playerLivesCount.textContent = playerLives;
matchesCount.textContent = matches; 

// Step 3: Generate data for cards - an array of objects
const getData = () => [
    { imgSrc: './images/Tiktok-1.png', name: 'tiktok'},
    { imgSrc: './images/Discord-1.png', name: 'discord'}, 
    { imgSrc: './images/Soundcloud-1.png', name: 'soundcloud'}, 
    { imgSrc: './images/Instagram-1.png', name: 'instagram'}, 
    { imgSrc: './images/Whatsapp-1.png', name: 'whatsapp'}, 
    { imgSrc: './images/Slack-1.png', name: 'slack'},  
    { imgSrc: './images/Snapchat-1.png', name: 'snapchat'},
    { imgSrc: './images/Twitch-1.png', name: 'twitch'},
    { imgSrc: './images/Twitch-1.png', name: 'twitch'},
    { imgSrc: './images/Twitter-1.png', name: 'twitter'},
    // { imgSrc: './images/Zoom-1.png', name: 'zoom'}, 
    { imgSrc: './images/Tiktok-1.png', name: 'tiktok'}, 
    { imgSrc: './images/Discord-1.png', name: 'discord'}, 
    { imgSrc: './images/Soundcloud-1.png', name: 'soundcloud'}, 
    { imgSrc: './images/Instagram-1.png', name: 'instagram'}, 
    { imgSrc: './images/Whatsapp-1.png', name: 'whatsapp'}, 
    { imgSrc: './images/Slack-1.png', name: 'slack'}, 
    { imgSrc: './images/Snapchat-1.png', name: 'snapchat'}, 
    { imgSrc: './images/Twitter-1.png', name: 'twitter'},
    // { imgSrc: './images/Zoom-1.png', name: 'zoom'} 
]; 

// Step 4: Randomize cards
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData // 'return', otherwise it's undefined
};

// Step 5: Loop through shuffled cards and generate 2-sided cards 
const cardGenerator = () => {
    const cardData = randomize();

    // Generate the HTML
    cardData.forEach((item) => {
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';
        // Attach images to cards
        face.src = item.imgSrc;
        card.setAttribute('name', item.name);
        // Attach cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);
        card.addEventListener('click', (e) => {
       
    
            // Add a new class 'toggleCard' to animate / transform (flip) the cards
            card.classList.toggle('toggleCard'); 
            checkCards(e); // Pass down event
            console.log('card flipped')
        });
    })
};

// Step 6: Check cards - event will capture some data & target is what is clicked 
const checkCards = (e) => {
    console.log(e);
    const clickedCard = e.target;
    // Step 7a: Add a new class 'flipped' to the clicked cards to check if they're the same
    clickedCard.classList.add('flipped'); 
    // Step 7b: Save flipped cards to a new variable
    const flippedCards = document.querySelectorAll('.flipped');
    const toggledCards = document.querySelectorAll('.toggleCard');
    console.log(flippedCards);
    // Step 7c: When two cards are flipped:
    if(flippedCards.length === 2){
        if( // If cards match:
            flippedCards[0].getAttribute('name') === 
            flippedCards[1].getAttribute('name')
        ) { // increment value of match
            console.log('Match!');
            matches++;
            matchesCount.textContent = matches;
            // disable pointer events on matched cards 
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';
            });
        } else { // If cards don't match:
            console.log('No match');
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                // Step 7d: setTimeout so cards don't flip back immediately
                setTimeout(() => card.classList.remove('toggleCard'), 900);
            });
            // playerLives--;
            // playerLivesCount.textContent = playerLives;

            // Step 9b: End of game message to losing player
            // if(playerLives === 0){
            //     restart('💩💩💩💩 Sorry, Try again! 💩💩💩💩');
            // }
        }
    } 
    // Step 9c: End of game message to winning player. Run a check to see if player won. Select toggle card (go back up) 
    if(toggledCards.length === 18){
        restart('🥳 🥳 🥳 🥳 Congratulations! You won! 🥳 🥳🥳 🥳');
    }
};

// Step 8a: Restart function
const restart = (text) => {
    let cardData = randomize();
    let face = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    cardData.forEach((item, index) => {;
        cards[index].classList.remove('toggleCard');
        // 8b) Enable pointer events, randomize cards, and update their images and names
        setTimeout(() => {
            cards[index].style.pointerEvents = 'all';
            face[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name)
            section.style.pointerEvents = 'all';
        }, 1000);
    });
    // playerLives = 10;
    // playerLivesCount.textContent = playerLives;
    // Step 9: Alert player, then pass text as argument in restart function
    setTimeout(() => window.alert(text), 100);
}


// Countdown Timer
counter.innerHTML = 'Time left:  ' + `${secondsleft}s`;

const countDown = setInterval(() => {
    secondsleft--;
    counter.innerHTML = 'Time left:  ' + `${secondsleft}s`;
    if(secondsleft <= 0 || secondsleft < 1){
        clearInterval(countDown);
    }
}, 1000)

// Coundown Timer bar
function initBarCount(){
    function barCount(){

    }
}



cardGenerator();

/* Every time a card is clicked the following happens:
i) it flips over
ii) a 'flipped' class is added to it
iii) every pair of card is check to see if they match
iv) 'flipped' class gets removed from both cards */
