function cancelFun(){
	location.href="/service/counsel";
}

function confirmFun(){
	$("#counselModify").submit();
}

function deleteFun(pk){
	$.post("/deleteCounsel",{pk:pk},function(){
		location.href="/service/counsel";
	})
}