var playerInstance;
var json_url = '../cssjs/js/data.json';
var player_url = 'http://www.champstudy.com/contents/shadowing/NewTEPSBasicListening/mp3/';
$(document).ready(function (){
	var g_item,
		g_item_idx = [],
		$tab = $("#tabs");
	var g_shadowing = new Shadowing("#content",g_item_idx);

	$.getJSON(json_url).done(function (data) {
		//g_item = [];//데이터를 저장할 배열 선언
		$.each(data, function (index, item) {//each() 반복문을 사용하여 전달된 콜백함수의 값들을 미리선언한 배열에 각각 추가
			g_item = data[0];
			$.each(item.depth1,function (a, item) {
				if(g_item.depth1.length === 11){//tab이 하나 있을때
					$tab.addClass("no-tab");
					$tab.append('<li id="'+a+'"></li>');
					$("#"+a).append('<ul class="ctab" id="'+a+'_li"></ul>');
				}else{
					$tab.removeClass("no-tab");
					$tab.append('<li><a href="#;" class="mtab" id="'+a+'">'+item.label+'</a></li>');
					$("#"+a).after('<ul class="ctab" id="'+a+'_li"></ul>');
				}

				if(item.depth2.length === 1){
					$.each(item.depth2, function (b, item) {
						$.each(item.depth3, function (c, item) {
							$("#"+a+"_li").append('<li id="'+ a+'_'+b+'_'+c +'"><a href="#">'+item.label+'</a></li>');
						});
					});
				}else{
					$.each(item.depth2, function (b, item) {
						$("#"+a+"_li").append('<li id="'+ a+'_'+b +'"><strong><span>'+item.label+'</span></strong></li>');
						$("#"+a+'_'+b).find("strong").after('<ul id="'+a+'_'+b+'_li"></ul>');
						$.each(item.depth3, function (c, item) {
							$("#"+a+'_'+b+"_li").append('<li id="'+ a+'_'+b+'_'+c +'"><a href="#">'+item.label+'</a></li>');
						});
					});
				}
			});
			$tab.find("li").eq(0).find("a").addClass("active");
		});
		//목록리스트

		$.each($(".ctab li a"), function (index, item) {
			var _this = $(this);
			$(this).click(function(){
				var g_item_array = _this.parent().attr("id").split("_");
				g_item_idx = {
					g_item: g_item,
					depth1 : parseInt(g_item_array[0]),
					depth2 : parseInt(g_item_array[1]),
					depth3 : parseInt(g_item_array[2]),
					question : 0
				}
				g_shadowing.init("#content",g_item_idx);
				//
				//if(기존정보없는경우) g_shadowing.init(g_item_idx);
				//if(기존정보있는경우) g_shadowing.refresh();

				$("#list-box, .list-btn").hide();
				$("#question-box, #question-area, .menu-btn").show();
				$(".menu-btn").css("display","inline-block"); //css가 안먹어서 임시방편
			})
		});
		//tab
		$('#tabs').on('click', '.mtab', function(e){
			e.preventDefault();
			$('.mtab').removeClass('active');
			$('.ctab').hide();
			$(this).addClass('active').next('.ctab').show();
		});
	});

	$("#script-btn").on('click', function(){
		var $view = $("#script-area-text");
		if($(this).hasClass('hide')){
			$(this).text('스크립트 보이기').removeClass('hide');
			$view.hide();
		}else{
			$(this).text('스크립트 감추기').addClass('hide');
			$view.show();
		}
	});

	$("#script-btn2").on('click', function(e){
		e.preventDefault();
		var $view = $("#script-txt-area");
		if($(this).hasClass('hide')){
			$(this).html("문장 보기 <i class='ico-inter b-arrow'></i>").removeClass('hide');
			$view.hide();
		}else{
			$(this).html("문장 감추기 <i class='ico-inter b-arrow'></i>").addClass('hide');
			$view.show();
		}
	});
});

