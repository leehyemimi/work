var playerInstance;
var playerInstance2;
var recordInstance;
var record_stat = true;// 마이크 사용 여부(사용 거부시 false)
var use_recording = true;
var s_timer;
var default_volume = '50';
var last_depth = '';

$(document).ready(function (){
    var g_item,
        g_item_idx = [],
        $tab = $("#tabs");
    var g_depth = new Array();
    var g_shadowing = new Shadowing("#content",g_item_idx);

    $.getJSON(json_url).done(function (data) {
        //g_item = [];//데이터를 저장할 배열 선언

        $.each(data, function (index, item) {//each() 반복문을 사용하여 전달된 콜백함수의 값들을 미리선언한 배열에 각각 추가
            g_item = data[0];
            $.each(item.depth1,function (a, item) {
                if(g_item.depth1.length === 1){//tab이 하나 있을때
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
                            g_depth.push(a+'_'+b+'_'+c);
                        });
                    });
                }else{
                    $.each(item.depth2, function (b, item) {
                        $("#"+a+"_li").append('<li id="'+ a+'_'+b +'"><strong><span>'+item.label+'</span></strong></li>');
                        $("#"+a+'_'+b).find("strong").after('<ul id="'+a+'_'+b+'_li"></ul>');
                        $.each(item.depth3, function (c, item) {
                            $("#"+a+'_'+b+"_li").append('<li id="'+ a+'_'+b+'_'+c +'"><a href="#">'+item.label+'</a></li>');
                            g_depth.push(a+'_'+b+'_'+c);
                        });
                    });
                }
            });
            $tab.find("li").eq(0).find("a").addClass("active");
        });

        last_depth = g_depth.length - 1;//마지막 문제 예외처리위해 변수에 최종 Depth 담아둠


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
                $("#step_1, #question-area, .menu-btn").show();//구조가 달라 수정
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
    //다시하기 - 해당 Depth 재 호출
    $("#question-return").on('click', function(e){
        e.preventDefault();
        g_shadowing.init("#content",g_item_idx);
        $("#result-box").hide();
        $("#step_1").show();
    });

    //계속하기 - Depth 배열에서 해당 Depth 값 검색 후 다음 Depth 호출
    $("#question-next").on('click', function(e){
        e.preventDefault();

        var question_idx = g_depth.indexOf(g_item_idx.depth1+'_'+g_item_idx.depth2+'_'+g_item_idx.depth3);

        var question_n_idx = (question_idx == last_depth)?g_depth[0].split('_'):g_depth[question_idx + 1].split('_');
        g_item_idx['depth1'] = question_n_idx[0];
        g_item_idx['depth2'] = question_n_idx[1];
        g_item_idx['depth3'] = question_n_idx[2];
        g_shadowing.init("#content",g_item_idx);
        $("#result-box").hide();
        $("#step_1").show();
    });
});

//에러페이지 호출
function error(){
    $('.content').hide();
    $("#error").show();
}

function main_list(){
    $(document).ready(function(){
        $("#step_1,#step_2,#step_3 ,#result-box,.menu-btn,#question-box").hide();
        $("#list-box, .list-btn").show();
        playerInstance.stop();
        playerInstance2.stop();
    });
}

function record_ck(param){
     var param = (param != undefined) ? param : 'record';
     //record 체크;
     if(param == 'index' && record_stat){
         $(".content").hide();
         $('#mic_check_page').show();
         RecorderMP3.init();
         if (navigator.mediaDevices != undefined) {
             RecorderMP3.getMicAccess(function (rs) {
                 if (rs) {
                     $('#mic_check_page').hide();
                    $("."+param).show();
                 }
             });
         }


     }else if(param == 'record' && record_stat){


         if (navigator.mediaDevices != undefined) {
             RecorderMP3.getMicAccess(function (rs) {
                 if (!rs) {
                     $(".content").hide();
                     $('#mic_check_page').show();
                     return false;
                 }
             });
         }
         showTime(0);
         $('.standby,.btn-rcd').hide();
         $('.re_record,.complete').hide();
         $('.btn-rcd-ok,.playing').show();
         startRecord();
         timer();



     }

}

function record_start(){
    if (navigator.mediaDevices != undefined) {
        RecorderMP3.getMicAccess(function (rs) {
            if (!rs) {
                console.log(rs);
                return false;
            }
        });
    }
    $('#mic_check_page').hide();
    $(".index").show();
}




