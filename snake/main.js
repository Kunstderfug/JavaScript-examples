const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
const gameOver = document.querySelector('.gameover');
const newGame = document.querySelector('.newgame');

let snake;

(function setup() {
  snake = new Snake();
  fruit = new Fruit();
  fruit.pickLocation();

  window.setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fruit.draw();
    snake.update();
    snake.draw();
    snake.dead();

    if (snake.eat(fruit)) {
      fruit.pickLocation();
    }
  }, 100);
})();

window.addEventListener('keydown', evt => {
  const direction = evt.key.replace('Arrow', '');
  snake.changeDirection(direction);
});
