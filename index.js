let $start = document.querySelector('#start');
let $game = document.querySelector('#game');
let $time = document.querySelector('#time');
let score = 0;
let isGameStarted;


function startGame() {
  isGameStarted = true;
  $game.style.backgroundColor = '#fff';
  $start.classList.add('hide');

  let interval = setInterval(function() {
    let time = parseFloat($time.textContent);

    if (time <= 0) {
      // end game
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);
  renderBox();
}

function renderBox() {
  $game.innerHTML = '';
  let box = document.createElement('div');
  let boxSize = getRandom(30, 100);
  let gameSize = $game.getBoundingClientRect();
  let maxTop = gameSize.height - boxSize;
  let maxLeft = gameSize.width - boxSize;
  console.log(gameSize);
  box.style.height = box.style.width = boxSize + 'px';
  box.style.position = 'absolute';
  box.style.backgroundColor = '#000';
  box.style.top = getRandom(0, maxTop) + 'px';
  box.style.left = getRandom(0, maxLeft) + 'px';
  box.style.cursor = 'pointer';
  box.setAttribute('data-box', true);

  $game.insertAdjacentElement('afterbegin', box);
}

function handleBoxClick(event) {
  if (!isGameStarted){
    return
  }
  if (event.target.dataset.box) {
    score = score + 1;
    renderBox();
  }
  ;
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

function endGame() {
  isGameStarted = false;
}

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
