//jQuery(document).ready( function($) {
//	$(window).load(function(){
		/* 
		get snap amount programmatically or just set it directly (e.g. "273") 
		in this example, the snap amount is list item's (li) outer-width (width+margins)
		*/
			
		//스크롤셋팅
		$(".scroll_bar_horizontal").each(function(){
			var scroll_bar = $(this) ;
			var amount=Math.max.apply(Math,$("li",scroll_bar).map(function(){return $(this).outerWidth(true);}).get());			

		
			$(scroll_bar).mCustomScrollbar({
				axis:"x",
				theme:"inset",
				advanced:{
					autoExpandHorizontalScroll:true
				},
				scrollButtons:{
					enable:true,
					scrollType:"stepped"
				},
				keyboard:{scrollType:"stepped"},
				snapAmount:amount,
				mouseWheel:{scrollAmount:amount}
			});
		});

		$(".scroll_bar").each(function(){
			var scroll_bar = $(this) ;
			/* all available option parameters with their default values */
			$(".content",scroll_bar).mCustomScrollbar({
				setWidth:false,
				setHeight:false,
				setTop:0,
				setLeft:0,
				axis:"y",
				scrollbarPosition:"inside",
				scrollInertia:950,
				autoDraggerLength:true,
				autoHideScrollbar:false,
				autoExpandScrollbar:false,
				alwaysShowScrollbar:0,
				snapAmount:null,
				snapOffset:0,
				mouseWheel:{
					enable:true,
					scrollAmount:"auto",
					axis:"y",
					preventDefault:false,
					deltaFactor:"auto",
					normalizeDelta:false,
					invert:false,
					disableOver:["select","option","keygen","datalist","textarea"]
				},
				scrollButtons:{
					enable:false,
					scrollType:"stepless",
					scrollAmount:"auto"
				},
				keyboard:{
					enable:true,
					scrollType:"stepless",
					scrollAmount:"auto"
				},
				contentTouchScroll:25,
				advanced:{
					autoExpandHorizontalScroll:false,
					autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
					updateOnContentResize:true,
					updateOnImageLoad:true,
					updateOnSelectorChange:false,
					releaseDraggableSelectors:false
				},
				theme:"light",
				callbacks:{
					onInit:false,
					onScrollStart:false,
					onScroll:false,
					onTotalScroll:false,
					onTotalScrollBack:false,
					whileScrolling:false,
					onTotalScrollOffset:0,
					onTotalScrollBackOffset:0,
					alwaysTriggerOffsets:true,
					onOverflowY:false,
					onOverflowX:false,
					onOverflowYNone:false,
					onOverflowXNone:false
				},
				live:false,
				liveSelector:null
			});
		});

		//롤링
		$(".ev_roll").slidesjs({
			//start: 1, // 슬라이드 1번째 부터 여러개 쓸때는 삭제
			//height: 440,
			play: {
				active: false,
				effect: "slide",
				interval: 5000,
				auto: false, //자동
				swap: true,
				pauseOnHover: false,
				restartDelay: 1
			},
			effect: {
				slide: {
					speed: 500
				},
				fade: {
					speed: 1000,
					crossfade: true
				}
			},
			navigation: { // 화살표
				active: true,
				effect: "slide"
			},
			pagination: { // 페이징
				active: false,
				effect: "slide"
			}
		});

		$(".ev_roll1").slidesjs({
			//start: 1, // 슬라이드 1번째 부터 여러개 쓸때는 삭제
			//height: 440,
			play: {
				active: false,
				effect: "slide",
				interval: 5000,
				auto: false, //자동
				swap: true,
				pauseOnHover: false,
				restartDelay: 1
			},
			effect: {
				slide: {
					speed: 500
				},
				fade: {
					speed: 1000,
					crossfade: true
				}
			},
			navigation: { // 화살표
				active: true,
				effect: "slide"
			},
			pagination: { // 페이징
				active: true,
				effect: "slide"
			},
			callback: {
				loaded: function() {

				},
				start: function() {

				},
				complete: function() {
					
				}
			}
		});

		//사업영역 레이어

		var list = $(".business_layer_txt h4");
		list.each(function(){
			var list_txt = $(this).text();
			$(".select_list").append("<li><a href='#;'>"+list_txt+"</a></li>");
		});

		$(".select_tit").click(function(){
			$(".select_list").toggle();
		});

		$(".select_list li a").click(function(){
			var nm = $(".select_list li").index($(this).parent())  + 1;
			business_layer(nm);
			$(".select_list").hide();
		});

		$(".business_area li a").click(function(){
			var nm = $(".business_area li").index($(this).parent()) + 1;
			
			business_layer(nm);
			
			$(".business_area li").removeClass("on");
			$(this).parent().addClass("on");

			if($(".wrap").hasClass("active") == 0){
				$(".wrap").animate({
					 left: "-=900"
				},500,function(){
					$(".wrap").addClass("active");
					$(".business_layer").show();
				});
			}
		});

		$(".business_layer_close").click(function(){
			layer_close();
		});
		$("#slide-3").click(function(){
			if($(".wrap").hasClass("active") == 1){
				layer_close();
			}
		});

		function layer_close(){
			$(".wrap").animate({
				 left: "0"
			},500,function(){
				$(".wrap").removeClass("active");
				$(".business_layer").hide();
			});
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

		//패밀리 사이트
		$(".famliy_site_btn").click(function(){
			if($(".footer").hasClass("on") == 0){
				$(".footer").animate({
					 bottom: "0"
				},500,function(){
					$(".footer").addClass("on");
				});
			}else{
				$(".footer").animate({
					 bottom: "-227"
				},500,function(){
					$(".footer").removeClass("on");
				});
			}
		});

		//장학제도
		$(".scholarship_btn").click(function(){
			if($(this).hasClass("active") == 0){
				$(".scholarship_arae").animate({
					 marginTop: "-547px"
				},500,function(){
					$(".scholarship_btn").addClass("active");
				})
			}else{
				$(".scholarship_arae").animate({
					 marginTop: "0"
				},500,function(){
					$(".scholarship_btn").removeClass("active");
				})
			}
			return false;
		});
		
		$(".js-slide").each(function(){
			var $ul = $("> ul ",this);
			var $li = $("> ul > li",this);
			var $width = $li.width();
			$(">ul",this).width($li.length * $width);
			
			if($li.size() > 4){
				//이전버튼
				$(".js-slide-btn a").eq(0).click(function(){
					$li = $("ul > li");
					$width = $li.width();
					prev_show($ul,$width);
				});
				
				//다음버튼
				$(".js-slide-btn a").eq(1).click(function(){
					$li = $("ul > li");
					$width = $li.width();
					next_show($ul,$width);
				});
			}
		});
		function next_show($ul,$width){
			if($ul.is(':animated')){
				$("li:first",$ul).clone().appendTo($ul);
				$("li:first",$ul).remove();
			}
			$ul.css("margin-left", 0 );
			$ul.stop().animate({marginLeft: -$width},200,function(){
				$("li:first",$ul).clone().appendTo($ul);
				$("li:first",$ul).remove();
				$ul.css("margin-left", 0 );
			});
		}
		function prev_show($ul, $width){
			$("li:last",$ul).clone().prependTo($ul);
			$("li:last",$ul).remove();
			$ul.css("margin-left",-$width );
			$ul.stop().animate({marginLeft: 0},200);
		}

		$(".js-tab li a").click(function(){
			var nm = $(".js-tab li").index($(this).parent());
			$(this).parent().siblings().removeClass("on");
			$(this).parent().addClass("on");
			$(".js-tab-con").hide();
			$(".js-tab-con").eq(nm).fadeIn();
		});

		// dunkin : slide-2 mov button effect
		$('.mn02').click(function(){
			$('.mn01').removeClass('on');
			$('.mn02').addClass('on');
			$('.mn03').removeClass('on');
		});
		$('.mn01').click(function(){ 
			$('.mn01').addClass('on');
			$('.mn02').removeClass('on');
			$('.mn03').removeClass('on');
		});
		$('.mn03').click(function(){ 
			$('.mn01').removeClass('on');
			$('.mn02').removeClass('on');
			$('.mn03').addClass('on');
		});
//	});
//});