function timer(){
    var second = 0;
    var max_second = 90;
    s_timer = setInterval(function(){
        if(second >= max_second){
            clearInterval(s_timer);
            stopRecord();
        }
        showTime(second);
        if (navigator.mediaDevices != undefined) {
            RecorderMP3.getMicAccess(function (rs) {
                if (!rs) {
                    clearInterval(s_timer);
                    alert('마이크가 차단되었습니다.');
                    return false;
                }
            });
        }
        second++;
    },1000);
}


function showTime(second) {
    var min = parseInt(second / 60);
    var sec = second % 60;

    min = (min < 10) ? '0' + String(min) : min;
    sec = (sec < 10) ? '0' + String(sec) : sec;

    $("#txt_min").text(min);
    $("#txt_sec").text(sec);

}

function record_status(status){
    record_stat = status;
    if(!status){
        $('#mic_check_page').hide();
        $(".index").show();
    }
}

function mp3_volume(value){
    default_volume = value;
    playerInstance.setVolume(value);
    playerInstance2.setVolume(value);
    $('.volume_area').slider({value:value});
}

function startRecord() {
    _is_recording = false;

    if (!record_stat) {
        _is_recording = true;
    } else if (RecorderMP3.mic_state && record_stat) {
        RecorderMP3.record();
        _is_recording = true;
    }

    return _is_recording;
}

function stopRecord(){
    if(!use_recording){
    //녹음기능 사용안함

    }else{
    //녹음기능 사용

    }
    $('.re_record,.complete').show();
    $('.btn-rcd-ok,.playing').hide();
    clearInterval(s_timer);
    var afterSaving = function () {

    };

    if (use_recording) {
    //    saveAudio(afterSaving);
    }
}

//녹음된 MP3 -> STEP3 플레이어 setup
function recordPlayer(url){
    recordInstance = jwplayer("player_3_1");
    recordInstance.setup({
        file: url,
        width: "100%",
        height: 40
    });

    recordInstance.setConfig({
        autostart: false,
        repeat: false,
        volume: default_volume
    });

}
function record_stop(){

    if (_rec_interval_status > 0) {

        // 크롬일 때(flash 사용안함)
        if (!RecorderMP3.is_flash) {

            var stopRecord = function (url, blob) {

                // 녹음 Blob 데이터를 mp3 로 업로드
                var fd = new FormData();


                // 크롬 파일 업로드 설정(쉐도잉 전용 업로드 파일 필요)
                // fd.append("fname", "test.mp3");
                // fd.append("audio", blob);
                // fd.append("r", __h_r);
                // fd.append("m", __h_m);
                // fd.append("a", "tos_program.ajax");
                // fd.append("request_type", "uploadTestAudio");

                $.ajax({
                    url: '/',
                    type: 'post',
                    data: fd,
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    success: function (rs) {
                        if (rs.success) {
                            // 녹음파일 JW플레이어 세팅(default seting 확인 필요) for HTML5
                            // jwplayer("player_3_1").setup({
                            //     'file': rs.url,
                            //     'height': 40,
                            //     'width': "100%",
                            //     'events': {
                            //         'onReady': function () {
                            //             $(".jw-icon-volume").hide();
                            //             $(".jw-slider-volume").hide();
                            //
                            //         }
                            //     }
                            // });

                        } else {
                            if (rs.err_msg) {
                                error();
                            } else {
                                error();
                            }
                        }
                    }
                });
            };

            RecorderMP3.stop(stopRecord);

            // 크롬 외 브라우저(flash 사용)
        } else {
            RecorderMP3.stop(function (url) {
                if (url) {
                    // 녹음파일 JW플레이어 세팅(default seting 확인 필요) for IE
                    // jwplayer("player_3_1").setup({
                    //     'file': rs.url,
                    //     'height': 40,
                    //     'width': "100%",
                    //     'events': {
                    //         'onReady': function () {
                    //             $(".jw-icon-volume").hide();
                    //             $(".jw-slider-volume").hide();
                    //
                    //         }
                    //     }
                    // });
                }
            });
        }

    }

}






function Shadowing(selector,data) {
    this.$shadowing = null;
    this.$question = null;
    this.$arr_idx = 0;

    this.$engTxt = null;

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
    this.$jwIdx = 0;

    this.options = {
        engTxt : this.$engTxt,
        korTxt : this.$korTxt,
        jwIdx : this.$jwIdx,
        question_nm : this.question_nm,
        depth1 : this.$depth.depth1[0],
        depth2 : this.$depth1.depth2[0],
        depth3 : this.$depth2.depth3[0],
        question_idx : this.$question_idx,
        question : this.$depth3.question
    }
    this.$shadowing = $(selector);

    this.refresh();
}

