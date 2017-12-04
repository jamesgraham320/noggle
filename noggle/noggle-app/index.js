function establishConnection() {
  window.App = {}
  window.App.cable = ActionCable.createConsumer(`http://localhost:3000/cable?token=${localStorage.getItem('userId')}`)
  window.App.cable.subscriptions.create({channel: "GameInstanceChannel", user_id: localStorage.getItem('userId')}, {
  connected() {
    console.log('we made it')
  },
    received(data) {
      if(data.users) {
        displayOnlineUsers(data.users)
      }
    }
  })
}
document.addEventListener('DOMContentLoaded', (event) => {
  let usernameForm = document.querySelector("form")
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
        document.getElementById("username").value = ""
      }
    })
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
