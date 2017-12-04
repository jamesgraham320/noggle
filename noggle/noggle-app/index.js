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
        console.log(establishConnection())
        document.getElementById("user-login").style.visibility = 'hidden'
      }
    }).then(fetchUsers)
  })
})

function displayOnlineUsers(users){
  let onlineDiv = document.getElementById('users-online')
  onlineDiv.innerHTML = ""
  users.forEach(user => {
    let newP = document.createElement('p')
    newP.innerText = user.username
    onlineDiv.append(newP)
  })
}

function fetchUsers() {
  fetch("http://localhost:3000/users")
}
