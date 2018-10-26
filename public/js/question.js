$(document).ready(function(){
	$.get('/bringQuestion',function(data){
		if(data!=''){
			var output='';
			$("#noNotice").remove();
			for(var i=data.length-1;i>=0;i--){
				output+='<tr class="hover3">';
				output+='	<td style="padding:10px 10px;border-bottom: solid 1px #ddd;">'+(i+1)+'</td>';
				output+='	<td style="padding:10px 10px;border-bottom: solid 1px #ddd;text-align:left;"><a href="/questionInfo.html?question='+data[i].QT_PK+'">'+data[i].QT_QUESTION_NM+'</a></td>';
				output+='	<td style="padding:10px 10px;border-bottom: solid 1px #ddd;">'+data[i].QT_WRITER_NM+'</td>';
				output+='</tr>';
				output+='<tr id="answer'+data[i].QT_PK+'" class="hover3">';
				output+='</tr>';
			}
			$("#noticeTb").append(output);

			for(var i=0;i<data.length;i++){
				$.post("/bringAnswer",{pk:data[i].QT_PK,i:i},function(data2){
					if(data2!=""){
						var output='';
						output+='	<td style="padding:10px 10px;border-bottom: solid 1px #ddd;font-weight:bold;">&nbsp;&nbsp;&nbsp;└></td>';
						output+='	<td style="padding:10px 10px;border-bottom: solid 1px #ddd;text-align:left;"><a href="/questionInfo.html?question='+data[data2.i].QT_PK+'">'+data[data2.i].QT_QUESTION_NM+'</a></td>';
						output+='	<td style="padding:10px 10px;border-bottom: solid 1px #ddd;font-weight:bold;">마을마켓</td>';
						$("#answer"+data[data2.i].QT_PK).append(output);
					}
				})
			}
		}
	})
})