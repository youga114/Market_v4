function confirmFun(question){
	$.post("/questionPw",{pw:$("#pw").val(),question:question},function(data){
		if(data!=""){
			var date=data[0].QT_REGDATE_YMD;
			var output='';
			output+='<div style="font-size:15px;color: #666;font-weight: bold;border-top: 2px solid #dadada;padding-top:15px;">'+data[0].QT_QUESTION_NM+'</div>';
			output+='<div style="text-align:left;font-size:12px;color:#666;line-height: 1.8;"><em>Date : </em>'+date.slice(0,4)+'-'+date.slice(4,6)+'-'+date.slice(6,8)+'</div>';
			output+='<div style="text-align:left;font-size:12px;color:#666;line-height: 1.8;"><em>Name : </em>'+data[0].QT_WRITER_NM+'</div>';
			output+='<div style="text-align:left;font-size:12px;color:#666;line-height: 1.8;padding-bottom:15px;"><em>Hits : </em>'+data[0].QT_QUESTION_HITS+'</div>';
			output+='<div style="text-align:left;font-size:12px;color:#666;line-height: 1.8;padding: 30px 0 40px 0;border-top:1px solid #eee;border-bottom:1px solid #eee;margin-bottom:50px;">'+data[0].QT_QUESTION_EX+'</div>';

			$("#space").empty().append(output);

			$.post("/bringAnswer",{pk:question},function(data2){
				if(data2!=""){
					var date=data2.data[0].AS_REGDATE_YMD;
					var output='';
					output+='<div style="font-size:15px;color: #666;font-weight: bold;border-top: 2px solid #dadada;padding-top:15px;">Re: '+data[0].QT_QUESTION_NM+'</div>';
					output+='<div style="text-align:left;font-size:12px;color:#666;line-height: 1.8;"><em>Date : </em>'+date.slice(0,4)+'-'+date.slice(4,6)+'-'+date.slice(6,8)+'</div>';
					output+='<div style="text-align:left;font-size:12px;color:#666;line-height: 1.8;padding-bottom:15px;"><em>Name : </em><span style="font-weight:bold;">마을마켓</span></div>';
					output+='<div style="text-align:left;font-size:12px;color:#666;line-height: 1.8;padding: 30px 0 40px 0;border-top:1px solid #eee;border-bottom:1px solid #eee;">'+data2.data[0].AS_ANSWER_EX+'</div>';

					$("#space").append(output);
				}
				var output='<div style="font-size:12px;color:#888;margin-top:60px;text-align:right;"><span style="cursor:pointer;" onclick="deleteFun('+data[0].QT_PK+')">삭제</span> | <span style="cursor:pointer;" onclick="cancelFun()">목록보기</span></div>';
				$("#space").append(output);
			})
		}
		else{
			alert("비밀번호가 틀립니다. 다시 확인해 주세요.");
			location.reload();
		}
	})
}

function cancelFun(){
	location.href="/service/faq";
}

function deleteFun(pk){
	$.post("/deleteQuestion",{pk:pk},function(data){
		location.href="service/faq";
	})
}