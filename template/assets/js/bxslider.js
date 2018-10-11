var __globalBxslider = {
	bxList:[],
	setup:function(idx, attr){

		if(attr.bxSlider) { // bxslider 이미 적용된 경우 return 처리
			return false;
		}

		// attr에 bxslider 적용
		var $sliderLi = $(".bxslider li", attr);

		var wd = $sliderLi.width();

		var isSingleImage = $sliderLi.length === 1;

		var _mode = $(attr).attr("data-mode"); // 슬라이드 효과 - horizontal,vertical,fade
		_mode = _mode ? _mode : 'horizontal';

		var _maxSlides = $(attr).attr("data-maxSlides"); // 최대 보여지는 갯수
		_maxSlides = _maxSlides && !isNaN(parseInt(_maxSlides)) ? parseInt(_maxSlides) : 1;

		var _minSlides = $(attr).attr("data-minSlides"); // 최소 보여지는 갯수
		_minSlides = _minSlides && !isNaN(parseInt(_minSlides)) ? parseInt(_minSlides) : 1;

		var _slideMargin = $(attr).attr("data-slideMargin"); // 슬라이드 사이 margin 값
		_slideMargin = _slideMargin && !isNaN(parseInt(_slideMargin)) ? parseInt(_slideMargin) : 0;

		var _delay = $(attr).attr("data-delay"); // 슬라이드 딜레이 설정
		_delay = _delay && !isNaN(parseInt(_delay)) ? parseInt(_delay) : 4000;

		var _speed = $(attr).attr("data-speed"); // 슬라이드 속도 설정
		_speed = _speed && !isNaN(parseInt(_speed)) ? parseInt(_speed) : 400;

		var _autoBtn = $(attr).attr("data-autoBtn"); // play / stop / puase
		_autoBtn = _autoBtn && _autoBtn=='true' ? true : false;

		var _auto  = $(attr).attr("data-auto"); // 자동슬라이드 여부
		_auto = _auto && _auto=='true' ? true : false;

		var _pager = $(attr).attr("data-pager");  // 페이지 동그란 버튼 설정 여부
		_pager = ( _pager && _pager=='true' && !isSingleImage ) ? true : false;

		var _pagerCustom = '.'+$(attr).attr("data-pagerCustom");  // 페이지 외부로 빠지게할때

		var _controls = $(attr).attr("data-controls"); //자동 슬라이드 컨트롤 버튼 설정 여부
		_controls = _controls && _controls=='true' ? true : false;

		var _moves = $(attr).attr("data-moves"); //한장씩 슬라이드
		_moves = _moves && !isNaN(parseInt(_moves)) ? parseInt(_moves) : 1;

		var _touch = $(attr).attr("data-touch"); //마우스 터치 슬라이드 사용여부
		_touch = _touch && _touch=='true' ? true : false;

		var _loop = $(attr).attr("data-loop"); //마우스 터치 슬라이드 사용여부
		_loop = _loop && _loop=='false' ? false : true;

		var _ticker = $(attr).attr("data-ticker"); //흐르는 슬라이드

		var _tickerHover = false;
		var _useCSS = true;
		if(_ticker=='true'){
			_ticker=true;
			_tickerHover = true;
			_useCSS=false;
		}else{
			_ticker=false;
			_tickerHover = false;
			_useCSS=true;
		}

		var bgCacheCheck = false,
			bgAvailable = false,
			bgColors = [],
			bgTarget;

		__globalBxslider.bxList[__globalBxslider.bxList.length] = attr.bxSlider = $('.bxslider',attr).bxSlider({
			slideWidth: wd
			,slideMargin: _slideMargin
			,minSlides: _minSlides // 최소 보여지는 갯수
			,maxSlides: _maxSlides // 최대 보여지는 갯수
			,speed: _speed
			,pause: _delay
			,moveSlides:_moves
			,mode: _mode // 슬라이드 효과 - horizontal,vertical,fade
			,autoControls: _autoBtn // play / stop / puase
			,auto: _auto // _auto // 자동슬라이드 여부
			,pager: _pager
			,pagerCustom: (_pagerCustom == '.undefined') ? '': _pagerCustom
			,controls: _controls
			,ticker: _ticker
			,tickerHover: _tickerHover
			,touchEnabled: _touch
			,infiniteLoop: _loop
			,useCSS: _useCSS//tickerHover가 ie에서 작동안함 useCss false이면 작동됨
			,onSliderLoad:function(el){
				//ⓓ bxslider onSliderLoad 이벤트 수정
				// LazyLoad 옵션이 켜져있을 경우 슬라이드 내부의 이미지는 data-original로 실제 로드하지 않으며
				// 슬라이드 로드와 슬라이드 이동 직전에 자신과 다음의 이미지를 로드한다
				__globalBxslider.renderLazyImage(this);

				// 슬라이드 로드 후 자동정지 자동시작 이벤트 부여
				/* controls , pager click 했을떄 auto 멈추는 현상 개선 */
				if(!_autoBtn){
					if( _auto && !isSingleImage ){
						$(attr).on('mouseover',function(){

							this.bxSlider.stopAuto()
						});
						$(attr).on('mouseout',function(){
							this.bxSlider.startAuto()
						});
					}
				}
			}
			,onSliderResize:function(){} // ...
			,onSlideBefore:function(el, current, next){//ⓓ bxslider onSliderBefore 이벤트 수정
				var imageLoad = __globalBxslider.renderLazyImage(this, current, next);
				if (!imageLoad) {
					return false;
				}

				// 백그라운드 세팅
				if( !bgCacheCheck ) {
					bgCacheCheck = true;

					var $bxsliderDefault = $(el).closest('.bxslider-default');
					if( !$bxsliderDefault.hasClass('bxslider-bgcolor') ) {
						bgAvailable = false;
						return;
					}
					$sliderLi.each(function() {
						var color = $(this).css('backgroundColor');
						bgColors.push(color);
						if( !bgAvailable && color != 'rgba(0, 0, 0, 0)' && color != 'rgb(0, 0, 0)' ) {
							bgAvailable = true;
						}
					});
					bgTarget = $(el).closest('.bxslider-default').parent().parent();
				}

				if( bgAvailable && bgTarget) {
					this.speed = 0;
					bgTarget.css({
						'backgroundColor': bgColors[next]
					});
				}
			}
			,onSlideNext: function(el) {
				if(el.context.className.indexOf("slide-type1") > 0){
					$('.bxslider li').removeClass('on');
					el.next('li').addClass('on');
				}
			}
			,onSlidePrev: function(el) {
				if(el.context.className.indexOf("slide-type1") > 0){
					$('.bxslider li').removeClass('on');
					el.next('li').addClass('on');
				}
			}
			//infiniteLoop: false
		});
		return true; // 슬라이드가 정상적으로 초기화
	},
	startAuto:function() {
		this.bxSlider.startAuto();
	},
	stopAuto:function() {
		this.bxSlider.stopAuto();
	},
	resize:function(){
		for(var i in this.bxList){
			if( $.isNumeric(i) === false )
				continue;
			try {
				this.bxList[i].redrawSlider();
			}
			catch(e) {
				console.warn('Should Remove Legacy Code in bxslider.js');
				continue;
			}
		}
	},
	init:function(selector){ // ⓒ _globalBxslider.init 함수 변경
		var _this = this;
		$(selector).each(function (idx, slider) {
			var sliderObj = $(slider);

			// 브라우저/모바일 viewport 계산 문제로 visible 조건 제거
			// if (sliderObj.hasClass('loaded') || !sliderObj.visible(true)) {
			if (sliderObj.hasClass('loaded')) {
				return true;
			}

			var lazyImage = sliderObj.find('.slider-lazy-image');
			if (lazyImage.length > 0) {
				var img = lazyImage.eq(0);
				_this.renderImage(img);
				// IE7,8은 캐싱된 이미지를 로드할경우 load 이벤트가 발생하지 않음
				// 이미지의 state를 체크후 완료상태라면 이벤트를 건너뛰고 초기화 실행
				if (img.get(0).readyState && img.get(0).readyState == 'complete') {
					__globalBxslider.setup(idx, slider);
				} else {
					img.one('load', function () {
						var imgObj = this;
						if (this.readyState) { // IE7,8 초기화
							var loadInterval = setInterval(function () {
								if (imgObj.readyState == 'complete') {
									__globalBxslider.setup(idx, slider);
									clearInterval(loadInterval);
								}
							}, 250);
						} else { // 모던브라우저 초기화
							__globalBxslider.setup(idx, slider);
						}
					});
				}
			} else {
				__globalBxslider.setup(idx, slider);
			}
			sliderObj.css("overflow","visible").addClass('loaded');
		});
	},
	reloadSlider: function($el) {
		var _this = this;
		$el.each(function(i, $this) {
			var idx = parseInt($('.bxslider-default').index($this));
			_this.bxList[idx].reloadSlider();
		});
	},
	renderImage: function (obj) {
		var img = $(obj);
		if (!img.hasClass('slider-lazy-image')) {
			return false;
		}
		var imgUrl = img.attr('data-original');
		img.attr('src', imgUrl).removeClass('slider-lazy-image');
		return true;

	},
	renderLazyImage: function (slideObj, current, next) { // ⓔ__globalBxslider.renderLazyImage 함수 추가

		var _this = this;
		var context = $(slideObj.context);
		var slidePerMove = context.attr('data-moves') || 1;
		var visibleSlideCount = context.attr('data-maxslides') || 1;

		var preRenderRange =  visibleSlideCount;
		var slideCount = slideObj.getSlideCount();
		var currentSlideIdx = slideObj.getCurrentSlide();

		// 보여질 다음 슬라이드의 이미지 렌더링
		for (var i = 0; i < preRenderRange; i++) {
			var slideIdx = currentSlideIdx + i;
			if (slideIdx + 1 > slideCount) {
				slideIdx = slideIdx - slideCount;
			}
			var nextElem = slideObj.getSlideElement(slideIdx);
			nextElem.find('.slider-lazy-image').each(function () {
				_this.renderImage(this);
			});
		}

		if (current === undefined || next === undefined) return;

		// 슬라이드 효과가 이동일 경우 생성되는 bx-clone 영역의 이미지 렌더링
		context.find('.bx-clone').each(function () {
			$(this).find('.slider-lazy-image').each(function () {
				_this.renderImage(this);
			});
		});

		var imgLoad = true;
		for (var i = current; i < ((next + 1) * slidePerMove); i++) {
			var sliderElem = $(slideObj.getSlideElement(i));
			sliderElem.find('img').each(function () {
				_this.renderImage(this);
				// 이미지가 로드되지 않았고 IE7,8 환경이 아닐때만 이미지 로드 대기 처리
				if (!this.complete && !this.readyState) {
					$(this).one('load', function () {
						if (this.complete) {
							slideObj.goToSlide(next);
						}
					});
					imgLoad = false;
				}
			});
		}
		return imgLoad;
	}
};

