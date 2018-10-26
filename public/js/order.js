var IMP = window.IMP;

$(document).ready(function(){
	IMP.init('imp18380944');

	$(document.body).append('<div id="dialog" title="알림" style="font-size:13px;padding-top:20px;" align="center"></div>');
	$( "#dialog" ).dialog({
		autoOpen: false,
		width: 400,
		height: 160,
		modal: true
	});
})

function sameFun(x){
	if($(x).prop('checked')==false){
		$("#receiver").val("");
		$("#receiverPhone1").val("");
		$("#receiverPhone2").val("");
		$("#receiverPhone3").val("");
		$("#receiverZipPhone1").val("");
		$("#receiverZipPhone2").val("");
		$("#receiverZipPhone3").val("");
	}
	else{
		$("#receiver").val($("#buyer").val());
		$("#receiverPhone1").val($("#buyerPhone1").val());
		$("#receiverPhone2").val($("#buyerPhone2").val());
		$("#receiverPhone3").val($("#buyerPhone3").val());
		$("#receiverZipPhone1").val($("#buyerZipPhone1").val());
		$("#receiverZipPhone2").val($("#buyerZipPhone2").val());
		$("#receiverZipPhone3").val($("#buyerZipPhone3").val());
	}
}

function memberInfoFun(x){
	if($(x).prop('checked')==true){
		$.get("/bringMyUserData",function(data){
			var momentPhone=data.US_PHONE_NO;
			$("#receiver").val(data.US_USER_NM);
			$("#receiverPhone1").val(momentPhone.slice(0,3));
			$("#receiverPhone2").val(momentPhone.slice(3,7));
			$("#receiverPhone3").val(momentPhone.slice(7,11));
			$("#sample6_postcode").val(data.US_ZIP_NO);
			$("#sample6_address").val(data.US_USER_AD1);
			$("#sample6_address2").val(data.US_USER_AD2);
		})
	}
}

function newInfoFun(x){
	if($(x).prop('checked')==true){
		$("#receiver").val("");
		$("#receiverPhone1").val("");
		$("#receiverPhone2").val("");
		$("#receiverPhone3").val("");
		$("#sample6_postcode").val("");
		$("#sample6_address").val("");
		$("#sample6_address2").val("");
	}
}

function secretCardFun(){
	$("#notBank").empty();
	$("#depositBank").empty();
	// $("#receipt").empty().append("카드매출전표(또는 휴대폰결제전표)로 대체합니다.");
}

function notBankFun() {
	var output='';
	output+='<td></td>';
	output+='<td style="padding-top: 5px;">·입금자명<input id="depositName" type="text" name="" style="width: 100px;margin-left: 10px;"></td>';
	$("#notBank").append(output);

	var output='';
	output+='<td></td>';
	output+='<td style="padding-top: 5px;">·입금은행<select style="width: 200px;margin-left: 10px;"><option checked>국민은행 04-390204-224858 예금주:김유준</option></select></td>';
	$("#depositBank").append(output);

	// var output='';
	// output+='<label style="cursor: pointer;"><input type="radio" name="doc" checked>발급안함</label>';
	// output+='<label style="cursor: pointer;"><input type="radio" name="doc">현금영수증</label>';
	// output+='<label style="cursor: pointer;"><input type="radio" name="doc">세금계산서</label>';
	// $("#receipt").empty().append(output);
}

function timeGoFun(){
	$("#notBank").empty();
	$("#depositBank").empty();

	// var output='';
	// output+='<label style="cursor: pointer;"><input type="radio" name="doc" checked>발급안함</label>';
	// output+='<label style="cursor: pointer;"><input type="radio" name="doc">현금영수증</label>';
	// output+='<label style="cursor: pointer;"><input type="radio" name="doc">세금계산서</label>';
	// $("#receipt").empty().append(output);
}

