
const state = { //State is associated with all elements will be manipulated
    score:{
        playerScore:0,
        computerScore:0,
        scoreBox: document.getElementById('score_points'),
    },
      cardSprites: {
        avatar: document.getElementById('card-image'),
        name: document.getElementById('card-name'),
        type: document.getElementById('card-type'),
      },
      fieldCards: {
        player: document.getElementById('player-field-card'),
        computer: document.getElementById('computer-field-card'),
      },
      playerSides: {
        player1: "player-cards",
        computer: "computer-cards",
    },
      actions: {
        button: document.getElementById('next-duel'),
      },
};

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: "./src/assets/icons/dragon.png",
        WinOf: [1],
        LoseOf: [2],
    },

    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: "./src/assets/icons/magician.png",
        WinOf: [2],
        LoseOf: [0],
    },

    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: "./src/assets/icons/exodia.png",
        WinOf: [0],
        LoseOf: [1],
    },

];

async function createCardImage(randomIdCard,fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height","100px");
    cardImage.setAttribute("src","./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id",randomIdCard);
    cardImage.classList.add("card");

    if(fieldSide === state.playerSides.player1) {

        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(randomIdCard);
        });

        
        cardImage.addEventListener("click", () => {
         setcardsField(cardImage.getAttribute("data-id"));
        });
    }

   

    return cardImage;
}

async function setcardsField(cardId) {

    await removeAllCardsImages();

    let computerCardId = await getRandomCardId();

    await hiddenCardDetails();

    await ShowHiddenCardFieldsImages(true);

    await drawCardsInField(cardId,computerCardId);

     let duelResults = await checkDuelResults(cardId, computerCardId);

     await updateScore();
     await drawButton(duelResults); 
}

async function drawCardsInField(cardId,computerCardId){
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
}

async function ShowHiddenCardFieldsImages(value) {
    if(value === true) {
        state.fieldCards.player.style.display = "block";
        state.fieldCards.computer.style.display = "block";
    } else if(value === false) {
        state.fieldCards.player.style.display = "none";
        state.fieldCards.computer.style.display = "none";
    }
}

async function hiddenCardDetails() {
    state.cardSprites.avatar.src = "";
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";
}

async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score
    .playerScore} | Lose: ${state.score.computerScore}`;
}

async function drawButton(text) {
    state.actions.button.innerText = text.toUpperCase(); 
    state.actions.button.style.display = "block";
}

async function checkDuelResults(playerCardId, computerCardId) {
    let duelResults = "Draw";
    let playerCard = cardData[playerCardId];

    if(playerCard.WinOf.includes(computerCardId)) {
        duelResults = "Win";
        await playAudio(duelResults);
        state.score.playerScore++;
    }

    if (playerCard.LoseOf.includes(computerCardId)) {
        duelResults = "Lose";
        await playAudio(duelResults);
        state.score.computerScore++;
    } 

       return duelResults;
    

}
   async function removeAllCardsImages() {

    let cards = document.querySelector("#computer-cards");
    let imgElements = cards.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    cards = document.querySelector("#player-cards");
    imgElements = cards.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
   }

async function drawSelectCard(index){
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Attibute : " + cardData[index].type
    
}


async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id; // this part the function will return a random ID 
}

async function drawCards(cardNumbers, fieldSide) { //Async declaration is a declaration that returns a new promise 
    // which will be resolved with the value returned
    for(let i = 0; i <cardNumbers; i++) {
        const randomIdCard = await getRandomCardId() //Await is a operator is used to wait for a promise
        const cardImage = await createCardImage(randomIdCard,fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

async function resetDuel() {
    state.cardSprites.avatar.src = ""
    state.actions.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    init();
}

async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    
    audio.play();
} 

function init() {
    drawCards(5, state.playerSides.player1);
    drawCards(5, state.playerSides.computer);

    ShowHiddenCardFieldsImages(false);

    const bgm = document.getElementById("bgm");
    bgm.play();
}

init();