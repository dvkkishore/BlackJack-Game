let message=""
let sum=0
let hasBlackJack=false
let isAlive=false
let cards=[]
let initial=true
let start=false
let messageEl=document.getElementById("message-el")
let initialMessage=messageEl
let sumEl=document.getElementById("sum-el")
let initialSum=sumEl 
let cardEl=document.getElementById("cards-el")
let initialCard=cardEl
let chipsEl=document.getElementById("player-el")
let win=false
let lose=false
let chip_sum=0

function getRandomCard(){
    let card = Math.floor(Math.random()*13)+1
    
    if(card===1){
        return 11
    }
    else if(card>10){
        return 10
    }
    else{
        return card
    }
}

function chips(){
    if(win){
        chip_sum+=50
    }
    else if(lose){
        chip_sum-=25
        if(chip_sum<0){
            chip_sum=0
        }
    }
    chipsEl.textContent="Chips: "+ "$" + chip_sum
}

function startgame(){
    start=true
    if(initial){
    isAlive=true    
    let firstcard=getRandomCard()
    let secondcard=getRandomCard()
    cards.push(firstcard)
    cards.push(secondcard)
    sum=firstcard+secondcard
    initial=false
    }
    
    rendergame()
}

function rendergame(){
    if((hasBlackJack && start) || (!(isAlive) && start)){
        messageEl.textContent="Want to play a round?"
        sumEl.textContent="Sums: "
        cardEl.textContent="Cards:  "
        sum=0
        cards=[]
        initial=true
        isAlive=true
        win=false
        lose=false
        hasBlackJack=false
    }
    else if(isAlive){
        if(sum<21){
            message="Do you want to draw a new card?"
        }
        else if(sum===21){
            message="WOOHOO! You've got Blackjack!"
            hasBlackJack=true
            win=true
            isAlive=false
            chips()
        }
        else{
            message="You're out of the game!"
            isAlive=false
            lose=true
            chips()
        }
        messageEl.textContent=message
        sumEl.textContent="Sum: "+sum
        
        cardEl.textContent="Cards: "
        for(let i=0;i<cards.length;i++){
            cardEl.textContent += cards[i] + " "
        }
    }
}

function newcard(){
    if(!initial){
    let card=getRandomCard()
    sum+=card
    start=false
    cards.push(card)
    rendergame()
    }
}