// BXSLIDER-DEFAULT 초기화 예외조건
// 다음 클래스가 존재한다면 초기화하지 않는다
var exceptElements = [
	'.loaded',
	'.top_open_box',
	'.ly_movie_bx'
];
var sliderObserver = null;
$(function() {

	/* ie8,ie7 대응 forEach 기능 추가 */
	if (!('forEach' in Array.prototype)) {
		Array.prototype.forEach= function(action, that /*opt*/) {
			for (var i= 0, n= this.length; i<n; i++)
				if (i in this)
					action.call(that, this[i], i, this);
		};
	}

	// ⓑ document load가 아닌 window 로드 이후 슬라이드 작동시작
	// IntersectionObserver 클래스 지원여부 확인
	if (typeof IntersectionObserver !== 'undefined') {
		$(window).on('load', function () {
			sliderObserver = new IntersectionObserver(function (entries) {
				for (var i in entries) {
					var entry = entries[i];
					if (entry.isIntersecting) {
						var slideObj = $(entry.target).get(0);
						__globalBxslider.init(slideObj);
					}
				}
			}, { root : null });
			$('.bxslider-default').not(exceptElements.join(',')).each(function () {
				sliderObserver.observe(this);
			});
		});
	} else {
		$(window).on('load scroll', function () {
			__globalBxslider.init($('.bxslider-default').not(exceptElements.join(',')));
		});
	}

	$(window).on('load', function () {
		/* tab 내부에 bxslider가 있을때 사용 */
		$('[class*="js-tab"] a[href*="#"]').on('click', function(){__globalBxslider.resize()});
		$('[class*="js-tab-type1"] a[href*="#"]').on('click', function(){__globalBxslider.resize()});
		$('[class*="js-tab-type2"] a[href*="#"]').on('click', function(){__globalBxslider.resize()});
		$('[class*="js-tab-type3"] a[href*="#"]').on('click', function(){__globalBxslider.resize()});
	});
	// ⓑ document load가 아닌 window 로드 이후 슬라이드 작동 끝

	$(window).trigger('old-tab')

});


