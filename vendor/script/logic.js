// json fetches
var players = await fetch('../json/players.json').then(r=>r.json())
var teams = await fetch('../json/questions.json').then(r=>r.json())

let difficulty;
let playerTeam;
let enemyTeam;

//setup teams

if (document.body.className == "setup"){

	const conBtn = document.getElementById("continue");
	let count = 0;
	conBtn.disabled = true;

	const pteam = document.getElementById("playerteam");
	const oteam = document.getElementById("opponentteam");
	const holders = document.querySelectorAll('.player h3');
	const el = document.getElementsByClassName("player");
	const diff = document.getElementById("difficulty");
	
	pteam.addEventListener('change', function() {
		playerTeam = pteam.value;
		for(let i = 0; i < oteam.length; i++){
		  if(oteam[i].value == pteam.value){
			oteam[i].disabled = true;
		  } else{
			oteam[i].disabled = false;
		  }
		}
		for(let j = 0; j < players[playerTeam].length - 1; j++){
            holders[j].innerHTML = players[playerTeam][j].name;
			if(el[j].hasAttribute("draggable")){
				el[j].setAttribute("draggable", true);
			}
        }
		count += 1;	
		if(count >= 3){
			conBtn.disabled = false;
		} else{
			conBtn.disabled = true;
		}
		localStorage.setItem("playerTeam", playerTeam);	
	});
	
	oteam.addEventListener('change', function() {
		enemyTeam = oteam.value;
		for(let i = 0; i < pteam.length; i++){
		  if(pteam[i].value == oteam.value){
			pteam[i].disabled = true;
		  } else{
			pteam[i].disabled = false;
		  }
		}
		count += 1;
		if(count >= 3){
			conBtn.disabled = false;
		} else{
			conBtn.disabled = true;
		}
		localStorage.setItem("enemyTeam", enemyTeam);
	});
	
	diff.addEventListener("change", function(){
  		difficulty = diff.value;
		count += 1;
		if(count >= 3){
			conBtn.disabled = false;
		} else{
			conBtn.disabled = true;
		}
		localStorage.setItem("difficulty", difficulty);	
	})

	window.addEventListener('deviceorientation', function(event) {
		let z = event.alpha;
		let playerList = document.getElementById("list");
		var namesPos = playerList.getElementsByTagName("li");
		let values = Array.from(namesPos, item => item.textContent);
		if (z > 120 || z < 60 ) {	
			for (let i = values.length - 1; i > 0; i--) {
				let index = Math.floor(Math.random() * (i + 1));
				[values[i], values[index]] = [values[index], values[i]];

				// Swap the li elements at the current and random indexes
				list.insertBefore(namesPos[i], namesPos[index]);
			}
		}
		localStorage.setItem("playersOrder", values);
  	});

	var dragSrcEl = null;

	function handleDragStart(e) {
		console.log(this.innerHTML + "0")
		this.style.opacity = '0.4';

		dragSrcEl = this;

		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text/html", this.innerHTML);
	}
	
	function handleDragOver(e) {
		e.preventDefault();
		
		e.dataTransfer.dropEffect = 'move';
			
		return false;
	}
	
	function handleDragEnter(e) {
		this.classList.add('over');
	}
	
	function handleDragLeave(e) {
		this.classList.remove('over');
	}

	function handleDrop(e) {
		e.preventDefault();
		  
		if (dragSrcEl != this) {
			dragSrcEl.innerHTML = this.innerHTML;
			this.innerHTML = e.dataTransfer.getData('text/html');
		}

		var names = document.querySelectorAll(".list .player h3")
		var tab = [];

		for(let i = 0; i < names.length; i++){
			tab.push(names[i].innerHTML);
		}
		localStorage.setItem("playersOrder", tab);
		return false;
	}

	function handleDragEnd(e) {
		this.style.opacity = '1';
	  
		items.forEach(function (item) {
			item.classList.remove('over');
		});
	}  
	
	let items = document.querySelectorAll('.row .player');
	items.forEach(function(item) {
		item.addEventListener('dragstart', handleDragStart, false);
		item.addEventListener('dragenter', handleDragEnter, false);
		item.addEventListener('dragover', handleDragOver, false);
		item.addEventListener('dragleave', handleDragLeave, false);
		item.addEventListener('drop', handleDrop, false);
		item.addEventListener('dragend', handleDragEnd, false);
	});
}

