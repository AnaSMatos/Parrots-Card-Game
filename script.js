//variáveis

let numberCards;
let playCounter = 0;
let firstCard, secondCard;
let lockCard = false;
let seconds = 0;

//Iniciar o jogo

function start(){
    numberCards = parseInt(prompt("Com quantas cartas você quer jogar? Insira um número par entre 4 e 14."));
    while((numberCards % 2 !== 0) || (numberCards < 4) || (numberCards > 14)){
        numberCards = parseInt(prompt("Escolha um número par entre 4 e 14."));
    }
}

start();
let time = setInterval(timer, 1000)


//Gifs Cartas
let parrots = [
    "arquivos/bobrossparrot.gif",
    "arquivos/explodyparrot.gif",
    "arquivos/fiestaparrot.gif",
    "arquivos/metalparrot.gif",
    "arquivos/revertitparrot.gif",
    "arquivos/tripletsparrot.gif",
    "arquivos/unicornparrot.gif",
]

//Lista de imagens a ser usadas
let sorted = []

for(let i=0; i<numberCards/2; i++ ){
    sorted.push(parrots[i])
}

//Aleatorizar e duplicar as imagens

function shuffleArray(inputArray){
    inputArray = inputArray.concat(inputArray)
    inputArray.sort(()=> Math.random() - 0.5);
    return inputArray;
}

sorted = shuffleArray(sorted);


//Colocando as cartas no tabuleiro
let game = document.querySelector(".board");
for(let i = 0; i < numberCards; i++){
    game.innerHTML = game.innerHTML + `
    <div class="card" data-identifier="card" onclick = "flipCard(this)" data-card="${sorted[i]}">
        <div class="card-back card-face" data-identifier="front-face">
            <img class="card-img" src="arquivos/front.png">
        </div>
        <div class="card-front card-face" data-identifier="back-face">
            <img class="card-gif" src=${sorted[i]}>
        </div>
    </div>`
}

//Virar as cartas

function flipCard(element){
    playCounter += 1;

    if(lockCard){
        return false;
    }

    element.classList.add("visible");

    if(!firstCard){
        firstCard = element;
        return false;
    }

    secondCard = element;

    checkForMatch();
}

//Fim do jogo 

function youWin(){
    let openCards = document.querySelectorAll(".visible");
    if(openCards.length === numberCards){
        clearInterval(time)
        alert(`Você ganhou em ${playCounter} jogadas e ${seconds} segundos!`)
    }
}

//Conferir se dão match

function checkForMatch(){
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;

    !isMatch ? disableCards() : resetCards();
    
}

//Reverter o flip

function disableCards(){
    lockCard = true;

    setTimeout(() => {
        firstCard.classList.remove("visible");
        secondCard.classList.remove("visible");

        resetCards();
    }, 1000)

}

function resetCards(isMatch = false){
    if(isMatch){
        firstCard.classList.remove("visible");
        secondCard.classList.remove("visible");
    }

    setTimeout(youWin, 1100);

    firstCard = null;
    secondCard = null;
    lockCard = false;
}


function timer(){
    seconds++;
    let timeCounter = document.querySelector(".timer p");
    timeCounter.innerHTML = seconds;
}
