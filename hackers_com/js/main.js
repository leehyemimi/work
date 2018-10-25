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



function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function openPopup(src, name) //그래머 게이트웨이 팝업
{ 
	window.open(src,name,'width=650, height=270,top=0,left=0'); 
} 