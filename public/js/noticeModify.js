$(document).ready(function(){
	$.get("/adminConfirm",function(data){
		if(data=="success"){
			$(document.body).append('<div id="dialog" title="알림" style="font-size:13px;padding-top:20px;" align="center"></div>');
			$( "#dialog" ).dialog({
				autoOpen: false,
				width: 500,
				height: 400,
				modal: true
			});
			$('.summernote').summernote({
				maxWidth:908,
				height: 400,
				callbacks: {
			       	onImageUpload: function(files, editor, welEditable) {
			         	for (var i = files.length - 1; i >= 0; i--) {
			         	  	sendFile(files[0], this);
			         	}
			       	}
			     },
			    lang: 'ko-KR' // default: 'en-US'
			});
			var fileTarget = $('.filebox .upload-hidden');
			fileTarget.on('change', function(){

				if(window.FileReader){
					var filename = $(this)[0].files[0].name;
				} 
				else {
					var filename = $(this).val().split('/').pop().split('\\').pop();
				}
				$(this).siblings('.upload-name').val(filename);
			});
		}
		else{
			location.href="/login.html?url="+location.href;
		}
	})
})

function sendFile(file, el) {
   	var form_data = new FormData();
   	form_data.append('file', file);
   	$.ajax({
     	data: form_data,
     	type: "POST",
     	url: '/notice_image',
     	cache: false,
     	contentType: false,
     	enctype: 'multipart/form-data',
     	processData: false,
     	success: function(url) {
       		$(el).summernote('editor.insertImage', url);
       		$('#imageBoard > ul').append('<li><img src="'+url+'" width="480" height="auto"/></li>');
     	}
   	});
 }

function addFun(){
	if($("#noticeName").val()==""){
		$("#noticeName").focus();
		dialogOpen('기사제목 항목은 필수입니다.');
		return;
	}

 	$('#newsCont').attr('value',$('#newsCont2').val());
	$("#add").submit();
}

function dialogOpen(message){
	$( "#dialog" ).dialog({
		autoOpen: false,
		width: 400,
		height: 160,
		modal: true
	});
	var output='';
	output+='<div>'+message+'</div>';
	output+='<div style="padding-top:10px;"><button onclick=\'$("#dialog").dialog( "close" );\' style="margin-left:5px;">확인</button></div>';
	$( "#dialog" ).empty().append(output).dialog( "open" );
}

function checkNumber2(x)
{
	var str=$(x).val();
	for(var i=0;i<str.length;i++){
		if(str[i]=="<"||str[i]==">"||str[i]=="'"||str[i]=="\""||str[i]=="\\"){
  			alert("<,>,',\",\\ 문자는 입력하실 수 없습니다.");
  			$(x).val("");
  			break;
		}
	}
} 