// ⓐ $.fn.visible Jquery 사용자 함수 추가시작
(function($){

	/**
	 * JQUERY 객체 화면노출여부 검사
	 */
	var $w=$(window);
	$.fn.visible = function(partial,hidden,direction,container){

		// IE7/8은 정상적으로 계산이 불가하므로 항상 보이는 상태로 처리
		var userAgent = navigator.userAgent;
		if (userAgent.indexOf('MSIE 7') > 0 || userAgent.indexOf('MSIE 8') > 0) {
			return true;
		}

		if (this.length < 1) return false;

		var result = true;
		if (typeof IntersectionObserver !== 'undefined') { // Class base viewport체크는 이전과정에서 체크
			return true;
		} else {    // Window Base
			// Set direction default to 'both'.
			direction = direction || 'both';

			var $t          = this.length > 1 ? this.eq(0) : this,
				isContained = typeof container !== 'undefined' && container !== null,
				$c	  = isContained ? $(container) : $w,
				wPosition        = isContained ? $c.position() : 0,
				t          = $t.get(0),
				vpWidth    = $c.outerWidth(),
				vpHeight    = $c.outerHeight(),
				clientSize  = hidden === true ? t.offsetWidth * t.offsetHeight : true;

			if (typeof t.getBoundingClientRect === 'function'){

				// Use this native browser method, if available.
				var rec = t.getBoundingClientRect(),
					tViz = isContained ?
						rec.top - wPosition.top >= 0 && rec.top < vpHeight + wPosition.top :
						rec.top >= 0 && rec.top < vpHeight,
					bViz = isContained ?
						rec.bottom - wPosition.top > 0 && rec.bottom <= vpHeight + wPosition.top :
						rec.bottom > 0 && rec.bottom <= vpHeight,
					lViz = isContained ?
						rec.left - wPosition.left >= 0 && rec.left < vpWidth + wPosition.left :
						rec.left >= 0 && rec.left <  vpWidth,
					rViz = isContained ?
						rec.right - wPosition.left > 0  && rec.right < vpWidth + wPosition.left  :
						rec.right > 0 && rec.right <= vpWidth,
					vVisible  = partial ? tViz || bViz : tViz && bViz,
					hVisible  = partial ? lViz || rViz : lViz && rViz,
					vVisible = (rec.top < 0 && rec.bottom > vpHeight) ? true : vVisible,
					hVisible = (rec.left < 0 && rec.right > vpWidth) ? true : hVisible;

				if(direction === 'both')
					result = clientSize && vVisible && hVisible;
				else if(direction === 'vertical')
					result = clientSize && vVisible;
				else if(direction === 'horizontal')
					result = clientSize && hVisible;
			} else {
				var viewTop = isContained ? 0 : wPosition,
					viewBottom      = viewTop + vpHeight,
					viewLeft        = $c.scrollLeft(),
					viewRight      = viewLeft + vpWidth,
					position          = $t.position(),
					_top            = position.top,
					_bottom        = _top + $t.height(),
					_left          = position.left,
					_right          = _left + $t.width(),
					compareTop      = partial === true ? _bottom : _top,
					compareBottom  = partial === true ? _top : _bottom,
					compareLeft    = partial === true ? _right : _left,
					compareRight    = partial === true ? _left : _right;

				if(direction === 'both')
					result = !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop)) && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
				else if(direction === 'vertical')
					result = !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
				else if(direction === 'horizontal')
					result = !!clientSize && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
			}
			return result;
		}

	};

})(jQuery);
// ⓐ $.fn.visible Jquery 사용자 함수 추가끝