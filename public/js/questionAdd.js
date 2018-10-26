function cancelFun(){
	location.href="/service/faq";
}

function confirmFun(){
	if(document.form.name.value==""){
		alert("이름을 입력하세요");
		document.form.name.focus();
		return;
	}
	if(document.form.password.value==""){
		alert("비밀번호를 입력하세요");
		document.form.password.focus();
		return;
	}
	if(document.form.title.value=="제목을 선택하세요"){
		alert("제목을 선택하세요");
		document.form.title.focus();
		return;
	}
	if(document.form.content.value==""){
		alert("내용을 입력하세요");
		document.form.content.focus();
		return;
	}
	$("#questionAdd").submit();
}