Shadowing.prototype.refresh =function(){
    /*마지막 문제에서 다음으로 클릭시 완료 페이지로 이동*/
    if(this.$depth3.question[this.$question_idx] == undefined){
        this.question_finish();
        return false;
    }
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
    this.question(this.options,this.options.question,0);//문장
    this.accent(this.options);//발음
   

    //네비게이션
    $(".head-step").html("<strong>"+this.$depth1.label+"</strong>"+" > "+this.$depth2.label+" > "+this.$depth3.label+" ("+this.options.question.no+"/"+this.$depth3.question.length+")");


    this.initEvent();
}
Shadowing.prototype.question_finish = function(){
    $('.test-wrap').hide();
    $('#result-box').show();
    playerInstance.stop();
    playerInstance2.stop();
    $('#result-box > h3').html("<strong>"+this.$depth1.label+" > "+this.$depth2.label+this.$depth3.label+"<br>말하기 연습을 마치셨습니다.</strong>");
}
//MP3 변경
Shadowing.prototype.accent = function (options) {
    this.jwplayerPlay(options.jwIdx);
}

//mp3
Shadowing.prototype.jwplayerPlay=function(idx){
    var speed = $(".player .speed button em").html(),
        mp3_url = String(this.options.question.pron[idx]);

    playerInstance = jwplayer("player");
    playerInstance2 = jwplayer("player_3_2");//원어민 음성듣기 추가
    playerInstance.setup({
        file: player_url + mp3_url,
        width: "100%",
        height: 40
    });

    playerInstance.setConfig({
        autostart: true,
        repeat: true,
        volume: default_volume
    });

    playerInstance2.setup({
        file: player_url + mp3_url,
        width: "100%",
        height: 40
    });

    playerInstance2.setConfig({
        autostart: false,
        repeat: true,
        volume: default_volume
    });


    playerInstance.on("ready", function () {
        $("#player").find(".jw-icon-volume").eq(0).hide();
        $("#player").css("float", "left");
        playerInstance.setPlaybackRate(parseFloat(speed));
    });

    $(".btnPlayRate").click(function () {
        var player_select = $(this).parents('ul').data('audio');
        if(player_select == '1') {
            playerInstance.setPlaybackRate(parseFloat($(this).data("playrate")));
        }else if(player_select == '3'){
            playerInstance2.setPlaybackRate(parseFloat($(this).data("playrate")));
        }
    });
}

//문장 텍스트 변경
Shadowing.prototype.question=function(options,question,indx){
    var engTxt = question.eng;

    this.$arr_idx = indx; //리셋
    $('#script-txt-area').html(engTxt);
}




//이벤트 처리
Shadowing.prototype.initEvent=function () {
    var objthis = this,
        options = objthis.options;
    //Next Step
    $(".step-next").on("click",function(e){
        e.stopImmediatePropagation();
        var step = $(this).data('step');
        var ori_step = step - 1;
        objthis.$currentPage = "step_"+step;
        if(step == '2'){
            if($(this).prev().hasClass('hide')){
              $(this).prev().trigger('click');
            }
            playerInstance.pause();
        }
        $('#step_'+ori_step).hide();
        $('#step_'+step).show();
    });

    //이전화면
    $(".prev-btn").on("click",function(e){
        e.stopImmediatePropagation();
       var step = $(this).data('step');
       var ori_step = step + 1;
       objthis.$currentPage = "step_"+step;
        if(step == '1'){
            playerInstance.play();
        }else if(step == '2'){
            playerInstance2.pause();
        }
        $('#step_'+ori_step).hide();
        $('#step_'+step).show();
    });

    //다음문제
    $("#next-question").on("click",function(e){
        e.stopImmediatePropagation();
        objthis.$currentPage = "step_1";
        objthis.$question_idx = objthis.$question_idx + 1;
        objthis.options.$question_idx = objthis.$question_idx;
        $("#step_3").hide();
        $("#step_1").show();
        objthis.refresh();
        objthis.question_idx();

    });


    //결과보기
    $("#result-btn").on("click",function(){
        $("#result-box, #answer-area, #question-box").hide();
        $("#result-btn").hide();
        $(".hidden").hide();
        $("#result-box").show();

        playerInstance.stop();

    });

    $(".main-list ").on("click",function() {
        objthis.questionInit(); //문제번호초기화

    });
}
Shadowing.prototype.question_idx = function() {
    if(this.$question_idx === 0) {
        $("#prev-question").hide();
    }else{
        $("#prev-question").show();
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

}
