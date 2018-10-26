$(document).ready(function(){
	$.get('/mobileBringUser',function(user){
		$.get('/bringCounsel',function(data){
			if(data!=''){
				var output='';
				$("#noNotice").remove();
				for(var i=data.length-1;i>=0;i--){
					var date=data[i].CS_REGDATE_YMD;
					output+='<tr class="hover3">';
					output+='	<td style="padding:10px 10px;width: 50px;border-bottom: solid 1px #ddd;">'+(i+1)+'</td>';
					output+='	<td style="padding:10px 10px;border-bottom: solid 1px #ddd;text-align:left;">';
					if(user==""){
						output+='		<a href="/counselInfo.html?counsel='+data[i].CS_PK+'">';
						output+='			입점문의드립니다.';
						output+='		</a>';
					}
					else if(data[i].CS_US_FK==user[0].US_PK){
						output+='		<a href="/counselInfo.html?counsel='+data[i].CS_PK+'">';
						output+='			입점문의드립니다.';
						output+='			<span style="font-weight:bold;color:rgb(102,255,102);">✓</span>';
						output+='		</a>';
					}
					else{
						output+='		<span style="cursor:pointer;" onclick="diffPerson()">';
						output+='			입점문의드립니다.';
						output+='		</span>';
					}
					output+='	</td>';
					output+='	<td style="padding:10px 10px;width: 80px;border-bottom: solid 1px #ddd;">'+date.slice(0,4)+'. '+date.slice(4,6)+'. '+date.slice(6,8)+'.</td>';
					output+='</tr>';
				}
				$("#noticeTb").append(output);
			}
		})
	})
})

function diffPerson(){
	alert("글작성자만 이용가능합니다.");
}