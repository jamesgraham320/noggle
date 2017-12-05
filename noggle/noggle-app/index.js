//Opens a websocket which receives broadcasted info from Rails
function establishConnection() {
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
  let scoreboard = document.getElementById('scoreboard')
  gameData.users.forEach(user => {
    let userScore = gameData.scores.find( score => user.id === score.user_id)
    let newLi = document.createElement('li')
    newLi.innerHTML = `${user.username}  -  ${userScore.points} points`
    scoreboard.append(newLi)
  })

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


function fetchUsers() {
  fetch("http://localhost:3000/users")
}
