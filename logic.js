// json fetches
var players = await fetch('../json/players.json').then(r=>r.json())
var teams = await fetch('../json/questions.json').then(r=>r.json())



////////////////////////////// GAME LOGIC //////////////////////////////

//TODO connect to sliders on setup page
let playerTeam = "argentina"
let enemyTeam = "france"
let difficulty = "easy"
let turn = Math.random() >= 0.5 ? "player" : "enemy";
let playerNumber = 0;
let enemyNumber = 0;


const question = document.getElementById("questionText")
const answerA = document.getElementById("answerA")
const answerB = document.getElementById("answerB")
const answerC = document.getElementById("answerC")
const answerD = document.getElementById("answerD")

const modal = new bootstrap.Modal( document.getElementById("exampleModal"))

let index = 0
if (turn == "player"){
	question.textContent = players[playerTeam][playerNumber][difficulty]
}
else{
	index = Math.floor(Math.random() * teams[enemyTeam].length)
	let randomQuestion = teams[enemyTeam][index]
	question.textContent = randomQuestion.question
}

let options;
let answer;
if (difficulty == "easy"){
    options = "optionse"
    answer = "answere"
}
else{
    options = "optionsh"
    answer = "answerh"
}

let shuffledArray;
if (turn == "player"){
	shuffledArray = players[playerTeam][playerNumber][options].sort((a, b) => 0.5 - Math.random());
}
else{
	shuffledArray = teams[enemyTeam][index].options.sort((a, b) => 0.5 - Math.random()) 
}

answerA.textContent = shuffledArray[0]
answerB.textContent = shuffledArray[1]
answerC.textContent = shuffledArray[2]
answerD.textContent = shuffledArray[3]


answerA.addEventListener("click", function(){
	if (turn == "player"){
		if(answerA.textContent == players[playerTeam][playerNumber][answer]){
			answerA.style.background = "green"
			modal.show()
		}
		else{
			answerA.style.background = "red"
		}
	}
	else{
		if(answerA.textContent == teams[enemyTeam][index].answer){
			answerA.style.background = "green"
			modal.show()
		}
		else{
			answerA.style.background = "red"
		}
	}
})
answerB.addEventListener("click", function(){
    if (turn == "player"){
		if(answerB.textContent == players[playerTeam][playerNumber][answer]){
			answerB.style.background = "green"
			modal.show()
		}
		else{
			answerB.style.background = "red"
		}
	}
	else{
		if(answerB.textContent == teams[enemyTeam][index].answer){
			answerB.style.background = "green"
			modal.show()
		}
		else{
			answerB.style.background = "red"
		}
	}
})
answerC.addEventListener("click", function(){
    if (turn == "player"){
		if(answerC.textContent == players[playerTeam][playerNumber][answer]){
			answerC.style.background = "green"
			modal.show()
		}
		else{
			answerC.style.background = "red"
		}
	}
	else{
		if(answerC.textContent == teams[enemyTeam][index].answer){
			answerC.style.background = "green"
			modal.show()
		}
		else{
			answerC.style.background = "red"
		}
	}
})
answerD.addEventListener("click", function(){
    if (turn == "player"){
		if(answerD.textContent == players[playerTeam][playerNumber][answer]){
			answerD.style.background = "green"
			modal.show()
		}
		else{
			answerD.style.background = "red"
		}
	}
	else{
		if(answerD.textContent == teams[enemyTeam][index].answer){
			answerD.style.background = "green"
			modal.show()
		}
		else{
			answerD.style.background = "red"
		}
	}
})

////////////////////////////////////////////////////////////////////////////////