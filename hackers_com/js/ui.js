jQuery(document).ready( function($) {
	// 메뉴	
	if( $.fn.fsvs ) {
		var slider = $.fn.fsvs({
			speed : 1000,
			nthClasses : 9,
			mouseDragEvents : false
		});
	}

	if( $.fn.flare ) {
		var flares = $('.flare').flare();
		for( var flare in flares ) {
			//flares[flare].reset();
		}
	}

	var sectionHeight = $('#fsvs-body > .slide:eq(0)').height();
	$('#fsvs-body > .slide').each( function(){
		var section = $(this),
			item = $('.item', section ),
			demo = $('.demo', section ),
			itemHeight = item.outerHeight(),
			demoHeight = demo.outerHeight();
		item.css({
			marginTop : ( ( sectionHeight - itemHeight ) / 2 ) + 'px'
		});
		demo.css({
			marginTop : ( ( sectionHeight - demoHeight ) / 2 ) + 'px'
		});
	});

	$(".logo a").click(function(){
		$("body").removeClass();
		$('#tmenu li').removeClass("on");
		$('#tmenu li').eq(0).addClass("on");
	});
	
	// 해커스에바란다 레이어
	$(".btn_notice").mouseenter(function(){
		$(".btn_notice").addClass("on");
		$(".layer_notice").show();
	});
	$(".btn_notice").mouseleave(function(){
		$(".btn_notice").removeClass("on");
		$(".layer_notice").hide();
	});

	$(".s_tit").mouseenter(function(){
		$(".select_link").show();
	});
	$(".s_tit").mouseleave(function(){
		$(".select_link").hide();
	});
});