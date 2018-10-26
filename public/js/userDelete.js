function deleteFun(){
	if($("#agree").prop("checked")){
		$.post("/userDelete",{reason:$(':radio[name="reason"]:checked').val(),content:$("#content").val()},function(data){
			alert("회원탈퇴 되었습니다.");
			location.href="/";
		})
	}
	else{
		alert("정보 삭제에 동의해 주십시오.");
	}
}