$(document).ready(function(){
	$.get("/adminConfirm",function(data){
		if(data=="success"){
			$(document.body).append('<div id="dialog" title="알림" style="font-size:13px;padding-top:20px;" align="center"></div>');
			$( "#dialog" ).dialog({
				autoOpen: false,
				width: 400,
				height: 160,
				modal: true
			});
		}
		else{
			location.href="/login.html?url="+location.href;
		}
	})
})

function deleteFun(pk){
	var output='';
	output+='<div>삭제하시겠습니까?</div>';
	output+='<div style="padding-top:10px;"><button onclick="deleteNoticeFun(\''+pk+'\')" style="margin-left:5px;">확인</button><button onclick="$( \'#dialog\' ).dialog( \'close\' );" style="margin-left:10px;">취소</button></div>';
	$( "#dialog" ).empty().append(output).dialog( "open" );
}

function deleteNoticeFun(pk){
	$.post("/deleteCounsel",{pk:pk},function(data){
		location.href="/counselAdmin.html";
	})
}