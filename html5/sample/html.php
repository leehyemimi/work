<!DOCTYPE html>
<!--[if (IE 7)]><html class="no-js ie7" lang="ko"><![endif]-->
<!--[if (IE 8)]><html class="no-js ie8" lang="ko"><![endif]-->
<html lang="ko" class="no-js">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Comaptible" content="IE=Edge">
	<meta name="description" content="뉴텝스 베이직 리스닝">
	<meta name="keywords" content="해커스">
	<meta name="author" content="해커스">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<title>뉴텝스 베이직
		리스닝</title>
	<link rel="stylesheet" href="../cssjs/css/style.css">
	<link rel="stylesheet" href="./cssjs/css/ui.css"><!--각 책마다 css 변경 -->
	<script src="/plugins/jquery/1.11.2/jquery-1.11.2.min.js"></script>
	<script>
		var json_url = "/?m=api&a=lab_program&program=<?=$program?>&key=<?=$key?>",
			player_url = "<?=$DOMAIN_CHAMP?>/contents/shadowing/NewTEPSBasicListening/mp3/";
	</script>
	<script src="../cssjs/js/page_ui.js"></script>
	<script src="../cssjs/js/ui.js"></script>
	<script src="/plugins/jwplayer/8.0.1/jwplayer.js"></script>
	<script>jwplayer.key = 'Y+64W/8MQ0gfzEjZ08kw15uLcI1FSms/ACsTThls+O0=';</script>
</head>
<body>
<!--메인-->
<div class="intro content active">
	<div class="section">
		<a href="javascript:js_show('guide');">
			<img src="http://gscdn.hackers.co.kr/champ/img/contents/shadowing/NewTEPSBasicListening/main.png" alt="" >
		</a>
	</div>
</div d>
<!--//메인-->

<!--가이드페이지-->
<div class="guide content" style="display:block">
	<h1>프로그램 활용법</h1>
	<p class="img_guide">
		<img src="http://gscdn.hackers.co.kr/champ/img/contents/shadowing/NewTEPSBasicListening/img_guide.png" alt="">
	</p>
	<div class="guide_txt">
		청취력 향상을 위한 받아쓰기&쉐도잉 프로그램은 해커스 뉴텝스
		베이직 Listening 교재에 <em>수록된 빈출 표현 및 문장을 받아쓰기</em>를
		통해 완벽히 복습할 수 있도록 해커스 어학연구소에서 제작한
		프로그램입니다. 본 프로그램을 교재와 함께 매일 꾸준히
		학습한다면 <em>청취력 향상</em>에 큰 도움이 될 것입니다.
	</div>
	<div class="btn">
		<a href="#" onclick="js_show('index');">NEXT</a>
	</div>
	<ul>
		<li>해커스 뉴텝스 베이직 리스닝 받아쓰기&쉐도잉 프로그램에 대한
			저작권과 지적 소유권은 해커스 어학연구소가 가지고 있으며, 이 권리는
			대한민국의 저작권법과 국제저작권법과 국제 저작권 조약으로 보호
			받습니다. 해커스 어학연구소의 사전 동의 없이 부속된 자료 파일이나
			문서 내용을 절대로 수정, 변형 및 복사할 수 없습니다.
			이 프로그램의 전부 또는 일부를 무단으로 복제, 배포하는 행위는 민사
			및 형사법에 의해 엄격히 규제되어 있으며 기소 사유가 됩니다.
		</li>
	</ul>
</div>

