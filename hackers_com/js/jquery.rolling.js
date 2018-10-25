/*
 * JQuery Rolling 
 * songsungkyun@naver.com
 * 2008/03/16
 */
(function($) {
	var rollingParam = {};
	
	$.fn.rolling = function(rollingDirection, rollingItemWidth, rollingItemHeight, viewingItemCount) {
		var rollingId = new Date().getTime();
		var id = this.attr("id");
		rollingParam[rollingId] = {
			id: id,
			rollingIsStarted: false,
			rollingItemCount:  0,
			rollingAnimationIndex: 0,
			rollingItemWidth: 0,
			rollingItemHeight: 0,
			viewingItemCount: 0,
			rollingTime: 0,
			viewingTime: 0,
			rollingAnimationFrame: 0,
			rollingDirection: null,
			rollingLeft: 0,
			rollingTop: 0,
			requestReverse: false,
			newRollingAnimationFrame: 0
		};
		
		var param = rollingParam[rollingId];
		param.rollingDirection = rollingDirection;
		param.rollingItemWidth = rollingItemWidth;
		param.rollingItemHeight = rollingItemHeight;
		
		if (viewingItemCount == undefined) {
			param.viewingItemCount = 1;
		} else {
			param.viewingItemCount = viewingItemCount;
		}
		
		if (param.rollingDirection == "left" || 
			param.rollingDirection == "right") {
			this.css("width", param.rollingItemWidth * param.viewingItemCount);
			this.css("height", param.rollingItemHeight);
		} else if (param.rollingDirection == "up" || 
			param.rollingDirection == "down") {
			this.css("width", param.rollingItemWidth);
			this.css("height", param.rollingItemHeight * param.viewingItemCount);
		}
		
		this.css("position", "relative");
		this.css("overflow", "hidden");
		this.attr("rollingId", rollingId);
		
		this.empty();	
		
		rollingContentDiv = $("<div/>").appendTo(this);
		rollingContentDiv.attr("id", rollingId);
		rollingContentDiv.css("position", "absolute");
		rollingContentDiv.attr("align", "left");
		rollingContentDiv.css("left", "0");
		rollingContentDiv.css("top", "0");
		return this;
	};
	
	$.fn.addRollingItem = function(html) {
		var param = rollingParam[this.attr("rollingId")];
		var rollingContentDiv = $("#" + this.attr("rollingId"));
		param.rollingItemCount++;		
		var rollingItem = null;
		
		if (param.rollingDirection == "up") {
			rollingItem = $("<div class='item'/>").appendTo(rollingContentDiv);			
		} else if (param.rollingDirection == "right") {
			rollingItem = $("<div class='item'/>").prependTo(rollingContentDiv);
			rollingItem.css("float", "left");
			rollingContentDiv.css("width", param.rollingItemCount * param.rollingItemWidth);			
			rollingContentDiv.css("left", -(param.rollingItemCount - param.viewingItemCount) * param.rollingItemWidth);
			param.rollingLeft =  -(param.rollingItemCount - param.viewingItemCount) * param.rollingItemWidth;
		} else if (param.rollingDirection == "down") {
			rollingItem = $("<div class='item'/>").prependTo(rollingContentDiv);
			param.rollingTop =  -(param.rollingItemCount - param.viewingItemCount) * param.rollingItemHeight;
			rollingContentDiv.css("top", -(param.rollingItemCount - param.viewingItemCount) * param.rollingItemHeight);
		} else if (param.rollingDirection == "left") {
			rollingItem = $("<div class='item'/>").appendTo(rollingContentDiv);
			rollingItem.css("float", "left");
			rollingContentDiv.css("width", param.rollingItemCount * param.rollingItemWidth);			
		}
		rollingItem.css("overflow", "hidden");
		rollingItem.css("width", param.rollingItemWidth);
		rollingItem.css("height", param.rollingItemHeight);
		rollingItem.html(html);
		return this;
	};
	
	rollingAnimation = function(id) {
		var param = rollingParam[id];
		var rollingContentDiv = $("#" + id);
		if (rollingContentDiv.size() == 0) {
			return;
		}
		var delayTime = param.rollingTime;
		
		if (param.rollingIsStarted == false) {
			setTimeout("rollingAnimation('" + id + "')", delayTime);
			return;
		}
				
		if (param.rollingAnimationIndex == 0) {
			if (param.newRollingAnimationFrame != param.rollingAnimationFrame) {
				param.rollingAnimationFrame = param.newRollingAnimationFrame;
			}
		}
			
		var isReverse = false;
		if (param.requestReverse == true) {
			isReverse = true;
			param.requestReverse = false;
			param.rollingAnimationIndex = param.rollingAnimationFrame - param.rollingAnimationIndex;
			
			if (param.rollingDirection == "left") {
				param.rollingDirection = "right";
			} else if (param.rollingDirection == "right") {
				param.rollingDirection = "left";
			} else if (param.rollingDirection == "down") {
				param.rollingDirection = "up";
			} else if (param.rollingDirection == "up") {
				param.rollingDirection = "down";
			}
			$("#" + param.id).trigger("reverse");
		} else {						
			if (param.rollingDirection == "up") {				
				param.rollingTop -= param.rollingItemHeight/param.rollingAnimationFrame;
				if (-param.rollingTop > parseFloat(param.rollingItemHeight)* param.rollingItemCount) {
					param.rollingTop = - parseFloat(param.rollingItemHeight)* param.rollingItemCount;
				}
				rollingContentDiv.css("top", param.rollingTop);					
			} else if (param.rollingDirection == "right") {
				param.rollingLeft +=  param.rollingItemWidth/param.rollingAnimationFrame;	
				if (param.rollingLeft > parseFloat(param.rollingItemWidth)) {
					param.rollingLeft = parseFloat(param.rollingItemWidth);
				}
				rollingContentDiv.css("left", param.rollingLeft);										
			} else if (param.rollingDirection == "down") {				
				param.rollingTop += param.rollingItemHeight/param.rollingAnimationFrame;			
				if (param.rollingTop > parseFloat(param.rollingItemHeight)) {
					param.rollingTop = parseFloat(param.rollingItemHeight);
				}
				rollingContentDiv.css("top", param.rollingTop);	
			} else if (param.rollingDirection == "left") {
				param.rollingLeft -= param.rollingItemWidth/param.rollingAnimationFrame;
				if (-param.rollingLeft > parseFloat(param.rollingItemWidth) * param.rollingItemCount) {
					param.rollingLeft = -parseFloat(param.rollingItemWidth) * param.rollingItemCount;
				}
				rollingContentDiv.css("left", param.rollingLeft);
			}
			param.rollingAnimationIndex++;
		}
		
		if (param.rollingAnimationIndex != 0 && param.rollingAnimationIndex%param.rollingAnimationFrame == 0) {
			var currentRollingItemIndex = 0;	
			if (param.rollingDirection == "up" || param.rollingDirection == "left") {
				currentRollingItemIndex = 0;				
			} else if (param.rollingDirection == "right" || param.rollingDirection == "down") {
				currentRollingItemIndex = param.rollingItemCount - 1;
			}
			
			var currentRollingItem = $("div[class='item']:eq(" + currentRollingItemIndex + ")", rollingContentDiv);
			var rollingItem = null;
			if (param.rollingDirection == "up") {
				rollingItem = currentRollingItem.clone(true).appendTo(rollingContentDiv);				
				param.rollingTop += parseFloat(param.rollingItemHeight);
				param.rollingTop = param.rollingItemHeight * Math.round(param.rollingTop/param.rollingItemHeight);
				rollingContentDiv.css("top", param.rollingTop);	
			} else if (param.rollingDirection == "right") {
				rollingItem = currentRollingItem.clone(true).prependTo(rollingContentDiv);				
				param.rollingLeft -= parseFloat(param.rollingItemWidth);
				param.rollingLeft = param.rollingItemWidth * Math.round(param.rollingLeft/param.rollingItemWidth);
				$("#debug").html("rollingLeft:" + param.rollingLeft);
				rollingItem.css("float", "left");
				rollingContentDiv.css("left", param.rollingLeft);					
			} else if (param.rollingDirection == "down") {
				rollingItem = currentRollingItem.clone(true).prependTo(rollingContentDiv);
				param.rollingTop -= parseFloat(param.rollingItemHeight);
				param.rollingTop = param.rollingItemHeight * Math.round(param.rollingTop/param.rollingItemHeight);
				rollingContentDiv.css("top", param.rollingTop);	
			} else if (param.rollingDirection == "left") {
				rollingItem = currentRollingItem.clone(true).appendTo(rollingContentDiv);
				param.rollingLeft += parseFloat(param.rollingItemWidth);
				param.rollingLeft = param.rollingItemWidth * Math.round(param.rollingLeft/param.rollingItemWidth);
				$("#debug").html("rollingLeft:" + param.rollingLeft);
				rollingItem.css("float", "left");
				rollingContentDiv.css("left", param.rollingLeft);									
			}
			
			currentRollingItem.remove();
		
			if (!isReverse) {
				delayTime = param.viewingTime;
			} else {
				delayTime = 0;
			}
			
			var previousRollingItem = $("div[class='item']:eq(" + currentRollingItemIndex + ")", rollingContentDiv);
			$("#" + param.id).trigger("viewing", [previousRollingItem]);
			param.rollingAnimationIndex = 0;
		}
		
		if (param.rollingAnimationIndex != 0) {
			var currentRollingItem = $("div[class='item']:eq(0)", rollingContentDiv);
			$("#" + param.id).trigger("rolling", [currentRollingItem]);
		}
		setTimeout("rollingAnimation('" + id + "')", delayTime);
	}
	
	$.fn.initRolling = function(rollingTime, viewingTime, rollingAnimationFrame) {
		var param = rollingParam[this.attr("rollingId")];
		var rollingContentDiv = $("#" + this.attr("rollingId"));
		var currentRollingItemIndex = 0;
		
		if (param.rollingDirection == "up" || 
			param.rollingDirection == "left") {
			currentRollingItemIndex = 0;
		} else if (param.rollingDirection == "right" || 
			param.rollingDirection == "down") {
			currentRollingItemIndex = param.rollingItemCount - 1;
		}
		var currentRollingItem = $("div[class='item']:eq(" + currentRollingItemIndex + ")", rollingContentDiv);
		this.trigger("viewing", [currentRollingItem]);
		param.rollingTime = rollingTime
		param.viewingTime = viewingTime;
		param.rollingAnimationFrame =  rollingAnimationFrame;
		param.newRollingAnimationFrame = rollingAnimationFrame;		
	};
	
	$.fn.startRolling = function(rollingTime, viewingTime, rollingAnimationFrame) {
		this.initRolling(rollingTime, viewingTime, rollingAnimationFrame);
		var param = rollingParam[this.attr("rollingId")];
		if (param.rollingIsStarted == false) {
			param.rollingIsStarted = true;
			this.trigger("start");
			setTimeout("rollingAnimation('" + this.attr("rollingId") + "')", param.viewingTime);
		}
		return this;		
	};
	
	$.fn.readyRolling = function(rollingTime, viewingTime, rollingAnimationFrame) {
		this.initRolling(rollingTime, viewingTime, rollingAnimationFrame);
		var param = rollingParam[this.attr("rollingId")];
		param.rollingIsStarted = false;		
		setTimeout("rollingAnimation('" + this.attr("rollingId") + "')", param.viewingTime);
		return this;
	};
	
	$.fn.stopRolling = function() {
		this.trigger("stop");
		rollingParam[this.attr("rollingId")].rollingIsStarted = false;
		return this;
	};
	
	$.fn.resumeRolling = function() {
		if (rollingParam[this.attr('rollingId')].rollingIsStarted == false) {
			rollingParam[this.attr('rollingId')].rollingIsStarted = true;
			this.trigger("start");			
		}
		return this;
	};
	
	$.fn.getRollingTime = function() {
		return rollingParam[this.attr('rollingId')].rollingTime;
	};
	
	$.fn.getViewingTime = function() {
		return rollingParam[this.attr('rollingId')].viewingTime;
	};
	
	$.fn.getRollingAnimationFrame = function() {
		return rollingParam[this.attr('rollingId')].rollingAnimationFrame;
	};
	
	$.fn.getRollingDirection = function() {
		return rollingParam[this.attr('rollingId')].rollingDirection;
	};
	
	$.fn.setRollingTime = function(rollingTime) {
		rollingParam[this.attr('rollingId')].rollingTime = rollingTime;
		return this;
	};
	
	$.fn.setViewingTime = function(viewingTime) {
		rollingParam[this.attr('rollingId')].viewingTime = viewingTime;
		return this;
	};
	
	$.fn.setRollingAnimationFrame = function(rollingAnimationFrame) {
		var oldStep = rollingParam[this.attr('rollingId')].rollingAnimationFrame;
		var oldIndex = rollingParam[this.attr('rollingId')].rollingAnimationIndex;
		var multiplier = rollingAnimationFrame / oldStep;
		rollingParam[this.attr('rollingId')].rollingAnimationFrame = rollingAnimationFrame;
		rollingParam[this.attr('rollingId')].newRollingAnimationFrame = rollingAnimationFrame;
		rollingParam[this.attr('rollingId')].rollingAnimationIndex = Math.round(multiplier * oldIndex);
		return this;		
	};
	
	$.fn.setRollingAnimationFrameNext = function(rollingAnimationFrame) {
		rollingParam[this.attr('rollingId')].newRollingAnimationFrame = rollingAnimationFrame;
		return this;
	}
	
	$.fn.getRollingItems = function() {
		return $("div[class=item]", this);
	};
	
	$.fn.getViewingItemCount = function() {
		return rollingParam[this.attr('rollingId')].viewingItemCount;
	};
	
	$.fn.bindViewingEvent = function(rollingEvent) {
		return this.bind("viewing", rollingEvent);
	};
	
	$.fn.unbindViewingEvent = function() {
		return this.unbind("viewing");
	};
	
	$.fn.bindRollingEvent = function(rollingEvent) {
		return this.bind("rolling", rollingEvent);
	};
	
	$.fn.unbindRollingEvent = function() {
		return this.unbind("rolling");
	};
	
	$.fn.bindStartEvent = function(rollingEvent) {
		return this.bind("start", rollingEvent);
	};
	
	$.fn.unbindStartEvent = function() {
		return this.unbind("start");
	};
	
	$.fn.bindStopEvent = function(rollingEvent) {
		return this.bind("stop", rollingEvent);
	};	
	
	$.fn.unbindStopEvent = function() {
		return this.unbind("stop");
	};
	
	$.fn.bindReverseEvent = function(rollingEvent) {
		return this.bind("reverse", rollingEvent);
	};
	
	$.fn.unbindReverseEvent = function() {
		return this.unbind("reverse");
	};
	
	$.fn.reverseRolling = function() {
		rollingParam[this.attr('rollingId')].requestReverse = true;
		return this;
	};
	
})(jQuery);