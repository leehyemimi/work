$(document).ready(function(){
	var url = window.location.pathname;
	url = url.split("/");
	url = url[url.length - 1];
	url = url.split("-");
	if(url.length === 0){
		$(".nav li a").each(function(){
			if(url == $(this).attr("href")){
				$(this).parent("li").siblings().removeClass("on");
				$(this).parent("li").addClass("on");
			}
		});
	}else{
		url = url[0];
		$(".nav li a").each(function(){
			if(url == $(this).attr("href")){
				$(this).parent("li").siblings().removeClass("on");
				$(this).parent("li").addClass("on");
			}
		});
	}

});