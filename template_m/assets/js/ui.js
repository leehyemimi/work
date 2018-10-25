var UI = (function () {
	return {
		element: {
			header: '#header',
			layer: {
				name: '.pop-layer',
				wrap: '.pop-wrap',
				btn: '.btn-close'
			},
			faq: {
				wrap: '.js-faq-wrap',
				list: 'li',
				question: 'dt a',
				answer: 'dd',
				onClass: 'on'
			},
			faqTable: {
				wrap: '.js-faq-table',
				title: '.js-btn-table a',
				cont: '.js-cont-table',
				onClass: 'on'
			},
			stiky: {
				pageWrap: '#wrap',
				selector: '.js-sticky-navi',
				fixedClass: 'js-fixed-top',
				link: '.js-move-navi li a'

			},
			quick: {
				wrap: '.quick-menu',
				btn_top: '.btn-quick-top',
				btn_down: '.btn-quick-down',
				btn_quick_lock: '.btn-quick-lock'
			},
			tabType: {
				target: '.js_tab_type li a'
			},
			toggleEvtClick: {
				target: '.js_toggle_click'
			},
			toggleEvtHover: {
				target: '.js_toggle_hover'
			},
			familySite: {
				wrap: '.family-site-wrap',
				wrapClose: '.family-site-wrap.close',
				menu: '.family-site-menu'
			}
		},
		init: function () {
			this.eventInit();
		},
		eventInit: function () {
			var lElement = this.element;
			$(lElement.faq.wrap).find(lElement.faq.question).click(function (e) {
				e.preventDefault();
				var lSelList = $(this).closest(lElement.faq.list);
				if (lSelList.find(lElement.faq.answer).is(':animated')) {
					return false;
				}

				var lOnClass = lElement.faq.onClass;
				var lState = lSelList.hasClass(lOnClass);
				if (lState) {
					lSelList.removeClass(lOnClass);
					lSelList.find(lElement.faq.answer).slideUp();
				} else {
					lSelList.siblings().find(lElement.faq.answer).slideUp();  //�ٸ��κдݱ�
					lSelList.siblings().removeClass('on');
					lSelList.addClass(lOnClass);
					lSelList.find(lElement.faq.answer).slideDown();
				}
			});


			if ($(lElement.stiky.selector).length !== 0) {
				var lStikyPos = $(lElement.stiky.selector).offset().top;
				$(window).scroll(function () {
					var lNowPos = $(this).scrollTop();
					var lPageWrap = $(lElement.stiky.pageWrap);
					if (lNowPos >= lStikyPos) {
						lPageWrap.addClass(lElement.stiky.fixedClass);
					} else {
						lPageWrap.removeClass(lElement.stiky.fixedClass);
					}
				});

				$(lElement.stiky.selector).find(lElement.stiky.link).click(function (e) {
					e.preventDefault();
					var lMoveObj = $(this).attr("href");
					var lMovePos = $(lMoveObj).offset().top - $(lElement.stiky.selector).outerHeight();
					$('html,body').animate({scrollTop: lMovePos}, 'fast');

					$(lElement.stiky.link).parent().siblings('li').removeClass('on');
					$(this).closest('li').addClass('on');
				});
			}

			this.quickMenu();
			this.tabType();
			this.toggleEvtClick();
			this.toggleEvtHover();
			this.faqTable();
			this.familySite();
		},
		faqTable: function () {
			var lFaq = this.element.faqTable;
			$(lFaq.wrap).find(lFaq.title).click(function (e) {
				e.preventDefault();
				var lFaqWrap = $(this).closest(lFaq.wrap);
				var lSelCont = $(this).closest('tr').next();
				var lOnClass = lFaq.onClass;
				var lState = lSelCont.hasClass(lOnClass);
				if (lState) {
					lSelCont.removeClass(lOnClass);
				} else {
					lFaqWrap.find(lFaq.cont).removeClass('on');
					lSelCont.addClass(lOnClass);
				}
			});
		},
		layerPopUp: function (pOption) {
			/*   pOption
			*  {
			*  	 state : 'open'  OR  'close'
			*  	 selId : Layer Selector
			*  }
			*/
			var lLayer = $(pOption.selId);
			var lLayerBox = $(pOption.selId).find(this.element.layer.wrap);
			var lThiz = this;

			if (pOption.st !== 'close') {
				lLayer.fadeIn();
				lLayerBox.css('margin-left', '-' + lLayerBox.outerWidth() / 2 + 'px');
				if (lLayerBox.outerHeight() < $(document).height()) {
					lLayerBox.css('margin-top', '-' + lLayerBox.outerHeight() / 2 + 'px');
				} else {
					lLayerBox.css('top', '0');
				}
			} else {
				lLayer.fadeOut();
			}

			lLayerBox.find(lThiz.element.layer.btn).click(function (e) {
				e.preventDefault();
				$(this).closest(lThiz.element.layer.name).fadeOut();
			})

		},
		quickMenu: function () {
			var lElement = this.element;
			var lHeight = $(lElement.header).height();
			var lQuick = $(lElement.quick.wrap);
			var $top_h = $('#header').height() + $('.main-slide-wrap').height();
			var $padding_h = 14;

			if ($('body').hasClass('main')) {
				lHeight = $('.main-slide-wrap').offset().top + $('.main-slide-wrap').outerHeight() + 10;
			}

			$(window).scroll(function () {
				if ($(document).scrollTop() >= lHeight) {
					lQuick.addClass('fixed');
				} else {
					lQuick.removeClass('fixed');
				}
			});

			// top
			$(lElement.quick.btn_top).click(function () {
				$('html, body').animate({
					scrollTop: 0
				}, 'slow');
				return false;
			});

			// down
			$(lElement.quick.btn_down).click(function () {
				$('html, body').animate({
					scrollTop: $(document).height()
				}, 'slow');
				return false;
			});

			// lock
			lQuick.on('click', lElement.quick.btn_quick_lock, function (e) {
				e.preventDefault();
				$(this).find('i').toggleClass('quick-ico-lock');
				$(this).addClass('lock_on');

				function mainQuickcCheck($val) {
					lQuick.css({
						'position': 'absolute',
						'top': $val + 'px'
					});
				}

				if ($('body').hasClass('main')) {
					if ($(window).scrollTop() > $top_h) {
						mainQuickcCheck(580);
					} else {
						mainQuickcCheck(($top_h + $padding_h));
					}
				} else {
					mainQuickcCheck(261);
				}

			});

			lQuick.on('click', '.lock_on', function (e) {
				e.preventDefault();
				lQuick.removeAttr('style');
				$(this).removeClass('lock_on');
			});
		},
		tabType: function () {
			var lElement = this.element;
			$(lElement.tabType.target).on('click', function (e) {
				var targetId = $(this).attr("href");

				if ($(this).attr("target") !== "_blank") {
					e.preventDefault();
					$(this).parent('li').addClass('on').siblings().removeClass('on');
					$(targetId).addClass('on').siblings().removeClass('on');
				} else {
					return true;
				}
			});
		},
		toggleEvtClick: function () {
			var lElement = this.element;
			$(lElement.toggleEvtClick.target).on('click', function (e) {
				var targetId = $(this).data("id");
				e.preventDefault();
				$(this).toggleClass('on');
				$('#' + targetId).toggle();
			});
		},
		toggleEvtHover: function () {
			var lElement = this.element;
			$(lElement.toggleEvtHover.target).mouseover(function () {
				var targetId = $(this).data("id");
				var lthis = $(this);
				var targetContent = $('#' + targetId);

				lthis.addClass('on');
				targetContent.show();
				targetContent.mouseleave(function () {
					lthis.removeClass('on');
					$(this).hide();
				});
			});
			$(lElement.toggleEvtHover.target).on('click', function (e) {
				e.preventDefault();
			});
		},
		familySite: function () {
			var lElement = this.element;
			var wrap = $(lElement.familySite.wrap);
			var wrapClose = $(lElement.familySite.wrapClose);
			var menu = $(lElement.familySite.menu);
			var menuClose = $(lElement.familySite.wrap).find('.family-menu-close');
			var menuOpen = $(lElement.familySite.wrapClose).find('.family-menu-open');


			menu.find('dt').on('click', function (e) {
				e.preventDefault();
				if ($(this).parents('li').hasClass('on')) {
					$(this).next('dd').slideUp(200);
					$(this).parents('li').removeClass('on');
				} else {
					menu.find('li').removeClass('on');
					menu.find('dd').slideUp(200);
					$(this).next('dd').slideDown(200);
					$(this).parents('li').addClass('on');
				}
			});

			function menuOpenfunc() {
				setCookie('_ecpa_lnb_hide', 0, 1);
				$('#recentLecture').hide();
				$('.family-site-myInfo .js_toggle_hover').removeClass('on');
				wrap.stop().animate({left: 0}, 200);
				wrapClose.stop().animate({left: '-53px'}, 100);
			}

			function menuClosefunc() {
				setCookie('_ecpa_lnb_hide', 1, 1);
				$('#recentLecture').hide();
				$('.family-site-myInfo .js_toggle_hover').removeClass('on');
				wrap.stop().animate({left: '-142px'}, 200);
				wrapClose.stop().animate({left: 0}, 200);
			}


			menuClose.on('click', function (e) {
				menuClosefunc();
			});

			menuOpen.on('click', function (e) {
				menuOpenfunc();
			});

			/* 스크롤로 인한 패밀리사이트 닫기기능 제거
			var scrollAction = true;
			function scrollEvent() {
				$(window).scroll(function () {
					if (scrollAction) {
						var lNowPos = $(this).scrollTop();
						if (lNowPos > $(window).height() * 0.5) {
							menuClosefunc();
							scrollAction = false;
						}
					}
				});
			}
			scrollEvent();
			*/
		}
	}
})();


$(document).ready(function () {
	UI.init();
});