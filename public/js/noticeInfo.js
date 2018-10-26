$(document).ready(function(){	
	$.get('/bringHighCategory',function(data){
		var output='<li><a href="/">HOME</a></li>';
		for(var i=0;i<data.length;i++){
			output+='<li><a href="/category.html?high_num='+data[i].CG_PK+'&view=3">'+data[i].CG_CATEGORY_NM+'</a></li>';
		}
		$('#menu').append(output);
	});
})