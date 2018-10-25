
/*
	www.gohackers.com - 공통 함수
*/

// ville 새창 열기
var v_left = (window.screen.width - 934) / 2;
var v_top = (window.screen.height - 577) / 2;

function ville_open(idx)
{
	window.open("./ville/ville.php?skin_sel=" + idx, "ville", "status=no, menubar=no, resizable=yes, scrollbars=yes, directories=no, top=" + v_top + ", left=" + v_left + ", width=950, height=580");
}

// 영어학습방 열기
function eng_edu_open(idx)
{
	window.open("/html/eng_edu/eng_edu.htm?idx=" + idx, "eng_edu", "status=no, menubar=no, resizable=yes, scrollbars=no directories=no, top=" + v_top + ", left=" + v_left + ", width=900, height=680");
}

// 아웃링크 레이어 버튼 보이기
function showOutlinkLayer(idx)
{
	for (var i=1; i<=3; i++)
	{
		if (i != idx)
		{
			hideOutlinkLayer(i);
		}
	}
	document.getElementById("outlink" + idx).style.display = "block";
}

// 숨기기
function hideOutlinkLayer(idx)
{
	document.getElementById("outlink" + idx).style.display = "none";
}

// swf 출력
function swfPrint(f_url, f_id, f_w, f_h)
{
	document.write('<object id="' + f_id + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="' + f_w + '" height="' + f_h +'" align="middle">');
	document.write('<param name="movie" value="' + f_url + '" />');
	document.write('<param name="wmode" value="transparent" />');
	document.write('<param name="allowScriptAccess" value="always" />');
	document.write('<param name="swLiveConnect" value="true" />');
	document.write('<param name="scale" value="noscale" />');
	document.write('<!-- Hixie method -->');
	document.write('<!--[if !IE]> <-->');
	document.write('<object id="' + f_id + '" type="application/x-shockwave-flash" data="' + f_url + '" width="' + f_w + '" height="' + f_h + '" ');
	document.write('wmode="transparent" ');
	document.write('name="' + f_id + '" ');
	document.write('allowScriptAccess="always" ');
	document.write('scale="noscale" ');
	document.write('swLiveConnect="true" />');
	document.write('<!--> <![endif]-->');
	document.write('</object>');
}