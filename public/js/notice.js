$(document).ready(function(){
	$.get('/bringNotice',function(data){
		if(data!=''){
			var output='';
			$("#noNotice").remove();
			for(var i=data.length-1;i>=0;i--){
				var date=data[i].NT_REGDATE_YMD;
				output+='<tr class="hover3">';
				output+='	<td style="padding:10px 10px;width: 50px;border-bottom: solid 1px #ddd;">'+(i+1)+'</td>';
				output+='	<td style="padding:10px 10px;border-bottom: solid 1px #ddd;text-align:left;"><a href="/noticeInfo.html?notice='+data[i].NT_PK+'">'+data[i].NT_NOTICE_NM+'</a></td>';
				output+='	<td style="padding:10px 10px;width: 80px;border-bottom: solid 1px #ddd;">'+date.slice(0,4)+'. '+date.slice(4,6)+'. '+date.slice(6,8)+'.</td>';
				output+='</tr>';
			}
			$("#noticeTb").append(output);
		}
	})
})