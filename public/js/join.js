var idFlag=0;
var idMessage='';

$(document).ready(function(){

	$(document.body).append('<div id="dialog" title="알림" style="font-size:13px;padding-top:20px;" align="center"></div>');
	$( "#dialog" ).dialog({
		autoOpen: false,
		width: 400,
		height: 160,
		modal: true
	});

})

function signupFun(){
	var name=$("#name").val();
	var id=$("#id").val();
	var password=$("#password").val();
	var passwordCheck=$("#passwordCheck").val();
	var email1=$("#email1").val();
	var email2=$("#email2").val();
	var phone1=$("#phone1").val();
	var phone2=$("#phone2").val();
	var phone3=$("#phone3").val();

	if(name==""){
		$("#name").focus();
		dialogOpen('이름 항목은 필수입니다.');
		return;
	}
	if(id==""){
		$("#id").focus();
		dialogOpen('아이디 항목은 필수입니다.');
		return;
	}
	if(id.length<6){
		$("#id").focus();
		dialogOpen('아이디 항목은 최소 6자 이상 입력해 주시기 바랍니다.');
		return;
	}
	if(password==""){
		$("#password").focus();
		dialogOpen('비밀번호 항목은 필수입니다.');
		return;
	}
	if(password.length<6){
		$("#password").focus();
		dialogOpen('비밀번호 항목은 최소 6자 이상 입력해 주시기 바랍니다.');
		return;
	}
	if(passwordCheck==""){
		$("#passwordCheck").focus();
		dialogOpen('비밀번호확인 항목은 필수입니다.');
		return;
	}
	if(passwordCheck.length<6){
		$("#passwordCheck").focus();
		dialogOpen('비밀번호확인 항목은 최소 6자 이상 입력해 주시기 바랍니다.');
		return;
	}
	if(email1==""){
		$("#email1").focus();
		dialogOpen('이메일 항목은 필수입니다.');
		return;
	}
	if(email2==""){
		$("#email2").focus();
		dialogOpen('이메일 항목은 필수입니다.');
		return;
	}
	if(!isEmail(email1+'@'+email2)){
		$("#email1").focus();
		dialogOpen('이메일 항목에 정확한 Email 주소를 입력 해 주시기 바랍니다.');
		return;
	}
	if(phone1==""){
		$("#phone1").focus();
		dialogOpen('휴대폰번호 항목은 필수입니다.');
		return;
	}
	if(phone2==""){
		$("#phone2").focus();
		dialogOpen('휴대폰번호 항목은 필수입니다.');
		return;
	}
	if(phone3==""){
		$("#phone3").focus();
		dialogOpen('휴대폰번호 항목은 필수입니다.');
		return;
	}
	if(!isNumber(phone1)){
		$("#phone1").focus();
		dialogOpen('휴대폰번호 항목은 숫자 이외에는 입력할 수 없습니다.');
		return;
	}
	if(!isNumber(phone2)){
		$("#phone1").focus();
		dialogOpen('휴대폰번호 항목은 숫자 이외에는 입력할 수 없습니다.');
		return;
	}
	if(!isNumber(phone3)){
		$("#phone1").focus();
		dialogOpen('휴대폰번호 항목은 숫자 이외에는 입력할 수 없습니다.');
		return;
	}
	if(idFlag==0){
		$("#id").focus();
		dialogOpen(idMessage);
		return;
	}
	if(!checkPw(password)){
		$("#password").focus();
		dialogOpen('비밀번호는 6~20자 영문 대소문자, 숫자, 특수문자 중 2가지 이상 조합이어야 합니다.');
		return;
	}
	if(password!=passwordCheck){
		$("#passwordCheck").focus();
		dialogOpen('비밀번호 확인이 일치하지 않습니다.');
		return;
	}
	var output='';
	output+='<div>가입 되었습니다.</div>';
	output+='<div style="padding-top:10px;"><button onclick="joinFun()" style="margin-left:5px;">확인</button></div>';
	$( "#dialog" ).empty().append(output).dialog( "open" );
}

function joinFun(){
	var name=$("#name").val();
	var id=$("#id").val();
	var password=$("#password").val();
	var passwordCheck=$("#passwordCheck").val();
	var email1=$("#email1").val();
	var email2=$("#email2").val();
	var phone1=$("#phone1").val();
	var phone2=$("#phone2").val();
	var phone3=$("#phone3").val();
	var sex=$(':radio[name="sex"]:checked').attr('id');
	if(sex==undefined){
		sex='';
	}
	$.post("/newlogin",{id:id,password:password,name:name,phone:phone1+phone2+phone3,email:email1+'@'+email2,regdate:today(),zipcode:$('#sample6_postcode').val(),address1:quotesConfirm($('#sample6_address').val()),address2:quotesConfirm($('#sample6_address2').val()),birth:$("#datepicker").val(),sex:sex},function(data){
		$("#dialog").dialog( "close" );
		window.location="/login.html?url="+preUrl;
	});
}

function dialogOpen(message){
	var output='';
	output+='<div>'+message+'</div>';
	output+='<div style="padding-top:10px;"><button onclick=\'$("#dialog").dialog( "close" );\' style="margin-left:5px;">확인</button></div>';
	$( "#dialog" ).empty().append(output).dialog( "open" );
}