function main_list(){
	$(document).ready(function(){
		$(".hidden, .menu-btn,#question-box").hide();
		$("#list-box, .list-btn").show();
		$("#text-input").html("");
		playerInstance.stop();
	});
}

function Shadowing(selector,data) {
	this.$shadowing = null;
	this.$question = null;
	this.$arr_idx = 0;

	this.$engTxt = null;
	this.$korTxt = null;
	this.$engScript = null;
	this.$korScript = null;

	this.$accent = null;
	this.$accent_list = null;
	this.$accentTxt = null;

	this.$right_answer = null;
	this.$my_answer = null;

	this.$answer_arr = [];
	this.$currentPage = null;
	this.selector = selector;
}
//요소초기화

Shadowing.prototype.init=function(selector,data){
	//문제번호
	this.$depth = data.g_item;
	this.$depth1_idx = data.depth1; //
	this.$depth2_idx = data.depth2; //
	this.$depth3_idx = data.depth3; //
	this.$question_idx = data.question; //
	this.$depth1 = this.$depth.depth1[data.depth1];
	this.$depth2 = this.$depth1.depth2[data.depth2];
	this.$depth3 = this.$depth2.depth3[data.depth3];
	this.$question = this.$depth3.question[this.$question_idx];
	this.$engTxt = this.$question.eng;
	this.$korTxt = this.$question.kor;
	this.$accentTxt = this.$question.pronunciation;

	this.$jwIdx = 0;
	this.$right_anwer = 0;
	this.$wrong_anwer = 0;

	this.options = {
		engTxt : this.$engTxt,
		korTxt : this.$korTxt,
		accentTxt: this.$accentTxt,
		jwIdx : this.$jwIdx,
		question_nm : this.question_nm,
		depth1 : this.$depth.depth1[0],
		depth2 : this.$depth1.depth2[0],
		depth3 : this.$depth2.depth3[0],
		question_idx : this.$question_idx,
		question : this.$depth3.question[this.$question_idx]
	}

	this.$shadowing = $(selector);
	this.$question_text = this.$shadowing.find("#text-input");
	this.$right_answer = this.$shadowing.find("#right-answer");
	this.$my_answer = this.$shadowing.find("#my-answer");

	//정답갯수초기화
	this.$question_nm = this.$shadowing.find(".question-nm"); //문항갯수
	this.$question_nm.html("");
	this.$question_nm.append("<span></span>/<em></em>");
	this.$question_nm.find("em").html(this.$depth3.question.length); //문항갯수 셋팅
	this.$question_nm.find("span").html(this.$question_idx + 1);
	this.$right_nm = this.$shadowing.find(".right-nm"); //맞은갯수
	this.$wrong_nm = this.$shadowing.find(".wrong-nm"); //틀린갯수
	this.$answer_per = this.$shadowing.find(".answer-per"); //정답률
	//발음
	this.$accent_parent = this.$shadowing.find("#pronunc-list");
	this.$accent = this.$shadowing.find("#pronunc-list .text");
	this.$accent_txt = this.$shadowing.find("#pronunc-list .text em");
	this.$accent_list = this.$shadowing.find("#pronunc-list ul");
	//스크립트
	this.$engScript = this.$shadowing.find("#en-script");
	this.$korScript = this.$shadowing.find("#kor-script");

	this.refresh();
}

Shadowing.prototype.refresh =function(){
	this.options = {
		engTxt : this.$engTxt,
		korTxt : this.$korTxt,
		question_nm : this.question_nm,
		depth1_idx : this.$depth1_idx, //
		depth2_idx : this.$depth2_idx, //
		depth3_idx : this.$depth3_idx, //
		question_idx : this.$question_idx,
		depth1 : this.$depth.depth1[this.options.depth1_idx],
		depth2 : this.$depth1.depth2[this.options.depth2_idx],
		depth3 : this.$depth2.depth3[this.options.depth3_idx],
		question : this.$depth3.question[this.$question_idx],
		accentTxt: this.$depth3.question[this.$question_idx].pronunciation,
		jwIdx : this.$jwIdx
	}

	this.question(this.options,this.options.question,0);//문제
	this.accent(this.options);//발음
	this.script(this.options,this.options.question);//스크립트

	//네비게이션
	if(this.$depth1.label.length < 2){
		$(".path").html(this.$depth2.label + " > " + this.$depth3.label);
	}else{
		if(this.$depth2.label.length > 1){
			$(".path").html(this.$depth1.label + " > " + this.$depth2.label + " > " + this.$depth3.label);
		}else{
			$(".path").html(this.$depth1.label + " > " + this.$depth3.label);
		}

	}
	this.initEvent();
	this.$accent_list.removeClass("active").hide();
}

