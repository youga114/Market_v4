$(document).ready(function(){
	$(document.body).append('<div id="dialog" title="알림" style="font-size:13px;padding-top:20px;" align="center"></div>');
	$( "#dialog" ).dialog({
		autoOpen: false,
		width: 500,
		height: 400,
		modal: true
	});
	$(document.body).append('<div id="dialog_reg" title="등록" style="font-size:13px;padding-top:20px;" align="center"></div>');

	$( "#dialog_reg" ).dialog({
		autoOpen: false,
		width: 800,
		height: 600,
		modal: true
	});

	$.get("/adminConfirm",function(data){
		if(data=="success"){

			var fileTarget = $('.filebox .upload-hidden');
			fileTarget.on('change', function(){
				if(window.FileReader){
					var filename = $(this)[0].files[0].name;
				} 
				else {
					var filename = $(this).val().split('/').pop().split('\\').pop();
				}
				$(this).siblings('.upload-name').val(filename);
				$("#hiddenMainImage"+$(this).attr('id').slice(11)).val("change");
			});

			$( "input[type=radio]" ).on( "click", radioChecked );
		}
		else{
			location.href="/login.html?url="+location.href;
		}
	})
})

function radioChecked(){
	if($( 'input[type=radio]:checked' ).attr('id')=='free'){
		$('#deliveryPrice').attr('type','hidden').attr('value','0');
	}
	else{
		$('#deliveryPrice').attr('type','text').attr('value','');
	}
}

