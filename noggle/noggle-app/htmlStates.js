let gameHTML = `
<div id="game-container">
  <h1>Nog it out!!!!!</h1>
  <h2>Time Left: </h2><h2 id="timer">20</h2>
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
