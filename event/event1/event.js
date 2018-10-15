/* 이벤트 JS */
$(function(){

    $('.btn_close_pop').on('click', function(e){
        $(this).closest('.layer_n').fadeOut(300);
    });

    $(".btn_silde").on("click",function(){
        $(this).children("img").toggleClass("on");
        $(".bx_img").slideToggle();
        return false;
    });

    $("#join").on("click",function(){
        goLoginLayer();
    });
    $("#login").on("click",function(){
        goLoginLayer();
    });
    $("#sms_chk_4").on("click",function(){
        var sms_chk_4 = $(this.checked).length;
        if(sms_chk_4==0) {
            $("input[id='s_agree']").prop('checked', false);
        }else{
            //$("input[id='s_agree']").prop('checked', true);
        }
    });

    $('#sms_chk_1, #sms_chk_2').click(function(){
        if($(this).is(':checked') == false) {
            $('#s_agree').removeProp('checked');
        }
        if($('#sms_chk_1').is(':checked') && $('#sms_chk_2').is(':checked')){
            $('#s_agree').prop('checked', 'checked');
        }
    });
});



var contMax = $('.scroll_cont').length;
$(document).ready(function(){
    var i = 0;
    var $evtTop = $('.top_quick');
    var $listBigple = $('.shadow_list_area');

    $('.scroll_cont').each(function(){
        i++;
        $(this).addClass('scroll_cont'+(i));
    });

    $evtTop.on('click', function(e){
        e.preventDefault();
        $('html, body').animate({ 'scrollTop' : 0 }, 300);
    });

    $listBigple.find('li').hover(function(){
        $(this).find('.shadow_box').addClass('active');
    }, function(){
        $(this).find('.shadow_box').removeClass('active');
    });


});
// 이벤트 스크롤 모션.
$(window).load(function(){
    var nPos = $(this).scrollTop();
    var contPos = [];

    for(var i=0; i < contMax; i++){
        var n = $('.scroll_cont'+(i+1));
        //console.log(n);
        contPos[i] = n.offset().top-n.outerHeight();
    }
    /*
    var i = 0;
    $('.scroll_cont').each(function(){
        var n = $(this);
            contPos[i] = n.offset().top-400;
    });*/

    $(window).scroll(function(){
        var winScrollTop = $(this).scrollTop();
        scrollViewControl(winScrollTop);
    });


    function scrollViewControl(nt){
        for(var i = 0; i < contMax;  i++){
            var n = $('.scroll_cont'+(i+1));

            if(contPos[i] <= nt){
                $(n).addClass('active');
            }
        }

    }

    if(nPos > 100) scrollViewControl(nPos);



});
