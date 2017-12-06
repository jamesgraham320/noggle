
let usersOnlineHTML = `
<h1 class="online-title">noggle</h1>
<div class="dashboard-container">

<div id="users-online">
</div>
<div>
  <h2>Send Messages!</h2>
  <div id="messages">
  </div>
    <form id="message-form">
      <div class="field has-addons">
        <div class="control">
          <input type="text" class="input is-small" id="message" autocomplete="off">
        </div>
        <div class="control">
          <input id="submit-message" value="⏎" class="button is-primary is-small" type="submit">
        </div>
      </div>
    </form>
</div>
<div id="scoreboard">
<h2>Top Scores!</h2>
<ol id="leaderboard">
</ol>
</div>
</div>
<div class="center-this-bitch">
<button id="start-game" class="button is-primary is-large is-rounded">Start Game</button>
</div>
`

let gameHTML = `
<div id="game-container">
  <h1>Nog it out!!!!!</h1>
  <h2>Time Left: </h2><h2 id="timer">10000</h2>
  <div id="scramble"></div>
  <ul id="scoreboard"></ul>
  <form id="submission-form">
    <input type="text" id="submission" autocomplete="off">
    <input id="submit-word" value="submit" type="submit">
  </form>
  <div id="attempts-container">
    <ul id="attempts" ></ul>
  </div>
</div>
`


let gameOverHTML = `
  <h1>Nog it out!!!!!</h1>
  <h2>Time Up!!!<h2>
  <div id="winner">
    <h5> Your Name Here <h5>
  </div>
  <ul id="scoreboard"></ul>
  <button id="start-over">Play Again</button>
`
