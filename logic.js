// json fetches
var players = await fetch('../json/players.json').then(r=>r.json())
var teams = await fetch('../json/questions.json').then(r=>r.json())



// Game logic

console.log(players)
console.log(teams)
