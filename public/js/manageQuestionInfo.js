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
	output+='<div style="padding-top:10px;"><button onclick="deleteQuestionFun(\''+pk+'\')" style="margin-left:5px;">확인</button><button onclick="$( \'#dialog\' ).dialog( \'close\' );" style="margin-left:10px;">취소</button></div>';
	$( "#dialog" ).empty().append(output).dialog( "open" );
}

function deleteQuestionFun(pk){
	$.post("/deleteQuestion",{pk:pk},function(data){
		location.href="/questionList.html";
	})
}

function deleteAsFun(pk){
	var output='';
	output+='<div>답글을 삭제하시겠습니까?</div>';
	output+='<div style="padding-top:10px;"><button onclick="deleteAnswerFun(\''+pk+'\')" style="margin-left:5px;">확인</button><button onclick="$( \'#dialog\' ).dialog( \'close\' );" style="margin-left:10px;">취소</button></div>';
	$( "#dialog" ).empty().append(output).dialog( "open" );
}

function deleteAnswerFun(pk){
	$.post("/deleteAnswer",{pk:pk},function(data){
		location.href="/questionList.html";
	})
}

function addFun(pk){
	$.post("/addAnswer",{fk:pk,content:$("#answerContent").val()},function(data){
		location.reload();
	})
}

function cancelFun(){
	location.href="questionList.html";
}