function sendFile(file, el) {
  	var form_data = new FormData();
  	form_data.append('file', file);
  	$.ajax({
    	data: form_data,
    	type: "POST",
    	url: '/image',
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

function clickFun(){
	if($("#goodName").val()==""){
		$("#goodName").focus();
		dialogOpen('상품명 항목은 필수입니다.');
		return;
	}
	if($("#goodSubname").val()==""){
		$("#goodSubname").focus();
		dialogOpen('상품부제목 항목은 필수입니다.');
		return;
	}
	if($("#consumerPrice").val()==""){
		$("#consumerPrice").focus();
		dialogOpen('소비자가 항목은 필수입니다.');
		return;
	}
	if(!isNumber($("#consumerPrice").val())){
		$("#consumerPrice").focus();
		dialogOpen('소비자가 항목은 숫자 이외에는 입력할 수 없습니다.');
		return;
	}
	if($("#sellPrice").val()==""){
		$("#sellPrice").focus();
		dialogOpen('판매가 항목은 필수입니다.');
		return;
	}
	if(!isNumber($("#sellPrice").val())){
		$("#sellPrice").focus();
		dialogOpen('판매가 항목은 숫자 이외에는 입력할 수 없습니다.');
		return;
	}
	if($("#goodAmount").val()==""){
		$("#goodAmount").focus();
		dialogOpen('수량 항목은 필수입니다.');
		return;
	}
	if(!isNumber($("#goodAmount").val())){
		$("#goodAmount").focus();
		dialogOpen('수량 항목은 숫자 이외에는 입력할 수 없습니다.');
		return;
	}
	if(!isNumber($("#deliveryPrice").val())){
		$("#deliveryPrice").focus();
		dialogOpen('배송비 항목은 숫자 이외에는 입력할 수 없습니다.');
		return;
	}
	if($("#returnDeliveryPrice").val()==""){
		$("#returnDeliveryPrice").focus();
		dialogOpen('배송비 항목은 필수입니다.');
		return;
	}
	if(!isNumber($("#returnDeliveryPrice").val())){
		$("#returnDeliveryPrice").focus();
		dialogOpen('배송비 항목은 숫자 이외에는 입력할 수 없습니다.');
		return;
	}
	if($("#provider2").val()==""){
		$("#provider2").focus();
		dialogOpen('공급자 항목은 필수입니다.');
		return;
	}
	if($("#sample6_postcode").val()==""){
		$("#sample6_postcode").focus();
		dialogOpen('반품/교환 주소 항목은 필수입니다.');
		return;
	}
	if(!isNumber($("#sample6_postcode").val())){
		$("#sample6_postcode").focus();
		dialogOpen('우편번호 항목은 숫자 이외에는 입력할 수 없습니다.');
		return;
	}
	var flag=0;
	$(".upload-name").each(function(index,item){
		if($(item).val()!="파일선택"){
			flag=1;
		}
	})
	if(flag==0){
		$("#focusFile").focus();
		dialogOpen('대표이미지는 필수입니다.');
		return;
	}
	$('#goodEx').attr('value',$('#goodEx2').val());
	var dataArr=[];
	$('.relateGood').each(function(index,item){
		dataArr.push($(item).attr("data-index"));
	})
	dataArr=dataArr.join(',');
	$('#relate').attr('value',dataArr);
	dataArr=[];
	$('.relateNews').each(function(index,item){
		dataArr.push($(item).attr("data-index"));
	})
	dataArr=dataArr.join(',');
	$('#relate2').attr('value',dataArr);
	$('#registForm').submit();
}

function bringProviderFun(){
	$( "#dialog" ).dialog({
		autoOpen: false,
		width: 500,
		height: 400,
		modal: true
	});
	var output='';
	output+='<div style="width:100%;height:280px;overflow:cursor;">';
	output+='	<table id="providerTb" style="border-spacing: 0px;width: 400px;">';
	output+='		<tr>';
	output+='			<th style="background-color: #999;padding: 6px 5px 6px 5px;border-top: 1px solid black;border-bottom: 1px solid black;color: white;font-weight: inherit;font-size: 15px;width: 150px;text-align: center;">';
	output+='				공급자명';
	output+='			</th>';
	output+='			<th style="background-color: #999;padding: 6px 5px 6px 5px;border-top: 1px solid black;border-bottom: 1px solid black;color: white;font-weight: inherit;font-size: 15px;width: 150px;text-align: center;">';
	output+='				ID';
	output+='			</th>';
	output+='			<th style="background-color: #999;padding: 6px 5px 6px 5px;border-top: 1px solid black;border-bottom: 1px solid black;color: white;font-weight: inherit;font-size: 15px;width: 100px;text-align: center;">';
	output+='				선택';
	output+='			</th>';
	output+='		</tr>';
	output+='		<tr id="noProvider">';
	output+='			<td colspan="13" style="text-align: center;font-size: 12px;padding: 6px 5px 6px 5px;border-bottom: 1px solid rgb(204,204,204);">등록된 계정이 없습니다.</td>';
	output+='		</tr>';
	output+='	</table>';
	output+='</div>';
	output+='<div style="padding-top:10px;"><button onclick="$( \'#dialog\' ).dialog( \'close\' );" style="margin-left:10px;">취소</button></div>';
	$( "#dialog" ).empty().append(output).dialog( "open" );
	$.get("/sellerList",function(data){
	  	for(var i=0;i<data.length;i++){
	  		$("#noProvider").remove();
	  		var output='';
	  		output+='<tr>';
			output+='	<td id="sellerName'+data[i].SEL_US_FK+'" style="text-align: center;font-size: 12px;padding: 6px 5px 6px 5px;border-bottom: 1px solid rgb(204,204,204);">'+data[i].SEL_SELLER_NM+'</td>';
	  		output+='	<td id="sellerId'+data[i].SEL_US_FK+'" style="text-align: center;font-size: 12px;padding: 6px 5px 6px 5px;border-bottom: 1px solid rgb(204,204,204);"></td>';
	  		output+='	<td style="text-align: center;font-size: 12px;padding: 6px 5px 6px 5px;border-bottom: 1px solid rgb(204,204,204);">';
			output+='		<button onclick="selectSellerFun(\''+data[i].SEL_US_FK+'\',\''+data[i].SEL_PK+'\')">선택하기</button>';
			output+='	</td>';
	  		output+='</tr>';
	  		$("#providerTb").append(output);
	  		$.post("/bringUserId",{pk:data[i].SEL_US_FK},function(data){
	  			$("#sellerId"+data[0].US_PK).append(data[0].US_USER_ID);
	  		})
	  	}
	})
}
function selectSellerFun(x,y){
		$("#provider2").empty().val(document.getElementById("sellerName"+x).childNodes[0].nodeValue+"("+document.getElementById("sellerId"+x).childNodes[0].nodeValue+")");
		$("#provider").empty().val(y);
		$("#dialog").dialog("close");
	}
//숫자만 입력, 길이 체크
function isNumber(num){
	for(var inx=0;inx<num.length;inx++){
		if(num.charAt(inx)<'0'||num.charAt(inx)>'9'){
			return false;
		}
	}
	return true;
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
		if(str[i]=="<"||str[i]==">"||str[i]=="'"||str[i]=='"'||str[i]=="\\"){
  			alert("<,>,',\",\\ 문자는 입력하실 수 없습니다.");
  			$(x).val("");
  			break;
		}
	}
}

function addRecommendDialog(){
	$.get("/bringAllItem",function(data){
		var output='';
		output+='<table style="width:100%;text-align:center;">'
		output+='<tr>';
		output+='	<th style="font-weight: lighter;text-align:inherit;">';
		output+='		No.';
		output+='	</th>';
		output+='	<th style="font-weight: lighter;text-align:inherit;">';
		output+='		이미지';
		output+='	</th>';
		output+='	<th style="font-weight: lighter;text-align:inherit;">';
		output+='		상품명';
		output+='	</th>';
		output+='	<th style="font-weight: lighter;text-align:inherit;">';
		output+='		선택';
		output+='	</th>';
		output+='</tr>';
		var alreadySelect=[];
		$(".relateGood").each(function(index,item){
			alreadySelect.push($(item).attr("data-index"));
		})
		for(var i=0;i<data.length;i++){
			var flag=0;
			for(var j=0;j<alreadySelect.length;j++){
				if(alreadySelect[j]==data[i].NEWS_PK){
					flag=1;
					break;
				}
			}
			output+='<tr>';
			output+='	<td>';
			output+='		'+(data.length-i);
			output+='	</td>';
			output+='	<td>';
			output+='		<img src="'+data[i].GD_MAIN_IM.split(',')[0]+'" width="70px" height="70px;">';
			output+='	</td>';
			output+='	<td style="text-align:left;">';
			output+='		'+data[i].GD_GOOD_NM;
			output+='	</td>';
			output+='	<td>';
			if(flag==0){
				output+='		<div><button data-index="'+data[i].GD_PK+'" style="width:50px;height: 22px;border: 1px solid rgb(36,166,189);color:rgb(36,166,189);background-color: white;font-size: 11px;" onclick=\'selectFun(this)\'>선택</button></div>';
			}
			else{
				output+='		<div><button class="selected" data-index="'+data[i].GD_PK+'" style="width:50px;height: 22px;border: 1px solid rgb(36,166,189);color:white;background-color: rgb(36,166,189);font-size: 11px;" onclick=\'selectFun(this)\'>선택</button></div>';
			}
			output+='	</td>';
			output+='</tr>';
		}
		output+='</table>';
		output+='<div style="margin-top:10px;">';
		output+='<button style="display: inline-block;padding: .5em 1.75em;color: #999;font-size: inherit;line-height: normal;vertical-align: middle;background-color: #fdfdfd;border: 1px solid #ebebeb;border-bottom-color: #e2e2e2;border-radius: .25em;margin-right:10px;" onclick="realteConfirmFun()">확인</button>';
		output+='<button style="display: inline-block;padding: .5em 1.75em;color: #999;font-size: inherit;line-height: normal;vertical-align: middle;background-color: #fdfdfd;border: 1px solid #ebebeb;border-bottom-color: #e2e2e2;border-radius: .25em;" onclick="realteCancelFun()">취소</button>';
		output+='</div>';
		
		$( "#dialog_reg" ).empty().append(output).dialog( "open" );
	})			
}

function addNewsDialog(){
	$.get("/bringNews",function(data){
		var output='';
		output+='<table style="width:100%;text-align:center;">'
		output+='<tr>';
		output+='	<th style="font-weight: lighter;text-align:inherit;">';
		output+='		No.';
		output+='	</th>';
		output+='	<th style="font-weight: lighter;text-align:inherit;">';
		output+='		이미지';
		output+='	</th>';
		output+='	<th style="font-weight: lighter;text-align:inherit;">';
		output+='		기사명';
		output+='	</th>';
		output+='	<th style="font-weight: lighter;text-align:inherit;">';
		output+='		선택';
		output+='	</th>';
		output+='</tr>';
		var alreadySelect=[];
		$(".relateNews").each(function(index,item){
			alreadySelect.push($(item).attr("data-index"));
		})
		for(var i=0;i<data.length;i++){
			var flag=0;
			for(var j=0;j<alreadySelect.length;j++){
				if(alreadySelect[j]==data[i].NEWS_PK){
					flag=1;
					break;
				}
			}
			output+='<tr>';
			output+='	<td>';
			output+='		'+(data.length-i);
			output+='	</td>';
			output+='	<td>';
			output+='		<img src="'+data[i].NEWS_MAIN_IM+'" width="70px" height="70px;">';
			output+='	</td>';
			output+='	<td style="text-align:left;">';
			output+='		'+data[i].NEWS_NM;
			output+='	</td>';
			output+='	<td>';
			if(flag==0){
				output+='		<div><button data-index="'+data[i].NEWS_PK+'" style="width:50px;height: 22px;border: 1px solid rgb(36,166,189);color:rgb(36,166,189);background-color: white;font-size: 11px;" onclick=\'selectFun(this)\'>선택</button></div>';
			}
			else{
				output+='		<div><button class="selected" data-index="'+data[i].NEWS_PK+'" style="width:50px;height: 22px;border: 1px solid rgb(36,166,189);color:white;background-color: rgb(36,166,189);font-size: 11px;" onclick=\'selectFun(this)\'>선택</button></div>';
			}
			output+='	</td>';
			output+='</tr>';
		}
		output+='</table>';
		output+='<div style="margin-top:10px;">';
		output+='<button style="display: inline-block;padding: .5em 1.75em;color: #999;font-size: inherit;line-height: normal;vertical-align: middle;background-color: #fdfdfd;border: 1px solid #ebebeb;border-bottom-color: #e2e2e2;border-radius: .25em;margin-right:10px;" onclick="realteNewsConfirmFun()">확인</button>';
		output+='<button style="display: inline-block;padding: .5em 1.75em;color: #999;font-size: inherit;line-height: normal;vertical-align: middle;background-color: #fdfdfd;border: 1px solid #ebebeb;border-bottom-color: #e2e2e2;border-radius: .25em;" onclick="realteCancelFun()">취소</button>';
		output+='</div>';
		
		$( "#dialog_reg" ).empty().append(output).dialog( "open" );
	})			
}

function selectFun(select){
	if($(select).css('color')=="rgb(36, 166, 189)"){
		$(select).css('color','white').css('background-color','rgb(36,166,189)').addClass("selected");
	}
	else{
		$(select).css('color','rgb(36,166,189)').css('background-color','white').removeClass("selected");
	}
}

function realteConfirmFun(){
	var pk=[];
	$(".selected").each(function(index,item){
		pk.push($(item).attr('data-index'));
	})
	$.post("/goodAmountConfirm",{pk:pk},function(data){
		var output='';
		output+='<tr>';
		output+='	<th style="font-weight: lighter;text-align:inherit;width: 171px;">';
		output+='		이미지';
		output+='	</th>';
		output+='	<th style="font-weight: lighter;text-align:inherit;">';
		output+='		상품명';
		output+='	</th>';
		output+='	<th style="font-weight: lighter;text-align:inherit;width: 123px;">';
		output+='		선택';
		output+='	</th>';
		output+='</tr>';
		for(var i=0;i<data.length;i++){
			output+='<tr id="relateGood'+data[i].GD_PK+'" class="relateGood" data-index="'+data[i].GD_PK+'">';
			output+='	<td>';
			output+='		<img src="'+data[i].GD_MAIN_IM.split(',')[0]+'" width="70px" height="70px;">';
			output+='	</td>';
			output+='	<td style="text-align:left;">';
			output+='		'+data[i].GD_GOOD_NM;
			output+='	</td>';
			output+='	<td>';
			output+='		<div><button data-index="'+data[i].GD_PK+'" style="width:50px;height: 22px;border: 1px solid #ff6969;color:#ff6969;background-color: white;font-size: 11px;" onclick=\'selectDeleteFun("'+data[i].GD_PK+'")\'>삭제</button></div>';
			output+='	</td>';
			output+='</tr>';
		}
		$("#noRelateGoods").hide();
		$("#relateGoods").empty().append(output);

		$( "#dialog_reg" ).dialog("close");
	})
}

function realteNewsConfirmFun(){
	var pk=[];
	$(".selected").each(function(index,item){
		pk.push($(item).attr('data-index'));
	})
	$.post("/newsConfirm",{pk:pk},function(data){
		var output='';
		output+='<tr>';
		output+='	<th style="font-weight: lighter;text-align:inherit;width: 171px;">';
		output+='		이미지';
		output+='	</th>';
		output+='	<th style="font-weight: lighter;text-align:inherit;">';
		output+='		상품명';
		output+='	</th>';
		output+='	<th style="font-weight: lighter;text-align:inherit;width: 123px;">';
		output+='		선택';
		output+='	</th>';
		output+='</tr>';
		for(var i=0;i<data.length;i++){
			output+='<tr id="relateNews'+data[i].NEWS_PK+'" class="relateNews" data-index="'+data[i].NEWS_PK+'">';
			output+='	<td>';
			output+='		<img src="'+data[i].NEWS_MAIN_IM+'" width="70px" height="70px;">';
			output+='	</td>';
			output+='	<td style="text-align:left;">';
			output+='		'+data[i].NEWS_NM;
			output+='	</td>';
			output+='	<td>';
			output+='		<div><button data-index="'+data[i].NEWS_PK+'" style="width:50px;height: 22px;border: 1px solid #ff6969;color:#ff6969;background-color: white;font-size: 11px;" onclick=\'newsSelectDeleteFun("'+data[i].NEWS_PK+'")\'>삭제</button></div>';
			output+='	</td>';
			output+='</tr>';
		}
		$("#noRelateNews").hide();
		$("#relateNews").empty().append(output);

		$( "#dialog_reg" ).dialog("close");
	})
}

function realteCancelFun(){
	$( "#dialog_reg" ).dialog("close");
}

function selectDeleteFun(pk){
	$("#relateGood"+pk).remove();
	if($(".relateGood").length==0){
		$("#noRelateGoods").show();
	}
}

function newsSelectDeleteFun(pk){
	$("#relateNews"+pk).remove();
	if($(".relateNews").length==0){
		$("#noRelateNews").show();
	}
}

function imageDelFun(num){
	$("#upload-name"+num).val("파일선택");
	$("#hiddenMainImage"+num).val("");
	$("#ex_filename"+num).val("");
}