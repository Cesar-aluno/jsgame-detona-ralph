const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    livesText: document.querySelector(".menu-lives h2"), // referência ao número de vidas
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    curretTime: 60,
    lives: 4, // quantidade inicial de vidas
  },
  actions: {
    timerId: null,
    countDownTimerId: null,
  },
};

function startGame() {
  // Inicia os intervalos do jogo
  state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
  state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function resetGameRound() {
  // Reseta valores do round atual
  state.values.curretTime = 60;
  state.values.result = 0;
  state.view.timeLeft.textContent = state.values.curretTime;
  state.view.score.textContent = state.values.result;
  state.view.squares.forEach((square) => square.classList.remove("enemy"));

  // Reinicia os timers
  clearInterval(state.actions.timerId);
  clearInterval(state.actions.countDownTimerId);
  startGame();
}

function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;

  if (state.values.curretTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);

    if (state.values.result < 30) {
      state.values.lives--; // perde uma vida
      state.view.livesText.textContent = "x" + state.values.lives;

      if (state.values.lives <= 0) {
        alert("Game Over! Você perdeu todas as vidas!");
      } else {
        alert("Pontuação abaixo de 30! Você perdeu uma vida. Vamos tentar novamente!");
        resetGameRound(); // reinicia o jogo
      }
    } else {
      alert("Parabéns! O seu resultado foi: " + state.values.result);
    }
  }
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      }
    });
  });
}

function initialize() {
  addListenerHitBox();
  startGame(); // inicia o jogo
}

initialize();
