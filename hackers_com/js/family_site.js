$(document).ready(function(){
	$(".family_list li strong a").click(function(){
		var li = $(this).parent().parent();
		
		if(li.hasClass("active") == 1){
			li.find(".family_site_sub").slideUp();
			li.removeClass("active");
		}else{
			$(".family_list > li").find(".family_site_sub").slideUp();
			$(".family_list > li").removeClass("active");

			li.addClass("active");
			li.find(".family_site_sub").slideDown();
		}
	});

	/*$(".family_list").mouseleave(function(){
		$(".family_list li").each(function(){
			var li = $(this);
			if(li.hasClass("on") == 1 && li.hasClass("active") == 0){
				$(".family_list > li").find(".family_site_sub").slideUp();
				$(".family_list > li").removeClass("active");
				li.addClass("active");
				li.find(".family_site_sub").slideDown();
			}
		});
	});*/
	
	$(".family_site_box .family_site_close_btn").click(function(){

		$(".header_wrap").animate({
			"padding-left":"40"
		},700,function(){
			$(".header_wrap").addClass("close");
			$(".family_site_box").animate({
				"margin-left":"-118"
			},700,function(){
				$(".family_site_box").addClass("close");
				//$(window).trigger('resize');

				//if($(".ev_roll").length=='2') {
					//$(".ev_roll_br1").data('plugin_slidesjs').update();
					//$(".ev_roll_br2").data('plugin_slidesjs').update();
					//$(".ev_roll_br3").data('plugin_slidesjs').update();
				//}
			});
			//_setCookie2('lnb_close_chk',1,1);
		});//header_wrap_slide
	});

	$(".family_site_open_btn").click(function(){
		$(".family_site_box").removeClass("close");
		//$(".header_wrap").removeClass("close");
		$(".header_wrap").animate({
			"padding-left":"160"
		},700,function(){
			$(".header_wrap").removeClass("close");

			//if($(".ev_roll").length=='2') {
				//$(".ev_roll_br1").data('plugin_slidesjs').update();
				//$(".ev_roll_br2").data('plugin_slidesjs').update();
				//$(".ev_roll_br3").data('plugin_slidesjs').update();
			//}
		}); //header_wrap_slide

		$(".family_site_box").animate({
			"margin-left":"0"
		},700,function(){
			
		});
		//_setCookie2('lnb_close_chk',0,1);
	});

	/*if(getCookie('lnb_close_chk')=='1'){
		//$(".header_wrap").addClass("close");
		$(".header_wrap").animate({
			"padding-left":"40"
		},700,function(){
			$(".header_wrap").addClass("close");
		});//header_wrap_slide

		$(".family_site_box").animate({
			"margin-left":"-118"
		},700,function(){
			$(".family_site_box").addClass("close");
			//$(window).trigger('resize');
			if($(".ev_roll").length=='2') $(".ev_roll").data('plugin_slidesjs').update();
			else if($(".ev_roll").length=='2') $(".ev_roll").data('plugin_slidesjs').update();
			
		});
	}*/
});