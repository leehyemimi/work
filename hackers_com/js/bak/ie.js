//setup an interval so we can throttle the `scroll` event handler since there will be tons of `scroll` events fired

var timer = setInterval(function () {
	scrollOK = true;
}, 50);//run this every tenth of a second

var scrollOK = true;//setup flag to check if it's OK to run the event handler
var scrollFinish = 0;
var requsetSet = true; 
var i = 1;
var h = $(window).height;

function scroll(event) {//check if it's OK to run code
	if (scrollOK) {//set flag so the interval has to reset it to run this event handler again
		scrollOK = false;// 현재  스크롤 높이가 이전의 높이보다 클 경우 = 스크롤을 내린 상태.
		
		
		if($(this).scrollTop() > scrollFinish) {//now load more list-items because the user is within 100px of the bottom of the page
			if(requsetSet) {

				console.log(i);
				
				event.preventDefault();
				$('html,body').stop.animate({scrollTop:h * i}, 500,function(){

				});
				
			// 스크롤 내렸을 때에 대한 처리 코드 구현하면 된다. hidden 처리를 하던가 animate 를 사용해 없어지게 한다던가
			}// 현재  스크롤 높이가 이전의 높이보다 낮을 경우 = 스크롤을 올린 상태.
			

		} else if($(this).scrollTop() < scrollFinish) {
			//i--;

			if(requsetSet) {
			//event.preventDefault();
			//$('html,body').animate({scrollTop:$('#slide-' + i ).offset().top}, 500);
			// 스크롤 올렸을 때에 대한 처리 코드 구현하면 된다. hidden 처리를 하던가 animate 를 사용해 없어지게 한다던가
			
			}
		}

		// 현재 스크롤 높이를 이전 높이의 값을 가지는 scrollFinish 변수에 저장.
		scrollFinish = $(this).scrollTop();
	}
}

$(document).ready(function() {
	$(window).bind('scroll', scroll);
});
