function agreeFun(){
	if($(':radio[name="memberAgree"]:checked').val()!="agree"){
		alert("이용약관에 동의하셔야합니다.");
		$("#memberAgree").focus();
		return;
	}
	if($(':radio[name="memberInfoAgree"]:checked').val()!="agree"){
		alert("개인정보취급방침에 동의하셔야합니다.");
		$("#memberInfoAgree").focus();
		return;
	}
	location.href="/join.html?url="+preUrl;
}