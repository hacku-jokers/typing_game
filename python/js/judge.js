function sleep(a){
	var dt1 = new Date().getTime();
	var dt2 = new Date().getTime();
	while (dt2 < dt1 + a){
		dt2 = new Date().getTime();
	}
	return;
}
var editor = ace.edit("editor");
editor.$blockScrolling = Infinity;
editor.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: true
});
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/python");


var data = "";
var strid  = "";
var request = new XMLHttpRequest();
var url = 'http://api.paiza.io/runners/create';
var	url2 = 'http://api.paiza.io/runners/get_details';
var count = 0;
var miss_ans = null;
var ans;
var status;
const judgeNow = document.getElementById('judge_system');

function judge(code,inputValue) { 
	var err_msg = null;
	$.ajaxSetup({async: false});
	request.open('POST',url, true);
	request.responseType = 'json';
	var params = {
		source_code:code,//ソースコード
		language:"python3",//言語指定、http://api.paiza.io/docs/swagger/#!/runners　を参考に
		input:inputValue,
		longpoll:"",
		longpoll_timeout:"",
		api_key:"guest"};
	request.onload = function () {
	var data = this.response;
	console.log(data);
	};
	$.post(url,params,null,"json")
	.done(function(result) {
		console.log(result.id);	

		sleep(2000);
		request.open('GET',url2, true);
		request.responseType = 'json';
		var param = {
			id: result.id,
			api_key:"guest"
	}
	
	$.getJSON( url2, param, function( result2 ) {
		
		// console.log(result2)
		console.log(result2.stdout)
		ans = result2.stdout;
		status = result2.result;	 
		err_msg = result2.stderr;
		console.log(result2);
		});
	});
	count++;
	if(count == 1){
		if(ans == 15){
			console.log("テスト"+count+"成功");
			judgeNow.textContent = "テスト"+count+"通過";
			return true;
		}
	}else if(count == 2){
		if(ans == 98){
			console.log("テスト"+count+"成功");
			judgeNow.textContent = "テスト"+count+"通過";
			return true;
		}
	}else if(count == 3){
		if(ans == 495){
			console.log("テスト"+count+"成功");
			judgeNow.textContent = "テスト"+count+"通過";
			return true;
		}
	}

	if(status == "failure"){
		console.log(err_msg);
		miss_ans = err_msg;
		return false;
	}
	$.ajaxSetup({async: true});
}
// const edi = document.getElementById("editor");
document.getElementById("ansSend").onclick = function(){
	$("#judge_system").fadeIn(100,function () { 
		let text = editor.getValue();
		console.log(text);
		
		var pass = 0;
		if(judge(text,"3 5")){
			pass++;
		}
		sleep(1000)
		if(judge(text,"7 7")){
			pass++;
		}
		sleep(1000)
		if(judge(text,"15 33")){
			pass++;
		}
		// sleep(1000)
		count = 0;
		

		if(pass == 3){
			document.getElementById("body").classList.add("done");
		}
		else if(pass != 3 && miss_ans != null){
			console.log(miss_ans);
			judgeNow.textContent = miss_ans;
		}else if(pass != 3){
			// console.log("計算が違います");
			judgeNow.textContent = "計算が違います";
		}
	 });
	
	// console.log(judge(text,"7 7"));
	// sleep(1000);
	// console.log(judge(text,"15 33"));
	
	// if(judge(text,"3 5")){
	// 	pass++;
	// 	if(judge(text,"7 7")){
	// 		pass++;
	// 		if(judge(text,"15 33")){
	// 			pass++;
	// 			if(pass == 3){
	// 				console.log("true");
	// 			}else{
	// 				console.log(miss_ans);
	// 			}
	// 		}
	// 	}
	// }
};