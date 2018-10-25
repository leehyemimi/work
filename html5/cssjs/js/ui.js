;(function($, undefined){

	// 엄격한 문법 모드 발동 : STRICT MODE
	"use strict";

	// 헬퍼 참조 변수 설정 : defind helper local variables
	var win = window, doc = document, html = doc.documentElement, init;


	// 초기화 실행 함수
	init = function() {
		//skip_navi
		$('#skip').on('click', 'a[href^="#"]', function(e){
			var id = $(this).attr('href');
			$(id).attr('tabindex',-1).focus();
		});



		//textarea
		$('.txt-area').on('keyup', 'textarea', function(e){
			$(this).css('height', 'auto');
			$(this).height(this.scrollHeight);
		});
		$('.txt-area').find('textarea').keyup();

		//toggle button
		/*$('.toggle').on('click', function(){
			var $view = $('#script-area').find('.answer');
			$(this).text('스크립트 감추기');
			$(this).toggleClass('hidden');
			$view.toggleClass('hidden');
			if($view.hasClass('hidden')){
				$(this).text('스크립트 보이기');
			}
		});*/

		/*//이전화면
		$('.btn').on('click', '.prev', function(e){
			e.preventDefault();
			history.back();
		});*/

		//btn top
		$('.btn-top').hide().on('click', function(){
			$('html').animate( { scrollTop : 0 }, 400 );
		});

		$(win).scroll(function(){
			var viewScrollTop = $(win).scrollTop();
			$('.btn-top').stop().fadeOut(100);
			clearTimeout( $.data( this, "scrollCheck" ) );
			$.data( this, "scrollCheck", setTimeout(function() {
				if(viewScrollTop > 0){
					$('.btn-top').stop().fadeIn(100);
				}
			}, 250) );
		});

		//layer popup
		function popupLayer(obj){
			var self = $(obj),
				target = $($(obj).attr("href"));
			target.attr("tabindex", "0").addClass('open').focus();
			if($(".popup-layer").hasClass('open')){
				$("body").addClass('fix');
			}

			target.find('.cancel').on('click', function(){
				$(".popup-layer").removeClass('open');
				self.focus();
				$("body").removeClass('fix');
			});

			//close program
			$('.close-program').on('click', function(e){
				e.preventDefault();
				window.close();
			});
		}
		$("a[href*='#popup-']").on('click', function(e){
			e.preventDefault();
			var target = $($(this).attr("href"));
			if(target.is(':visible')){
				target.hide();
				$("body").removeClass('fix');
			}else{
				popupLayer(this);
			}
		});

		//audio player
		$('.speed').children('button').on('click', function(){
			//속도 버튼
			$(this).next('.speed-select').stop().slideUp(200);
			if( !$('.speed-select').is(':visible') ){
				$(this).next('.speed-select').stop().slideDown(200);
			}
			$('.speed-select').find('button').on('click', function(){
				$(this).closest('.speed').find('em').text( $(this).text() );
				$(this).closest('.speed-select').stop().slideUp(200);
			});
		});
	};

	// 문서가 준비되면 실행 : DOM Ready
	$(doc).ready(init);

})(window.jQuery);

function js_show(obj){
	$(".content").hide();
	$("."+obj).show();
}