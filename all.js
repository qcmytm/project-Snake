const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const unit = 20;
const row = canvas.height / unit;
const column = canvas.width / unit;

let snake = [];

snake[0] = {
  x: 80,
  y: 0,
};
snake[1] = {
  x: 60,
  y: 0,
};
snake[2] = {
  x: 40,
  y: 0,
};
snake[3] = {
  x: 20,
  y: 0,
};
let score = 0;
let highestScore;
loadHighestScore();
document.getElementById("myScore").innerHTML = "遊戲分數:" + score;
document.getElementById("myScore2").innerHTML = "最高分數:" + highestScore;
class Fruit {
  constructor() {
    this.x = Math.floor(Math.random() * column) * unit;
    this.y = Math.floor(Math.random() * row) * unit;
  }

  drawFruit() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, unit, unit);
  }
  pickALocation() {
    let overlapping = false;
    let new_x;
    let new_y;

    function checkOverlap(new_x, new_y) {
      for (let i = 0; i < snake.length; i++) {
        if (new_x == snake[i].x && new_y == snake[i].y) {
          overlapping = true;
          return;
        } else {
          overlapping = false;
        }
      }
    }

    do {
      new_x = Math.floor(Math.random() * column) * unit;
      new_y = Math.floor(Math.random() * row) * unit;
      checkOverlap(new_x, new_y);
    } while (overlapping);
    this.x = new_x;
    this.y = new_y;
  }
}

let myFruit = new Fruit();

window.addEventListener("keydown", changeDirection);
let d = "Right";

function changeDirection(e) {
  if (e.key == "ArrowRight" && d != "Left") {
    d = "Right";
  } else if (e.key == "ArrowDown" && d != "Up") {
    d = "Down";
  } else if (e.key == "ArrowLeft" && d != "Right") {
    d = "Left";
  } else if (e.key == "ArrowUp" && d != "Down") {
    d = "Up";
  }

  window.removeEventListener("keydown", changeDirection);
}

function draw() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(myGame);
      alert("GAME OVER");
      return;
    }
  }

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  myFruit.drawFruit();

  for (let i = 0; i < snake.length; i++) {
    if (i == 0) {
      ctx.fillStyle = "lightgreen";
    } else {
      ctx.fillStyle = "lightblue";
    }
    ctx.strokeStyle = "white";

    if (snake[i].x >= canvas.width) {
      snake[i].x = 0;
    }
    if (snake[i].x < 0) {
      snake[i].x = canvas.width - unit;
    }
    if (snake[i].y >= canvas.height) {
      snake[i].y = 0;
    }
    if (snake[i].y < 0) {
      snake[i].y = canvas.height - unit;
    }
    ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
    ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
  }

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (d == "Left") {
    snakeX -= unit;
  } else if (d == "Up") {
    snakeY -= unit;
  } else if (d == "Down") {
    snakeY += unit;
  } else if (d == "Right") {
    snakeX += unit;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  if (snake[0].x == myFruit.x && snake[0].y == myFruit.y) {
    myFruit.pickALocation();
    score++;
    setHighestScore(score);
    document.getElementById("myScore").innerHTML = "遊戲分數:" + score;
    document.getElementById("myScore2").innerHTML = "最高分數:" + highestScore;
  } else {
    snake.pop();
  }

  snake.unshift(newHead);
  window.addEventListener("keydown", changeDirection);
}

let myGame = setInterval(draw, 100);
function loadHighestScore() {
  if (localStorage.getItem("highestScore") == null) {
    highestScore = 0;
  } else {
    highestScore = Number(localStorage.getItem("highestScore"));
  }
}

function setHighestScore(score) {
  if (score > highestScore) {
    localStorage.setItem("highestScore", score);
    highestScore = score;
  }
}
