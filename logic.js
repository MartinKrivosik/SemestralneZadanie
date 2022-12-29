// json fetches
var players = await fetch('../json/players.json').then(r=>r.json())
var teams = await fetch('../json/questions.json').then(r=>r.json())



// Game logic
const question = document.getElementById("questionText")
question.textContent = players.argentina[0].easy
const answerA = document.getElementById("answerA")
const answerB = document.getElementById("answerB")
const answerC = document.getElementById("answerC")
const answerD = document.getElementById("answerD")

const modal = new bootstrap.Modal( document.getElementById("exampleModal"))

let answers = [players.argentina[0].optionse[0], players.argentina[0].optionse[1], players.argentina[0].optionse[2], players.argentina[0].answere]
let shuffledArray = answers.sort((a, b) => 0.5 - Math.random());

answerA.textContent = answers[0]
answerB.textContent = answers[1]
answerC.textContent = answers[2]
answerD.textContent = answers[3]

answerA.addEventListener("click", function(){
    if(answerA.textContent == players.argentina[0].answere){
        answerA.style.background = "green"
        modal.show()
    }
    else{
        answerA.style.background = "red"
    }
})
answerB.addEventListener("click", function(){
    if(answerB.textContent == players.argentina[0].answere){
        answerB.style.background = "green"
        modal.show()
    }
    else{
        answerB.style.background = "red"    
    }
})
answerC.addEventListener("click", function(){
    if(answerC.textContent == players.argentina[0].answere){
        answerC.style.background = "green"
        modal.show()
    }
    else{
        answerC.style.background = "red"
    }
})
answerD.addEventListener("click", function(){
    if(answerD.textContent == players.argentina[0].answere){
        answerD.style.background = "green"
        modal.show()
    }
    else{
        answerD.style.background = "red"
    }
})

console.log(teams)