//발음구현하기
Shadowing.prototype.accent = function (options) {
	var accentArray = options.accentTxt.split("/");
	this.$accent_txt.html(accentArray[options.jwIdx]).parent().attr("id",options.jwIdx);
	this.jwplayerPlay(options.jwIdx);

	if(accentArray.length === 1){ //한개일때
		this.$accent.addClass("one");
		this.$accent_list.html("");
	}else{
		this.$accent.removeClass("one");
		this.$accent_list.html("");
		for(var i=1 ; i<accentArray.length; i++){
			this.$accent_list.append('<li><a href="#;" id="'+i+'"><em>'+accentArray[i]+'</em> 발음</a></li>');
		}
	}
}

//mp3
Shadowing.prototype.jwplayerPlay=function(idx){
	var speed = $(".player .speed button em").html(),
		mp3_url = String(this.options.question.pron[idx]);

	playerInstance = jwplayer("player");
	playerInstance.setup({
		file: player_url + mp3_url,
		width: "100%",
		height: 40
	});

	playerInstance.setConfig({
		autostart: true,
		repeat: true,
		volume: 50
	});

	playerInstance.on("ready", function () {
		$("#player").find(".jw-icon-volume").eq(0).hide();
		$("#player").css("float", "left");
		playerInstance.setPlaybackRate(parseFloat(speed));
	});

	$(".btnPlayRate").click(function () {
		playerInstance.setPlaybackRate(parseFloat($(this).data("playrate")));
	});
}

