
//let firstCard = getRandomCard()
//let secondCard = getRandomCard()
//let cards = [firstCard, secondCard]
//let sum = firstCard + secondCard
let sum = 0
let cards = []
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
// let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let sumEl = document.querySelector("#sum-el")
let player= {
    name: "Max",
    chips: 200
}


let playerEl= document.getElementById("player-el")
playerEl.textContent = player.name + ": $" + player.chips
console.log(cards)
function getRandomCard(){
    let randomNumber = Math.floor(Math.random() * 13) +1
    if (randomNumber> 10){
        return 10
    }
    else if(randomNumber === 1){
        return 11
    }
    else{
        return randomNumber
    }
}

function startGame(){
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    isAlive = true
    hasBlackJack = false
    rendergame()
}

function rendergame(){
    console.log(hasBlackJack)
    cardsEl.textContent ="Cards: "
    for (let i=0; i < cards.length; i++){
        cardsEl.textContent += cards[i] + " "

    }
    sumEl.textContent ="sum: " + sum
    if (sum <= 20) {
        message = "want new card?"
    } else if (sum === 21){
        message = "Woohoo u've got blackjack"  
        hasBlackJack = true
        player.chips +=200
        playerEl.textContent = player.name + ": $" + player.chips
    } else {
        message = "you're out! "
        isAlive = false
        player.chips -=50
        console.log(player.chips)
        playerEl.textContent = player.name + ": $" + player.chips
        }
messageEl.textContent = message


}
function drawcard(){
   
    if (isAlive === true && hasBlackJack === false){
        let card = getRandomCard()
        sum += card
        cards.push(card)
        console.log(cards)
        rendergame()
    }
    
}