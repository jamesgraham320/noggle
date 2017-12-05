let scrambleSolutions = []
let guessedWords = []

function establishConnection() {
  //Opens a websocket which receives broadcasted info from Rails
  window.App = {}
  window.App.cable = ActionCable.createConsumer(`http://localhost:3000/cable?token=${localStorage.getItem('userId')}`)
  return window.App.cable.subscriptions.create("GameInstanceChannel", {
  connected() {
    console.log('we made it')
  },
    received(data) {
      console.log(data)
      if(data.users) {
        displayOnlineUsers(data.users)
      }
      else if (data.current_game) {
        displayGame(data.current_game)
      }
      else if (data.scores) {
        displayScores(data.scores)
      }
    }
  })
}
document.addEventListener('DOMContentLoaded', (event) => {
  let usernameForm = document.getElementById('user-login')
  usernameForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let username = document.getElementById("username").value
    fetch("http://localhost:3000/users", {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'username': username})
    })
    .then(res => res.json())
    .then( json => {
      if (json.errors) {
        alert(json.errors.username)
      } else {
        localStorage.setItem( 'userId', json.id)
        establishConnection()
        setTimeout(fetchUsers, 400)
        document.getElementById("user-login").style.visibility = 'hidden'
      }
    })
  })
})

function displayOnlineUsers(users){
  let onlineDiv = document.getElementById('users-online')
  onlineDiv.innerHTML = ""
  startButton = document.createElement('button')
  startButton.addEventListener('click', (event) => {
    fetch("http://localhost:3000/games", {
      method: 'post',
      headers: {'Content-Type': 'application/json'}
    })
  })

  onlineDiv.append(startButton)

  users.forEach(user => {
    let newP = document.createElement('p')
    newP.innerText = user.username
    onlineDiv.append(newP)
  })
}

function displayGame(gameData) {
  localStorage.setItem('gameId', gameData.game_data.id)
  document.body.innerHTML = ""
  document.body.innerHTML = gameHTML
  //Get and set the div with the scrammbled letters
  let scrambleDiv = document.getElementById('scramble')
  scrambleDiv.innerText = gameData.game_data.scramble
  scrambleSolutions = gameData.game_data.solutions
  //Get the score for this user and set their scoreId in localStorage
  let score = gameData.scores.find( score => parseInt(localStorage.getItem('userId')) === score.user_id)
  localStorage.setItem('scoreId', score.id)
  displayScores(gameData)
  //countdown for game time
  timer()

  //Check a users submitted word against scrambleSolutions
  let submissionForm = document.getElementById('submission-form')
  submissionForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let userWord = document.getElementById('submission').value
    document.getElementById('submission').value = ""
    checkUserWord(userWord)
  })
}

function displayScores(gameData) {
  //Add everyones score to the scoreboard
  let scoreboard = document.getElementById('scoreboard')
  scoreboard.innerText = ""
  gameData.users.forEach(user => {
    let userScore = gameData.scores.find( score => user.id === score.user_id)
    let newLi = document.createElement('li')
    newLi.innerHTML = `${user.username}  -  ${userScore.points} points`
    scoreboard.append(newLi)
  })
}

function displayGameOver() {
  document.body.innerHTML = ""
  document.body.innerHTML = gameOverHTML
}

function timer(){
  const interval =  setInterval(
    function countdown() {
      let timerDiv = document.getElementById('timer')
      if (parseInt(timerDiv.innerText) > 0){
      timerDiv.innerText =  parseInt(timerDiv.innerText) - 1
      } else {
        fetch(`http://localhost:3000/games/${localStorage.getItem("gameId")}`, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'}
        })
        //displayScores()
        clearInterval(interval)
      }
    }, 1000)
}


function checkUserWord(word){
  //Checks word is a solution and sends it back to api as a score update
  if (scrambleSolutions.includes(word) && (!guessedWords.includes(word))) {
    fetch(`http://localhost:3000/scores/${localStorage.getItem('scoreId')}`,{
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        {score: {points: word.length, game: parseInt(localStorage.getItem('gameId'))}})
    })
    guessedWords.push(word)
    showGuessedWords()
  }
}

function showGuessedWords(){
  let attempts = document.getElementById('attempts')
  attempts.innerText = ''
  guessedWords.forEach( word => {
    let attemptLi = document.createElement('li')
    attemptLi.innerText = word
    attempts.append(attemptLi)
  })
}
function fetchUsers() {
  fetch("http://localhost:3000/users")
}