function orderFun(){
	if($("#buyer").val()==''){
		$("#buyer").focus();
		dialogOpen('주문자 항목은 필수입니다.');
		return;
	}
	if($("#buyerPhone1").val()==''){
		$("#buyerPhone1").focus();
		dialogOpen('주문자 휴대폰 항목은 필수입니다.');
		return;
	}
	if($("#buyerPhone2").val()==''){
		$("#buyerPhone2").focus();
		dialogOpen('주문자 휴대폰 항목은 필수입니다.');
		return;
	}
	if($("#buyerPhone3").val()==''){
		$("#buyerPhone3").focus();
		dialogOpen('주문자 휴대폰 항목은 필수입니다.');
		return;
	}
	if($("#buyerEmail").val()==''){
		$("#buyerEmail").focus();
		dialogOpen('주문자 이메일 항목은 필수입니다.');
		return;
	}
	if(!isEmail($("#buyerEmail").val())){
		$("#buyerEmail").focus();
		dialogOpen('이메일 항목에 정확한 Email 주소를 입력 해 주시기 바랍니다.');
		return;
	}
	if($("#sample6_postcode").val()==''){
		$("#sample6_postcode").focus();
		dialogOpen('우편번호 항목은 필수입니다.');
		return;
	}
	if(!isNumber($("#sample6_postcode").val())){
		$("#sample6_postcode").focus();
		dialogOpen('우편번호 항목은 숫자 이외에는 입력할 수 없습니다.');
		return;
	}
	if($("#sample6_address").val()==''){
		$("#sample6_address").focus();
		dialogOpen('주소 항목은 필수입니다.');
		return;
	}
	if($("#receiver").val()==''){
		$("#receiver").focus();
		dialogOpen('받는 분 항목은 필수입니다.');
		return;
	}
	if($("#receiverPhone1").val()==''){
		$("#receiverPhone1").focus();
		dialogOpen('받는분 휴대폰 항목은 필수입니다.');
		return;
	}
	if($("#receiverPhone2").val()==''){
		$("#receiverPhone2").focus();
		dialogOpen('받는분 휴대폰 항목은 필수입니다.');
		return;
	}
	if($("#receiverPhone3").val()==''){
		$("#receiverPhone3").focus();
		dialogOpen('받는분 휴대폰 항목은 필수입니다.');
		return;
	}
	if(!isNumber($("#receiverZipPhone1").val())){
		$("#receiverZipPhone1").focus();
		dialogOpen('전화번호 항목은 숫자 이외에는 입력할 수 없습니다.');
		return;
	}
	if(!isNumber($("#receiverZipPhone2").val())){
		$("#receiverZipPhone2").focus();
		dialogOpen('전화번호 항목은 숫자 이외에는 입력할 수 없습니다.');
		return;
	}
	if(!isNumber($("#receiverZipPhone3").val())){
		$("#rreceiverZipPhone3").focus();
		dialogOpen('전화번호 항목은 숫자 이외에는 입력할 수 없습니다.');
		return;
	}
	if(!isNumber($("#receiverPhone1").val())){
		$("#receiverPhone1").focus();
		dialogOpen('휴대폰번호 항목은 숫자 이외에는 입력할 수 없습니다.');
		return;
	}
	if(!isNumber($("#receiverPhone2").val())){
		$("#receiverPhone2").focus();
		dialogOpen('휴대폰번호 항목은 숫자 이외에는 입력할 수 없습니다.');
		return;
	}
	if(!isNumber($("#receiverPhone3").val())){
		$("#receiverPhone3").focus();
		dialogOpen('휴대폰번호 항목은 숫자 이외에는 입력할 수 없습니다.');
		return;
	}
	if($(':radio[name="buyMethod"]:checked').attr("id")=="buyMethod1"){
		if($("#depositName").val()==''){
			$("#depositName").focus();
			dialogOpen('입금자 항목은 필수입니다.');
			return;
		}
	};

	var US_PK;
	$.get("/bringOrderUs",function(data){
		if(data!="fail"){
			US_PK=data;
			$.post("/removeAmt",{itemNumArr:itemNumArr,itemAmountArr:itemAmountArr},function(data){
				if(data==''){
					if(finalPrice>0){
						var orderState=1;
						var depositYMD='';
					}
					else{
						var orderState=2;
						var depositYMD=todayTime();
					}
					var depositMTD="무통장";
					var orderNum=todayTime();
					var depositName=$("#depositName").val();
					if(depositName==undefined){
						depositName="";
					}
					if($(':radio[name="buyMethod"]:checked').attr("id")=="buyMethod1"){
						$.post("/orderGo",{
							US_PK:US_PK,
							itemNumArr:itemNumArr,
							itemAmountArr:itemAmountArr,
							orderNumber:orderNum,
							receiver:quotesConfirm($("#receiver").val()),
							receiverZipcode:$("#sample6_postcode").val(),
							receiverAddress1:quotesConfirm($("#sample6_address").val()),
							receiverAddress2:quotesConfirm($("#sample6_address2").val()),
							receiverPhoneNum:$("#receiverPhone1").val()+$("#receiverPhone2").val()+$("#receiverPhone3").val(),
							receiverMessage:quotesConfirm($("#receiverMessage").val()),
							orderState:orderState,
							depositName:quotesConfirm(depositName),
							depositYMD:depositYMD,
							receiverNo1:$("#receiverZipPhone1").val()+$("#receiverZipPhone2").val()+$("#receiverZipPhone3").val(),
							depositMTD:depositMTD,
							receiverEmail:$("#buyerEmail").val(),
							depositPrice:finalPrice,
							buyerName:quotesConfirm($("#buyer").val()),
							buyerPhone:$("#buyerPhone1").val()+$("#buyerPhone2").val()+$("#buyerPhone3").val(),
							mileage:useMileage
						},function(data){
							location.href="/orderComplete.html?order="+orderNum;
						})
					}
					else if($(':radio[name="buyMethod"]:checked').attr("id")=="buyMethod2"){
						orderState=2;
						depositYMD=todayTime();
						depositMTD="신용카드";
						if(finalPrice>0){
							IMP.request_pay({
							    pg : 'inicis', // version 1.1.0부터 지원.
							    pay_method : 'card',
							    merchant_uid : 'merchant_' + new Date().getTime(),
							    name : '주문명:결제테스트',
							    amount : finalPrice,
							    buyer_email : $("#buyerEmail").val(),
							    buyer_name : quotesConfirm($("#buyer").val()),
							    buyer_tel : $("#buyerPhone1").val()+$("#buyerPhone2").val()+$("#buyerPhone3").val(),
							    buyer_addr : quotesConfirm($("#sample6_address").val()),
							    buyer_postcode : $("#sample6_postcode").val(),
							    m_redirect_url : 'https://www.yourdomain.com/payments/complete'
							}, function(rsp) {
							    if ( rsp.success ) {
									$.post("/orderGo",{
										US_PK:US_PK,
										itemNumArr:itemNumArr,
										itemAmountArr:itemAmountArr,
										orderNumber:orderNum,
										receiver:quotesConfirm($("#receiver").val()),
										receiverZipcode:$("#sample6_postcode").val(),
										receiverAddress1:quotesConfirm($("#sample6_address").val()),
										receiverAddress2:quotesConfirm($("#sample6_address2").val()),
										receiverPhoneNum:$("#receiverPhone1").val()+$("#receiverPhone2").val()+$("#receiverPhone3").val(),
										receiverMessage:quotesConfirm($("#receiverMessage").val()),
										orderState:orderState,
										depositName:quotesConfirm(depositName),
										depositYMD:depositYMD,
										receiverNo1:$("#receiverZipPhone1").val()+"-"+$("#receiverZipPhone2").val()+"-"+$("#receiverZipPhone3").val(),
										depositMTD:depositMTD,
										receiverEmail:$("#buyerEmail").val(),
										depositPrice:finalPrice,
										buyerName:quotesConfirm($("#buyer").val()),
										buyerPhone:$("#buyerPhone1").val()+$("#buyerPhone2").val()+$("#buyerPhone3").val(),
										mileage:useMileage
									},function(data){
								        var msg = '결제가 완료되었습니다.';
								        // msg += '고유ID : ' + rsp.imp_uid;
								        // msg += '상점 거래ID : ' + rsp.merchant_uid;
								        // msg += '결제 금액 : ' + rsp.paid_amount;
								        // msg += '카드 승인번호 : ' + rsp.apply_num;
								    	alert(msg);
										location.href="/orderComplete.html?order="+orderNum;
									})
							    } else {
									$.post("/addAmt",{itemNumArr:itemNumArr,itemAmountArr:itemAmountArr},function(data){
								        var msg = '결제에 실패하였습니다.';
								        // msg += '에러내용 : ' + rsp.error_msg;
								    	alert(msg);
										location.href=location.href;
									})
							    }
							});
						}
						else{
							$.post("/orderGo",{
								US_PK:US_PK,
								itemNumArr:itemNumArr,
								itemAmountArr:itemAmountArr,
								orderNumber:orderNum,
								receiver:quotesConfirm($("#receiver").val()),
								receiverZipcode:$("#sample6_postcode").val(),
								receiverAddress1:quotesConfirm($("#sample6_address").val()),
								receiverAddress2:quotesConfirm($("#sample6_address2").val()),
								receiverPhoneNum:$("#receiverPhone1").val()+$("#receiverPhone2").val()+$("#receiverPhone3").val(),
								receiverMessage:quotesConfirm($("#receiverMessage").val()),
								orderState:orderState,
								depositName:quotesConfirm(depositName),
								depositYMD:depositYMD,
								receiverNo1:$("#receiverZipPhone1").val()+"-"+$("#receiverZipPhone2").val()+"-"+$("#receiverZipPhone3").val(),
								depositMTD:depositMTD,
								receiverEmail:$("#buyerEmail").val(),
								depositPrice:finalPrice,
								buyerName:quotesConfirm($("#buyer").val()),
								buyerPhone:$("#buyerPhone1").val()+$("#buyerPhone2").val()+$("#buyerPhone3").val(),
								mileage:useMileage
							},function(data){
								location.href="/orderComplete.html?order="+orderNum;
							})
						}
					}
					else if($(':radio[name="buyMethod"]:checked').attr("id")=="buyMethod3"){
						orderState=2;
						depositYMD=todayTime();
						depositMTD="실시간계좌이체";
						if(finalPrice>0){
							IMP.request_pay({
							    pg : 'inicis', // version 1.1.0부터 지원.
							    pay_method : 'trans',
							    merchant_uid : 'merchant_' + new Date().getTime(),
							    name : '주문명:결제테스트',
							    amount : finalPrice,
							    buyer_email : $("#buyerEmail").val(),
							    buyer_name : quotesConfirm($("#buyer").val()),
							    buyer_tel : $("#buyerPhone1").val()+$("#buyerPhone2").val()+$("#buyerPhone3").val(),
							    buyer_addr : quotesConfirm($("#sample6_address").val()),
							    buyer_postcode : $("#sample6_postcode").val(),
							    m_redirect_url : 'https://www.yourdomain.com/payments/complete'
							}, function(rsp) {
							    if ( rsp.success ) {
									$.post("/orderGo",{
										US_PK:US_PK,
										itemNumArr:itemNumArr,
										itemAmountArr:itemAmountArr,
										orderNumber:orderNum,
										receiver:quotesConfirm($("#receiver").val()),
										receiverZipcode:$("#sample6_postcode").val(),
										receiverAddress1:quotesConfirm($("#sample6_address").val()),
										receiverAddress2:quotesConfirm($("#sample6_address2").val()),
										receiverPhoneNum:$("#receiverPhone1").val()+$("#receiverPhone2").val()+$("#receiverPhone3").val(),
										receiverMessage:quotesConfirm($("#receiverMessage").val()),
										orderState:orderState,
										depositName:quotesConfirm(depositName),
										depositYMD:depositYMD,
										receiverNo1:$("#receiverZipPhone1").val()+"-"+$("#receiverZipPhone2").val()+"-"+$("#receiverZipPhone3").val(),
										depositMTD:depositMTD,
										receiverEmail:$("#buyerEmail").val(),
										depositPrice:finalPrice,
										buyerName:quotesConfirm($("#buyer").val()),
										buyerPhone:$("#buyerPhone1").val()+$("#buyerPhone2").val()+$("#buyerPhone3").val(),
										mileage:useMileage
									},function(data){
								        var msg = '결제가 완료되었습니다.';
								        // msg += '고유ID : ' + rsp.imp_uid;
								        // msg += '상점 거래ID : ' + rsp.merchant_uid;
								        // msg += '결제 금액 : ' + rsp.paid_amount;
								        // msg += '카드 승인번호 : ' + rsp.apply_num;
								    	alert(msg);
										location.href="/orderComplete.html?order="+orderNum;
									})
							    } else {
									$.post("/addAmt",{itemNumArr:itemNumArr,itemAmountArr:itemAmountArr},function(data){
								        var msg = '결제에 실패하였습니다.';
								        // msg += '에러내용 : ' + rsp.error_msg;
								    	alert(msg);
										location.href=location.href;
									})
							    }
							});
						}
						else{
							$.post("/orderGo",{
								US_PK:US_PK,
								itemNumArr:itemNumArr,
								itemAmountArr:itemAmountArr,
								orderNumber:orderNum,
								receiver:quotesConfirm($("#receiver").val()),
								receiverZipcode:$("#sample6_postcode").val(),
								receiverAddress1:quotesConfirm($("#sample6_address").val()),
								receiverAddress2:quotesConfirm($("#sample6_address2").val()),
								receiverPhoneNum:$("#receiverPhone1").val()+$("#receiverPhone2").val()+$("#receiverPhone3").val(),
								receiverMessage:quotesConfirm($("#receiverMessage").val()),
								orderState:orderState,
								depositName:quotesConfirm(depositName),
								depositYMD:depositYMD,
								receiverNo1:$("#receiverZipPhone1").val()+"-"+$("#receiverZipPhone2").val()+"-"+$("#receiverZipPhone3").val(),
								depositMTD:depositMTD,
								receiverEmail:$("#buyerEmail").val(),
								depositPrice:finalPrice,
								buyerName:quotesConfirm($("#buyer").val()),
								buyerPhone:$("#buyerPhone1").val()+$("#buyerPhone2").val()+$("#buyerPhone3").val(),
								mileage:useMileage
							},function(data){
								location.href="/orderComplete.html?order="+orderNum;
							})
						}
					}
				}
				else{
					alert("다음 상품은 재고수량이 "+data.GD_GOOD_AMT+"개 입니다. "+data.GD_GOOD_AMT+"개 이하로 주문해 주세요.\n상품명: "+data.GD_GOOD_NM);
					location.href="/itemInfo.html?item="+data.GD_PK;
					return;
				}
			})
		}
		else{
			alert("로그인을 해주세요.");
			location.href="/login.html?url="+location.href;
		}
	})
}

