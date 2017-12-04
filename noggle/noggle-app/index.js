function establishConnection() {
  window.App = {}
  window.App.cable = ActionCable.createConsumer("http://localhost:3000/cable")
  window.App.cable.subscriptions.create("GameInstanceChannel", {
  connected() {
    console.log('we made it')
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