////////////////////////////// GAME LOGIC //////////////////////////////


if (document.body.className == "game"){
	let turn = Math.random() >= 0.5 ? "player" : "enemy";
	let playerNumber = 0;
	let turnNumber = 0;
	
	difficulty = localStorage.getItem("difficulty");
	playerTeam = localStorage.getItem("playerTeam");
	enemyTeam = localStorage.getItem("enemyTeam");
	//premenuj si to podla potreby
	let order = localStorage.getItem("playersOrder").split(',');
	order.push(players[playerTeam][5].name)

	const hintButton = document.querySelectorAll(".hint")

	const question = document.getElementById("questionText")
	const answerA = document.getElementById("answerA")
	const answerB = document.getElementById("answerB")
	const answerC = document.getElementById("answerC")
	const answerD = document.getElementById("answerD")
	
	const scoreA = document.querySelectorAll(".TeamAScore")
	const scoreB = document.querySelectorAll(".TeamBScore")
	
	const activeA = document.querySelectorAll(".TeamAActive")
	const activeB = document.querySelectorAll(".TeamBActive")

	const logoA = document.querySelectorAll(".TeamALogo")
	const logoB = document.querySelectorAll(".TeamBLogo")
	
	const modal = new bootstrap.Modal( document.getElementById("exampleModal"))
	const title = document.getElementById("modalTitle")
	const text = document.getElementById("modalText")
	
	const footer = document.getElementById("footer")
	const endButton = document.getElementById("end")

	let usedIndexes = [];

	let disabledNumber = 0

	let options;
	let answer;
	let index;

	logoA[0].src = "../photos/flags/" + playerTeam + ".png"
	logoA[1].src = "../photos/flags/" + playerTeam + ".png"
	logoB[0].src = "../photos/flags/" + enemyTeam + ".png"
	logoB[1].src = "../photos/flags/" + enemyTeam + ".png"

	let playerWas
	let currPlayer = 0

	function setupQuestion(){
		if (turn == "player"){
			activeA[0].src = "../photos/ball.png"
			activeA[1].src = "../photos/ball.png"
			activeB[0].src = "../photos/glove.png"
			activeB[1].src = "../photos/glove.png"
			for (let cP = 0; cP < players[playerTeam].length; cP++){
				if(players[playerTeam][cP].name == order[playerNumber]){
					question.textContent = players[playerTeam][cP][difficulty]
					currPlayer = cP
				}
			}
		}
		else{
			activeA[0].src = "../photos/glove.png"
			activeA[1].src = "../photos/glove.png"
			activeB[0].src = "../photos/ball.png"
			activeB[1].src = "../photos/ball.png"
			index = Math.floor(Math.random() * teams[enemyTeam].length)
			while (usedIndexes.includes(index)){
				index = Math.floor(Math.random() * teams[enemyTeam].length)
			}
			usedIndexes.push(index)
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
			
			shuffledArray = players[playerTeam][currPlayer][options].sort((a, b) => 0.5 - Math.random());
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

		answerA.style.border = "1px solid black"
		answerB.style.border = "1px solid black"
		answerC.style.border = "1px solid black"
		answerD.style.border = "1px solid black"

		answerA.disabled = false
		answerB.disabled = false
		answerC.disabled = false
		answerD.disabled = false

		disabledNumber = 0
	
	}
	
	function endGame(){
		let score = document.createElement("h2")
		score.style.textAlign = "center"
		let para = document.createElement("p")
		para.style.textAlign = "center"
		if (parseInt(scoreA[0].textContent) > parseInt(scoreB[0].textContent)){
			title.textContent = "Víťaztvo :)"
			score.textContent = "Vyhral si " + scoreA[0].textContent + ":" + scoreB[0].textContent
			para.textContent += "Pre ukončenie hry stlač tlačidlo 'Koniec hry' "
		}
		else if (parseInt(scoreA[0].textContent) < parseInt(scoreB[0].textContent)){
			title.textContent = "Prehra :("
			score.textContent = "Prehral si " + scoreA[0].textContent + ":" + scoreB[0].textContent
			para.textContent += "Pre ukončenie hry stlač tlačidlo 'Koniec hry'"
		}
		else{
			const reset = document.createElement("button")
			title.textContent = "Remíza :|"
			reset.textContent = "Reštart"
			reset.addEventListener("click", function(){
				location.href = "game.html"
			})
			score.textContent = "Remízoval si " + scoreA[0].textContent + ":" + scoreB[0].textContent
			para.textContent += "Pre ukončenie hry stlač tlačidlo 'Koniec hry' a ak chces skúsiť hru znova s rovnakými nastaveniami stlač 'Reštart'"
			reset.setAttribute("class", "btn btn-primary")
			footer.appendChild(reset)
		}
		text.appendChild(score)
		text.appendChild(para)
		modal.show()
	}

	setupQuestion()
	answerA.addEventListener("click", function(){
		if (turn == "player"){
			if(answerA.textContent == players[playerTeam][currPlayer][answer]){
				answerA.style.background = "green"
				scoreA[0].textContent = parseInt(scoreA[0].textContent)+1
				scoreA[1].textContent = parseInt(scoreA[1].textContent)+1
			}
			else{
				answerA.style.background = "red"
			}
		}
		else{
			if(answerA.textContent == teams[enemyTeam][index].answer){
				answerA.style.background = "green"
			}
			else{
				scoreB[0].textContent = parseInt(scoreB[0].textContent)+1
				scoreB[1].textContent = parseInt(scoreB[1].textContent)+1
				answerA.style.background = "red"
			}
			turnNumber++
		}
		if (turn == "player"){
			turn = "enemy"
			playerWas = true
		}
		else{
			turn = "player"
			if (playerWas){
				playerNumber++
				playerWas = false
			}
		}
		if(turnNumber == 5){
			setTimeout(endGame, 500)
		}
		else{
			setTimeout(setupQuestion, 500)
		}
	})
	answerB.addEventListener("click", function(){
		if (turn == "player"){
			if(answerB.textContent == players[playerTeam][currPlayer][answer]){
				answerB.style.background = "green"
				scoreA[0].textContent = parseInt(scoreA[0].textContent)+1
				scoreA[1].textContent = parseInt(scoreA[1].textContent)+1
			}
			else{
				answerB.style.background = "red"
			}
		}
		else{
			if(answerB.textContent == teams[enemyTeam][index].answer){
				answerB.style.background = "green"
			}
			else{
				scoreB[0].textContent = parseInt(scoreB[0].textContent)+1
				scoreB[1].textContent = parseInt(scoreB[1].textContent)+1
				answerB.style.background = "red"
			}
			turnNumber++
		}
		if (turn == "player"){
			turn = "enemy"
			playerWas = true
		}
		else{
			turn = "player"
			if (playerWas){
				playerNumber++
				playerWas = false
			}
		}
		if(turnNumber == 5){
			setTimeout(endGame, 500)
		}
		else{
			setTimeout(setupQuestion, 500)
		}
	})
	answerC.addEventListener("click", function(){
		if (turn == "player"){
			if(answerC.textContent == players[playerTeam][currPlayer][answer]){
				answerC.style.background = "green"
				scoreA[0].textContent = parseInt(scoreA[0].textContent)+1
				scoreA[1].textContent = parseInt(scoreA[1].textContent)+1
			}
			else{
				answerC.style.background = "red"
			}
		}
		else{
			if(answerC.textContent == teams[enemyTeam][index].answer){
				answerC.style.background = "green"
			}
			else{
				scoreB[0].textContent = parseInt(scoreB[0].textContent)+1
				scoreB[1].textContent = parseInt(scoreB[1].textContent)+1
				answerC.style.background = "red"
			}
			turnNumber++
		}
		if (turn == "player"){
			turn = "enemy"
			playerWas = true
		}
		else{
			turn = "player"
			if (playerWas){
				playerNumber++
				playerWas = false
			}
		}
		if(turnNumber == 5){
			setTimeout(endGame, 500)
		}
		else{
			setTimeout(setupQuestion, 500)
		}
	})
	answerD.addEventListener("click", function(){
		if (turn == "player"){
			if(answerD.textContent == players[playerTeam][currPlayer][answer]){
				answerD.style.background = "green"
				scoreA[0].textContent = parseInt(scoreA[0].textContent)+1
				scoreA[1].textContent = parseInt(scoreA[1].textContent)+1
			}
			else{
				answerD.style.background = "red"
			}
		}
		else{
			if(answerD.textContent == teams[enemyTeam][index].answer){
				answerD.style.background = "green"
			}
			else{
				scoreB[0].textContent = parseInt(scoreB[0].textContent)+1
				scoreB[1].textContent = parseInt(scoreB[1].textContent)+1				
				answerD.style.background = "red"
			}
			turnNumber++
		}
		if (turn == "player"){
			turn = "enemy"
			playerWas = true
		}
		else{
			turn = "player"
			if (playerWas){
				playerNumber++
				playerWas = false
			}
		}
		if(turnNumber == 5){
			setTimeout(endGame, 500)
		}
		else{
			setTimeout(setupQuestion, 500)
		}
	})

	endButton.addEventListener("click", function(){
		location.href = "../../index.html";
	})

	hintButton[0].addEventListener("click", function(){
		let buttons = [answerA, answerB, answerC, answerD]
		let randomNumber = Math.floor(Math.random() * buttons.length) 
		while (disabledNumber < 2){

			if (turn == "player"){
				if (buttons[randomNumber].textContent != players[playerTeam][playerNumber][answer]){
					buttons[randomNumber].disabled = true;
					buttons[randomNumber].style.border = "2px solid red"
					buttons.splice(randomNumber, 1)		
					disabledNumber++
				}
			}
			else{
				if (buttons[randomNumber].textContent != teams[enemyTeam][index].answer){
					buttons[randomNumber].disabled = true;
					buttons[randomNumber].style.border = "2px solid red"
					buttons.splice(randomNumber, 1)		
					disabledNumber++
				}
			}

			randomNumber = Math.floor(Math.random() * buttons.length) 
		}
	})

	hintButton[1].addEventListener("click", function(){
		let buttons = [answerA, answerB, answerC, answerD]
		let randomNumber = Math.floor(Math.random() * buttons.length) 
		while (disabledNumber < 2){

			if (turn == "player"){
				if (buttons[randomNumber].textContent != players[playerTeam][playerNumber][answer]){
					buttons[randomNumber].disabled = true;
					buttons[randomNumber].style.border = "2px solid red"
					buttons.splice(randomNumber, 1)		
					disabledNumber++
				}
			}
			else{
				if (buttons[randomNumber].textContent != teams[enemyTeam][index].answer){
					buttons[randomNumber].disabled = true;
					buttons[randomNumber].style.border = "2px solid red"
					buttons.splice(randomNumber, 1)		
					disabledNumber++
				}
			}

			randomNumber = Math.floor(Math.random() * buttons.length) 
		}
	})

}




////////////////////////////////////////////////////////////////////////////////