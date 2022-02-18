document.addEventListener("DOMContentLoaded", () => {
  const dino = document.querySelector(".dino");
  const grid = document.querySelector(".grid");
  const alert = document.querySelector('#alert');
  let isJumping = false;
  let isGameOver = false;
  let gravity = 0.9;
  let position = 0;

  function control(e) {
    // Key code for spacebar
    if (e.keyCode === 32) {
      if (!isJumping) {
        isJumping = true;
        jump();
      }
    }
  }

  document.addEventListener("keyup", control);

  function jump() {
    let count = 0;
    let timerId = setInterval(() => {
      // move down
      if (count === 15) {
        clearInterval(timerId);
        let downTimerId = setInterval(() => {
          position -= 5;
          position *= gravity;
          count--;
          dino.style.bottom = position + "px";
          if (!count) {
            clearInterval(downTimerId);
            isJumping = false;
          }
        }, 20);
      }
      // move up
      position += 30;
      position *= gravity;
      count++;
      dino.style.bottom = position + "px";
    }, 20);
  }
  let randomTime = Math.random() * 4000;
  function generateObstacle() {
        let obstaclePosition = 1000;
        
            const obstacle = document.createElement("div");
            const cactusImg = document.createElement("img");
            cactusImg.src="./cactus.png";
            obstacle.appendChild(cactusImg);
            if(!isGameOver) {
                obstacle.classList.add("obstacle");
                obstacle.style.left = obstaclePosition + "px";
            
        }
        grid.appendChild(obstacle);
        let timerId = setInterval(() => {
            if (obstaclePosition > 0 && obstaclePosition <  60 && position < 60) {
                clearInterval(timerId);
                alert.innerText = "Game Over"
                isGameOver = true;
                // Remove all child obstacle divs
                while(grid.firstChild) {
                    grid.removeChild(grid.lastChild);
                }
            }
            obstaclePosition -= 10;
            obstacle.style.left = obstaclePosition + "px";
        }, 20);
        if(!isGameOver) setTimeout(generateObstacle, randomTime);
  }
  generateObstacle();
});
