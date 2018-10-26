var http = require('http');						//서버를 생성하기 위한 기본 모듈
var express = require('express');				//웹 프레임 워크
var mysql = require('mysql');					//mysql 데이터베이스를 사용하기 위한 모듈
var bodyParser = require('body-parser');		//바디를 파싱하여 req.body 객체로 접근하게 해주는 모듈
var session = require('express-session');		//세션모듈
var cookieParser = require('cookie-parser');	//서버에서 cookie를 처리하기 위한 모듈 
var fs = require('fs');							//파일을 읽고 쓰는데 사용하는 모듈(File System)
var ejs = require('ejs');						//ejs모듈
var multer  = require('multer');				//파일 업로드를 도와주는 미들웨어
var crypto = require('crypto');					//비밀번호 암호화 모듈
//require를 통하여 사용하는 외부모듈을 가져옴

const port = 8000;
//포트번호

var option = {
//데이터 베이스를 사용하기 위한 프로그램 정보를 담은 객체
    host: 'localhost',
    user: 'root',
    password: 'alsgh',
    database: 'MARKETDB'
};
var conn = mysql.createPool(option);

var app = express();
var server = http.createServer(app);
app.use(express.static('public'));
//static미들웨어 사용
app.use(bodyParser());
//바디파서 사용

 var upload = multer({dest:'public/img/product/'});

app.use(cookieParser());
app.use(session({			//세션의 객체정보를 저장
	secret: '(($%)gj43ufd**',
	cookie: {
    maxAge: 1000 * 60 * 60 // 쿠키 유효기간 1시간
 	},
	resave: false,
	saveUninitialized: true
}));

var key = 'myKey';      // 암호화, 복호화를 위한 키

////////////////////////////////////////////////////html get방식 시작

var outputHead='';						//홈페이지 상 헤더부분의 공통된 부분을 따로 적어둔 html
outputHead+='<!DOCTYPE html>';
outputHead+='<html>';
outputHead+='<head>';
outputHead+='<meta charset="utf-8"/>';
outputHead+='<script src="js/jquery-3.1.1.js"></script>';
outputHead+='<script src="js/header.js"></script>';
outputHead+='<script src="js/loginCheck.js"></script>';
outputHead+='<link rel="stylesheet" type="text/css" charset="utf-8" href="css/main.css" />';
outputHead+='<link rel="stylesheet" type="text/css" href="jquery-ui-1.12.1.custom/jquery-ui.css"/>';
outputHead+='<script type="text/javascript" src="jquery-ui-1.12.1.custom/jquery-ui.js"></script>';
outputHead+='</head>';
outputHead+='<body>';
outputHead+='	<div id="page-wrapper" align="center">';
outputHead+='		<div>';
outputHead+='			<header id="header">';
outputHead+='				<div class="main-bg isTop">';
outputHead+='					<div class="main-bg-bar">';
outputHead+='						<ul class="main-bg-bar-nav">';
outputHead+='							<li style="border-right: 0;">';
outputHead+='								<a id="cart_a" href="">장바구니</a>';
outputHead+='							</li>';
outputHead+='							<li>';
outputHead+='								<a href="/service/home">고객센터</a>';
outputHead+='							</li>';
outputHead+='							<li>';
outputHead+='								<a id="myInfo_a" href="">마이페이지</a>';
outputHead+='							</li>';
outputHead+='							<li>';
outputHead+='								<a href="/joinAgree.html">회원가입</a>';
outputHead+='							</li>';
outputHead+='							<li>';
outputHead+='								<a id="login_a" href="">로그인</a>';
outputHead+='							</li>';
outputHead+='						</ul>';
outputHead+='					</div>';
outputHead+='					<div class="main-bg-header">';
outputHead+='						<div class="main-bg-header-container">';
outputHead+='							<a href="/" class="main-bg-header-container-logo">';
outputHead+='								<div style="font-family: \'Yoon_러브레터M\';font-size: 40px;font-weight: lighter;">마을마켓</div>';
outputHead+='								<div style="font-family: \'Yoon_러브레터M\';font-size: 180px;font-weight: lighter;margin-top: -85px;height: 80px;margin-left: 30px;">소소</div>';
outputHead+='							</a>';
outputHead+='							<div id="magnifier" align="right" style="margin-top: 10px;">';
outputHead+='								<span style="border: 1px solid #ddd;padding: 0px 5px;">';
outputHead+='									<img src="img/main/magnifier.png" width="14" height="14">';
outputHead+='									<input type="text" name="search" style="border: none;font-size: 15px;margin-left: 2px;">';
outputHead+='								</span>';
outputHead+='							</div>';
outputHead+='							<div class="main-bg-header-container-catchcopy">';
outputHead+='								<font style="vertical-align: inherit;">';
outputHead+='									상품 하나하나에 이웃의 이야기와 자부심이 있습니다.';
outputHead+='								</font>';
outputHead+='								<br>';
outputHead+='							</div>';
outputHead+='							<div style="text-align: left;">';
outputHead+='								<a href="./" class="main-bg-header-container-home"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">홈</font></font></a>';
outputHead+='								<div class="main-bg-header-container-nav">';
outputHead+='									<dl class="main-bg-header-container-nav-list">';
outputHead+='										<font style="vertical-align: inherit;">';
outputHead+='											<a href="/category.html?high_num=1&view=2">식품</a>';
outputHead+='										</font>';
outputHead+='									</dl>';
outputHead+='									<dl class="main-bg-header-container-nav-list">';
outputHead+='										<font style="vertical-align: inherit;">';
outputHead+='											<a href="/category.html?high_num=2&view=2">생활</a>';
outputHead+='										</font>';
outputHead+='									</dl>';
outputHead+='									<dl class="main-bg-header-container-nav-list">';
outputHead+='										<font style="vertical-align: inherit;">';
outputHead+='											기획';
outputHead+='										</font>';
outputHead+='									</dl>';
outputHead+='									<dl class="main-bg-header-container-nav-list">';
outputHead+='										<font style="vertical-align: inherit;">';
outputHead+='											<a href="/news_list">마마톡</a>';
outputHead+='										</font>';
outputHead+='									</dl>';
outputHead+='									<dl class="main-bg-header-container-nav-list" style="border-right: 0px;">';
outputHead+='										<font style="vertical-align: inherit;">';
outputHead+='											이웃마을';
outputHead+='										</font>';
outputHead+='									</dl>';
outputHead+='								</div>';
outputHead+='							</div>';
outputHead+='						</div>';
outputHead+='					</div>';
outputHead+='				</div>';
outputHead+='			</header>';

var outputFooter='';						//홈페이지 상 footer부분의 공통된 부분을 따로 적어둔 html
outputFooter+='				<footer id="footer">';
outputFooter+='					<div class="footer-container">';
outputFooter+='						<div class="footer-top" align="center">';
outputFooter+='							상품에 대하여 배송, 교환, 반품의 민원 A/S 등은  "다시 뛰는 사람들" 에서 처리하며 모든 책임은 "다시 뛰는 사람들"에 있습니다.​';
outputFooter+='							민원 담당자 : 마을마켓 소소 고객센터 /  연락처 : 031-963-2900';
outputFooter+='						</div>';
outputFooter+='						<div class="footer-mid" align="left">';
outputFooter+='							<p style="font-size: 12px;">';
outputFooter+='								<b>다시 뛰는 사람들</b>';
outputFooter+='							</p>';
outputFooter+='							<p style="font-size: 11px;">';
outputFooter+='								우)10460 경기도 고양시 덕양구 고양시청로 13-2 성광빌딩 4층';
outputFooter+='							</p>';
outputFooter+='							<p style="font-size: 11px;">';
outputFooter+='								| 대표자: 이영아 | 사업자등록번호: 128-86-63160 | 통신판매업신고: <!--제 2017-고양덕양구-0076호-->';
outputFooter+='							</p>';
outputFooter+='						</div>';
outputFooter+='						<div class="footer-bottom" align="left">';
outputFooter+='							<p style="font-size: 12px;">';
outputFooter+='								<b>고객센터</b>';
outputFooter+='							</p>';
outputFooter+='							<p style="font-size: 11px;">';
outputFooter+='								| Tel (031)963-2900 | Fax (031)965-2900 | e-mail: webmaster@mygoyang.com';
outputFooter+='							</p>';
outputFooter+='							<p style="font-size: 11px;">';
outputFooter+='								| 월-금: 오전10시 - 오후 6시 (Break hour: 오후 1시 ~ 오후 2시)';
outputFooter+='							</p>';
outputFooter+='						</div>';
outputFooter+='						<div class="pageTop">';
outputFooter+='							<a href="#" class="pageTop-a">';
outputFooter+='								<img src="/img/main/pageTop.png" width="100">';
outputFooter+='							</a>';
outputFooter+='						</div>';
outputFooter+='					</div>';
outputFooter+='				</footer>';
outputFooter+='			</div>';
outputFooter+='		</div>';
outputFooter+='</body>';
outputFooter+='</html>';


app.get('/login.html',function(request,response){					//로그인 페이지
	var output='<!DOCTYPE html>';
	output+='<html>';
	output+='<head>';
	output+='<meta charset="utf-8"/>';
	output+='<script src="js/jquery-3.1.1.js"></script>';
	output+='<script src="js/header.js"></script>';
	output+='<link rel="stylesheet" type="text/css" charset="utf-8" href="css/main.css" />';
	output+='</head>';
	output+='<style>';
	output+='.find:hover{';
	output+='	color:rgb(67,117,219);';
	output+='}';
	output+='.find{';
	output+='	color:#000000;';
	output+='}';
	output+='</style>';
	output+='<body>';
	output+='	<div id="page-wrapper" align="center">';
	output+='		<div>';
	output+='			<header id="header">';
	output+='				<div class="main-bg isTop">';
	output+='					<div class="main-bg-bar">';
	output+='						<ul class="main-bg-bar-nav">';
	output+='							<li style="border-right: 0;">';
	output+='								<a id="cart_a" href="">장바구니</a>';
	output+='							</li>';
	output+='							<li>';
	output+='								<a href="/service/home">고객센터</a>';
	output+='							</li>';
	output+='							<li>';
	output+='								<a id="myInfo_a" href="">마이페이지</a>';
	output+='							</li>';
	output+='							<li>';
	output+='								<a href="/joinAgree.html">회원가입</a>';
	output+='							</li>';
	output+='							<li>';
	output+='								<a id="login_a" href="">로그인</a>';
	output+='							</li>';
	output+='						</ul>';
	output+='					</div>';
	output+='					<div class="main-bg-header">';
	output+='						<div class="main-bg-header-container">';
	output+='							<a href="/" class="main-bg-header-container-logo">';
	output+='								<div style="font-family: \'Yoon_러브레터M\';font-size: 40px;font-weight: lighter;">마을마켓</div>';
	output+='								<div style="font-family: \'Yoon_러브레터M\';font-size: 180px;font-weight: lighter;margin-top: -85px;height: 80px;margin-left: 30px;">소소</div>';
	output+='							</a>';
	output+='							<div id="magnifier" align="right" style="margin-top: 10px;">';
	output+='								<span style="border: 1px solid #ddd;padding: 0px 5px;">';
	output+='									<img src="img/main/magnifier.png" width="14" height="14">';
	output+='									<input type="text" name="search" style="border: none;font-size: 15px;margin-left: 2px;">';
	output+='								</span>';
	output+='							</div>';
	output+='							<div class="main-bg-header-container-catchcopy">';
	output+='								<font style="vertical-align: inherit;">';
	output+='									상품 하나하나에 이웃의 이야기와 자부심이 있습니다.';
	output+='								</font>';
	output+='								<br>';
	output+='							</div>';
	output+='							<div style="text-align: left;">';
	output+='								<a href="./" class="main-bg-header-container-home"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">홈</font></font></a>';
	output+='								<div class="main-bg-header-container-nav">';
	output+='									<dl class="main-bg-header-container-nav-list">';
	output+='										<font style="vertical-align: inherit;">';
	output+='											<a href="/category.html?high_num=1&view=2">식품</a>';
	output+='										</font>';
	output+='									</dl>';
	output+='									<dl class="main-bg-header-container-nav-list">';
	output+='										<font style="vertical-align: inherit;">';
	output+='											<a href="/category.html?high_num=2&view=2">생활</a>';
	output+='										</font>';
	output+='									</dl>';
	output+='									<dl class="main-bg-header-container-nav-list">';
	output+='										<font style="vertical-align: inherit;">';
	output+='											기획';
	output+='										</font>';
	output+='									</dl>';
	output+='									<dl class="main-bg-header-container-nav-list">';
	output+='										<font style="vertical-align: inherit;">';
	output+='											<a href="/news_list">마마톡</a>';
	output+='										</font>';
	output+='									</dl>';
	output+='									<dl class="main-bg-header-container-nav-list" style="border-right: 0px;">';
	output+='										<font style="vertical-align: inherit;">';
	output+='											이웃마을';
	output+='										</font>';
	output+='									</dl>';
	output+='								</div>';
	output+='							</div>';
	output+='						</div>';
	output+='					</div>';
	output+='				</div>';
	output+='			</header>';
	output+='	<script>';
	output+='		$(document).ready(function(){';
	output+='			$.get("/login_check",function(data){';				//로그인 상태를 확인하기 위한 get요청
	output+='				if(data){';										//로그인 상태
	output+="					$('#login_a').attr('href','/logout');";
	output+="					$('#login_li').empty().append('로그아웃');";
	output+="					$('#cart_a').attr('href','/cart.html');";
	output+="					$('#myInfo_a').attr('href','/myInfo.html');";
	output+="				}else{";										//비로그인 상태
	if(request.param('view')==undefined){				//로그인 페이지로 보냄
		output+="					$('#login_a').attr('href','/login.html?url="+request.param('url')+"');";			//url은 가려고 했던 페이지의 주소
	}
	else{
		output+="					$('#login_a').attr('href','/login.html?url="+request.param('url')+"&view="+request.param('view')+"');";		//view는 가려고 했던 페이지 주소에서 기억하고 있던 url
	}
	output+="					$('#login_li').empty().append('로그인');";
	output+="					$('#cart_a').attr('href','/login.html?url=cart.html');";
	output+="					$('#myInfo_a').attr('href','/login.html?url=myInfo.html');";
	output+="				};";
	output+="			});";
	output+="		});";
	output+="	</script>";
	output+="<script src='js/login.js'></script>";
	output+="<title>마을마켓 - 로그인</title>";
	output+='	<link rel="stylesheet" type="text/css" charset="utf-8" href="css/login.css" />';
	output+="		<div id='container' style='width: 900px;margin: 0 auto;'>";
	output+="			<div id='login_con'>";
	output+="				<div align='left'>";
	output+="					<span style='font-size:50px;'>LOGIN</span>";
	output+="				</div>";
	output+="				<div id='fail_message' style='height:20px;border-bottom:2px solid rgb(204,204,204);'>";
	output+="				</div>";
	output+="				<div id='login_con_top'>";
	output+="					<div id='login_id'>";
	output+="						<input id='id' type='text' name='id' class='input_text' value='아이디' onfocus='focusFunction(this)' onfocusout='focusoutFunction(this)' maxlength='20'>";
	output+="					</div>";
	output+="					<div id='login_password'>";
	output+="						<input id='password' type='text' name='password' class='input_text' value='비밀번호' onfocus='focusFunction(this)' onfocusout='focusoutFunction(this)' maxlength='20'>";
	output+="					</div>";
	output+="				</div>";
	output+="				<div id='login_con_bottom'>";
	output+="					<button id='button' type='button' style='background-color:black;color:white;width:400px;height:40px;border:0px;font-size:14px;cursor:pointer;'>로그인</button>";
	if(request.param('view')==undefined){
		output+="					<button type='button' onclick='location.href=\"/joinAgree.html?url="+request.param('url')+"\"'  style='background-color:gray;width:400px;height:40px;border:0px;font-size:14px;cursor:pointer;margin-top:10px;'>회원가입</button>";
	}
	else{
		output+="					<button type='button' onclick='location.href=\"/joinAgree.html?url="+request.param('url')+"&view="+request.param('view')+"\"'  style='background-color:gray;width:400px;height:40px;border:0px;font-size:14px;cursor:pointer;margin-top:10px;'>회원가입</button>";
	}
	output+='				<div style="margin-top:10px;font-size: 14px;font-weight:lighter;"><a href="/memberfind.html" class="find">아이디 찾기</a> | <a href="/memberfind.html" class="find">비밀번호 찾기</a></div>';
	output+="				</div>";
	output+="			</div>";
	output+="		</div>";
	output+='		<footer id="footer" style="margin-top: 0px;">';
	output+='			<div class="footer-container">';
	output+='				<div class="footer-top" align="center">';
	output+='					상품에 대하여 배송, 교환, 반품의 민원 A/S 등은  "다시 뛰는 사람들" 에서 처리하며 모든 책임은 "다시 뛰는 사람들"에 있습니다.​';
	output+='					민원 담당자 : 마을마켓 소소 고객센터 /  연락처 : 031-963-2900';
	output+='				</div>';
	output+='				<div class="footer-mid" align="left">';
	output+='					<p style="font-size: 12px;">';
	output+='						<b>다시 뛰는 사람들</b>';
	output+='					</p>';
	output+='					<p style="font-size: 11px;">';
	output+='						우)10460 경기도 고양시 덕양구 고양시청로 13-2 성광빌딩 4층';
	output+='					</p>';
	output+='					<p style="font-size: 11px;">';
	output+='						| 대표자: 이영아 | 사업자등록번호: 128-86-63160 | 통신판매업신고: <!--제 2017-고양덕양구-0076호-->';
	output+='					</p>';
	output+='				</div>';
	output+='				<div class="footer-bottom" align="left">';
	output+='					<p style="font-size: 12px;">';
	output+='						<b>고객센터</b>';
	output+='					</p>';
	output+='					<p style="font-size: 11px;">';
	output+='						| Tel (031)963-2900 | Fax (031)965-2900 | e-mail: webmaster@mygoyang.com';
	output+='					</p>';
	output+='					<p style="font-size: 11px;">';
	output+='						| 월-금: 오전10시 - 오후 6시 (Break hour: 오후 1시 ~ 오후 2시)';
	output+='					</p>';
	output+='				</div>';
	output+='				<div class="pageTop">';
	output+='					<a href="#" class="pageTop-a">';
	output+='						<img src="/img/main/pageTop.png" width="100">';
	output+='					</a>';
	output+='				</div>';
	output+='			</div>';
	output+='		</footer>';
	output+="	</div>";
	output+="	<script>";
	output+="		$(document).ready(function(){";
	output+="			$('#button').click(function(){";
	if(request.param('view')==undefined){
		output+="				$.post('/login',{id:$('#id').val(),password:$('#password').val(),url:'"+request.param('url')+"'},function(data){";
	}
	else{
		output+="				$.post('/login',{id:$('#id').val(),password:$('#password').val(),url:'"+request.param('url')+"&view="+request.param('view')+"'},function(data){";
	}
	output+="					if(data!='fail'){";
	output+="						window.location=data";
	output+="					}else{$('#fail_message').empty().append('아이디 혹은 비밀번호를 확인하세요.');}";
	output+="				});";
	output+="			});";
	output+="		})";
	output+="	</script>";
	output+="</body>";
	output+="</html>";

	response.send(output);
})

app.get('/memberfind.html',function(request,response){						//아이디, 비밀번호 찾기 페이지
	var output='<!DOCTYPE html>';
	output+='<html>';
	output+='<head>';
	output+='<meta charset="utf-8"/>';
	output+='<script src="js/jquery-3.1.1.js"></script>';
	output+='<script src="js/memberfind.js"></script>';
	output+='<script src="js/header.js"></script>';
	output+='<script src="js/loginCheck.js"></script>';
	output+='<link rel="stylesheet" type="text/css" charset="utf-8" href="css/main.css" />';
	output+='<link rel="stylesheet" type="text/css" href="jquery-ui-1.12.1.custom/jquery-ui.css"/>';
	output+='<script type="text/javascript" src="jquery-ui-1.12.1.custom/jquery-ui.js"></script>';
	output+="<script src='js/login.js'></script>";
	output+="<title>마을마켓 - 로그인</title>";
	output+='<link rel="stylesheet" type="text/css" charset="utf-8" href="css/login.css" />';
	output+='</head>';
	output+='<body>';
	output+='	<div id="page-wrapper" align="center">';
	output+='		<div>';
	output+='			<header id="header">';
	output+='				<div class="main-bg isTop">';
	output+='					<div class="main-bg-bar">';
	output+='						<ul class="main-bg-bar-nav">';
	output+='							<li style="border-right: 0;">';
	output+='								<a id="cart_a" href="">장바구니</a>';
	output+='							</li>';
	output+='							<li>';
	output+='								<a href="/service/home">고객센터</a>';
	output+='							</li>';
	output+='							<li>';
	output+='								<a id="myInfo_a" href="">마이페이지</a>';
	output+='							</li>';
	output+='							<li>';
	output+='								<a href="/joinAgree.html">회원가입</a>';
	output+='							</li>';
	output+='							<li>';
	output+='								<a id="login_a" href="">로그인</a>';
	output+='							</li>';
	output+='						</ul>';
	output+='					</div>';
	output+='					<div class="main-bg-header">';
	output+='						<div class="main-bg-header-container">';
	output+='							<a href="/" class="main-bg-header-container-logo">';
	output+='								<div style="font-family: \'Yoon_러브레터M\';font-size: 40px;font-weight: lighter;">마을마켓</div>';
	output+='								<div style="font-family: \'Yoon_러브레터M\';font-size: 180px;font-weight: lighter;margin-top: -85px;height: 80px;margin-left: 30px;">소소</div>';
	output+='							</a>';
	output+='							<div id="magnifier" align="right" style="margin-top: 10px;">';
	output+='								<span style="border: 1px solid #ddd;padding: 0px 5px;">';
	output+='									<img src="img/main/magnifier.png" width="14" height="14">';
	output+='									<input type="text" name="search" style="border: none;font-size: 15px;margin-left: 2px;">';
	output+='								</span>';
	output+='							</div>';
	output+='							<div class="main-bg-header-container-catchcopy">';
	output+='								<font style="vertical-align: inherit;">';
	output+='									상품 하나하나에 이웃의 이야기와 자부심이 있습니다.';
	output+='								</font>';
	output+='								<br>';
	output+='							</div>';
	output+='							<div style="text-align: left;">';
	output+='								<a href="./" class="main-bg-header-container-home"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">홈</font></font></a>';
	output+='								<div class="main-bg-header-container-nav">';
	output+='									<dl class="main-bg-header-container-nav-list">';
	output+='										<font style="vertical-align: inherit;">';
	output+='											<a href="/category.html?high_num=1&view=2">식품</a>';
	output+='										</font>';
	output+='									</dl>';
	output+='									<dl class="main-bg-header-container-nav-list">';
	output+='										<font style="vertical-align: inherit;">';
	output+='											<a href="/category.html?high_num=2&view=2">생활</a>';
	output+='										</font>';
	output+='									</dl>';
	output+='									<dl class="main-bg-header-container-nav-list">';
	output+='										<font style="vertical-align: inherit;">';
	output+='											기획';
	output+='										</font>';
	output+='									</dl>';
	output+='									<dl class="main-bg-header-container-nav-list">';
	output+='										<font style="vertical-align: inherit;">';
	output+='											<a href="/news_list">마마톡</a>';
	output+='										</font>';
	output+='									</dl>';
	output+='									<dl class="main-bg-header-container-nav-list" style="border-right: 0px;">';
	output+='										<font style="vertical-align: inherit;">';
	output+='											이웃마을';
	output+='										</font>';
	output+='									</dl>';
	output+='								</div>';
	output+='							</div>';
	output+='						</div>';
	output+='					</div>';
	output+='				</div>';
	output+='			</header>';
	output+='		<div id="container">';
	output+='			<div style="text-align:left;width:100%;margin-top:15px;">';
	output+='				<div style="font-size: 25px;">';
	output+='					FIND ID/PW';
	output+='				</div>';
	output+='				<div style="font-size: 11px;font-family: dotum;color: #848484;margin-top:5px;padding-bottom:55px;">';
	output+='					아이디, 비밀번호가 생각나지 않으세요?';
	output+='				</div>';
	output+='				<table width="570" align="center" border="0" cellpadding="0" cellspacing="0">';
	output+='					<tr>';
	output+='						<td style="text-align:left;font-size: 12px;font-weight: bold;height:22px;">아이디 찾기</td>';
	output+='					</tr>';
	output+='					<tr>';
	output+='						<td height="2" bgcolor="#545454"></td>';
	output+='					</tr>';
	output+='					<tr>';
	output+='						<td>';
	output+='							<div style="margin-top: 15px;margin-bottom: 10px;">';
	output+='								<div style="font-family: dotum;font-size: 12px;color: #000;font-weight: bold;">* 등록 정보로 찾기</div>';
	output+='								<div style="font-family: dotum;font-size: 11px;color: #848484;">&nbsp;&nbsp;회원 가입시 등록한 정보로 찾을 수 있습니다.</div>';
	output+='								<div style="height: 155px;border: 2px solid #e2e2e2;padding: 35px 15px 0 25px;margin-top:10px;">';
	output+='									<table width="100%;" align="center" border="0" cellpadding="0" cellspacing="5">';
	output+='										<tr>';
	output+='											<td>';
	output+='												<table width="100%;" align="center" border="0" cellpadding="0" cellspacing="0">';
	output+='													<tr>';
	output+='														<td colspan="3" align="center" height="30" style="font-size: 12px;color: #515151;">';
	output+='															<label style="cursor:pointer;"><input type="radio" name="searchRadio" value="email" onclick="emailSearchFun()" checked> 이메일</label>&nbsp;&nbsp;&nbsp;&nbsp;<label style="cursor:pointer;"><input type="radio" name="searchRadio" value="cellphone" onclick="phoneSearchFun()"> 휴대폰</label>';
	output+='														</td>';
	output+='													</tr>';
	output+='													<tr>';
	output+='														<td align="right;" width="100" style="font-size: 12px;color: #515151;text-align:right;">이름</td>';
	output+='														<td width="10"></td>';
	output+='														<td><input id="name" type="text" name="name" maxlength="20" style="width:100px;"></td>';
	output+='													</tr>';
	output+='													<tr>';
	output+='														<td width="14" colspan="3"></td>';
	output+='													</tr>';
	output+='													<tr>';
	output+='														<td align="right;" width="100" style="font-size: 12px;color: #515151;text-align:right;"><span id="email1">이메일</span><span id="phone1" hidden>휴대폰</span></td>';
	output+='														<td width="10"></td>';
	output+='														<td><input id="email2" type="text" name="email" maxlength="30" style="width:100px;"><span id="phone2" hidden><input id="cellphone1" type="text" name="phone1" maxlength="4" style="width:30px;">-<input id="cellphone2" type="text" name="phone2" maxlength="4" style="width:30px;">-<input id="cellphone3" type="text" name="phone3" maxlength="4" style="width:30px;"></span></td>';
	output+='												</table>';
	output+='											</td>';
	output+='											<td width="250" align="left">';
	output+='												<button style="width:150px;padding:10px;font-size:20px;border:0px;background-color:rgb(5,5,5);color:white;cursor:pointer;margin-top:20px;" onclick="searchIdFun()">찾기</button>';
	output+='											</td>';
	output+='										</tr>';
	output+='									</table>';
	output+='								</div>';
	output+='							</div>';
	output+='						</td>';
	output+='					</tr>';
	output+='				</table>';
	output+='				<table width="570" align="center" border="0" cellpadding="0" cellspacing="0" style="margin-top:45px;">';
	output+='					<tr>';
	output+='						<td style="text-align:left;font-size: 12px;font-weight: bold;height:22px;">비밀번호 찾기</td>';
	output+='					</tr>';
	output+='					<tr>';
	output+='						<td height="2" bgcolor="#545454"></td>';
	output+='					</tr>';
	output+='					<tr>';
	output+='						<td>';
	output+='							<div style="margin-top: 15px;margin-bottom: 10px;">';
	output+='								<div style="font-family: dotum;font-size: 12px;color: #000;font-weight: bold;">* 등록 정보로 비밀번호 변경하기</div>';
	output+='								<div style="font-family: dotum;font-size: 11px;color: #848484;">&nbsp;&nbsp;회원 가입시 등록한 정보로 찾을 수 있습니다.</div>';
	output+='								<div style="height: 155px;border: 2px solid #e2e2e2;padding: 35px 15px 0 25px;margin-top:10px;">';
	output+='									<table width="100%;" align="center" border="0" cellpadding="0" cellspacing="5">';
	output+='										<tr>';
	output+='											<td>';
	output+='												<table width="100%;" align="center" border="0" cellpadding="0" cellspacing="0">';
	output+='													<tr>';
	output+='														<td colspan="3" align="center" height="30" style="font-size: 12px;color: #515151;">';
	output+='															<label style="cursor:pointer;"><input type="radio" name="searchRadio2" value="email_2" onclick="emailSearchFun2()" checked> 이메일</label>&nbsp;&nbsp;&nbsp;&nbsp;<label style="cursor:pointer;"><input type="radio" name="searchRadio2" value="cellphone" onclick="phoneSearchFun2()"> 휴대폰</label>';
	output+='														</td>';
	output+='													</tr>';
	output+='													<tr>';
	output+='														<td align="right;" width="100" style="font-size: 12px;color: #515151;text-align:right;">이름</td>';
	output+='														<td width="10"></td>';
	output+='														<td><input id="name_2" type="text" name="name" maxlength="20" style="width:100px;"></td>';
	output+='													</tr>';
	output+='													<tr>';
	output+='														<td width="14" colspan="3"></td>';
	output+='													</tr>';
	output+='													<tr>';
	output+='														<td align="right;" width="100" style="font-size: 12px;color: #515151;text-align:right;">아이디</td>';
	output+='														<td width="10"></td>';
	output+='														<td><input id="id_2" type="text" name="name" maxlength="20" style="width:100px;"></td>';
	output+='													</tr>';
	output+='													<tr>';
	output+='														<td width="14" colspan="3"></td>';
	output+='													</tr>';
	output+='													<tr>';
	output+='														<td align="right;" width="100" style="font-size: 12px;color: #515151;text-align:right;"><span id="email1_2">이메일</span><span id="phone1_2" hidden>휴대폰</span></td>';
	output+='														<td width="10"></td>';
	output+='														<td><input id="email2_2" type="text" name="email" maxlength="30" style="width:100px;"><span id="phone2_2" hidden><input id="cellphone1_2" type="text" name="phone1" maxlength="4" style="width:30px;">-<input id="cellphone2_2" type="text" name="phone2" maxlength="4" style="width:30px;">-<input id="cellphone3_2" type="text" name="phone3" maxlength="4" style="width:30px;"></span></td>';
	output+='												</table>';
	output+='											</td>';
	output+='											<td width="250" align="left">';
	output+='												<button style="width:150px;padding:10px;font-size:20px;border:0px;background-color:rgb(5,5,5);color:white;cursor:pointer;margin-top:20px;" onclick="searchIdFun2()">찾기</button>';
	output+='											</td>';
	output+='										</tr>';
	output+='									</table>';
	output+='								</div>';
	output+='							</div>';
	output+='						</td>';
	output+='					</tr>';
	output+='				</table>';
	output+='			</div>';
	output+='		</div>';
	output+='		<footer id="footer" style="margin-top: 0px;">';
	output+='			<div class="footer-container">';
	output+='				<div class="footer-top" align="center">';
	output+='					상품에 대하여 배송, 교환, 반품의 민원 A/S 등은  "다시 뛰는 사람들" 에서 처리하며 모든 책임은 "다시 뛰는 사람들"에 있습니다.​';
	output+='					민원 담당자 : 마을마켓 소소 고객센터 /  연락처 : 031-963-2900';
	output+='				</div>';
	output+='				<div class="footer-mid" align="left">';
	output+='					<p style="font-size: 12px;">';
	output+='						<b>다시 뛰는 사람들</b>';
	output+='					</p>';
	output+='					<p style="font-size: 11px;">';
	output+='						우)10460 경기도 고양시 덕양구 고양시청로 13-2 성광빌딩 4층';
	output+='					</p>';
	output+='					<p style="font-size: 11px;">';
	output+='						| 대표자: 이영아 | 사업자등록번호: 128-86-63160 | 통신판매업신고: <!--제 2017-고양덕양구-0076호-->';
	output+='					</p>';
	output+='				</div>';
	output+='				<div class="footer-bottom" align="left">';
	output+='					<p style="font-size: 12px;">';
	output+='						<b>고객센터</b>';
	output+='					</p>';
	output+='					<p style="font-size: 11px;">';
	output+='						| Tel (031)963-2900 | Fax (031)965-2900 | e-mail: webmaster@mygoyang.com';
	output+='					</p>';
	output+='					<p style="font-size: 11px;">';
	output+='						| 월-금: 오전10시 - 오후 6시 (Break hour: 오후 1시 ~ 오후 2시)';
	output+='					</p>';
	output+='				</div>';
	output+='				<div class="pageTop">';
	output+='					<a href="#" class="pageTop-a">';
	output+='						<img src="/img/main/pageTop.png" width="100">';
	output+='					</a>';
	output+='				</div>';
	output+='			</div>';
	output+='		</footer>';
	output+="	</div>";
	output+="	<script>";
	output+="		$(document).ready(function(){";
	output+="			$.get('/bringHighCategory',function(data){";
	output+="				var output='<li><a href=\"/\">HOME</a></li>';";
	output+="				for(var i=0;i<data.length;i++){";
	output+="					output+='<li><a href=\"/category.html?view=3\">'+data[i].CG_CATEGORY_NM+'</a></li>';";
	output+="				}";
	output+="				$('#menu').append(output);";
	output+="			});";
	output+="			$('#button').click(function(){";
	if(request.param('view')==undefined){
		output+="				$.post('/login',{id:$('#id').val(),password:$('#password').val(),url:'"+request.param('url')+"'},function(data){";
	}
	else{
		output+="				$.post('/login',{id:$('#id').val(),password:$('#password').val(),url:'"+request.param('url')+"&view="+request.param('view')+"'},function(data){";
	}
	output+="					if(data!='fail'){";
	output+="						window.location=data";
	output+="					}else{$('#fail_message').empty().append('아이디 혹은 비밀번호를 확인하세요.');}";
	output+="				});";
	output+="			});";
	output+="		})";
	output+="	</script>";
	output+="</body>";
	output+="</html>";

	response.send(output);
})

app.get('/joinAgree.html',function(request,response){			//회원가입 조약 동의 페이지
	var output='';
	output+='<!DOCTYPE html>';
	output+='<html>';
	output+='<head>';
	output+='	<meta charset="utf-8"/>';
	output+='	<title>쇼핑몰 - 회원가입</title>';
	output+='	<script src="js/jquery-3.1.1.js"></script>';
	output+='	<link rel="stylesheet" type="text/css" charset="utf-8" href="css/join.css" />';
	output+='	<script type="text/javascript" src="js/joinAgree.js"></script>';
	output+='	<script src="js/header.js"></script>';
	output+='	<script src="js/loginCheck.js"></script>';
	output+='	<link rel="stylesheet" type="text/css" charset="utf-8" href="css/main.css" />';
	output+='	<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>';
	if(request.param('view')==undefined){
		output+='	<script type="text/javascript">var preUrl="'+request.param('url')+'";</script>';		//내가 가려했던 페이지 url를 기억하기 위해 변수에 담아둠
	}
	else{
		output+='	<script type="text/javascript">var preUrl="'+request.param('url')+'&view='+request.param('view')+'";</script>';
	}
	output+='</head>';
	output+='<body>';
	output+='	<div id="page-wrapper" align="center">';
	output+='		<div>';
	output+='			<header id="header">';
	output+='				<div class="main-bg isTop">';
	output+='					<div class="main-bg-bar">';
	output+='						<ul class="main-bg-bar-nav">';
	output+='							<li style="border-right: 0;">';
	output+='								<a id="cart_a" href="">장바구니</a>';
	output+='							</li>';
	output+='							<li>';
	output+='								<a href="/service/home">고객센터</a>';
	output+='							</li>';
	output+='							<li>';
	output+='								<a id="myInfo_a" href="">마이페이지</a>';
	output+='							</li>';
	output+='							<li>';
	output+='								<a href="/joinAgree.html">회원가입</a>';
	output+='							</li>';
	output+='							<li>';
	output+='								<a id="login_a" href="">로그인</a>';
	output+='							</li>';
	output+='						</ul>';
	output+='					</div>';
	output+='					<div class="main-bg-header">';
	output+='						<div class="main-bg-header-container">';
	output+='							<a href="/" class="main-bg-header-container-logo">';
	output+='								<div style="font-family: \'Yoon_러브레터M\';font-size: 40px;font-weight: lighter;">마을마켓</div>';
	output+='								<div style="font-family: \'Yoon_러브레터M\';font-size: 180px;font-weight: lighter;margin-top: -85px;height: 80px;margin-left: 30px;">소소</div>';
	output+='							</a>';
	output+='							<div id="magnifier" align="right" style="margin-top: 10px;">';
	output+='								<span style="border: 1px solid #ddd;padding: 0px 5px;">';
	output+='									<img src="img/main/magnifier.png" width="14" height="14">';
	output+='									<input type="text" name="search" style="border: none;font-size: 15px;margin-left: 2px;">';
	output+='								</span>';
	output+='							</div>';
	output+='							<div class="main-bg-header-container-catchcopy">';
	output+='								<font style="vertical-align: inherit;">';
	output+='									상품 하나하나에 이웃의 이야기와 자부심이 있습니다.';
	output+='								</font>';
	output+='								<br>';
	output+='							</div>';
	output+='							<div style="text-align: left;">';
	output+='								<a href="./" class="main-bg-header-container-home"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">홈</font></font></a>';
	output+='								<div class="main-bg-header-container-nav">';
	output+='									<dl class="main-bg-header-container-nav-list">';
	output+='										<font style="vertical-align: inherit;">';
	output+='											<a href="/category.html?high_num=1&view=2">식품</a>';
	output+='										</font>';
	output+='									</dl>';
	output+='									<dl class="main-bg-header-container-nav-list">';
	output+='										<font style="vertical-align: inherit;">';
	output+='											<a href="/category.html?high_num=2&view=2">생활</a>';
	output+='										</font>';
	output+='									</dl>';
	output+='									<dl class="main-bg-header-container-nav-list">';
	output+='										<font style="vertical-align: inherit;">';
	output+='											기획';
	output+='										</font>';
	output+='									</dl>';
	output+='									<dl class="main-bg-header-container-nav-list">';
	output+='										<font style="vertical-align: inherit;">';
	output+='											<a href="/news_list">마마톡</a>';
	output+='										</font>';
	output+='									</dl>';
	output+='									<dl class="main-bg-header-container-nav-list" style="border-right: 0px;">';
	output+='										<font style="vertical-align: inherit;">';
	output+='											이웃마을';
	output+='										</font>';
	output+='									</dl>';
	output+='								</div>';
	output+='							</div>';
	output+='						</div>';
	output+='					</div>';
	output+='				</div>';
	output+='			</header>';
	output+='			<div id = "container" align="center">';
	output+='				<div style="width:730px;">';
	output+='					<div align="left"><div style="font-weight:bold;font-size:50px;width:120px;float:left;height:70px;">JOIN</div><div style="font-size:14px;color:rgb(154,154,154);margin:25px 10px 25px 10px;width:100px;height:20px;float:left;">회원가입</div></div>';
	output+='					<div style="padding-top:90px;width:100%;padding-bottom:5px;border-bottom:2px solid black;" align="left">';
	output+='						<span style="font-size:13px;font-weight:bold;">회원약관</span>';
	output+='						<span style="font-size:11px;color:rgb(154,154,154);">회원 가입을 하기 전에 <span style="font-weight:bold;color:rgb(81,81,81);">회원약관</span>을 읽어보시기 바랍니다.</span>';
	output+='					</div>';
	output+='					<div style="padding:10px 0px 10px 0px;border-bottom:1px solid rgb(204,204,204);">';						//밑에 흰글씨 부분은 회원가입 조약부분임
	output+='						<div style="width:99%;border:0px;height:600px;overflow-y:scroll;text-align:left;"><p class="0"><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;font-size:11.0pt;">GOYANG </span><span style="mso-fareast-font-family:함초롬바탕;font-size:11.0pt;">마을마켓</span><span lang="EN-US" style="font-family:함초롬바탕;"> </span>이용약관</p><p class="0" style="line-height:120%;mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;"><span style="font-family:굴림;"><!--[if !supportEmptyParas]-->&nbsp;<!--[endif]--><o:p></o:p></span></p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">1</span>조<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>목적<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span><br> <br> 이 약관은 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;font-size:11.0pt;">GOYANG </span><span style="mso-fareast-font-family:함초롬바탕;font-size:11.0pt;color:">마을마켓</span><span lang="EN-US" style="font-family:함초롬바탕;"> </span>회사<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>전자상거래 사업자<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span>가 운영하는 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;font-size:11.0pt;color:">GOYANG </span><span style="mso-fareast-font-family:함초롬바탕;font-size:11.0pt;color:">마을마켓 </span>사이버 몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>이하 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이라 한다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span>에서 제공하는 인터넷 관련 서비스<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>이하 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>서비스<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>라 한다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span>를 이용함에 있어 사이버 몰과 이용자의 권리<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span>의무 및 책임사항을 규정함을 목적으로 합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span></p><p class="0"><span style="font-family:함초롬바탕;"><!--[if !supportEmptyParas]-->&nbsp;<!--[endif]--><o:p></o:p></span></p><p class="0"><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">※「</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">PC</span>통신<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">」</span><br> <br> 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">2</span>조<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>정의<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span><br> <br> <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">① </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이란 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;font-size:11.0pt;">GOYANG </span><span style="mso-fareast-font-family:함초롬바탕;font-size:11.0pt;">마을마켓</span><span lang="EN-US" style="font-family:함초롬바탕;"> </span>회사가 재화 또는 용역<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>이하 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>재화 등<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">” </span>이라 함<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span>을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">② </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>이용자<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>란 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>에 접속하여 이 약관에 따라 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 제공하는 서비스를 받는 회원 및 비회원을 말합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">③ </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">‘</span>회원<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">’</span>이라 함은 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>에 회원등록을 한 자로서<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>계속적으로 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 제공하는 서비스를 이용할 수 있는 자를 말합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">④ </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">‘</span>비회원<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">’</span>이라 함은 회원에 가입하지 않고 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 제공하는 서비스를 이용하는 자를 말합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span><br> <br> 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3</span>조 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>약관 등의 명시와 설명 및 개정<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">) </span><br> <br> <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">① </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span><span style="mso-fareast-font-family:함초롬바탕;">몰</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span><span style="mso-fareast-font-family:함초롬바탕;">은 이 약관의 내용과 상호 및 대표자 성명</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span><span style="mso-fareast-font-family:함초롬바탕;">영업소 소재지 주소</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span><span style="mso-fareast-font-family:함초롬바탕;">소비자의 불만을 처리할 수 있는 곳의 주소를 포함</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">), </span><span style="mso-fareast-font-family:함초롬바탕;">전화번호</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span><span style="mso-fareast-font-family:함초롬바탕;">모사전송번호</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span><span style="mso-fareast-font-family:함초롬바탕;">전자우편주소</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span><span style="mso-fareast-font-family:함초롬바탕;">사업자등록번호</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span><span style="mso-fareast-font-family:함초롬바탕;">통신판매업 신고번호</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span><span style="mso-fareast-font-family:함초롬바탕;">개인정보관리책임자 등을 이용자가 쉽게 알 수 있도록 </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;font-size:11.0pt;">GOYANG </span><span style="mso-fareast-font-family:함초롬바탕;font-size:11.0pt;">마을마켓</span><span lang="EN-US" style="font-family:함초롬바탕;"> </span><span style="mso-fareast-font-family:함초롬바탕;">사이버몰의 초기 서비스화면</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span><span style="mso-fareast-font-family:함초롬바탕;">전면</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span><span style="mso-fareast-font-family:함초롬바탕;">에 게시합니다</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>다만<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">② </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span><span style="mso-fareast-font-family:함초롬바탕;">몰은 이용자가 약관에 동의하기에 앞서 약관에 정하여져 있는 내용 중 청약철회</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span><span style="mso-fareast-font-family:함초롬바탕;">배송책임</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span><span style="mso-fareast-font-family:함초롬바탕;">환불조건 등과 같은 중요한 내용을 이용자가 이해할 수 있도록 별도의 연결화면 또는 팝업화면 등을 제공하여 이용자의 확인을 구하여야 합니다</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">③ </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">「</span>전자상거래 등에서의 소비자보호에 관한 법률<span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">」</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">「</span>약관의 규제에 관한 법률<span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">」</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">「</span>전자문서 및 전자거래기본법<span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">」</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">「</span>전자금융거래법<span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">」</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">「</span>전자서명법<span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">」</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">「</span>정보통신망 이용촉진 및 정보보호 등에 관한 법률<span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">」</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">「</span>방문판매 등에 관한 법률<span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">」</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">「</span>소비자기본법<span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">」 </span>등 관련 법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">④ </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 몰의 초기화면에 그 적용일자 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">7</span>일 이전부터 적용일자 전일까지 공지합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>다만<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">30</span>일 이상의 사전 유예기간을 두고 공지합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>이 경우 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">"</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>은 개정 전 내용과 개정 후 내용을 명확하게 비교하여 이용자가 알기 쉽도록 표시합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">⑤ </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 체결되는 계약에만 적용되고 그 이전에 이미 체결된 계약에 대해서는 개정 전의 약관조항이 그대로 적용됩니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>다만 이미 계약을 체결한 이용자가 개정약관 조항의 적용을 받기를 원하는 뜻을 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3</span>항에 의한 개정약관의 공지기간 내에 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>에 송신하여 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>의 동의를 받은 경우에는 개정약관 조항이 적용됩니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">⑥ </span>이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래 등에서의 소비자보호에 관한 법률<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>약관의 규제 등에 관한 법률<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>공정거래위원회가 정하는 <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">「</span>전자상거래 등에서의 소비자 보호지침<span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">」 </span>및 관계법령 또는 상관례에 따릅니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span><br> <br> 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">4</span>조<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>서비스의 제공 및 변경<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">) </span><br> <br> <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">① </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 다음과 같은 업무를 수행합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. 1. </span>재화 또는 용역에 대한 정보 제공 및 구매계약의 체결 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">2. </span>구매계약이 체결된 재화 또는 용역의 배송 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3. </span>기타 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 정하는 업무 <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">② </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 재화 또는 용역의 품절 또는 기술적 사양의 변경 등의 경우에는 장차 체결되는 계약에 의해 제공할 재화 또는 용역의 내용을 변경할 수 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>이 경우에는 변경된 재화 또는 용역의 내용 및 제공일자를 명시하여 현재의 재화 또는 용역의 내용을 게시한 곳에 즉시 공지합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">③ </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 제공하기로 이용자와 계약을 체결한 서비스의 내용을 재화 등의 품절 또는 기술적 사양의 변경 등의 사유로 변경할 경우에는 그 사유를 이용자에게 통지 가능한 주소로 즉시 통지합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">④ </span>전항의 경우 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 이로 인하여 이용자가 입은 손해를 배상합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>다만<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, “</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span><br> <br> 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">5</span>조<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>서비스의 중단<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span><br> <br> <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">① </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 컴퓨터 등 정보통신설비의 보수점검<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span>교체 및 고장<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">② </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">1</span>항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3</span>자가 입은 손해에 대하여 배상합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>단<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, “</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 고의 또는 과실이 없음을 입증하는 경우에는 그러하지 아니합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">③ </span>사업종목의 전환<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>사업의 포기<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>업체 간의 통합 등의 이유로 서비스를 제공할 수 없게 되는 경우에는 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">8</span>조에 정한 방법으로 이용자에게 통지하고 당초 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>에서 제시한 조건에 따라 소비자에게 보상합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>다만<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, “</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 보상기준 등을 고지하지 아니한 경우에는 이용자들의 마일리지 또는 적립금 등을 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>에서 통용되는 통화가치에 상응하는 현물 또는 현금으로 이용자에게 지급합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span><br> <br> 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">6</span>조<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>회원가입<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">) </span><br> <br> <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">① </span>이용자는 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">② </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">1</span>항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. 1. </span>가입신청자가 이 약관 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">7</span>조제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3</span>항에 의하여 이전에 회원자격을 상실한 적이 있는 경우<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>다만 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">7</span>조제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3</span>항에 의한 회원자격 상실 후 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3</span>년이 경과한 자로서 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>의 회원재가입 승낙을 얻은 경우에는 예외로 한다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. 2. </span>등록 내용에 허위<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>기재누락<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>오기가 있는 경우 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3. </span>기타 회원으로 등록하는 것이 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>의 기술상 현저히 지장이 있다고 판단되는 경우 <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">③ </span>회원가입계약의 성립 시기는 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>의 승낙이 회원에게 도달한 시점으로 합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">④ </span>회원은 회원가입 시 등록한 사항에 변경이 있는 경우<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>상당한 기간 이내에 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>에 대하여 회원정보 수정 등의 방법으로 그 변경사항을 알려야 합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span><br> <br> 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">7</span>조<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>회원 탈퇴 및 자격 상실 등<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">) </span><br> <br> <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">① </span>회원은 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>에 언제든지 탈퇴를 요청할 수 있으며 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 즉시 회원탈퇴를 처리합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">② </span>회원이 다음 각 호의 사유에 해당하는 경우<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, “</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 회원자격을 제한 및 정지시킬 수 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. 1. </span>가입 신청 시에 허위 내용을 등록한 경우 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">2. “</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>을 이용하여 구입한 재화 등의 대금<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>기타 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이용에 관련하여 회원이 부담하는 채무를 기일에 지급하지 않는 경우 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3. </span>다른 사람의 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">” </span>이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를 위협하는 경우 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">4. “</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>을 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우 <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">③ </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 회원 자격을 제한<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span>정지 시킨 후<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>동일한 행위가 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">2</span>회 이상 반복되거나 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">30</span>일 이내에 그 사유가 시정되지 아니하는 경우 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 회원자격을 상실시킬 수 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">④ </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 회원자격을 상실시키는 경우에는 회원등록을 말소합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>이 경우 회원에게 이를 통지하고<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>회원등록 말소 전에 최소한 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">30</span>일 이상의 기간을 정하여 소명할 기회를 부여합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span><br> <br> 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">8</span>조<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>회원에 대한 통지<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span><br> <br> <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">① </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 회원에 대한 통지를 하는 경우<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>회원이 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>과 미리 약정하여 지정한 전자우편 주소로 할 수 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">② </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 불특정다수 회원에 대한 통지의 경우 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">1</span>주일이상 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">” </span>게시판에 게시함으로서 개별 통지에 갈음할 수 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>다만<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 개별통지를 합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span><br> <br> 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">9</span>조<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>구매신청<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span><br> <br> <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">① </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이용자는 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>상에서 다음 또는 이와 유사한 방법에 의하여 구매를 신청하며<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, “</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 이용자가 구매신청을 함에 있어서 다음의 각 내용을 알기 쉽게 제공하여야 합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. 1. </span>재화등의 검색 및 선택 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">2. </span>성명<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>주소<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>전화번호<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>전자우편주소<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>또는 이동전화번호<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">) </span>등의 입력 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3. </span>약관내용<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>청약철회권이 제한되는 서비스<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>배송료<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span>설치비 등의 비용부담과 관련한 내용에 대한 확인 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">4. </span>이 약관에 동의하고 위 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3.</span>호의 사항을 확인하거나 거부하는 표시 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">5. </span>재화등의 구매신청 및 이에 관한 확인 또는 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>의 확인에 대한 동의 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">6. </span>결제방법의 선택 <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">② </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3</span>자에게 구매자 개인정보를 제공<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span>위탁할 필요가 있는 경우 실제 구매신청 시 구매자의 동의를 받아야 하며<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>회원가입 시 미리 포괄적으로 동의를 받지 않습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>이 때 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 제공되는 개인정보 항목<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>제공받는 자<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>제공받는 자의 개인정보 이용 목적 및 보유<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span>이용 기간 등을 구매자에게 명시하여야 합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>다만 <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">「</span>정보통신망이용촉진 및 정보보호 등에 관한 법률<span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">」 </span>제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">25</span>조 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">1</span>항에 의한 개인정보 취급위탁의 경우 등 관련 법령에 달리 정함이 있는 경우에는 그에 따릅니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span><br> <br> 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">10</span>조 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>계약의 성립<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span><br> <br> <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">① </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">9</span>조와 같은 구매신청에 대하여 다음 각 호에 해당하면 승낙하지 않을 수 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>다만<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>미성년자와 계약을 체결하는 경우에는 법정대리인의 동의를 얻지 못하면 미성년자 본인 또는 법정대리인이 계약을 취소할 수 있다는 내용을 고지하여야 합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. 1. </span>신청 내용에 허위<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>기재누락<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>오기가 있는 경우 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">2. </span>미성년자가 담배<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>주류 등 청소년보호법에서 금지하는 재화 및 용역을 구매하는 경우 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3. </span>기타 구매신청에 승낙하는 것이 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">” </span>기술상 현저히 지장이 있다고 판단하는 경우 <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">② </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>의 승낙이 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">12</span>조제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">1</span>항의 수신확인통지형태로 이용자에게 도달한 시점에 계약이 성립한 것으로 봅니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">③ </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>의 승낙의 의사표시에는 이용자의 구매 신청에 대한 확인 및 판매가능 여부<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>구매신청의 정정 취소 등에 관한 정보 등을 포함하여야 합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span><br> <br> 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">11</span>조<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>지급방법<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span><br> <br> <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>에서 구매한 재화 또는 용역에 대한 대금지급방법은 다음 각 호의 방법중 가용한 방법으로 할 수 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>단<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, “</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 이용자의 지급방법에 대하여 재화 등의 대금에 어떠한 명목의 수수료도 추가하여 징수할 수 없습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span><br> <br> <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">1. </span>폰뱅킹<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>인터넷뱅킹<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>메일 뱅킹 등의 각종 계좌이체 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">2. </span>선불카드<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>직불카드<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>신용카드 등의 각종 카드 결제 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3. </span>온라인무통장입금 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">4. </span>전자화폐에 의한 결제 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">5. </span>수령 시 대금지급 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">6. </span>마일리지 등 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 지급한 포인트에 의한 결제 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">7. “</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>과 계약을 맺었거나 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 인정한 상품권에 의한 결제 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">8. </span>기타 전자적 지급 방법에 의한 대금 지급 등<br> <br> <span lang="EN-US" style="font-family:함초롬바탕;"> 제</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">12</span>조<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>수신확인통지<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span>구매신청 변경 및 취소<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span><br> <br> <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">① </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 이용자의 구매신청이 있는 경우 이용자에게 수신확인통지를 합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">② </span>수신확인통지를 받은 이용자는 의사표시의 불일치 등이 있는 경우에는 수신확인통지를 받은 후 즉시 구매신청 변경 및 취소를 요청할 수 있고 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 배송 전에 이용자의 요청이 있는 경우에는 지체 없이 그 요청에 따라 처리하여야 합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>다만 이미 대금을 지불한 경우에는 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">15</span>조의 청약철회 등에 관한 규정에 따릅니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">13</span>조<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>재화 등의 공급<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span><br> <br> <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">① </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 이용자와 재화 등의 공급시기에 관하여 별도의 약정이 없는 이상<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>이용자가 청약을 한 날부터 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">7</span>일 이내에 재화 등을 배송할 수 있도록 주문제작<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>포장 등 기타의 필요한 조치를 취합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>다만<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, “</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 이미 재화 등의 대금의 전부 또는 일부를 받은 경우에는 대금의 전부 또는 일부를 받은 날부터 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3</span>영업일 이내에 조치를 취합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>이때 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 이용자가 재화 등의 공급 절차 및 진행 사항을 확인할 수 있도록 적절한 조치를 합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">② </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 이용자가 구매한 재화에 대해 배송수단<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>수단별 배송비용 부담자<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>수단별 배송기간 등을 명시합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>만약 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 약정 배송기간을 초과한 경우에는 그로 인한 이용자의 손해를 배상하여야 합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>다만 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 고의<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span>과실이 없음을 입증한 경우에는 그러하지 아니합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">14</span>조<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>환급<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">) “</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 이용자가 구매신청한 재화 등이 품절 등의 사유로 인도 또는 제공을 할 수 없을 때에는 지체 없이 그 사유를 이용자에게 통지하고 사전에 재화 등의 대금을 받은 경우에는 대금을 받은 날부터 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3</span>영업일 이내에 환급하거나 환급에 필요한 조치를 취합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span><br> <br> 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">15</span>조<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>청약철회 등<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span><br> <br> <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">① </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>과 재화등의 구매에 관한 계약을 체결한 이용자는 <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">「</span>전자상거래 등에서의 소비자보호에 관한 법률<span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">」 </span>제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">13</span>조 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">2</span>항에 따른 계약내용에 관한 서면을 받은 날<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>그 서면을 받은 때보다 재화 등의 공급이 늦게 이루어진 경우에는 재화 등을 공급받거나 재화 등의 공급이 시작된 날을 말합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span>부터 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">7</span>일 이내에는 청약의 철회를 할 수 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>다만<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>청약철회에 관하여 <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">「</span>전자상거래 등에서의 소비자보호에 관한 법률<span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">」</span>에 달리 정함이 있는 경우에는 동 법 규정에 따릅니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">② </span>이용자는 재화 등을 배송 받은 경우 다음 각 호의 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">1</span>에 해당하는 경우에는 반품 및 교환을 할 수 없습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. 1. </span>이용자에게 책임 있는 사유로 재화 등이 멸실 또는 훼손된 경우<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>다만<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>재화 등의 내용을 확인하기 위하여 포장 등을 훼손한 경우에는 청약철회를 할 수 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">) 2. </span>이용자의 사용 또는 일부 소비에 의하여 재화 등의 가치가 현저히 감소한 경우 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3. </span>시간의 경과에 의하여 재판매가 곤란할 정도로 재화등의 가치가 현저히 감소한 경우 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">4. </span>같은 성능을 지닌 재화 등으로 복제가 가능한 경우 그 원본인 재화 등의 포장을 훼손한 경우 <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">③ </span>제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">2</span>항제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">2</span>호 내지 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">4</span>호의 경우에 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 사전에 청약철회 등이 제한되는 사실을 소비자가 쉽게 알 수 있는 곳에 명기하거나 시용상품을 제공하는 등의 조치를 하지 않았다면 이용자의 청약철회 등이 제한되지 않습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">④ </span>이용자는 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">1</span>항 및 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">2</span>항의 규정에 불구하고 재화 등의 내용이 표시<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span>광고 내용과 다르거나 계약내용과 다르게 이행된 때에는 당해 재화 등을 공급받은 날부터 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3</span>월 이내<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>그 사실을 안 날 또는 알 수 있었던 날부터 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">30</span>일 이내에 청약철회 등을 할 수 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span><br> <br> 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">16</span>조<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>청약철회 등의 효과<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span><br> <br> <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">① </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 이용자로부터 재화 등을 반환받은 경우 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3</span>영업일 이내에 이미 지급받은 재화 등의 대금을 환급합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>이 경우 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 이용자에게 재화등의 환급을 지연한때에는 그 지연기간에 대하여 <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">「</span>전자상거래 등에서의 소비자보호에 관한 법률 시행령<span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">」</span>제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">21</span>조의<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">2</span>에서 정하는 지연이자율을 곱하여 산정한 지연이자를 지급합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">② </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 위 대금을 환급함에 있어서 이용자가 신용카드 또는 전자화폐 등의 결제수단으로 재화 등의 대금을 지급한 때에는 지체 없이 당해 결제수단을 제공한 사업자로 하여금 재화 등의 대금의 청구를 정지 또는 취소하도록 요청합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">③ </span>청약철회 등의 경우 공급받은 재화 등의 반환에 필요한 비용은 이용자가 부담합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. “</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 이용자에게 청약철회 등을 이유로 위약금 또는 손해배상을 청구하지 않습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>다만 재화 등의 내용이 표시<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span>광고 내용과 다르거나 계약내용과 다르게 이행되어 청약철회 등을 하는 경우 재화 등의 반환에 필요한 비용은 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 부담합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">④ </span>이용자가 재화 등을 제공받을 때 발송비를 부담한 경우에 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 청약철회 시 그 비용을 누가 부담하는지를 이용자가 알기 쉽도록 명확하게 표시합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span><br> <br> 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">17</span>조<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>개인정보보호<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span><br> <br> <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">① </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 이용자의 개인정보 수집시 서비스제공을 위하여 필요한 범위에서 최소한의 개인정보를 수집합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">② </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 회원가입시 구매계약이행에 필요한 정보를 미리 수집하지 않습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>다만<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>관련 법령상 의무이행을 위하여 구매계약 이전에 본인확인이 필요한 경우로서 최소한의 특정 개인정보를 수집하는 경우에는 그러하지 아니합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">③ </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 이용자의 개인정보를 수집<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span>이용하는 때에는 당해 이용자에게 그 목적을 고지하고 동의를 받습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">④ </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 수집된 개인정보를 목적외의 용도로 이용할 수 없으며<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>새로운 이용목적이 발생한 경우 또는 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3</span>자에게 제공하는 경우에는 이용<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span>제공단계에서 당해 이용자에게 그 목적을 고지하고 동의를 받습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>다만<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>관련 법령에 달리 정함이 있는 경우에는 예외로 합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">⑤ </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3</span>항과 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">4</span>항에 의해 이용자의 동의를 받아야 하는 경우에는 개인정보관리 책임자의 신원<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>소속<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>성명 및 전화번호<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>기타 연락처<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">), </span>정보의 수집목적 및 이용목적<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3</span>자에 대한 정보제공 관련사항<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>제공받은자<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>제공목적 및 제공할 정보의 내용<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">) </span>등 <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">「</span>정보통신망 이용촉진 및 정보보호 등에 관한 법률<span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">」 </span>제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">22</span>조제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">2</span>항이 규정한 사항을 미리 명시하거나 고지해야 하며 이용자는 언제든지 이 동의를 철회할 수 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">⑥ </span>이용자는 언제든지 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 가지고 있는 자신의 개인정보에 대해 열람 및 오류정정을 요구할 수 있으며 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 이에 대해 지체 없이 필요한 조치를 취할 의무를 집니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>이용자가 오류의 정정을 요구한 경우에는 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 그 오류를 정정할 때까지 당해 개인정보를 이용하지 않습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">⑦ </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 개인정보 보호를 위하여 이용자의 개인정보를 취급하는 자를 최소한으로 제한하여야 하며 신용카드<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>은행계좌 등을 포함한 이용자의 개인정보의 분실<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>도난<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>유출<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>동의 없는 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3</span>자 제공<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>변조 등으로 인한 이용자의 손해에 대하여 모든 책임을 집니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">⑧ </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">” </span>또는 그로부터 개인정보를 제공받은 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3</span>자는 개인정보의 수집목적 또는 제공받은 목적을 달성한 때에는 당해 개인정보를 지체 없이 파기합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">⑨ </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 개인정보의 수집<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span>이용<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span>제공에 관한 동의란을 미리 선택한 것으로 설정해두지 않습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>또한 개인정보의 수집<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span>이용<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span>제공에 관한 이용자의 동의거절시 제한되는 서비스를 구체적으로 명시하고<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>필수수집항목이 아닌 개인정보의 수집<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span>이용<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span>제공에 관한 이용자의 동의 거절을 이유로 회원가입 등 서비스 제공을 제한하거나 거절하지 않습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span><br> <br> 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">18</span>조<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>의 의무<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span><br> <br> <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">① </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 이 약관이 정하는 바에 따라 지속적이고<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>안정적으로 재화<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span>용역을 제공하는데 최선을 다하여야 합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">② </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의 개인정보<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>신용정보 포함<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span>보호를 위한 보안 시스템을 갖추어야 합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">③ </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 상품이나 용역에 대하여 <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">「</span>표시<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span>광고의 공정화에 관한 법률<span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">」 </span>제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3</span>조 소정의 부당한 표시<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span>광고행위를 함으로써 이용자가 손해를 입은 때에는 이를 배상할 책임을 집니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">④ </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 이용자가 원하지 않는 영리목적의 광고성 전자우편을 발송하지 않습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span><br> <br> 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">19</span>조<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>회원의 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">ID </span>및 비밀번호에 대한 의무<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span><br> <br> <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">① </span>제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">17</span>조의 경우를 제외한 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">ID</span>와 비밀번호에 관한 관리책임은 회원에게 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">② </span>회원은 자신의 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">ID </span>및 비밀번호를 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3</span>자에게 이용하게 해서는 안됩니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">③ </span>회원이 자신의 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">ID </span>및 비밀번호를 도난당하거나 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3</span>자가 사용하고 있음을 인지한 경우에는 바로 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>에 통보하고 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>의 안내가 있는 경우에는 그에 따라야 합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span><br> <br> 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">20</span>조<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>이용자의 의무<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">) </span>이용자는 다음 행위를 하여서는 안 됩니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span><br> <br> <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">1. </span>신청 또는 변경 시 허위 내용의 등록 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">2. </span>타인의 정보 도용 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3. “</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>에 게시된 정보의 변경 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">4. “</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 정한 정보 이외의 정보<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>컴퓨터 프로그램 등<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">) </span>등의 송신 또는 게시 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">5. “</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">” </span>기타 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3</span>자의 저작권 등 지적재산권에 대한 침해 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">6. “</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">” </span>기타 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3</span>자의 명예를 손상시키거나 업무를 방해하는 행위 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">7. </span>외설 또는 폭력적인 메시지<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>화상<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>음성<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>기타 공서양속에 반하는 정보를 몰에 공개 또는 게시하는 행위<br> <br> <span lang="EN-US" style="font-family:함초롬바탕;"> 제</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">21</span>조<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>연결<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>과 피연결<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">” </span>간의 관계<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span><br> <br> <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">① </span>상위 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>과 하위 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 하이퍼링크<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>예<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">: </span>하이퍼링크의 대상에는 문자<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>그림 및 동화상 등이 포함됨<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span>방식 등으로 연결된 경우<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>전자를 연결 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”(</span>웹 사이트<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span>이라고 하고 후자를 피연결 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”(</span>웹사이트<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span>이라고 합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">② </span>연결<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 피연결<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>이 독자적으로 제공하는 재화 등에 의하여 이용자와 행하는 거래에 대해서 보증 책임을 지지 않는다는 뜻을 연결<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>의 초기화면 또는 연결되는 시점의 팝업화면으로 명시한 경우에는 그 거래에 대한 보증 책임을 지지 않습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span><br> <br> 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">22</span>조<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>저작권의 귀속 및 이용제한<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span><br> <br> <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">① </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>이 작성한 저작물에 대한 저작권 기타 지적재산권은 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>에 귀속합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">② </span>이용자는 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>을 이용함으로써 얻은 정보 중 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>에게 지적재산권이 귀속된 정보를 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>의 사전 승낙 없이 복제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>송신<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>출판<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>배포<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>방송 기타 방법에 의하여 영리목적으로 이용하거나 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">3</span>자에게 이용하게 하여서는 안 됩니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">③ </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 약정에 따라 이용자에게 귀속된 저작권을 사용하는 경우 당해 이용자에게 통보하여야 합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span><br> <br> 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">23</span>조<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>분쟁해결<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span><br> <br> <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">① </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 이용자가 제기하는 정당한 의견이나 불만을 반영하고 그 피해를 보상처리하기 위하여 피해 보상처리 기구를 설치<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span>운영합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">② </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>은 이용자로부터 제출되는 불만사항 및 의견은 우선적으로 그 사항을 처리합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>다만<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>신속한 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 즉시 통보해 드립니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">③ </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>과 이용자 간에 발생한 전자상거래 분쟁과 관련하여 이용자의 피해구제신청이 있는 경우에는 공정거래위원회 또는 시<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">·</span>도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span><br> <br> 제<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">24</span>조<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>재판권 및 준거법<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span><br> <br> <span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">① </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>과 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 제소 당시의 이용자의 주소에 의하고<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>주소가 없는 경우에는 거소를 관할하는 지방법원의 전속관할로 합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>다만<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>제소 당시 이용자의 주소 또는 거소가 분명하지 않거나 외국 거주자의 경우에는 민사소송법상의 관할법원에 제기합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">② </span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">“</span>몰<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">”</span>과 이용자 간에 제기된 전자상거래 소송에는 한국법을 적용합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.&nbsp;</span></p></div>';
	output+='					</div>';
	output+='					<div style="font-size:12px;color:rgb(40,40,40);margin-top:20px;">';
	output+='						<label style="cursor:pointer;"><input id="memberAgree" type="radio" name="memberAgree" value="agree">약관에 동의합니다.</label>';
	output+='						<label style="cursor:pointer;margin-left:20px;"><input type="radio" name="memberAgree" value="notAgree" checked>동의하지 않습니다.</label>';
	output+='					</div>';
	output+='					<div style="padding-top:60px;width:100%;padding-bottom:5px;border-bottom:2px solid black;" align="left">';
	output+='						<span style="font-size:13px;font-weight:bold;">개인정보 수집 및 이용에 대한 안내</span>';
	output+='					</div>';
	output+='					<div style="padding:10px 0px 10px 0px;border-bottom:1px solid rgb(204,204,204);">';
	output+='						<div style="width:99%;border:0px;height:600px;overflow-y:scroll;text-align:left;"><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;font-size:11.0pt;"><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;font-size:11.0pt;">GOYANG </span><span style="mso-fareast-font-family:함초롬바탕;font-size:11.0pt;">마을마켓</span><span lang="EN-US" style="font-family:함초롬바탕;font-size:11.0pt;"> </span><span style="mso-fareast-font-family:함초롬바탕;font-size:11.0pt;">개인정보 취급방침</span></p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;font-size:1.0pt;"><span style="font-family:함초롬바탕;font-size:1.0pt;"><!--[if !supportEmptyParas]-->&nbsp;</span></p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;"><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;font-size:11.0pt;">GOYANG </span><span style="mso-fareast-font-family:함초롬바탕;">마을마켓</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>이하 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">"</span>회사<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">"</span>라 함<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span>는 회사가 운영하는 <span style="mso-fareast-font-family:함초롬바탕;">온라인쇼핑몰 사이트</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>이하 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">"</span>사이트<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">"</span>라 함<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span>를 이용하는 이용자들의 개인정보보호를 매우 중요시하며<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>이용자가 회사의 웹서비스<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>이하 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">"</span>서비스<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">"</span>라 함<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span>를 이용함과 동시에 온라인상에서 회사에 제공한 개인정보가 보호 받을 수 있도록 최선을 다하고 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>이에 회사는 통신비밀보호법<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>전기통신사업법<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>정보통신망이용촉진등에관한법률 등 정보통신서비스제공자가 준수하여야 할 관련 법규상의 개인정보보호 규정 및 정보통신부가 제정한 개인정보보호지침을 준수하고 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>회사는 개인정보 보호정책을 통하여 이용자들이 제공하는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span></p><p class="0"><span style="font-family:함초롬바탕;"><!--[if !supportEmptyParas]-->&nbsp;<!--[endif]--><o:p></o:p></span></p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">회사는 <span style="mso-fareast-font-family:함초롬바탕;c">개인정보 보호정책을 사이트</span><span lang="EN-US" style="font-family:함초롬바탕;"> </span>첫 화면에 공개함으로써 이용자들이 언제나 용이하게 보실 수 있도록 조치하고 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span></p><p class="0"><span style="font-family:함초롬바탕;"><!--[if !supportEmptyParas]-->&nbsp;<!--[endif]--><o:p></o:p></span></p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">회사의 개인정보 보호정책은 정부의 법률 및 지침 변경이나 회사의 내부 방침 변경 등으로 인하여 수시로 변경될 수 있고<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>이에 따른 개인정보 보호정책의 지속적인 개선을 위하여 필요한 절차를 정하고 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>그리고 개인정보 보호정책을 개정하는 경우 회사는 그 변경사항에 대하여 즉시 사이트를 통하여 게시하고 버전번호 및 개정일자 등을 부여하여 개정된 사항을 이용자들이 쉽게 알아볼 수 있도록 하고 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>이용자들께서는 사이트 방문 시 수시로 확인하시기 바랍니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span></p><p class="0"><span style="font-family:함초롬바탕;"><!--[if !supportEmptyParas]-->&nbsp;<!--[endif]--><o:p></o:p></span></p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">회사의 개인정보 보호정책은 다음과 같은 내용을 담고 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span></p><p class="0"><span style="font-family:함초롬바탕;"><!--[if !supportEmptyParas]-->&nbsp;<!--[endif]--><o:p></o:p></span></p><p class="0"><span lang="EN-US" style="font-family:함초롬바탕;"> </span>가<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>개인정보 수집에 대한 동의</p><p class="0"><span lang="EN-US" style="font-family:함초롬바탕;"> </span>나<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>개인정보의 수집목적 및 이용목적</p><p class="0"><span lang="EN-US" style="font-family:함초롬바탕;"> </span>다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>개인정보 항목 및 수집방법</p><p class="0"><span lang="EN-US" style="font-family:함초롬바탕;"> </span>라<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>개인정보의 보유 및 이용기간</p><p class="0"><span lang="EN-US" style="font-family:함초롬바탕;"> </span>마<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>이용자 자신의 개인정보 관리<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>열람<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>정정<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>삭제 등<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span>에 관한 사항</p><p class="0"><span lang="EN-US" style="font-family:함초롬바탕;"> </span>바<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>쿠키<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(cookie)</span>의 운영에 관한 사항</p><p class="0"><span lang="EN-US" style="font-family:함초롬바탕;"> </span>사<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>개인정보관련 기술적<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">-</span>관리적 대책</p><p class="0"><span style="font-family:함초롬바탕;"><!--[if !supportEmptyParas]-->&nbsp;<!--[endif]--><o:p></o:p></span></p><p class="0"><span style="font-family:함초롬바탕;"><!--[if !supportEmptyParas]-->&nbsp;<!--[endif]--><o:p></o:p></span></p><p class="0"><span lang="EN-US" style="font-family:함초롬바탕;"> </span>가<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>개인정보 수집에 대한 동의 </p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;"><span lang="EN-US" style="font-family:함초롬바탕;"> </span>회사는 이용자들이 회사의 <span style="mso-fareast-font-family:함초롬바탕;">개인정보 보호정책 또는 이용약관의 내용에 대하여 </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">「</span><span style="mso-fareast-font-family:함초롬바탕;">동의함</span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">」</span><span style="mso-fareast-font-family:함초롬바탕;">버튼 또는 </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">「</span><span style="mso-fareast-font-family:함초롬바탕;">동의안함</span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">」</span><span style="mso-fareast-font-family:함초롬바탕;">버튼을 클릭할 수 있는 절차를 마련하여</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">,</span><span lang="EN-US" style="font-family:함초롬바탕;"> </span><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">「</span>동의함<span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">」</span>버튼을 클릭하면 개인정보 수집에 대해 동의한 것으로 봅니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span></p><p class="0"><span style="font-family:함초롬바탕;"><!--[if !supportEmptyParas]-->&nbsp;<!--[endif]--><o:p></o:p></span></p><p class="0">나<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>개인정보의 수집목적 및 이용목적 </p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;"><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">"</span>개인정보<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">"</span>라 함은 생존하는 개인에 관한 정보로서 당해 정보에 포함되어 있는 성명<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>주민등록번호 등의 사항에 의하여 당해 개인을 식별할 수 있는 정보<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>당해 정보만으로는 특정 개인을 식별할 수 없더라도 다른 정보와 용이하게 결합하여 식별할 수 있는 것을 포함<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span>를 말합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span></p><p class="0"><span style="font-family:함초롬바탕;"><!--[if !supportEmptyParas]-->&nbsp;<!--[endif]--><o:p></o:p></span></p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">대부분의 회사 서비스는 별도의 사용자 등록이 없이 언제든지 사용할 수 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>그러나 회사는 회원서비스를 통하여 이용자들에게 맞춤식 서비스를 비롯한 보다 더 향상된 양질의 서비스를 제공하기 위하여 이용자 개인의 정보를 수집하고 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span></p><p class="0"><span style="font-family:함초롬바탕;"><!--[if !supportEmptyParas]-->&nbsp;<!--[endif]--><o:p></o:p></span></p><p class="0">다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>개인정보 항목 및 수집방법 </p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;"><span lang="EN-US" style="font-family:함초롬바탕;"> </span>회사는 이용자들이 회원서비스를 이용하기 위해 회원으로 가입하실 때 서비스 제공을 위한 필수적인 정보들을 온라인상에서 입력 받고 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>회원 가입 시에 받는 필수적인 정보는 성명<span lang="EN-US" style="font-family: 함초롬바탕; letter-spacing: 0pt;">, </span>주민등록번호<span lang="EN-US" style="font-family: 함초롬바탕; letter-spacing: 0pt;">, </span>주소<span lang="EN-US" style="font-family: 함초롬바탕; letter-spacing: 0pt;">, </span>전화번호 등입니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>또한 양질의 서비스 제공을 위하여 이용자들이 선택적으로 입력할 수 있는 사항으로서 회사주소<span lang="EN-US" style="font-family: 함초롬바탕; letter-spacing: 0pt;">, </span>회사전화번호<span lang="EN-US" style="font-family: 함초롬바탕; letter-spacing: 0pt;">, </span>직업<span lang="EN-US" style="font-family: 함초롬바탕; letter-spacing: 0pt;">, </span>이메일 주소 및 이메일 수신여부 항목을 입력 받고 있습니다<span lang="EN-US" style="font-family: 함초롬바탕; letter-spacing: 0pt;">.</span></p><p class="0"><span style="font-family:함초롬바탕;"><!--[if !supportEmptyParas]-->&nbsp;<!--[endif]--><o:p></o:p></span></p><p class="0">라<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>개인정보의 보유 및 이용기간 </p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;"><span lang="EN-US" style="font-family:함초롬바탕;"> </span>이용자가 회사의 회원으로서 회사에 제공하는 서비스를 이용하는 동안 회사는 이용자들의 개인정보를 계속적으로 보유하며 서비스 제공 등을 위해 이용합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>다만<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>아래의 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">"</span>마<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>이용자 자신의 개인정보 관리<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>열람<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>정정<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>삭제 등<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span>에 관한 사항<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">" </span>에서 설명한 절차와 방법에 따라 회원 본인이 직접 삭제하거나 수정한 정보<span lang="EN-US" style="font-family: 함초롬바탕; letter-spacing: 0pt;">, </span>가입해지를 요청한 경우에는 재생할 수 없는 방법에 의하여 디스크에서 완전히 삭제하며 추후 열람이나 이용이 불가능한 상태로 처리됩니다<span lang="EN-US" style="font-family: 함초롬바탕; letter-spacing: 0pt;">.</span></p><p class="0"><span style="font-family:함초롬바탕;"><!--[if !supportEmptyParas]-->&nbsp;<!--[endif]--><o:p></o:p></span></p><p class="0">마<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>이용자 자신의 개인정보 관리<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>열람<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>정정<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>삭제 등<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span>에 관한 사항 </p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;"><span lang="EN-US" style="font-family:함초롬바탕;"> </span>이용자는 언제든지 회사 홈페이지를 이용하여 회원 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 회원등록 탈퇴를 요청할 수도 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span></p><p class="0"><span style="font-family:함초롬바탕;"><!--[if !supportEmptyParas]-->&nbsp;<!--[endif]--><o:p></o:p></span></p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">이용자들의 개인정보 조회 및 수정을 위해서는 사이트의 회원관리 메뉴에서 아이디와 비밀번호를 사용하여 로그인<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(LOG-IN)</span>하면 되는데<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>아이디<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(ID) </span>및 주민등록번호<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>이름을 제외한 모든 입력사항을 수정할 수 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>또한<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>비밀번호를 잊어버린 경우에는 회원 로그인 메뉴 하단에 있는 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">"</span><span style="mso-fareast-font-family:함초롬바탕;">패스워드 찾기</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">"</span><span style="mso-fareast-font-family:함초롬바탕;">를 클릭</span>하여 본인 확인에 필요한 사항을 입력하시면<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>본인여부 확인 후 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">email</span>을 통하여 비밀번호를 알려 드립니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span></p><p class="0"><span style="font-family:함초롬바탕;"><!--[if !supportEmptyParas]-->&nbsp;<!--[endif]--><o:p></o:p></span></p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;"><span style="mso-fareast-font-family:함초롬바탕;">회원등록 탈퇴</span>는 사이트에 있는 나의정보에서 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">"</span>회원탈퇴<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">"</span>를 클릭하시면<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>이용자 본인여부를 확인한 후 처리합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span></p><p class="0"><span style="font-family:함초롬바탕;"><!--[if !supportEmptyParas]-->&nbsp;<!--[endif]--><o:p></o:p></span></p><p class="0">바<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span><span style="mso-fareast-font-family:함초롬바탕;">쿠키</span><span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(cookie)</span><span style="mso-fareast-font-family:함초롬바탕;">의 운영에 관한 사항</span><span lang="EN-US" style="font-family:함초롬바탕;"> </span></p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;"><span lang="EN-US" style="font-family:함초롬바탕;"> </span>이용자들에게 특화된 맞춤서비스를 제공하기 위해서 회사는 이용자들의 정보를 저장하고 수시로 불러오는 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">"</span>쿠키<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(cookie)"</span>를 사용합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>쿠키는 웹사이트를 운영하는데 이용되는 서버<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(HTTP)</span>가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">PC </span>컴퓨터내의 하드디스크에 저장되기도 합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span></p><p class="0"><span style="font-family:함초롬바탕;"><!--[if !supportEmptyParas]-->&nbsp;<!--[endif]--><o:p></o:p></span></p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">이용자들이 회사에 접속한 후 로그인<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(LOG-IN)</span>하여 마이페이지<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(My Page) </span>등의 서비스를 이용하기 위해서는 쿠키를 허용하셔야 합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>회사는 이용자들에게 적합하고 보다 유용한 서비스를 제공하기 위해서 쿠키를 이용하여 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">ID</span>에 대한 정보를 찾아냅니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>쿠키는 이용자의 컴퓨터는 식별하지만 이용자를 개인적으로 식별하지는 않습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span></p><p class="0"><span style="font-family:함초롬바탕;"><!--[if !supportEmptyParas]-->&nbsp;<!--[endif]--><o:p></o:p></span></p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">쿠키를 이용하여 이용자들이 방문한 사이트의 각 서비스와 이용형태<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>이용자 규모 등을 파악하여 더욱 더 편리한 서비스를 만들어 제공할 수 있고 이용자에게 최적화된 정보를 제공할 수 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>이용자들은 쿠키에 대하여 사용여부를 선택할 수 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용할 수도 있고<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>쿠키가 저장될 때마다 확인을 거치거나<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>모든 쿠키의 저장을 거부할 수도 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>다만<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>쿠키의 저장을 거부할 경우에는 로그인이 필요한 일부 서비스는 이용할 수 없습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span></p><p class="0"><span style="font-family:함초롬바탕;"><!--[if !supportEmptyParas]-->&nbsp;<!--[endif]--><o:p></o:p></span></p><p class="0">사<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>개인정보관련 기술적<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">-</span>관리적 대책 </p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;"><span lang="EN-US" style="font-family:함초롬바탕;"> </span>회사는 이용자들의 개인정보를 취급함에 있어 개인정보가 분실<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>도난<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>누출<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적 대책을 강구하고 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span></p><p class="0"><span style="font-family:함초롬바탕;"><!--[if !supportEmptyParas]-->&nbsp;<!--[endif]--><o:p></o:p></span></p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">이용자들의 개인정보는 비밀번호에 의해 철저히 보호되고 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>회원 아이디<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(ID)</span>의 비밀번호는 본인만이 알고 있으며<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>개인정보의 확인 및 변경도 비밀번호를 알고 있는 본인에 의해서만 가능합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>따라서 이용자 여러분께서는 비밀번호를 누구에게도 알려주시면 안 됩니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>이를 위해 회사에서는 기본적으로 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">PC</span>에서의 사용을 마치신 후 온라인상에서 로그아웃<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(LOG-OUT)</span>하시고 웹브라우저를 종료하도록 권장합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>특히 다른 사람과 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">PC</span>를 공유하여 사용하거나 공공장소<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>학교<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>도서관<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>인터넷 게임방 등<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span>에서 이용한 경우에는 개인정보가 다른 사람에게 알려지는 것을 막기 위해 위와 같은 절차가 더욱 필요할 것입니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span></p><p class="0"><span style="font-family:함초롬바탕;"><!--[if !supportEmptyParas]-->&nbsp;<!--[endif]--><o:p></o:p></span></p><p class="0">회사는 해킹이나 컴퓨터 바이러스 등에 의해 회원의 개인정보가 유출되거나 훼손되는 것을 막기 위해 최선을 다하고 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>개인정보의 훼손에 대비해서 자료를 수시로 백업하고 있고<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>최신 백신프로그램을 이용하여 이용자들의 개인정보나 자료가 누출되거나 손상되지 않도록 방지하고 있으며<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>암호알고리즘 등을 통하여 네트워크상에서 개인정보를 안전하게 전송할 수 있도록 하고 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. </span>그리고 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있으며<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>기타 시스템적으로 안정성을 확보하기 위한 가능한 모든 기술적 장치를 갖추려 노력하고 있습니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span></p></div>';
	output+='					</div>';
	output+='					<div style="font-size:12px;color:rgb(40,40,40);margin-top:20px;">';
	output+='						<label style="cursor:pointer;"><input id="memberInfoAgree" type="radio" name="memberInfoAgree" value="agree">개인정보 수집 및 이용에 대해 동의합니다.</label>';
	output+='						<label style="cursor:pointer;margin-left:20px;"><input type="radio" name="memberInfoAgree" value="notAgree" checked>동의하지 않습니다.</label>';
	output+='					</div>';
	output+='					<div style="margin-top:60px;">';
	output+='					<button style="width:128px;height:42px;border:0px;background-color:rgb(84,84,84);color:white;font-weight:bold;cursor:pointer;" onclick="agreeFun()">회원가입</button>';
	if(request.param('view')==undefined){
		output+='					<button style="width:128px;height:42px;border:0px;background-color:rgb(204,204,204);color:white;font-weight:bold;margin-left:20px;cursor:pointer;" onclick=\'location.href="/login.html?url='+request.param('url')+'"\'>취소</button>';
	}
	else{
		output+='					<button style="width:128px;height:42px;border:0px;background-color:rgb(204,204,204);color:white;font-weight:bold;margin-left:20px;cursor:pointer;" onclick=\'location.href="/login.html?url='+request.param('url')+'&view='+request.param('view')+'"\'>취소</button>';
	}
	output+='					</div>';
	output+='				</div>';

	output+='			</div>';
	output+='		<footer id="footer" style="margin-top: 0px;">';
	output+='			<div class="footer-container">';
	output+='				<div class="footer-top" align="center">';
	output+='					상품에 대하여 배송, 교환, 반품의 민원 A/S 등은  "다시 뛰는 사람들" 에서 처리하며 모든 책임은 "다시 뛰는 사람들"에 있습니다.​';
	output+='					민원 담당자 : 마을마켓 소소 고객센터 /  연락처 : 031-963-2900';
	output+='				</div>';
	output+='				<div class="footer-mid" align="left">';
	output+='					<p style="font-size: 12px;">';
	output+='						<b>다시 뛰는 사람들</b>';
	output+='					</p>';
	output+='					<p style="font-size: 11px;">';
	output+='						우)10460 경기도 고양시 덕양구 고양시청로 13-2 성광빌딩 4층';
	output+='					</p>';
	output+='					<p style="font-size: 11px;">';
	output+='						| 대표자: 이영아 | 사업자등록번호: 128-86-63160 | 통신판매업신고: <!--제 2017-고양덕양구-0076호-->';
	output+='					</p>';
	output+='				</div>';
	output+='				<div class="footer-bottom" align="left">';
	output+='					<p style="font-size: 12px;">';
	output+='						<b>고객센터</b>';
	output+='					</p>';
	output+='					<p style="font-size: 11px;">';
	output+='						| Tel (031)963-2900 | Fax (031)965-2900 | e-mail: webmaster@mygoyang.com';
	output+='					</p>';
	output+='					<p style="font-size: 11px;">';
	output+='						| 월-금: 오전10시 - 오후 6시 (Break hour: 오후 1시 ~ 오후 2시)';
	output+='					</p>';
	output+='				</div>';
	output+='				<div class="pageTop">';
	output+='					<a href="#" class="pageTop-a">';
	output+='						<img src="/img/main/pageTop.png" width="100">';
	output+='					</a>';
	output+='				</div>';
	output+='			</div>';
	output+='		</footer>';
	output+='		</div>';
	output+='	</div>';
	output+='</body>';
	output+='</html>';

	response.send(output);
})

app.get('/join.html',function(request,response){			//회원가입 페이지
	var output='';
	output+='<!DOCTYPE html>';
	output+='<html>';
	output+='<head>';
	output+='	<meta charset="utf-8"/>';
	output+='	<title>쇼핑몰 - 회원가입</title>';
	output+='	<script src="js/jquery-3.1.1.js"></script>';
	output+='	<script src="js/join.js"></script>';
	output+='	<link rel="stylesheet" type="text/css" charset="utf-8" href="css/join.css" />';
	output+='	<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>';
	output+='	<link rel="stylesheet" type="text/css" href="jquery-ui-1.12.1.custom/jquery-ui.css"/>';
	output+='	<script type="text/javascript" src="jquery-ui-1.12.1.custom/jquery-ui.js"></script>';
	output+='	<script src="js/header.js"></script>';
	output+='	<link rel="stylesheet" type="text/css" charset="utf-8" href="css/main.css" />';
	if(request.param('view')==undefined){
		output+='	<script type="text/javascript">var preUrl="'+request.param('url')+'";</script>'
	}
	else{
		output+='	<script type="text/javascript">var preUrl="'+request.param('url')+'&view='+request.param('view')+'";</script>'
	}
	output+='</head>';
	output+='<style>';
	output+='.ui-datepicker{ font-size: 12px; width: 200px; }';
	output+='</style>';
	output+='<body>';
	output+='	<div id="page-wrapper" align="center">';
	output+='		<div>';
	output+='			<header id="header">';
	output+='				<div class="main-bg isTop">';
	output+='					<div class="main-bg-bar">';
	output+='						<ul class="main-bg-bar-nav">';
	output+='							<li style="border-right: 0;">';
	output+='								<a id="cart_a" href="">장바구니</a>';
	output+='							</li>';
	output+='							<li>';
	output+='								<a href="/service/home">고객센터</a>';
	output+='							</li>';
	output+='							<li>';
	output+='								<a id="myInfo_a" href="">마이페이지</a>';
	output+='							</li>';
	output+='							<li>';
	output+='								<a href="/joinAgree.html">회원가입</a>';
	output+='							</li>';
	output+='							<li>';
	output+='								<a id="login_a" href="">로그인</a>';
	output+='							</li>';
	output+='						</ul>';
	output+='					</div>';
	output+='					<div class="main-bg-header">';
	output+='						<div class="main-bg-header-container">';
	output+='							<a href="/" class="main-bg-header-container-logo">';
	output+='								<div style="font-family: \'Yoon_러브레터M\';font-size: 40px;font-weight: lighter;">마을마켓</div>';
	output+='								<div style="font-family: \'Yoon_러브레터M\';font-size: 180px;font-weight: lighter;margin-top: -85px;height: 80px;margin-left: 30px;">소소</div>';
	output+='							</a>';
	output+='							<div id="magnifier" align="right" style="margin-top: 10px;">';
	output+='								<span style="border: 1px solid #ddd;padding: 0px 5px;">';
	output+='									<img src="img/main/magnifier.png" width="14" height="14">';
	output+='									<input type="text" name="search" style="border: none;font-size: 15px;margin-left: 2px;">';
	output+='								</span>';
	output+='							</div>';
	output+='							<div class="main-bg-header-container-catchcopy">';
	output+='								<font style="vertical-align: inherit;">';
	output+='									상품 하나하나에 이웃의 이야기와 자부심이 있습니다.';
	output+='								</font>';
	output+='								<br>';
	output+='							</div>';
	output+='							<div style="text-align: left;">';
	output+='								<a href="./" class="main-bg-header-container-home"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">홈</font></font></a>';
	output+='								<div class="main-bg-header-container-nav">';
	output+='									<dl class="main-bg-header-container-nav-list">';
	output+='										<font style="vertical-align: inherit;">';
	output+='											<a href="/category.html?high_num=1&view=2">식품</a>';
	output+='										</font>';
	output+='									</dl>';
	output+='									<dl class="main-bg-header-container-nav-list">';
	output+='										<font style="vertical-align: inherit;">';
	output+='											<a href="/category.html?high_num=2&view=2">생활</a>';
	output+='										</font>';
	output+='									</dl>';
	output+='									<dl class="main-bg-header-container-nav-list">';
	output+='										<font style="vertical-align: inherit;">';
	output+='											기획';
	output+='										</font>';
	output+='									</dl>';
	output+='									<dl class="main-bg-header-container-nav-list">';
	output+='										<font style="vertical-align: inherit;">';
	output+='											<a href="/news_list">마마톡</a>';
	output+='										</font>';
	output+='									</dl>';
	output+='									<dl class="main-bg-header-container-nav-list" style="border-right: 0px;">';
	output+='										<font style="vertical-align: inherit;">';
	output+='											이웃마을';
	output+='										</font>';
	output+='									</dl>';
	output+='								</div>';
	output+='							</div>';
	output+='						</div>';
	output+='					</div>';
	output+='				</div>';
	output+='			</header>';
	output+='			<div id = "container" align="center">';
	output+='				<div style="width:730px;">';
	output+='					<div align="left"><div style="font-weight:bold;font-size:50px;width:120px;float:left;height:70px;">JOIN</div><div style="font-size:14px;color:rgb(154,154,154);margin:25px 10px 25px 10px;width:100px;height:20px;float:left;">회원가입</div></div>';
	output+='					<div style="padding-top:70px;width:100%;padding-bottom:5px;border-bottom:2px solid black;" align="left"></div>';
	output+='					<table style="width:100%;margin-top:20px;border-spacing:0px;">';
	output+='						<tr>';
	output+='							<td style="width:120px;font-size:12px;text-align:right;"><span style="color:red;">*</span>이름</td>';
	output+='							<td style="padding-left:30px;"><input id="name" type="text" style="width:100px;border:1px solid rgb(204,204,204);" maxlength="20"></td>';
	output+='						</tr>';
	output+='						<tr>';
	output+='							<td height="6"></td>';
	output+='						</tr>';
	output+='						<tr>';
	output+='							<td style="width:120px;font-size:12px;text-align:right;"><span style="color:red;">*</span>아이디</td>';
	output+='							<td style="padding-left:30px;"><input id="id" type="text" style="width:100px;border:1px solid rgb(204,204,204);" onfocus="preventFocusFun()" onfocusout="idFocusoutFun()" maxlength="20"><span style="color:rgb(154,154,154);font-size:11px;margin-left:5px;">공백 없는 영문, 숫자 포함 6-20자</span><span id="idFocusout" style="color:red;font-size:11px;margin-left:5px;"></span></td>';
	output+='						</tr>';
	output+='						<tr>';
	output+='							<td height="6"></td>';
	output+='						</tr>';
	output+='						<tr>';
	output+='							<td style="width:120px;font-size:12px;text-align:right;"><span style="color:red;">*</span>비밀번호</td>';
	output+='							<td style="padding-left:30px;"><input id="password" type="password" style="width:100px;border:1px solid rgb(204,204,204);" onfocus="preventFocusFun()" onfocusout="pwFocusoutFun(this)" maxlength="20"><span style="color:rgb(154,154,154);font-size:11px;margin-left:5px;">공백 없는 영문, 숫자 포함 6-20자</span></td>';
	output+='						</tr>';
	output+='						<tr>';
	output+='							<td height="6"></td>';
	output+='						</tr>';
	output+='						<tr>';
	output+='							<td style="width:120px;font-size:12px;text-align:right;"><span style="color:red;">*</span>비밀번호확인</td>';
	output+='							<td style="padding-left:30px;"><input id="passwordCheck" type="password" style="width:100px;border:1px solid rgb(204,204,204);" onfocus="preventFocusFun()" onfocusout="pwFocusoutFun(this)" maxlength="20"><span style="color:rgb(154,154,154);font-size:11px;margin-left:5px;">비밀번호 확인을 위해 한번 더 입력하세요</span></td>';
	output+='						</tr>';
	output+='						<tr>';
	output+='							<td height="6"></td>';
	output+='						</tr>';
	output+='						<tr>';
	output+='							<td style="width:120px;font-size:12px;text-align:right;">생년월일</td>';
	output+='							<td style="padding-left:30px;"><input type="text" id="datepicker" style="width:100px;border:1px solid rgb(204,204,204);" readonly="true"></td>';
	output+='						</tr>';
	output+='						<tr>';
	output+='							<td height="6"></td>';
	output+='						</tr>';
	output+='						<tr>';
	output+='							<td style="width:120px;font-size:12px;text-align:right;">성별</td>';
	output+='							<td style="padding-left:30px;">';
	output+='								<label style="font-size:12px;cursor:pointer;"><input id="남" type="radio" name="sex">남자</label>';
	output+='								<label style="font-size:12px;margin-left:5px;cursor:pointer;"><input id="여" type="radio" name="sex">여자</label>';
	output+='							</td>';
	output+='						</tr>';
	output+='						<tr>';
	output+='							<td height="6"></td>';
	output+='						</tr>';
	output+='						<tr>';
	output+='							<td style="width:120px;font-size:12px;text-align:right;"><span style="color:red;">*</span>이메일</td>';
	output+='							<td style="padding-left:30px;font-size:11px;"><input id="email1" type="text" style="width:70px;border:1px solid rgb(204,204,204);">@<input id="email2" type="text" style="width:70px;border:1px solid rgb(204,204,204);">';
	output+='								<select style="font-size:12px;height:17px;" onchange="mailFun(this);">';
	output+='									<option value="직접선택" selected>직접선택</option>';
	output+='									<option value="naver.com">naver.com</option>';
	output+='									<option value="nate.com">nate.com</option>';
	output+='									<option value="dreamwiz.com">dreamwiz.com</option>';
	output+='									<option value="yahoo.co.kr">yahoo.co.kr</option>';
	output+='									<option value="empal.com">empal.com</option>';
	output+='									<option value="unitel.co.kr">unitel.co.kr</option>';
	output+='									<option value="gmail.com">gmail.com</option>';
	output+='									<option value="korea.com">korea.com</option>';
	output+='									<option value="chol.com">chol.com</option>';
	output+='									<option value="paran.com">paran.com</option>';
	output+='									<option value="freechal.com">freechal.com</option>';
	output+='									<option value="hanmail.net">hanmail.net</option>';
	output+='									<option value="hotmail.com">hotmail.com</option>';
	output+='								</select>';
	output+='								<label style="font-size:11.5px;margin-left:5px;cursor:pointer;"><input type="checkbox" name="mailAgree">정보메일을 수신하겠습니다.</label>';
	output+='							</td>';
	output+='						</tr>';
	output+='						<tr>';
	output+='							<td height="6"></td>';
	output+='						</tr>';
	output+='						<tr>';
	output+='							<td></td>';
	output+='							<td style="font-size:11px;color:rgb(104,104,104);padding-left:30px;">이메일 수신에 동의하시면 여러가지 할인혜택과 각종 이벤트 정보를 받아보실 수 있습니다.<br>회원가입관련, 주문배송관련 등의 메일은 수신동의와 상관없이 모든 회원에게 발송됩니다.</td>';
	output+='						</tr>';
	output+='						<tr>';
	output+='							<td height="6"></td>';
	output+='						</tr>';
	output+='						<tr>';
	output+='							<td style="width:120px;font-size:12px;text-align:right;"><span style="color:red;">*</span>휴대폰번호</td>';
	output+='							<td style="padding-left:30px;"><input id="phone1" type="text" style="width:40px;border:1px solid rgb(204,204,204);" maxlength="4"> - <input id="phone2" type="text" style="width:40px;border:1px solid rgb(204,204,204);" maxlength="4"> - <input id="phone3" type="text" style="width:40px;border:1px solid rgb(204,204,204);" maxlength="4">';
	output+='								<label style="font-size:11.5px;margin-left:5px;cursor:pointer;"><input type="checkbox" name="phoneAgree">SMS를 수신하겠습니다.</label>';
	output+='							</td>';
	output+='						</tr>';
	output+='						<tr>';
	output+='							<td height="6"></td>';
	output+='						</tr>';
	output+='						<tr>';
	output+='							<td></td>';
	output+='							<td style="font-size:11px;color:rgb(104,104,104);padding-left:30px;">SMS 수신에 동의하시면 여러가지 할인혜택과 각종 이벤트 정보를 받아보실 수 있습니다.<br>회원가입관련, 주문배송관련 등의 SMS는 수신동의와 상관없이 구매 회원에게 발송됩니다.</td>';
	output+='						</tr>';
	output+='						<tr>';
	output+='							<td height="6"></td>';
	output+='						</tr>';
	output+='						<tr>';
	output+='							<td style="width:120px;font-size:12px;text-align:right;">주소</td>';
	output+='							<td style="font-size:11px;color:rgb(104,104,104);padding-left:30px;">';
	output+='								<input type="text" id="sample6_postcode" maxlength="10" style="width: 106px;height: 16px;">';
	output+='								<input type="button" onclick="sample6_execDaumPostcode()" value="우편번호 찾기" style="border:0px;background-color:black;color:white;font-size:11px;cursor:pointer;"><br>';
	output+='							</td>';
	output+='						</tr>';
	output+='						<tr>';
	output+='							<td></td>';
	output+='							<td style="font-size:11px;color:rgb(104,104,104);padding-left:30px;">';
	output+='								<input type="text" id="sample6_address" maxlength="100" style="height: 16px;">';
	output+='								<input type="text" id="sample6_address2" maxlength="100" placeholder="상세주소" style="height: 16px;">';
	output+='							</td>';
	output+='						</tr>';
	output+='						<tr>';
	output+='							<td height="30" style="border-bottom:1px solid rgb(204,204,204);"></td>';
	output+='							<td style="border-bottom:1px solid rgb(204,204,204);"></td>';
	output+='						</tr>';
	output+='					</table>';
	output+='					<div>';
	output+='						<button style="font-size:20px;width:290px;height:60px;background-color:black;color:white;margin-top:60px;font-weight:bold;border:0px;cursor:pointer;" onclick="signupFun()">회원가입</button>';
	output+='					</div>';
	output+='				</div>';
	output+='			</div>';
	output+='		<footer id="footer" style="margin-top: 0px;">';
	output+='			<div class="footer-container">';
	output+='				<div class="footer-top" align="center">';
	output+='					상품에 대하여 배송, 교환, 반품의 민원 A/S 등은  "다시 뛰는 사람들" 에서 처리하며 모든 책임은 "다시 뛰는 사람들"에 있습니다.​';
	output+='					민원 담당자 : 마을마켓 소소 고객센터 /  연락처 : 031-963-2900';
	output+='				</div>';
	output+='				<div class="footer-mid" align="left">';
	output+='					<p style="font-size: 12px;">';
	output+='						<b>다시 뛰는 사람들</b>';
	output+='					</p>';
	output+='					<p style="font-size: 11px;">';
	output+='						우)10460 경기도 고양시 덕양구 고양시청로 13-2 성광빌딩 4층';
	output+='					</p>';
	output+='					<p style="font-size: 11px;">';
	output+='						| 대표자: 이영아 | 사업자등록번호: 128-86-63160 | 통신판매업신고: <!--제 2017-고양덕양구-0076호-->';
	output+='					</p>';
	output+='				</div>';
	output+='				<div class="footer-bottom" align="left">';
	output+='					<p style="font-size: 12px;">';
	output+='						<b>고객센터</b>';
	output+='					</p>';
	output+='					<p style="font-size: 11px;">';
	output+='						| Tel (031)963-2900 | Fax (031)965-2900 | e-mail: webmaster@mygoyang.com';
	output+='					</p>';
	output+='					<p style="font-size: 11px;">';
	output+='						| 월-금: 오전10시 - 오후 6시 (Break hour: 오후 1시 ~ 오후 2시)';
	output+='					</p>';
	output+='				</div>';
	output+='				<div class="pageTop">';
	output+='					<a href="#" class="pageTop-a">';
	output+='						<img src="/img/main/pageTop.png" width="100">';
	output+='					</a>';
	output+='				</div>';
	output+='			</div>';
	output+='		</footer>';
	output+='		</div>';
	output+='	</div>';
	output+='	<script>';
	output+='$(document).ready(function(){';
	output+='	$( "#datepicker" ).datepicker({';					//데이트피커(달력) 생성 이벤트
	output+='		showButtonPanel: true,';
	output+='		changeYear: true,';
	output+='		changeMonth: true,';
	output+='		showMonthAfterYear: true,';
	output+="		monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],";
	output+="		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],";
	output+="		currentText: '오늘',";
	output+="		closeText: '닫기',";
	output+='		dateFormat: "yy-mm-dd",';
	output+='		maxDate: 0,';
	output+='		yearRange: "-100:+0"';
	output+='	});';
	output+='</body>';
	output+='</html>';

	response.send(output);
})

app.get('/category.html',function(request,response){					//카테고리 페이지
	var categoryNum=request.param('high_num');
	var output='';
	output+=outputHead;
	output+='<title id="title">마을마켓 - Item</title>';
	output+='<script src="js/category.js"></script>';
	output+='<script type="text/javascript" charset="utf-8" src="js/numberWithCommas.js"></script>';
	output+='			<div id = "container" align="center">';
	output+='				<div class="con-mid1">';
	output+='				<title class="lowName"></title>';
	output+='					<div style="width:1000px;font-size:13px;border-bottom:1px solid rgb(234,234,234);margin-top:50px;padding-bottom:10px;" align="left">';
	output+='						<span style="font-weight:bold;padding-right:5px;padding-left:5px;border-right:1px solid rgb(244,244,244);"><a href="">최신등록순</a></span>';
	output+='							<ul style="list-style: none;padding: 0;margin: 0;width:113px;float:right;margin-top:-3px;">';
	if(request.param('view')==3){						//카테고리 부분에서 아이템 오른쪽위 대각선에 따라 4가지 종류의 모습으로 보여줌
		if(categoryNum!=undefined){
			output+='							<a href="/category.html?high_num='+categoryNum+'&view=1"><li style="width:27px;height:25px;border:1px solid rgb(234,234,234);border-right:0px;float:left;"></li></a>';
			output+='							<a href="/category.html?high_num='+categoryNum+'&view=2"><li style="width:27px;height:25px;border:1px solid rgb(234,234,234);border-right:0px;float:left;"></li></a>';
			output+='							<a href="/category.html?high_num='+categoryNum+'&view=3"><li style="width:27px;height:25px;border:1px solid;float:left;"></li></a>';
			output+='							<a href="/category.html?high_num='+categoryNum+'&view=4"><li style="width:27px;height:25px;border:1px solid rgb(234,234,234);border-left:0px;float:left;"></li></a>';
		}
		else{
			output+='							<a href="/category.html?view=1"><li style="width:27px;height:25px;border:1px solid rgb(234,234,234);border-right:0px;float:left;"></li></a>';
			output+='							<a href="/category.html?view=2"><li style="width:27px;height:25px;border:1px solid rgb(234,234,234);border-right:0px;float:left;"></li></a>';
			output+='							<a href="/category.html?view=3"><li style="width:27px;height:25px;border:1px solid;float:left;"></li></a>';
			output+='							<a href="/category.html?view=4"><li style="width:27px;height:25px;border:1px solid rgb(234,234,234);border-left:0px;float:left;"></li></a>';
		}
	}
	else if(request.param('view')==1){
		if(categoryNum!=undefined){
			output+='							<a href="/category.html?high_num='+categoryNum+'&view=1"><li style="width:27px;height:25px;border:1px solid;float:left;"></li></a>';
			output+='							<a href="/category.html?high_num='+categoryNum+'&view=2"><li style="width:27px;height:25px;border:1px solid rgb(234,234,234);border-left:0px;float:left;"></li></a>';
			output+='							<a href="/category.html?high_num='+categoryNum+'&view=3"><li style="width:27px;height:25px;border:1px solid rgb(234,234,234);border-left:0px;float:left;"></li></a>';
			output+='							<a href="/category.html?high_num='+categoryNum+'&view=4"><li style="width:27px;height:25px;border:1px solid rgb(234,234,234);border-left:0px;float:left;"></li></a>';
		}
		else{
			output+='							<a href="/category.html?view=1"><li style="width:27px;height:25px;border:1px solid;float:left;"></li></a>';
			output+='							<a href="/category.html?view=2"><li style="width:27px;height:25px;border:1px solid rgb(234,234,234);border-left:0px;float:left;"></li></a>';
			output+='							<a href="/category.html?view=3"><li style="width:27px;height:25px;border:1px solid rgb(234,234,234);border-left:0px;float:left;"></li></a>';
			output+='							<a href="/category.html?view=4"><li style="width:27px;height:25px;border:1px solid rgb(234,234,234);border-left:0px;float:left;"></li></a>';
		}
	}
	else if(request.param('view')==2){
		if(categoryNum!=undefined){
			output+='							<a href="/category.html?high_num='+categoryNum+'&view=1"><li style="width:27px;height:25px;border:1px solid rgb(234,234,234);border-right:0px;float:left;"></li></a>';
			output+='							<a href="/category.html?high_num='+categoryNum+'&view=2"><li style="width:27px;height:25px;border:1px solid;float:left;"></li></a>';
			output+='							<a href="/category.html?high_num='+categoryNum+'&view=3"><li style="width:27px;height:25px;border:1px solid rgb(234,234,234);border-left:0px;float:left;"></li></a>';
			output+='							<a href="/category.html?high_num='+categoryNum+'&view=4"><li style="width:27px;height:25px;border:1px solid rgb(234,234,234);border-left:0px;float:left;"></li></a>';
		}
		else{
			output+='							<a href="/category.html?view=1"><li style="width:27px;height:25px;border:1px solid rgb(234,234,234);border-right:0px;float:left;"></li></a>';
			output+='							<a href="/category.html?view=2"><li style="width:27px;height:25px;border:1px solid;float:left;"></li></a>';
			output+='							<a href="/category.html?view=3"><li style="width:27px;height:25px;border:1px solid rgb(234,234,234);border-left:0px;float:left;"></li></a>';
			output+='							<a href="/category.html?view=4"><li style="width:27px;height:25px;border:1px solid rgb(234,234,234);border-left:0px;float:left;"></li></a>';
		}
	}
	else if(request.param('view')==4){
		if(categoryNum!=undefined){
			output+='							<a href="/category.html?high_num='+categoryNum+'&view=1"><li style="width:27px;height:25px;border:1px solid rgb(234,234,234);border-right:0px;float:left;"></li></a>';
			output+='							<a href="/category.html?high_num='+categoryNum+'&view=2"><li style="width:27px;height:25px;border:1px solid rgb(234,234,234);border-right:0px;float:left;"></li></a>';
			output+='							<a href="/category.html?high_num='+categoryNum+'&view=3"><li style="width:27px;height:25px;border:1px solid rgb(234,234,234);border-right:0px;float:left;"></li></a>';
			output+='							<a href="/category.html?high_num='+categoryNum+'&view=4"><li style="width:27px;height:25px;border:1px solid;float:left;"></li></a>';
		}
		else{
			output+='							<a href="/category.html?view=1"><li style="width:27px;height:25px;border:1px solid rgb(234,234,234);border-right:0px;float:left;"></li></a>';
			output+='							<a href="/category.html?view=2"><li style="width:27px;height:25px;border:1px solid rgb(234,234,234);border-right:0px;float:left;"></li></a>';
			output+='							<a href="/category.html?view=3"><li style="width:27px;height:25px;border:1px solid rgb(234,234,234);border-right:0px;float:left;"></li></a>';
			output+='							<a href="/category.html?view=4"><li style="width:27px;height:25px;border:1px solid;float:left;"></li></a>';
		}
	}
	output+='							</ul>';
	output+='					</div>';
	if(categoryNum!=undefined){
		conn.getConnection(function(err,connection){
			connection.query("SELECT * FROM GOODS_TB where GD_CG_FK=? and GD_GOOD_ST IN (1) and GD_EXIST_ST NOT IN (0);",[categoryNum],function(err,data){	//데이터베이스에서 카테고리 번호에 따라 아이템을 가져옴
				if(err) console.error('err',err);
				if(data!=''){
					if(request.param('view')==1){
						output+='						<ul style="list-style: none;padding: 0;margin: 0;">';
						for(var i=data.length-1;i>=0;i--){		
							output+='							<li style="width: 1000px;border-bottom: 1px solid rgb(234,234,234);">';
							output+='								<div style="width: 210px;height: 150px;float: left;margin-top: 10px;padding-right: 10px;">';
							output+='									<a href="/itemInfo.html?item='+data[i].GD_PK+'"><div style="width: 140px;height: 140px;background-image: url('+data[i].GD_MAIN_IM.split(',')[0]+');background-size: 140px 140px;"></div></a>';
							output+='								</div>';
							output+='								<div style="width: 600px;padding-bottom:18px;padding-top: 15px;border-right:1px solid rgb(234,234,234);" align="left">';
							output+='									<div style="color:black; font-size:14px;width:600px;"><a href="/itemInfo.html?item='+data[i].GD_PK+'" class="hoverEffect">'+data[i].GD_GOOD_NM+'</a></div>';
							output+='									<div style="font-size:14px;color:rgb(154,154,154);width:600px;margin-top:30px;">'+data[i].GD_GOOD_SNM+'</div>';
							output+='									<div style="margin-top:40px;"><span style="text-decoration:line-through;font-size:12px;color:rgb(154,154,154);">'+numberWithCommas(data[i].GD_CONSUMER_PR)+'원</span><span style="color:black;font-weight: bold;margin-left:10px;">'+numberWithCommas(data[i].GD_SELL_PR)+'원</span></div>';
							output+='								</div>';
							output+='							</li>';
						}
						output+='						</ul>';
					}
					else if(request.param('view')==2){
						output+='						<ul style="list-style: none;padding: 0;margin: 0;margin-top:10px;width:1000px;">';
						for(var i=data.length-1;i>=0;i--){
							output+='<li>';
							output+='<div style="height: 450px;float: left;margin-right: 5px;margin-left: 5px;">';
							output+='<a href="/itemInfo.html?item='+data[i].GD_PK+'"><div style="background-image: url(../'+data[i].GD_MAIN_IM.split(',')[0]+');background-size: 190px 190px;height: 190px;width: 190px;"></div></a>';
							output+='<div style="font-size:13px;padding-top:10px;width:180px;" align="left"><a href="/itemInfo.html?item='+data[i].GD_PK+'" style="color:black;" class="hoverEffect">'+data[i].GD_GOOD_NM+'</a></div>';
							output+='<div style="padding-top:20px;padding-bottom:20px;" align="left"><span style="text-decoration:line-through;font-size:12px;color:rgb(154,154,154);width:180px;">'+numberWithCommas(data[i].GD_CONSUMER_PR)+'원</span><span style="margin-left:10px;"><strong>'+numberWithCommas(data[i].GD_SELL_PR)+'원</strong></span></div>';
							output+='</div>';
							output+='</li>';
						}
						output+='						</ul>';
					}
					else if(request.param('view')==3){
						output+='<ul style="list-style: none;padding: 0;margin: 0;margin-left:20px;margin-top:10px;width:1070px;">';
						for(var i=data.length-1;i>=0;i--){
							output+='<li>';
							output+='<div style="float: left;height: 36mm;width: 82mm;border:0.2pt solid rgb(204,204,204);padding: 3mm;margin: 3mm;">';
							output+='<a href="/itemInfo.html?item='+data[i].GD_PK+'"><div style="background-image: url(../'+data[i].GD_MAIN_IM.split(',')[0]+');background-size: 36mm 36mm;height: 36mm;width: 36mm !important;border-radius: 36mm;float: left;"></div></a>';
							output+='	<div style="font-weight: bold;min-height: 38%;font-size: 14pt;width: 55%;float: right;">';
							output+='		<a href="/itemInfo.html?item='+data[i].GD_PK+'" style="color:black;" class="hoverEffect">';
							output+='			<div>'+data[i].GD_GOOD_NM+'</div>';
							output+='		</a>';
							output+='		<div style="border-bottom: 1px solid rgb(204,204,204);"><span style="text-decoration:line-through;font-size:12pt;">'+numberWithCommas(data[i].GD_CONSUMER_PR)+'</span><span style="margin-left:8px;"><strong>'+numberWithCommas(data[i].GD_SELL_PR)+'<span style="font-size:10pt;">원</span></strong></span></div>';
							output+='		<div style="padding:10px;font-size:8pt;height:10mm;">'+data[i].GD_GOOD_SNM+'</div>';
							output+='	</div>';
							output+='</div>';
							output+='</li>';
						}
						output+='</ul>';
					}
					else if(request.param('view')==4){
						output+='<ul style="list-style: none;padding: 0;margin: 0;margin-left:10px;margin-top:10px;width:1000px;">';
						for(var i=data.length-1;i>=0;i--){
							output+='<li onmouseover="divShow('+data[i].GD_PK+')" onmouseout="divHide('+data[i].GD_PK+')">';
							output+='<div style="padding-bottom:40px;height: 450px;float: left;margin-right: 5px;margin-left: 5px;">';
							output+='<a href="/itemInfo.html?item='+data[i].GD_PK+'"><div style="background-image: url(../'+data[i].GD_MAIN_IM.split(',')[0]+');background-size: 480px 480px;height: 480px;width: 480px;"></div></a>';
							output+='<div style="width:470px;padding-left:10px;height:100px;margin-top:-100px;background-color:black;opacity: 0.8;display:none;" id="show'+data[i].GD_PK+'">';
							output+='<div style="font-size:13px;padding-top:10px;width:470px;" align="left"><a href="/itemInfo.html?item='+data[i].GD_PK+'" style="color:rgb(234,234,234);" class="hoverEffect">'+data[i].GD_GOOD_NM+'</a></div>';
							output+='<div style="padding-top:20px;padding-bottom:20px;" align="left"><span style="text-decoration:line-through;font-size:12px;color:rgb(154,154,154);width:470px;">'+numberWithCommas(data[i].GD_CONSUMER_PR)+'원</span><span style="margin-left:10px;color:white;"><strong>'+numberWithCommas(data[i].GD_SELL_PR)+'원</strong></span></div>';
							output+='</div>';
							output+='</div>';
							output+='</li>';
						}
						output+='</ul>';
					}
				}
				else{
					output+='<div style="min-height:100px;width:1000px;padding-top:90px;">상품이 존재하지 않습니다.</div>';
				}
				output+='					</div>';
				output+='				</div>';
				output+='			</div>';
				output+=outputFooter;

				response.send(output);
				connection.release();
			})
		});
	}
	else{
		conn.getConnection(function(err,connection){
			connection.query("SELECT * FROM GOODS_TB where GD_GOOD_ST IN (1) and GD_EXIST_ST NOT IN (0);",function(err,data){
				if(err) console.error('err',err);
				if(data!=''){
					if(request.param('view')==1){
						output+='						<ul style="list-style: none;padding: 0;margin: 0;">';
						for(var i=data.length-1;i>=0;i--){		
							output+='							<li style="width: 1000px;border-bottom: 1px solid rgb(234,234,234);">';
							output+='								<div style="width: 210px;height: 150px;float: left;margin-top: 10px;padding-right: 10px;">';
							output+='									<a href="/itemInfo.html?item='+data[i].GD_PK+'"><div style="width: 140px;height: 140px;background-image: url('+data[i].GD_MAIN_IM.split(',')[0]+');background-size: 140px 140px;"></div></a>';
							output+='								</div>';
							output+='								<div style="width: 600px;padding-bottom:18px;padding-top: 15px;border-right:1px solid rgb(234,234,234);" align="left">';
							output+='									<div style="color:black; font-size:14px;width:600px;"><a href="/itemInfo.html?item='+data[i].GD_PK+'" class="hoverEffect">'+data[i].GD_GOOD_NM+'</a></div>';
							output+='									<div style="font-size:14px;color:rgb(154,154,154);width:600px;margin-top:30px;">'+data[i].GD_GOOD_SNM+'</div>';
							output+='									<div style="margin-top:40px;"><span style="text-decoration:line-through;font-size:12px;color:rgb(154,154,154);">'+numberWithCommas(data[i].GD_CONSUMER_PR)+'원</span><span style="color:black;font-weight: bold;margin-left:10px;">'+numberWithCommas(data[i].GD_SELL_PR)+'원</span></div>';
							output+='								</div>';
							output+='							</li>';
						}
						output+='						</ul>';
					}
					else if(request.param('view')==2){
						output+='						<ul style="list-style: none;padding: 0;margin: 0;margin-top:10px;width:1000px;">';
						for(var i=data.length-1;i>=0;i--){
							output+='<li>';
							output+='<div style="height: 450px;float: left;margin-right: 5px;margin-left: 5px;">';
							output+='<a href="/itemInfo.html?item='+data[i].GD_PK+'"><div style="background-image: url(../'+data[i].GD_MAIN_IM.split(',')[0]+');background-size: 190px 190px;height: 190px;width: 190px;"></div></a>';
							output+='<div style="font-size:13px;padding-top:10px;width:180px;" align="left"><a href="/itemInfo.html?item='+data[i].GD_PK+'" style="color:black;" class="hoverEffect">'+data[i].GD_GOOD_NM+'</a></div>';
							output+='<div style="padding-top:20px;padding-bottom:20px;" align="left"><span style="text-decoration:line-through;font-size:12px;color:rgb(154,154,154);width:180px;">'+numberWithCommas(data[i].GD_CONSUMER_PR)+'원</span><span style="margin-left:10px;"><strong>'+numberWithCommas(data[i].GD_SELL_PR)+'원</strong></span></div>';
							output+='</div>';
							output+='</li>';
						}
						output+='						</ul>';
					}
					else if(request.param('view')==3){
						output+='<ul style="list-style: none;padding: 0;margin: 0;margin-left:20px;margin-top:10px;width:1070px;">';
						for(var i=data.length-1;i>=0;i--){
							output+='<li>';
							output+='<div style="float: left;height: 36mm;width: 82mm;border:0.2pt solid rgb(204,204,204);padding: 3mm;margin: 3mm;">';
							output+='<a href="/itemInfo.html?item='+data[i].GD_PK+'"><div style="background-image: url(../'+data[i].GD_MAIN_IM.split(',')[0]+');background-size: 36mm 36mm;height: 36mm;width: 36mm !important;border-radius: 36mm;float: left;"></div></a>';
							output+='	<div style="font-weight: bold;min-height: 38%;font-size: 14pt;width: 55%;float: right;">';
							output+='		<a href="/itemInfo.html?item='+data[i].GD_PK+'" style="color:black;" class="hoverEffect">';
							output+='			<div>'+data[i].GD_GOOD_NM+'</div>';
							output+='		</a>';
							output+='		<div style="border-bottom: 1px solid rgb(204,204,204);"><span style="text-decoration:line-through;font-size:12pt;">'+numberWithCommas(data[i].GD_CONSUMER_PR)+'</span><span style="margin-left:8px;"><strong>'+numberWithCommas(data[i].GD_SELL_PR)+'<span style="font-size:10pt;">원</span></strong></span></div>';
							output+='		<div style="padding:10px;font-size:8pt;height:10mm;">'+data[i].GD_GOOD_SNM+'</div>';
							output+='	</div>';
							output+='</div>';
							output+='</li>';
						}
						output+='</ul>';
					}
					else if(request.param('view')==4){
						output+='<ul style="list-style: none;padding: 0;margin: 0;margin-left:10px;margin-top:10px;width:1000px;">';
						for(var i=data.length-1;i>=0;i--){
							output+='<li onmouseover="divShow('+data[i].GD_PK+')" onmouseout="divHide('+data[i].GD_PK+')">';
							output+='<div style="padding-bottom:40px;height: 450px;float: left;margin-right: 5px;margin-left: 5px;">';
							output+='<a href="/itemInfo.html?item='+data[i].GD_PK+'"><div style="background-image: url(../'+data[i].GD_MAIN_IM.split(',')[0]+');background-size: 480px 480px;height: 480px;width: 480px;"></div></a>';
							output+='<div style="width:470px;padding-left:10px;height:100px;margin-top:-100px;background-color:black;opacity: 0.8;display:none;" id="show'+data[i].GD_PK+'">';
							output+='<div style="font-size:13px;padding-top:10px;width:470px;" align="left"><a href="/itemInfo.html?item='+data[i].GD_PK+'" style="color:rgb(234,234,234);" class="hoverEffect">'+data[i].GD_GOOD_NM+'</a></div>';
							output+='<div style="padding-top:20px;padding-bottom:20px;" align="left"><span style="text-decoration:line-through;font-size:12px;color:rgb(154,154,154);width:470px;">'+numberWithCommas(data[i].GD_CONSUMER_PR)+'원</span><span style="margin-left:10px;color:white;"><strong>'+numberWithCommas(data[i].GD_SELL_PR)+'원</strong></span></div>';
							output+='</div>';
							output+='</div>';
							output+='</li>';
						}
						output+='</ul>';
					}
				}
				else{
					output+='<div style="min-height:100px;width:1000px;padding-top:90px;">상품이 존재하지 않습니다.</div>';
				}
				output+='					</div>';
				output+='				</div>';
				output+='			</div>';
				output+=outputFooter;

				response.send(output);
				connection.release();
			})
		})
	}
})

app.get('/itemInfo.html',function(request,response){			//아이템 세부설명 페이지
	var item=request.param('item');
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM GOODS_TB WHERE GD_PK=?",[item], function (err,data) {			//item 파라미터에 따라 해당 아이템의 정보를 데이터베이스에서 가져옴
			if(err) console.error('err',err);
			if(data!=''){
				var images=data[0].GD_MAIN_IM.split(',');					//이미지의 이름을 ,로 자름 (이미지의 저장 형태 = 메인이미지,2번째 슬라이드 이미지,...,5번째 슬라이드 이미지)

				var output='';
				output+='<!DOCTYPE html>';
				output+='<html>';
				output+='<head>';
				output+='<meta charset="utf-8"/>';
				output+='<title>마을마켓 - '+data[0].GD_GOOD_NM+'</title>';
				output+='<script src="js/jquery-3.1.1.js"></script>';
				output+='<script src="js/header.js"></script>';
				output+='<script src="js/loginCheck.js"></script>';
				output+='<script src="js/itemInfo.js"></script>';
				output+='<link rel="stylesheet" type="text/css" charset="utf-8" href="css/main.css" />';
				output+='<link rel="stylesheet" type="text/css" charset="utf-8" href="css/itemInfo.css" />';
				output+='<link rel="stylesheet" type="text/css" href="jquery-ui-1.12.1.custom/jquery-ui.css"/>';
				output+='<script src="bootstrap/js/bootstrap.min.js"></script>';
				output+='<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">';
				output+='<script type="text/javascript" src="jquery-ui-1.12.1.custom/jquery-ui.js"></script>';
				output+='<script type="text/javascript" charset="utf-8" src="js/numberWithCommas.js"></script>';
				output+='</head>';
				output+='<body>';
				output+='	<div id="page-wrapper" align="center">';
				output+='		<div>';
				output+='			<header id="header">';
				output+='				<div class="main-bg isTop">';
				output+='					<div class="main-bg-bar">';
				output+='						<ul class="main-bg-bar-nav">';
				output+='							<li style="border-right: 0;">';
				output+='								<a id="cart_a" href="">장바구니</a>';
				output+='							</li>';
				output+='							<li>';
				output+='								<a href="/service/home">고객센터</a>';
				output+='							</li>';
				output+='							<li>';
				output+='								<a id="myInfo_a" href="">마이페이지</a>';
				output+='							</li>';
				output+='							<li>';
				output+='								<a href="/joinAgree.html">회원가입</a>';
				output+='							</li>';
				output+='							<li>';
				output+='								<a id="login_a" href="">로그인</a>';
				output+='							</li>';
				output+='						</ul>';
				output+='					</div>';
				output+='					<div class="main-bg-header">';
				output+='						<div class="main-bg-header-container">';
				output+='							<a href="/" class="main-bg-header-container-logo">';
				output+='								<div style="font-family: \'Yoon_러브레터M\';font-size: 40px;font-weight: lighter;">마을마켓</div>';
				output+='								<div style="font-family: \'Yoon_러브레터M\';font-size: 180px;font-weight: lighter;margin-top: -85px;height: 80px;margin-left: 30px;">소소</div>';
				output+='							</a>';
				output+='							<div id="magnifier" align="right" style="margin-top: 10px;">';
				output+='								<span style="border: 1px solid #ddd;padding: 0px 5px;">';
				output+='									<img src="img/main/magnifier.png" width="14" height="14">';
				output+='									<input type="text" name="search" style="border: none;font-size: 15px;margin-left: 2px;">';
				output+='								</span>';
				output+='							</div>';
				output+='							<div class="main-bg-header-container-catchcopy">';
				output+='								<font style="vertical-align: inherit;">';
				output+='									상품 하나하나에 이웃의 이야기와 자부심이 있습니다.';
				output+='								</font>';
				output+='								<br>';
				output+='							</div>';
				output+='							<div style="text-align: left;">';
				output+='								<a href="./" class="main-bg-header-container-home"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">홈</font></font></a>';
				output+='								<div class="main-bg-header-container-nav">';
				output+='									<dl class="main-bg-header-container-nav-list">';
				output+='										<font style="vertical-align: inherit;">';
				output+='											<a href="/category.html?high_num=1&view=2">식품</a>';
				output+='										</font>';
				output+='									</dl>';
				output+='									<dl class="main-bg-header-container-nav-list">';
				output+='										<font style="vertical-align: inherit;">';
				output+='											<a href="/category.html?high_num=2&view=2">생활</a>';
				output+='										</font>';
				output+='									</dl>';
				output+='									<dl class="main-bg-header-container-nav-list">';
				output+='										<font style="vertical-align: inherit;">';
				output+='											기획';
				output+='										</font>';
				output+='									</dl>';
				output+='									<dl class="main-bg-header-container-nav-list">';
				output+='										<font style="vertical-align: inherit;">';
				output+='											<a href="/news_list">마마톡</a>';
				output+='										</font>';
				output+='									</dl>';
				output+='									<dl class="main-bg-header-container-nav-list" style="border-right: 0px;">';
				output+='										<font style="vertical-align: inherit;">';
				output+='											이웃마을';
				output+='										</font>';
				output+='									</dl>';
				output+='								</div>';
				output+='							</div>';
				output+='						</div>';
				output+='					</div>';
				output+='				</div>';
				output+='			</header>';
				output+='	<script>';
				output+='		$(document).ready(function(){';
				output+='			$.get("/login_check",function(data){';
				output+='				if(data){';
				output+="					$('#cartButton').attr('onclick','cartFunction("+item+","+data[0].GD_GOOD_AMT+")');";		//장바구니 버튼 이벤트
				output+="					$('#orderButton').attr('onclick','orderFunction2("+item+")')";								//구매하기 버튼 이벤트
				output+="				}else{";
				output+="					$('#cartButton').attr('onclick','location.href=\"/login.html?url='+location.href+'\"');";
				output+="					$('#orderButton').attr('onclick','orderFunction("+item+")');";
				output+="				};";
				output+="			});";
				if(data[0].GD_GOOD_AMT<1){						//아이템이 남아있는 수량이 없을 경우 
					output+="		alert('상품이 품절됐습니다.');";
					output+="		location.href='/';";			//메인 페이지로 보냄
				}
				output+="		});";
				output+="	</script>";
				output+='<div id = "container" align="center" style="line-height: 2.1;font-feature-settings: "palt";letter-spacing: 0.8px;>';
				output+='<div class="p-layout-container" style="transform: none;">';
				output+='	<div class="p-product-wrap" style="transform: none;">';
				output+='		<div class="p-product-heading js-product-fix" style="position: relative; overflow: visible; box-sizing: border-box; min-height: 1px;">';
				output+='			<div class="theiaStickySidebar" style="padding-bottom: 1px; padding-top: 0px; top: 0px; position: static; transform: none;">';
				output+='				<div class="p-product-heading__unit">';

				output+='					<div class="p-large-image">';
				output+='						<div class="p-large-image__image-wrap c-image-wrap">';
				output+='							<div class="c-image-box js-thumbnail-set">';
				output+='								<img id="mainImage" src="'+images[0]+'" class="c-image-box__image">';
				output+='							</div>';
				output+='						</div>';
				output+='					</div>';
				output+='					<ul class="p-thumbnail-list">';
				for(var i=0;i<images.length;i++){						//아이템 메인 사진들 슬라이드에 올리는 부분 
					output+='						<li class="p-thumbnail-list__unit">';
					if(i==0){
						output+='							<div class="p-thumbnail-list__image-wrap c-image-wrap c-image-wrap--link is-current js-thumbnail-select" imageUrl="'+images[i]+'">';
					}
					else{
						output+='							<div class="p-thumbnail-list__image-wrap c-image-wrap c-image-wrap--link js-thumbnail-select" imageUrl="'+images[i]+'">';
					}
					output+='								<span class="c-image-box">';
					output+='									<img src="'+images[i]+'" class="c-image-box__image js-lazyload" style="width:58px;height:58px;">';
					output+='								</span>';
					output+='							</div>';
					output+='						</li>';
				}
				output+='					</ul>';
				output+='					<div class="p-short-description">';
				output+='						<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">'+data[0].GD_GOOD_SNM+'</font></font>';
				output+='					</div>';
				output+='				</div>';
				output+='				<div id="cart-form" class="p-product-heading__unit">';
				output+='					<div class="p-cart-form">';
				output+='						<div class="p-cart-form__info">';
				output+='							<div class="p-cart-form__name">';
				output+='								<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">'+data[0].GD_GOOD_NM+'</font></font>';
				output+='							</div>';
				output+='							<div class="p-cart-form__price c-product-info__price">';
				output+='								<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">'+numberWithCommas(data[0].GD_SELL_PR)+' 원</font></font>';
				output+='							</div>';
				output+='						</div>';
				output+='						<div class="c-form__unit">';
				output+='							<div class="c-form__unit-label c-form__unit-label--fix-margin">';
				output+='								<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">구매 수</font></font>';
				output+='							</div>';
				output+='							<div class="c-form__unit-body">';
				output+='								<input type="number" id="goodAmount" value="1" max="'+data[0].GD_GOOD_AMT+'" min="1" class="c-input-text p-cart-form__add-cart-num" onchange="amountFunc('+data[0].GD_SELL_PR+','+data[0].GD_DELIVERY_PR+','+data[0].GD_PK+')">';
				output+='								<div class="p-cart-form__add-num-wrap">';

				output+='								</div>';
				output+='								<div style=";height: 49px;padding-top: 20px;float:right;" align="right">';
				output+='									<span style="color: rgb(104,104,104);font-size:12px;font-weight:bold;margin-right:3px;">TOTAL</span>';
				output+='									<span style="font-size: 28px;font-weight:bold;color:red;"><span id="allPr">'+numberWithCommas(data[0].GD_SELL_PR+data[0].GD_DELIVERY_PR)+'</span><span style="font-size:11px;">원</span></span>';
				output+='								</div>';
				output+='							</div>';
				output+='						</div>';
				output+='						<div class="p-cart-form__button-wrap">';
				output+='							<div class="disable_cartin">';
				output+='								<button id="cartButton" class="p-cart-form__add-cart-button c-button c-button--solid">';
				output+='									<svg class="c-button__icon" role="img" aria-hidden="true"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shopping-cart"></use></svg>';
				output+='									<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">장바구니에 담기</font></font>';
				output+='								</button>';
				output+='							</div>';
				output+='						</div>';
				output+='						<div class="p-cart-form__button-wrap">';
				output+='							<div class="disable_cartin">';
				output+='								<button id="orderButton" class="p-cart-form__add-cart-button c-button c-button--solid">';
				output+='									<svg class="c-button__icon" role="img" aria-hidden="true"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shopping-cart"></use></svg>';
				output+='									<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">바로 구매하기</font></font>';
				output+='								</button>';
				output+='							</div>';
				output+='						</div>';
				output+='					</div>';
				output+='				</div>';
				output+='				<div class="resize-sensor" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; z-index: -1; visibility: hidden;"><div class="resize-sensor-expand" style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;"><div style="position: absolute; left: 0px; top: 0px; transition: 0s; width: 410px; height: 1143px;"></div></div><div class="resize-sensor-shrink" style="position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: hidden; z-index: -1; visibility: hidden;"><div style="position: absolute; left: 0; top: 0; transition: 0s; width: 200%; height: 200%"></div></div></div>';
				output+='			</div>';
				output+='		</div>';
				output+='		<div class="p-product-body" style="text-align:left;">';
				output+='			<div class="p-product-body-inner">';
				output+='				<div class="p-product-body__name">';
				output+='					<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">'+data[0].GD_GOOD_NM+'</font></font>';
				output+='				</div>';
				output+='				<div class="p-product-body__price">';
				output+='					<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">'+numberWithCommas(data[0].GD_SELL_PR)+' 원</font></font>';
				output+='				</div>';
				output+='				<div class="p-product-body__description">'+data[0].GD_GOOD_EX+'</div>';
				output+='			</div>';
				output+='		</div>';
				output+='	</div>';
				output+='	<div class="p-product-footer">';
				output+='		<ul class="p-product-footer-nav">';
				output+='			<li>';
				output+='				<a href="category.html?view=2">';
				output+='					<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">쇼핑 계속하기</font></font>';
				output+='				</a>';
				output+='			</li>';
				output+='		</ul>';
				output+='	</div>';
				output+='	<div style="width:100%;text-align:left;padding:5vh 0px 10vh 0px;margin-top:5vh;line-height:1;">';
				output+='				<p class="0">배송안내</p><p class="0"><span style="font-family:함초롬바탕;"><!--[if !supportEmptyParas]-->&nbsp;<!--[endif]--><o:p></o:p></span></p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;"><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">▪ </span>생산자가 택배로 발송합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span></p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;"><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">▪ </span>기본 배송은 평균 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">2</span>일<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">~5</span>일<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(</span>주말 제외<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">) </span>정도 소요됩니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. (</span>거래처 사정<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>공장 지연<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>주문폭주 등 부득이한 일로 배송지연 시 최대 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">15</span>일 이내 배송해드립니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.)</span></p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;"><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">▪ </span>배송 중에는 입금 취소가 불가하오니 유의하여 주시기 바랍니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span></p><p class="0"><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">▪ </span>배송비는 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">5</span>만 원 이상 무료<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, 5</span>만 원 미만은 유료입니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.(</span>배송비는 생산업체의 사정에 따라 상품마다 별도로 알려드립니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span></p>';
				output+='			<div style="margin-top:5vh;"><p><span style="mso-fareast-font-family:맑은 고딕;mso-hansi-font-family:맑은 고딕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;"></span>교환/반품</p></div>';
				output+='<br><p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;"><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">▪  </span>수령일로부터 일주일<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">(7</span>일<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">) </span>이내 교환<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">/</span>반품 가능합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">. (</span>일부 품목 제외<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">)</span></p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;"><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">▪  </span>불량 상품이나 잘못된 상품을 받은 경우 무료 교환해 드립니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span></p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;"><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">▪  </span>단순변심인 경우 수령 후 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">24</span>시간 이내에 게시판 또는 센터로 연락을 주셔야합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span></p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;"><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">▪  </span>부득이하게 교환<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">/</span>반품이 지연되는 경우는 미리 공지해드립니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span></p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;"><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">▪  </span>단순변심의 반품 및 교환은 택배비 왕복 본인 부담입니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span></p><p class="0" style="mso-pagination:none;text-autospace:none;mso-padding-alt:0pt 0pt 0pt 0pt;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;"><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">▪  </span>제품 품절 시에는 환불 처리해드립니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span></p><p class="0"><span style="mso-fareast-font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">▪  </span>사용 흔적이 있는 경우<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, </span>교환<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">/</span>반품 기간이 지난 경우<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">, \'</span>전자상거래 등에서의 소비자보호에제한<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">\'</span>에 관한 법률이 정하는 <span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">\'</span>소비자 청약철회<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">\'</span>에 해당하는 경우에는 교환 또는 반품이 불가합니다<span lang="EN-US" style="font-family:함초롬바탕;mso-font-width:100%;letter-spacing:0pt;mso-text-raise:0pt;">.</span></p>';
				output+='		</div>';
				output+='		<div id="goodComment" style="width:100%;padding:10px 0px 10px 0px;font-size:initial;border-top:1px solid rgb(204,204,204);" align="center">';
				output+='			<div style="color: #555;font-size: 14px;padding: 30px 0 25px;width:100%;text-align:left;border-bottom:1px solid rgb(234,234,234);font-weight:bold;">';
				output+='				상품평';
				output+='			</div>';
				connection.query("SELECT * FROM BUY_COMMENTS_TB WHERE BCM_GD_FK=?",[item], function (err,data2) {					//데이터베이스에서 상품평을 가져오는 부분 
					if(err) console.error('err',err);
					if(data2!=''){
						for(var i=0;i<data2.length;i++){
							var date=data2[i].BCM_COMMENT_YMD;
							output+='			<div style="color: #555;font-size: 14px;padding: 10px 0 5px;width:100%;text-align:left;border-bottom:1px solid rgb(234,234,234);">';
							if(request.session.US_PK==data2[i].BCM_US_FK){
								output+='				<div style="font-weight: bold;color: #777;padding-bottom:7px;padding-left:5px;">'+data2[i].BCM_US_NM+'<span style="float:right;font-size:12px;cursor:pointer;" onclick="reviewRemoveFun('+data2[i].BCM_PK+')">삭제</span></div>';
							}
							else{
								output+='				<div style="font-weight: bold;color: #777;padding-bottom:7px;padding-left:5px;">'+data2[i].BCM_US_NM+'</div>';
							}
							output+='				<div style="color: #666;padding-bottom:7px;width:100%;">'+data2[i].BCM_COMMENT_CT+'</div>';
							if(data2[i].BCM_MAIN_IM!=""){
								output+='				<div style="color: #666;padding-bottom:7px;width:100%;"><a href="'+data2[i].BCM_MAIN_IM+'" target=_blank><img src="'+data2[i].BCM_MAIN_IM+'" style="width:70px;height:auto;"></a></div>';
							}
							output+='				<div style="color: #bbb;font-size: 8pt;padding-bottom:7px;">'+date.slice(0,4)+'/'+date.slice(4,6)+'/'+date.slice(6,8)+'</div>';
							output+='			</div>';
						}
					}
					else{
						output+='			<div style="color: #555;font-size: 14px;padding: 20px 0;width:100%;text-align:left;">';
						output+='				<div style="color: #777;padding: 10px 0 15px;">등록된 상품평이 없습니다.</div>';
						output+='			</div>';
					}
					output+='		<div style="width:100%;margin-top:10px;" align="left">';
					output+='			<button style="color:white;background-color:rgb(184,184,184);border:0px;font-size:11px;padding:8px;" onclick="reviewFun('+item+')">상품평 남기기</button>';
					output+='		</div>';
					output+='		</div>';
					output+='	</div>';
					output+='	<div class = "entry">';
					var relateGood=data[0].GD_RELATE_GD.split(',');
					var relateGoods=data[0].GD_RELATE_NW.split(',');
					connection.query('select * from GOODS_TB where GD_PK in (?)',[relateGood], function(err, data2){				//데이터베이스에서 관련 상품을 가져오는 부분
						var goods=data2;
						connection.query('select * from NEWS_TB where NEWS_PK in (?)',[relateGoods], function(err, data2){			//데이터베이스에서 관련 기사를 가져오는 부분
							var relateGoods=data2;
							if(goods.length!=0){
								output+='	<div style="margin-top: 200px;">';
								output+='		<h2 style="border-bottom: dotted 1px #5e4d4a;text-align: left;padding: 5px 0 5px 15px;line-height: 1.25;margin: 0 0 15px;"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">'+data[0].GD_RELATE_GD_NM+'</font></font></h2>';
								output+='		<div class="relateditem">';
								output+='			<ul class="c-product-list">';
								for(var i=0;i<goods.length;i++){
									output+='				<li class="c-product-list__item">';
									output+='					<a class="c-product-list__image-wrap c-image-wrap c-image-wrap--link" href="/itemInfo.html?item='+goods[i].GD_PK+'">';
									output+='						<div class="c-image-box c-image-box--main">';
									output+='							<img class="c-image-box__image js-lazyload" src="'+goods[i].GD_MAIN_IM.split(',')[0]+'">';
									output+='						</div>';
									output+='					</a>';
									output+='					<p>';
									output+='						<a class="c-product-list__name" href="/itemInfo.html?item='+goods[i].GD_PK+'">';
									output+='							<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">'+goods[i].GD_GOOD_NM+'</font></font>';
									output+='						</a>';
									output+='					</p>';
									output+='					<div class="c-product-info__price c-product-list__price">';
									output+='						<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">'+goods[i].GD_SELL_PR+' 원</font></font>';
									output+='					</div>';
									output+='					<div class="c-product-list__expl">';
									output+='						<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">'+goods[i].GD_GOOD_SNM+'</font></font>';
									output+='					</div>';
									output+='				</li>';
								}
								output+='			</ul>';
								output+='		</div>';
								output+='	</div>';
							}
							output+='</div>';
							if(relateGoods.length!=0){				//관련 뉴스기사가 있다면
								output+='	<div class="relatedentry">';
								output+='		<h3><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">관련 기사</font></font></h3>';
								output+='		<ul>';
								for(var i=0;i<relateGoods.length;i++){
									output+='			<li style="height: 104px;"><a href="/readNews?news_NO='+relateGoods[i].NEWS_PK+'">';
									output+='				<div class="thumb">';
									output+='					<img width="110" height="73" src="'+relateGoods[i].NEWS_MAIN_IM+'" class="attachment-110x110 size-110x110 wp-post-image" alt="">';
									output+='				</div>';
									output+='				<div class="text">';
									output+='					<span class="title">';
									output+='						<font style="vertical-align: inherit;"><font style="vertical-align: inherit;">'+relateGoods[i].NEWS_NM+'</font></font>';
									output+='					</span>';
									var newText = relateGoods[i].NEWS_CONT.replace(/(<([^>]+)>)/ig,"");					//뉴스 기사의 내용을 html태그가 없는 형식으로 newText에 담은 뒤
									for(var j=146;j<newText.length;j++){				//newText의 글자를 j개(=146) 가져올 것인데
										if(newText[j]!="$"&&newText[j]!="n"&&newText[j]!="b"&&newText[j]!="s"&&newText[j]!="p"&&newText[j]!=";"){		//nbsp;라는 띄어쓰기 형식이 있을시 띄어쓰기 형식이 끝날때 까지 j를 늘림
											break;
										}
									}
									output+='					<p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;" class="tapRemove">'+newText.substring(0,j);+'...</font></font></p>';
									output+='				</div>';
									output+='			</a></li>';
								}
								output+='		</ul>';
								output+='	</div>';
							}
							output+='</div>';
							output+=outputFooter;

							response.send(output);
							connection.release();
						});
					});
				})
			}
			else{
				response.end();
				connection.release();
			}
		});
	})
})

app.get('/myInfo.html',function(request,response){					//마이페이지 
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_PK=?",[request.session.US_PK], function (err,data) {		//세션에 있는 US_PK를 이용하여 나의 정보를 가져옴
			if(err) console.error('err',err);
		   	if(data!=''){
				var output="";
				output+=outputHead;
				output+='	<script src="js/myInfo.js"></script>';
		   		output+='	<link rel="stylesheet" type="text/css" charset="utf-8" href="css/myPage.css" />';
				output+="	<title>마을마켓 - 주문배송조회</title>";
				output+="			<div id = 'container' align='center'>";
		   		output+='				<div style="width: 1050px;padding:50px 0px;">';
		   		output+='					<div style="width: 185px;float: left;border: 1px solid #cfcfcf;background: #fff;">';
		   		output+='						<ul style="list-style: none;padding: 0;margin:0px;border:0px;text-align:left;">';
		   		output+='							<a href="/myPage.html"><li style="display: block;border-bottom: 1px solid #cfcfcf;padding: 10px 0;font-size: 16px;color: white;font-family: NanumGothic !important;background-color:#f65c50;text-align:center;">마이 페이지</li></a>';
		   		output+='							<li style="display: block;border-bottom: 1px solid #cfcfcf;padding: 10px 0 10px 20px;font-size: 16px;color: #565656;font-family: NanumGothic !important;">MY 쇼핑 리스트</li>';
		   		output+='							<li style="padding: 15px 0px;">';
		   		output+='								<table style="width: 100%;font-size: 12px;color: #000000;">';
		   		output+='									<tr>';
		   		output+='										<td style="padding:3px 20px 3px 20px;"><a href="/myInfo.html" class="myPageHover">주문배송정보</a></td>';
		   		output+='									</tr>';
		   		output+='									<tr>';
		   		output+='										<td style="padding:3px 20px 3px 20px;"><a href="/cart.html" class="myPageHover">장바구니</a></td>';
		   		output+='									</tr>';
		   		output+='									<tr>';
		   		output+='										<td style="padding:3px 20px 3px 20px;"><a href="/addressBook.html?page=1" class="myPageHover">배송지 관리</a></td>';
		   		output+='									</tr>';
		   		output+='									<tr>';
		   		output+='										<td style="padding:3px 20px 3px 20px;"><a href="/myReturn.html" class="myPageHover">반품/교환 내역</a></td>';
		   		output+='									</tr>';
		   		output+='								</table>';
		   		output+='							</li>';
		   		output+='						</ul>';
		   		output+='						<ul style="list-style: none;padding: 0;margin: 0px;border:0px;text-align:left;">';
		   		output+='							<li style="display: block;border-bottom: 1px solid #cfcfcf;border-top: 1px solid #cfcfcf;padding: 10px 0 10px 20px;font-size: 16px;color: #565656;font-family: NanumGothic !important;">MY 쇼핑정보</li>';
		   		output+='							<li style="padding: 15px 0px;">';
		   		output+='								<table style="width: 100%;font-size: 12px;color: #000000;">';
		   		output+='									<tr>';
		   		output+='										<td style="padding:3px 20px 3px 20px;"><a href="/myInfoModify.html" class="myPageHover">회원정보수정</a></td>';
		   		output+='									</tr>';
		   		output+='									<tr>';
		   		output+='										<td style="padding:3px 20px 3px 20px;"><a href="/userDelete.html" class="myPageHover">회원탈퇴</a></td>';
		   		output+='									</tr>';
		   		output+='								</table>';
		   		output+='							</li>';
		   		output+='						</ul>';
		   		output+='					</div>';
				output+="					<div style='width:830px;float: right;'>";
				output+="						<div style='width: 810px;'>";
				output+="							<div style='width:100%;font-size:22px;margin-bottom:10px;text-align:left;font-weight: bold;color: #555;'>주문배송정보</div>";
				output+="							<div style='width:100%;font-size:11px;text-align:left;color:rgb(104,104,104);'>-주문번호를 클릭하시면 개별 주문건의 세부내역 확인이 가능합니다.</div>";
				output+="							<div id='total' style='width:100%;font-size:11px;margin-bottom:5px;text-align:right;'>total 0</div>";
				output+="							<table id='orderTb' style='width:100%;border-top:solid 2px;border-bottom:solid 1px;font-size: 12px;border-spacing: 0px;text-align:center;'>";
				output+='								<tr>';
				output+='									<td style="padding:5px 10px 5px 10px;width: 100px;border-right: solid 1px rgb(204,204,204);border-bottom: solid 1px rgb(204,204,204);background-color:rgb(245,245,245);">주문번호</td><td style="padding:5px 10px 5px 10px;border-bottom: solid 1px rgb(204,204,204);background-color:rgb(245,245,245);border-right: solid 1px rgb(204,204,204);width:380px;">상품명</td>';
				output+='									<td style="padding:5px 10px 5px 10px;width: 80px;border-right: solid 1px rgb(204,204,204);border-bottom: solid 1px rgb(204,204,204);background-color:rgb(245,245,245);">주문일</td>';
				output+='									<td style="padding:5px 10px 5px 10px;width: 90px;border-right: solid 1px rgb(204,204,204);border-bottom: solid 1px rgb(204,204,204);background-color:rgb(245,245,245);">주문금액</td>';
				output+='									<td style="padding:5px 10px 5px 10px;border-bottom: solid 1px rgb(204,204,204);background-color:rgb(245,245,245);">주문상태</td>';
				output+='								</tr>';
				output+='								<tr id="noOrder"><td colspan="5" style="height:100px;">주문내역이 없습니다.</td></tr>';
				output+='							</table>';
				output+='						</div>';
				output+='					</div>';
				output+='				</div>';
				output+='			</div>';
				output+=outputFooter;

				response.send(output);
				connection.release();
			}
			else{
				response.redirect('/login.html?url=/myInfo.html');
				connection.release();
			}
		})
	})
})

app.get('/orderInfo.html',function(request,response){							//주문 배송 조회 페이지
	var us_pk=request.session.US_PK;
	var order=request.param("order");
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_PK=?",[us_pk], function (err,data) {
			if(err) console.error('err',err);
		   	if(data!=''){
				connection.query("SELECT * FROM ORDERS_TB WHERE OD_ORDER_NO=? AND OD_US_FK="+us_pk,[order], function (err,data) {			//데이터베이스에서 주문번호가 파라미터와 일치하고 로그인한 유저의 아이템을 가져옴(주문번호만 맞다면 내가아닌 다른유저가 접속해서 내역을 볼 수 있기 때문임)
					if(err) console.error('err',err);
				   	if(data!=''){
						connection.query("SELECT * FROM USERS_TB WHERE US_PK=?",[data[0].OD_US_FK], function (err,data2) {			//데이터베이스에서 해당 주문내역의 아이템의 정보를 가져옴
							if(err) console.error('err',err);
							var output="";
							output+=outputHead;
							output+='	<script src="js/orderInfo.js"></script>';
							output+="	<title>마을마켓 - 주문배송조회</title>";
							output+="			<div id = 'container' align='center'>";
							output+="				<div style='width: 1100px;padding:20px 0px 20px 0px;'>";
							output+="					<div style='width:100%;padding-bottom:60px;;border-bottom:1px solid rgb(204,204,204);'>";
							output+="						<div style='width:100%'>";
							output+="							<div style='width:100%;font-size:30px;margin-bottom:15px;text-align:left;'>ORDER LIST</div>";
							output+="							<table style='width:100%;font-size: 12px;border-spacing: 0px;text-align:left;'>";
							output+='								<tr>';
							output+='									<td style="width:350px;">';
							output+='										<table style="width:100%;">';
							output+='											<tr>';
							output+='												<td colspan="3" style="font-size:13px;font-weight:bold;">';
							output+='													주문정보';
							output+='												</td>';
							output+='											</tr>';
							output+='											<tr>';
							output+='												<td colspan="3" height="1" style="border-bottom:2px solid;">';
							output+='												</td>';
							output+='											</tr>';
							output+='											<tr>';
							output+='												<td colspan="3" height="6">';
							output+='												</td>';
							output+='											</tr>';
							output+='											<tr>';
							output+='												<td>';
							output+='													주문번호';
							output+='												</td>';
							output+='												<td colspan="2" style="font-weight:bold;">';
							output+='													'+order;
							output+='												</td>';
							output+='											</tr>';
							output+='											<tr>';
							output+='												<td colspan="3" height="4">';
							output+='												</td>';
							output+='											</tr>';
							output+='											<tr>';
							output+='												<td>';
							output+='													주문일자';
							output+='												</td>';
							output+='												<td colspan="2">';
							output+='													'+order.slice(0,4)+'년 '+order.slice(4,6)+'월 '+order.slice(6,8)+'일 '+order.slice(8,10)+'시 '+order.slice(10,12)+'분';
							output+='												</td>';
							output+='											</tr>';
							output+='											<tr>';
							output+='												<td colspan="3" height="4">';
							output+='												</td>';
							output+='											</tr>';
							output+='											<tr>';
							output+='												<td colspan="3" height="16">';
							output+='												</td>';
							output+='											</tr>';
							output+='										</table>';
							output+='									</td>';
							output+='									<td style="width:25px;">';
							output+='									</td>';
							output+='									<td style="width:350px;">';
							output+='										<table style="width:100%;">';
							output+='											<tr>';
							output+='												<td colspan="3" style="font-size:13px;font-weight:bold;">';
							output+='													주문자정보';
							output+='												</td>';
							output+='											</tr>';
							output+='											<tr>';
							output+='												<td colspan="3" height="1" style="border-bottom:2px solid;">';
							output+='												</td>';
							output+='											</tr>';
							output+='											<tr>';
							output+='												<td colspan="3" height="6">';
							output+='												</td>';
							output+='											</tr>';
							output+='											<tr>';
							output+='												<td style="width:90px;">';
							output+='													주문자';
							output+='												</td>';
							output+='												<td colspan="2">';
							output+='													'+data2[0].US_USER_NM;
							output+='												</td>';
							output+='											</tr>';
							output+='											<tr>';
							output+='												<td colspan="3" height="4">';
							output+='												</td>';
							output+='											</tr>';
							output+='											<tr>';
							output+='												<td>';
							output+='													연락처';
							output+='												</td>';
							output+='												<td colspan="2">';
							output+='													'+data2[0].US_PHONE_NO;
							output+='												</td>';
							output+='											</tr>';
							output+='											<tr>';
							output+='												<td colspan="3" height="4">';
							output+='												</td>';
							output+='											</tr>';
							output+='											<tr>';
							output+='												<td>';
							output+='													이메일';
							output+='												</td>';
							output+='												<td colspan="2">';
							output+='													'+data2[0].US_USER_EM;
							output+='												</td>';
							output+='											</tr>';
							output+='										</table>';
							output+='									</td>';
							output+='									<td style="width:25px;">';
							output+='									</td>';
							output+='									<td style="width:350px;">';
							output+='										<table style="width:100%;">';
							output+='											<tr>';
							output+='												<td colspan="3" style="font-size:13px;font-weight:bold;">';
							output+='													결제정보';
							output+='												</td>';
							output+='											</tr>';
							output+='											<tr>';
							output+='												<td colspan="3" height="1" style="border-bottom:2px solid;">';
							output+='												</td>';
							output+='											</tr>';
							output+='											<tr>';
							output+='												<td colspan="3" height="6">';
							output+='												</td>';
							output+='											</tr>';
							output+='											<tr>';
							output+='												<td style="width:90px;">';
							output+='													결제수단';
							output+='												</td>';
							output+='												<td colspan="2">';
							output+='													'+data[0].OD_DEPOSIT_MTD;
							output+='												</td>';
							output+='											</tr>';
							output+='											<tr>';
							output+='												<td colspan="3" height="4">';
							output+='												</td>';
							output+='											</tr>';
							output+='											<tr>';
							output+='												<td>';
							output+='													입금계좌';
							output+='												</td>';
							output+='												<td colspan="2">';
							output+='													국민은행 043902-04-224858 예금주:김유준';
							output+='												</td>';
							output+='											</tr>';
							output+='											<tr>';
							output+='												<td colspan="3" height="4">';
							output+='												</td>';
							output+='											</tr>';
							output+='											<tr>';
							output+='												<td>';
							output+='													입금자명';
							output+='												</td>';
							output+='												<td colspan="2">';
							output+='													'+data[0].OD_DEPOSIT_NM;
							output+='												</td>';
							output+='											</tr>';
							output+='										</table>';
							output+='									</td>';
							output+='								</tr>';
							output+='							</table>';
							if(data[0].OD_ORDER_ST==1){
								output+='							<div style="margin-top:60px;font-size:13px;text-align:left;width:100%;font-weight:bold;padding-bottom:5px;">주문상품<button style="float:right;border:0px;background-color:black;color:white;font-size:12px;cursor:pointer;" onclick="cancelOrder('+data[0].OD_ORDER_NO+')">주문취소</button></div>';
							}
							else{
								output+='							<div style="margin-top:60px;font-size:13px;text-align:left;width:100%;font-weight:bold;padding-bottom:5px;">주문상품</div>';
							}
							output+="							<table id='orderTb' style='width:100%;font-size: 11px;border-spacing: 0px;text-align:center;border-top: 2px solid #545454'>";
							output+='								<tr>';
							output+='									<td style="background-color: #efefef;border-left: 1px solid #e1e1e1;border-right: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;height:30px;">';
							output+='										주문상품';
							output+='									</td>';
							output+='									<td style="background-color: #efefef;border-right: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;width:120px;">';
							output+='										수량';
							output+='									</td>';
							output+='									<td style="background-color: #efefef;border-right: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;width:120px;">';
							output+='										상품금액';
							output+='									</td>';
							output+='									<td style="background-color: #efefef;border-right: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;width:120px;">';
							output+='										예상적립';
							output+='									</td>';
							output+='									<td style="background-color: #efefef;border-right: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;width:120px;">';
							output+='										상품상태';
							output+='									</td>';
							output+='									<td style="background-color: #efefef;border-right: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;width:120px;">';
							output+='										배송';
							output+='									</td>';
							output+='								</tr>';
							var momentArray=[];
							var flag=0;
							for(var i=0;i<data.length;i++){						//주문내역에서 구매한 아이템들의 정보를 모두 가져오기 위해 momentArray에 아이템의 pk를 모두 담음
								for(var j=0;j<momentArray.length;j++){
									if(momentArray[j]==data[i].OD_GD_FK){
										flag=1;
										break;
									}
								}
								if(flag==0){
									momentArray.push(data[i].OD_GD_FK);
								}
							}
							connection.query("SELECT * FROM GOODS_TB WHERE GD_PK IN (?)",[momentArray], function (err,data3) {		//데이터베이스에서 아이템들의 정보를 모두 가져옴
								if(err) console.error('err',err);
								var allAmount=0;
								var allPrice=0;
								var allMileage=0;
								var allDelPrice=0;

								for(var i=0;i<data3.length;i++){
									allDelPrice+=data3[i].GD_DELIVERY_PR;
								}

								for(var i=0;i<data.length;i++){
									for(var j=0;j<data3.length;j++){
										if(data[i].OD_GD_FK==data3[j].GD_PK){
											break;
										}
									}
									output+='								<tr>';
									output+='									<td style="border-left: 1px solid #e1e1e1;border-right: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;height:23px;padding:3px 3px;">';
									output+='										<table>';
									output+='											<tr>';
									output+='												<td style="width:40px;padding:3px 3px;">';
									output+='													<img src="'+data3[j].GD_MAIN_IM.split(',')[0]+'" style="width:30px;height:30px;">';
									output+='												</td>';
									output+='												<td style="padding:3px 3px;">';
									output+='													<div style="width:100%;text-align:left;">'+data3[j].GD_GOOD_NM;
									output+='													</div>';
									output+='												</td>';
									output+='											</tr>';
									output+='										</table>';
									output+='									</td>';
									output+='									<td style="border-right: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;padding:3px 3px;text-align:right;">';
									output+='										'+data[i].OD_GOOD_AMT;
									output+='									</td>';
									output+='									<td style="border-right: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;padding:3px 3px;">';
									output+='										<div style="width:100%;text-align:right;">';
									var price=Number(data[i].OD_GOOD_AMT*data3[j].GD_SELL_PR);
									output+='											'+numberWithCommas(price);
									output+='										</div>';
									output+='									</td>';
									output+='									<td style="border-right: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;padding:3px 3px;">';
									output+='										<div style="width:100%;text-align:center;">';
									output+='											<span style="background-color:skyblue;color:white;border-radius:4px;border:0.4px solid blue;">적</span>&nbsp&nbsp&nbsp&nbsp'+numberWithCommas(price/100);
									output+='										</div>';
									output+='									</td>';
									output+='									<td style="border-right: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;padding:3px 3px;">';
									if(data[i].OD_ORDER_ST==1){
										output+='										입금확인중';
									}
									else if(data[i].OD_ORDER_ST==2){
										output+='										주문접수';
									}
									else if(data[i].OD_ORDER_ST==3){
										output+='										배송준비중';
									}
									else if(data[i].OD_ORDER_ST==4){
										output+='										배송중';
									}
									else if(data[i].OD_ORDER_ST==5){
										output+='										배송완료';
									}
									else if(data[i].OD_ORDER_ST==0){
										output+='										주문취소';
									}
									output+='									</td>';
									output+='									<td style="border-right: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;padding:3px 3px;">';
									output+='										<div style="width:100%;text-align:right;">';
									output+='											'+numberWithCommas(data3[j].GD_DELIVERY_PR);
									output+='										</div>';
									output+='									</td>';
									output+='								</tr>';
									allAmount+=data[i].OD_GOOD_AMT;
									allPrice+=price;
									allMileage+=price/100;
								}
								output+='								<tr>';
								output+='									<td style="border-left: 1px solid #e1e1e1;border-right: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;height:23px;padding:3px 3px;text-align:right;">';
								output+='										소계';
								output+='									</td>';
								output+='									<td style="border-right: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;padding:3px 3px;text-align:right;font-weight:bold;">';
								output+='										'+allAmount+'('+data3.length+'종)';
								output+='									</td>';
								output+='									<td style="border-right: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;padding:3px 3px;">';
								output+='										<div style="width:100%;text-align:right;color: #4298d3;">';
								output+='											'+numberWithCommas(allPrice);
								output+='										</div>';
								output+='									</td>';
								output+='									<td style="border-right: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;padding:3px 3px;">';
								output+='										<div style="width:100%;text-align:center;">';
								output+='											<span style="background-color:skyblue;color:white;border-radius:4px;border:0.4px solid blue;">적</span>&nbsp&nbsp&nbsp&nbsp'+numberWithCommas(allMileage);
								output+='										</div>';
								output+='									</td>';
								output+='									<td style="border-right: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;padding:3px 3px;">';
								output+='									</td>';
								output+='									<td style="border-right: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;padding:3px 3px;">';
								output+='										<div style="width:100%;text-align:right;">';
								output+='											'+numberWithCommas(allDelPrice);
								output+='										</div>';
								output+='									</td>';
								output+='								</tr>';
								output+='							</table>';
								output+='					<div align="left" style="margin-top: 80px;font-weight: bold;font-size: 13px;border-bottom: 2px solid;padding-bottom: 5px;">';
								output+='						최종결제금액</div>';
								output+='					<table style="width: 800px;font-size: 11.5px;margin-top: 5px;border-spacing: 0px;min-height: 40px;padding: 5px;float: left;">';
								output+='						<tr>';
								output+='							<td style="width:120px;">예상적립혜택</td>';
								output+='							<td style="width:150px;">적립금 <span id="getMileage" style="font-weight:bold;">'+numberWithCommas((allPrice-data[0].OD_MILEAGE_PR)/100)+'</span>원</td>';
								output+='							<td></td>';
								output+='						</tr>';
								output+='					</table>';
								output+='					<table style="width: 300px;min-height: 120px;padding: 10px;font-size: 11.5px;background-color: rgb(154,154,154);color:white;">';
								output+='						<tr>';
								output+='							<td>총 상품금액</td>';
								output+='							<td style="text-align: right;">'+numberWithCommas(allPrice)+' 원</td>';
								output+='						</tr>';
								output+='						<tr>';
								output+='							<td height="5"></td>';
								output+='						</tr>';
								output+='						<tr>';
								output+='							<td>총 배송비</td>';
								output+='							<td style="text-align: right;">'+numberWithCommas(allDelPrice)+' 원</td>';
								output+='						</tr>';
								output+='						<tr>';
								output+='							<td height="5"></td>';
								output+='						</tr>';
								output+='						<tr>';
								output+='							<td>총 할인</td>';
								if(allPrice<50000){
									output+='							<td style="text-align: right;">0 원</td>';
								}
								else{
									output+='							<td style="text-align: right;">'+numberWithCommas(allDelPrice)+' 원</td>';
								}
								output+='						</tr>';
								output+='						<tr>';
								output+='							<td height="5"></td>';
								output+='						</tr>';
								output+='						<tr>';
								output+='							<td>사용 적립금</td>';
								output+='							<td style="text-align: right;"><span id="useMileage">'+numberWithCommas(data[0].OD_MILEAGE_PR)+'</span> 원</td>';
								output+='						</tr>';
								output+='						<tr>';
								output+='							<td height="5"></td>';
								output+='						</tr>';
								output+='						<tr style="font-size: 15px;font-weight: bold;">';
								output+='							<td>총 결제금액</td>';
								output+='							<td style="text-align: right;font-size:20px;"><span id="finalPrice2">'+numberWithCommas(data[0].OD_DEPOSIT_PR)+'</span> 원</td>';
								output+='						</tr>';
								output+='					</table>';
								output+='					<div align="left" style="margin-top: 80px;font-weight: bold;font-size: 13px;border-bottom: 2px solid;padding-bottom: 5px;">';
								output+='						배송지정보</div>';
								output+='					<table style="width: 1100px;font-size: 11.5px;margin-top: 5px;border-spacing: 0px;min-height: 40px;padding: 5px;text-align:left;">';
								output+='						<tr>';
								output+='							<td style="width:100px;padding:3px 3px;">받는사람</td>';
								output+='							<td style="padding:3px 3px;">'+data[0].OD_RECEIVER_NM+'</td>';
								output+='						</tr>';
								output+='						<tr height="5"></tr>';
								output+='						<tr>';
								output+='							<td style="width:100px;padding:3px 3px;">연락처</td>';
								var momentPhoneNum=data[0].OD_RECEIVER_PHONE_NO;
								output+='							<td style="padding:3px 3px;">전화번호 '+data[0].OD_RECEIVER_NO+' / 휴대폰 '+momentPhoneNum.slice(0,3)+'-'+momentPhoneNum.slice(3,7)+'-'+momentPhoneNum.slice(7,11)+'</td>';
								output+='						</tr>';
								output+='						<tr height="5"></tr>';
								output+='						<tr>';
								output+='							<td style="width:100px;padding:3px 3px;">주소</td>';
								output+='							<td style="padding:3px 3px;">';
								output+='								<div style="width:100%;">'+data[0].OD_RECEIVER_AD1+'</div>';
								output+='								<div style="width:100%;">(상세주소) '+data[0].OD_RECEIVER_AD2+'</div>';
								output+='							</td>';
								output+='						</tr>';
								output+='						<tr height="5"></tr>';
								output+='						<tr>';
								output+='							<td style="width:100px;padding:3px 3px;">배송메시지</td>';
								output+='							<td style="padding:3px 3px;"><div style="word-wrap:break-word;width:1000px;">'+data[0].OD_RECEIVER_MESSAGE_CT+'</div></td>';
								output+='						</tr>';
								output+='					</table>';
								output+='						</div>';
								output+='					</div>';
								output+='					<div style="width:100%;" align="right">';
								output+='						<a href="myInfo.html"><button style="margin-right:10px;margin-top:10px;background-color:rgb(91,103,129);border:0px;color:white;width:140px;height:44px;font-size:14px;border-radius:3px;cursor:pointer;">주문목록</button><a>';
								output+='					</div>';
								output+='				</div>';
								output+='			</div>';
								output+=outputFooter;

								response.send(output);
								connection.release();
							});
						})
					}
					else{
						response.redirect('/login.html?url=/orderInfo.html?order='+order);
						connection.release();
					}
				})
			}
			else{
				response.redirect('/login.html?url=/orderInfo.html?order='+order);
				connection.release();
			}
		})
	})
})

app.get('/myInfoModify.html',function(request,response){					//나의 정보 수정 페이지
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_PK=?",[request.session.US_PK], function (err,data) {
			if(err) console.error('err',err);
		   	if(data!=''){
		   		var email=data[0].US_USER_EM;
		   		var emailArr=email.split('@');
		   		var phone=data[0].US_PHONE_NO;
		   		var phone1=phone.slice(0,3);
		   		var phone2=phone.slice(3,7);
		   		var phone3=phone.slice(7,11);
				var output="";
				output+=outputHead;
				output+='	<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>';
				output+='	<link rel="stylesheet" type="text/css" href="jquery-ui-1.12.1.custom/jquery-ui.css"/>';
				output+='	<script type="text/javascript" src="jquery-ui-1.12.1.custom/jquery-ui.js"></script>';
				output+='	<script type="text/javascript" src="js/myInfoModify.js"></script>';
		   		output+='	<link rel="stylesheet" type="text/css" charset="utf-8" href="css/myPage.css" />';
				output+='<style>';
				output+='.ui-datepicker{ font-size: 12px; width: 200px; }';
				output+='</style>';
				output+="	<title>마을마켓 - 회원정보 설정</title>";
				output+="			<div id = 'container' align='center'>";
		   		output+='				<div style="width: 1050px;padding:50px 0px;">';
		   		output+='					<div style="width: 185px;float: left;border: 1px solid #cfcfcf;background: #fff;">';
		   		output+='						<ul style="list-style: none;padding: 0;margin:0px;border:0px;text-align:left;">';
		   		output+='							<a href="/myPage.html"><li style="display: block;border-bottom: 1px solid #cfcfcf;padding: 10px 0;font-size: 16px;color: white;font-family: NanumGothic !important;background-color:#f65c50;text-align:center;">마이 페이지</li></a>';
		   		output+='							<li style="display: block;border-bottom: 1px solid #cfcfcf;padding: 10px 0 10px 20px;font-size: 16px;color: #565656;font-family: NanumGothic !important;">MY 쇼핑 리스트</li>';
		   		output+='							<li style="padding: 15px 0px;">';
		   		output+='								<table style="width: 100%;font-size: 12px;color: #000000;">';
		   		output+='									<tr>';
		   		output+='										<td style="padding:3px 20px 3px 20px;"><a href="/myInfo.html" class="myPageHover">주문배송정보</a></td>';
		   		output+='									</tr>';
		   		output+='									<tr>';
		   		output+='										<td style="padding:3px 20px 3px 20px;"><a href="/cart.html" class="myPageHover">장바구니</a></td>';
		   		output+='									</tr>';
		   		output+='									<tr>';
		   		output+='										<td style="padding:3px 20px 3px 20px;"><a href="/addressBook.html?page=1" class="myPageHover">배송지 관리</a></td>';
		   		output+='									</tr>';
		   		output+='									<tr>';
		   		output+='										<td style="padding:3px 20px 3px 20px;"><a href="/myReturn.html" class="myPageHover">반품/교환 내역</a></td>';
		   		output+='									</tr>';
		   		output+='								</table>';
		   		output+='							</li>';
		   		output+='						</ul>';
		   		output+='						<ul style="list-style: none;padding: 0;margin: 0px;border:0px;text-align:left;">';
		   		output+='							<li style="display: block;border-bottom: 1px solid #cfcfcf;border-top: 1px solid #cfcfcf;padding: 10px 0 10px 20px;font-size: 16px;color: #565656;font-family: NanumGothic !important;">MY 쇼핑정보</li>';
		   		output+='							<li style="padding: 15px 0px;">';
		   		output+='								<table style="width: 100%;font-size: 12px;color: #000000;">';
		   		output+='									<tr>';
		   		output+='										<td style="padding:3px 20px 3px 20px;"><a href="/myInfoModify.html" class="myPageHover">회원정보수정</a></td>';
		   		output+='									</tr>';
		   		output+='									<tr>';
		   		output+='										<td style="padding:3px 20px 3px 20px;"><a href="/userDelete.html" class="myPageHover">회원탈퇴</a></td>';
		   		output+='									</tr>';
		   		output+='								</table>';
		   		output+='							</li>';
		   		output+='						</ul>';
		   		output+='					</div>';
				output+="					<div style='width:830px;float: right;'>";
				output+="						<div style='width: 810px;'>";
				output+="							<div style='width:100%;font-size:22px;margin-bottom:10px;text-align:left;font-weight: bold;color: #555;'>회원정보수정</div>";
				output+="							<div style='width:100%;font-size:11px;text-align:left;color:rgb(104,104,104);'>- 회원님의 정보를 수정하실 수 있습니다.</div>";
				output+='					<div style="width:100%;padding-bottom:5px;border-bottom:2px solid black;" align="left"></div>';
				output+='					<table style="width:100%;margin-top:20px;border-spacing:0px;">';
				output+='						<tr>';
				output+='							<td style="width:100px;font-size:12px;text-align:right;"><span style="color:red;">*</span>이름</td>';
				output+='							<td style="padding-left:30px;font-size:12px;">'+data[0].US_USER_NM+'</td>';
				output+='						</tr>';
				output+='						<tr>';
				output+='							<td height="6"></td>';
				output+='						</tr>';
				output+='						<tr>';
				output+='							<td style="width:100px;font-size:12px;text-align:right;"><span style="color:red;">*</span>아이디</td>';
				output+='							<td style="padding-left:30px;font-size:12px;">'+data[0].US_USER_ID+'</td>';
				output+='						</tr>';
				output+='						<tr>';
				output+='							<td height="6"></td>';
				output+='						</tr>';
				output+='						<tr>';
				output+='							<td style="width:100px;font-size:12px;text-align:right;"><span style="color:red;">*</span>기존 비밀번호</td>';
				output+='							<td style="padding-left:30px;"><input id="password" type="password" style="width:100px;border:1px solid rgb(204,204,204);" onfocus="preventFocusFun()" onfocusout="pwFocusoutFun()" maxlength="20"></td>';
				output+='						</tr>';
				output+='						<tr>';
				output+='							<td height="6"></td>';
				output+='						</tr>';
				output+='						<tr>';
				output+='							<td style="width:100px;font-size:12px;text-align:right;"><span style="color:red;">*</span>신규 비밀번호</td>';
				output+='							<td style="padding-left:30px;"><input id="passwordCheck" type="password" style="width:100px;border:1px solid rgb(204,204,204);" onfocus="preventFocusFun()" onfocusout="pwFocusoutFun()" maxlength="20"><span style="color:rgb(154,154,154);font-size:11px;margin-left:5px;">공백 없는 영문, 숫자 포함 6-20자</span></td>';
				output+='						</tr>';
				output+='						<tr>';
				output+='							<td height="6"></td>';
				output+='						</tr>';
				output+='						<tr>';
				output+='							<td style="width:100px;font-size:12px;text-align:right;">생년월일</td>';
				output+='							<td style="padding-left:30px;"><input type="text" id="datepicker" style="width:100px;border:1px solid rgb(204,204,204);" readonly="true" value="'+data[0].US_BIRTH_YMD+'"></td>';
				output+='						</tr>';
				output+='						<tr>';
				output+='							<td height="6"></td>';
				output+='						</tr>';
				output+='						<tr>';
				output+='							<td style="width:100px;font-size:12px;text-align:right;">성별</td>';
				output+='							<td style="padding-left:30px;">';
				if(data[0].US_USER_SEX=='남'){
					output+='								<label style="font-size:12px;cursor:pointer;"><input id="남" type="radio" name="sex" checked>남자</label>';
					output+='								<label style="font-size:12px;margin-left:5px;cursor:pointer;"><input id="여" type="radio" name="sex">여자</label>';
				}
				else if(data[0].US_USER_SEX=='여'){
					output+='								<label style="font-size:12px;cursor:pointer;"><input id="남" type="radio" name="sex">남자</label>';
					output+='								<label style="font-size:12px;margin-left:5px;cursor:pointer;"><input id="여" type="radio" name="sex" checked>여자</label>';
				}
				else{
					output+='								<label style="font-size:12px;cursor:pointer;"><input id="남" type="radio" name="sex">남자</label>';
					output+='								<label style="font-size:12px;margin-left:5px;cursor:pointer;"><input id="여" type="radio" name="sex">여자</label>';
				}
				output+='							</td>';
				output+='						</tr>';
				output+='						<tr>';
				output+='							<td height="6"></td>';
				output+='						</tr>';
				output+='						<tr>';
				output+='							<td style="width:100px;font-size:12px;text-align:right;"><span style="color:red;">*</span>이메일</td>';
				output+='							<td style="padding-left:30px;font-size:11px;"><input id="email1" type="text" style="width:70px;border:1px solid rgb(204,204,204);" value="'+emailArr[0]+'">@<input id="email2" type="text" style="width:70px;border:1px solid rgb(204,204,204);" value="'+emailArr[1]+'">';
				output+='								<select style="font-size:12px;height:17px;" onchange="mailFun(this);">';
				output+='									<option value="직접선택" selected>직접선택</option>';
				output+='									<option value="naver.com">naver.com</option>';
				output+='									<option value="nate.com">nate.com</option>';
				output+='									<option value="dreamwiz.com">dreamwiz.com</option>';
				output+='									<option value="yahoo.co.kr">yahoo.co.kr</option>';
				output+='									<option value="empal.com">empal.com</option>';
				output+='									<option value="unitel.co.kr">unitel.co.kr</option>';
				output+='									<option value="gmail.com">gmail.com</option>';
				output+='									<option value="korea.com">korea.com</option>';
				output+='									<option value="chol.com">chol.com</option>';
				output+='									<option value="paran.com">paran.com</option>';
				output+='									<option value="freechal.com">freechal.com</option>';
				output+='									<option value="hanmail.net">hanmail.net</option>';
				output+='									<option value="hotmail.com">hotmail.com</option>';
				output+='								</select>';
				output+='								<label style="font-size:11.5px;margin-left:5px;cursor:pointer;"><input type="checkbox" name="mailAgree">정보메일을 수신하겠습니다.</label>';
				output+='							</td>';
				output+='						</tr>';
				output+='						<tr>';
				output+='							<td height="6"></td>';
				output+='						</tr>';
				output+='						<tr>';
				output+='							<td></td>';
				output+='							<td style="font-size:11px;color:rgb(104,104,104);padding-left:30px;">이메일 수신에 동의하시면 여러가지 할인혜택과 각종 이벤트 정보를 받아보실 수 있습니다.<br>회원가입관련, 주문배송관련 등의 메일은 수신동의와 상관없이 모든 회원에게 발송됩니다.</td>';
				output+='						</tr>';
				output+='						<tr>';
				output+='							<td height="6"></td>';
				output+='						</tr>';
				output+='						<tr>';
				output+='							<td style="width:100px;font-size:12px;text-align:right;"><span style="color:red;">*</span>휴대폰번호</td>';
				output+='							<td style="padding-left:30px;"><input id="phone1" type="text" style="width:40px;border:1px solid rgb(204,204,204);" maxlength="4" value="'+phone1+'"> - <input id="phone2" type="text" style="width:40px;border:1px solid rgb(204,204,204);" maxlength="4" value="'+phone2+'"> - <input id="phone3" type="text" style="width:40px;border:1px solid rgb(204,204,204);" maxlength="4" value="'+phone3+'">';
				output+='								<label style="font-size:11.5px;margin-left:5px;cursor:pointer;"><input type="checkbox" name="phoneAgree">SMS를 수신하겠습니다.</label>';
				output+='							</td>';
				output+='						</tr>';
				output+='						<tr>';
				output+='							<td height="6"></td>';
				output+='						</tr>';
				output+='						<tr>';
				output+='							<td></td>';
				output+='							<td style="font-size:11px;color:rgb(104,104,104);padding-left:30px;">SMS 수신에 동의하시면 여러가지 할인혜택과 각종 이벤트 정보를 받아보실 수 있습니다.<br>회원가입관련, 주문배송관련 등의 SMS는 수신동의와 상관없이 구매 회원에게 발송됩니다.</td>';
				output+='						</tr>';
				output+='						<tr>';
				output+='							<td height="6"></td>';
				output+='						</tr>';
				output+='						<tr>';
				output+='							<td style="width:100px;font-size:12px;text-align:right;">주소</td>';
				output+='							<td style="font-size:11px;color:rgb(104,104,104);padding-left:30px;">';
				output+='								<input type="text" id="sample6_postcode" maxlength="10" style="width: 106px;height: 16px;" value="'+data[0].US_ZIP_NO+'">';
				output+='								<input type="button" onclick="sample6_execDaumPostcode()" value="우편번호 찾기" style="border:0px;background-color:black;color:white;font-size:11px;cursor:pointer;"><br>';
				output+='							</td>';
				output+='						</tr>';
				output+='						<tr>';
				output+='							<td></td>';
				output+='							<td style="font-size:11px;color:rgb(104,104,104);padding-left:30px;height:22px;">';
				output+='								<input type="text" id="sample6_address" maxlength="100" style="height: 16px;" value="'+data[0].US_USER_AD1+'">';
				output+='								<input type="text" id="sample6_address2" maxlength="100" placeholder="상세주소" style="height: 16px;" value="'+data[0].US_USER_AD2+'">';
				output+='							</td>';
				output+='						</tr>';
				output+='						<tr>';
				output+='							<td height="30" style="border-bottom:1px solid rgb(204,204,204);"></td>';
				output+='							<td style="border-bottom:1px solid rgb(204,204,204);"></td>';
				output+='						</tr>';
				output+='					</table>';
				output+='					<div style="margin-top:30px;">';
				output+='						<button style="width:128px;height:42px;border:0px;background-color:rgb(84,84,84);color:white;font-weight:bold;cursor:pointer;border-radius:4px;" onclick="modifyFun()">확인</button>';
				output+='						<button style="width:128px;height:42px;border:0px;background-color:rgb(204,204,204);color:white;font-weight:bold;margin-left:20px;cursor:pointer;border-radius:4px;" onclick=\'location.href="/myInfoModify.html"\'>취소</button>';
				output+='					</div>';
				output+='						</div>';
				output+='					</div>';
				output+='				</div>';
				output+='			</div>';
				output+=outputFooter;

				response.send(output);
				connection.release();
			}
			else{
				response.redirect('/login.html?url=/myInfoModify.html');
				connection.release();
			}
		})
	})
})

app.get('/userDelete.html',function(request,response){						//회원탈퇴 페이지
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_PK=?",[request.session.US_PK], function (err,data) {
			if(err) console.error('err',err);
		   	if(data!=''){
				var output="";
				output+=outputHead;
				output+='<style>';
				output+='.ui-datepicker{ font-size: 12px; width: 200px; }';
				output+='</style>';
				output+='	<script type="text/javascript" src="js/userDelete.js"></script>';
		   		output+='	<link rel="stylesheet" type="text/css" charset="utf-8" href="css/myPage.css" />';
				output+="	<title>마을마켓 - 회원정보 설정</title>";
				output+="			<div id = 'container' align='center'>";
		   		output+='				<div style="width: 1050px;padding:50px 0px;">';
		   		output+='					<div style="width: 185px;float: left;border: 1px solid #cfcfcf;background: #fff;">';
		   		output+='						<ul style="list-style: none;padding: 0;margin:0px;border:0px;text-align:left;">';
		   		output+='							<a href="/myPage.html"><li style="display: block;border-bottom: 1px solid #cfcfcf;padding: 10px 0;font-size: 16px;color: white;font-family: NanumGothic !important;background-color:#f65c50;text-align:center;">마이 페이지</li></a>';
		   		output+='							<li style="display: block;border-bottom: 1px solid #cfcfcf;padding: 10px 0 10px 20px;font-size: 16px;color: #565656;font-family: NanumGothic !important;">MY 쇼핑 리스트</li>';
		   		output+='							<li style="padding: 15px 0px;">';
		   		output+='								<table style="width: 100%;font-size: 12px;color: #000000;">';
		   		output+='									<tr>';
		   		output+='										<td style="padding:3px 20px 3px 20px;"><a href="/myInfo.html" class="myPageHover">주문배송정보</a></td>';
		   		output+='									</tr>';
		   		output+='									<tr>';
		   		output+='										<td style="padding:3px 20px 3px 20px;"><a href="/cart.html" class="myPageHover">장바구니</a></td>';
		   		output+='									</tr>';
		   		output+='									<tr>';
		   		output+='										<td style="padding:3px 20px 3px 20px;"><a href="/addressBook.html?page=1" class="myPageHover">배송지 관리</a></td>';
		   		output+='									</tr>';
		   		output+='									<tr>';
		   		output+='										<td style="padding:3px 20px 3px 20px;"><a href="/myReturn.html" class="myPageHover">반품/교환 내역</a></td>';
		   		output+='									</tr>';
		   		output+='								</table>';
		   		output+='							</li>';
		   		output+='						</ul>';
		   		output+='						<ul style="list-style: none;padding: 0;margin: 0px;border:0px;text-align:left;">';
		   		output+='							<li style="display: block;border-bottom: 1px solid #cfcfcf;border-top: 1px solid #cfcfcf;padding: 10px 0 10px 20px;font-size: 16px;color: #565656;font-family: NanumGothic !important;">MY 쇼핑정보</li>';
		   		output+='							<li style="padding: 15px 0px;">';
		   		output+='								<table style="width: 100%;font-size: 12px;color: #000000;">';
		   		output+='									<tr>';
		   		output+='										<td style="padding:3px 20px 3px 20px;"><a href="/myInfoModify.html" class="myPageHover">회원정보수정</a></td>';
		   		output+='									</tr>';
		   		output+='									<tr>';
		   		output+='										<td style="padding:3px 20px 3px 20px;"><a href="/userDelete.html" class="myPageHover">회원탈퇴</a></td>';
		   		output+='									</tr>';
		   		output+='								</table>';
		   		output+='							</li>';
		   		output+='						</ul>';
		   		output+='					</div>';
				output+="					<div style='width:830px;float: right;'>";
				output+="						<div style='width: 810px;'>";
				output+="							<div style='width:100%;font-size:22px;margin-bottom:10px;text-align:left;font-weight: bold;color: #555;'>회원탈퇴</div>";
				output+="							<div style='width:100%;font-size:11px;text-align:left;color:rgb(104,104,104);'>- 회원 탈퇴를 하실 수 있습니다.</div>";
				output+='					<div style="width:100%;padding-bottom:5px;border-bottom:2px solid black;" align="left">';
				output+='					</div>';
				output+='					<div style="margin-top:20px;width:100%;padding-bottom:20px;border-bottom:1px solid rgb(204,204,204);">';
				output+='						<table style="border-spacing:0px;font-size:11px;width:100%;">';
				output+='							<tr>';
				output+='								<td style="width:150px;text-align:right;">';
				output+='									탈퇴사유';
				output+='								</td>';
				output+='								<td>';
				output+='									<label style="cursor:pointer;margin-left:30px;"><input type="radio" name="reason" value="배송 주문 불만족">배송 주문 불만족</label>';
				output+='									<label style="cursor:pointer;margin-left:10px;"><input type="radio" name="reason" value="사이트 이용 불편">사이트 이용 불편</label>';
				output+='									<label style="cursor:pointer;margin-left:10px;"><input type="radio" name="reason" value="상품품질 불만족">상품품질 불만족</label>';
				output+='									<label style="cursor:pointer;margin-left:10px;"><input type="radio" name="reason" value="서비스 불만족">서비스 불만족</label>';
				output+='									<label style="cursor:pointer;margin-left:10px;"><input type="radio" name="reason" value="기타">기타</label>';
				output+='								</td>';
				output+='							</tr>';
				output+='							<tr>';
				output+='								<td height="8">';
				output+='								</td>';
				output+='							</tr>';
				output+='							<tr>';
				output+='								<td style="width:150px;text-align:right;">';
				output+='									내용';
				output+='								</td>';
				output+='								<td>';
				output+='									<textarea id="content" maxlength="500" style="margin-left:30px;width:80%;height:80px;"></textarea>';
				output+='								</td>';
				output+='							</tr>';
				output+='						</table>';
				output+='					</div>';
				output+='					<div style="margin-top:30px;font-size:11px;width:100%;">';
				output+='						<div style="font-weight:bold;width:100%;">회원 탈퇴 시 회원님의 모든 정보가 바로 삭제되어집니다.!</div>';
				output+='						<div style="width:100%;">회원님의 개인정보, 주문내역, 적립금, 쿠폰 등 모든 정보가 쇼핑몰에서 삭제합니다.</div>';
				output+='						<div style="width:100%;"><label style="cursor:pointer;">예, 정보 삭제에 동의합니다.<input id="agree" type="checkbox" name="agree"></label></div>';
				output+='					</div>';
				output+='					<div style="margin-top:30px;">';
				output+='						<button style="width:128px;height:42px;border:0px;background-color:rgb(84,84,84);color:white;font-weight:bold;cursor:pointer;border-radius:4px;" onclick="deleteFun()">확인</button>';
				output+='						<button style="width:128px;height:42px;border:0px;background-color:rgb(204,204,204);color:white;font-weight:bold;margin-left:20px;cursor:pointer;border-radius:4px;" onclick=\'location.href="/userDelete.html"\'>취소</button>';
				output+='					</div>';
				output+='						</div>';
				output+='					</div>';
				output+='				</div>';
				output+='			</div>';
				output+=outputFooter;

				response.send(output);
				connection.release();
			}
			else{
				response.redirect('/login.html?url=/userDelete.html');
				connection.release();
			}
		})
	})
})

app.get('/cart.html',function(request,response){								//장바구니 페이지
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_PK=?",[request.session.US_PK], function (err,data) {
			if(err) console.error('err',err);
		   	if(data!=''){
		   		var output='';
		   		output+='<!DOCTYPE html>';
		   		output+='<html>';
		   		output+='<head>';
		   		output+='	<meta charset="utf-8"/>';
		   		output+='	<title>마을마켓 - 장바구니</title>';
		   		output+='	<script src="js/jquery-3.1.1.js"></script>';
		   		output+='	<script type="text/javascript" charset="utf-8" src="js/numberWithCommas.js"></script>';
		   		output+='	<script type="text/javascript" charset="utf-8" src="js/cart.js"></script>';
				output+='	<script src="js/header.js"></script>';
				output+='	<script src="js/loginCheck.js"></script>';
				output+='	<link rel="stylesheet" type="text/css" charset="utf-8" href="css/main.css" />';
		   		output+='	<link rel="stylesheet" type="text/css" charset="utf-8" href="css/myPage.css" />';
		   		output+='	<link rel="stylesheet" type="text/css" href="jquery-ui-1.12.1.custom/jquery-ui.css"/>';
		   		output+='	<script type="text/javascript" src="jquery-ui-1.12.1.custom/jquery-ui.js"></script>';
		   		output+='</head>';
		   		output+='<body>';
		   		output+='	<div id="page-wrapper" align="center">';
		   		output+='		<div>';
				output+='			<header id="header">';
				output+='				<div class="main-bg isTop">';
				output+='					<div class="main-bg-bar">';
				output+='						<ul class="main-bg-bar-nav">';
				output+='							<li style="border-right: 0;">';
				output+='								<a id="cart_a" href="">장바구니</a>';
				output+='							</li>';
				output+='							<li>';
				output+='								<a href="/service/home">고객센터</a>';
				output+='							</li>';
				output+='							<li>';
				output+='								<a id="myInfo_a" href="">마이페이지</a>';
				output+='							</li>';
				output+='							<li>';
				output+='								<a href="/joinAgree.html">회원가입</a>';
				output+='							</li>';
				output+='							<li>';
				output+='								<a id="login_a" href="">로그인</a>';
				output+='							</li>';
				output+='						</ul>';
				output+='					</div>';
				output+='					<div class="main-bg-header">';
				output+='						<div class="main-bg-header-container">';
				output+='							<a href="/" class="main-bg-header-container-logo">';
				output+='								<div style="font-family: \'Yoon_러브레터M\';font-size: 40px;font-weight: lighter;">마을마켓</div>';
				output+='								<div style="font-family: \'Yoon_러브레터M\';font-size: 180px;font-weight: lighter;margin-top: -85px;height: 80px;margin-left: 30px;">소소</div>';
				output+='							</a>';
				output+='							<div id="magnifier" align="right" style="margin-top: 10px;">';
				output+='								<span style="border: 1px solid #ddd;padding: 0px 5px;">';
				output+='									<img src="img/main/magnifier.png" width="14" height="14">';
				output+='									<input type="text" name="search" style="border: none;font-size: 15px;margin-left: 2px;">';
				output+='								</span>';
				output+='							</div>';
				output+='							<div class="main-bg-header-container-catchcopy">';
				output+='								<font style="vertical-align: inherit;">';
				output+='									상품 하나하나에 이웃의 이야기와 자부심이 있습니다.';
				output+='								</font>';
				output+='								<br>';
				output+='							</div>';
				output+='							<div style="text-align: left;">';
				output+='								<a href="./" class="main-bg-header-container-home"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">홈</font></font></a>';
				output+='								<div class="main-bg-header-container-nav">';
				output+='									<dl class="main-bg-header-container-nav-list">';
				output+='										<font style="vertical-align: inherit;">';
				output+='											<a href="/category.html?high_num=1&view=2">식품</a>';
				output+='										</font>';
				output+='									</dl>';
				output+='									<dl class="main-bg-header-container-nav-list">';
				output+='										<font style="vertical-align: inherit;">';
				output+='											<a href="/category.html?high_num=2&view=2">생활</a>';
				output+='										</font>';
				output+='									</dl>';
				output+='									<dl class="main-bg-header-container-nav-list">';
				output+='										<font style="vertical-align: inherit;">';
				output+='											기획';
				output+='										</font>';
				output+='									</dl>';
				output+='									<dl class="main-bg-header-container-nav-list">';
				output+='										<font style="vertical-align: inherit;">';
				output+='											<a href="/news_list">마마톡</a>';
				output+='										</font>';
				output+='									</dl>';
				output+='									<dl class="main-bg-header-container-nav-list" style="border-right: 0px;">';
				output+='										<font style="vertical-align: inherit;">';
				output+='											이웃마을';
				output+='										</font>';
				output+='									</dl>';
				output+='								</div>';
				output+='							</div>';
				output+='						</div>';
				output+='					</div>';
				output+='				</div>';
				output+='			</header>';
		   		output+='			<div id = "container" align="center">';
		   		output+='				<div style="width: 1050px;padding:50px 0px;">';
		   		output+='					<div style="width: 185px;float: left;border: 1px solid #cfcfcf;background: #fff;">';
		   		output+='						<ul style="list-style: none;padding: 0;margin:0px;border:0px;text-align:left;">';
		   		output+='							<a href="/myPage.html"><li style="display: block;border-bottom: 1px solid #cfcfcf;padding: 10px 0;font-size: 16px;color: white;font-family: NanumGothic !important;background-color:#f65c50;text-align:center;">마이 페이지</li></a>';
		   		output+='							<li style="display: block;border-bottom: 1px solid #cfcfcf;padding: 10px 0 10px 20px;font-size: 16px;color: #565656;font-family: NanumGothic !important;">MY 쇼핑 리스트</li>';
		   		output+='							<li style="padding: 15px 0px;">';
		   		output+='								<table style="width: 100%;font-size: 12px;color: #000000;">';
		   		output+='									<tr>';
		   		output+='										<td style="padding:3px 20px 3px 20px;"><a href="/myInfo.html" class="myPageHover">주문배송정보</a></td>';
		   		output+='									</tr>';
		   		output+='									<tr>';
		   		output+='										<td style="padding:3px 20px 3px 20px;"><a href="/cart.html" class="myPageHover">장바구니</a></td>';
		   		output+='									</tr>';
		   		output+='									<tr>';
		   		output+='										<td style="padding:3px 20px 3px 20px;"><a href="/addressBook.html?page=1" class="myPageHover">배송지 관리</a></td>';
		   		output+='									</tr>';
		   		output+='									<tr>';
		   		output+='										<td style="padding:3px 20px 3px 20px;"><a href="/myReturn.html" class="myPageHover">반품/교환 내역</a></td>';
		   		output+='									</tr>';
		   		output+='								</table>';
		   		output+='							</li>';
		   		output+='						</ul>';
		   		output+='						<ul style="list-style: none;padding: 0;margin: 0px;border:0px;text-align:left;">';
		   		output+='							<li style="display: block;border-bottom: 1px solid #cfcfcf;border-top: 1px solid #cfcfcf;padding: 10px 0 10px 20px;font-size: 16px;color: #565656;font-family: NanumGothic !important;">MY 쇼핑정보</li>';
		   		output+='							<li style="padding: 15px 0px;">';
		   		output+='								<table style="width: 100%;font-size: 12px;color: #000000;">';
		   		output+='									<tr>';
		   		output+='										<td style="padding:3px 20px 3px 20px;"><a href="/myInfoModify.html" class="myPageHover">회원정보수정</a></td>';
		   		output+='									</tr>';
		   		output+='									<tr>';
		   		output+='										<td style="padding:3px 20px 3px 20px;"><a href="/userDelete.html" class="myPageHover">회원탈퇴</a></td>';
		   		output+='									</tr>';
		   		output+='								</table>';
		   		output+='							</li>';
		   		output+='						</ul>';
		   		output+='					</div>';
		   		output+='					<div style="width:830px;float: right;">';
		   		output+='						<div style="width: 810px;">';
		   		output+='							<div style="width:100%;font-size:22px;margin-bottom:10px;text-align:left;font-weight: bold;color: #555;">장바구니</div>';
		   		output+='							<div align="left" style="margin-top: 30px;">';
		   		output+='								<button style="background-color: gray;color:white;font-size: 12px;border:0px;cursor: pointer;" onclick="allSelectFun()">전체선택</button>';
		   		output+='								<button style="background-color: gray;color:white;font-size: 12px;border:0px;cursor: pointer;" onclick="checkDelFun()">선택삭제</button>';
		   		output+='							</div>';
		   		output+='							<table id="cartTable" style="width: 100%;font-size: 11px;border-top: 2px solid;border-bottom:1px solid;margin-top: 20px;border-spacing: 0px;min-height: 120px;">';
		   		output+='								<tr style="background-color: rgb(250,250,250);height: 26px;">';
		   		output+='									<th style="font-weight: inherit;width: 40px;border-right: 1px solid rgb(204,204,204);border-bottom:1px solid rgb(204,204,204);">선택</th>';
		   		output+='									<th style="font-weight: inherit;width: 370px;border-right: 1px solid rgb(204,204,204);border-bottom:1px solid rgb(204,204,204);">주문상품</th>';
		   		output+='									<th style="font-weight: inherit;width: 60px;border-right: 1px solid rgb(204,204,204);border-bottom:1px solid rgb(204,204,204);">수량</th>';
		   		output+='									<th style="font-weight: inherit;width: 80px;border-right: 1px solid rgb(204,204,204);border-bottom:1px solid rgb(204,204,204);">상품금액</th>';
		   		output+='									<th style="font-weight: inherit;width: 70px;border-right: 1px solid rgb(204,204,204);border-bottom:1px solid rgb(204,204,204);">할인</th>';
		   		output+='									<th style="font-weight: inherit;width: 80px;border-right: 1px solid rgb(204,204,204);border-bottom:1px solid rgb(204,204,204);">할인가격</th>';
		   		output+='									<th style="font-weight: inherit;border-bottom:1px solid rgb(204,204,204);">배송비</th>';
		   		output+='								</tr>';
		   		output+='								<tr id="cartTableTr">';
		   		output+='								</tr>';
		   		output+='							</table>';
		   		output+='							<div align="right" style="height:36px;border-bottom: 2px solid rgb(234,234,234);background-color: rgb(250,250,250);"></div>';
		   		output+='							<div align="right" style="margin-top: 40px;">';
		   		output+='								<table>';
		   		output+='									<tr style="height: 30px;font-size: 12px;" align="center">';
		   		output+='										<td style="width: 80px;">총 수량</td>';
		   		output+='										<td style="width: 120px;">총 판매가격</td>';
		   		output+='										<td style="width: 120px;">배송비</td>';
		   		output+='										<td style="width: 120px;">총 할인</td>';
		   		output+='										<td style="width: 120px;">총 결제금액</td>';
		   		output+='									</tr>';
		   		output+='									<tr align="center">';
		   		output+='										<td id="allAmount">0</td>';
		   		output+='										<td id="allPrice">0</td>';
		   		output+='										<td id="allDelPrice">0</td>';
		   		output+='										<td id="allSale">0</td>';
		   		output+='										<td style="font-weight: bold;" id="wholePrice">0</td>';
		   		output+='									</tr>';
		   		output+='								</table>';
		   		output+='							</div>';
		   		output+='							<div align="right" style="margin-top: 10px;">';
		   		output+='								<span style="color:rgb(124,124,124);">총 결제금액</span>';
		   		output+='								<span style="color:rgb(255,115,115);" id="wholePrice2">0</span>';
		   		output+='							</div>';
		   		output+='							<div align="right" style="margin-top: 40px;">';
		   		output+='								<button style="color:white;border:0px;background-color: rgb(80,80,80);width: 140px;height: 44px;border-radius: 4px;font-weight: bold;font-size: 13px;cursor: pointer;" onclick="allBuyFun()">전체상품 주문하기</button>';
		   		output+='								<button style="color:white;border:0px;background-color: rgb(122,154,160);width: 140px;height: 44px;border-radius: 4px;font-weight: bold;font-size: 13px;cursor: pointer;" onclick="checkBuyFun()">선택상품 주문하기</button>';
		   		output+='								<button style="color:white;border:0px;background-color: rgb(166,166,166);width: 140px;height: 44px;border-radius: 4px;font-weight: bold;font-size: 13px;cursor: pointer;" onclick=\'location.href="/"\'>계속 쇼핑하기</button>';
		   		output+='							</div>';
		   		output+='						</div>';
		   		output+='					</div>';
		   		output+='				</div>';
		   		output+='			</div>';
				output+='		<footer id="footer" style="margin-top: 0px;">';
				output+='			<div class="footer-container">';
				output+='				<div class="footer-top" align="center">';
				output+='					상품에 대하여 배송, 교환, 반품의 민원 A/S 등은  "다시 뛰는 사람들" 에서 처리하며 모든 책임은 "다시 뛰는 사람들"에 있습니다.​';
				output+='					민원 담당자 : 마을마켓 소소 고객센터 /  연락처 : 031-963-2900';
				output+='				</div>';
				output+='				<div class="footer-mid" align="left">';
				output+='					<p style="font-size: 12px;">';
				output+='						<b>다시 뛰는 사람들</b>';
				output+='					</p>';
				output+='					<p style="font-size: 11px;">';
				output+='						우)10460 경기도 고양시 덕양구 고양시청로 13-2 성광빌딩 4층';
				output+='					</p>';
				output+='					<p style="font-size: 11px;">';
				output+='						| 대표자: 이영아 | 사업자등록번호: 128-86-63160 | 통신판매업신고: <!--제 2017-고양덕양구-0076호-->';
				output+='					</p>';
				output+='				</div>';
				output+='				<div class="footer-bottom" align="left">';
				output+='					<p style="font-size: 12px;">';
				output+='						<b>고객센터</b>';
				output+='					</p>';
				output+='					<p style="font-size: 11px;">';
				output+='						| Tel (031)963-2900 | Fax (031)965-2900 | e-mail: webmaster@mygoyang.com';
				output+='					</p>';
				output+='					<p style="font-size: 11px;">';
				output+='						| 월-금: 오전10시 - 오후 6시 (Break hour: 오후 1시 ~ 오후 2시)';
				output+='					</p>';
				output+='				</div>';
				output+='				<div class="pageTop">';
				output+='					<a href="#" class="pageTop-a">';
				output+='						<img src="/img/main/pageTop.png" width="100">';
				output+='					</a>';
				output+='				</div>';
				output+='			</div>';
				output+='		</footer>';
		   		output+='		</div>';
		   		output+='	</div>';
		   		output+="</body>";
		   		output+="</html>";

		   		response.send(output);
		   		connection.release();
		   	}
		   	else{
		   		response.redirect('/login.html?url=cart.html');
		   		connection.release();
		   	}
		})
	})
})

app.get('/order.html',function(request,response){						//주문하기 페이지
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_PK=?",[request.session.US_PK], function (err,data) {
			if(err) console.error('err',err);
		   	if(data!=''){
		   		var item=request.param('item');				//item파라미터를 가져옴(파라미터 형식 ==> 1번째아이템,2번째아이템,....,n번째아이템a1번째아이템수량,2번째아이템수량,...,n번째아이템수량 )
		   		var flag=0;
		   		for(var i=0;i<item.length;i++){				//item파라미터에 a라는 문자열이 없으면
		   			if(item[i]=='a'){
		   				flag=1;
		   				break;
		   			}
		   		}
		   		if(flag==0){
		   			response.redirect("/");					//메인페이지로 보냄
		   			return;
		   		}
			   	var itemArr=item.split('a');				//item파라미터에 a라는 문자열로 자름
			   	var itemNumArr=itemArr[0];
			   	if(itemArr.length!=2){						//item파라미터를 a라는 문자열로 잘랐을때 2칸의 배열이 아니라면
			   		response.redirect("/");					//메인페이지로 보냄
			   		return;
			   	}
				var itemAmountArr=itemArr[1];
				var itemNum=itemNumArr.split(',');			//item파라미터 1번째 배열을 ,로 자름
				var itemAmount=itemAmountArr.split(',');	//item파라미터 2번째 배열을 ,로 자름
				if(itemNum.length!=itemAmount.length){		//두개의 배열의 길이가 같지 않다면
					response.redirect("/");					//메인페이지로 보냄
					return;
				}
				var flag=0;
				for(var i=0;i<itemNum.length;i++){
					if(itemNum[i]<1){						//아이템의 숫자가 1보다 작거나(아이템의 고유키는 1이상이기 때문)
						flag=1;
						break;
					}
					if(!isNumber(itemNum[i])){				//아이템이 숫자가 아니거나
						flag=1;
						break;
					}
					if(itemAmount[i]<1){					//아이템의 수량의 1보다 작거나(아이템의 수량은 1이상이기 때문)
						flag=1;
						break;
					}
					if(!isNumber(itemAmount[i])){			//아이템의 수량이 숫자가 아니라면
						flag=1;
						break;
					}
				}
				if(flag==1){
					response.redirect("/");					//메인페이지로 보냄
					return;
				}
				var allItem=itemNumArr.split(',');
				connection.query("SELECT * FROM GOODS_TB WHERE GD_PK in (?);",[itemNum], function (err,data) {			//데이터베이스에서 모든 아이템의 정보를 가져옴
					if(err) console.error('err',err);
					var momentItem=[];
					var momentItemAmt=[];
					momentItem.push(itemNum[0]);
					momentItemAmt.push(Number(itemAmount[0]));
					for(var i=1;i<itemNum.length;i++){
						var flag=0;
						for(var j=0;j<momentItem.length;j++){
							if(momentItem[j]==itemNum[i]){
								flag=1;
								break;
							}
						}
						if(flag==0){							//아이템의 고유키가 같지 않다면
							momentItem.push(itemNum[i]);		//momentItem에 고유키를 push
							momentItemAmt.push(itemAmount[i]);	//momentItemAmt에 수량을 push
						}
						else{												//아이템의 고유키가 같다면
							momentItemAmt[j]+=Number(itemAmount[i]);		//해당 아이템의 수량을 늘림
						}
					}

					for(var i=0;i<momentItem.length;i++){
						for(var j=0;j<data.length;j++){
							if(momentItem[i]==data[j].GD_PK){			//momentItem의 고유키와 데이터베이스에서 가져온 고유키가 같다면
								break;									
							}
						}
						if(data[j]==undefined){							//data[j]의 정보가 없다면
							response.redirect("/");						//메인페이지로 보냄
						}
						if(momentItemAmt[i]>data[j].GD_GOOD_AMT){		//실제 남아있는 아이템 수량이 momentItemAmt수량보다 적을 경우
							var output='';
							output+='<!DOCTYPE html>';
							output+='<html>';
							output+='<head>';
							output+='	<meta charset="utf-8"/>';
							output+='	<title>마을마켓 - 주문</title>';
							output+='	<script src="js/jquery-3.1.1.js"></script>';
							output+='	<script type="text/javascript" charset="utf-8" src="js/numberWithCommas.js"></script>';
							output+='	<script type="text/javascript" charset="utf-8" src="js/order.js"></script>';
							output+='	<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>';
							output+='	<script src="js/daumAddress.js"></script>';
							output+='	<link rel="stylesheet" type="text/css" charset="utf-8" href="css/index.css" />';
							output+='	<link rel="stylesheet" type="text/css" href="jquery-ui-1.12.1.custom/jquery-ui.css"/>';
							output+='	<script type="text/javascript" src="jquery-ui-1.12.1.custom/jquery-ui.js"></script>';
							output+='</head>';
							output+='<script>$(document).ready(function(){alert("다음 상품은 재고수량이 '+data[j].GD_GOOD_AMT+'개 입니다. '+data[j].GD_GOOD_AMT+'개 이하로 주문해 주세요.\\n상품명: '+data[j].GD_GOOD_NM+'");location.href="/itemInfo.html?item='+data[j].GD_PK+'";})</script>';
							output+='<body></body>';
							output+='</html>';
							response.send(output);
							return;
						}
					}
					var output='';
					output+='<!DOCTYPE html>';
					output+='<html>';
					output+='<head>';
					output+='	<meta charset="utf-8"/>';
					output+='	<title>마을마켓 - 주문</title>';
					output+='	<script src="js/jquery-3.1.1.js"></script>';
					output+='	<script type="text/javascript" charset="utf-8" src="js/numberWithCommas.js"></script>';
					output+='	<script type="text/javascript" charset="utf-8" src="js/order.js"></script>';
					output+='	<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>';
					output+='	<script src="js/daumAddress.js"></script>';
					output+='	<script src="js/header.js"></script>';
					output+='	<script src="js/loginCheck.js"></script>';
					output+='	<link rel="stylesheet" type="text/css" charset="utf-8" href="css/main.css" />';
					output+='	<link rel="stylesheet" type="text/css" href="jquery-ui-1.12.1.custom/jquery-ui.css"/>';
					output+='	<script type="text/javascript" src="jquery-ui-1.12.1.custom/jquery-ui.js"></script>';
					output+='	<script type="text/javascript" src="https://service.iamport.kr/js/iamport.payment-1.1.5.js"></script>';
					output+='	<style type="text/css">';
					output+='	table input{';
					output+='		border: 1px solid rgb(204,204,204);';
					output+='		padding-left:5px;';
					output+='	}';
					output+='	</style>';
					output+='	<script>';
					output+='		var itemNumArr="'+itemNumArr+'";';						//아이템들을 기억하기 위해 변수에 담음 
					output+='		var itemAmountArr="'+itemAmountArr+'";';				//아이템 수량들을 기억하기 위해 변수에 담음
					output+='	</script>';
					output+='</head>';
					output+='<body>';
					output+='	<div id="page-wrapper" align="center">';
					output+='		<div>';
					output+='			<header id="header">';
					output+='				<div class="main-bg isTop">';
					output+='					<div class="main-bg-bar">';
					output+='						<ul class="main-bg-bar-nav">';
					output+='							<li style="border-right: 0;">';
					output+='								<a id="cart_a" href="">장바구니</a>';
					output+='							</li>';
					output+='							<li>';
					output+='								<a href="/service/home">고객센터</a>';
					output+='							</li>';
					output+='							<li>';
					output+='								<a id="myInfo_a" href="">마이페이지</a>';
					output+='							</li>';
					output+='							<li>';
					output+='								<a href="/joinAgree.html">회원가입</a>';
					output+='							</li>';
					output+='							<li>';
					output+='								<a id="login_a" href="">로그인</a>';
					output+='							</li>';
					output+='						</ul>';
					output+='					</div>';
					output+='					<div class="main-bg-header">';
					output+='						<div class="main-bg-header-container">';
					output+='							<a href="/" class="main-bg-header-container-logo">';
					output+='								<div style="font-family: \'Yoon_러브레터M\';font-size: 40px;font-weight: lighter;">마을마켓</div>';
					output+='								<div style="font-family: \'Yoon_러브레터M\';font-size: 180px;font-weight: lighter;margin-top: -85px;height: 80px;margin-left: 30px;">소소</div>';
					output+='							</a>';
					output+='							<div id="magnifier" align="right" style="margin-top: 10px;">';
					output+='								<span style="border: 1px solid #ddd;padding: 0px 5px;">';
					output+='									<img src="img/main/magnifier.png" width="14" height="14">';
					output+='									<input type="text" name="search" style="border: none;font-size: 15px;margin-left: 2px;">';
					output+='								</span>';
					output+='							</div>';
					output+='							<div class="main-bg-header-container-catchcopy">';
					output+='								<font style="vertical-align: inherit;">';
					output+='									상품 하나하나에 이웃의 이야기와 자부심이 있습니다.';
					output+='								</font>';
					output+='								<br>';
					output+='							</div>';
					output+='							<div style="text-align: left;">';
					output+='								<a href="./" class="main-bg-header-container-home"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">홈</font></font></a>';
					output+='								<div class="main-bg-header-container-nav">';
					output+='									<dl class="main-bg-header-container-nav-list">';
					output+='										<font style="vertical-align: inherit;">';
					output+='											<a href="/category.html?high_num=1&view=2">식품</a>';
					output+='										</font>';
					output+='									</dl>';
					output+='									<dl class="main-bg-header-container-nav-list">';
					output+='										<font style="vertical-align: inherit;">';
					output+='											<a href="/category.html?high_num=2&view=2">생활</a>';
					output+='										</font>';
					output+='									</dl>';
					output+='									<dl class="main-bg-header-container-nav-list">';
					output+='										<font style="vertical-align: inherit;">';
					output+='											기획';
					output+='										</font>';
					output+='									</dl>';
					output+='									<dl class="main-bg-header-container-nav-list">';
					output+='										<font style="vertical-align: inherit;">';
					output+='											<a href="/news_list">마마톡</a>';
					output+='										</font>';
					output+='									</dl>';
					output+='									<dl class="main-bg-header-container-nav-list" style="border-right: 0px;">';
					output+='										<font style="vertical-align: inherit;">';
					output+='											이웃마을';
					output+='										</font>';
					output+='									</dl>';
					output+='								</div>';
					output+='							</div>';
					output+='						</div>';
					output+='					</div>';
					output+='				</div>';
					output+='			</header>';
					output+='			<div id = "container" align="center">';
					output+='				<div style="position: relative;margin: 0 auto;width: 1100px;">';
					output+='					<div style="font-size: 30px;" align="left">ORDER</div>';
					output+='					<div align="left" style="margin-top: 30px;font-weight: bold;font-size: 13px;">';
					output+='						상품정보</div>';
					output+='					<table id="orderTable" style="width: 1100px;font-size: 11px;border-top: 2px solid;border-bottom:1px solid;margin-top: 10px;border-spacing: 0px;min-height: 120px;">';
					output+='						<tr style="background-color: rgb(250,250,250);height: 26px;">';
					output+='							<th style="font-weight: inherit;width: 500px;border-right: 1px solid rgb(204,204,204);border-bottom:1px solid rgb(204,204,204);">주문상품</th>';
					output+='							<th style="font-weight: inherit;width: 80px;border-right: 1px solid rgb(204,204,204);border-bottom:1px solid rgb(204,204,204);">수량</th>';
					output+='							<th style="font-weight: inherit;width: 100px;border-right: 1px solid rgb(204,204,204);border-bottom:1px solid rgb(204,204,204);">상품금액</th>';
					output+='							<th style="font-weight: inherit;width: 90px;border-right: 1px solid rgb(204,204,204);border-bottom:1px solid rgb(204,204,204);">할인</th>';
					output+='							<th style="font-weight: inherit;width: 100px;border-right: 1px solid rgb(204,204,204);border-bottom:1px solid rgb(204,204,204);">할인가격</th>';
					output+='							<th style="font-weight: inherit;width: 110px;border-right: 1px solid rgb(204,204,204);border-bottom:1px solid rgb(204,204,204);">적립</th>';
					output+='							<th style="font-weight: inherit;border-bottom:1px solid rgb(204,204,204);">배송비</th>';
					output+='						</tr>';
					connection.query("SELECT * FROM GOODS_TB WHERE GD_PK IN (?) and GD_EXIST_ST=1;",[itemNum], function (err,data) {
						if(data!=''){
							var allGoodPr=0;		//상품가격
							var allDelPr=0;			//배송비
							var allMileage=0;		//마일리지
							for(var i=0;i<itemNum.length;i++){
								var flag=0;
								for(j=0;j<data.length;j++){
									if(itemNum[i]==data[j].GD_PK){
										flag=1;
										break;
									}
								}
								if(flag==0){
									response.redirect("/");
									return;
								}
								output+='<tr>';
								output+='	<td style="padding:7px 7px 7px 7px;border-right: 1px solid rgb(204,204,204);border-bottom: 1px solid rgb(204,204,204);"><image src="'+data[j].GD_MAIN_IM.split(',')[0]+'" style="width:60px;height:76px;float:left;padding-right:10px;"><span style="float:left;"><div style="padding-bottom:5px;width:410px;">'+data[j].GD_GOOD_NM+'</div><div style="color:rgb(184,184,184);"></div></span></td>';
								output+='	<td align="center" style="border-right: 1px solid rgb(204,204,204);border-bottom: 1px solid rgb(204,204,204);">'+itemAmount[i]+'</td>';
								output+='	<td align="right" style="border-right: 1px solid rgb(204,204,204);border-bottom: 1px solid rgb(204,204,204);"><span style="padding-right:5px;">'+numberWithCommas(itemAmount[i]*data[j].GD_SELL_PR)+'원</span></td>';
								output+='	<td style="border-right: 1px solid rgb(204,204,204);border-bottom: 1px solid rgb(204,204,204);" align="center">-</td>';
								output+='	<td style="border-right: 1px solid rgb(204,204,204);border-bottom: 1px solid rgb(204,204,204);" align="right"><span style="padding-right:5px;">'+numberWithCommas(itemAmount[i]*data[j].GD_SELL_PR)+'원</span></td>';
								output+='	<td style="border-right: 1px solid rgb(204,204,204);border-bottom: 1px solid rgb(204,204,204);" align="center"><span style="padding-right:5px;"><span style="background-color:skyblue;color:white;border-radius:4px;border:0.4px solid blue;">적</span>&nbsp&nbsp&nbsp&nbsp'+numberWithCommas(itemAmount[i]*data[j].GD_SELL_PR/100)+'원</span></td>';
								output+='	<td align="center" style="border-bottom: 1px solid rgb(204,204,204);">'+numberWithCommas(data[j].GD_DELIVERY_PR)+'원</td>';
								output+='</tr>';
								allMileage+=(itemAmount[i]*data[j].GD_SELL_PR/100);		//예상 적립금을 모두 더함
								for(var k=0;k<allItem.length;k++){
									if(allItem[k]==itemNum[i]){				//현재 상품을 allItem목록에서 제거
										allItem.splice(k,1);
										break;
									}
								}
								var itemFlag=0;
								for(var k=0;k<allItem.length;k++){
									if(allItem[k]==itemNum[i]){				//현재 상품과 동일한 상품이 있는지 확인
										itemFlag=1;
										break;
									}
								}
								if(itemFlag==0){				//동일한 상품이 없을 시 배송비 추가
									allDelPr+=data[j].GD_DELIVERY_PR;
								}
								allGoodPr+=itemAmount[i]*data[j].GD_SELL_PR;
							}
							output+='					</table>';
							connection.query("SELECT * FROM MILEAGE_TB where ML_US_FK="+request.session.US_PK+";",function(err,data3){
								var mileage=0;
								for(var i=0;i<data3.length;i++){
									mileage+=data3[i].ML_MILEAGE_PR;
								}
								output+='				<script>var mileage='+mileage+';</script>';
								output+='					<div align="right" style="height:36px;border-bottom: 2px solid rgb(234,234,234);background-color: rgb(250,250,250);"></div>';
								output+='					<div align="left" style="margin-top: 80px;font-weight: bold;font-size: 13px;border-bottom: 2px solid;padding-bottom: 10px;">';
								output+='						최종결제금액</div>';
								output+='					<table style="width: 800px;font-size: 11.5px;margin-top: 5px;border-spacing: 0px;min-height: 60px;padding: 10px;float: left;">';
								output+='					</table>';
								output+='					<table style="width: 300px;min-height: 120px;padding: 10px;font-size: 11.5px;background-color: rgb(154,154,154);color:white;">';
								output+='						<tr>';
								output+='							<td>총 상품금액</td>';
								output+='							<td style="text-align: right;">'+numberWithCommas(allGoodPr)+' 원</td>';
								output+='						</tr>';
								output+='						<tr>';
								output+='							<td height="5"></td>';
								output+='						</tr>';
								output+='						<tr>';
								output+='							<td>총 배송비</td>';
								output+='							<td style="text-align: right;">'+numberWithCommas(allDelPr)+' 원</td>';
								output+='						</tr>';
								output+='						<tr>';
								output+='							<td height="5"></td>';
								output+='						</tr>';
								output+='						<tr>';
								output+='							<td>총 할인</td>';
								if(allGoodPr<50000){
									output+='							<td style="text-align: right;">0 원</td>';
								}
								else{							//5만원 이상은 무료배송
									output+='							<td style="text-align: right;">'+numberWithCommas(allDelPr)+' 원</td>';
								}
								output+='						</tr>';
								output+='						<tr>';
								output+='							<td height="5"></td>';
								output+='						</tr>';
								output+='						<tr>';
								output+='						</tr>';
								output+='						<tr>';
								output+='							<td height="5"></td>';
								output+='						</tr>';
								output+='						<tr style="font-size: 15px;font-weight: bold;">';
								output+='							<td>총 결제금액</td>';
								output+='<script>var allGoodPrice='+(allGoodPr)+'</script>';
								if(allGoodPr<50000){						
									output+='							<td style="text-align: right;font-size:20px;"><span id="finalPrice2">'+numberWithCommas(allGoodPr+allDelPr)+'</span> 원</td>';
								}
								else{							//5만원 이상은 무료배송
									output+='							<td style="text-align: right;font-size:20px;"><span id="finalPrice2">'+numberWithCommas(allGoodPr)+'</span> 원</td>';
								}
								output+='						</tr>';
								output+='					</table>';
								output+='					<div align="left" style="margin-top: 80px;font-weight: bold;font-size: 13px;border-bottom: 2px solid;padding-bottom: 10px;">';
								output+='						주문자정보</div>';
								output+='					<table style="width: 1100px;font-size: 12px;margin-top: 5px;border-spacing: 0px;min-height: 120px;padding: 10px;">';
								connection.query("SELECT * FROM USERS_TB WHERE US_PK=?",[request.session.US_PK], function (err,data2) {
									var phoneNum=data2[0].US_PHONE_NO;
									output+='						<tr>';
									output+='							<td style="width: 90px;">이름<span style="color: red;font-size: 16px;">*</span></td>';
									output+='							<td><input id="buyer" type="text" name="" value="'+data2[0].US_USER_NM+'" style="height:18px;" maxlength="20"></td>';
									output+='						</tr>';
									output+='						<tr>';
									output+='							<td height="5"></td>';
									output+='						</tr>';
									output+='						<tr>';
									output+='							<td>유선전화</td>';
									output+='							<td><input id="buyerZipPhone1" type="text" name="" style="width: 50px;height:18px;" maxlength="4"> - <input id="buyerZipPhone2" type="text" name="" style="width: 50px;height:18px;" maxlength="4"> - <input id="buyerZipPhone3" type="text" name="" style="width: 50px;height:18px;" maxlength="4"></td>';
									output+='						</tr>';
									output+='						<tr>';
									output+='							<td height="5"></td>';
									output+='						</tr>';
									output+='						<tr>';
									output+='							<td>휴대폰<span style="color: red;font-size: 16px;">*</span></td>';
									output+='							<td><input id="buyerPhone1" type="text" name="" style="width: 50px;height:18px;" value="'+phoneNum.slice(0,3)+'" maxlength="4"> - <input id="buyerPhone2" type="text" name="" style="width: 50px;height:18px;" value="'+phoneNum.slice(3,7)+'" maxlength="4"> - <input id="buyerPhone3" type="text" name="" style="width: 50px;height:18px;" value="'+phoneNum.slice(7,11)+'" maxlength="4"></td>';
									output+='						</tr>';
									output+='						<tr>';
									output+='							<td height="5"></td>';
									output+='						</tr>';
									output+='						<tr>';
									output+='							<td>이메일<span style="color: red;font-size: 16px;">*</span></td>';
									output+='							<td><input id="buyerEmail" type="text" name="" style="width: 150px;height:18px;" value="'+data2[0].US_USER_EM+'"></td>';
									output+='						</tr>';
									output+='					</table>';
									output+='					<div align="left" style="margin-top: 80px;font-weight: bold;font-size: 13px;border-bottom: 2px solid;padding-bottom: 10px;">';
									output+='						주문배송</div>';
									output+='					<table style="width: 1100px;font-size: 11.5px;margin-top: 5px;border-spacing: 0px;min-height: 120px;padding: 10px;float: left;">';
									output+='						<tr>';
									output+='							<td style="width: 90px;">배송방법</td>';
									output+='							<td>';
									output+='								<label style="cursor: pointer;"><input type="radio" name="delivery_method" checked>택배(선불)</label>';
									output+='							</td>';
									output+='						</tr>';
									output+='						<tr>';
									output+='							<td height="5"></td>';
									output+='						</tr>';
									output+='						<tr>';
									output+='							<td>배송주소<span style="color: red;font-size: 16px;">*</span></td>';
									output+='							<td>';
									output+='								<label style="cursor: pointer;"><input type="radio" name="delivery_address" onchange="newInfoFun(this)" checked>새로운 배송지</label>';
									output+='								<label style="cursor: pointer;"><input type="radio" name="delivery_address" onchange="memberInfoFun(this)">회원정보주소</label>';
									output+='							</td>';
									output+='						</tr>';
									output+='						<tr>';
									output+='							<td><input type="button" onclick="addressBookFun()" value="주소록" style="margin-left: 5px;background-color: white;border: 1px solid rgb(204,204,204);cursor: pointer;"></td>';
									output+='							<td style="padding-bottom:4px;">';
									output+='							<input type="text" name="returnZipcode" id="sample6_postcode" maxlength="10" style="width: 60px;padding-left: 5px;font-size: 12px;height: 18px;"><input type="button" onclick="sample6_execDaumPostcode()" value="주소 찾기" style="margin-left: 5px;background-color: white;border: 1px solid rgb(204,204,204);cursor: pointer;">';
									output+='							</td>';
									output+='						</tr>';
									output+='						<tr>';
									output+='							<td></td>';
									output+='							<td>';
									output+='								<input type="text" name="returnAddress1" id="sample6_address" maxlength="100" style="width: 300px;padding-left: 5px;font-size: 12px;height: 18px;">';
									output+='								<input type="text" name="returnAddress2" id="sample6_address2" maxlength="100" placeholder="상세주소" style="width: 300px;padding-left: 5px;font-size: 12px;height: 18px;">';
									output+='							</td>';
									output+='						</tr>';
									output+='						<tr>';
									output+='							<td height="5"></td>';
									output+='						</tr>';
									output+='						<tr>';
									output+='							<td>받는분<span style="color: red;font-size: 16px;">*</span></td>';
									output+='							<td>';
									output+='								<input id="receiver" type="text" name="" style="width: 100px;height:18px;" maxlength="20">';
									output+='								<label style="font-size: 11px;cursor: pointer;"><input type="checkbox" name="" onchange="sameFun(this)">주문자 정보와 동일</label>';
									output+='							</td>';
									output+='						</tr>';
									output+='						<tr>';
									output+='							<td height="5"></td>';
									output+='						</tr>';
									output+='						<tr>';
									output+='							<td>받는분 전화</td>';
									output+='							<td>';
									output+='								<input id="receiverZipPhone1" type="text" name="" style="width: 50px;height:18px;" maxlength="4"> - <input id="receiverZipPhone2" type="text" name="" style="width: 50px;height:18px;" maxlength="4"> - <input id="receiverZipPhone3" type="text" name="" style="width: 50px;height:18px;" maxlength="4">';
									output+='								<span style="margin-left: 50px;">받는분 휴대폰<span style="color: red;font-size: 16px;">*</span>';
									output+='								<input id="receiverPhone1" type="text" name="" style="width: 50px;margin-left: 10px;height:18px;" maxlength="4"> - <input id="receiverPhone2" type="text" name="" style="width: 50px;height:18px;" maxlength="4"> - <input id="receiverPhone3" type="text" name="" style="width: 50px;height:18px;" maxlength="4">';
									output+='								</span>';
									output+='							</td>';
									output+='						</tr>';
									output+='						<tr>';
									output+='							<td height="5"></td>';
									output+='						</tr>';
									output+='						<tr>';
									output+='							<td>배송요청사항</td>';
									output+='							<td>';
									output+='								<textarea id="receiverMessage" style="width: 980px;border: 1px solid rgb(204,204,204);height:95px;" maxlength="500"></textarea>';
									output+='							</td>';
									output+='						</tr>';
									output+='					</table>';
									output+='					<table style="font-size: 13px;font-weight: bold;width: 1100px;margin-top: 300px;border-spacing: 0;">';
									output+='						<tr>';
									output+='							<td style="width: 850px;">결제정보입력</td>';
									output+='							<td>결제하기</td>';
									output+='						</tr>';
									output+='						<tr>';
									output+='							<td style="border-bottom: 2px solid;height: 8px;"></td>';
									output+='							<td style="border-bottom: 2px solid;"></td>';
									output+='						</tr>';
									output+='						<tr>';
									output+='							<td style="border-right: 1px solid rgb(204,204,204);border-bottom: 1px solid rgb(204,204,204);">';
									output+='								<table style="font-weight: lighter;font-size: 11.5px;padding: 15px;border-spacing: 0;width: 850px;">';
									output+='									<tr>';
									output+='										<td style="width: 90px;">결제수단</td>';
									output+='										<td>';
									output+='											<label style="cursor: pointer;"><input id="buyMethod1" type="radio" name="buyMethod" onchange="notBankFun()" checked>무통장</label>';
									output+='											<label style="cursor: pointer;"><input id="buyMethod2" type="radio" name="buyMethod" onchange="secretCardFun()">신용카드</label>';
									output+='											<label style="cursor: pointer;"><input id="buyMethod3" type="radio" name="buyMethod" onchange="timeGoFun()">실시간계좌이체</label>';
									output+='										</td>';
									output+='									</tr>';
									output+='									<tr id="notBank" style="display: table-row;">';
									output+='										<td></td>';
									output+='										<td style="padding-top: 5px;">·입금자명<input id="depositName" type="text" name="" style="width: 100px;margin-left: 10px;height:18px;" maxlength="20"></td>';
									output+='									</tr>';
									output+='									<tr id="depositBank" style="display: table-row;">';
									output+='										<td></td>';
									output+='										<td style="padding-top: 5px;">·입금은행<select style="width: 200px;margin-left: 10px;height:24px;"><option checked>국민은행 04-390204-224858 예금주:김유준</option></select></td>';
									output+='									</tr>';
									output+='									<tr>';
									output+='										<td height="7"></td>';
									output+='									</tr>';
									output+='									<tr>';
									output+='									</tr>';
									output+='									<tr>';
									output+='										<td height="5"></td>';
									output+='									</tr>';
									output+='								</table>';
									output+='							</td>';
									output+='							<td style="border-bottom: 1px solid rgb(204,204,204);padding-top: 3px;">';
									output+='								<table>';
									output+='									<tr>';
									output+='										<td style="font-size: 12px;font-weight: lighter;">최종결제금액</td>';
									output+='									</tr>';
									output+='									<tr>';
									output+='										<td height="5"></td>';
									output+='									</tr>';
									output+='									<tr>';
									if(allGoodPr<50000){
										output+='										<td align="right" style="border-radius: 14px;background-color: rgb(45,45,45);height: 60px;width: 260px;color: white;font-size:24px;text-align:right;"><span id="finalPrice">'+numberWithCommas(allGoodPr+allDelPr)+'</span><span style="font-size:14px;">원</span></td>';
									}
									else{
										output+='										<td align="right" style="border-radius: 14px;background-color: rgb(45,45,45);height: 60px;width: 260px;color: white;font-size:24px;text-align:right;"><span id="finalPrice">'+numberWithCommas(allGoodPr)+'</span><span style="font-size:14px;">원</span></td>';
									}
									output+='									</tr>';
									output+='								</table>';
									output+='							</td>';
									output+='						</tr>';
									output+='					</table>';
									output+='					<div align="right" style="margin-top: 60px;">';
									output+='						<button style="background-color: rgb(70,70,70);color: white;border: 0px;height: 44px;width: 140px;cursor: pointer;border-radius: 5px;" onclick="orderFun()">주문하기</button>';
									output+='						<button style="background-color: rgb(170,170,170);color: white;border: 0px;height: 44px;width: 140px;cursor: pointer;border-radius: 5px;" onclick=\'location.href="/cart.html"\'>장바구니로</button>';
									output+='					</div>';
									output+='				</div>';
									output+='			</div>';
									output+='	<script>';
									if(allGoodPr<50000){
										output+='		var finalPrice='+(allGoodPr+allDelPr)+';';
									}
									else{
										output+='		var finalPrice='+(allGoodPr)+';';
									}
									output+='	</script>';
									output+='		<footer id="footer" style="margin-top: 0px;">';
									output+='			<div class="footer-container">';
									output+='				<div class="footer-top" align="center">';
									output+='					상품에 대하여 배송, 교환, 반품의 민원 A/S 등은  "다시 뛰는 사람들" 에서 처리하며 모든 책임은 "다시 뛰는 사람들"에 있습니다.​';
									output+='					민원 담당자 : 마을마켓 소소 고객센터 /  연락처 : 031-963-2900';
									output+='				</div>';
									output+='				<div class="footer-mid" align="left">';
									output+='					<p style="font-size: 12px;">';
									output+='						<b>다시 뛰는 사람들</b>';
									output+='					</p>';
									output+='					<p style="font-size: 11px;">';
									output+='						우)10460 경기도 고양시 덕양구 고양시청로 13-2 성광빌딩 4층';
									output+='					</p>';
									output+='					<p style="font-size: 11px;">';
									output+='						| 대표자: 이영아 | 사업자등록번호: 128-86-63160 | 통신판매업신고: <!--제 2017-고양덕양구-0076호-->';
									output+='					</p>';
									output+='				</div>';
									output+='				<div class="footer-bottom" align="left">';
									output+='					<p style="font-size: 12px;">';
									output+='						<b>고객센터</b>';
									output+='					</p>';
									output+='					<p style="font-size: 11px;">';
									output+='						| Tel (031)963-2900 | Fax (031)965-2900 | e-mail: webmaster@mygoyang.com';
									output+='					</p>';
									output+='					<p style="font-size: 11px;">';
									output+='						| 월-금: 오전10시 - 오후 6시 (Break hour: 오후 1시 ~ 오후 2시)';
									output+='					</p>';
									output+='				</div>';
									output+='				<div class="pageTop">';
									output+='					<a href="#" class="pageTop-a">';
									output+='						<img src="/img/main/pageTop.png" width="100">';
									output+='					</a>';
									output+='				</div>';
									output+='			</div>';
									output+='		</footer>';
									output+='		</div>';
									output+='	</div>';
									output+="</body>";
									output+="</html>";

									response.send(output);
									connection.release();
								})
							})
						}
						else{
							response.redirect("/");
							connection.release();
						}
					})
				})
			}
			else{
				response.redirect("/login.html?url=/order.html?item="+request.param('item'));
				connection.release();
			}
		})
	})
})

app.get('/orderComplete.html',function(request,response){				//주문완료 페이지
	var us_pk=request.session.US_PK;
	var order=request.param("order")+us_pk;								//주문번호는 (주문시간+유저의 고유키)로 되어있음
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_PK=?",[us_pk], function (err,userData) {
			if(err) console.error('err',err);
		   	if(userData!=''){
				connection.query("SELECT * FROM ORDERS_TB WHERE OD_ORDER_NO=? AND OD_US_FK="+us_pk,[order], function (err,data) {
					if(err) console.error('err',err);
				   	if(data!=''){
						connection.query("SELECT * FROM USERS_TB WHERE US_PK=?",[data[0].OD_US_FK], function (err,data2) {
							if(err) console.error('err',err);
							var output="";
							output+=outputHead;
							output+='	<script src="js/orderInfo.js"></script>';
							output+="	<title>마을마켓 - 주문배송조회</title>";
							output+="			<div id = 'container' align='center'>";
							output+="				<div style='width: 1100px;padding:20px 0px 20px 0px;'>";
							output+="					<div style='width:100%;padding-bottom:60px;border-bottom:1px solid rgb(204,204,204);'>";
							output+="						<div style='width:100%'>";
							output+="							<div style='width:100%;font-size:30px;margin-bottom:15px;text-align:left;'>ORDER COMPLETE</div>";
							output+="							<div style='width:100%;font-size:40px;text-align:center;padding-top:60px;color:rgb(154,154,154);'>thank you</div>";
							output+="							<div style='width:100%;font-size:11px;text-align:center;padding-top:10px;'>감사합니다. <span style='font-weight:bold;'>"+userData[0].US_USER_NM+"</span>님의 주문이 정상적으로 처리되었습니다.</div>";
							output+='							<div style="margin-top:60px;font-size:13px;text-align:left;width:100%;font-weight:bold;padding-bottom:5px;">상품정보</div>';
							output+='					<table id="orderTable" style="width: 1100px;font-size: 11px;border-top: 2px solid;border-bottom:1px solid;margin-top: 10px;border-spacing: 0px;min-height: 120px;">';
							output+='						<tr style="background-color: rgb(250,250,250);height: 26px;">';
							output+='							<th style="font-weight: inherit;width: 500px;border-right: 1px solid rgb(204,204,204);border-bottom:1px solid rgb(204,204,204);">주문상품</th>';
							output+='							<th style="font-weight: inherit;width: 80px;border-right: 1px solid rgb(204,204,204);border-bottom:1px solid rgb(204,204,204);">수량</th>';
							output+='							<th style="font-weight: inherit;width: 100px;border-right: 1px solid rgb(204,204,204);border-bottom:1px solid rgb(204,204,204);">상품금액</th>';
							output+='							<th style="font-weight: inherit;width: 90px;border-right: 1px solid rgb(204,204,204);border-bottom:1px solid rgb(204,204,204);">할인</th>';
							output+='							<th style="font-weight: inherit;width: 100px;border-right: 1px solid rgb(204,204,204);border-bottom:1px solid rgb(204,204,204);">할인가격</th>';
							output+='							<th style="font-weight: inherit;width: 110px;border-right: 1px solid rgb(204,204,204);border-bottom:1px solid rgb(204,204,204);">적립</th>';
							output+='							<th style="font-weight: inherit;border-bottom:1px solid rgb(204,204,204);">배송비</th>';
							output+='						</tr>';
							var momentArray=[];
							var flag=0;
							for(var i=0;i<data.length;i++){
								for(var j=0;j<momentArray.length;j++){
									if(momentArray[j]==data[i].OD_GD_FK){			//주문했던 물품 중 같은 물품이 있다면
										flag=1;								
										break;
									}
								}
								if(flag==0){								//같은 물품이 없다면 momentArray에 그 상품 고유키를 담음
									momentArray.push(data[i].OD_GD_FK);
								}
							}
							connection.query("SELECT * FROM GOODS_TB WHERE GD_PK IN (?)",[momentArray], function (err,data3) {
								if(err) console.error('err',err);
								var allAmount=0;
								var allPrice=0;
								var allMileage=0;
								var allDelPrice=0;

								for(var i=0;i<data3.length;i++){
									allDelPrice+=data3[i].GD_DELIVERY_PR;
								}

								for(var i=0;i<data.length;i++){
									for(var j=0;j<data3.length;j++){
										if(data[i].OD_GD_FK==data3[j].GD_PK){
											break;
										}
									}
									output+='								<tr>';
									output+='									<td style="border-right: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;height:23px;padding:7px 7px;">';
									output+='										<img src="'+data3[j].GD_MAIN_IM.split(',')[0]+'" style="width:60px;height:76px;padding-right:10px;float:left;">';
									output+='										<span style="text-align:left;">'+data3[j].GD_GOOD_NM;
									output+='										</span>';
									output+='									</td>';
									output+='									<td style="border-right: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;padding:3px 3px;text-align:right;">';
									output+='										'+data[i].OD_GOOD_AMT;
									output+='									</td>';
									output+='									<td style="border-right: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;padding:3px 3px;">';
									output+='										<div style="width:100%;text-align:right;">';
									var price=Number(data[i].OD_GOOD_AMT*data3[j].GD_SELL_PR);
									output+='											'+numberWithCommas(price);
									output+='										</div>';
									output+='									</td>';
									output+='									<td style="border-right: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;padding:3px 3px;text-align:center;">';
									output+='										-';
									output+='									</td>';
									output+='									<td style="border-right: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;padding:3px 3px;">';
									output+='										<div style="width:100%;text-align:right;">';
									var price=Number(data[i].OD_GOOD_AMT*data3[j].GD_SELL_PR);
									output+='											'+numberWithCommas(price);
									output+='										</div>';
									output+='									</td>';
									output+='									<td style="border-right: 1px solid #e1e1e1;border-bottom: 1px solid #e1e1e1;padding:3px 3px;">';
									output+='										<div style="width:100%;text-align:center;">';
									output+='											<span style="background-color:skyblue;color:white;border-radius:4px;border:0.4px solid blue;">적</span>&nbsp&nbsp&nbsp&nbsp'+numberWithCommas(price/100);
									output+='										</div>';
									output+='									</td>';
									output+='									<td style="border-bottom: 1px solid #e1e1e1;padding:3px 3px;">';
									output+='										<div style="width:100%;text-align:right;">';
									output+='											'+numberWithCommas(data3[j].GD_DELIVERY_PR);
									output+='										</div>';
									output+='									</td>';
									output+='								</tr>';
									allAmount+=data[i].OD_GOOD_AMT;
									allPrice+=price;
									allMileage+=price/100;
								}
								output+='							</table>';
								output+='					<div align="right" style="height:36px;border-bottom: 2px solid rgb(234,234,234);background-color: rgb(250,250,250);"></div>';
								output+='					<div align="left" style="margin-top: 80px;font-weight: bold;font-size: 13px;border-bottom: 2px solid;padding-bottom: 5px;">';
								output+='						최종결제금액</div>';
								output+='					<table style="width: 800px;font-size: 11.5px;margin-top: 5px;border-spacing: 0px;min-height: 40px;padding: 5px;float: left;">';
								output+='						<tr>';
								output+='							<td style="width:120px;">예상적립혜택</td>';
								if((allPrice-data[0].OD_MILEAGE_PR)<0){					//적립금으로만 모든 아이템을 구매한 경우
									output+='							<td style="width:150px;">적립금 <span id="getMileage" style="font-weight:bold;">0</span>원</td>';
								}
								else{													//아닌 경우
									output+='							<td style="width:150px;">적립금 <span id="getMileage" style="font-weight:bold;">'+numberWithCommas((allPrice-data[0].OD_MILEAGE_PR)/100)+'</span>원</td>';
								}
								output+='							<td></td>';
								output+='						</tr>';
								output+='					</table>';
								output+='					<table style="width: 300px;min-height: 120px;padding: 10px;font-size: 11.5px;background-color: rgb(154,154,154);color:white;">';
								output+='						<tr>';
								output+='							<td>총 상품금액</td>';
								output+='							<td style="text-align: right;">'+numberWithCommas(allPrice)+' 원</td>';
								output+='						</tr>';
								output+='						<tr>';
								output+='							<td height="5"></td>';
								output+='						</tr>';
								output+='						<tr>';
								output+='							<td>총 배송비</td>';
								output+='							<td style="text-align: right;">'+numberWithCommas(allDelPrice)+' 원</td>';
								output+='						</tr>';
								output+='						<tr>';
								output+='							<td height="5"></td>';
								output+='						</tr>';
								output+='						<tr>';
								output+='							<td>총 할인</td>';
								if(allPrice<50000){
									output+='							<td style="text-align: right;">0 원</td>';
								}
								else{
									output+='							<td style="text-align: right;">'+numberWithCommas(allDelPrice)+' 원</td>';
								}
								output+='						</tr>';
								output+='						<tr>';
								output+='							<td height="5"></td>';
								output+='						</tr>';
								output+='						<tr>';
								output+='							<td>사용 적립금</td>';
								output+='							<td style="text-align: right;"><span id="useMileage">'+numberWithCommas(data[0].OD_MILEAGE_PR)+'</span> 원</td>';
								output+='						</tr>';
								output+='						<tr>';
								output+='							<td height="5"></td>';
								output+='						</tr>';
								output+='						<tr style="font-size: 15px;font-weight: bold;">';
								output+='							<td>총 결제금액</td>';
								output+='							<td style="text-align: right;font-size:20px;"><span id="finalPrice2">'+numberWithCommas(data[0].OD_DEPOSIT_PR)+'</span> 원</td>';
								output+='						</tr>';
								output+='					</table>';
								output+='					<div align="left" style="margin-top: 80px;font-weight: bold;font-size: 13px;border-bottom: 2px solid;padding-bottom: 5px;">';
								output+='						주문배송</div>';
								output+='					<table style="width: 1100px;font-size: 11.5px;margin-top: 5px;border-spacing: 0px;min-height: 40px;padding: 5px;text-align:left;">';
								output+='						<tr>';
								output+='							<td style="width:100px;padding:3px 3px;">받는사람</td>';
								output+='							<td style="padding:3px 3px;">'+data[0].OD_RECEIVER_NM+'</td>';
								output+='						</tr>';
								output+='						<tr height="5"></tr>';
								output+='						<tr>';
								output+='							<td style="width:100px;padding:3px 3px;">연락처</td>';
								var momentPhoneNum=data[0].OD_RECEIVER_PHONE_NO;
								output+='							<td style="padding:3px 3px;">전화번호 '+data[0].OD_RECEIVER_NO+' / 휴대폰 '+momentPhoneNum.slice(0,3)+'-'+momentPhoneNum.slice(3,7)+'-'+momentPhoneNum.slice(7,11)+'</td>';
								output+='						</tr>';
								output+='						<tr height="5"></tr>';
								output+='						<tr>';
								output+='							<td style="width:100px;padding:3px 3px;">주소</td>';
								output+='							<td style="padding:3px 3px;">';
								output+='								<div style="width:100%;">'+data[0].OD_RECEIVER_AD1+'</div>';
								output+='								<div style="width:100%;">(상세주소) '+data[0].OD_RECEIVER_AD2+'</div>';
								output+='							</td>';
								output+='						</tr>';
								output+='						<tr height="5"></tr>';
								output+='						<tr>';
								output+='							<td style="width:100px;padding:3px 3px;">배송메시지</td>';
								output+='							<td style="padding:3px 3px;"><div style="width:1000px;word-wrap:break-word;">'+data[0].OD_RECEIVER_MESSAGE_CT+'</div></td>';
								output+='						</tr>';
								output+='					</table>';
								output+='					<div align="left" style="margin-top: 80px;font-weight: bold;font-size: 13px;border-bottom: 2px solid;padding-bottom: 5px;">';
								output+='						결제정보</div>';
								output+='					<table style="width: 1100px;font-size: 11.5px;margin-top: 5px;border-spacing: 0px;min-height: 40px;padding: 5px;text-align:left;">';
								output+='						<tr>';
								output+='							<td style="width:100px;padding:3px 3px;">주문번호</td>';
								output+='							<td style="padding:3px 3px;">'+data[0].OD_ORDER_NO+'</td>';
								output+='						</tr>';
								output+='						<tr height="5"></tr>';
								output+='						<tr>';
								output+='							<td style="width:100px;padding:3px 3px;">결제방식</td>';
								var momentPhoneNum=data[0].OD_RECEIVER_PHONE_NO;
								output+='							<td style="padding:3px 3px;">'+data[0].OD_DEPOSIT_MTD+'</td>';
								output+='						</tr>';
								output+='						<tr height="5"></tr>';
								output+='						<tr>';
								output+='							<td style="width:100px;padding:3px 3px;">입금계좌</td>';
								output+='							<td style="padding:3px 3px;">';
								output+='								국민은행 04-390204-224858 예금주:김유준';
								output+='							</td>';
								output+='						</tr>';
								output+='						<tr height="5"></tr>';
								output+='						<tr>';
								output+='							<td style="width:100px;padding:3px 3px;">결제금액</td>';
								output+='							<td style="padding:3px 3px;font-weight:bold;">'+numberWithCommas(data[0].OD_DEPOSIT_PR)+'원</td>';
								output+='						</tr>';
								output+='					</table>';
								output+='						</div>';
								output+='					</div>';
								output+='					<div style="width:100%;" align="right">';
								output+='						<a href="index.html"><button style="margin-right:5px;margin-top:10px;background-color:rgb(108,108,108);border:0px;color:white;width:140px;height:44px;font-size:14px;border-radius:3px;cursor:pointer;">쇼핑 계속하기</button><a>';
								output+='						<a href="myInfo.html"><button style="margin-right:10px;margin-top:10px;background-color:rgb(91,103,129);border:0px;color:white;width:140px;height:44px;font-size:14px;border-radius:3px;cursor:pointer;">주문 목록</button><a>';
								output+='					</div>';
								output+='				</div>';
								output+='			</div>';
								output+=outputFooter;

								response.send(output);
								connection.release();
							});
						})
					}
					else{
						response.redirect('/login.html?url=/orderComplete.html?order='+request.param("order"));
						connection.release();
					}
				})
			}
			else{
				response.redirect('/login.html?url=/orderComplete.html?order='+request.param("order"));
				connection.release();
			}
		})
	})
})

app.get('/goodModify.html',function(request,response){						//상품 수정 페이지(관리자)
	var output='';
	output+='<!DOCTYPE html>';
	output+='<html>';
	output+='<head>';
	output+='	<meta charset="utf-8"/>';
	output+='	<title>마을마켓 - 관리자페이지</title>';
	output+='	<script src="js/jquery-3.1.1.js"></script>';
	output+='	<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>';
	output+='	<script src="js/daumAddress.js"></script>';
	output+='	<script src="js/goodModify.js"></script>';
	output+='	<script src="bootstrap/js/bootstrap.min.js"></script>';
	output+='	<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">';
	output+='	<link href="/css/admin.css" rel="stylesheet">';
	output+='	<link href="summernote/summernote.css" rel="stylesheet">';
	output+='	<script src="summernote/summernote.js"></script>';
	output+='	<script src="summernote/lang/summernote-ko-KR.js"></script>';
	output+='	<script type="text/javascript" src="jquery-ui-1.12.1.custom/jquery-ui.js"></script>';
	output+='	<link rel="stylesheet" type="text/css" href="jquery-ui-1.12.1.custom/jquery-ui.css"/> ';
	output+='</head>';
	output+='<style type="text/css">';
	output+='#registTb td{';
	output+='	border-bottom: 1px solid rgb(234,234,234);';
	output+='}';
	output+='.noBorderTd tr td{';
	output+='	border: 0!important;';
	output+='	padding-top: 2px;';
	output+='	padding-bottom: 2px;';
	output+='}';
	output+='.filebox input[type="file"] {';
	output+='	position: absolute;';
	output+='	width: 1px;';
	output+='	height: 1px;';
	output+='	padding: 0;';
	output+='	margin: -1px;';
	output+='	overflow: hidden;';
	output+='	clip:rect(0,0,0,0);';
	output+='	border: 0;';
	output+='}';
	output+='.filebox label { ';
	output+='	display: inline-block;';
	output+='	padding: .5em .75em; ';
	output+='	color: #999; ';
	output+='	font-size: inherit; ';
	output+='	line-height: normal; ';
	output+='	vertical-align: middle; ';
	output+='	background-color: #fdfdfd; ';
	output+='	cursor: pointer; ';
	output+='	border: 1px solid #ebebeb;';
	output+='	border-bottom-color: #e2e2e2;';
	output+='	border-radius: .25em;';
	output+='} /* named upload */ ';
	output+='.filebox .upload-name { ';
	output+='	display: inline-block; ';
	output+='	padding: .5em .75em; /* label의 패딩값과 일치 */';
	output+='	font-size: inherit;';
	output+='	font-family: inherit; ';
	output+='	line-height: normal; ';
	output+='	vertical-align: middle;';
	output+='	background-color: #f5f5f5;';
	output+='	border: 1px solid #ebebeb; ';
	output+='	border-bottom-color: #e2e2e2;';
	output+='	border-radius: .25em;';
	output+='	-webkit-appearance: none; /* 네이티브 외형 감추기 */ ';
	output+='	-moz-appearance: none; ';
	output+='	appearance: none; ';
	output+='}';
	output+='p{';
	output+='    -webkit-margin-before: 0em;';
	output+='    -webkit-margin-after: 0em;';
	output+='}';
	output+='</style>';
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM GOODS_TB WHERE GD_PK="+request.param('item'),function (err,data) {
			output+='<script>';
			output+='	$(document).ready(function(){';
			output+='		$(".summernote").summernote({';				//summernote 생성 이벤트
			output+='			maxWidth:908,';
			output+='			height: 400,';
			output+='			callbacks: {';
			output+='		      	onImageUpload: function(files, editor, welEditable) {';
			output+='		        	for (var i = files.length - 1; i >= 0; i--) {';
			output+='		        	  	sendFile(files[0], this);';
			output+='		        	}';
			output+='		      	}';
			output+='		    },';
			output+='		    lang: "ko-KR"';
			output+='		});';
			output+='		$(".summernote2").summernote("code", \''+sliceSquote(data[0].GD_GOOD_EX)+'\');';
			output+='		$.get("/bringHighCategory",function(data){';
			output+='			var output="";';
			output+='			for(var i=0;i<data.length;i++){';
			output+='				if(data[i].CG_PK=='+data[0].GD_CG_FK+'){';
			output+='					output+="<option selected>"+data[i].CG_CATEGORY_NM+"</option>";';
			output+='				}';
			output+='				else{';
			output+='					output+="<option>"+data[i].CG_CATEGORY_NM+"</option>";';
			output+='				}';
			output+='			}';
			output+='			$("#categorySelect").append(output);';
			output+='		})';
			output+='	})';
			output+='</script>';
			output+='<body>';
			output+='	<div id="page-wrapper">';
			output+='		<div>';
			output+='			<header align="right">';
			output+='				<a href="/logout"><button style="background-color: rgb(154,154,154);border: 0px;font-size: 12px;color: white;width: 70px;height: 30px;margin-top: 18px;margin-right: 20px;">로그아웃</button></a>';
			output+='			</header>';
			output+='			<div class="left">';
			output+='				<ul align="left">';
			output+='					<a href="/goodList.html"><li style="background-color: rgb(12,63,78);">상품목록</li></a>';
			output+='					<a href="/goodRegist.html"><li>상품등록</li></a>';
			output+='					<a href="/providerManage.html"><li>공급자 관리</li></a>';
			output+='					<a href="/tradeManage.html"><li>거래 상태별 주문관리</li></a>';
			output+='					<a href="/noticeList.html"><li>공지사항 관리</li></a>';
			output+='					<a href="/questionList.html"><li>Q&A 관리</li></a>';
			output+='					<a href="/slideBannerList.html"><li>슬라이드배너 관리</li></a>';
			output+='					<a href="/newsManage"><li>기사 관리</li></a>';
			output+='					<a href="/mainManage"><li>메인페이지 관리</li></a>';
			output+='					<a href="/counselAdmin.html"><li>입점신청서 관리</li></a>';
			output+='				</ul>';
			output+='			</div>';
			output+='			<div id = "container" align="left">';
			output+='				<div style="border-bottom: 2px solid;font-size: 25px;width: 1100px;margin:20px 0px 0px 30px;">상품수정</div>';
			output+='				<div style="margin:10px 0px 0px 30px;">';
			output+='					<table id="registTb" style="border-spacing: 0px;width: 1100px;font-size: 12px;">';
			output+='						<form id="registForm" action="/uploadModify" method="post" enctype="multipart/form-data">';
			output+='						<tr>';
			output+='							<td style="background-color: rgb(250,250,235);font-weight: bold;padding: 10px 10px 10px 10px;width: 150px;border-top: 1px solid rgb(234,234,234);">카테고리</td>';
			output+='							<td style="border-top: 1px solid rgb(234,234,234);padding: 5px 10px 5px 10px;">';
			output+='								<select id="categorySelect" name="category" style="padding: 3px 3px 3px 3px;width: 150px;">';
			output+='								</select>';
			output+='							</td>';
			output+='						</tr>';
			output+='						<tr>';
			output+='							<td style="background-color: rgb(250,250,235);font-weight: bold;padding: 10px 10px 10px 10px;width: 150px;">상품명</td>';
			output+='							<td style="padding: 5px 10px 5px 10px;">';
			output+='								<input id="goodName" type="text" name="goodName" style="width: 900px;" maxlength="100" value=\''+data[0].GD_GOOD_NM+'\' onfocusout="checkNumber2(this)">';
			output+='							</td>';
			output+='						</tr>';
			output+='						<tr>';
			output+='							<td style="background-color: rgb(250,250,235);font-weight: bold;padding: 10px 10px 10px 10px;width: 150px;">상품부제목</td>';
			output+='							<td style="padding: 5px 10px 5px 10px;">';
			output+='								<input id="goodSubname" type="text" name="goodSubname" style="width: 900px;" maxlength="200" value=\''+data[0].GD_GOOD_SNM+'\' onfocusout="checkNumber2(this)">';
			output+='							</td>';
			output+='						</tr>';
			output+='						<tr>';
			output+='							<td style="background-color: rgb(250,250,235);font-weight: bold;padding: 10px 10px 10px 10px;width: 150px;">상품가격</td>';
			output+='							<td style="padding: 5px 10px 5px 10px;">';
			output+='								<table class="noBorderTd">';
			output+='									<tr>';
			output+='										<td style="width: 110px;">■ 소비자가</td>';
			output+='										<td><input id="consumerPrice" type="text" name="consumerPrice" style="width: 120px;text-align: right;" maxlength="7" value="'+data[0].GD_CONSUMER_PR+'"> 원</td>';
			output+='									</tr>';
			output+='									<tr>';
			output+='										<td>■ 판매가(필수)</td>';
			output+='										<td><input id="sellPrice" type="text" name="sellPrice" style="width: 120px;text-align: right;" maxlength="7" value="'+data[0].GD_SELL_PR+'"> 원</td>';
			output+='									</tr>';
			output+='								</table>';
			output+='							</td>';
			output+='						</tr>';
			output+='						<tr>';
			output+='							<td style="background-color: rgb(250,250,235);font-weight: bold;padding: 10px 10px 10px 10px;width: 150px;">수량</td>';
			output+='							<td style="padding: 5px 10px 5px 10px;">';
			output+='								<input id="goodAmount" type="text" name="goodAmount" style="width: 60px;" maxlength="5" value="'+data[0].GD_GOOD_AMT+'"> 개';
			output+='							</td>';
			output+='						</tr>';
			output+='						<tr>';
			output+='							<td style="background-color: rgb(250,250,235);font-weight: bold;padding: 10px 10px 10px 10px;width: 150px;">공급자</td>';
			output+='							<td style="padding: 5px 10px 5px 10px;">';
			output+='								<div style="font-size: 12px;background-color: white;border: 1px solid rgb(184,184,184);color: rgb(154,154,154);cursor: pointer;width: 120px;height: 23px;float: left;text-align: center;padding: 3px 5px 3px 5px;" onclick="bringProviderFun()">등록된 공급자 검색</div>';
			connection.query("SELECT * FROM SELLERS_TB WHERE SEL_PK="+data[0].GD_SEL_FK,function (err,data2) {
				connection.query("SELECT * FROM USERS_TB WHERE US_PK="+data2[0].SEL_US_FK,function (err,data3) {
					output+='								<input id="provider2" type="text" name="provider2" style="margin-left: 5px;" readonly value="'+data2[0].SEL_SELLER_NM+'('+data3[0].US_USER_ID+')">';
					output+='								<input id="provider" type="text" name="provider" hidden value="'+data[0].GD_SEL_FK+'">';
					output+='							</td>';
					output+='						</tr>';
					output+='						<tr>';
					output+='							<td style="background-color: rgb(250,250,235);font-weight: bold;padding: 10px 10px 10px 10px;width: 150px;">원산지</td>';
					output+='							<td style="padding: 5px 10px 5px 10px;">';
					output+='								<input type="text" name="origin" style="width: 100px;" maxlength="40" value="'+data[0].GD_ORIGIN_NM+'" onfocusout="checkNumber2(this)">';
					output+='							</td>';
					output+='						</tr>';
					output+='						<tr>';
					output+='							<td style="background-color: rgb(250,250,235);font-weight: bold;padding: 10px 10px 10px 10px;width: 150px;">제조사</td>';
					output+='							<td style="padding: 5px 10px 5px 10px;">';
					output+='								<input type="text" name="maker" style="width: 100px;" maxlength="40" value="'+data[0].GD_MAKER_NM+'" onfocusout="checkNumber2(this)">';
					output+='							</td>';
					output+='						</tr>';
					output+='						<tr>';
					output+='							<td style="background-color: rgb(250,250,235);font-weight: bold;padding: 10px 10px 10px 10px;width: 150px;">배송비 설정</td>';
					output+='							<td style="padding: 5px 10px 5px 10px;">';
					if(data[0].GD_DELIVERY_PR==0){
						output+='								<input type="radio" name="deliveryPriceCheck" id="free" checked> 택배비 포함(무료배송)';
						output+='								<input type="radio" name="deliveryPriceCheck" id="noFree" style="margin-left: 10px;"> 배송비 설정';
						output+='								<input type="hidden" name="deliveryPrice" id="deliveryPrice" style="margin-left: 10px;width: 100px;" value="0" maxlength="5">';
					}
					else{
						output+='								<input type="radio" name="deliveryPriceCheck" id="free"> 택배비 포함(무료배송)';
						output+='								<input type="radio" name="deliveryPriceCheck" id="noFree" style="margin-left: 10px;" checked> 배송비 설정';
						output+='								<input type="text" name="deliveryPrice" id="deliveryPrice" style="margin-left: 10px;width: 100px;" value="'+data[0].GD_DELIVERY_PR+'" maxlength="5">';
					}
					output+='							</td>';
					output+='						</tr>';
					output+='						<tr>';
					output+='							<td style="background-color: rgb(250,250,235);font-weight: bold;padding: 10px 10px 10px 10px;width: 150px;">반품/교환 정보 설정</td>';
					output+='							<td style="padding: 5px 10px 5px 10px;">';
					output+='								<table class="noBorderTd">';
					output+='									<tr>';
					output+='										<td style="width: 130px;">■ 판매자 지정 택배사</td>';
					output+='										<td>';
					output+='											<input type="text" name="deliveryCompany" style="width: 130px;" onfocusout="checkNumber2(this)">';
					output+='											<span style="color: rgb(0,130,153);font-size: 11px;margin-left: 5px;">* 공급자와 협의된 택배사를 입력해주세요.</span>';
					output+='										</td>';
					output+='									</tr>';
					output+='									<tr>';
					output+='										<td colspan="2">';
					output+='											■ 반품/교환 기본 배송비(편도 기준)<input id="returnDeliveryPrice" type="text" name="returnDeliveryPrice" style="margin-left: 10px;width: 62px;text-align: right;" maxlength="5" value="'+data[0].GD_RETURN_PR+'"> 원';
					output+='										</td>';
					output+='									</tr>';
					output+='									<tr>';
					output+='										<td>■ 업체명</td>';
					output+='										<td>';
					output+='											<input type="text" name="returnCompany" style="width: 130px;" maxlength="40" value=\''+data[0].GD_RETURN_NM+'\' onfocusout="checkNumber2(this)">';
					output+='										</td>';
					output+='									</tr>';
					output+='									<tr>';
					output+='										<td>■ 반품/교환 주소</td>';
					output+='										<td>';
					output+='										<input type="text" name="returnZipcode" id="sample6_postcode" maxlength="10" placeholder="우편번호" style="width: 60px;" value="'+data[0].GD_RETURN_ZIP_NO+'" onfocusout="checkNumber2(this)"><input type="button" onclick="sample6_execDaumPostcode()" value="주소 찾기" style="height: 24px;margin-left: 5px;">';
					output+='										</td>';
					output+='									</tr>';
					output+='									<tr>';
					output+='										<td></td>';
					output+='										<td>';
					output+='											<input type="text" name="returnAddress1" id="sample6_address" maxlength="100" placeholder="주소" style="width: 760px;" value=\''+data[0].GD_RETURN_AD1+'\' onfocusout="checkNumber2(this)">';
					output+='										</td>';
					output+='									</tr>';
					output+='									<tr>';
					output+='										<td></td>';
					output+='										<td>';
					output+='											<input type="text" name="returnAddress2" id="sample6_address2" maxlength="100" placeholder="상세주소" style="width: 760px;" value=\''+data[0].GD_RETURN_AD2+'\' onfocusout="checkNumber2(this)">';
					output+='										</td>';
					output+='									</tr>';
					output+='								</table>';
					output+='							</td>';
					output+='						</tr>';
					output+='						<tr>';
					output+='							<td style="background-color: rgb(250,250,235);font-weight: bold;padding: 10px 10px 10px 10px;width: 150px;">대표이미지</td>';
					output+='							<td style="padding: 5px 10px 5px 10px;">';
					var imageName=data[0].GD_MAIN_IM.split(',');
					output+='								<div class="filebox" style="width: 600px;"><input class="upload-name" id="upload-name" value="'+imageName[0].slice(12,imageName[0].length)+'" disabled="disabled"> <label id="focusFile" for="ex_filename" style="margin: 0;">업로드</label> <input type="file" id="ex_filename" name="recfile" class="upload-hidden"> <div onclick="imageDelFun(\'\')" style="display: inline-block;padding: .5em .75em;color: #999;font-size: inherit;line-height: normal;vertical-align: middle;background-color: #fdfdfd;cursor: pointer;border: 1px solid #ebebeb;border-bottom-color: #e2e2e2;border-radius: .25em;">삭제</div></div>';
					for(var i=1;i<5;i++){
						if(i<imageName.length){
							output+='								<div class="filebox" style="width: 600px;"><input class="upload-name" id="upload-name'+(i+1)+'" value="'+imageName[i].slice(12,imageName[i].length)+'" disabled="disabled"> <label for="ex_filename'+(i+1)+'" style="margin: 0;">업로드</label> <input type="file" id="ex_filename'+(i+1)+'" name="recfile'+(i+1)+'" class="upload-hidden"> <div onclick="imageDelFun('+(i+1)+')" style="display: inline-block;padding: .5em .75em;color: #999;font-size: inherit;line-height: normal;vertical-align: middle;background-color: #fdfdfd;cursor: pointer;border: 1px solid #ebebeb;border-bottom-color: #e2e2e2;border-radius: .25em;">삭제</div></div>';
						}
						else{
							output+='								<div class="filebox" style="width: 600px;"><input class="upload-name" id="upload-name'+(i+1)+'" value="파일선택" disabled="disabled"> <label for="ex_filename'+(i+1)+'" style="margin: 0;">업로드</label> <input type="file" id="ex_filename'+(i+1)+'" name="recfile'+(i+1)+'" class="upload-hidden"> <div onclick="imageDelFun('+(i+1)+')" style="display: inline-block;padding: .5em .75em;color: #999;font-size: inherit;line-height: normal;vertical-align: middle;background-color: #fdfdfd;cursor: pointer;border: 1px solid #ebebeb;border-bottom-color: #e2e2e2;border-radius: .25em;">삭제</div></div>';
						}
					}
					output+='							</td>';
					output+='						</tr>';
					output+='						<input id="goodEx" type="hidden" name="goodEx" >';
					output+='						<input type="hidden" name="pk" value="'+data[0].GD_PK+'">';
					output+='						<input type="hidden" id="hiddenMainImage" name="mainImage" value="'+imageName[0].slice(12,imageName[0].length-4)+'">';
					for(var i=1;i<5;i++){
						if(i<imageName.length){
							output+='						<input type="hidden" id="hiddenMainImage'+(i+1)+'" name="mainImage'+(i+1)+'" value="'+imageName[i].slice(12,imageName[i].length-4)+'">';
						}
						else{
							output+='						<input type="hidden" id="hiddenMainImage'+(i+1)+'" name="mainImage'+(i+1)+'" value="">';
						}
					}
					output+='						<input id="relate" type="hidden" name="relate" >';
					output+='						<input id="relate2" type="hidden" name="relate2" >';
					output+='						<tr>';
					output+='							<td style="background-color: rgb(250,250,235);font-weight: bold;padding: 10px 10px 10px 10px;width: 150px;">상품설명</td>';
					output+='							<td style="padding: 5px 10px 5px 10px;font-size: initial;">';
					output+='								<textarea id="goodEx2" class="summernote summernote2" name="goodEx2"></textarea>';
					output+='							</td>';
					output+='						</tr>';
					output+='						<tr>';
					output+='							<td style="background-color: rgb(250,250,235);font-weight: bold;padding: 10px 10px 10px 10px;width: 150px;">관련상품목록 제목</td>';
					output+='							<td style="padding: 5px 10px 5px 10px;font-size: initial;">';
					output+='							<input type="text" name="relateSubject" style="width: 900px;height: 40px;font-size: 20px;" maxlength="100" onfocusout="checkNumber2(this)" value="'+data[0].GD_RELATE_GD_NM+'">';
					output+='							</td>';
					output+='						</tr>';
					output+='						</form>';
					output+='						<tr>';
					output+='							<td style="background-color: rgb(250,250,235);font-weight: bold;padding: 10px 10px 10px 10px;width: 150px;">관련상품</td>';
					output+='							<td style="padding: 5px 10px 5px 10px;font-size: initial;">';
					output+='								<div style="margin: 5px 5px 20px;">';
					output+='									<button style="display: inline-block;padding: .5em .75em;color: black;font-size: inherit;line-height: normal;vertical-align: middle;background-color: #fdfdfd;border: 1px solid #ebebeb;border-bottom-color: #e2e2e2;border-radius: .25em;" onclick="addRecommendDialog()">선택</button>';
					output+='								</div>';
					output+='								<table id="relateGoods" style="width:100%;text-align:center;font-size: 13px;">';
					output+='									<tr>';
					output+='										<th style="font-weight: lighter;text-align:inherit;width: 171px;">이미지</th>';
					output+='										<th style="font-weight: lighter;text-align:inherit;">상품명</th>';
					output+='										<th style="font-weight: lighter;text-align:inherit;width: 123px;">삭제</th>';
					output+='									</tr>';
					var relateGoods=data[0].GD_RELATE_GD.split(',');
					var relateNews=data[0].GD_RELATE_NW.split(',');
					connection.query('select * from GOODS_TB where GD_PK in (?)', [relateGoods], function(err, data){
						if(err) console.error('err', err);
						var goods=data;
						connection.query('select * from NEWS_TB where NEWS_PK in (?)', [relateNews], function(err, data){
							if(err) console.error('err', err);
							relateNews=data;

							for(var i=0;i<goods.length;i++){
								output+='								<tr id="relateGood'+goods[i].GD_PK+'" class="relateGood" data-index="'+goods[i].GD_PK+'">';
								output+='									<td><img src="'+goods[i].GD_MAIN_IM.split(',')[0]+'" width="70px" height="70px;"></td>';
								output+='									<td style="text-align:left;">'+goods[i].GD_GOOD_NM+'</td>';
								output+='									<td>';
								output+='										<div><button data-index="'+goods[i].GD_PK+'" style="width:50px;height: 22px;border: 1px solid #ff6969;color:#ff6969;background-color: white;font-size: 11px;" onclick=\'selectDeleteFun("'+goods[i].GD_PK+'")\'>삭제</button></div>';
								output+='									</td>';
								output+='								</tr>';
							}
							output+='						</table>';
							if(goods.length!=0){
								output+='						<div id="noRelateGoods" style="height: 140px;text-align: center;padding-top: 60px;font-size: 13px;" hidden>등록된 관련상품이 없습니다.</div>';
							}else{
								output+='						<div id="noRelateGoods" style="height: 140px;text-align: center;padding-top: 60px;font-size: 13px;">등록된 관련상품이 없습니다.</div>';
							}
							output+='					</td>';
							output+='				</tr>';
							output+='				<tr>';
							output+='					<td style="background-color: rgb(250,250,235);font-weight: bold;padding: 10px 10px 10px 10px;width: 150px;">관련기사</td>';
							output+='					<td style="padding: 5px 10px 5px 10px;font-size: initial;">';
							output+='						<div style="margin: 5px 5px 20px;">';
							output+='							<button style="display: inline-block;padding: .5em .75em;color: black;font-size: inherit;line-height: normal;vertical-align: middle;background-color: #fdfdfd;border: 1px solid #ebebeb;border-bottom-color: #e2e2e2;border-radius: .25em;" onclick="addNewsDialog()">선택</button>';
							output+='						</div>';
							output+='						<table id="relateNews" style="width:100%;text-align:center;font-size: 13px;">';
							output+='							<tr>';
							output+='								<th style="font-weight: lighter;text-align:inherit;width: 171px;">이미지</th>';
							output+='								<th style="font-weight: lighter;text-align:inherit;">기사명</th>';
							output+='								<th style="font-weight: lighter;text-align:inherit;width: 123px;">삭제</th>';
							output+='							</tr>';
							for(var i=0;i<relateNews.length;i++){
								output+='							<tr id="relateNews'+relateNews[i].NEWS_PK+'" class="relateNews" data-index="'+relateNews[i].NEWS_PK+'">';
								output+='								<td><img src="'+relateNews[i].NEWS_MAIN_IM+'" width="70px" height="70px;"></td>';
								output+='								<td style="text-align:left;">'+relateNews[i].NEWS_NM+'</td>';
								output+='								<td>';
								output+='									<div><button data-index="'+relateNews[i].NEWS_PK+'" style="width:50px;height: 22px;border: 1px solid #ff6969;color:#ff6969;background-color: white;font-size: 11px;" onclick=\'newsSelectDeleteFun("'+relateNews[i].NEWS_PK+'")\'>삭제</button></div>';
								output+='								</td>';
								output+='							</tr>';
							}
							output+='						</table>';
							if(relateNews.length!=0){
								output+='						<div id="noRelateNews" style="height: 140px;text-align: center;padding-top: 60px;font-size: 13px;" hidden>등록된 관련기사가 없습니다.</div>';
							}else{
								output+='						<div id="noRelateNews" style="height: 140px;text-align: center;padding-top: 60px;font-size: 13px;">등록된 관련기사가 없습니다.</div>';
							}
							output+='					</td>';
							output+='				</tr>';
							output+='					</table>';
							output+='				</div>';
							output+='				<div align="center" style="margin-top: 20px;">';
							output+='					<button onclick="clickFun()" style="color: white;background-color: black;height: 50px;width: 150px;border: 0;font-size: 15px;">상품수정</button>';
							output+='				</div>';
							output+='			</div>';
							output+='		</div>';
							output+='		<footer id="footer" style="margin-top: 0px;">';
							output+='			<div class="footer-container">';
							output+='				<div class="footer-top" align="center">';
							output+='					상품에 대하여 배송, 교환, 반품의 민원 A/S 등은  "다시 뛰는 사람들" 에서 처리하며 모든 책임은 "다시 뛰는 사람들"에 있습니다.​';
							output+='					민원 담당자 : 마을마켓 소소 고객센터 /  연락처 : 031-963-2900';
							output+='				</div>';
							output+='				<div class="footer-mid" align="left">';
							output+='					<p style="font-size: 12px;">';
							output+='						<b>다시 뛰는 사람들</b>';
							output+='					</p>';
							output+='					<p style="font-size: 11px;">';
							output+='						우)10460 경기도 고양시 덕양구 고양시청로 13-2 성광빌딩 4층';
							output+='					</p>';
							output+='					<p style="font-size: 11px;">';
							output+='						| 대표자: 이영아 | 사업자등록번호: 128-86-63160 | 통신판매업신고: <!--제 2017-고양덕양구-0076호-->';
							output+='					</p>';
							output+='				</div>';
							output+='				<div class="footer-bottom" align="left">';
							output+='					<p style="font-size: 12px;">';
							output+='						<b>고객센터</b>';
							output+='					</p>';
							output+='					<p style="font-size: 11px;">';
							output+='						| Tel (031)963-2900 | Fax (031)965-2900 | e-mail: webmaster@mygoyang.com';
							output+='					</p>';
							output+='					<p style="font-size: 11px;">';
							output+='						| 월-금: 오전10시 - 오후 6시 (Break hour: 오후 1시 ~ 오후 2시)';
							output+='					</p>';
							output+='				</div>';
							output+='				<div class="pageTop">';
							output+='					<a href="#" class="pageTop-a">';
							output+='						<img src="/img/main/pageTop.png" width="100">';
							output+='					</a>';
							output+='				</div>';
							output+='			</div>';
							output+='		</footer>';
							output+='	</div>';
							output+='</body>';
							output+='</html>';

							response.send(output);

							connection.release();

						});
					});
				})
			})
		})
	})
})

app.get('/noticeInfo.html',function(request,response){					//공지사항 상세 페이지
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM NOTICE_TB WHERE NT_PK=?",[request.param("notice")], function (err,data) {
			if(err) console.error('err',err);
		   	if(data!=''){
		   		var date=data[0].NT_REGDATE_YMD;
				var output='';
				output+=outputHead;
				output+='<script src="js/noticeInfo.js"></script>';
				output+='<script src="/js/service.js"></script>';
				output+='<link rel="stylesheet" type="text/css" charset="utf-8" href="css/noticeInfo.css" />';
				output+='<title>마을마켓 - 공지사항</title>';
				output+='	<div id = "container" align="center">';
				output+='		<div id="board_area" align="center">';
				output+='			<div id="service_header" align="center">';
				output+='				<h2>마을마켓 고객센터</h2>';
				output+='			</div>';
				output+='			<div id="board_bt_area" align="center">';
				output+='				<table align="center">';
				output+='					<tr>';
				output+='						<td class="board_bt" onclick="menu_bt(\'home\');">';
				output+='							<div class="img_area"><img src="/img/service_bt/home.png" alt="home"></div>';
				output+='							<h4>마을마켓이란</h4>';
				output+='						</td>';
				output+='						<td onclick="menu_bt(\'notice\');" style="background-color: black;">';
				output+='							<div class="img_area"><img src="/img/service_bt/notice_w.png" alt="notice"></div>';
				output+='							<h4 style="color:white">공지사항</h4>';
				output+='						</td>';
				output+='						<td class="board_bt" onclick="menu_bt(\'faq\');">';
				output+='							<div class="img_area"><img src="/img/service_bt/question.png" alt="FAQ"></div>';
				output+='							<h4>Q&A</h4>';
				output+='						</td>';
				output+='						<td class="board_bt" onclick="menu_bt(\'delivery\');">';
				output+='							<div class="img_area"><img src="/img/service_bt/transport.png" alt="delivery"></div>';
				output+='							<h4>배송안내</h4>';
				output+='						</td>';
				output+='						<td class="board_bt" onclick="menu_bt(\'exchange\');">';
				output+='							<div class="img_area"><img src="/img/service_bt/package.png" alt="exchange"></div>';
				output+='							<h4>교환/반품</h4>';
				output+='						</td>';
				output+='						<td class="board_bt" onclick="menu_bt(\'counsel\');">';
				output+='							<div class="img_area"><img src="/img/service_bt/mallin.png" alt="counsel"></div>';
				output+='							<h4>입점상담</h4>';
				output+='						</td>';
				output+='					</tr>';
				output+='				</table>';
				output+='			</div>';
				output+='			<div id="menu_header" align="center">';
				output+='				<h3>공지사항</h3>';
				output+='			</div>';
				output+='			<div id="content_area" align="center">';
				output+='			<div style="width:1000px;">';
				output+='				<div style="width: 1000px;margin-top: 60px;text-align:left;">';
				output+='					<div style="width:100%;border-top:solid 2px #ddd;border-bottom:solid 1px #ddd;font-size: 12px;border-spacing: 0px;color: #555;">';
				output+='						<div style="font-weight:bold;font-size:16px;padding:15px 0px 5px 0px;">'+data[0].NT_NOTICE_NM+'</div>';
				output+='						<div style="font-size:12px;padding:5px 0px 15px 0px;">'+date.slice(0,4)+'. '+date.slice(4,6)+'. '+date.slice(6,8)+'.</div>';
				output+='					</div>';
				output+='					<div style="font-size:12px;padding:25px 0px;color: #777;">'+data[0].NT_NOTICE_EX+'</div>';
				output+='					<div style="padding:40px 0px;" align="right"><button onclick=\'location.href="/service/notice/1"\' style="border:0px;background-color:#eee;font-size:12px;padding:5px 15px;color:#555;font-weight:bold;cursor:pointer;border-radius:3px;">목록보기</button></div>';
				output+='				</div>';
				output+='			</div>';
				output+='			</div>';
				output+='		</div>';
				output+='	</div>';
				output+=outputFooter;

				response.send(output);
				connection.release();
		   	}
		   	else{
		   		response.redirect('/service/notice/1');
		   		connection.release();
		   	}
		})
	})
})

app.get('/questionAdd.html',function(request,response){									//Q&A(문의하기) 페이지
	var output='';
	output+=outputHead;
	output+='<title>마을마켓 - Q&A</title>';
	output+='<link rel="stylesheet" type="text/css" charset="utf-8" href="/css/noticeInfo.css" />';
	output+='<script src="/js/questionAdd.js"></script>';
	output+='<script src="/js/service.js"></script>';
	output+='			<div id="container">';
	output+='				<div id="board_area" align="center">';
	output+='					<div id="service_header" align="center">';
	output+='						<h2>마을마켓 고객센터</h2>';
	output+='					</div>';
	output+='					<div id="board_bt_area" align="center">';
	output+='						<table align="center">';
	output+='							<tr>';
	output+='								<td class="board_bt" onclick="menu_bt(\'home\');">';
	output+='									<div class="img_area"><img src="/img/service_bt/home.png" alt="home"></div>';
	output+='									<h4>마을마켓이란</h4>';
	output+='								</td>';
	output+='								<td class="board_bt" onclick="menu_bt(\'notice\');">';
	output+='									<div class="img_area"><img src="/img/service_bt/notice.png" alt="notice"></div>';
	output+='									<h4>공지사항</h4>';
	output+='								</td>';
	output+='								<td onclick="menu_bt(\'faq\');" style="background-color: black;">';
	output+='									<div class="img_area"><img src="/img/service_bt/question_w.png" alt="FAQ"></div>';
	output+='									<h4 style="color:white">Q&A</h4>';
	output+='								</td>';
	output+='								<td class="board_bt" onclick="menu_bt(\'delivery\');">';
	output+='									<div class="img_area"><img src="/img/service_bt/transport.png" alt="delivery"></div>';
	output+='									<h4>배송안내</h4>';
	output+='								</td>';
	output+='								<td class="board_bt" onclick="menu_bt(\'exchange\');">';
	output+='									<div class="img_area"><img src="/img/service_bt/package.png" alt="exchange"></div>';
	output+='									<h4>교환/반품</h4>';
	output+='								</td>';
	output+='								<td class="board_bt" onclick="menu_bt(\'counsel\');">';
	output+='									<div class="img_area"><img src="/img/service_bt/mallin.png" alt="counsel"></div>';
	output+='									<h4>입점상담</h4>';
	output+='								</td>';
	output+='							</tr>';
	output+='						</table>';
	output+='					</div>';
	output+='					<div id="menu_header" align="center">';
	output+='						<h3>Q&A</h3>';
	output+='					</div>';
	output+='					<div id="content_area" align="center">';
	output+='						<div style="width:1000px;margin-top: 60px;">';
	output+='							<form id="questionAdd" name="form" action="questionAdd" method="post">';
	output+='								<table style="width:100%;font-size:14px;text-align:center;">';
	output+='									<tr>';
	output+='										<td style="font-weight:bold;width:100px;">NAME</td>';
	output+='										<td style="width:100px;text-align:left;"><input type="text" name="name" maxlength="10"></td>';
	output+='										<td style="font-weight:bold;width:100px;">PASSWORD</td>';
	output+='										<td style="text-align:left;"><input type="password" name="password" maxlength="20"><span style="color:red;"> 자동 잠금 기능</span></td>';
	output+='									</tr>';
	output+='									<tr>';
	output+='										<td height="5">';
	output+='										</td>';
	output+='									</tr>';
	output+='									<tr>';
	output+='										<td style="font-weight:bold;width:100px;">TITLE</td>';
	output+='										<td colspan="3" style="text-align:left;">';
	output+='											<select name="title">';
	output+='												<option>제목을 선택하세요</option>';
	output+='												<option>입금/결제관련 문의</option>';
	output+='												<option>배송관련 문의</option>';
	output+='												<option>배송 전 변경/취소 문의</option>';
	output+='												<option>교환/반품 문의</option>';
	output+='												<option>상품관련 문의</option>';
	output+='												<option>기타 문의</option>';
	output+='											</select>';
	output+='										</td>';
	output+='									</tr>';
	output+='									<tr>';
	output+='										<td height="5">';
	output+='										</td>';
	output+='									</tr>';
	output+='									<tr>';
	output+='										<td style="font-weight:bold;width:100px;">CONTENT</td>';
	output+='										<td colspan="3" style="text-align:left;">';
	output+='											<textarea name="content" style="width:95%;height:200px;text-align:left;" maxlength="1000"></textarea>';
	output+='										</td>';
	output+='									</tr>';
	output+='								</table>';
	output+='							</form>';
	output+='							<div style="font-size:14px;color:#555;margin-top:40px;"><span style="cursor:pointer;" onclick="confirmFun()">확인</span> | <span style="cursor:pointer;" onclick="cancelFun()">취소</span></div>';
	output+='						</div>';
	output+='					</div>';
	output+='				</div>';
	output+='			</div>';
	output+=outputFooter;

	response.send(output);
})

app.get('/counselAdd.html',function(request,response){				//입점 신청 페이지
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_PK=?",[request.session.US_PK], function (err,data) {
			if(err) console.error('err',err);
		   	if(data!=''){
				var output='';
				output+=outputHead;
				output+='<title>마을마켓 - 입점상담</title>';
				output+='<link rel="stylesheet" type="text/css" charset="utf-8" href="/css/noticeInfo.css" />';
				output+='<link rel="stylesheet" type="text/css" charset="utf-8" href="/css/counsel.css" />';
				output+='<script src="/js/counselAdd.js"></script>';
				output+='<script src="/js/service.js"></script>';
				output+='			<div id="container">';
				output+='				<div id="board_area" align="center">';
				output+='					<div id="service_header" align="center">';
				output+='						<h2>마을마켓 고객센터</h2>';
				output+='					</div>';
				output+='					<div id="board_bt_area" align="center">';
				output+='						<table align="center">';
				output+='							<tr>';
				output+='								<td class="board_bt" onclick="menu_bt(\'home\');">';
				output+='									<div class="img_area"><img src="/img/service_bt/home.png" alt="home"></div>';
				output+='									<h4>마을마켓이란</h4>';
				output+='								</td>';
				output+='								<td class="board_bt" onclick="menu_bt(\'notice\');">';
				output+='									<div class="img_area"><img src="/img/service_bt/notice.png" alt="notice"></div>';
				output+='									<h4>공지사항</h4>';
				output+='								</td>';
				output+='								<td class="board_bt" onclick="menu_bt(\'faq\');">';
				output+='									<div class="img_area"><img src="/img/service_bt/question.png" alt="FAQ"></div>';
				output+='									<h4>Q&A</h4>';
				output+='								</td>';
				output+='								<td class="board_bt" onclick="menu_bt(\'delivery\');">';
				output+='									<div class="img_area"><img src="/img/service_bt/transport.png" alt="delivery"></div>';
				output+='									<h4>배송안내</h4>';
				output+='								</td>';
				output+='								<td class="board_bt" onclick="menu_bt(\'exchange\');">';
				output+='									<div class="img_area"><img src="/img/service_bt/package.png" alt="exchange"></div>';
				output+='									<h4>교환/반품</h4>';
				output+='								</td>';
				output+='								<td onclick="menu_bt(\'counsel\');" style="background-color: black;">';
				output+='									<div class="img_area"><img src="/img/service_bt/mallin_w.png" alt="counsel"></div>';
				output+='									<h4 style="color:white">입점상담</h4>';
				output+='								</td>';
				output+='							</tr>';
				output+='						</table>';
				output+='					</div>';
				output+='					<div id="menu_header" align="center">';
				output+='						<h3>입점신청서</h3>';
				output+='					</div>';
				output+='					<div id="content_area" align="center">';
				output+='						<div style="width:1000px;margin-top: 60px;">';
				output+='							<form id="counselAdd" name="form" action="counselAdd" method="post">';
				output+='								<table class="counselApply" rules="all" style="width:100%;font-size:14px;text-align:center;border:3px solid black;">';
				output+='									<tr>';
				output+='										<td rowspan="2" style="width:10%;background-color:ivory;">회사명</td>';
				output+='										<td style="width:10%;background-color:ivory;">한글</td>';
				output+='										<td style="width:30%;text-align:left;"><input type="text" maxlength="100" name="companyHangul" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;"></td>';
				output+='										<td style="width:20%;background-color:ivory;">업 종</td>';
				output+='										<td style="width:40%;text-align:left;"><input type="text" maxlength="100" name="businessKind" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;"></td>';
				output+='									</tr>';
				output+='									<tr>';
				output+='										<td style="background-color:ivory;">영문</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="100" name="companyEnglish" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;"></td>';
				output+='										<td style="background-color:ivory;">업 태</td>';
				output+='										<td>품목(<input type="text" maxlength="100" name="businessForm" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:50%;">)</td>';
				output+='									</tr>';
				output+='									<tr>';
				output+='										<td colspan="2" style="background-color:ivory;">사업자번호</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="50" name="registrationNumber" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;"></td>';
				output+='										<td style="background-color:ivory;">대 표 자</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="50" name="representative" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;"></td>';
				output+='									</tr>';
				output+='									<tr>';
				output+='										<td colspan="2" style="background-color:ivory;">매 출 액</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="100" name="sales" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;"></td>';
				output+='										<td style="background-color:ivory;">설립일자</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="50" name="establishmentDate" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;"></td>';
				output+='									</tr>';
				output+='									<tr>';
				output+='										<td colspan="2" style="background-color:ivory;">대표상품</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="100" name="representativeGoods" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;"></td>';
				output+='										<td style="background-color:ivory;">수록상품</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="100" name="goods" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;"></td>';
				output+='									</tr>';
				output+='									<tr>';
				output+='										<td colspan="2" style="background-color:ivory;">전 화</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="50" name="telephone" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;"></td>';
				output+='										<td style="background-color:ivory;">팩 스</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="50" name="fax" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;"></td>';
				output+='									</tr>';
				output+='									<tr>';
				output+='										<td colspan="2" style="background-color:ivory;">E - Mail</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="50" name="email" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;"></td>';
				output+='										<td style="background-color:ivory;">홈페이지</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="100" name="homepage" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;"></td>';
				output+='									</tr>';
				output+='									<tr>';
				output+='										<td colspan="2" style="background-color:ivory;">주 소</td>';
				output+='										<td colspan="3" style="text-align:left;"><input type="text" maxlength="300" name="address" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;"></td>';
				output+='									</tr>';
				output+='									<tr>';
				output+='										<td colspan="2" style="background-color:ivory;height:300px;">회사소개</td>';
				output+='										<td colspan="3" style="text-align:left;"><textarea name="companyIntroduce" maxlength="5000" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;height:90%;"></textarea></td>';
				output+='									</tr>';
				output+='									<tr>';
				output+='										<td rowspan="2" colspan="2" style="background-color:ivory;">수록품목</td>';
				output+='										<td colspan="3" style="text-align:left;">(<input type="text" maxlength="100" name="goodAmount" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:20%;">) 개</td>';
				output+='									</tr>';
				output+='									<tr>';
				output+='										<td colspan="3" style="text-align:left;">※ 상품별 자료는 별도 상품정보 1개씩 작성 제출</td>';
				output+='									</tr>';
				output+='								</table>';
				output+='								<div style="text-align:left;margin-top:15px;">';
				output+='									■ 업무관련담당자';
				output+='								</div>';
				output+='								<table class="counselApply" rules="all" style="width:100%;font-size:14px;text-align:center;border:3px solid black;">';
				output+='									<tr>';
				output+='										<td style="width:20%;background-color:ivory;">성 명</td>';
				output+='										<td style="width:30%;text-align:left;"><input type="text" maxlength="50" name="managerName" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;"></td>';
				output+='										<td style="width:20%;background-color:ivory;">직위/부서</td>';
				output+='										<td style="width:30%;text-align:left;"><input type="text" maxlength="50" name="managerPosition" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;"></td>';
				output+='									</tr>';
				output+='									<tr>';
				output+='										<td style="background-color:ivory;">전 화</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="50" name="managerTelephone" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;"></td>';
				output+='										<td style="background-color:ivory;">E - Mail</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="50" name="managerEmail" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;"></td>';
				output+='									</tr>';
				output+='								</table>';
				output+='							</form>';
				output+='							<div style="text-align:left;">';
				output+='								<div>';
				output+='									※ FAX(           ), E-Mail(             )으로 관련서류를 송부하기 바랍니다.';
				output+='								</div>';
				output+='								<div>';
				output+='									&nbsp;&nbsp;- 입점 신청서 및 상품정보 1부  (수록상품 1개별 개별 정보 작성 제출)';
				output+='								</div>';
				output+='								<div>';
				output+='									&nbsp;&nbsp;- 참여동의서 1부   ③ 사업자 등록증 사본 1부  ④ 상품 카다로그 (사진) 1부';
				output+='								</div>';
				output+='								<div style="margin-top:30px;">';
				output+='									위와 같이 ○○전자상거래지원센타 인터넷 쇼핑몰 입점을 신청합니다.';
				output+='								</div>';
				output+='							</div>';
				output+='							<div style="font-size:14px;color:#555;margin-top:40px;"><span style="cursor:pointer;" onclick="confirmFun()">확인</span> | <span style="cursor:pointer;" onclick="cancelFun()">취소</span></div>';
				output+='						</div>';
				output+='					</div>';
				output+='				</div>';
				output+='			</div>';
				output+=outputFooter;

				response.send(output);
				connection.release();
			}
			else{
				response.redirect('/login.html?url=/counselAdd.html');
				connection.release();
			}
		})
	})
})

app.get('/counselInfo.html',function(request,response){					//입점 상담 상세 페이지
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_PK=?",[request.session.US_PK], function (err,user) {
			if(err) console.error('err',err);
			if(user==""){
				response.redirect('/login.html?url=/counselInfo.html?counsel='+request.param("counsel"));
			}
			else{
				connection.query("SELECT * FROM COUNSEL_TB WHERE CS_PK=?",[request.param("counsel")], function (err,data) {
					if(err) console.error('err',err);
					if(data==""){
						response.redirect('/service/counsel');
					}
					else{
					   	if(user[0].US_PK==data[0].CS_US_FK){
							var output='';
							output+=outputHead;
							output+='<title>마을마켓 - 입점상담</title>';
							output+='<link rel="stylesheet" type="text/css" charset="utf-8" href="/css/noticeInfo.css" />';
							output+='<link rel="stylesheet" type="text/css" charset="utf-8" href="/css/counsel.css" />';
							output+='<script src="/js/counselInfo.js"></script>';
							output+='<script src="/js/service.js"></script>';
							output+='			<div id="container">';
							output+='				<div id="board_area" align="center">';
							output+='					<div id="service_header" align="center">';
							output+='						<h2>마을마켓 고객센터</h2>';
							output+='					</div>';
							output+='					<div id="board_bt_area" align="center">';
							output+='						<table align="center">';
							output+='							<tr>';
							output+='								<td class="board_bt" onclick="menu_bt(\'home\');">';
							output+='									<div class="img_area"><img src="/img/service_bt/home.png" alt="home"></div>';
							output+='									<h4>마을마켓이란</h4>';
							output+='								</td>';
							output+='								<td class="board_bt" onclick="menu_bt(\'notice\');">';
							output+='									<div class="img_area"><img src="/img/service_bt/notice.png" alt="notice"></div>';
							output+='									<h4>공지사항</h4>';
							output+='								</td>';
							output+='								<td class="board_bt" onclick="menu_bt(\'faq\');">';
							output+='									<div class="img_area"><img src="/img/service_bt/question.png" alt="FAQ"></div>';
							output+='									<h4>Q&A</h4>';
							output+='								</td>';
							output+='								<td class="board_bt" onclick="menu_bt(\'delivery\');">';
							output+='									<div class="img_area"><img src="/img/service_bt/transport.png" alt="delivery"></div>';
							output+='									<h4>배송안내</h4>';
							output+='								</td>';
							output+='								<td class="board_bt" onclick="menu_bt(\'exchange\');">';
							output+='									<div class="img_area"><img src="/img/service_bt/package.png" alt="exchange"></div>';
							output+='									<h4>교환/반품</h4>';
							output+='								</td>';
							output+='								<td onclick="menu_bt(\'counsel\');" style="background-color: black;">';
							output+='									<div class="img_area"><img src="/img/service_bt/mallin_w.png" alt="counsel"></div>';
							output+='									<h4 style="color:white">입점상담</h4>';
							output+='								</td>';
							output+='							</tr>';
							output+='						</table>';
							output+='					</div>';
							output+='					<div id="menu_header" align="center">';
							output+='						<h3>입점신청서</h3>';
							output+='					</div>';
							output+='					<div id="content_area" align="center">';
							output+='						<div style="width:1000px;margin-top: 60px;">';
							output+='							<div align="right"><button style="background-color:#aaa;border:0px;color:white;font-size:15px;padding:8px;margin-bottom:5px;font-weight:bold;cursor:pointer;border-radius:3px;" onclick="deleteFun('+data[0].CS_PK+')">입점신청서 삭제</button></div>';
							output+='							<form id="counselModify" name="form" action="counselModify" method="post">';
							output+='								<input name="pk" value="'+data[0].CS_PK+'" hidden>';
							output+='								<table class="counselApply" rules="all" style="width:100%;font-size:14px;text-align:center;border:3px solid black;">';
							output+='									<tr>';
							output+='										<td rowspan="2" style="width:10%;background-color:ivory;">회사명</td>';
							output+='										<td style="width:10%;background-color:ivory;">한글</td>';
							output+='										<td style="width:30%;text-align:left;"><input type="text" maxlength="100" name="companyHangul" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_HANGUL_NM+'"></td>';
							output+='										<td style="width:20%;background-color:ivory;">업 종</td>';
							output+='										<td style="width:40%;text-align:left;"><input type="text" maxlength="100" name="businessKind" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_BUSINESS_KD+'"></td>';
							output+='									</tr>';
							output+='									<tr>';
							output+='										<td style="background-color:ivory;">영문</td>';
							output+='										<td style="text-align:left;"><input type="text" maxlength="100" name="companyEnglish" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_ENGLISH_NM+'"></td>';
							output+='										<td style="background-color:ivory;">업 태</td>';
							output+='										<td>품목(<input type="text" maxlength="100" name="businessForm" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:50%;" value="'+data[0].CS_BUSINESS_FM+'">)</td>';
							output+='									</tr>';
							output+='									<tr>';
							output+='										<td colspan="2" style="background-color:ivory;">사업자번호</td>';
							output+='										<td style="text-align:left;"><input type="text" maxlength="50" name="registrationNumber" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_REGISTRATION_NO+'"></td>';
							output+='										<td style="background-color:ivory;">대 표 자</td>';
							output+='										<td style="text-align:left;"><input type="text" maxlength="50" name="representative" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_REPRESENTATIVE_NM+'"></td>';
							output+='									</tr>';
							output+='									<tr>';
							output+='										<td colspan="2" style="background-color:ivory;">매 출 액</td>';
							output+='										<td style="text-align:left;"><input type="text" maxlength="100" name="sales" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_SALES_PR+'"></td>';
							output+='										<td style="background-color:ivory;">설립일자</td>';
							output+='										<td style="text-align:left;"><input type="text" maxlength="50" name="establishmentDate" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_ESTABLISHMENT_DT+'"></td>';
							output+='									</tr>';
							output+='									<tr>';
							output+='										<td colspan="2" style="background-color:ivory;">대표상품</td>';
							output+='										<td style="text-align:left;"><input type="text" maxlength="100" name="representativeGoods" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_REPRESENTATIVE_GD+'"></td>';
							output+='										<td style="background-color:ivory;">수록상품</td>';
							output+='										<td style="text-align:left;"><input type="text" maxlength="100" name="goods" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_GOODS_NM+'"></td>';
							output+='									</tr>';
							output+='									<tr>';
							output+='										<td colspan="2" style="background-color:ivory;">전 화</td>';
							output+='										<td style="text-align:left;"><input type="text" maxlength="50" name="telephone" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_TELEPHONE_NO+'"></td>';
							output+='										<td style="background-color:ivory;">팩 스</td>';
							output+='										<td style="text-align:left;"><input type="text" maxlength="50" name="fax" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_FAX_NO+'"></td>';
							output+='									</tr>';
							output+='									<tr>';
							output+='										<td colspan="2" style="background-color:ivory;">E - Mail</td>';
							output+='										<td style="text-align:left;"><input type="text" maxlength="50" name="email" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_EMAIL_EM+'"></td>';
							output+='										<td style="background-color:ivory;">홈페이지</td>';
							output+='										<td style="text-align:left;"><input type="text" maxlength="100" name="homepage" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_HOMEPAGE_NM+'"></td>';
							output+='									</tr>';
							output+='									<tr>';
							output+='										<td colspan="2" style="background-color:ivory;">주 소</td>';
							output+='										<td colspan="3" style="text-align:left;"><input type="text" maxlength="300" name="address" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_ADDRESS_AD+'"></td>';
							output+='									</tr>';
							output+='									<tr>';
							output+='										<td colspan="2" style="background-color:ivory;height:300px;">회사소개</td>';
							output+='										<td colspan="3" style="text-align:left;"><textarea name="companyIntroduce" maxlength="5000" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;height:90%;">'+data[0].CS_COMPANY_IT+'</textarea></td>';
							output+='									</tr>';
							output+='									<tr>';
							output+='										<td rowspan="2" colspan="2" style="background-color:ivory;">수록품목</td>';
							output+='										<td colspan="3" style="text-align:left;">(<input type="text" maxlength="100" name="goodAmount" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:20%;" value="'+data[0].CS_GOOD_AMT+'">) 개</td>';
							output+='									</tr>';
							output+='									<tr>';
							output+='										<td colspan="3" style="text-align:left;">※ 상품별 자료는 별도 상품정보 1개씩 작성 제출</td>';
							output+='									</tr>';
							output+='								</table>';
							output+='								<div style="text-align:left;margin-top:15px;">';
							output+='									■ 업무관련담당자';
							output+='								</div>';
							output+='								<table class="counselApply" rules="all" style="width:100%;font-size:14px;text-align:center;border:3px solid black;">';
							output+='									<tr>';
							output+='										<td style="width:20%;background-color:ivory;">성 명</td>';
							output+='										<td style="width:30%;text-align:left;"><input type="text" maxlength="50" name="managerName" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_MANAGER_NM+'"></td>';
							output+='										<td style="width:20%;background-color:ivory;">직위/부서</td>';
							output+='										<td style="width:30%;text-align:left;"><input type="text" maxlength="50" name="managerPosition" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_MANAGER_PS+'"></td>';
							output+='									</tr>';
							output+='									<tr>';
							output+='										<td style="background-color:ivory;">전 화</td>';
							output+='										<td style="text-align:left;"><input type="text" maxlength="50" name="managerTelephone" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_MANAGER_TP+'"></td>';
							output+='										<td style="background-color:ivory;">E - Mail</td>';
							output+='										<td style="text-align:left;"><input type="text" maxlength="50" name="managerEmail" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_MANAGER_EM+'"></td>';
							output+='									</tr>';
							output+='								</table>';
							output+='							</form>';
							output+='							<div style="text-align:left;">';
							output+='								<div>';
							output+='									※ FAX(           ), E-Mail(             )으로 관련서류를 송부하기 바랍니다.';
							output+='								</div>';
							output+='								<div>';
							output+='									&nbsp;&nbsp;- 입점 신청서 및 상품정보 1부  (수록상품 1개별 개별 정보 작성 제출)';
							output+='								</div>';
							output+='								<div>';
							output+='									&nbsp;&nbsp;- 참여동의서 1부   ③ 사업자 등록증 사본 1부  ④ 상품 카다로그 (사진) 1부';
							output+='								</div>';
							output+='								<div style="margin-top:30px;">';
							output+='									위와 같이 ○○전자상거래지원센타 인터넷 쇼핑몰 입점을 신청합니다.';
							output+='								</div>';
							output+='							</div>';
							output+='							<div style="font-size:14px;color:#555;margin-top:40px;"><span style="cursor:pointer;" onclick="confirmFun()">확인</span> | <span style="cursor:pointer;" onclick="cancelFun()">취소</span></div>';
							output+='						</div>';
							output+='					</div>';
							output+='				</div>';
							output+='			</div>';
							output+=outputFooter;

							response.send(output);
						}
						else{
							response.redirect('/login.html?url=/counselInfo.html?counsel='+request.param("counsel"));
						}
					}
				})
			}
		})
	})
})

app.get('/counselAdminInfo.html',function(request,response){					//입점상담 관리자 페이지
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM COUNSEL_TB WHERE CS_PK=?",[request.param("counsel")], function (err,data) {
			if(err) console.error('err',err);
			if(data==""){
				response.redirect('/counselAdmin.html');
			}
			else{
				var output='';
				output+='<!DOCTYPE html>';
				output+='<html>';
				output+='<head>';
				output+='	<meta charset="utf-8"/>';
				output+='	<title>마을마켓 - 관리자페이지</title>';
				output+='	<script src="js/jquery-3.1.1.js"></script>';
				output+='	<script src="js/numberWithCommas.js"></script>';
				output+='	<script src="js/counselAdminInfo.js"></script>';
				output+='	<script src="bootstrap/js/bootstrap.min.js"></script>';
				output+='	<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">';
				output+='<link rel="stylesheet" type="text/css" charset="utf-8" href="/css/counsel.css" />';
				output+='	<link href="summernote/summernote.css" rel="stylesheet">';
				output+='	<script src="summernote/summernote.js"></script>';
				output+='	<script src="summernote/lang/summernote-ko-KR.js"></script>';
				output+='	<link href="/css/admin.css" rel="stylesheet">';
				output+='	<script type="text/javascript" src="jquery-ui-1.12.1.custom/jquery-ui.js"></script>';
				output+='	<link rel="stylesheet" type="text/css" href="jquery-ui-1.12.1.custom/jquery-ui.css"/>';
				output+='</head>';
				output+='<body>';
				output+='	<div id="page-wrapper">';
				output+='		<div>';
				output+='			<header align="right">';
				output+='				<a href="/logout"><button style="background-color: rgb(154,154,154);border: 0px;font-size: 12px;color: white;width: 70px;height: 30px;margin-top: 18px;margin-right: 20px;">로그아웃</button></a>';
				output+='			</header>';
				output+='			<div class="left">';
				output+='				<ul align="left">';
				output+='					<a href="/goodList.html"><li>상품목록</li></a>';
				output+='					<a href="/goodRegist.html"><li>상품등록</li></a>';
				output+='					<a href="/providerManage.html"><li>공급자 관리</li></a>';
				output+='					<a href="/tradeManage.html"><li>거래 상태별 주문관리</li></a>';
				output+='					<a href="/noticeList.html"><li>공지사항 관리</li></a>';
				output+='					<a href="/questionList.html"><li>Q&A 관리</li></a>';
				output+='					<a href="/slideBannerList.html"><li>슬라이드배너 관리</li></a>';
				output+='					<a href="/newsManage"><li>기사 관리</li></a>';
				output+='					<a href="/mainManage"><li>메인페이지 관리</li></a>';
				output+='					<a href="/counselAdmin.html"><li style="background-color: rgb(12,63,78);">입점신청서 관리</li></a>';
				output+='				</ul>';
				output+='			</div>';
				output+='			<div id = "container" align="left">';
				output+='				<div style="border-bottom: 2px solid;font-size: 25px;width: 1100px;margin:20px 0px 0px 30px;">입점신청서 관리</div>';
				output+='				<div style="margin:5px 0px 0px 30px;">';
				output+='						<div style="width:1100px;margin-top: 10px;">';
				output+='							<div align="right"><button style="background-color:#aaa;border:0px;color:white;font-size:15px;padding:8px;margin-bottom:5px;font-weight:bold;cursor:pointer;border-radius:3px;" onclick="deleteFun('+data[0].CS_PK+')">입점신청서 삭제</button></div>';
				output+='								<input name="pk" value="'+data[0].CS_PK+'" hidden>';
				output+='								<table class="counselApply" rules="all" style="width:100%;font-size:14px;text-align:center;border:3px solid black;">';
				output+='									<tr>';
				output+='										<td rowspan="2" style="width:10%;background-color:ivory;">회사명</td>';
				output+='										<td style="width:10%;background-color:ivory;">한글</td>';
				output+='										<td style="width:30%;text-align:left;"><input type="text" maxlength="100" name="companyHangul" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_HANGUL_NM+'"></td>';
				output+='										<td style="width:20%;background-color:ivory;">업 종</td>';
				output+='										<td style="width:40%;text-align:left;"><input type="text" maxlength="100" name="businessKind" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_BUSINESS_KD+'"></td>';
				output+='									</tr>';
				output+='									<tr>';
				output+='										<td style="background-color:ivory;">영문</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="100" name="companyEnglish" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_ENGLISH_NM+'"></td>';
				output+='										<td style="background-color:ivory;">업 태</td>';
				output+='										<td>품목(<input type="text" maxlength="100" name="businessForm" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:50%;" value="'+data[0].CS_BUSINESS_FM+'">)</td>';
				output+='									</tr>';
				output+='									<tr>';
				output+='										<td colspan="2" style="background-color:ivory;">사업자번호</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="50" name="registrationNumber" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_REGISTRATION_NO+'"></td>';
				output+='										<td style="background-color:ivory;">대 표 자</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="50" name="representative" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_REPRESENTATIVE_NM+'"></td>';
				output+='									</tr>';
				output+='									<tr>';
				output+='										<td colspan="2" style="background-color:ivory;">매 출 액</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="100" name="sales" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_SALES_PR+'"></td>';
				output+='										<td style="background-color:ivory;">설립일자</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="50" name="establishmentDate" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_ESTABLISHMENT_DT+'"></td>';
				output+='									</tr>';
				output+='									<tr>';
				output+='										<td colspan="2" style="background-color:ivory;">대표상품</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="100" name="representativeGoods" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_REPRESENTATIVE_GD+'"></td>';
				output+='										<td style="background-color:ivory;">수록상품</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="100" name="goods" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_GOODS_NM+'"></td>';
				output+='									</tr>';
				output+='									<tr>';
				output+='										<td colspan="2" style="background-color:ivory;">전 화</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="50" name="telephone" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_TELEPHONE_NO+'"></td>';
				output+='										<td style="background-color:ivory;">팩 스</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="50" name="fax" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_FAX_NO+'"></td>';
				output+='									</tr>';
				output+='									<tr>';
				output+='										<td colspan="2" style="background-color:ivory;">E - Mail</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="50" name="email" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_EMAIL_EM+'"></td>';
				output+='										<td style="background-color:ivory;">홈페이지</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="100" name="homepage" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_HOMEPAGE_NM+'"></td>';
				output+='									</tr>';
				output+='									<tr>';
				output+='										<td colspan="2" style="background-color:ivory;">주 소</td>';
				output+='										<td colspan="3" style="text-align:left;"><input type="text" maxlength="300" name="address" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_ADDRESS_AD+'"></td>';
				output+='									</tr>';
				output+='									<tr>';
				output+='										<td colspan="2" style="background-color:ivory;height:300px;">회사소개</td>';
				output+='										<td colspan="3" style="text-align:left;"><textarea name="companyIntroduce" maxlength="5000" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;height:90%;">'+data[0].CS_COMPANY_IT+'</textarea></td>';
				output+='									</tr>';
				output+='									<tr>';
				output+='										<td rowspan="2" colspan="2" style="background-color:ivory;">수록품목</td>';
				output+='										<td colspan="3" style="text-align:left;">(<input type="text" maxlength="100" name="goodAmount" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:20%;" value="'+data[0].CS_GOOD_AMT+'">) 개</td>';
				output+='									</tr>';
				output+='									<tr>';
				output+='										<td colspan="3" style="text-align:left;">※ 상품별 자료는 별도 상품정보 1개씩 작성 제출</td>';
				output+='									</tr>';
				output+='								</table>';
				output+='								<div style="text-align:left;margin-top:15px;">';
				output+='									■ 업무관련담당자';
				output+='								</div>';
				output+='								<table class="counselApply" rules="all" style="width:100%;font-size:14px;text-align:center;border:3px solid black;">';
				output+='									<tr>';
				output+='										<td style="width:20%;background-color:ivory;">성 명</td>';
				output+='										<td style="width:30%;text-align:left;"><input type="text" maxlength="50" name="managerName" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_MANAGER_NM+'"></td>';
				output+='										<td style="width:20%;background-color:ivory;">직위/부서</td>';
				output+='										<td style="width:30%;text-align:left;"><input type="text" maxlength="50" name="managerPosition" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_MANAGER_PS+'"></td>';
				output+='									</tr>';
				output+='									<tr>';
				output+='										<td style="background-color:ivory;">전 화</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="50" name="managerTelephone" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_MANAGER_TP+'"></td>';
				output+='										<td style="background-color:ivory;">E - Mail</td>';
				output+='										<td style="text-align:left;"><input type="text" maxlength="50" name="managerEmail" style="margin:0px 10px;padding:5px;font-size:15px;border:0px;width:90%;" value="'+data[0].CS_MANAGER_EM+'"></td>';
				output+='									</tr>';
				output+='								</table>';
				output+='							<div style="text-align:left;">';
				output+='								<div>';
				output+='									※ FAX(           ), E-Mail(             )으로 관련서류를 송부하기 바랍니다.';
				output+='								</div>';
				output+='								<div>';
				output+='									&nbsp;&nbsp;- 입점 신청서 및 상품정보 1부  (수록상품 1개별 개별 정보 작성 제출)';
				output+='								</div>';
				output+='								<div>';
				output+='									&nbsp;&nbsp;- 참여동의서 1부   ③ 사업자 등록증 사본 1부  ④ 상품 카다로그 (사진) 1부';
				output+='								</div>';
				output+='								<div style="margin-top:30px;">';
				output+='									위와 같이 ○○전자상거래지원센타 인터넷 쇼핑몰 입점을 신청합니다.';
				output+='								</div>';
				output+='							</div>';
				output+='							<div style="font-size:16px;color:#555;margin-top:40px;text-align:right;"><span style="cursor:pointer;" onclick="cancelFun()">목록보기</span></div>';
				output+='						</div>';
				output+='				</div>';
				output+='			</div>';
				output+='			</div>';
				output+='			<footer>';
				output+='				<div style="float:left; margin-top: 50px; margin-left: 300px; color: white;" align="left">';
				output+='					<p style="font-size: 12px;">';
				output+='						<b>다시 뛰는 사람들</b>';
				output+='					</p>';
				output+='					<p style="font-size: 11px;">';
				output+='						우)10460 경기도 고양시 덕양구 고양시청로 13-2 성광빌딩 4층';
				output+='					</p>';
				output+='					<p style="font-size: 11px;">';
				output+='						| 대표자: 이영아 | 사업자등록번호: 128-86-63160 | 통신판매업신고: <!--제 2017-고양덕양구-0076호-->';
				output+='					</p>';
				output+='				</div>';
				output+='				<div style="float:left; margin-top: 50px; margin-left: 99px; color: white;" align="left">';
				output+='					<p style="font-size: 12px;">';
				output+='						<b>고객센터</b>';
				output+='					</p>';
				output+='					<p style="font-size: 11px;">';
				output+='						| Tel (031)963-2900 | Fax (031)965-2900 | e-mail: webmaster@mygoyang.com';
				output+='					</p>';
				output+='					<p style="font-size: 11px;">';
				output+='						| 월-금: 오전10시 - 오후 6시 (Break hour: 오후 1시 ~ 오후 2시)';
				output+='					</p>';
				output+='				</div>';
				output+='			</footer>';
				output+='		</div>';
				output+='	</div>';
				output+='</body>';
				output+='</html>';

				response.send(output);
				connection.release();
			}
		})
	})
})

app.get('/questionInfo.html',function(request,response){						//Q&A 상세 페이지
	var output='';
	output+=outputHead;
	output+='<title>마을마켓 - Q&A</title>';
	output+='<link rel="stylesheet" type="text/css" charset="utf-8" href="/css/noticeInfo.css" />';
	output+='<script src="js/questionInfo.js"></script>';
	output+='<script src="/js/service.js"></script>';
	output+='			<div id="container">';
	output+='				<div id="board_area" align="center">';
	output+='					<div id="service_header" align="center">';
	output+='						<h2>마을마켓 고객센터</h2>';
	output+='					</div>';
	output+='					<div id="board_bt_area" align="center">';
	output+='						<table align="center">';
	output+='							<tr>';
	output+='								<td class="board_bt" onclick="menu_bt(\'home\');">';
	output+='									<div class="img_area"><img src="/img/service_bt/home.png" alt="home"></div>';
	output+='									<h4>마을마켓이란</h4>';
	output+='								</td>';
	output+='								<td class="board_bt" onclick="menu_bt(\'notice\');">';
	output+='									<div class="img_area"><img src="/img/service_bt/notice.png" alt="notice"></div>';
	output+='									<h4>공지사항</h4>';
	output+='								</td>';
	output+='								<td onclick="menu_bt(\'faq\');" style="background-color: black;">';
	output+='									<div class="img_area"><img src="/img/service_bt/question_w.png" alt="FAQ"></div>';
	output+='									<h4 style="color:white">Q&A</h4>';
	output+='								</td>';
	output+='								<td class="board_bt" onclick="menu_bt(\'delivery\');">';
	output+='									<div class="img_area"><img src="/img/service_bt/transport.png" alt="delivery"></div>';
	output+='									<h4>배송안내</h4>';
	output+='								</td>';
	output+='								<td class="board_bt" onclick="menu_bt(\'exchange\');">';
	output+='									<div class="img_area"><img src="/img/service_bt/package.png" alt="exchange"></div>';
	output+='									<h4>교환/반품</h4>';
	output+='								</td>';
	output+='								<td class="board_bt" onclick="menu_bt(\'counsel\');">';
	output+='									<div class="img_area"><img src="/img/service_bt/mallin.png" alt="counsel"></div>';
	output+='									<h4>입점상담</h4>';
	output+='								</td>';
	output+='							</tr>';
	output+='						</table>';
	output+='					</div>';
	output+='					<div id="menu_header" align="center">';
	output+='						<h3>Q&A</h3>';
	output+='					</div>';
	output+='					<div id="content_area" align="center">';
	output+='						<div style="width:1000px;margin-top: 60px;">';
	output+='							<div id="space">';
	output+='								<div style="font-weight:bold;font-size:13px;">비밀번호 <input type="password" id="pw" style="margin-left:10px;padding-right:20px;margin-right:30px;"></div>';
	output+='								<div style="font-size:14px;color:#555;margin-top:60px;"><span style="cursor:pointer;" onclick="confirmFun('+request.param("question")+')">확인</span> | <span style="cursor:pointer;" onclick="cancelFun()">취소</span></div>';
	output+='							</div>';
	output+='						</div>';
	output+='					</div>';
	output+='				</div>';
	output+='			</div>';
	output+=outputFooter;

	response.send(output);
})

app.get('/noticeModify.html',function(request,response){					//공지사항 수정 페이지(관리자)
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM NOTICE_TB WHERE NT_PK=?",[request.param("notice")], function (err,data) {
			var output='';
			output+='<!DOCTYPE html>';
			output+='<html>';
			output+='<head>';
			output+='	<meta charset="utf-8"/>';
			output+='	<title>마을마켓 - 관리자페이지</title>';
			output+='	<script src="js/jquery-3.1.1.js"></script>';
			output+='	<script src="js/numberWithCommas.js"></script>';
			output+='	<script src="js/noticeModify.js"></script>';
			output+='	<script src="bootstrap/js/bootstrap.min.js"></script>';
			output+='	<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">';
			output+='	<link href="summernote/summernote.css" rel="stylesheet">';
			output+='	<script src="summernote/summernote.js"></script>';
			output+='	<script src="summernote/lang/summernote-ko-KR.js"></script>';
			output+='	<link href="/css/admin.css" rel="stylesheet">';
			output+='	<script type="text/javascript" src="jquery-ui-1.12.1.custom/jquery-ui.js"></script>';
			output+='	<link rel="stylesheet" type="text/css" href="jquery-ui-1.12.1.custom/jquery-ui.css"/>';
			output+='	<link href="css/noticeModify.css" rel="stylesheet">';
			output+='</head>';
			output+='<body>';
			output+='	<div id="page-wrapper">';
			output+='		<div>';
			output+='			<header align="right">';
			output+='				<a href="/logout"><button style="background-color: rgb(154,154,154);border: 0px;font-size: 12px;color: white;width: 70px;height: 30px;margin-top: 18px;margin-right: 20px;">로그아웃</button></a>';
			output+='			</header>';
			output+='			<div class="left">';
			output+='				<ul align="left">';
			output+='					<a href="/goodList.html"><li>상품목록</li></a>';
			output+='					<a href="/goodRegist.html"><li>상품등록</li></a>';
			output+='					<a href="/providerManage.html"><li>공급자 관리</li></a>';
			output+='					<a href="/tradeManage.html"><li>거래 상태별 주문관리</li></a>';
			output+='					<a href="/noticeList.html"><li style="background-color: rgb(12,63,78);">공지사항 관리</li></a>';
			output+='					<a href="/questionList.html"><li>Q&A 관리</li></a>';
			output+='					<a href="/slideBannerList.html"><li>슬라이드배너 관리</li></a>';
			output+='					<a href="/newsManage"><li>기사 관리</li></a>';
			output+='					<a href="/mainManage"><li>메인페이지 관리</li></a>';
			output+='					<a href="/counselAdmin.html"><li>입점신청서 관리</li></a>';
			output+='				</ul>';
			output+='			</div>';
			output+='			<div id = "container" align="left">';
			output+='				<div style="border-bottom: 2px solid;font-size: 25px;width: 1100px;margin:20px 0px 0px 30px;">공지사항 수정</div>';
			output+='				<div style="margin:5px 0px 0px 30px;">';
			output+='					<form action="/noticeModify" method="post">';
			output+='						<table style="margin-top: 10px;">';
			output+='							<tr>';
			output+='								<td style="padding: 5px;">';
			output+='									제목';
			output+='								</td>';
			output+='								<td style="padding: 5px;">';
			output+='									<input type="text" name="pk" value="'+data[0].NT_PK+'" hidden>';
			output+='									<input id="noticeName" type="text" name="name" maxlength="100" style="font-weight:bold;font-size:16px;color: #555;padding: 5px;width: 810px;" onfocusout="checkNumber2(this)" value="'+data[0].NT_NOTICE_NM+'">';
			output+='								</td>';
			output+='							</tr>';
			output+='							<input id="newsCont" type="hidden" name="newsCont" >';
			output+='							<tr>';
			output+='								<td style="padding: 5px;">';
			output+='									내용';
			output+='								</td>';
			output+='								<td style="padding: 5px;">';
			output+='									<textarea id="newsCont2" class="summernote" name="newsCont2">'+data[0].NT_NOTICE_EX+'</textarea>';
			output+='								</td>';
			output+='							</tr>';
			output+='						</table>';
			output+='						<div style="width: 858px;" align="right"><input type="submit" value="확인" onclick="addFun()" style="border:0px;background-color:#555;font-size:14px;padding:10px 20px;color:white;font-weight:bold;cursor:pointer;border-radius:3px;margin-right: 10px;"><button onclick=\'location.href="/noticeList.html"\' style="border:0px;background-color:#eee;font-size:14px;padding:10px 20px;color:#555;font-weight:bold;cursor:pointer;border-radius:3px;">취소</button></div>';
			output+='					</form>';
			output+='				</div>';
			output+='			</div>';
			output+='			</div>';
			output+='			<footer>';
			output+='				<div style="float:left; margin-top: 50px; margin-left: 300px; color: white;" align="left">';
			output+='					<p style="font-size: 12px;">';
			output+='						<b>다시 뛰는 사람들</b>';
			output+='					</p>';
			output+='					<p style="font-size: 11px;">';
			output+='						우)10460 경기도 고양시 덕양구 고양시청로 13-2 성광빌딩 4층';
			output+='					</p>';
			output+='					<p style="font-size: 11px;">';
			output+='						| 대표자: 이영아 | 사업자등록번호: 128-86-63160 | 통신판매업신고: <!--제 2017-고양덕양구-0076호-->';
			output+='					</p>';
			output+='				</div>';
			output+='				<div style="float:left; margin-top: 50px; margin-left: 99px; color: white;" align="left">';
			output+='					<p style="font-size: 12px;">';
			output+='						<b>고객센터</b>';
			output+='					</p>';
			output+='					<p style="font-size: 11px;">';
			output+='						| Tel (031)963-2900 | Fax (031)965-2900 | e-mail: webmaster@mygoyang.com';
			output+='					</p>';
			output+='					<p style="font-size: 11px;">';
			output+='						| 월-금: 오전10시 - 오후 6시 (Break hour: 오후 1시 ~ 오후 2시)';
			output+='					</p>';
			output+='				</div>';
			output+='			</footer>';
			output+='		</div>';
			output+='	</div>';
			output+='</body>';
			output+='</html>';

			response.send(output);
			connection.release();
		})
	})
})

app.get('/manageQuestionInfo.html',function(request,response){					//Q&A 곤리자 페이지
	var pk=request.param("question");
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM QUESTION_TB WHERE QT_PK=?",[pk], function (err,data) {
			var date=data[0].QT_REGDATE_YMD;
			var output='';
			output+='<!DOCTYPE html>';
			output+='<html>';
			output+='<head>';
			output+='	<meta charset="utf-8"/>';
			output+='	<title>마을마켓 - 관리자페이지</title>';
			output+='	<script src="js/jquery-3.1.1.js"></script>';
			output+='	<script src="js/numberWithCommas.js"></script>';
			output+='	<script src="js/manageQuestionInfo.js"></script>';
			output+='	<script src="bootstrap/js/bootstrap.min.js"></script>';
			output+='	<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">';
			output+='	<link href="/css/admin.css" rel="stylesheet">';
			output+='	<script type="text/javascript" src="jquery-ui-1.12.1.custom/jquery-ui.js"></script>';
			output+='	<link rel="stylesheet" type="text/css" href="jquery-ui-1.12.1.custom/jquery-ui.css"/>';
			output+='	<link href="css/noticeModify.css" rel="stylesheet">';
			output+='</head>';
			output+='<body>';
			output+='	<div id="page-wrapper">';
			output+='		<div>';
			output+='			<header align="right">';
			output+='				<a href="/logout"><button style="background-color: rgb(154,154,154);border: 0px;font-size: 12px;color: white;width: 70px;height: 30px;margin-top: 18px;margin-right: 20px;">로그아웃</button></a>';
			output+='			</header>';
			output+='			<div class="left">';
			output+='				<ul align="left">';
			output+='					<a href="/goodList.html"><li>상품목록</li></a>';
			output+='					<a href="/goodRegist.html"><li>상품등록</li></a>';
			output+='					<a href="/providerManage.html"><li>공급자 관리</li></a>';
			output+='					<a href="/tradeManage.html"><li>거래 상태별 주문관리</li></a>';
			output+='					<a href="/noticeList.html"><li>공지사항 관리</li></a>';
			output+='					<a href="/questionList.html"><li style="background-color: rgb(12,63,78);">Q&A 관리</li></a>';
			output+='					<a href="/slideBannerList.html"><li>슬라이드배너 관리</li></a>';
			output+='					<a href="/newsManage"><li>기사 관리</li></a>';
			output+='					<a href="/mainManage"><li>메인페이지 관리</li></a>';
			output+='					<a href="/counselAdmin.html"><li>입점신청서 관리</li></a>';
			output+='				</ul>';
			output+='			</div>';
			output+='			<div id = "container" align="left">';
			output+='				<div style="border-bottom: 2px solid;font-size: 25px;width: 1100px;margin:20px 0px 0px 30px;">Q&A 관리</div>';
			output+='				<div style="margin:5px 0px 0px 30px;width: 1100px;">';

			output+='<div style="font-size:15px;color: #666;font-weight: bold;border-top: 2px solid #dadada;padding-top:15px;text-align:center;">'+data[0].QT_QUESTION_NM+'</div>';
			output+='<div style="text-align:left;font-size:12px;color:#666;line-height: 1.8;"><em>Date : </em>'+date.slice(0,4)+'-'+date.slice(4,6)+'-'+date.slice(6,8)+'</div>';
			output+='<div style="text-align:left;font-size:12px;color:#666;line-height: 1.8;"><em>Name : </em>'+data[0].QT_WRITER_NM+'</div>';
			output+='<div style="text-align:left;font-size:12px;color:#666;line-height: 1.8;padding-bottom:15px;"><em>Hits : </em>'+data[0].QT_QUESTION_HITS+'</div>';
			output+='<div style="text-align:left;font-size:12px;color:#666;line-height: 1.8;padding: 30px 0 40px 0;border-top:1px solid #eee;border-bottom:1px solid #eee;margin-bottom:50px;">'+data[0].QT_QUESTION_EX+'</div>';
			output+='<div style="font-size:12px;color:#888;margin-top:10px;text-align:right;margin-bottom:60px;"><span style="cursor:pointer;" onclick="deleteFun('+data[0].QT_PK+')">문의삭제</span></div>';

			connection.query("SELECT * FROM ANSWER_TB where AS_QT_FK="+pk+";", function (err,data2) {
				if(err) console.error('err',err);
				if(data2!=""){
					var date=data2[0].AS_REGDATE_YMD;
					output+='<div style="font-size:15px;color: #666;font-weight: bold;border-top: 2px solid #dadada;padding-top:15px;text-align:center;">Re: '+data[0].QT_QUESTION_NM+'</div>';
					output+='<div style="text-align:left;font-size:12px;color:#666;line-height: 1.8;"><em>Date : </em>'+date.slice(0,4)+'-'+date.slice(4,6)+'-'+date.slice(6,8)+'</div>';
					output+='<div style="text-align:left;font-size:12px;color:#666;line-height: 1.8;padding-bottom:15px;"><em>Name : </em><span style="font-weight:bold;">마을마켓</span></div>';
					output+='<div style="text-align:left;font-size:12px;color:#666;line-height: 1.8;padding: 30px 0 40px 0;border-top:1px solid #eee;border-bottom:1px solid #eee;">'+data2[0].AS_ANSWER_EX+'</div>';
					output+='<div style="font-size:12px;color:#888;margin-top:60px;text-align:right;"><span style="cursor:pointer;" onclick="deleteAsFun('+data2[0].AS_PK+')">답글삭제</span> | <span style="cursor:pointer;" onclick="cancelFun()">목록보기</span></div>';
				}
				else{
					output+='<div style="font-size:15px;color: #666;font-weight: bold;border-top: 2px solid #dadada;padding-top:15px;text-align:center;">Re: '+data[0].QT_QUESTION_NM+'</div>';
					output+='<div style="text-align:left;font-size:12px;color:#666;line-height: 1.8;"><em>Date : </em>'+today()+'</div>';
					output+='<div style="text-align:left;font-size:12px;color:#666;line-height: 1.8;padding-bottom:15px;"><em>Name : </em><span style="font-weight:bold;">마을마켓</span></div>';
					output+='<div style="text-align:left;font-size:12px;color:#666;line-height: 1.8;padding: 30px 0 40px 0;border-top:1px solid #eee;border-bottom:1px solid #eee;"><textarea id="answerContent" style="width:100%;height:200px;"></textarea></div>';
					output+='<div style="font-size:12px;color:#888;margin-top:60px;text-align:right;"><span style="cursor:pointer;" onclick="addFun('+data[0].QT_PK+')">답글등록</span> | <span style="cursor:pointer;" onclick="cancelFun()">목록보기</span></div>';
				}
				output+='				</div>';
				output+='			</div>';
				output+='			</div>';
				output+='			<footer>';
				output+='				<div style="float:left; margin-top: 50px; margin-left: 300px; color: white;" align="left">';
				output+='					<p style="font-size: 12px;">';
				output+='						<b>다시 뛰는 사람들</b>';
				output+='					</p>';
				output+='					<p style="font-size: 11px;">';
				output+='						우)10460 경기도 고양시 덕양구 고양시청로 13-2 성광빌딩 4층';
				output+='					</p>';
				output+='					<p style="font-size: 11px;">';
				output+='						| 대표자: 이영아 | 사업자등록번호: 128-86-63160 | 통신판매업신고: <!--제 2017-고양덕양구-0076호-->';
				output+='					</p>';
				output+='				</div>';
				output+='				<div style="float:left; margin-top: 50px; margin-left: 99px; color: white;" align="left">';
				output+='					<p style="font-size: 12px;">';
				output+='						<b>고객센터</b>';
				output+='					</p>';
				output+='					<p style="font-size: 11px;">';
				output+='						| Tel (031)963-2900 | Fax (031)965-2900 | e-mail: webmaster@mygoyang.com';
				output+='					</p>';
				output+='					<p style="font-size: 11px;">';
				output+='						| 월-금: 오전10시 - 오후 6시 (Break hour: 오후 1시 ~ 오후 2시)';
				output+='					</p>';
				output+='				</div>';
				output+='			</footer>';
				output+='		</div>';
				output+='	</div>';
				output+='</body>';
				output+='</html>';

				connection.query("UPDATE QUESTION_TB SET QT_QUESTION_HITS="+(++data[0].QT_QUESTION_HITS)+" where QT_PK="+pk+";", function (err,ignore) {
			   		response.send(output);
		   		})
			})
		})
	})
})


////////////////////////////////////////////////////html get방식 끝

app.post('/newlogin', function(request, response){					//회원가입
	// 암호화
	var cipher = crypto.createCipher('aes192', key);    // Cipher 객체 생성
	cipher.update(request.body.password, 'utf8', 'base64');             // 인코딩 방식에 따라 암호화
	var cipheredOutput = cipher.final('base64');        // 암호화된 결과 값

	var values = {US_USER_ID:request.body.id,US_USER_PW:cipheredOutput,US_USER_NM:request.body.name,US_PHONE_NO:request.body.phone,US_USER_EM:request.body.email,US_REGDATE_YMD:request.body.regdate,US_ZIP_NO:request.body.zipcode,US_USER_AD1:request.body.address1,US_USER_AD2:request.body.address2,US_BIRTH_YMD:request.body.birth,US_USER_SEX:request.body.sex};
	conn.getConnection(function(err,connection){
		connection.query("INSERT INTO USERS_TB SET ?",values,function(err,data){
			if(err) console.error('err',err);
			connection.query("SELECT * FROM USERS_TB where US_USER_ID='"+request.body.id+"';",function(err,data){
				if(err) console.error('err',err);
				var values = {ML_US_FK:data[0].US_PK,ML_REGDATE_YMD:todayTime(),ML_MILEAGE_PR:1000,ML_MILEAGE_EX:"회원가입 적립금"};
				connection.query("INSERT INTO MILEAGE_TB SET ?",values,function(err,data){
				   	if(err) console.error('err',err);
					response.end();
					connection.release();
				});
			});
		});
	});
});

app.post('/modifyLogin', function(request, response){				//회원정보 수정
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_PK=?",[request.session.US_PK], function (err,data) {
		   	// if(err) console.error('err',err);
		    if(data!=''){
				// 암호화
				var cipher = crypto.createCipher('aes192', key);    // Cipher 객체 생성
				cipher.update(request.body.password, 'utf8', 'base64');             // 인코딩 방식에 따라 암호화
				var cipheredOutput = cipher.final('base64');        // 암호화된 결과 값


				var values = {US_USER_PW:cipheredOutput,US_PHONE_NO:request.body.phone,US_USER_EM:request.body.email,US_ZIP_NO:request.body.zipcode,US_USER_AD1:request.body.address1,US_USER_AD2:request.body.address2,US_BIRTH_YMD:request.body.birth,US_USER_SEX:request.body.sex};
				connection.query("UPDATE USERS_TB SET ? where US_PK="+request.session.US_PK,values,function(err,data){
				   	if(err) console.error('err',err);
					response.end();
					connection.release();
				});
			}
			else{
				response.redirect('/login.html?url=/myInfoModify.html');
				connection.release();
			}
		})
	})
});

app.get('/login_check',function(request,response){					//로그인 상태 확인
	var pk=request.session.US_PK;
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_PK=?",[pk], function (err,data) {
		    if(data!=''){
		    	response.send('good');
		    }
		    else{
		    	response.end();
		    }
		    connection.release();
		});
	});
})

app.post('/login',function(request,response){						//로그인
	var id=request.body.id;

	// 암호화
	var cipher = crypto.createCipher('aes192', key);    // Cipher 객체 생성
	cipher.update(request.body.password, 'utf8', 'base64');             // 인코딩 방식에 따라 암호화
	var cipheredOutput = cipher.final('base64');        // 암호화된 결과 값
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_USER_ID=? and US_USER_PW=?",[id,cipheredOutput], function (err,data) {
		   	if(err) console.error('err',err);
		    if(data[0]){
		    	var id=data[0].US_USER_ID;
		    	if(data[0].US_EXIST_ST!=0){
			    	request.session.US_PK=data[0].US_PK;
			    	if(id.slice(0,6)=="seller"){					//id가 seller로 시작할 경우
			    		response.send("/tradeManageSeller.html");	//판매자 페이지로 보냄
			    	}
			    	else if(id.slice(0,5)=="admin"){				//id가 admin로 시작할 경우
			    		response.send("/goodList.html");			//관리자 페이지로 보냄
			    	}
			    	else{
			    		response.send(request.body.url);
			    	}
			    	connection.release();
		    	}
		    	else{
		    		response.send("fail");
		    		connection.release();
		    	}
		    }
		    else{
		    	response.send("fail");
		    	connection.release();
		    }
		});
	});
})

app.get('/logout',function(request,response){
	request.session.destroy(function(err){
		response.redirect('/');
	})
})

app.get('/items',function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM GOODS_TB where GD_EXIST_ST=1 and GD_GOOD_ST IN (1);",function(err,data){
			response.send(data);
			connection.release();
		})
	})
})

app.get('/newGoods',function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM GOODS_TB where GD_EXIST_ST=1 and GD_GOOD_ST IN (1) order by GD_REGDATE_YMD DESC LIMIT 6;",function(err,data){
			response.send(data);
			connection.release();
		})
	})
})

app.get('/recommendGoods',function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT RC_GD_FK FROM RECOMMEND_TB  ORDER BY RC_PK;",function(err,data){
			var GD_PK=[];
			for(var i=0;i<data.length;i++){
				GD_PK.push(data[i].RC_GD_FK);
			}
			connection.query("SELECT * FROM GOODS_TB where GD_PK IN (?) ;",[GD_PK],function(err,data2){
				response.send({data:data,data2:data2});
				connection.release();
			})
		})
	})
})

app.get('/popularGoods',function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM GOODS_TB where GD_EXIST_ST=1 and GD_GOOD_ST IN (1) order by GD_BUY_AMT DESC LIMIT 6;",function(err,data){
			response.send(data);
			connection.release();
		})
	})
})

app.get('/bringStory',function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM STORY_TB ORDER BY ST_PK;",function(err,data){
			response.send(data);
			connection.release();
		})
	})
})

app.post('/bringStoryPk',function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM STORY_TB WHERE ST_PK="+request.body.pk+";",function(err,data){
			response.send(data);
			connection.release();
		})
	})
})

app.get('/itemsList',function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM GOODS_TB where GD_EXIST_ST=1;",function(err,data){
			response.send(data);
			connection.release();
		})
	})
})

app.get('/bringHighCategory',function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("select * from CATEGORY_TB;",function(err,data){
			if(err) console.error('err',err);
			if(data!=''){
				response.send(data);
			}
			else{
				response.end();
			}
			connection.release();
		})
	})
})

app.get('/bringMyUserData',function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_PK=?",[request.session.US_PK], function (err,data) {
			if(data[0]!=''){
				response.send(data[0]);
			}
			else{
				response.redirect('/login.html');
			}
			connection.release();
		})
	})
})

app.post('/idCheck',function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB where US_USER_ID=?;",[request.body.id],function(err,data){
			if(err) console.error('err',err);
			if(data[0]!=undefined){
				response.send('fail');
			}
			else{
				response.send('success');
			}
			connection.release();
		})
	})
})

app.post("/userDelete",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_PK=?",[request.session.US_PK], function (err,data) {
			if(err) console.error('err',err);
		   	if(data!=''){
		   		if(request.body.reason){
					var values = {LV_REASON:request.body.reason,LV_CONTENT:request.body.content};
		   		}
		   		else{
					var values = {LV_CONTENT:request.body.content};
		   		}
				connection.query("INSERT INTO LEAVE_TB SET ?",values,function(err,data){
				   	if(err) console.error('err',err);
					connection.query("UPDATE USERS_TB SET US_EXIST_ST=0 WHERE US_PK="+request.session.US_PK+";",function(err,data){
					   	if(err) console.error('err',err);
						request.session.destroy(function(err){
							response.end();
							connection.release();
						})
					})
				})
		   	}
		   	else{
				response.redirect('/login.html?url=/userDelete.html');
				connection.release();
		   	}
		})
	})
})

app.post('/identifyCategorys',function(request,response){	
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM CATEGORY_TB WHERE CG_PK=?;",[request.body.high_num], function (err,data) {
			response.send(data);
			connection.release();
		})
	})
})

app.get('/goCart',function(request,response){				//장바구니로 보내기
	if(request.session.US_PK){
		conn.getConnection(function(err,connection){
			connection.query("INSERT INTO CARTS_TB (CT_US_FK,CT_GD_FK,CT_GOOD_AMT) values ("+request.session.US_PK+","+request.param('item')+","+request.param('amount')+");",function(data){
				response.send('success');
				connection.release();
			})
		})
	}
	else{
		response.end();
	}
})

app.get('/cartIdentify',function(request,response){			//장바구니 확인
	if(request.session.US_PK){
		conn.getConnection(function(err,connection){
			connection.query("SELECT * FROM CARTS_TB where CT_US_FK=?;",[request.session.US_PK],function(err,data){
				response.send(data);
				connection.release();
			})
		})
	}
	else{
		response.end();
	}
})

app.post("/cartItemIdentify",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM GOODS_TB where GD_PK=?;",[request.body.CT_GD_FK],function(err,data){
			response.send({data:data,amount:request.body.CT_GOOD_AMT,CT_PK:request.body.CT_PK});
			connection.release();
		})
	})
})

app.post("/deleteCart",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("DELETE FROM CARTS_TB where CT_PK=?;",[request.body.pk],function(err,data){
			response.end();
			connection.release();
		})
	})
})

app.post("/deleteAddress",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("DELETE FROM ADDRESS_TB where AD_PK=?;",[request.body.pk],function(err,data){
			response.end();
			connection.release();
		})
	})
})

app.post("/pwCheck",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_PK=?",[request.session.US_PK], function (err,data) {
			if(err) console.error('err',err);
		   	if(data!=''){
				var decipher = crypto.createDecipher('aes192', key); // Decipher 객체 생성
				decipher.update(data[0].US_USER_PW, 'base64', 'utf8');   // 인코딩 방식에 따라 복호화
				var decipheredOutput = decipher.final('utf8');       // 복호화된 결과 값
		   		
		   		if(request.body.password==decipheredOutput){
		   			response.send('success');
		   		}
		   		else{
		   			response.send('fail');
		   		}
		   		connection.release();
		   	}
		   	else{
				response.redirect('/login.html?url=/myInfoModify.html');
				connection.release();
		   	}
		})
	})
})

app.get("/bringOrderUs",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_PK=?",[request.session.US_PK], function (err,data) {
			if(err) console.error('err',err);
		   	if(data!=''){
		   		response.send(""+data[0].US_PK);
		   	}
		   	else{
				response.send("fail");
		   	}
		   	connection.release();
		})
	})
})

app.post("/orderGo",function(request,response){			//주문하기
	var item=request.body.itemNumArr;
	var itemArr=item.split(",");
	var amount=request.body.itemAmountArr;
	var amountArr=amount.split(",");
	var mileage=request.body.mileage;
	var values=[];
	for(var i=0;i<itemArr.length;i++){
		var moment=[];
		moment.push(request.body.US_PK);
		moment.push(Number(itemArr[i]));
		moment.push(Number(amountArr[i]));
		moment.push(request.body.orderNumber+request.body.US_PK);
		moment.push(request.body.receiver);
		moment.push(request.body.receiverZipcode);
		moment.push(request.body.receiverAddress1);
		moment.push(request.body.receiverAddress2);
		moment.push(request.body.receiverPhoneNum);
		moment.push(request.body.receiverMessage);
		moment.push(request.body.orderState);
		moment.push(request.body.depositName);
		moment.push(request.body.depositYMD);
		moment.push(request.body.receiverNo1);
		moment.push(request.body.depositMTD);
		moment.push(request.body.receiverEmail);
		moment.push(request.body.depositPrice);
		moment.push(request.body.buyerName);
		moment.push(request.body.buyerPhone);
		moment.push(mileage);
		values.push(moment);
	}
	conn.getConnection(function(err,connection){
		connection.query("INSERT INTO ADDRESS_TB (AD_US_FK,AD_NM,AD_ZIP_NO,AD_AD1,AD_AD2,AD_NO,AD_PHONE_NO,AD_EX_ST,AD_REGDATE_YMD) VALUES (?,?,?,?,?,?,?,?,?)",[request.body.US_PK,request.body.receiver,request.body.receiverZipcode,request.body.receiverAddress1,request.body.receiverAddress2,request.body.receiverNo1,request.body.receiverPhoneNum,1,today()],function(err,data){
		   	if(err) console.error('err',err);
			connection.query("INSERT INTO ORDERS_TB (OD_US_FK, OD_GD_FK, OD_GOOD_AMT, OD_ORDER_NO, OD_RECEIVER_NM, OD_RECEIVER_ZIP_NO, OD_RECEIVER_AD1, OD_RECEIVER_AD2, OD_RECEIVER_PHONE_NO, OD_RECEIVER_MESSAGE_CT, OD_ORDER_ST, OD_DEPOSIT_NM, OD_DEPOSIT_YMD, OD_RECEIVER_NO, OD_DEPOSIT_MTD, OD_DEPOSIT_EM, OD_DEPOSIT_PR, OD_BUYER_NM, OD_BUYER_PHONE_NO, OD_MILEAGE_PR) VALUES ?",[values],function(err,data){						//데이터베이스에 주문 내역을 저장
			   	if(err) console.error('err',err);
			   	var length=itemArr.length;
			   	for(var i=0;i<itemArr.length;i++){
					connection.query("DELETE FROM CARTS_TB where CT_US_FK="+request.body.US_PK+" and CT_GD_FK="+itemArr[i]+" and CT_GOOD_AMT="+amountArr[i]+";",function(err,data){				//카트에서 주문내역과 같은 상품을 제거
					   	if(err) console.error('err',err);
					   	length--;
					   	if(length<1){
							if(mileage>0){
								var values = {ML_US_FK:request.session.US_PK,ML_REGDATE_YMD:todayTime(),ML_MILEAGE_PR:-mileage,ML_MILEAGE_EX:"상품 구매"};
								connection.query("INSERT INTO MILEAGE_TB SET ?;",values,function(err,data){					//데이터베이스에 마일리지 저장
							   		if(err) console.error('err',err);
				   					response.end();
				   					connection.release();
								});
							}
							else{
					   			response.end();
					   			connection.release();
					   		}
					   	}
					});
				}
			});
		});
	})
})

app.post("/removeAmt",function(request,response){				//아이템 수량 제거
	var item=request.body.itemNumArr;
	var itemArr=item.split(",");
	var amount=request.body.itemAmountArr;
	var amountArr=amount.split(",");
	var momentItemNum=[];
	var momentAmountNum=[];
	for(var i=0;i<itemArr.length;i++){
		var pushFlag=0;
		for(var j=0;j<momentItemNum.length;j++){
			if(itemArr[i]==momentItemNum[j]){
				pushFlag=1;
				break;
			}
		}
		if(pushFlag==0){							//같은 상품이 존재하지 않는다면
			momentItemNum.push(itemArr[i]);
			momentAmountNum.push(Number(amountArr[i]));
		}
		else{										//같은 상품이 존재한다면
			momentAmountNum[j]+=Number(amountArr[i]);			//해당 상품 수량을 늘림
		}
	}
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM GOODS_TB WHERE GD_PK in (?);",[momentItemNum], function (err,data) {
			if(err) console.error('err',err);
			for(var i=0;i<momentItemNum.length;i++){
				for(var j=0;j<data.length;j++){
					if(momentItemNum[i]==data[j].GD_PK){
						if(momentAmountNum[i]>data[j].GD_GOOD_AMT){					//아이템 수량이 구매하려는 수량보다 적다면
							response.send(data[j]);
							connection.release();
							return;
						}
						break;
					}
				}
			}

			for(var i=0;i<data.length;i++){
				for(var j=0;j<momentItemNum.length;j++){
					if(data[i].GD_PK==momentItemNum[j]){							//아이템 수량이 구매하려는 수량과 같다면
				   		data[i].GD_GOOD_AMT-=momentAmountNum[j];					//아이템 수량 감소
				   		if(data[i].GD_GOOD_AMT<1){									//아이템 수량이 1보다 작다면
				   			data[i].GD_GOOD_ST=2;									//아이템 상태 변경(판매중지상태)
				   		}
				   		break;
					}
				}
			}
			var length=data.length;
			for(var i=0;i<data.length;i++){
				connection.query("UPDATE GOODS_TB SET ? where GD_PK="+data[i].GD_PK+";",[data[i]],function(err,data){			//데이터베이스에서 아이템 정보 변경
				   	if(err) console.error('err',err);
				   	length--;							//콜백함수가 여러번 반복될 때 마지막 콜백함수를 확인하기 위해 length라는 변수를 이용
				   	if(length<1){						//length<1일 때, 즉 마지막 콜백함수 일 때
						response.end();
						connection.release();
				   	}
				});
			}
		});
	})
})

app.post("/addAmt",function(request,response){					//수량 증가
	var item=request.body.itemNumArr;
	var itemArr=item.split(",");
	var amount=request.body.itemAmountArr;
	var amountArr=amount.split(",");
	var momentItemNum=[];
	var momentAmountNum=[];
	for(var i=0;i<itemArr.length;i++){
		var pushFlag=0;
		for(var j=0;j<momentItemNum.length;j++){
			if(itemArr[i]==momentItemNum[j]){
				pushFlag=1;
				break;
			}
		}
		if(pushFlag==0){
			momentItemNum.push(itemArr[i]);
			momentAmountNum.push(Number(amountArr[i]));
		}
		else{
			momentAmountNum[j]+=Number(amountArr[i]);
		}
	}

	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM GOODS_TB WHERE GD_PK in (?);",[momentItemNum], function (err,data) {
			if(err) console.error('err',err);
			for(var i=0;i<data.length;i++){
				for(var j=0;j<momentItemNum.length;j++){
					if(data[i].GD_PK==momentItemNum[j]){
				   		data[i].GD_GOOD_AMT+=momentAmountNum[j];
				   		if(data[i].GD_GOOD_ST==2){							//판매중지 상태라면
					   		if(data[i].GD_GOOD_AMT>0){						//아이템의 수량이 0보다 크다면
					   			data[i].GD_GOOD_ST=1;						//판매중 상태로 변경
					   		}
				   		}
				   		break;
					}
				}
			}
			var length=data.length;
			for(var i=0;i<data.length;i++){
				connection.query("UPDATE GOODS_TB SET ? where GD_PK="+data[i].GD_PK+";",[data[i]],function(err,data){
				   	if(err) console.error('err',err);
				   	length--;
				   	if(length<1){
						response.end();
						connection.release();
				   	}
				});
			}
		});
	})
})

app.post('/bringUserId',function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB where US_PK=?;",request.body.pk,function(err,data){
		   	if(err) console.error('err',err);
			response.send(data);
			connection.release();
		});
	})
})

app.get('/bringMyOrder',function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM ORDERS_TB where OD_US_FK="+request.session.US_PK+" ORDER BY OD_ORDER_NO DESC;",function(err,data){
		   	if(err) console.error('err',err);
		   	if(data!=''){
		   		response.send(data);
		   	}
		   	else{
		   		response.end();
		   	}
		   	connection.release();
		})
	})
})

app.get('/bringMyAddress',function(request,response){
	if(request.session.US_PK){
		conn.getConnection(function(err,connection){
			connection.query("SELECT * FROM ADDRESS_TB where AD_US_FK="+request.session.US_PK+" AND AD_EX_ST="+request.param("ex")+" LIMIT "+((request.param("page")-1)*10)+",10;",function(err,data){
			   	if(err) console.error('err',err);
			   	if(data!=''){
			   		response.send(data);
			   	}
			   	else{
			   		response.end();
			   	}
			   	connection.release();
			})
		})
	}
})

app.get('/bringMyAddressCount',function(request,response){
	var pk=request.session.US_PK;
	conn.getConnection(function(err,connection){
		connection.query("SELECT COUNT(AD_US_FK="+pk+" && AD_EX_ST="+request.param("ex")+") FROM ADDRESS_TB;",function(err,data){
		   	if(err) console.error('err',err);
		   	var instant=data[0]['COUNT(AD_US_FK='+pk+' && AD_EX_ST=0)'];
		   	response.send({count:instant});
		   	connection.release();
		})
	})
})

app.post('/bringMyAddress',function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM ADDRESS_TB where AD_PK="+request.body.pk+";",function(err,data){
		   	if(err) console.error('err',err);
		   	if(data!=''){
		   		response.send(data);
		   	}
		   	else{
		   		response.end();
		   	}
		   	connection.release();
		})
	})
})

app.get('/myMileage',function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM MILEAGE_TB where ML_US_FK="+request.session.US_PK+";",function(err,data){
		   	if(err) console.error('err',err);
		   	if(data!=''){
		   		response.send(data);
		   	}
		   	else{
		   		response.end();
		   	}
		   	connection.release();
		})
	})
})

app.post('/soldStateModify',function(request,response){
	var values = {GD_GOOD_ST:request.body.st};
	conn.getConnection(function(err,connection){
		connection.query("UPDATE GOODS_TB SET ? WHERE GD_PK="+request.body.pk+";",values,function(err,data){
			connection.query("DELETE FROM CARTS_TB WHERE CT_GD_FK="+request.body.pk+";",function(err,data){
			   	if(err) console.error('err',err);
				response.end();
				connection.release();
			});
		});
	})
})

app.post('/deleteGood',function(request,response){
	var values = {GD_EXIST_ST:0};
	conn.getConnection(function(err,connection){
		connection.query("UPDATE GOODS_TB SET ? WHERE GD_PK="+request.body.pk+";",values,function(err,data){
			connection.query("DELETE FROM CARTS_TB WHERE CT_GD_FK="+request.body.pk+";",function(err,data){
			   	if(err) console.error('err',err);
				response.end();
				connection.release();
			});
		});
	})
})

app.post('/deleteNotice',function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("DELETE FROM NOTICE_TB WHERE NT_PK="+request.body.pk+";",function(err,data){
		   	if(err) console.error('err',err);
			response.end();
			connection.release();
		});
	})
})

app.post('/deleteQuestion',function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("DELETE FROM QUESTION_TB WHERE QT_PK="+request.body.pk+";",function(err,data){
		   	if(err) console.error('err',err);
			response.end();
			connection.release();
		});
	})
})

app.post('/deleteAnswer',function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("DELETE FROM ANSWER_TB WHERE AS_PK="+request.body.pk+";",function(err,data){
		   	if(err) console.error('err',err);
			response.end();
			connection.release();
		});
	})
})

app.post('/deleteBanner',function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("DELETE FROM BANNER_TB WHERE BN_PK="+request.body.pk+";",function(err,data){
		   	if(err) console.error('err',err);
			response.end();
			connection.release();
		});
	})
})

app.post('/registSeller', function(request, response){					//판매자 등록
	var cipher = crypto.createCipher('aes192', key);    // Cipher 객체 생성
	cipher.update(request.body.password, 'utf8', 'base64');             // 인코딩 방식에 따라 암호화
	var cipheredOutput = cipher.final('base64');        // 암호화된 결과 값

	var values = {US_USER_ID:request.body.id,US_USER_PW:cipheredOutput,US_USER_NM:"",US_PHONE_NO:"",US_USER_EM:"",US_REGDATE_YMD:request.body.regdate,US_ZIP_NO:"",US_USER_AD1:"",US_USER_AD2:"",US_BIRTH_YMD:"",US_USER_SEX:""};
	conn.getConnection(function(err,connection){
		connection.query("INSERT INTO USERS_TB SET ?",values,function(err,data){
		   	if(err) console.error('err',err);
			connection.query("SELECT * FROM USERS_TB where US_USER_ID='"+request.body.id+"';",function(err,data){
			   	if(err) console.error('err',err);
				var values = {SEL_SELLER_NM:request.body.name,SEL_SELLER_EX:request.body.memo,SEL_US_FK:Number(data[0].US_PK),SEL_SELLER_REGISTRATION_NO:request.body.registration,SEL_MANAGER_NM:request.body.manager,SEL_SELLER_EM:request.body.email,SEL_PHONE_NO:request.body.phone,SEL_US_FK:data[0].US_PK};
				connection.query("INSERT INTO SELLERS_TB SET ?;",values,function(err,data){
				   	if(err) console.error('err',err);
					response.end();
					connection.release();
				});
			});
		});
	})

});

app.post('/modifySeller', function(request, response){				//판매자 정보 변경
	var values = {SEL_SELLER_NM:request.body.name,SEL_SELLER_EX:request.body.memo,SEL_SELLER_REGISTRATION_NO:request.body.registration,SEL_MANAGER_NM:request.body.manager,SEL_SELLER_EM:request.body.email,SEL_PHONE_NO:request.body.phone};
	conn.getConnection(function(err,connection){
		connection.query("UPDATE SELLERS_TB SET ? WHERE SEL_PK="+request.body.pk+";",values,function(err,data){
		   	if(err) console.error('err',err);
			response.end();
			connection.release();
		});
	})
});

app.get("/sellerList",function(request,response){					//판매자 목록
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM SELLERS_TB where SEL_SELLER_ST NOT IN (0);",function(err,data){
			if(err) console.error('err',err);
			response.send(data);
			connection.release();
		})
	})
})

app.post("/sellerUserList",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB where US_PK IN (?);",[request.body.fk],function(err,data){
			if(err) console.error('err',err);
			response.send(data);
			connection.release();
		})
	})
})

app.post("/deleteSeller",function(request,response){				//판매자 삭제
	var pk=request.body.fk;
	conn.getConnection(function(err,connection){
		connection.query("UPDATE SELLERS_TB SET SEL_SELLER_ST=0 WHERE SEL_US_FK="+pk+";",function(err,data){
		   	if(err) console.error('err',err);
			connection.query("UPDATE USERS_TB SET US_EXIST_ST=0 WHERE US_PK="+pk+";",function(err,data){
			   	if(err) console.error('err',err);
				response.end();
				connection.release();
			})
		})
	})
})

app.post('/modifyProvider', function(request, response){
	// 암호화
	var cipher = crypto.createCipher('aes192', key);    // Cipher 객체 생성
	cipher.update(request.body.password, 'utf8', 'base64');             // 인코딩 방식에 따라 암호화
	var cipheredOutput = cipher.final('base64');        // 암호화된 결과 값

	var values = {US_USER_PW:cipheredOutput};
	conn.getConnection(function(err,connection){
		connection.query("UPDATE USERS_TB SET ? where US_PK="+request.body.pk,values,function(err,data){
		   	if(err) console.error('err',err);
			response.end();
			connection.release();
		});
	});
});

app.post('/modifyPw', function(request, response){
	// 암호화
	var cipher = crypto.createCipher('aes192', key);    // Cipher 객체 생성
	cipher.update(request.body.password, 'utf8', 'base64');             // 인코딩 방식에 따라 암호화
	var cipheredOutput = cipher.final('base64');        // 암호화된 결과 값

	var values = {US_USER_PW:cipheredOutput};
	conn.getConnection(function(err,connection){
		connection.query("UPDATE USERS_TB SET ? where US_PK="+request.body.pk,values,function(err,data){
		   	if(err) console.error('err',err);
			response.end();
			connection.release();
		});
	});
});

app.post('/modifyPwSeller', function(request, response){
	// 암호화
	var cipher = crypto.createCipher('aes192', key);    // Cipher 객체 생성
	cipher.update(request.body.password, 'utf8', 'base64');             // 인코딩 방식에 따라 암호화
	var cipheredOutput = cipher.final('base64');        // 암호화된 결과 값

	var values = {US_USER_PW:cipheredOutput};
	conn.getConnection(function(err,connection){
		connection.query("UPDATE USERS_TB SET ? where US_PK="+request.session.US_PK,values,function(err,data){
		   	if(err) console.error('err',err);
			response.end();
			connection.release();
		});
	});
});

app.post("/goNextState",function(request,response){					//거래 상태별 주문 관리 다음 상태로 보내기
	conn.getConnection(function(err,connection){
		connection.query("UPDATE ORDERS_TB SET OD_ORDER_ST="+request.body.state+" where OD_ORDER_NO in (?);",[request.body.orderNumber],function(err,data){
			if(err) console.error('err',err);
			if(request.body.time){
				connection.query("UPDATE ORDERS_TB SET OD_DEPOSIT_YMD="+request.body.time+" where OD_ORDER_NO in (?);",[request.body.orderNumber],function(err,data){
					if(err) console.error('err',err);
					response.end();
					connection.release();
				})
			}
			else{
				response.end();
				connection.release();
			}
		})
	})
})

app.post("/cancelOrder",function(request,response){					//주문 취소
	var orderNumber=request.body.orderNumber;
	conn.getConnection(function(err,connection){
		connection.query("UPDATE ORDERS_TB SET OD_ORDER_ST="+request.body.state+" where OD_ORDER_NO in (?);",[orderNumber],function(err,data){
			if(err) console.error('err',err);
			connection.query("SELECT * FROM ORDERS_TB WHERE OD_ORDER_NO in (?);",[orderNumber],function(err,data){
				if(err) console.error('err',err);
				var momentPk=[];
				var momentAmt=[];
				momentPk.push(data[0].OD_GD_FK);
				momentAmt.push(data[0].OD_GOOD_AMT);
				for(var i=1;i<data.length;i++){
					var flag=0;
					for(var j=0;j<momentPk.length;j++){
						if(data[i].OD_GD_FK==momentPk[j]){
							flag=1;
							break;
						}
					}
					if(flag==0){
						momentPk.push(data[i].OD_GD_FK);
						momentAmt.push(data[i].OD_GOOD_AMT);
					}
					else{
						momentAmt[j]+=data[i].OD_GOOD_AMT;
					}
				}
				connection.query("SELECT * FROM GOODS_TB WHERE GD_PK in (?);",momentPk,function(err,data2){
					if(err) console.error('err',err);
					for(var i=0;i<data2.length;i++){
						for(var j=0;j<momentPk.length;j++){
							if(data2[i].GD_PK==momentPk[j]){
								data2[i].GD_GOOD_AMT+=momentAmt[j];			//아이템 수량 증가
								if(data2[i].GD_GOOD_ST==2){					//판매중지 상태라면
									data2[i].GD_GOOD_ST=1;					//판매중 상태로 변경
								}
								break;
							}
						}
					}
					var length=data2.length;
					for(var i=0;i<data2.length;i++){
						connection.query("UPDATE GOODS_TB SET ? WHERE GD_PK="+data2[i].GD_PK+";",data2,function(err,data3){
							if(err) console.error('err',err);
							length--;
							if(length==0){
								var mileageMinus=[];
								var flag=0;
								for(var i=0;i<data.length;i++){
									for(var j=0;j<mileageMinus.length;j++){
										if(data[mileageMinus[j]]==data[i].OD_ORDER_NO){
											flag=1;
											break;
										}
									}
									if(flag==0){
										mileageMinus.push(i);
									}
								}
								length=mileageMinus.length;
								for(var i=0;i<mileageMinus.length;i++){
									if(data[mileageMinus[i]].OD_MILEAGE_PR==0){
										length--;
										if(length==0){
											response.end();
											connection.release();
										}
									}
									else{
										connection.query("INSERT INTO MILEAGE_TB (ML_US_FK,ML_REGDATE_YMD,ML_MILEAGE_PR,ML_MILEAGE_EX) values ("+data[mileageMinus[i]].OD_US_FK+",'"+todayTime()+"',"+data[mileageMinus[i]].OD_MILEAGE_PR+",'주문취소');",function(err,data2){				//데이터베이스에 마일리지 주문취소 저장
											length--;
											if(length==0){
												response.end();
												connection.release();
											}
										})
									}
								}
							}
						})
					}
				})
			})
		})
	})
})

app.post("/goNextState2",function(request,response){					//거래 상태별 주문 관리 다음 상태로 보내기2
	var orderNumber=request.body.orderNumber;
	var goodNum=request.body.goodNum;
	if(request.body.state!=5){							//거래 상태가 5단계가 아니라면
		var length=orderNumber.length;
		conn.getConnection(function(err,connection){
			for(var i=0;i<orderNumber.length;i++){
				connection.query("UPDATE ORDERS_TB SET OD_ORDER_ST="+request.body.state+" where OD_ORDER_NO="+orderNumber[i]+" and OD_GD_FK="+goodNum[i]+";",function(err,data){
					if(err) console.error('err',err);
					length--;
					if(length==0){
						response.end();
						connection.release();
					}
				})
			}
		})
	}
	else{												//거래 상태가 5단계라면
		conn.getConnection(function(err,connection){
			connection.query("UPDATE ORDERS_TB SET OD_ORDER_ST="+request.body.state+" where OD_ORDER_NO="+orderNumber+" and OD_GD_FK="+goodNum+";",function(err,data){
				if(err) console.error('err',err);
				connection.query("SELECT * FROM GOODS_TB where GD_PK="+goodNum+";",function(err,data){
					if(err) console.error('err',err);
					var amount=data[0].GD_BUY_AMT;
					amount+=request.body.amount;
					connection.query("UPDATE GOODS_TB SET GD_BUY_AMT="+amount+" where GD_PK="+goodNum+";",function(err,data){		//구매량 늘리기
						if(err) console.error('err',err);
						connection.query("SELECT * FROM ORDERS_TB where OD_ORDER_NO="+orderNumber+";",function(err,data){
						   	if(err) console.error('err',err);
						   	var flag=0;
						   	for(var i=0;i<data.length;i++){
						   		if(data[i].OD_ORDER_ST!=5){
						   			flag=1;
						   			break;
						   		}
						   	}
						   	if(flag!=1){
						   		var momentArray=[];
						   		for(var i=0;i<data.length;i++){
						   			momentArray.push(data[i].OD_GD_FK);
						   		}
								connection.query("SELECT * FROM GOODS_TB where GD_PK in (?);",momentArray,function(err,data2){
								   	if(err) console.error('err',err);
								   	var delPr=0;
								   	for(var i=0;i<data2.length;i++){
								   		delPr+=data2[i].GD_DELIVERY_PR;
								   	}
								   	var values;
								   	if(data[0].OD_DEPOSIT_PR+data[0].OD_MILEAGE_PR-delPr<50000){			//구매한 금액이 5만원 미만이라면
										values = {ML_US_FK:data[0].OD_US_FK,ML_REGDATE_YMD:todayTime(),ML_MILEAGE_PR:(data[0].OD_DEPOSIT_PR-delPr)/100,ML_MILEAGE_EX:"상품 구매 적립"};
									}
									else{																	//구매한 금액이 5만원 이상이라면
										values = {ML_US_FK:data[0].OD_US_FK,ML_REGDATE_YMD:todayTime(),ML_MILEAGE_PR:(data[0].OD_DEPOSIT_PR)/100,ML_MILEAGE_EX:"상품 구매 적립"};
									}
									connection.query("INSERT INTO MILEAGE_TB SET ?",values,function(err,data){
									   	if(err) console.error('err',err);
										response.end();
										connection.release();
									});
								});
							}
							else{
								response.end();
								connection.release();
							}
						});
					})
				})
			})
		})
	}
})

app.post("/registNum",function(request,response){								//송장 번호 등록
	conn.getConnection(function(err,connection){
		connection.query("UPDATE ORDERS_TB SET OD_DELIVERY_NO="+request.body.deliveryNo+" where OD_ORDER_NO="+request.body.orderNumber+" and OD_GD_FK="+request.body.goodNum+";",function(err,data){
			if(err) console.error('err',err);
			response.end();
			connection.release();
		})
	})
})

app.post("/deleteNum",function(request,response){								//송장 번호 삭제
	conn.getConnection(function(err,connection){
		connection.query("UPDATE ORDERS_TB SET OD_DELIVERY_NO='' where OD_ORDER_NO="+request.body.orderNumber+" and OD_GD_FK="+request.body.goodNum+";",function(err,data){
			if(err) console.error('err',err);
			response.end();
			connection.release();
		})
	})
})

app.get("/bringSellers",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM SELLER_TB;",function(err,data){
			if(err) console.error('err',err);
			response.send(data);
			connection.release();
		})
	})
})

app.post("/orderStateConfirm",function(request,response){						//주문 상태 확인
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM ORDERS_TB where OD_ORDER_ST="+request.body.st+";",function(err,data){
			if(err) console.error('err',err);
			response.send(data);
			connection.release();
		})
	})
})

app.post("/search",function(request,response){								//거래 상태별 주문관리에 있는 검색
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM GOODS_TB WHERE GD_GOOD_NM LIKE '%"+request.body.itemName+"%';",function(err,data){
			if(err) console.error('err',err);

			var momentArray=[];
			for(var i=0;i<data.length;i++){
				momentArray.push(data[i].GD_PK);
			}
			if(momentArray.length==0){
				momentArray.push(0);
			}
			connection.query("SELECT * FROM ORDERS_TB WHERE OD_ORDER_ST="+request.body.state+" AND OD_GD_FK in (?) AND (OD_ORDER_NO LIKE '%"+request.body.orderNum+"%' OR OD_BUYER_NM LIKE '%"+request.body.buyerName+"%' OR OD_BUYER_PHONE_NO LIKE '%"+request.body.phoneNum+"%' OR OD_DEPOSIT_PR LIKE '%"+request.body.depositPrice+"%') AND OD_DEPOSIT_MTD LIKE '%"+request.body.depositMethod+"%';",momentArray,function(err,data){
				if(err) console.error('err',err);
				for(var i=0;i<data.length;i++){
					var date=data[i].OD_ORDER_NO;
					date=date.slice(0,8);
					if(date>=request.body.date1&&date<=request.body.date2){

					}
					else{
						data.splice(i,1);
						i--;
					}
				}
				response.send(data);
				connection.release();
			})
		})
	})
})

app.post("/orderStateConfirmSeller",function(request,response){				//거래 상태별 관리(판매자)
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM SELLERS_TB where SEL_US_FK="+request.session.US_PK+" and SEL_SELLER_ST=1;",function(err,data){
			if(err) console.error('err',err);
			if(data[0]){
				connection.query("SELECT * FROM GOODS_TB where GD_SEL_FK="+data[0].SEL_PK+";",function(err,data){
					if(err) console.error('err',err);
					var momentArray=[];
					for(var i=0;i<data.length;i++){
						momentArray.push(data[i].GD_PK);
					}
					if(momentArray.length!=0){
						connection.query("SELECT * FROM ORDERS_TB where OD_ORDER_ST="+request.body.st+" AND OD_GD_FK IN (?)",[momentArray],function(err,data){
							if(err) console.error('err',err);
							response.send(data);
							connection.release();
						})
					}
					else{
						response.end();
						connection.release();
					}
				})
			}
			else{
				response.end();
				connection.release();
			}
		})
	})
})

app.post("/goodConfirm",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM GOODS_TB where GD_PK="+request.body.good+";",function(err,data){
			if(err) console.error('err',err);
			response.send({data:data,moment:request.body.moment,itemKinds:request.body.itemKinds});
			connection.release();
		})
	})
})

app.post("/goodAmountConfirm",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM GOODS_TB where GD_PK in (?);",[request.body.pk],function(err,data){
			if(err) console.error('err',err);
			response.send(data);
			connection.release();
		})
	})
})

app.post("/newsConfirm",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM NEWS_TB where NEWS_PK in (?);",[request.body.pk],function(err,data){
			if(err) console.error('err',err);
			response.send(data);
			connection.release();
		})
	})
})

app.post("/sellerConfirm",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM SELLERS_TB where SEL_PK="+request.body.seller+";",function(err,data){
			if(err) console.error('err',err);
			connection.query("SELECT * FROM USERS_TB where US_PK="+data[0].SEL_US_FK+";",function(err,data2){
				if(err) console.error('err',err);
				response.send({data:data,moment:request.body.moment,data2:data2});
				connection.release();
			})
		})
	})
})

app.get("/adminConfirm",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_PK=?",[request.session.US_PK], function (err,data) {
			if(err) console.error('err',err);
		   	if(data!=''){
		   		var id=data[0].US_USER_ID;
		   		if(id.slice(0,5)=="admin"){
		   			response.send("success");
		   		}
		   		else{
		   			response.send("fail");
		   		}
		   		connection.release();
		   	}
		   	else{
		   		response.send("fail");
		   		connection.release();
		   	}
		})
	})
})

app.get("/providerConfirm",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_PK=?",[request.session.US_PK], function (err,data) {
			if(err) console.error('err',err);
		   	if(data!=''){
		   		var id=data[0].US_USER_ID;
		   		if(id.slice(0,6)=="seller"){
		   			response.send("success");
		   		}
		   		else{
		   			response.send("fail");
		   		}
		   		connection.release();
		   	}
		   	else{
		   		response.send("fail");
		   		connection.release();
		   	}
		})
	})
})

app.get("/bringNotice",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM NOTICE_TB;", function (err,data) {
			if(err) console.error('err',err);
		   	response.send(data);
		   	connection.release();
		})
	})
})

app.get("/bringQuestion",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM QUESTION_TB;", function (err,data) {
			if(err) console.error('err',err);
		   	response.send(data);
		   	connection.release();
		})
	})
})

app.get("/bringCounsel",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM COUNSEL_TB;", function (err,data) {
			if(err) console.error('err',err);
		   	response.send(data);
		   	connection.release();
		})
	})
})

app.post("/questionPw",function(request,response){
	var pk=request.body.question;
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM QUESTION_TB where QT_PK="+pk+" and QT_QUESTION_PW='"+request.body.pw+"';", function (err,data) {
			if(err) console.error('err',err);
		   	if(data!=""){
				connection.query("UPDATE QUESTION_TB SET QT_QUESTION_HITS="+(++data[0].QT_QUESTION_HITS)+" where QT_PK="+pk+";", function (err,ignore) {
			   		response.send(data);
			   		connection.release();
		   		})
		   	}
		   	else{
			   	response.end();
			   	connection.release();
		   	}
		})
	})
})

app.post("/bringAnswer",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM ANSWER_TB where AS_QT_FK="+request.body.pk+";", function (err,data) {
			if(err) console.error('err',err);
			if(data!=""){
		   		response.send({data:data,i:request.body.i});
			}
			else{
				response.end();
			}
			connection.release();
		})
	})
})

app.post("/addressAdd",function(request,response){
	var number=request.body.number1+request.body.number2+request.body.number3;
	var phone=request.body.phone1+request.body.phone2+request.body.phone3;
	conn.getConnection(function(err,connection){
		connection.query("INSERT INTO ADDRESS_TB (AD_US_FK,AD_EX,AD_NM,AD_ZIP_NO,AD_AD1,AD_AD2,AD_NO,AD_PHONE_NO,AD_EX_ST) values (?,?,?,?,?,?,?,?,0)",[request.session.US_PK,request.body.ex,request.body.name,request.body.ad0,request.body.ad1,request.body.ad2,number,phone],function (err,data) {
			if(err) console.error('err',err);
			response.redirect(request.get('referer'));
			connection.release();
		})
	})
})

app.post("/addressModify",function(request,response){
	var number=request.body.number1+request.body.number2+request.body.number3;
	var phone=request.body.phone1+request.body.phone2+request.body.phone3;
	conn.getConnection(function(err,connection){
		connection.query("UPDATE ADDRESS_TB SET ? where AD_PK="+request.body.pk,{AD_EX:request.body.ex,AD_NM:request.body.name,AD_ZIP_NO:request.body.ad0,AD_AD1:request.body.ad1,AD_AD2:request.body.ad2,AD_NO:number,AD_PHONE_NO:phone},function (err,data) {
			if(err) console.error('err',err);
			response.redirect(request.get('referer'));
			connection.release();
		})
	})
})

app.post("/address2Modify",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("UPDATE ADDRESS_TB SET ? where AD_PK="+request.body.pk,{AD_EX_ST:0},function (err,data) {
			if(err) console.error('err',err);
			response.end();
		})
	})
})

app.post("/questionAdd",function(request,response){
	var name=sliceSquote(request.body.name);
	var title=request.body.title;
	var pw=request.body.password;
	var ex=sliceSquote(request.body.content);
	conn.getConnection(function(err,connection){
		connection.query("INSERT INTO QUESTION_TB (QT_QUESTION_NM,QT_WRITER_NM,QT_QUESTION_PW,QT_REGDATE_YMD,QT_QUESTION_EX) values (?,?,?,?,?)",[title,name,pw,today(),ex],function (err,data) {
			if(err) console.error('err',err);
		   	response.redirect("/service/faq");
		   	connection.release();
		})
	})
})

app.post("/addAnswer",function(request,response){
	var fk=request.body.fk;
	var ex=sliceSquote(request.body.content);
	conn.getConnection(function(err,connection){
		connection.query("INSERT INTO ANSWER_TB (AS_QT_FK,AS_REGDATE_YMD,AS_ANSWER_EX) values (?,?,?)",[fk,today(),ex],function (err,data) {
			if(err) console.error('err',err);
		   	response.end();
		   	connection.release();
		})
	})
})

app.post("/counselAdd",function(request,response){							//공지사항 추가
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_PK=?",[request.session.US_PK], function (err,data) {
			if(err) console.error('err',err);
		   	if(data!=''){
				var companyHangul=sliceSquote(request.body.companyHangul);
				var businessKind=sliceSquote(request.body.businessKind);
				var companyEnglish=sliceSquote(request.body.companyEnglish);
				var businessForm=sliceSquote(request.body.businessForm);
				var registrationNumber=sliceSquote(request.body.registrationNumber);
				var representative=sliceSquote(request.body.representative);
				var sales=sliceSquote(request.body.sales);
				var establishmentDate=sliceSquote(request.body.establishmentDate);
				var representativeGoods=sliceSquote(request.body.representativeGoods);
				var goods=sliceSquote(request.body.goods);
				var telephone=sliceSquote(request.body.telephone);
				var fax=sliceSquote(request.body.fax);
				var email=sliceSquote(request.body.email);
				var homepage=sliceSquote(request.body.homepage);
				var address=sliceSquote(request.body.address);
				var companyIntroduce=sliceSquote(request.body.companyIntroduce);
				var goodAmount=sliceSquote(request.body.goodAmount);
				var managerName=sliceSquote(request.body.managerName);
				var managerPosition=sliceSquote(request.body.managerPosition);
				var managerTelephone=sliceSquote(request.body.managerTelephone);
				var managerEmail=sliceSquote(request.body.managerEmail);
				
				var values = {CS_US_FK:request.session.US_PK,CS_REGDATE_YMD:today(),CS_HANGUL_NM:companyHangul,CS_ENGLISH_NM:companyEnglish,CS_BUSINESS_KD:businessKind,CS_BUSINESS_FM:businessForm,CS_REGISTRATION_NO:registrationNumber,CS_REPRESENTATIVE_NM:representative,CS_SALES_PR:sales,CS_ESTABLISHMENT_DT:establishmentDate,CS_REPRESENTATIVE_GD:representativeGoods,CS_GOODS_NM:goods,CS_TELEPHONE_NO:telephone,CS_FAX_NO:fax,CS_EMAIL_EM:email,CS_HOMEPAGE_NM:homepage,CS_ADDRESS_AD:address,CS_COMPANY_IT:companyIntroduce,CS_GOOD_AMT:goodAmount,CS_MANAGER_NM:managerName,CS_MANAGER_PS:managerPosition,CS_MANAGER_TP:managerTelephone,CS_MANAGER_EM:managerEmail};
				connection.query("INSERT INTO COUNSEL_TB SET ?",values,function (err,data) {
					if(err) console.error('err',err);
				   	response.redirect("/service/counsel");
				   	connection.release();
				})
			}
			else{
				response.redirect('/login.html?url=/counselAdd.html');
				connection.release();
			}
		})
	})
})

app.post("/counselModify",function(request,response){						//공지사항 수정
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_PK=?",[request.session.US_PK], function (err,data) {
			if(err) console.error('err',err);
		   	if(data!=''){
				var companyHangul=sliceSquote(request.body.companyHangul);
				var businessKind=sliceSquote(request.body.businessKind);
				var companyEnglish=sliceSquote(request.body.companyEnglish);
				var businessForm=sliceSquote(request.body.businessForm);
				var registrationNumber=sliceSquote(request.body.registrationNumber);
				var representative=sliceSquote(request.body.representative);
				var sales=sliceSquote(request.body.sales);
				var establishmentDate=sliceSquote(request.body.establishmentDate);
				var representativeGoods=sliceSquote(request.body.representativeGoods);
				var goods=sliceSquote(request.body.goods);
				var telephone=sliceSquote(request.body.telephone);
				var fax=sliceSquote(request.body.fax);
				var email=sliceSquote(request.body.email);
				var homepage=sliceSquote(request.body.homepage);
				var address=sliceSquote(request.body.address);
				var companyIntroduce=sliceSquote(request.body.companyIntroduce);
				var goodAmount=sliceSquote(request.body.goodAmount);
				var managerName=sliceSquote(request.body.managerName);
				var managerPosition=sliceSquote(request.body.managerPosition);
				var managerTelephone=sliceSquote(request.body.managerTelephone);
				var managerEmail=sliceSquote(request.body.managerEmail);
				
				var values = {CS_US_FK:request.session.US_PK,CS_REGDATE_YMD:today(),CS_HANGUL_NM:companyHangul,CS_ENGLISH_NM:companyEnglish,CS_BUSINESS_KD:businessKind,CS_BUSINESS_FM:businessForm,CS_REGISTRATION_NO:registrationNumber,CS_REPRESENTATIVE_NM:representative,CS_SALES_PR:sales,CS_ESTABLISHMENT_DT:establishmentDate,CS_REPRESENTATIVE_GD:representativeGoods,CS_GOODS_NM:goods,CS_TELEPHONE_NO:telephone,CS_FAX_NO:fax,CS_EMAIL_EM:email,CS_HOMEPAGE_NM:homepage,CS_ADDRESS_AD:address,CS_COMPANY_IT:companyIntroduce,CS_GOOD_AMT:goodAmount,CS_MANAGER_NM:managerName,CS_MANAGER_PS:managerPosition,CS_MANAGER_TP:managerTelephone,CS_MANAGER_EM:managerEmail};
				connection.query("UPDATE COUNSEL_TB SET ? where CS_PK="+request.body.pk,values,function (err,data) {
					if(err) console.error('err',err);
				   	response.redirect("/service/counsel");
				   	connection.release();
				})
			}
			else{
				response.redirect('/login.html?url=/counselInfo.html?counsel='+request.body.pk);
				connection.release();
			}
		})
	})
})

app.post("/deleteCounsel",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("DELETE FROM COUNSEL_TB where CS_PK=?;",[request.body.pk],function(err,data){
			response.end();
			connection.release();
		})
	})
})


app.get("/bringBanner",function(request,response){				
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM BANNER_TB;", function (err,data) {
			if(err) console.error('err',err);
		   	response.send(data);
		   	connection.release();
		})
	})
})

app.post("/bannerAdd",upload.single('file'),function(request,response){
	var tmp_path = request.file.path;
    var target_path = 'public/img/main/'+request.file.filename+'.jpg';

    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);

	conn.getConnection(function(err,connection){
		connection.query("INSERT INTO BANNER_TB (BN_BANNER_IM,BN_REGDATE_YMD,BN_BANNER_LK) values (?,?,?)",['img/main/'+request.file.filename+'.jpg',today(),request.body.link],function (err,data) {
			if(err) console.error('err',err);
		   	response.redirect("/slideBannerList.html");
		   	connection.release();
		})
	})
})

app.post("/existOrder",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM ORDERS_TB WHERE OD_US_FK=? AND OD_GD_FK=?",[request.session.US_PK,request.body.pk], function (err,data) {
			if(err) console.error('err',err);
		   	if(data!=''){
		   		response.send("success");
		   	}
		   	else{
		   		response.send("fail");
		   	}
		   	connection.release();
		})
	})
})

app.post("/searchId",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_USER_NM=? AND US_USER_EM=?",[request.body.name,request.body.email], function (err,data) {
			if(err) console.error('err',err);
			response.send(data);
			connection.release();
		})
	})
})

app.post("/searchId2",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_USER_NM=? AND US_PHONE_NO=?",[request.body.name,request.body.phone], function (err,data) {
			if(err) console.error('err',err);
			response.send(data);
			connection.release();
		})
	})
})

app.post("/searchId_2",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_USER_NM=? AND US_USER_EM=? AND US_USER_ID=?",[request.body.name,request.body.email,request.body.id], function (err,data) {
			if(err) console.error('err',err);
			response.send(data);
			connection.release();
		})
	})
})

app.post("/searchId2_2",function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_USER_NM=? AND US_PHONE_NO=? AND US_USER_ID=?",[request.body.name,request.body.phone,request.body.id], function (err,data) {
			if(err) console.error('err',err);
			response.send(data);
			connection.release();
		})
	})
})

app.post("/reviewRemove",function(request,response){					//구매평 제거
	conn.getConnection(function(err,connection){
		connection.query("DELETE FROM BUY_COMMENTS_TB WHERE BCM_PK=?",[request.body.pk], function (err,data) {
			if(err) console.error('err',err);
			response.end();
			connection.release();
		})
	})
})

app.post('/reviewEnd',upload.single('file'),function (req, res, next) {	 		//구매평 등록
	if(req.file!=undefined){
		var US_PK=req.session.US_PK;
		conn.getConnection(function(err,connection){
			connection.query("select * from USERS_TB where US_PK='"+US_PK+"';",function(err,data){
				if(err) console.error('err',err);
				var goodNum=req.body.GD_PK;
				if(data!=''){
					var comment=sliceSquote2(req.body.review);
					var name=req.body.name;

					var values = {BCM_GD_FK:goodNum,BCM_COMMENT_CT:comment,BCM_COMMENT_YMD:today(),BCM_US_FK:US_PK,BCM_MAIN_IM:'img/comments/'+req.file.filename+'.jpg',BCM_US_NM:name.slice(0,2)+"*"};
					connection.query("INSERT INTO BUY_COMMENTS_TB SET ?",values,function(err,data){
					   	if(err) console.error('err',err);

						var tmp_path = req.file.path;
					    var target_path = 'public/img/comments/'+req.file.filename+'.jpg';

					    var src = fs.createReadStream(tmp_path);
					    var dest = fs.createWriteStream(target_path);
					    src.pipe(dest);

			 		    res.redirect('/itemInfo.html?item='+goodNum);
			 		    connection.release();

					});
				}
				else{
					res.redirect("/login.html?url=/itemInfo.html?item="+goodNum);
					connection.release();
				}
			});
		})
	}
	else{
		var US_PK=req.session.US_PK;
		conn.getConnection(function(err,connection){
			connection.query("select * from USERS_TB where US_PK='"+US_PK+"';",function(err,data){
				if(err) console.error('err',err);
				var goodNum=req.body.GD_PK;
				if(data!=''){
					var comment=sliceSquote2(req.body.review);
					var name=req.body.name;

					var values = {BCM_GD_FK:goodNum,BCM_COMMENT_CT:comment,BCM_COMMENT_YMD:today(),BCM_US_FK:US_PK,BCM_MAIN_IM:'',BCM_US_NM:name.slice(0,2)+"*"};
					connection.query("INSERT INTO BUY_COMMENTS_TB SET ?",values,function(err,data){
			 		    res.redirect('/itemInfo.html?item='+goodNum);
			 		    connection.release();
					});
				}
				else{
					res.redirect("/login.html?url=/itemInfo.html?item="+goodNum);
					connection.release();
				}
			});
		})
	}
});

app.post('/upload',upload.fields([{name:'recfile'},{name:'recfile2'},{name:'recfile3'},{name:'recfile4'},{name:'recfile5'},{name:'recfile6'}]),function (req, res, next) {				//상품등록
	var US_PK=req.session.US_PK;
	conn.getConnection(function(err,connection){
		connection.query("select * from USERS_TB where US_PK='"+US_PK+"';",function(err,data){
			if(err) console.error('err',err);
			if(data!=''){
				connection.query("select * from CATEGORY_TB where CG_CATEGORY_NM='"+req.body.category+"';",function(err,data){
					if(err) console.error('err',err);

					var goodName=sliceSquote(req.body.goodName);
					var goodSubname=sliceSquote(req.body.goodSubname);
					var origin=sliceSquote(req.body.origin);
					var maker=sliceSquote(req.body.maker);
					var goodEx=sliceSquote(req.body.goodEx);
					var returnAddress1=sliceSquote(req.body.returnAddress1);
					var returnAddress2=sliceSquote(req.body.returnAddress2);
					var returnCompany=sliceSquote(req.body.returnCompany);
					var goodRelName=sliceSquote(req.body.relateSubject);
					var mainImArr=[];
					for(var index in req.files){
						mainImArr.push('img/product/'+req.files[index][0].filename+'.jpg');
					}
					var mainImName=mainImArr[0];
					for(var i=1;i<mainImArr.length;i++){
						mainImName+=','+mainImArr[i];
					}
					var values = {GD_CG_FK:data[0].CG_PK,GD_SEL_FK:req.body.provider,GD_GOOD_NM:goodName,GD_GOOD_SNM:goodSubname,GD_CONSUMER_PR:req.body.consumerPrice,GD_SELL_PR:req.body.sellPrice,GD_MAIN_IM:mainImName,GD_GOOD_AMT:req.body.goodAmount,GD_DELIVERY_PR:req.body.deliveryPrice,GD_ORIGIN_NM:origin,GD_MAKER_NM:maker,GD_GOOD_EX:goodEx,GD_RETURN_ZIP_NO:req.body.returnZipcode,GD_RETURN_AD1:returnAddress1,GD_RETURN_AD2:returnAddress2,GD_RETURN_NM:returnCompany,GD_RETURN_PR:req.body.returnDeliveryPrice,GD_REGDATE_YMD:today(),GD_RELATE_GD:req.body.relate,GD_RELATE_NW:req.body.relate2,GD_RELATE_GD_NM:goodRelName};
					connection.query("INSERT INTO GOODS_TB SET ?",values,function(err,data){
					   	if(err) console.error('err',err);

						for(var index in req.files){
							var tmp_path = req.files[index][0].path;
						    var target_path = 'public/img/product/'+req.files[index][0].filename+'.jpg';

						    var src = fs.createReadStream(tmp_path);
						    var dest = fs.createWriteStream(target_path);
						    src.pipe(dest);
						}

		 			    res.redirect('/goodList.html');
		 			    connection.release();

					});
				});
			}
			else{
				res.redirect("/login.html?url=/goodRegist.html");
				connection.release();
			}
		});
	})
});

app.post('/uploadModify',upload.fields([{name:'recfile'},{name:'recfile2'},{name:'recfile3'},{name:'recfile4'},{name:'recfile5'},{name:'recfile6'}]),function (req, res, next) {			//상품 수정
	var US_PK=req.session.US_PK;
	conn.getConnection(function(err,connection){
		connection.query("select * from USERS_TB where US_PK='"+US_PK+"';",function(err,data){
			if(err) console.error('err',err);
			if(data!=''){
				connection.query("select * from CATEGORY_TB where CG_CATEGORY_NM='"+req.body.category+"';",function(err,data){
					if(err) console.error('err',err);
					connection.query("SELECT * FROM GOODS_TB where GD_PK="+req.body.pk+";",function(err,data2){
						var goodState=data2[0].GD_GOOD_ST;
						if(req.body.goodAmount<1){
							goodState=2;
						}
						else{
							if(goodState==2){
								goodState=1;
							}
						}

						var goodName=sliceSquote(req.body.goodName);
						var goodSubname=sliceSquote(req.body.goodSubname);
						var origin=sliceSquote(req.body.origin);
						var maker=sliceSquote(req.body.maker);
						var goodEx=sliceSquote(req.body.goodEx);
						var returnAddress1=sliceSquote(req.body.returnAddress1);
						var returnAddress2=sliceSquote(req.body.returnAddress2);
						var returnCompany=sliceSquote(req.body.returnCompany);
						var goodRelName=sliceSquote(req.body.relateSubject);
						var hiddenMainImageArr=[];
						hiddenMainImageArr.push(req.body.mainImage);
						hiddenMainImageArr.push(req.body.mainImage2);
						hiddenMainImageArr.push(req.body.mainImage3);
						hiddenMainImageArr.push(req.body.mainImage4);
						hiddenMainImageArr.push(req.body.mainImage5);
						if(Object.values(req.files).length!=0){
							var mainImArr=[];
							for(var index in req.files){
								mainImArr.push('img/product/'+req.files[index][0].filename+'.jpg');
							}
							var mainImName='';
							var mainImArrPointer=0;
							for(var i=0;i<5;i++){
								if(hiddenMainImageArr[i]==""){

								}
								else if(hiddenMainImageArr[i]=="change"){
									if(mainImName!=""){
										mainImName+=',';
									}
									mainImName+=mainImArr[mainImArrPointer++];
								}
								else{
									if(mainImName!=""){
										mainImName+=',';
									}
									mainImName+='img/product/'+hiddenMainImageArr[i]+'.jpg';
								}
							}
							var values = {GD_CG_FK:data[0].CG_PK,GD_SEL_FK:req.body.provider,GD_GOOD_NM:goodName,GD_GOOD_SNM:goodSubname,GD_CONSUMER_PR:req.body.consumerPrice,GD_SELL_PR:req.body.sellPrice,GD_MAIN_IM:mainImName,GD_GOOD_AMT:req.body.goodAmount,GD_DELIVERY_PR:req.body.deliveryPrice,GD_ORIGIN_NM:origin,GD_MAKER_NM:maker,GD_GOOD_EX:goodEx,GD_RETURN_ZIP_NO:req.body.returnZipcode,GD_RETURN_AD1:returnAddress1,GD_RETURN_AD2:returnAddress2,GD_RETURN_NM:returnCompany,GD_RETURN_PR:req.body.returnDeliveryPrice,GD_GOOD_ST:goodState,GD_RELATE_GD:req.body.relate,GD_RELATE_NW:req.body.relate2,GD_RELATE_GD_NM:goodRelName};
							connection.query("UPDATE GOODS_TB SET ? where GD_PK="+req.body.pk,values,function(err,data){
							   	if(err) console.error('err',err);

								for(var index in req.files){
									var tmp_path = req.files[index][0].path;
								    var target_path = 'public/img/product/'+req.files[index][0].filename+'.jpg';

								    var src = fs.createReadStream(tmp_path);
								    var dest = fs.createWriteStream(target_path);
								    src.pipe(dest);
								}

				 			    res.redirect('/goodList.html');
				 			    connection.release();

							});
						}
						else{
							var mainImName='';
							for(var i=0;i<5;i++){
								if(hiddenMainImageArr[i]!=""){
									if(mainImName!=""){
										mainImName+=',';
									}
									mainImName+='img/product/'+hiddenMainImageArr[i]+'.jpg';
								}
							}
							var values = {GD_CG_FK:data[0].CG_PK,GD_SEL_FK:req.body.provider,GD_GOOD_NM:goodName,GD_GOOD_SNM:goodSubname,GD_CONSUMER_PR:req.body.consumerPrice,GD_SELL_PR:req.body.sellPrice,GD_MAIN_IM:mainImName,GD_GOOD_AMT:req.body.goodAmount,GD_DELIVERY_PR:req.body.deliveryPrice,GD_ORIGIN_NM:origin,GD_MAKER_NM:maker,GD_GOOD_EX:goodEx,GD_RETURN_ZIP_NO:req.body.returnZipcode,GD_RETURN_AD1:returnAddress1,GD_RETURN_AD2:returnAddress2,GD_RETURN_NM:returnCompany,GD_RETURN_PR:req.body.returnDeliveryPrice,GD_GOOD_ST:goodState,GD_RELATE_GD:req.body.relate,GD_RELATE_NW:req.body.relate2,GD_RELATE_GD_NM:goodRelName};
							connection.query("UPDATE GOODS_TB SET ? where GD_PK="+req.body.pk,values,function(err,data){
							   	if(err) console.error('err',err);
				 			    res.redirect('/goodList.html');
				 			    connection.release();
							});
						}
					})
				});
			}
			else{
				res.redirect('/goodList.html');
				connection.release();
			}
		});
	})
});

app.post('/image',upload.single('file'),function (req, res, next) {
	var tmp_path = req.file.path;
    var target_path = 'public/img/product/'+req.file.filename+'.jpg';

    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);

    res.send('img/product/'+req.file.filename+'.jpg');
});

var server=http.createServer(app).listen(port,function(){
	console.log(`Server Running at http://127.0.0.1:${port}`);
});

////////////////////////////////////////////////////////정현우


app.get('/service/notice/:id',function(request,response){					//ejs를 활용한 공지사항 페이지
	var id = request.param('id');
	fs.readFile(__dirname + '/public/perceive.html', 'utf8', function(error, data){
		response.send(ejs.render(data, {
			id:id,
			kind: "notice"
		}));
	});	
});

app.get('/noticeInfo',function(request,response){					//ejs를 활용한 공지사항 상세 페이지
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM NOTICE_TB WHERE NT_PK=?",[request.param("notice")], function (err,data) {
			if(err) console.error('err',err);
		   	
		   	var date=data[0].NT_REGDATE_YMD;
		   	var notice_title = data[0].NT_NOTICE_NM;
		   	var year = date.slice(0,4);
		   	var month = date.slice(4,6);
		   	var day = date.slice(6,8);
		   	var contents = data[0].NT_NOTICE_EX;

			fs.readFile(__dirname + '/public/notice_info.html', 'utf8', function(error, data){
				response.send(ejs.render(data, {
					notice_title,
					year: year,
					month: month,
					day: day,
					contents: contents
				}));
				connection.release();
			});
		})
	})
})

app.get('/service/home', function(request, response){
	fs.readFile(__dirname + '/public/home.html', 'utf8', function(error, data){
		response.send(ejs.render(data, {
			kind: "home"
		}));
	});	
});

app.get('/service/faq', function(request, response){
	fs.readFile(__dirname + '/public/faq.html', 'utf8', function(error, data){
		response.send(ejs.render(data, {
			kind: "faq"
		}));
	});	
});

app.get('/service/delivery', function(request, response){
	fs.readFile(__dirname + '/public/delivery.html', 'utf8', function(error, data){
		response.send(ejs.render(data, {
			kind: "delivery"
		}));
	});	
});

app.get('/service/exchange', function(request, response){
	fs.readFile(__dirname + '/public/exchange.html', 'utf8', function(error, data){
		response.send(ejs.render(data, {
			kind: "exchange"
		}));
	});	
});

app.get('/service/benefit', function(request, response){
	fs.readFile(__dirname + '/public/benefit.html', 'utf8', function(error, data){
		response.send(ejs.render(data, {
			kind: "benefit"
		}));
	});	
});

app.get('/service/counsel', function(request, response){
	fs.readFile(__dirname + '/public/counsel.html', 'utf8', function(error, data){
		response.send(ejs.render(data, {
			kind: "counsel"
		}));
	});	
});

app.get('/news_list', function(request, response){
	conn.getConnection(function(err,connection){
		connection.query('select * from NEWS_TB;', function(err, data){
			var news;
			if(data == null)
				news = null;
			else
				news = data;

			fs.readFile(__dirname + '/public/news_list.html', 'utf8', function(error, data){
				response.send(ejs.render(data, {
					news: news
				}));
				connection.release();
			});
		});
	})
});

app.get('/bringNews', function(request, response){
	conn.getConnection(function(err,connection){
		connection.query('select * from NEWS_TB where NEWS_ST=1;', function(err, data){
			response.send(data);
			connection.release();
		});
	})
});

app.get('/readNews', function(request, response){
	var num = request.param('news_NO');

	conn.getConnection(function(err,connection){
		connection.query('select * from NEWS_TB where NEWS_PK = ?',[num], function(err, data){
			if(err) console.error('err',err);
			if(data!=""){
				var news=data[0];
				var relateGood=data[0].NEWS_GD.split(',');
				var relateNews=data[0].NEWS_NW.split(',');
				connection.query('select * from GOODS_TB where GD_PK in (?)',[relateGood], function(err, data){
					var goods=data;
					connection.query('select * from NEWS_TB where NEWS_PK in (?)',[relateNews], function(err, data){
						var relateNews=data;
						fs.readFile(__dirname + '/public/readNews.html', 'utf8', function(error, data){
							response.send(ejs.render(data, {
								news: news,
								goods: goods,
								relateNews: relateNews
							}));
							connection.release();
						});
					});
				});
			}
			else{
				response.redirect("/");
				connection.release();
			}
		});
	})
});

app.get('/newsManage', function(request, response){
	conn.getConnection(function(err,connection){
		connection.query('select * from NEWS_TB where NEWS_ST NOT IN (0) ORDER BY NEWS_PK DESC ', function(err, data){
			var news;
			if(data == null)
				news = null;
			else
				news = data;

			fs.readFile(__dirname + '/public/newsManage.html', 'utf8', function(error, data){
				response.send(ejs.render(data, {
					news: news
				}));
				connection.release();
			});
		});
	})
});

app.get('/recommManage', function(request, response){
	conn.getConnection(function(err,connection){
		connection.query('select * from RECOMM_TB', function(err, data){
			var pd = data;
			if(err) console.error('err',err);
			fs.readFile(__dirname + '/public/recommendManage.html', 'utf8', function(error, data){
				response.send(ejs.render(data, {
					pd: pd
				}));
				connection.release();
			});
		});
	})
});

app.post('/deleteNews',function(request,response){
	conn.getConnection(function(err,connection){
		connection.query("update NEWS_TB set NEWS_ST = 0 WHERE NEWS_PK="+request.body.pk+";",function(err,data){
		   	if(err) console.error('err',err);
			response.end();
			connection.release();
		});
	})
})


app.get('/newsModify', function(request, response){
	var num = request.param('news_NO');
	conn.getConnection(function(err,connection){
		connection.query('select * from NEWS_TB where NEWS_PK = ?', [num], function(err, data){
			if(err) console.error('err', err);
			var news=data[0];

			var relateGoods=data[0].NEWS_GD.split(',');
			var relateNews=data[0].NEWS_NW.split(',');
			connection.query('select * from GOODS_TB where GD_PK in (?)', [relateGoods], function(err, data){
				if(err) console.error('err', err);
				var goods=data;
				connection.query('select * from NEWS_TB where NEWS_PK in (?)', [relateNews], function(err, data){
					if(err) console.error('err', err);
					relateNews=data;
					fs.readFile(__dirname + '/public/newsModify.html', 'utf8', function(error, data){
						response.send(ejs.render(data, {
							news: news,
							goods: goods,
							relateNews: relateNews
						}));
						connection.release();
					});
				});
			});
		});
	})
})

app.post('/upload_news',upload.single('file'),function (req, res, next) {
	if(req.file!=undefined){
		var US_PK=req.session.US_PK;
		conn.getConnection(function(err,connection){
			connection.query("select * from USERS_TB where US_PK='"+US_PK+"';",function(err,data){
				if(err) console.error('err',err);
				if(data!=''){
					var newsName=sliceSquote(req.body.newsName);
					var newsCont=sliceSquote(req.body.newsCont);
					var newsRelName=sliceSquote(req.body.relateSubject);

					var values = {NEWS_NM:newsName,NEWS_MAIN_IM:'img/news/'+req.file.filename+'.jpg',
									NEWS_CONT:newsCont,NEWS_REGDATE_YMD:today(),NEWS_GD:req.body.relate,NEWS_GD_NM:newsRelName,NEWS_NW:req.body.relate2};
					connection.query("INSERT INTO NEWS_TB SET ?",values,function(err,data){
						if(err) console.error('err',err);

						var tmp_path = req.file.path;
						var target_path = 'public/img/news/'+req.file.filename+'.jpg';

						var src = fs.createReadStream(tmp_path);
						var dest = fs.createWriteStream(target_path);
						src.pipe(dest);

			 			res.redirect('/newsManage');
			 			connection.release();
					});
				}
				else{
					res.redirect("/login.html?url=/goodRegist.html");
					connection.release();
				}
			});
		})
	}
	else{
		res.redirect("/goodRegist.html");
	}
});


app.post("/noticeAdd",function(request,response){
	var name=sliceSquote(request.body.name);
	var newsCont=sliceSquote(request.body.newsCont);
	
	var values = {NT_NOTICE_NM:name,NT_NOTICE_EX:newsCont,NT_REGDATE_YMD:today()};
	conn.getConnection(function(err,connection){
		connection.query("INSERT INTO NOTICE_TB SET ?",values,function (err,data) {
			if(err) console.error('err',err);
		   	response.redirect("/noticeList.html");
		   	connection.release();
		})
	})
})

app.post("/noticeModify",function(request,response){
	var name=sliceSquote(request.body.name);
	var newsCont=sliceSquote(request.body.newsCont);

	var values = {NT_NOTICE_NM:name,NT_NOTICE_EX:newsCont};
	conn.getConnection(function(err,connection){
		connection.query("UPDATE NOTICE_TB SET ? where NT_PK="+request.body.pk,values,function (err,data) {
			if(err) console.error('err',err);
		   	response.redirect("/noticeList.html");
		   	connection.release();
		})
	})
})

app.post('/upload_story',upload.single('file'),function (req, res, next) {
	if(req.file!=undefined){
		var US_PK=req.session.US_PK;
		conn.getConnection(function(err,connection){
			connection.query("select * from USERS_TB where US_PK='"+US_PK+"';",function(err,data){
				if(err) console.error('err',err);
				if(data!=''){
					if(req.body.fk!=''){
						var values = {ST_NW_FK:req.body.fk,ST_GD_FK:null,ST_STORY_IM:'img/story/'+req.file.filename+'.jpg',ST_NW_NM:req.body.name};
						connection.query('update STORY_TB set ? where ST_PK = '+req.body.pk,values,function(err,data){
							if(err) console.error('err',err);

							var tmp_path = req.file.path;
							var target_path = 'public/img/story/'+req.file.filename+'.jpg';

							var src = fs.createReadStream(tmp_path);
							var dest = fs.createWriteStream(target_path);
							src.pipe(dest);

				 			res.redirect('/mainManage');
				 			connection.release();
						});
					}
					else{
						var values = {ST_NW_FK:null,ST_GD_FK:req.body.fk2,ST_STORY_IM:'img/story/'+req.file.filename+'.jpg',ST_NW_NM:req.body.name};
						connection.query('update STORY_TB set ? where ST_PK = '+req.body.pk,values,function(err,data){
							if(err) console.error('err',err);

							var tmp_path = req.file.path;
							var target_path = 'public/img/story/'+req.file.filename+'.jpg';

							var src = fs.createReadStream(tmp_path);
							var dest = fs.createWriteStream(target_path);
							src.pipe(dest);

				 			res.redirect('/mainManage');
				 			connection.release();
						});
					}
				}
				else{
					res.redirect("/login.html?url=/goodRegist.html");
					connection.release();
				}
			});
		})
	}
	else{
		res.redirect("/goodRegist.html");
	}
});

app.post('/modify_news',upload.single('file'),function (req, res, next) {
	var US_PK=req.session.US_PK;
	conn.getConnection(function(err,connection){
		connection.query("select * from USERS_TB where US_PK='"+US_PK+"';",function(err,data){
			if(err) console.error('err',err);
			if(data!=''){
				var newsNO=req.body.newsPK;
				var newsName=sliceSquote(req.body.newsName);
				var newsCont=sliceSquote(req.body.newsCont);
				var newsRelName=sliceSquote(req.body.relateSubject);

				if(req.file!=undefined){//메인이미지 수정할 때
					var values = {NEWS_NM:newsName,NEWS_MAIN_IM:'img/news/'+req.file.filename+'.jpg',NEWS_CONT:newsCont,NEWS_GD:req.body.relate,NEWS_GD_NM:newsRelName,NEWS_NW:req.body.relate2};
					connection.query("update NEWS_TB set ? WHERE NEWS_PK= "+newsNO,values, function(err, data){
						var tmp_path = req.file.path;
						var target_path = 'public/img/news/'+req.file.filename+'.jpg';

						var src = fs.createReadStream(tmp_path);
						var dest = fs.createWriteStream(target_path);
						src.pipe(dest);

			 			res.redirect('/newsManage');
			 			connection.release();
					});
				}
				else{
					var values = {NEWS_NM:newsName,NEWS_CONT:newsCont,NEWS_GD:req.body.relate,NEWS_GD_NM:newsRelName,NEWS_NW:req.body.relate2};
					connection.query("update NEWS_TB set ? WHERE NEWS_PK="+newsNO,values, function(err, data){

			 			res.redirect('/newsManage');
			 			connection.release();			
					});
				}
			}
			else{
				res.redirect("/login.html?url=/goodRegist.html");
				connection.release();
			}
		});
	});
});

app.post('/news_image',upload.single('file'),function (req, res, next) {
	var tmp_path = req.file.path;
    var target_path = 'public/img/news/'+req.file.filename+'.jpg';

    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);

    res.send('img/news/'+req.file.filename+'.jpg');
});

app.post('/notice_image',upload.single('file'),function (req, res, next) {
	var tmp_path = req.file.path;
    var target_path = 'public/img/notice/'+req.file.filename+'.jpg';

    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);

    res.send('img/notice/'+req.file.filename+'.jpg');
});

app.get('/mainManage', function(request, response){
	conn.getConnection(function(err,connection){
		connection.query('select * from STORY_TB  ORDER BY ST_PK', function(err, data){
			if(err) console.error('err',err);
			var st = data;
			connection.query('select * from RECOMMEND_TB ORDER BY RC_PK', function(err, data){
				if(err) console.error('err',err);
				var rc = data;
				var RC_GD_FK=[0];
				for(var i=0;i<data.length;i++){
					if(data[i].RC_GD_FK!=null){
						RC_GD_FK.push(data[i].RC_GD_FK);
					}
				}
				connection.query('select * from GOODS_TB where GD_PK in (?)',[RC_GD_FK], function(err, data){
					if(err) console.error('err',err);
					var gd=data;
					fs.readFile(__dirname + '/public/mainManage.html', 'utf8', function(error, data){
						response.send(ejs.render(data, {
							st: st,
							rc: rc,
							gd: gd
						}));
						connection.release();
					});
				});
			});
		});
	})
});

app.post('/modifyRecommend', function(request, response){
	fk=request.body.fk;
	if(fk==undefined){
		fk=null;
	}
	conn.getConnection(function(err,connection){
		connection.query('update RECOMMEND_TB set RC_GD_FK = '+fk+' where RC_PK = '+request.body.pk, function(err, data){
			if(err) console.error('err',err);
			response.end();
			connection.release();
		});
	})
});

app.post('/deleteStory', function(request, response){
	conn.getConnection(function(err,connection){
		connection.query('update STORY_TB set ST_NW_FK = null where ST_PK = '+request.body.pk, function(err, data){
			if(err) console.error('err',err);
			response.end();
			connection.release();
		});
	})
});


/////////////////////////////////////////////////////////////////////////서버함수


function numberWithCommas(x){						//숫자에 가격처럼 콤마를 찍어주는 함수
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

function today(){									//오늘 날짜를 가져오는 함수
    var date = new Date();
    var year  = date.getFullYear();
    var month = date.getMonth() + 1; // 0부터 시작하므로 1더함 더함
    var day   = date.getDate();
    if (("" + month).length == 1) { month = "0" + month; }
    if (("" + day).length   == 1) { day   = "0" + day;   }
  
	return("" + year + month + day);
}

function todayTime(){								//오늘 날짜 + 시간 함수
    var date = new Date();
    var year  = date.getFullYear();
    var month = date.getMonth() + 1; // 0부터 시작하므로 1더함 더함
    var day   = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    if (("" + month).length == 1) { month = "0" + month; }
    if (("" + day).length   == 1) { day   = "0" + day;   }
    if (("" + hour).length   == 1) { hour   = "0" + hour;   }
    if (("" + minute).length   == 1) { minute   = "0" + minute;   }
    if (("" + second).length   == 1) { second   = "0" + second;   }
  
	return("" + year + month + day + hour + minute + second);
}

//숫자만 입력 체크 함수
function isNumber(num){
	for(var inx=0;inx<num.length;inx++){
		if(num.charAt(inx)<'0'||num.charAt(inx)>'9'){
			return false;
		}
	}
	return true;
}
// 원하는 문자열 잘라주는 함수
function sliceSquote(str){
	for(var i=0;i<str.length;i++){
		if(str[i]=="'"||str[i]=="\\"){
			str=str.slice(0,i)+str.slice(i+1);
		}
	}
	return str;
}
// 원하는 문자열 잘라주는 함수2
function sliceSquote2(str){
	for(var i=0;i<str.length;i++){
		if(str[i]=="'"||str[i]=="\\"||str[i]=="<"||str[i]==">"){
			str=str.slice(0,i)+str.slice(i+1);
		}
	}
	return str;
}

////////////////////////////////////////////////////////////////////////////서버함수 끝

////////////////////////////////////////////////////////////////////////////하이브리드 앱 시작

// 이미지파일 호스팅 로직 
app.get('/image/:name',function (req,res){     
    var filename = req.params.name;
    fs.exists(__dirname+'/public/img/product/'+filename, function (exists) {
        if (exists) {
            fs.readFile(__dirname+'/public/img/product/'+filename, function (err,data){
                res.send(data);
            });
        } else {
            res.send('file is not exists');
        }
    })
});

app.get('/bringAllItem',function(req,res){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM GOODS_TB where GD_GOOD_ST IN (1) and GD_EXIST_ST NOT IN (0);",function(err,data){
			res.send(data);
			connection.release();
		})
	})
})

app.post('/bringCategoryItem',function(req,res){
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM GOODS_TB where GD_CG_FK=? and GD_GOOD_ST IN (1) and GD_EXIST_ST NOT IN (0);",[req.body.category],function(err,data){
			res.send(data);
			connection.release();
		})
	})
})

app.get('/mobileLogout',function(request,response){
	request.session.destroy(function(err){
		response.end();
	})
})

app.post('/mobileGoCart',function(request,response){
	if(request.session.US_PK){
		conn.getConnection(function(err,connection){
			connection.query("INSERT INTO CARTS_TB (CT_US_FK,CT_GD_FK,CT_GOOD_AMT) values ("+request.session.US_PK+","+request.body.item+","+request.body.amount+");",function(data){
				response.send('success');
				connection.release();
			})
		})
	}
	else{
		response.end();
	}
})

app.get('/mobileBringUser',function(request,response){
	var pk=request.session.US_PK;
	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM USERS_TB WHERE US_PK=?",[pk], function (err,data) {
		   	// if(err) console.error('err',err);
		    if(data!=''){
		    	response.send(data);
		    }
		    else{
		    	response.end();
		    }
		    connection.release();
		});
	})
})

app.post('/mobileBringOrder',function(request,response){
	var us_pk=request.session.US_PK;
	var order=request.body.order;

	conn.getConnection(function(err,connection){
		connection.query("SELECT * FROM ORDERS_TB WHERE OD_ORDER_NO=? AND OD_US_FK="+us_pk,[order], function (err,data) {
			if(err) console.error('err',err);
			if(data!=''){
				connection.query("SELECT * FROM USERS_TB WHERE US_PK=?",[data[0].OD_US_FK], function (err,data2) {
					if(err) console.error('err',err);
					var momentArray=[];
					var flag=0;
					for(var i=0;i<data.length;i++){
						for(var j=0;j<momentArray.length;j++){
							if(momentArray[j]==data[i].OD_GD_FK){
								flag=1;
								break;
							}
						}
						if(flag==0){
							momentArray.push(data[i].OD_GD_FK);
						}
					}
					connection.query("SELECT * FROM GOODS_TB WHERE GD_PK IN (?)",[momentArray], function (err,data3) {
						if(err) console.error('err',err);
						response.send({data:data,data2:data2,data3:data3});
						connection.release();
					})
				})
			}
			else{
				response.end();
				connection.release();
			}
		})
	})
})

///////////////////////////////////하이브리드 앱 끝