//문제구현하기
Shadowing.prototype.question=function(options,question,indx){
	var objthis = this,
		engTxt = question.eng;

	this.$arr_idx = indx; //리셋
	this.$question_text.html(""); //리셋
	this.$right_answer.html(""); //리셋
	this.$answer_arr = [];
	if($.isArray(engTxt) === false){//1. 한줄일때
		this.questionInput(engTxt,"one"); //()문제구성
	}else{ //2. 두줄일때(Q/A) //3. 여러줄일때
		$.each(engTxt,function(index, item){
			objthis.questionInput(item,"many");
		});
	}
}
//답받기(저장)
Shadowing.prototype.questionInput = function(engTxt,text){
	var item = engTxt,
		start = item.indexOf("("),
		end = item.indexOf(")", start+1),
		answer = $.trim(item.substring(start+1, end)), // 영문 문자열에서 ()안에 있는 내용 가져오기
		eng_text_start = item.substring(0, start),
		eng_text_end = item.substring(end + 1, item.length),
		item1 = eng_text_start + answer + eng_text_end,
		start1 = item1.indexOf("("),
		end1 = item1.indexOf(")", start1 + 1),
		answer1 = $.trim(item1.substring(start1 + 1, end1)),
		eng_text_start1= item1.substring(end-1, start1), //2018-07-26 : end -> end-1로 변경
		eng_text_end1 = item1.substring(end1 + 1, item1.length); // 영문 문자열에서 ()안에 있는 내용 가져오기

	//정답 배열에담기
	if(answer !== ""){
		this.$answer_arr.push(answer);
	}

	//문제만들기
	if (answer.length > 0) { //문장에 문제가 있을경우
		this.$arr_idx = this.$arr_idx + 1;
		//문제하나일결우
		if(text === "one"){
			this.$question_text.append('<div>'+ eng_text_start +'<p><textarea cols="30" rows="1" class="textarea"></textarea></p>'+ eng_text_end +'</div>');
			this.$right_answer.append('<div>' + eng_text_start + '<em>' + answer + '</em>' + eng_text_end + '</div>');
		}else{ //문제하나이상일경우
			//한줄에 정답두개이상 문제&정답만들기
			if(item1.substring(start1 + 1, end1).length > 0) {
				this.$arr_idx = this.$arr_idx + 1;
				var $arr_idx_before = this.$arr_idx - 1;
				this.$question_text.append('<div>' + eng_text_start + '<p><textarea cols="30" rows="1" class="textarea"></textarea></p>' + eng_text_start1 + '<p><textarea cols="30" rows="1" class="textarea"></textarea></p>' + eng_text_end1+'</div>');
				this.$right_answer.append('<div>' + eng_text_start + '<em>' + $arr_idx_before + '. ' + answer + '</em>' +  eng_text_start1 + '<em>' + this.$arr_idx + '. ' + answer1 + '</em>' + eng_text_end1+'</div>');
				this.$answer_arr.push(answer1); //정답 배열에 담기
			}else{
				//정답만들기
				if(eng_text_start.match("Q:") || eng_text_start.match("A:")||eng_text_start.match("Q :") || eng_text_start.match("A :")){
					if(eng_text_end || eng_text_start.split("Q:").length>2 || eng_text_start.split("Q :").length>2|| eng_text_start.split("A:").length>2 || eng_text_start.split("A :").length>2){
						this.$right_answer.append('<div>' + eng_text_start + '<em>' + answer + '</em>' + eng_text_end + '</div>');
						this.$question_text.append('<div>' + eng_text_start + '<p><textarea cols="30" rows="1" class="textarea"></textarea></p>' + eng_text_end + '</div>');
					}else{
						this.$right_answer.append('<div>' + eng_text_start + '<em>' + answer + '</em></div>');
						this.$question_text.append('<div class="type2">' + eng_text_start + '<p><textarea cols="30" rows="1" class="textarea"></textarea></p></div>');
					}
				}else{
					this.$right_answer.append('<div>' + eng_text_start + '<em>' + this.$arr_idx + '. ' + answer + '</em>' + eng_text_end + '</div>');
					this.$question_text.append('<div>' + eng_text_start + '<p><textarea cols="30" rows="1" class="textarea"></textarea></p>' + eng_text_end + '</div>');
				}
			}
		}
	}else{//문장에 문제가 없을경우
		this.$question_text.append('<div>' + item + '</div>');
		this.$right_answer.append('<div>' + item + '</div>');
	}
}

//정답비교하기 //문항계산 (맞은개수/틀린개수/정답률)
Shadowing.prototype.answer = function(options,question){
	var objthis = this,
		engTxt = question.eng,
		rigth_answer_idx = 0;

	this.$my_answer.html(""); //내가쓴답 초기화

	$.each(this.$question_text.find("textarea"),function(index,item){
		var rigth_answer = $.trim(objthis.$answer_arr[index]), //정답
			my_answer = $.trim(objthis.$question_text.find("textarea").eq(index).val()), //내가쓴답
			q_indx = objthis.$question_text.find("textarea").length,
			index_n = index + 1;

		if(q_indx === 1) { //1개일때
			objthis.$my_answer.append('<div>' + my_answer + '</div>');
			objthis.$question_text.find("textarea").html(my_answer);
		}else if(engTxt[index].match("Q :") || engTxt[index].match("A :") || engTxt[index].match("Q:") || engTxt[index].match("A:")) {
			if(engTxt[index].match("Q :") || engTxt[index].match("Q:")){
				objthis.$my_answer.append('<div> Q : ' + my_answer + '</div>');
			}else if(engTxt[index].match("A :") || engTxt[index].match("A:")){
				objthis.$my_answer.append('<div> A : ' + my_answer + '</div>');
			}
		}else{
			objthis.$my_answer.append('<div>' + index_n + '. ' + my_answer + '</div>');
		}

		if(rigth_answer === my_answer){
			rigth_answer_idx = rigth_answer_idx + 1;
		}
	});

	//문항계산 (맞은개수/틀린개수/정답률)
	if($("#content").hasClass("active") === true){
	}else if($("#content").hasClass("active_nm") === true){
	}else{
		if(this.$question_text.find("textarea").length === rigth_answer_idx){
			this.$right_anwer = this.$right_anwer + 1;
		}else{
			this.$wrong_anwer = this.$wrong_anwer + 1;
		}
		this.$question_nm.find("span").html(objthis.$question_idx + 1);
		this.$right_nm.html(objthis.$right_anwer); //맞은개수
		$("#right-nm").html(objthis.$right_anwer); //맞은개수
		this.$wrong_nm.html(objthis.$wrong_anwer); //틀린개수
		$("#wrong-nm").html(objthis.$wrong_anwer); //틀린개수
		this.$answer_per.html(Math.round(100 * objthis.$right_anwer / objthis.$depth3.question.length) ); //정답률
		$("#answer-per").html(Math.round(100 * objthis.$right_anwer / objthis.$depth3.question.length)); //정답률
	}
}

