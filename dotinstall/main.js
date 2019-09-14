'use strict';

{
  const words = [
    'a ',
    'sky',
    'blue',
    'middle',
    'set',
  ];
  let word;
  let loc;
  let str_len; //　文字列
  let total_score;
  let score;
  let miss;
  const timeLimit = 3 * 1000;
  let startTime;
  let isPlaying = false;

  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');
  const t_s = document.getElementById('score');

  function updateTarget() {
    let placeholder = '';
    for (let i = 0; i < loc; i++) {
      placeholder += '_';
    }
    target.textContent = placeholder + word.substring(loc);
  }

  function showResult() {
    const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
    alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!`);
  }

  function updateTimer() {
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);

    const timeoutId = setTimeout(() => {
      updateTimer();
    }, 10);

    if (timeLeft < 0) {
      isPlaying = false;

      clearTimeout(timeoutId);
      setTimeout(() => {
        showResult(total_score);
      }, 100);

      timerLabel.textContent = '0.00';
      target.textContent = 'click to replay';
    }
  }

  window.addEventListener('click', () => {
    if (isPlaying === true) {
      return;
    }
    isPlaying = true;

    loc = 0;
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    word = words[Math.floor(Math.random() * words.length)];

    updateTarget();
    startTime = Date.now();
    updateTimer();
  });

  window.addEventListener('keyup', e => {
    if (isPlaying !== true) {
      return;
    }
    str_len++;
    if (e.key === word[loc]) {
      loc++;
      score++;
      if (loc === word.length) {
        word = words[Math.floor(Math.random() * words.length)];
        loc = 0;
        str_len = 0;
        score = 0;
        if(score === str_len){
          total_score++;
        }

      }

      scoreLabel.textContent = score;
      updateTarget();
    } else {
      miss++;
      missLabel.textContent = miss;
    }
  });
}
