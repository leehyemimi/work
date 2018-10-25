$(function(){
	//mainsSlide
	var sliderAni=$('.bxslider-ani');
	sliderAni.bxSlider({
		auto:true,
		useCSS:false,
		pager:false,
		touchEnabled:false,
		onSlideAfter:function($slideElement, oldIndex, newIndex){
			$slideElement.addClass('on').siblings().removeClass('on');
		}
	});

	//scrollAction
	var section=$('section');
	var sectionLength=section.length;
	var sectionList=[];

	$(window).on('scroll', function(){
		var scrollTop=$(document).scrollTop();
		for(var i=1;i<sectionLength;i++){
			sectionList[i]=section.eq(i).offset().top;

			if(scrollTop>sectionList[i]-600){
				scrollMotion(i);
			}
		}
		function scrollMotion(index){
			section.eq(index).addClass('scroll');
		}
	});

	//navigation
	$('nav').find('a').on('click',function(e){
		var list = $(this).parent();
		var index = list.index();
		var currentSection = section.eq(index);
		var scrollTop = currentSection.offset().top;
		var header=$('header').outerHeight();
		$('html, body').stop().animate({scrollTop:scrollTop-header+'px'});
		e.preventDefault();
	});

	//tab
	$(".js-tab li a").on('click',function(){
		var nm = $(".js-tab li").index($(this).parent());
		$(this).parent().siblings().removeClass("on");
		$(this).parent().addClass("on");
		$(".js-tab-con").hide();
		$(".js-tab-con").eq(nm).fadeIn();
	});

	//business_layer
	var list = $(".business_layer_txt h4");
	list.each(function(){
		var list_txt = $(this).text();
		$(".select_list").append("<li><a href='#;'>"+list_txt+"</a></li>");
	});
	$(".select_tit").on('click',function(e){
		e.preventDefault();
		$(".select_list").toggle();
	});
	$(".select_list").find('a').on('click',function(e){
		e.preventDefault();
		var nm = $(".select_list li").index($(this).parent())  + 1;
		business_layer(nm);
		$(".select_list").hide();
	});
	$(".business_area").find('a').on('click',function(e){
		e.preventDefault();
		var nm = $(".business_area li").index($(this).parent()) + 1;
		business_layer(nm);
		$(this).parent().addClass("on").siblings('li').removeClass("on");
		$(".business_layer").find('.inner_box').animate({'right':'0'})
		$(".business_layer").find('.bg').fadeIn();
	});
	$(".business_layer_close,.business_layer .bg").on('click',function(e){
		e.preventDefault();
		layer_close();
	});
	function layer_close(){
		$(".business_layer").find('.inner_box').animate({'right':'-100'+'%'})
		$(".business_layer").find('.bg').fadeOut();
	}

	function business_layer(nm){
		var tit_img = $(".business_layer .inner_box .con_box dl dt img").attr("src").split("_");
		var con_img = $(".layer_img").attr("src").split("_");
		var con_txt = $(".business_layer .inner_box .con_box dl dd");
		var t_img = tit_img[0] + "_" + nm + ".png";
		var c_img = con_img[0] + "_" + nm + ".jpg";
		$(".business_layer .inner_box .con_box dl dt img").attr("src",t_img);
		$(".layer_img").attr("src",c_img);
		$(".business_layer .inner_box .con_box dl dd.txt").html($(".business_layer_txt li p").eq(nm-1).text());
		$(".business_layer .inner_box .con_box dl dd.btn a").attr("href",$(".business_layer_txt li span").eq(nm-1).text());
		$(".link_url").html($(".business_layer_txt li span").eq(nm-1).text());
	}

	//setupVideo();//¿µ»ó
});
function setupVideo(){
	loadVideo('play','','2');
}
function loadVideo(state, vodURL,autopl){
	var autoplayFlag = "";
	if(state != 'layerMovie'){
		var vod=$('#myElement').attr('data-vod');
		autoplayFlag = (typeof autopl !== "undefined" ? autopl :"");
	}else{
		var vod='http://down-hackersdn.x-cdn.com/cf/151210_hackerstalk_15s.mp4';
	}
	vodURL=vodURL?vodURL:vod;
	switch(state){
		case 'play':
			$("#myElement").html('<iframe frameborder="0" width="649" height="362" scrolling="No" src="/jwplayer/?main=y&src='+vodURL+'&amp;autoplay='+autoplayFlag+'&amp;loop=1&amp;mute=1"></iframe>');
			break;
		case 'layerMovie' :
			$("#main_movie_box").html('<iframe frameborder="0" width="649" height="362" scrolling="No" src="/jwplayer/?main=y&src='+vodURL+'&amp;autoplay='+autoplayFlag+'&amp;loop=1"></iframe>');
			break;
		case 'stop':
		default:
			$("#myElement").html('');
			break;
	}
}

//scrollPlugin(X,Y)
$(window).load(function() {
	$(".scroll_bar_horizontal").each(function () {
		var scroll_bar = $(this);
		var amount = Math.max.apply(Math, $("li", scroll_bar).map(function () {
			return $(this).outerWidth(true);
		}).get());
		$(scroll_bar).mCustomScrollbar({
			axis: "x",
			theme: "inset",
			mouseWheel:{scrollAmount: amount}
		});
	});
	$(".scroll_bar").each(function () {
		var scroll_bar = $(this);
		$(this).find($(".content", scroll_bar)).mCustomScrollbar({
			setWidth: false,
			setHeight: false,
			axis: "y"
		});
	});
});