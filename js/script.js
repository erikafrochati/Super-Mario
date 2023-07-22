let score = 0; // Variável para armazenar a pontuação

const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const grass = document.querySelector('.grass');
const textStart = document.querySelector('text-start');
const audioStart = new Audio('/sons/audio_theme.mp3');
const audioGameOver = new Audio('/sons/audio_gameover.mp3');
const floor1 = document.querySelector('.floor-1');
const floor2 = document.querySelector('.floor-2');
const floor3 = document.querySelector('.floor-3');

/*================ Função Start ===================*/
const start = () => {
  document.getElementById("text-start").style.color = "rgb(236, 236, 236)";
  pipe.classList.add('pipe-animation');
  mario.src = '/imagens/mario.gif';
  mario.style.width = '150px';
  mario.style.marginLeft = '50px';

  function grassAnimation() {
    grass.classList.add('grass-animation');
  }
  setInterval(grassAnimation, 8000);

  function floorAnimation1() {
    floor1.classList.add('floor-animation-1');
  }
  setInterval(floorAnimation1, 0);

  function floorAnimation2() {
    floor2.classList.add('floor-animation-2');
  }
  setInterval(floorAnimation2, 0);

  function floorAnimation3() {
    floor3.classList.add('floor-animation-3');
  }
  setInterval(floorAnimation3, 3100);

  audioStart.play();
}

document.addEventListener('keydown', start);

/*================ Função Pulo ===================*/
const jump = () => {
  mario.classList.add('jump');

  setTimeout(() => {
    mario.classList.remove('jump');
    updateScore(); // Chama a função para incrementar a pontuação após o pulo do Mario
  }, 1500);
}

document.addEventListener('keydown', jump);

/*================ Função para atualizar a pontuação ===================*/
function updateScore() {
    score += 10; // Você pode ajustar a pontuação de acordo com suas preferências
  
    // Atualizar o elemento com a classe "game-score" durante o jogo
    const scoreElement = document.querySelector('.game-score');
    scoreElement.textContent = `Seu Score: ${score}`;
    document.getElementById("text-start").innerHTML = "<strong>GAME OVER</strong> - Pontuação: " + score;
  }
  
/*================ Código para acabar o jogo ===================*/
const checkGameOver = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
  const grassPosition = grass.offsetLeft;
  const floorPosition1 = floor1.offsetLeft;
  const floorPosition2 = floor2.offsetLeft;
  const floorPosition3 = floor3.offsetLeft;

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;
    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;
    mario.src = '/imagens/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';
    grass.style.animation = 'none';
    grass.style.left = `${grassPosition}px`;
    floor1.style.animation = 'none';
    floor1.style.left = `${floorPosition1}px`;
    floor2.style.animation = 'none';
    floor2.style.left = `${floorPosition2}px`;
    floor3.style.animation = 'none';
    floor3.style.left = `${floorPosition3}px`;

    document.getElementById("text-start").style.color = "black";
    document.getElementById("text-start").innerHTML = "<strong>GAME OVER</strong>";

    function stopAudioStart() {
      audioStart.pause();
    }
    stopAudioStart();

    audioGameOver.play();

    function stopAudio() {
      audioGameOver.pause();
    }
    setTimeout(stopAudio, 8000);

    // Atualizar a pontuação antes de encerrar o jogo
    updateScore();

    clearInterval(checkGameOver);
  }

}, 10);