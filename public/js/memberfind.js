$(document).ready(function(){

	$(document.body).append('<div id="dialog" title="알림" style="font-size:13px;padding-top:20px;" align="center"></div>');
	$( "#dialog" ).dialog({
		autoOpen: false,
		width: 400,
		height: 200,
		modal: true
	});

})


function phoneSearchFun(){
	$("#phone1").show();
	$("#phone2").show();
	$("#email1").hide();
	$("#email2").hide();
}

function phoneSearchFun2(){
	$("#phone1_2").show();
	$("#phone2_2").show();
	$("#email1_2").hide();
	$("#email2_2").hide();
}

function emailSearchFun(){
	$("#phone1").hide();
	$("#phone2").hide();
	$("#email1").show();
	$("#email2").show();
}

function emailSearchFun2(){
	$("#phone1_2").hide();
	$("#phone2_2").hide();
	$("#email1_2").show();
	$("#email2_2").show();
}

function searchIdFun(){
	if($('input:radio[value=email]').is(':checked')==true){
		var name=$("#name").val();
		var email=$("#email2").val();
		if(name==""){
			alert("이름을 입력하세요.");
			$("#name").focus();
			return;
		}
		if(email==""){
			alert("이메일을 입력하세요.");
			$("#email2").focus();
			return;
		}
		if(!isEmail(email)){
			$("#email2").focus();
			dialogOpen('이메일 항목에 정확한 Email 주소를 입력 해 주시기 바랍니다.');
			return;
		}
		$.post("/searchId",{name:name,email:email},function(data){
			if(data==""){
				var output='';
				output+='<div>일치하는 정보가 없습니다.</div>';
				output+='<div>아이디 찾기 방법을 변경하거나 회원가입을 해 주세요.</div>';
				output+='<div style="padding-top:10px;"><button onclick=\'$("#dialog").dialog( "close" );\' style="margin-left:5px;">확인</button></div>';
				$( "#dialog" ).empty().append(output).dialog( "open" );
			}
			else{
				var id=data[0].US_USER_ID;
				var output='';
				output+='<div>회원님의 아이디는 '+id.slice(0,id.length-3)+'***입니다.</div>';
				output+='<div style="padding-top:10px;"><button onclick=\'$("#dialog").dialog( "close" );\' style="margin-left:5px;">확인</button></div>';
				$( "#dialog" ).empty().append(output).dialog( "open" );
			}
			$("#name").val("");
			$("#email2").val("");
		})
	}
	else{
		var name=$("#name").val();
		var phone=$("#cellphone1").val()+$("#cellphone2").val()+$("#cellphone3").val();
		if(name==""){
			alert("이름을 입력하세요.");
			$("#name").focus();
			return;
		}
		if(phone==""){
			alert("휴대폰 번호를 입력하세요.");
			$("#cellphone1").focus();
			return;
		}
		$.post("/searchId2",{name:name,phone:phone},function(data){
			if(data==""){
				var output='';
				output+='<div>일치하는 정보가 없습니다.</div>';
				output+='<div>아이디 찾기 방법을 변경하거나 회원가입을 해 주세요.</div>';
				output+='<div style="padding-top:10px;"><button onclick=\'$("#dialog").dialog( "close" );\' style="margin-left:5px;">확인</button></div>';
				$( "#dialog" ).empty().append(output).dialog( "open" );
			}
			else{
				var id=data[0].US_USER_ID;
				var output='';
				output+='<div>회원님의 아이디는 '+id.slice(0,id.length-3)+'***입니다.</div>';
				output+='<div style="padding-top:10px;"><button onclick=\'$("#dialog").dialog( "close" );\' style="margin-left:5px;">확인</button></div>';
				$( "#dialog" ).empty().append(output).dialog( "open" );
			}
			$("#name").val("");
			$("#cellphone1").val("");
			$("#cellphone2").val("");
			$("#cellphone3").val("");
		})
	}
}