function dialogOpen(message){
	var output='';
	output+='<div>'+message+'</div>';
	output+='<div style="padding-top:10px;"><button onclick=\'$("#dialog").dialog( "close" );\' style="margin-left:5px;">확인</button></div>';
	$( "#dialog" ).empty().append(output).dialog( "open" );
}

//이메일 형식이 올바른지 체크
function isEmail(strEmail){
	var pattern = /^([\w]{1,})+[\w\.\-\_]+([\w]{1,})+@(?:[\w\-]{2,}\.)+[a-zA-Z]{2,}$/;
	var bChecked = pattern.test(strEmail);
	return bChecked;
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

function todayTime(){
    var date = new Date();
    var year  = date.getFullYear();
    var month = date.getMonth() + 1; // 0부터 시작하므로 1더함 더함
    var day   = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    if (("" + month).length == 1) { month = "0" + month; }
    if (("" + day).length   == 1) { day   = "0" + day;   }
    if (("" + hour).length   == 1) { hour   = "0" + hour;   }
    if (("" + minute).length   == 1) { minute   = "0" + minute;   }
    if (("" + second).length   == 1) { second   = "0" + second;   }
  
	return("" + year + month + day + hour + minute + second);
}

var useMileage=0;
var gapPr=0;

function useMileageFun(){
	var myMileage=$("#mileage").val();
	if(!isNumber(myMileage)){
		$("#mileage").focus();
		dialogOpen('적립금 항목은 숫자 이외에는 입력할 수 없습니다.');
		return;
	}
	if(myMileage<100){
		return;
	}
	if(myMileage.slice(myMileage.length-2,myMileage.length)!=00){
		$("#mileage").focus();
		dialogOpen('적립금 항목은 100원 단위로 입력할 수 있습니다.');
		return;
	}

	if(mileage<Number(myMileage)){				//finalPrice: 결제금액 , myMileage: 입력마일리지 금액 , mileage: 내가 보유한 마일리지 금액
		if(finalPrice<mileage){
			useMileage=finalPrice;
		}
		else{
			useMileage=mileage;
		}
	}
	else{
		if(finalPrice<Number(myMileage)){
			useMileage=finalPrice;
		}
		else{
			useMileage=Number(myMileage);
		}
	}
	finalPrice-=useMileage;
	allGoodPrice-=useMileage;
	if(allGoodPrice<0){
		gapPr=allGoodPrice;
		allGoodPrice=0;
	}
	$("#useMileage").empty().append(numberWithCommas(useMileage));
	$("#finalPrice").empty().append(numberWithCommas(finalPrice));
	$("#finalPrice2").empty().append(numberWithCommas(finalPrice));
	$("#getMileage").empty().append(numberWithCommas(allGoodPrice/100));
	$("#insertMileage").hide();
	$("#insertAllMileage").hide();
	$("#notUseMileage").show();
	$("#mileage").val(useMileage);
}

function useAllMileageFun(){
	useMileage=parseInt(mileage/100)*100;
	if(finalPrice<useMileage){
		useMileage=finalPrice;
	}
	finalPrice-=useMileage;
	allGoodPrice-=useMileage;
	if(allGoodPrice<0){
		gapPr=allGoodPrice;
		allGoodPrice=0;
	}
	$("#useMileage").empty().append(numberWithCommas(useMileage));
	$("#finalPrice").empty().append(numberWithCommas(finalPrice));
	$("#finalPrice2").empty().append(numberWithCommas(finalPrice));
	$("#getMileage").empty().append(numberWithCommas(allGoodPrice/100));
	$("#insertMileage").hide();
	$("#insertAllMileage").hide();
	$("#notUseMileage").show();
	$("#mileage").val(useMileage);
}

function notUseAMileageFun(){
	finalPrice+=useMileage;
	allGoodPrice+=useMileage+gapPr;
	gapPr=0;
	useMileage=0;
	$("#useMileage").empty().append(numberWithCommas(useMileage));
	$("#finalPrice").empty().append(numberWithCommas(finalPrice));
	$("#finalPrice2").empty().append(numberWithCommas(finalPrice));
	$("#getMileage").empty().append(numberWithCommas(allGoodPrice/100));
	$("#insertMileage").show();
	$("#insertAllMileage").show();
	$("#notUseMileage").hide();
	$("#mileage").val(useMileage);
}

function addressBookFun(){
	myWindow = window.open("/addressBookPopup.html?page=1", "_blank", "toolbar=yes,resizable=yes,top=10,left=10,width=900,height=600");
}

function numberWithCommas(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

function quotesConfirm(str){
	for(var i=0;i<str.length;i++){
		if(str[i]=="<"||str[i]==">"||str[i]=="\""||str[i]=="\'"){
			str=str.substr(0,i)+str.substr(i+1);
			i--;
		}
	}
	return str;
}