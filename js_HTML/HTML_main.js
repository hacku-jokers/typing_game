'use strict';

{
  const words = [
    'meta',
    'title',
    'body',
    'head',
    'html',
    'css',


  ];
  let word;
  let loc;
  let str_len; //　文字列
  let total_score;
  let total_question;
  let score;
  let miss;
  let score_rate;
  const timeLimit = 10 * 1000;
  const timeReady = 3 * 1000;
  let startTime;
  let startGameTime;
  let isPlaying = false;


  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');
  const countLabel = document.getElementById('countdown_timer');
  const t_s = document.getElementById('score_str'); //total_score
  const tol_q = document.getElementById('tol_question');
  const s_rate_str = document.getElementById('score_rate');




  function updateTarget() {
    let placeholder = '';
    for (let i = 0; i < loc; i++) {
      placeholder += '_';
    }
    target.textContent = placeholder + word.substring(loc);
  }


  function showResult() {
    $('#elapsed_time').hide();
    const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;

    document.getElementById("body").classList.add("done");
    t_s.textContent = total_score;
    tol_q.textContent = total_question;
    score_rate = Math.round(total_score/total_question * 100);
    s_rate_str.textContent = score_rate;
    //alert(`${score}文字正解, ${miss}文字間違え, ${accuracy.toFixed(2)}%の正答率です!`);
  }


  function startTimer() {
    const timeLeft = startTime + timeReady - Date.now();
    console.log(timeLeft);
    // console.log(timeLeft);
    if (timeLeft < 500) {
      countLabel.textContent = "START!";
    }else {
      if (timeLeft < 2000) {

      }
      // countLabel.textContent = Math.round((timeLeft / 1000).toFixed(2));
      countLabel.innerHTML = "<img class='img_1' src ='img_1.png'>"
    }
    const timerId = setTimeout(() => {
      startTimer();
    }, 100);
    if (timeLeft < 0) {
      startGame();
      $(function(){
        $('#countdown_timer').hide();
        $('#openModal').fadeIn();
        $('#elapsed_time').fadeIn();
      });
      clearTimeout(timerId);
     }
  }

  function updateTimer() {
    const timeLeft = startGameTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(0);
    const timerId = setTimeout(() => {
      updateTimer();
    }, 100);
    if (timeLeft < 0) {
      isPlaying = false;
      showResult();
      clearTimeout(timerId);
     }
  }

  function startGame(){
    updateTarget();
    startGameTime = Date.now();
    updateTimer();
  }



  btn.addEventListener('click', () => {
    if (isPlaying === true) {
      return;
    }
    isPlaying = true;

    // console.log(btn);
    // console.log(isPlaying);
    btn.parentNode.removeChild(btn);
    btn1.parentNode.removeChild(btn1);
    btn2.parentNode.removeChild(btn2);



    loc = 0;
    score = 0;
    miss = 0;
    str_len = 0;
    total_score = 0;
    total_question = 1;
    // scoreLabel.textContent = score;
    // missLabel.textContent = miss;
    word = words[Math.floor(Math.random() * words.length)];

    startTime = Date.now();
    startTimer();


  });

  window.addEventListener('keyup', e => {
    if (isPlaying !== true) {
      return;
    }
    str_len++;
    if (e.key === word[loc]) { // 正解だった場合
      loc++;
      score++;
      if (loc === word.length) {
        console.log("str"+str_len);
        console.log("正解"+score);
        word = words[Math.floor(Math.random() * words.length)];
        loc = 0;
        total_question++;
        if(score === str_len){
          total_score++;
        }
        str_len = 0;
        score = 0;
        // $('#openModal').fadeOut();
        // $('#elapsed_time').fadeOut();

      }
      // scoreLabel.textContent = score;
      updateTarget();
    } else {
      miss++;
      // missLabel.textContent = miss;
    }
  });
}

$(function () {
  $('#openModal').click(function(){
      $('#modalArea').fadeIn();
  });
  $('#closeModal , #modalBg').click(function(){
    $('#modalArea').fadeOut();
  });

  $('#result6').click(function(){
    console.log("push");
    window.location.href="./index.html";
  })

  // #btn = 初級編を選択すること
  $('#btn').click(function(){
    // $('#openModal').fadeIn();
    // console.log("test");

  })

});
