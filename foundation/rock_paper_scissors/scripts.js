
function getComputerChoises(){
    let no = Math.random();
    no = parseInt((no*10)%3);
    if(no==0)return "PAPER";
    else if(no==1)return "SCISSOR";
    else if(no==2)return "ROCK";

}
function getHumanChoice(){
    let input = prompt("enter choise:");
    input = input.toUpperCase();
    return input;
}
function playRound(choiseh,choisec){
    let winner;
    if(choiseh == choisec){
        return "";
    }
    else if(choiseh=="PAPER" && choisec == "ROCK"){
        winner = "Human";
    }
    else if(choiseh=="ROCK" && choisec == "SCISSOR"){
        winner = "Human";
    }
    else if(choiseh=="SCISSOR" && choisec == "PAPER"){
        winner = "Human";
    }
    else{
        winner = "Computer";
    }
    return winner;
}
function playGame(){
    let humanScore = 0;
    let computerScore = 0;
    for(let i = 0;i<5;){
        let humanSelection = getHumanChoice();
        let computerSelection = getComputerChoises();
        let winner = playRound(humanSelection,computerSelection);
        if(winner == "Human"){
            let message = "you win! "+humanSelection+" beats "+computerSelection+".";
            humanScore++;
            console.log(message);
            i++;
        }
        else if(winner == "Computer"){
            let message = "you lose! "+computerSelection+" beats "+humanSelection+".";
            computerScore++;
            console.log(message);
            i++;

        }
        else if(winner ==""){
            console.log("Draw")
        }
    }
    if(humanScore>computerScore){
        console.log("you win! your score "+humanScore)
    }
    else if(computerScore>humanScore){
        console.log("you lose! your score "+humanScore)
    }
    else{
        console.log("draw your score"+humanScore)
    }
}
playGame();