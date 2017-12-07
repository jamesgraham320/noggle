
let usersOnlineHTML = `
<h1 class="online-title">noggle</h1>
<div class="dashboard-container">

  <div id="users-online">
  </div>
  <div>
    <h2>Send Messages!</h2>
    <div id="messages">
      <ul id="messages-ul"></ul>
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
      <table class="table is-hoverable is-narrow" id="leaderboard">
        <thead>
          <tr>
            <td>Place</td>
            <td>Username</td>
            <td>Points</td>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
  </div>
</div>
<div class="center-this-bitch">
  <button id="start-game" class="button is-primary is-large is-rounded">Start Game</button>
</div>
`

let gameHTML = `
  <h1 id="scramble"></h1>
  <h2>Time Left: </h2><h2 id="timer">20</h2>
  <div id="game-container">
    <div id="game-scores">
      <h2>Scores</h2>
      <table class="table is-hoverable is-narrow is-fullwidth" style="background-color:inherit">
        <thead>
          <tr>
            <td>Username</td>
            <td>Points</td>
          </tr>
        </thead>
        <tbody id="scoreboard">
        </tbody>
      </table>
    </div>
      <form id="submission-form">
        <div class="field has-addons">
          <div class="control">
            <input type="text" class="input is-large" id="submission" autocomplete="off">
          </div>
          <div class="control">
            <input id="submit-word" value="⏎" class="button is-primary is-large" type="submit">
          </div>
        </div>
      </form>
    <div id="attempts-container">
      <h2>Guessed Words</h2>
      <div id="word-attempts">
        <ul id="attempts"></ul>
      </div>
    </div>
</div>
`


let gameOverHTML = `
  <div id="winner">
    <h1> Your Name Here </h1>
  </div>
  <div id="final-scores">
    <h2>Final Scores</h2>
      <table class="table is-hoverable is-narrow is-fullwidth" style="background-color:inherit">
        <thead>
          <tr>
            <td>Username</td>
            <td>Points</td>
          </tr>
        </thead>
        <tbody id="scoreboard">
        </tbody>
      </table>
  </div>
  <div class="center-this-bitch">
    <button id="start-over" class="button is-primary is-large is-rounded">Play Again</button>
  </div>
`
