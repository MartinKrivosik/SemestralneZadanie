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
let turnNumber = 0;


const question = document.getElementById("questionText")
const answerA = document.getElementById("answerA")
const answerB = document.getElementById("answerB")
const answerC = document.getElementById("answerC")
const answerD = document.getElementById("answerD")

const scoreA = document.getElementById("TeamAScore")
const scoreB = document.getElementById("TeamBScore")

const activeA = document.getElementById("TeamAActive")
const activeB = document.getElementById("TeamBActive")

const modal = new bootstrap.Modal( document.getElementById("exampleModal"))


let options;
let answer;
let index;
function setupQuestion(){
	if (turn == "player"){
		activeA.src = "../photos/ball.png"
		activeB.src = "../photos/glove.png"
		question.textContent = players[playerTeam][playerNumber][difficulty]
	}
	else{
		activeA.src = "../photos/glove.png"
		activeB.src = "../photos/ball.png"
		index = Math.floor(Math.random() * teams[enemyTeam].length)
		let randomQuestion = teams[enemyTeam][index]
		question.textContent = randomQuestion.question
	}
	
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

	answerA.style.background = "transparent"
	answerB.style.background = "transparent"
	answerC.style.background = "transparent"
	answerD.style.background = "transparent"

}

setupQuestion()
answerA.addEventListener("click", function(){

	if (turnNumber == 5){
		alert("Finish")
	}

	if (turn == "player"){
		if(answerA.textContent == players[playerTeam][playerNumber][answer]){
			answerA.style.background = "green"
			scoreA.textContent = parseInt(scoreA.textContent)+1
			//modal.show()
		}
		else{
			answerA.style.background = "red"
		}
	}
	else{
		if(answerA.textContent == teams[enemyTeam][index].answer){
			answerA.style.background = "green"
			//modal.show()
		}
		else{
			scoreB.textContent = parseInt(scoreB.textContent)+1
			answerA.style.background = "red"
		}
		turnNumber++
	}
	if (turn == "player"){
		turn = "enemy"
	}
	else{
		turn = "player"
		playerNumber++
	}
	setTimeout(setupQuestion, 1500);
})
answerB.addEventListener("click", function(){
    if (turn == "player"){
		if(answerB.textContent == players[playerTeam][playerNumber][answer]){
			answerB.style.background = "green"
			scoreA.textContent = parseInt(scoreA.textContent)+1
			
			//modal.show()
		}
		else{
			answerB.style.background = "red"
		}
	}
	else{
		if(answerB.textContent == teams[enemyTeam][index].answer){
			answerB.style.background = "green"
			
			//modal.show()
		}
		else{
			scoreB.textContent = parseInt(scoreB.textContent)+1
			answerB.style.background = "red"
		}
		turnNumber++
	}
	if (turn == "player"){
		turn = "enemy"
	}
	else{
		turn = "player"
		playerNumber++
	}
	setTimeout(setupQuestion, 1500);
})
answerC.addEventListener("click", function(){
    if (turn == "player"){
		if(answerC.textContent == players[playerTeam][playerNumber][answer]){
			answerC.style.background = "green"
			scoreA.textContent = parseInt(scoreA.textContent)+1
			
			//modal.show()
		}
		else{
			answerC.style.background = "red"
		}
	}
	else{
		if(answerC.textContent == teams[enemyTeam][index].answer){
			answerC.style.background = "green"
			
			//modal.show()
		}
		else{
			scoreB.textContent = parseInt(scoreB.textContent)+1
			answerC.style.background = "red"
		}
		turnNumber++
	}
	if (turn == "player"){
		turn = "enemy"
	}
	else{
		turn = "player"
		playerNumber++
	}
	setTimeout(setupQuestion, 1500);
})
answerD.addEventListener("click", function(){
    if (turn == "player"){
		if(answerD.textContent == players[playerTeam][playerNumber][answer]){
			answerD.style.background = "green"
			scoreA.textContent = parseInt(scoreA.textContent)+1
			//modal.show()
		}
		else{
			answerD.style.background = "red"
		}
	}
	else{
		if(answerD.textContent == teams[enemyTeam][index].answer){
			answerD.style.background = "green"
			//modal.show()
		}
		else{
			scoreB.textContent = parseInt(scoreB.textContent)+1
			answerD.style.background = "red"
		}
		turnNumber++
	}
	if (turn == "player"){
		turn = "enemy"
	}
	else{
		turn = "player"
		playerNumber++
	}
	setTimeout(setupQuestion, 1500);

})


////////////////////////////////////////////////////////////////////////////////