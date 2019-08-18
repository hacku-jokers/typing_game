'use strict';
{
	const words = [];

	let word;
	let desc;
	let loc;
	let str_len; //　文字列
	let total_score;
	let total_question;
	let score;
	let miss;
	let score_rate;
	const timeLimit = 50 * 1000;
	const timeReady = 4 * 1000;
	let startTime;
	let startGameTime;
	let isPlaying = false;
	let len;
	let question_data;


	const target = document.getElementById('target');
	const description = document.getElementById('description');
	const scoreLabel = document.getElementById('score');
	const missLabel = document.getElementById('miss');
	const timerLabel = document.getElementById('timer');
	const countLabel = document.getElementById('countdown_timer');
	const t_s = document.getElementById('score_str'); //total_score
	const tol_q = document.getElementById('tol_question');
	const s_rate_str = document.getElementById('score_rate');
	const missPoint = document.getElementById('miss_point');




	function updateTarget() {
		let placeholder = '';
		for (let i = 0; i < loc; i++) {
			placeholder += '_';
		}
		target.textContent = placeholder + word.substring(loc);
		description.textContent = "意味：" + desc;
	}


	function showResult() {
		$('#elapsed_time').hide();
		const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;

		document.getElementById("body").classList.add("done");
		t_s.textContent = total_score;
		tol_q.textContent = total_question;
		score_rate = Math.round(total_score/total_question * 100);
		s_rate_str.textContent = score_rate;
		// get_missdata();
		//alert(`${score}文字正解, ${miss}文字間違え, ${accuracy.toFixed(2)}%の正答率です!`);
	}


	function startTimer() {
		const timeLeft = startTime + timeReady - Date.now();
		// console.log(timeLeft);
		if (timeLeft < 1000) {
			countLabel.textContent = "START!";
		}else {
			if (timeLeft < 4000) {
				countLabel.innerHTML = "<img class='img_3' src ='../images/img_3.png'>"
			}
			if (timeLeft < 3000) {
				countLabel.innerHTML = "<img class='img_2' src ='../images/img_2.png'>"
			}
			if (timeLeft < 2000) {
				countLabel.innerHTML = "<img class='img_1' src ='../images/img_1.png'>"

			}
			// countLabel.textContent = Math.round((timeLeft / 1000).toFixed(2));
		}
		const timerId = setTimeout(() => {
			startTimer();
		}, 100);
		if (timeLeft < 0) {
			isPlaying = true;
			startGame();
			$(function(){
				$('#countdown_timer').hide();
				$('#openModal').fadeIn();
				$('#elapsed_time').fadeIn();
				$('#progress').fadeIn();
			});
			clearTimeout(timerId);
		 }
	}

	function updateTimer() {
		const timeLeft = startGameTime + timeLimit - Date.now();
		const progress_num = 100- timeLeft/timeLimit*100;
		// progressbarについて
		var color = $('.ui-progressbar-value');

		if(progress_num <=30){
				color.css('background','green');
		}else if(progress_num > 30 && progress_num <= 60){
				color.css('background','yellow');
		}else if(progress_num > 60){
				color.css('background','red');
		}
		$('#progress').progressbar({
				value:parseInt(progress_num)
		});
		// console.log(progress_num);
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



	window.onload = function() {
		if (isPlaying === true) {
			return;
		}

		// console.log(btn);





		loc = 0;
		score = 0;
		miss = 0;
		str_len = 0;
		total_score = 0;
		total_question = 1;
		// scoreLabel.textContent = score;
		// missLabel.textContent = miss;
		$.get("https://yuma1100.github.io/hack_u_question/question/CSS.json", function(data){
			len = Object.keys(data).length;
			// console.log(len);
			var rand = Math.floor(Math.random() * len);
			word = data[rand].answer;
			desc = data[rand].discription;
			question_data = data;
			console.log(question_data);

		});

		startTime = Date.now();
		startTimer();


	}

	window.addEventListener('keydown', e => {
		if (isPlaying !== true) {
			return;
		}
		str_len++;
		console.log(e.key);
		if (e.key.length >  1){ // 文字入力以外を取り除く
			str_len--;
			return;
		}
		else if (e.key === word[loc]) { // 正解だった場合
			loc++;
			score++;
			if (loc === word.length) {
				console.log("str"+str_len);
				console.log("正解"+score);
				loc = 0;
				total_question++;
				if(score === str_len){
					total_score++;
					if(!$('#badArea').hasClass('AreaHide')){
						$('#badArea').addClass('AreaHide');
					}
						$('#goodArea').removeClass('AreaHide');
				}else{
					add_missdata(word);
				}
				var rand = Math.floor(Math.random() * len);
				word = question_data[rand].answer;
				desc = question_data[rand].discription;
				str_len = 0;
				score = 0;
				// $('#openModal').fadeOut();
				// $('#elapsed_time').fadeOut();

			}
			// scoreLabel.textContent = score;
			updateTarget();
		} else {
			if(!$('#goodArea').hasClass('AreaHide')){
				$('#goodArea').addClass('AreaHide');
			}
				$('#badArea').removeClass('AreaHide');
			miss++;
			missPoint.textContent = "MISS：✕ " + e.key + " -> ◯ " + word[loc];
			console.log("miss_count");

			// missLabel.textContent = miss;
		}
	});

	function add_missdata(miss_ans){
		var messagesRef = firebase.database().ref('/html');
		messagesRef.push(miss_ans);

		// console.log(miss_ans);
	}
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
		test();
		// $('#openModal').fadeIn();
		// console.log("test");

	})

	$('#progress').progressbar({
				value:0,
				max:100
		});

		$('#aaa').change(function(){
				var param = $("#aaa").val();
				// console.log(param);

				var color = $('.ui-progressbar-value');

				if(param <=30){
						color.css('background','red');
				}else if(param > 30 && param <= 60){
						color.css('background','yellow');
				}else if(param > 60){
						color.css('background','green');
				}
				$('#progress').progressbar({
						value:parseInt(param)
				});
		});



});