<!--//가이드페이지-->
<div class="index content" style="display:block">
	<div class="header">
		<h1>뉴텝스 베이직 리스닝</h1>
		<div class="header-btn">
			<a href="javascript:js_show('guide');" class="list-btn">프로그램 활용법</a>
			<a href="#popup-go-menu" class="menu-btn">메뉴</a>
			<a href="#popup-end">나가기</a>
		</div>
	</div>
	<div id="content">
		<!--리스트-->
		<div class="list-box" id="list-box">
			<ul class="tabs no-tab" id="tabs">
			</ul>
		</div>
		<!--문제-->
		<div class="test-wrap" id="question-box"  style="display:block">
			<div class="path"></div>
			<dl class="status">
				<dt>문항 : </dt>
				<dd class="question-nm">0</dd>
				<dt>맞은 개수 : </dt>
				<dd class="right-nm">0</dd>
				<dt>틀린 개수 : </dt>
				<dd class="wrong-nm">0</dd>
				<dt>정답률 : </dt>
				<dd><em class="answer-per">0</em> %</dd>
			</dl>
			<div class="audio" id="audio">
				<h2 class="state-txt">음성을 듣고 받아쓰세요.</h2>
				<div class="player">
					<div id="mp3_sound"></div>
					<div id="player"></div>
					<div class="speed">
						<button type="button">X <em>1.0</em></button>
						<ul class="speed-select">
							<li><button type="button" class="btnPlayRate" data-playrate="0.8">0.8</button></li>
							<li><button type="button" class="btnPlayRate" data-playrate="1.0">1.0</button></li>
							<li><button type="button" class="btnPlayRate" data-playrate="1.2">1.2</button></li>
							<li><button type="button" class="btnPlayRate" data-playrate="1.4">1.4</button></li>
							<li><button type="button" class="btnPlayRate" data-playrate="1.6">1.6</button></li>
							<li><button type="button" class="btnPlayRate" data-playrate="1.8">1.8</button></li>
							<li><button type="button" class="btnPlayRate" data-playrate="2.0">2.0</button></li>
						</ul>
					</div>
				</div>

				<div class="btn">
					<div id="pronunc-list" class="pronunc-list">
						<a href="#;" class="text active"><em>미국식</em> 발음</a>
						<ul>
							<li><a href="#"><em>미국식</em> 발음</a></li>
							<li><a href="#"><em>영국식</em> 발음</a></li>
						</ul>
					</div>
					<button type="button" class="toggle hidden" id="script-btn" style="display:block !important;">스크립트 보이기</button>
				</div>
			</div>


			<!--문제풀기-->
			<div class="txt-area" id="question-area"  style="display:block">
				<div id="question-input">
					<div id="text-input"></div>
				</div>
				<div class="btn">
					<!--<a href="#" class="prev" id="prev-question">이전 문제</a>-->
					<a href="#audio" class="answer-btn" id="answer-btn" role="button" data-btn="정답">정답 확인하기</a>
				</div>
			</div>
			<!--//문제풀기-->


			<!--정답맞추기-->
			<div class="txt-area hidden" id="answer-area"  style="display:block">
				<h3>정 답</h3>
				<div class="answer ans-right mb20" id="right-answer"></div>
				<h3>내가 쓴 답</h3>
				<div class="answer ans-my" id="my-answer"></div>
				<div class="btn">
					<a href="#" class="prev prev-btn" id="prev-btn">이전 화면</a>
					<a href="#" role="button" id="shadowing-btn" data-btn="쉐도잉">쉐도잉</a>
				</div>
			</div >
			<!--정답맞추기-->


			<!--스크립트-->
			<div class="txt-area hidden" id="script-area" style="display:block !important;">
				<div id="script-area-text"  style="display:block !important;">
					<div class="answer ans-right mb20" id="en-script">
						dgasgag
					</div>
					<div class="answer ans-my" id="kor-script">
						한글
					</div>
				</div>
				<div class="btn">
					<a href="#" class="prev prev-btn" id="prev-btn" data-btn="스크립트">이전 화면</a>
					<a href="#" role="button" id="next-question">다음 문제</a>
					<a href="#" role="button" id="result-btn">결과보기</a>
				</div>
			</div>
			<!--//스크립트-->
		</div>
		<!--//문제-->


		<!--결과-->
		<div class="result hidden" id="result-box" style="display:block">
			<h3>
				<strong>
					<em class="path"></em> 학습을 마치셨습니다.
				</strong>
			</h3>
			<table>
				<caption>테스트 결과</caption>
				<tbody>
				<tr>
					<th scope="row">문항</th>
					<td class="question-nm">00</td>
				</tr>
				<tr>
					<th scope="row">맞은 개수</th>
					<td class="right-nm">00</td>
				</tr>
				<tr>
					<th scope="row">틀린 개수</th>
					<td class="wrong-nm">00</td>
				</tr>
				<tr>
					<th scope="row">정답률</th>
					<td><em class="answer-per">0</em> %</td>
				</tr>
				</tbody>
			</table>
		</div>
		<!--//결과-->
	</div>
</div>
<!-- //content -->

<!--공통-->
<a href="#" class="btn-top">top으로 이동</a>
<div class="popup-group">
	<!-- 나가기 -->
	<div class="popup-layer" id="popup-end">
		<div class="layer">
			<div class="cont">
				<p><strong>받아쓰기 &amp; 쉐도잉 프로그램을 <br>종료하시겠습니까?</strong></p>
				<div class="btn">
					<a href="#" role="button" class="cancel">취소</a>
					<a href="" role="button" class="close-program">확인</a>
				</div>
			</div>
		</div>
	</div>

	<!-- 메뉴 -->
	<div class="popup-layer" id="popup-go-menu">
		<div class="layer">
			<div class="cont">
				<p><strong>메인 메뉴로 이동하시겠습니까?</strong></p>
				<div class="btn">
					<a href="#" role="button" class="cancel">취소</a>
					<a href="javascript:main_list();" role="button" class="cancel main-list">확인</a>
				</div>
			</div>
		</div>
	</div>
</div>
<!--//공통-->
</body>
</html>