//스크립트구현하기
Shadowing.prototype.script=function(options,question){
	var objthis = this,
		engTxt = question.eng,
		korTxt = question.kor;

	//this.$currentPage = currentId;
	this.$engScript.html("");
	this.$korScript.html("");

	if($.isArray(engTxt) === false){//1. 한줄일때
		this.engScript(engTxt);
		this.korScript(korTxt);
	}else{ //2. 두줄일때(Q/A) //3. 여러줄일때
		$.each(engTxt,function(index, item){
			objthis.engScript(item);
		});
		$.each(korTxt,function(index, item){
			objthis.korScript(item);
		});
	}
}
Shadowing.prototype.engScript=function(item){
	var engscript = item.replace(/[)(]/gi, "");
	this.$engScript.append("<p>"+engscript+"</p>");
};
Shadowing.prototype.korScript=function(item){
	var korScript = item.replace(/[)(]/gi, "");
	this.$korScript.append("<p>"+korScript+"</p>");
};

//이벤트 처리
Shadowing.prototype.initEvent=function () {
	var objthis = this,
		options = objthis.options;

	//발음버튼
	this.$accent_list.find("li a").on("click",function(e){
		var accentArray = options.accentTxt.split("/"), //발음 배열로 담기
		jwIdx = $(this).attr("id"), //발음 여러개일때 클릭한 오브젝트 id값 구하기
		before_idx = objthis.$accent.attr("id"); //현재 텍스트 오브젝트 id값 구하기

		objthis.options.jwIdx = jwIdx; // 옵션값 변경하기
		objthis.$accent_txt.html(accentArray[jwIdx]).parent().attr("id",jwIdx); //현테 텍스트 오브젝트 값 변경
		objthis.jwplayerPlay(jwIdx); //mp3플레이
		// 발음 리스트 내용 변경
		objthis.$accent_list.find("li").eq(objthis.$accent_list.find("li").index($(this).parent())).find("a").attr("id",before_idx);
		objthis.$accent_list.find("li").eq(objthis.$accent_list.find("li").index($(this).parent())).find("em").html(accentArray[before_idx]);
	});

	this.$accent_parent.on("click",function(e){
		e.stopImmediatePropagation();
		if(objthis.$accent_list.hasClass("active")){
			objthis.$accent_list.removeClass("active").hide();
		}else{
			objthis.$accent_list.addClass("active").show();
		}
	});

	//정답확인하기
	$("#answer-btn").on("click",function(e){
		e.stopImmediatePropagation();
		objthis.$currentPage = "정답";
		$(".hidden ,#question-area").hide();
		$("#answer-area").show();
		$("#script-btn").text('스크립트 보이기').removeClass('hide');

		if($("#content").hasClass("active") === false){
			objthis.answer(options,objthis.$question);
		}else{
			$("#content").removeClass("active");
		}
		$("#script-area-text").hide();

		objthis.stateText(objthis.$currentPage);
	});

	//쉐도잉
	$("#shadowing-btn").on("click",function(e){
		e.stopImmediatePropagation();
		objthis.$currentPage = "쉐도잉";
		$(".hidden").hide();
		$("#script-btn, #script-area").show();
		objthis.result_btn();
		objthis.stateText(objthis.$currentPage);
		$("#script-btn").text('스크립트 보이기').removeClass('hide');
		$("#script-area-text").hide();
	});

	//이전화면
	$(".prev-btn").on("click",function(e){
		e.stopImmediatePropagation();
		if(objthis.$currentPage === "정답"){
			objthis.$currentPage = "기본";
			$(".hidden").hide();
			$("#question-area").show();
		}else if(objthis.$currentPage === "쉐도잉"){
			objthis.$currentPage = "정답";
			$(".hidden").hide();
			$("#answer-area").show();
		}
		objthis.question_idx();
		$("#content").addClass("active");

		objthis.stateText(objthis.$currentPage);
		$(".textarea").each(function () {
			$(this).attr('disabled', 'disabled');
		})
		$("#script-btn").text('스크립트 보이기').removeClass('hide');
		$("#script-area-text").hide();
	});

	//다음문제
	$("#next-question").on("click",function(e){
		e.stopImmediatePropagation();
		objthis.$currentPage = "기본";
		objthis.$question_idx = objthis.$question_idx + 1;
		objthis.options.$question_idx = objthis.$question_idx;
		objthis.refresh();

		$(".hidden").hide();
		$("#question-area").show();
		objthis.question_idx();
		$("#content").removeClass("active");
		objthis.stateText(objthis.$currentPage);
		$("#script-btn").text('스크립트 보이기').removeClass('hide');
		$("#script-area-text").hide();
	});

	//이전문제
	$("#prev-question").on("click",function(){
		objthis.$question_idx = objthis.$question_idx - 1;
		objthis.options.$question_idx = objthis.$question_idx;
		objthis.refresh();

		$(".hidden").hide();
		$("#question-area").show();
		objthis.question_idx();
		$("#content").addClass("active_nm");
	});

	//결과보기
	$("#result-btn").on("click",function(){
		$("#result-box, #answer-area, #question-box").hide();
		$("#result-btn").hide();
		$(".hidden").hide();
		$("#result-box").show();

		playerInstance.stop();
		objthis.stateText("기본");
	});

	$(".main-list ").on("click",function() {
		objthis.questionInit(); //문제번호초기화
		objthis.$right_anwer = 0;
		objthis.$right_anwer = 0;
		objthis.$answer_per.html("0"); //정답률
		$("#answer-per").html("0"); //정답률
		$("#script-btn").text('스크립트 보이기').removeClass('hide');
		$("#script-area-text").hide();
	})
}
Shadowing.prototype.question_idx = function() {
	if(this.$question_idx === 0) {
		$("#prev-question").hide();
	}else{
		$("#prev-question").show();
	}
}
Shadowing.prototype.result_btn = function() {
	if(this.$question_idx === this.$depth3.question.length - 1){
		$("#next-question").hide();
		$("#result-btn").show().css("display","inline-block");
	}else{
		$("#next-question").show();
		$("#result-btn").hide();
	}
}
Shadowing.prototype.questionInit = function(){
	this.$question_idx  = 0;
	this.options = {
		depth1 : this.$depth.depth1[0],
		depth2 : this.$depth1.depth2[0],
		depth3 : this.$depth2.depth3[0],
		question : this.$depth3.question[0]
	}

	this.$wrong_nm.html("0");
	this.$right_nm.html("0");
}
Shadowing.prototype.stateText = function(state){
	if(state === "정답"){
		$(".state-txt").html("정답을 확인하세요.");
	}else if(state === "쉐도잉"){
		$(".state-txt").html("음성을 듣고 쉐도잉 하세요.");
	}else{
		$(".state-txt").html("음성을 듣고 받아쓰세요.");
	}
}