
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
      actions: {
        button: document.getElementById('next-duel'),
      },
};

const playerSides = {
    player1: "player-field-card",
    computer: "computer-field-card",
}

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: ".src/assets/icons/dragon.png",
        WinOf: [1],
        LoseOf: [2],
    },

    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: ".src/assets/icons/magician.png",
        WinOf: [2],
        LoseOf: [0],
    },

    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: ".src/assets/icons/exodia.png",
        WinOf: [0],
        LoseOf: [1],
    },

];

async function drawCards(cardNumbers, fieldSide) { //Async declaration is a declaration that returns a new promise 
    // which will be resolved with the value returned
    for(let i = 0; i <cardNumbers; i++) {
        const randomIdCard = await getRandomCardId() //Await is a operator is used to wait for a promise
        const cardImage = await createcardImage(randomIdCard,fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    }
}
function init() {
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);
}

init();