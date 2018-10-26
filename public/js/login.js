
$(document).ready(function(){
    $(window).keypress(function (key) {
        if(key.keyCode == 13){//키가 13이면 실행 (엔터는 13)
        	$("#button").trigger("click");
        }
    });
});


function focusFunction(x){
	$(x).css('color','black').val('');
	if($(x).attr('id')=='password'){
		$(x).attr('type','password');
	}
}
function focusoutFunction(x){
	if($(x).val()==''){
		if($(x).attr('id')=='password'){
			$(x).attr('type','text');
			$(x).css('color','rgb(154,154,154)').val('비밀번호');
		}
		else{
			$(x).css('color','rgb(154,154,154)').val('아이디');
		}
	}
}