function idFocusoutFun(){
	var id=$("#id").val();
	if(onOnlyAlphaNumber(id)){
		idFlag=0;
		idMessage="사용할 수 없는 아이디 입니다.";
		$("#idFocusout").empty().append("사용할 수 없는 아이디 입니다.");
	}
	else{
		if(id.length<6){
			idFlag=0;
			idMessage="아이디 글자 제한 수를 맞춰주세요.";
			$("#idFocusout").empty().append("아이디 글자 제한 수를 맞춰주세요.");
		}
		else{
			if(id.slice(0,6)=="seller"){
				idFlag=0;
				idMessage="이미 사용중인 아이디입니다.";
				$("#idFocusout").empty().append("이미 사용중인 아이디입니다.");
			}
			else if(id.slice(0,5)=="admin"){
				idFlag=0;
				idMessage="이미 사용중인 아이디입니다.";
				$("#idFocusout").empty().append("이미 사용중인 아이디입니다.");
			}
			else{
				$.post("/idCheck",{id:id},function(data){
					if(data=='success'){
						idFlag=1;
					    $("#idFocusout").empty().append("사용가능한 아이디 입니다.");
					}
					else{
						idFlag=0;
						idMessage="이미 사용중인 아이디입니다.";
					    $("#idFocusout").empty().append("이미 사용중인 아이디입니다.");
					}
				})
			}
		}
	}
	openSpace();
}

function pwFocusoutFun(x){
	var str=$(x).val();
	for(var i=0;i<str.length;i++){
		if(str[i]==" "){
			alert("공백은 입력하실 수 없습니다.");
			$(x).val("");
			break;
		}
	}
	openSpace();
}

function preventFocusFun(){
	preventSpace();
}

//숫자만 입력 받도록
function onlyInputNum(event){
	event=event||window.event;
	var keyID=(event.which)?event.which:event.keyCode;
	if((keyID>=48&&keyID<=57)||(keyID>=96&&keyID<=105)||keyID==9||keyID==8||keyID==37||keyID==38||keyID==39||keyID==40){
		return true;
	}else{
		return false;
	}
}

//금액 표시할 경우 3자리에 자동 콤마
function numberWithCommas(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

//아이디 입력시에 영문 숫자만 쓰도록
function onOnlyAlphaNumber(obj){
	var inText=obj;
	var deny_char=/^[A-Za-z0-9]+$/;

	if(deny_char.test(inText)){
		return false;
	}
	return true;
}

//이름 입력시에 한글 및 영어만 쓰도록
function onOnlyHanEng(obj){
	var inText=obj;
	var deny_char=/^[ㄱ-ㅎ|가-힣|a-z|A-Z|\*]+$/

	if(deny_char.test(inText)){
		return true;
	}
	return false;
}

//이메일 형식이 올바른지 체크
function isEmail(strEmail){
	var pattern = /^([\w]{1,})+[\w\.\-\_]+([\w]{1,})+@(?:[\w\-]{2,}\.)+[a-zA-Z]{2,}$/;
	var bChecked = pattern.test(strEmail);
	return bChecked;
}

//특수문자가 있나 없나 체크
function checkSpecial(str){
	var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
	if(special_pattern.test(str)==true){
		return 0;
	} else{
		return -1;
	}
}

//숫자만 입력, 길이 체크
function isNumber(num){
	for(var inx=0;inx<num.length;inx++){
		if(num.charAt(inx)<'0'||num.charAt(inx)>'9'){
			return false;
		}
	}
	return true;
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

function today(){
    var date = new Date();
    var year  = date.getFullYear();
    var month = date.getMonth() + 1; // 0부터 시작하므로 1더함 더함
    var day   = date.getDate();

    if (("" + month).length == 1) { month = "0" + month; }
    if (("" + day).length   == 1) { day   = "0" + day;   }
  
	return("" + year + month + day);
}

//다음주소 함수
function sample6_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 각 주소의 노출 규칙에 따라 주소를 조합한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var fullAddr = ''; // 최종 주소 변수
            var extraAddr = ''; // 조합형 주소 변수
            // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
            if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                fullAddr = data.roadAddress;
            } else { // 사용자가 지번 주소를 선택했을 경우(J)
                fullAddr = data.jibunAddress;
            }
            // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
            if(data.userSelectedType === 'R'){
                //법정동명이 있을 경우 추가한다.
                if(data.bname !== ''){
                    extraAddr += data.bname;
                }
                // 건물명이 있을 경우 추가한다.
                if(data.buildingName !== ''){
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
            }
            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('sample6_postcode').value = data.zonecode; //5자리 새우편번호 사용
            document.getElementById('sample6_address').value = fullAddr;
            // 커서를 상세주소 필드로 이동한다.
            document.getElementById('sample6_address2').focus();
        }
    }).open();
}

function mailFun(x){
	if($(x).val()!='직접선택'){
		$('#email2').val($(x).val());
	}
	else{
		$('#email2').empty();
	}
}

function quotesConfirm(str){
	for(var i=0;i<str.length;i++){
		if(str[i]=="<"||str[i]==">"||str[i]=="\""||str[i]=="\'"){
			str=str.substr(0,i)+str.substr(i+1);
			i--;
		}
	}
	return str;
}