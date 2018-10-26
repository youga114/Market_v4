$(document).ready(function(){
	$.get("/login_check",function(data){
		if(data=='good'){
			
		}
		else{
			location.href="/login.html?url="+location.href;
		}
	})
})

function numberWithCommas(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

function cancelOrder(orderNumber){
	$.post("/cancelOrder",{state:0,orderNumber:orderNumber},function(data){
		location.href="/myInfo.html";
	})
}