function searchIdFun2(){
	if($('input:radio[value=email_2]').is(':checked')==true){
		var name=$("#name_2").val();
		var id=$("#id_2").val();
		var email=$("#email2_2").val();
		if(name==""){
			alert("이름을 입력하세요.");
			$("#name_2").focus();
			return;
		}
		if(id==""){
			alert("아이디를 입력하세요.");
			$("#id_2").focus();
			return;
		}
		if(email==""){
			alert("이메일을 입력하세요.");
			$("#email2_2").focus();
			return;
		}
		if(!isEmail(email)){
			$("#email2_2").focus();
			dialogOpen('이메일 항목에 정확한 Email 주소를 입력 해 주시기 바랍니다.');
			return;
		}
		$.post("/searchId_2",{name:name,email:email,id:id},function(data){
			if(data==""){
				var output='';
				output+='<div>일치하는 정보가 없습니다.</div>';
				output+='<div>비밀번호 찾기 방법을 변경하거나 회원가입을 해 주세요.</div>';
				output+='<div style="padding-top:10px;"><button onclick=\'$("#dialog").dialog( "close" );\' style="margin-left:5px;">확인</button></div>';
				$( "#dialog" ).empty().append(output).dialog( "open" );
			}
			else{
				var output='';
				output+='<div>변경하실 비밀번호를 입력해주세요.</div>';
				output+='<div style="margin-top:5px;">새 비밀번호 <input type="password" id="pw1" maxlength="20" onfocus="preventFocusFun()" onfocusout="pwFocusoutFun()"></div>';
				output+='<div style="margin-top:5px;">새 비밀번호 확인 <input type="password" id="pw2" maxlength="20" onfocus="preventFocusFun()" onfocusout="pwFocusoutFun()"></div>';
				output+='<div style="padding-top:10px;"><button onclick="modifyPwFun(\''+data[0].US_PK+'\')" style="margin-left:5px;">확인</button><button onclick="$( \'#dialog\' ).dialog( \'close\' );" style="margin-left:10px;">취소</button></div>';
				$( "#dialog" ).empty().append(output).dialog( "open" );
			}
			$("#name_2").val("");
			$("#id_2").val("");
			$("#email2_2").val("");
		})
	}
	else{
		var name=$("#name_2").val();
		var id=$("#id_2").val();
		var phone=$("#cellphone1_2").val()+$("#cellphone2_2").val()+$("#cellphone3_2").val();
		if(name==""){
			alert("이름을 입력하세요.");
			$("#name_2").focus();
			return;
		}
		if(id==""){
			alert("아이디를 입력하세요.");
			$("#id_2").focus();
			return;
		}
		if(phone==""){
			alert("휴대폰 번호를 입력하세요.");
			$("#cellphone1_2").focus();
			return;
		}
		$.post("/searchId2_2",{name:name,phone:phone,id:id},function(data){
			if(data==""){
				var output='';
				output+='<div>일치하는 정보가 없습니다.</div>';
				output+='<div>아이디 찾기 방법을 변경하거나 회원가입을 해 주세요.</div>';
				output+='<div style="padding-top:10px;"><button onclick=\'$("#dialog").dialog( "close" );\' style="margin-left:5px;">확인</button></div>';
				$( "#dialog" ).empty().append(output).dialog( "open" );
			}
			else{
				var output='';
				output+='<div>변경하실 비밀번호를 입력해주세요.</div>';
				output+='<div style="margin-top:5px;">새 비밀번호 <input type="password" id="pw1" maxlength="20" onfocus="preventFocusFun()" onfocusout="pwFocusoutFun()"></div>';
				output+='<div style="margin-top:5px;">새 비밀번호 확인 <input type="password" id="pw2" maxlength="20" onfocus="preventFocusFun()" onfocusout="pwFocusoutFun()"></div>';
				output+='<div style="padding-top:10px;"><button onclick="modifyPwFun(\''+data[0].US_PK+'\')" style="margin-left:5px;">확인</button><button onclick="$( \'#dialog\' ).dialog( \'close\' );" style="margin-left:10px;">취소</button></div>';
				$( "#dialog" ).empty().append(output).dialog( "open" );
			}
			$("#name_2").val("");
			$("#id_2").val("");
			$("#cellphone1_2").val("");
			$("#cellphone2_2").val("");
			$("#cellphone3_2").val("");
		})
	}
}

//이메일 형식이 올바른지 체크
function isEmail(strEmail){
	var pattern = /^([\w]{1,})+[\w\.\-\_]+([\w]{1,})+@(?:[\w\-]{2,}\.)+[a-zA-Z]{2,}$/;
	var bChecked = pattern.test(strEmail);
	return bChecked;
}

function dialogOpen(message){
	var output='';
	output+='<div>'+message+'</div>';
	output+='<div style="padding-top:10px;"><button onclick=\'$("#dialog").dialog( "close" );\' style="margin-left:5px;">확인</button></div>';
	$( "#dialog" ).empty().append(output).dialog( "open" );
}


function modifyPwFun(pk){
	var password=$("#pw1").val();
	var password2=$("#pw2").val();
	if(password==""){
		$("#pw1").focus();
		alert('비밀번호 항목은 필수입니다.');
		return;
	}
	if(password.length<6){
		$("#pw1").focus();
		alert('비밀번호 항목은 최소 6자 이상 입력해 주시기 바랍니다.');
		return;
	}
	if(!checkPw(password)){
		$("#pw1").focus();
		alert('비밀번호는 6~20자 영문 대소문자, 숫자, 특수문자 중 2가지 이상 조합이어야 합니다.');
		return;
	}
	if(password!=password2){
		$("#pw2").focus();
		alert('비밀번호가 일치하지 않습니다.');
		return;
	}
	$.post("/modifyPw",{pk:pk,password:password},function(data){
		alert("비밀변호가 변경되었습니다.");
		location.href="/login.html";
	})
}

function preventFocusFun(){
	preventSpace();
}

function pwFocusoutFun(){
	openSpace();
}
function preventSpace(){
	window.onkeydown = function() {
		var kcode = event.keyCode;
		if(kcode == 32) event.returnValue = false;
	}
}
function openSpace(){
	window.onkeydown = function() {
		var kcode = event.keyCode;
		if(kcode == 32) event.returnValue = true;
	}
}
//비밀 번호 체크 숫자/영문
function checkPw(pw){
	// var pw="";
	// if(n==1){
	// 	pw=$("#mb_password").val();
	// } else {
	// 	pw = $("#mb_password2").val();
	// }

	var chk_num=pw.search(/[0-9]/g);	//숫자
	var chk_eng=pw.search(/[a-zA-Z]/ig);	//영문
	//var chk_sp=checkSpecial(pw);	//특수문자

	// if(pw.length<6){
	// 	return false;
	// }

	if(chk_num==-1||chk_eng==-1){
		return false;
	}

	return true;
}