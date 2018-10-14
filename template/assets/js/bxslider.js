var __globalBxslider = {
	bxList: [],
	_globalOption: {
		sliderLi: null,
		wd: null,
		isSingleImage: null,
		mode: null,
		maxSlides: null,
		minSlides: null,
		slideMargin: null,
		delay: null,
		speed: null,
		autoBtn: null,
		auto: null,
		pager: null,
		pagerCustom: null,
		controls: null,
		moves: null,
		touch: null,
		loop: null,
		ticker: null,
		useCSS: null,
		tickerHover: null
	},
	setup: function (idx, attr) {
		if (attr.bxSlider) { // bxslider 이미 적용된 경우 return 처리
			return false;
		}
		// attr에 bxslider 적용
		this._globalOption.sliderLi = $(".bxslider li", attr);
		this._globalOption.wd = this._globalOption.sliderLi.width();
		this._globalOption.isSingleImage = this._globalOption.sliderLi.length === 1;
		this._globalOption.mode = $(attr).attr("data-mode"); // 슬라이드 효과 - horizontal,vertical,fade
		this._globalOption.mode = this._globalOption.mode ? this._globalOption.mode : 'horizontal';
		this._globalOption.maxSlides = $(attr).attr("data-maxSlides"); // 최대 보여지는 갯수
		this._globalOption.maxSlides = this._globalOption.maxSlides && !isNaN(parseInt(this._globalOption.maxSlides)) ? parseInt(this._globalOption.maxSlides) : 1;
		this._globalOption.minSlides = $(attr).attr("data-minSlides"); // 최소 보여지는 갯수
		this._globalOption.minSlides = this._globalOption.minSlides && !isNaN(parseInt(this._globalOption.minSlides)) ? parseInt(this._globalOption.minSlides) : 1;
		this._globalOption.slideMargin = $(attr).attr("data-slideMargin"); // 슬라이드 사이 margin 값
		this._globalOption.slideMargin = this._globalOption.slideMargin && !isNaN(parseInt(this._globalOption.slideMargin)) ? parseInt(this._globalOption.slideMargin) : 0;
		this._globalOption.delay = $(attr).attr("data-delay"); // 슬라이드 딜레이 설정
		this._globalOption.delay = this._globalOption.delay && !isNaN(parseInt(this._globalOption.delay)) ? parseInt(this._globalOption.delay) : 4000;
		this._globalOption.speed = $(attr).attr("data-speed"); // 슬라이드 속도 설정
		this._globalOption.speed = this._globalOption.speed && !isNaN(parseInt(this._globalOption.speed)) ? parseInt(this._globalOption.speed) : 400;
		this._globalOption.autoBtn = $(attr).attr("data-autoBtn"); // play / stop / puase
		this._globalOption.autoBtn = this._globalOption.autoBtn && this._globalOption.autoBtn == 'true' ? true : false;
		this._globalOption.auto = $(attr).attr("data-auto"); // 자동슬라이드 여부
		this._globalOption.auto = this._globalOption.auto && this._globalOption.auto == 'true' ? true : false;
		this._globalOption.pager = $(attr).attr("data-pager");  // 페이지 동그란 버튼 설정 여부
		this._globalOption.pager = ( this._globalOption.pager && this._globalOption.pager == 'true' && !this._globalOption.isSingleImage ) ? true : false;
		this._globalOption.pagerCustom = '.' + $(attr).attr("data-pagerCustom");  // 페이지 외부로 빠지게할때
		this._globalOption.controls = $(attr).attr("data-controls"); //자동 슬라이드 컨트롤 버튼 설정 여부
		this._globalOption.controls = this._globalOption.controls && this._globalOption.controls == 'true' ? true : false;
		this._globalOption.moves = $(attr).attr("data-moves"); //한장씩 슬라이드
		this._globalOption.moves = this._globalOption.moves && !isNaN(parseInt(this._globalOption.moves)) ? parseInt(this._globalOption.moves) : 1;
		this._globalOption.touch = $(attr).attr("data-touch"); //마우스 터치 슬라이드 사용여부
		this._globalOption.touch = this._globalOption.touch && this._globalOption.touch == 'true' ? true : false;
		this._globalOption.loop = $(attr).attr("data-loop"); //마우스 터치 슬라이드 사용여부
		this._globalOption.loop = this._globalOption.loop && this._globalOption.loop == 'false' ? false : true;
		this._globalOption.ticker = $(attr).attr("data-ticker"); //흐르는 슬라이드
		this._globalOption.ticker = this._globalOption.ticker && this._globalOption.ticker == 'true' ? true : false;
		this._globalOption.useCSS = true;
		this._globalOption.tickerHover = $(attr).attr("data-tickerHover"); //흐르는 슬라이드 호버시
		if (this._globalOption.tickerHover === 'true') {
			this._globalOption.tickerHover = true;
			this._globalOption.useCSS = false;//IE대응
		} else {
			this._globalOption.tickerHover = false;
			this._globalOption.useCSS = true;
		}
		var bgCacheCheck = false,
			bgAvailable = false,
			bgColors = [],
			bgTarget;
		var bxThis = this;
		__globalBxslider.bxList[__globalBxslider.bxList.length] = attr.bxSlider = $('.bxslider', attr).bxSlider({
			slideWidth: bxThis._globalOption.wd
			, slideMargin: bxThis._globalOption.slideMargin
			, minSlides: bxThis._globalOption.minSlides // 최소 보여지는 갯수
			, maxSlides: bxThis._globalOption.maxSlides // 최대 보여지는 갯수
			, speed: bxThis._globalOption.speed
			, pause: bxThis._globalOption.delay
			, moveSlides: bxThis._globalOption.moves
			, mode: bxThis._globalOption.mode // 슬라이드 효과 - horizontal,vertical,fade
			, autoControls: bxThis._globalOption.autoBtn // play / stop / puase
			, auto: bxThis._globalOption.auto // _auto // 자동슬라이드 여부
			, pager: bxThis._globalOption.pager
			, pagerCustom: (bxThis._globalOption.pagerCustom == '.undefined') ? '' : bxThis._globalOption.pagerCustom
			, controls: bxThis._globalOption.controls
			, ticker: bxThis._globalOption.ticker
			, tickerHover: bxThis._globalOption.tickerHover
			, touchEnabled: bxThis._globalOption.touch
			, infiniteLoop: bxThis._globalOption.loop
			, useCSS: bxThis._globalOption.useCSS
			, onSliderLoad: function (el) {
				//ⓓ bxslider onSliderLoad 이벤트 수정
				// LazyLoad 옵션이 켜져있을 경우 슬라이드 내부의 이미지는 data-original로 실제 로드하지 않으며
				// 슬라이드 로드와 슬라이드 이동 직전에 자신과 다음의 이미지를 로드한다
				__globalBxslider.renderLazyImage(this);
				// 슬라이드 로드 후 자동정지 자동시작 이벤트 부여
				/* controls , pager click 했을떄 auto 멈추는 현상 개선 */
				if (!bxThis._globalOption.autoBtn) {
					if (bxThis._globalOption.auto && !bxThis._globalOption.isSingleImage) {
						$(attr).on('mouseover', function () {
							this.bxSlider.stopAuto()
						});
						$(attr).on('mouseout', function () {
							this.bxSlider.startAuto()
						});
					}
				}
			}
			, onSliderResize: function () {
			}
			, onSlideBefore: function (el, current, next) {//ⓓ bxslider onSliderBefore 이벤트 수정
				var lThis = this;
				var imageLoad = __globalBxslider.renderLazyImage(this, current, next);
				if (!imageLoad) {
					return false;
				}
				// 백그라운드 세팅
				if (!bgCacheCheck) {
					bgCacheCheck = true;
					var $bxsliderDefault = $(el).closest('.bxslider-default');
					if (!$bxsliderDefault.hasClass('bxslider-bgcolor')) {
						bgAvailable = false;
						return;
					}
					lThis._globalOption.sliderLi.each(function () {
						var color = $(this).css('backgroundColor');
						bgColors.push(color);
						if (!bgAvailable && color != 'rgba(0, 0, 0, 0)' && color != 'rgb(0, 0, 0)') {
							bgAvailable = true;
						}
					});
					bgTarget = $(el).closest('.bxslider-default').parent().parent();
				}
				if (bgAvailable && bgTarget) {
					this.speed = 0;
					bgTarget.css({
						'backgroundColor': bgColors[next]
					});
				}
			}
			, onSlideNext: function (el) {
				if (el.context.className.indexOf("slide-type1") > 0) {
					$('.bxslider li').removeClass('on');
					el.next('li').addClass('on');
				}
			}
			, onSlidePrev: function (el) {
				if (el.context.className.indexOf("slide-type1") > 0) {
					$('.bxslider li').removeClass('on');
					el.next('li').addClass('on');
				}
			}
			//infiniteLoop: false
		});
		return true; // 슬라이드가 정상적으로 초기화
	},
	startAuto: function () {
		this.bxSlider.startAuto();
	},
	stopAuto: function () {
		this.bxSlider.stopAuto();
	},
	resize: function () {
		for (var i in this.bxList) {
			if ($.isNumeric(i) === false)
				continue;
			try {
				this.bxList[i].redrawSlider();
			}
			catch (e) {
				console.warn('Should Remove Legacy Code in bxslider.js');
				continue;
			}
		}
	},
	init: function (selector) { // ⓒ _globalBxslider.init 함수 변경
		var lThis = this;
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
				lThis.renderImage(img);
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
			sliderObj.css("overflow", "visible").addClass('loaded');
		});
	},
	reloadSlider: function ($el) {
		var lThis = this;
		$el.each(function (i, $this) {
			var idx = parseInt($('.bxslider-default').index($this));
			lThis.bxList[idx].reloadSlider();
		});
		$('.bxslider-default').find('li').hover(
			function () {
				$(this).addClass('on').siblings('li').removeClass('on');
			}, function () {
				$(this).removeClass('on');
			}
		);
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
		var lThis = this;
		var context = $(slideObj.context);
		var slidePerMove = context.attr('data-moves') || 1;
		var visibleSlideCount = context.attr('data-maxslides') || 1;
		var preRenderRange = visibleSlideCount;
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
				lThis.renderImage(this);
			});
		}
		if (current === undefined || next === undefined) return;
		// 슬라이드 효과가 이동일 경우 생성되는 bx-clone 영역의 이미지 렌더링
		context.find('.bx-clone').each(function () {
			$(this).find('.slider-lazy-image').each(function () {
				lThis.renderImage(this);
			});
		});
		var imgLoad = true;
		for (var i = current; i < ((next + 1) * slidePerMove); i++) {
			var sliderElem = $(slideObj.getSlideElement(i));
			sliderElem.find('img').each(function () {
				lThis.renderImage(this);
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
$(function () {
	/* ie8,ie7 대응 forEach 기능 추가 */
	if (!('forEach' in Array.prototype)) {
		Array.prototype.forEach = function (action, that /*opt*/) {
			for (var i = 0, n = this.length; i < n; i++)
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
			}, {root: null});
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
		$('[class*="js-tab"] a[href*="#"]').on('click', function () {
			__globalBxslider.resize()
		});
		$('[class*="js-tab-type1"] a[href*="#"]').on('click', function () {
			__globalBxslider.resize()
		});
		$('[class*="js-tab-type2"] a[href*="#"]').on('click', function () {
			__globalBxslider.resize()
		});
		$('[class*="js-tab-type3"] a[href*="#"]').on('click', function () {
			__globalBxslider.resize()
		});
	});
	// ⓑ document load가 아닌 window 로드 이후 슬라이드 작동 끝
	$(window).trigger('old-tab')
});
// ⓐ $.fn.visible Jquery 사용자 함수 추가시작
(function ($) {
	/**
	 * JQUERY 객체 화면노출여부 검사
	 */
	var $w = $(window);
	$.fn.visible = function (partial, hidden, direction, container) {
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
			var $t = this.length > 1 ? this.eq(0) : this,
				isContained = typeof container !== 'undefined' && container !== null,
				$c = isContained ? $(container) : $w,
				wPosition = isContained ? $c.position() : 0,
				t = $t.get(0),
				vpWidth = $c.outerWidth(),
				vpHeight = $c.outerHeight(),
				clientSize = hidden === true ? t.offsetWidth * t.offsetHeight : true;
			if (typeof t.getBoundingClientRect === 'function') {
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
						rec.left >= 0 && rec.left < vpWidth,
					rViz = isContained ?
						rec.right - wPosition.left > 0 && rec.right < vpWidth + wPosition.left :
						rec.right > 0 && rec.right <= vpWidth,
					vVisible = partial ? tViz || bViz : tViz && bViz,
					hVisible = partial ? lViz || rViz : lViz && rViz,
					vVisible = (rec.top < 0 && rec.bottom > vpHeight) ? true : vVisible,
					hVisible = (rec.left < 0 && rec.right > vpWidth) ? true : hVisible;
				if (direction === 'both')
					result = clientSize && vVisible && hVisible;
				else if (direction === 'vertical')
					result = clientSize && vVisible;
				else if (direction === 'horizontal')
					result = clientSize && hVisible;
			} else {
				var viewTop = isContained ? 0 : wPosition,
					viewBottom = viewTop + vpHeight,
					viewLeft = $c.scrollLeft(),
					viewRight = viewLeft + vpWidth,
					position = $t.position(),
					_top = position.top,
					_bottom = _top + $t.height(),
					_left = position.left,
					_right = _left + $t.width(),
					compareTop = partial === true ? _bottom : _top,
					compareBottom = partial === true ? _top : _bottom,
					compareLeft = partial === true ? _right : _left,
					compareRight = partial === true ? _left : _right;
				if (direction === 'both')
					result = !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop)) && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
				else if (direction === 'vertical')
					result = !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
				else if (direction === 'horizontal')
					result = !!clientSize && ((compareRight <= viewRight) && (compareLeft >= viewLeft));
			}
			return result;
		}
	};
})(jQuery);
// ⓐ $.fn.visible Jquery 사용자 함수 추가끝
