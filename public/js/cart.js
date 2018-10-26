var checkFlag=0;
var allAmount=0;
var allPrice=0;
var allSale=0;
var allDelPrice=0;
var allWholePrice=0;
var wholePrice=0;
var allItem=[];
$(document).ready(function(){
	$.get("/bringHighCategory",function(data){
	   	var output='<li><a href="/">Home</a></li>';
	   	for(var i=0;i<data.length;i++){
	   		output+='<li><a href="/category.html?high_num='+data[i].CG_PK+'&view=3">'+data[i].CG_CATEGORY_NM+'</a></li>';
	   	}
	   	$("#menu").append(output);
	   	$.get("/cartIdentify",function(data){
	   		if(data[0]){
	   			$("#cartTableTr").remove();
	   			for(var i=0;i<data.length;i++){
	   				$.post("/cartItemIdentify",data[i],function(data){
	   					var output='';
	   					output+='<tr>';
	   					output+='<td align="center" style="border-right: 1px solid rgb(204,204,204);border-bottom: 1px solid rgb(204,204,204);"><input itemNum="'+data.data[0].GD_PK+'" pk="'+data.CT_PK+'" amount="'+data.amount+'" price="'+data.data[0].GD_SELL_PR+'" delPr="'+data.data[0].GD_DELIVERY_PR+'" type="checkbox" checked="checked" onchange="checkEventFun(this)" class="checkBoxIden"></td>';
	   					output+='<td style="padding:7px 7px 7px 7px;border-right: 1px solid rgb(204,204,204);border-bottom: 1px solid rgb(204,204,204);"><image src="'+data.data[0].GD_MAIN_IM.split(',')[0]+'" style="width:70px;height:70px;float:left;padding-right:10px;"><span style="float:left;"><div style="padding-bottom:5px;width:250px;">'+data.data[0].GD_GOOD_NM+'</div><div style="color:rgb(184,184,184);">옵션</div></span></td>';
	   					output+='<td align="center" style="border-right: 1px solid rgb(204,204,204);border-bottom: 1px solid rgb(204,204,204);">'+data.amount+'</td>';
	   					output+='<td align="right" style="border-right: 1px solid rgb(204,204,204);border-bottom: 1px solid rgb(204,204,204);"><span style="padding-right:5px;">'+numberWithCommas(data.amount*data.data[0].GD_SELL_PR)+'</span></td>';
	   					output+='<td style="border-right: 1px solid rgb(204,204,204);border-bottom: 1px solid rgb(204,204,204);" align="center">-</td>';
	   					output+='<td style="border-right: 1px solid rgb(204,204,204);border-bottom: 1px solid rgb(204,204,204);" align="right"><span style="padding-right:5px;">'+numberWithCommas(data.amount*data.data[0].GD_SELL_PR)+'</span></td>';
	   					output+='<td align="center" style="border-bottom: 1px solid rgb(204,204,204);">'+numberWithCommas(data.data[0].GD_DELIVERY_PR)+'</td>';
	   					output+='</tr>';
	   					$('#cartTable').append(output);
	   					allAmount+=parseInt(data.amount);
	   					allPrice+=(data.amount*data.data[0].GD_SELL_PR);
	   					var itemFlag=0;
	   					for(var j=0;j<allItem.length;j++){
	   						if(data.data[0].GD_PK==allItem[j]){
	   							itemFlag=1;
	   							break;
	   						}
	   					}
	   					allItem.push(data.data[0].GD_PK);
	   					if(itemFlag==0){
								allDelPrice+=data.data[0].GD_DELIVERY_PR;
								allWholePrice+=(data.amount*data.data[0].GD_SELL_PR)+data.data[0].GD_DELIVERY_PR;
	   					}
	   					else{
								allWholePrice+=(data.amount*data.data[0].GD_SELL_PR);
	   					}
	   					$('#allAmount').empty().append(allAmount);
	   					$('#allDelPrice').empty().append(numberWithCommas(allDelPrice));
	   					$('#allPrice').empty().append(numberWithCommas(allPrice));
	   					if(allWholePrice<50000){
								$('#wholePrice').empty().append(numberWithCommas(allWholePrice));
								$('#wholePrice2').empty().append(numberWithCommas(allWholePrice));
								$('#allSale').empty().append(0);
							}
							else{
								$('#wholePrice').empty().append(numberWithCommas(allPrice));
								$('#wholePrice2').empty().append(numberWithCommas(allPrice));
								$('#allSale').empty().append(numberWithCommas(allDelPrice));
							}
	   				})
	   			}
	   		}
	   		else{
	   			var output='';
	   			output+='<td colspan="8" align="center" style="font-size: 12px;">장바구니에 담긴 상품이 없습니다.</td>';
	   			$('#cartTableTr').append(output);
	   		}
	   	})
	})
})

function allSelectFun(){
	$(".checkBoxIden").each(function() {
		if(checkFlag==1){
			if($(this).prop("checked")==false){
				$(this).prop("checked", true);
				allAmount+=parseInt($(this).attr('amount'));
				allPrice+=($(this).attr('amount')*$(this).attr('price'));
	   			var itemFlag=0;
	   			for(var j=0;j<allItem.length;j++){
	   				if($(this).attr("itemNum")==allItem[j]){
	   					itemFlag=1;
	   					break;
	   				}
	   			}
	   			allItem.push($(this).attr("itemNum"));
	   			if(itemFlag==0){
		   			allDelPrice+=parseInt($(this).attr('delPr'));
		   			allWholePrice+=($(this).attr('amount')*$(this).attr('price'))+parseInt($(this).attr('delPr'));
	   			}
	   			else{
		   			allWholePrice+=($(this).attr('amount')*$(this).attr('price'));
	   			}
				$('#allAmount').empty().append(allAmount);
				$('#allDelPrice').empty().append(numberWithCommas(allDelPrice));
				$('#allPrice').empty().append(numberWithCommas(allPrice));
	   			if(allWholePrice<50000){
		   			$('#wholePrice').empty().append(numberWithCommas(allWholePrice));
		   			$('#wholePrice2').empty().append(numberWithCommas(allWholePrice));
		   			$('#allSale').empty().append(0);
		   		}
		   		else{
		   			$('#wholePrice').empty().append(numberWithCommas(allPrice));
		   			$('#wholePrice2').empty().append(numberWithCommas(allPrice));
		   			$('#allSale').empty().append(numberWithCommas(allDelPrice));
		   		}
			}
		}
		else{
			if($(this).prop("checked")==true){
				$(this).prop("checked", false);
				allAmount-=parseInt($(this).attr('amount'));
				allPrice-=($(this).attr('amount')*$(this).attr('price'));
	   			for(var j=0;j<allItem.length;j++){
	   				if($(this).attr("itemNum")==allItem[j]){
	   					allItem.splice(j,1);
	   					break;
	   				}
	   			}
	   			var itemFlag=0;
	   			for(var j=0;j<allItem.length;j++){
	   				if($(this).attr("itemNum")==allItem[j]){
	   					itemFlag=1;
	   					break;
	   				}
	   			}
	   			if(itemFlag==0){
		   			allDelPrice-=parseInt($(this).attr('delPr'));
		   			allWholePrice-=($(this).attr('amount')*$(this).attr('price'))+parseInt($(this).attr('delPr'));
	   			}
	   			else{
		   			allWholePrice-=($(this).attr('amount')*$(this).attr('price'));
	   			}
				$('#allAmount').empty().append(allAmount);
				$('#allDelPrice').empty().append(numberWithCommas(allDelPrice));
				$('#allPrice').empty().append(numberWithCommas(allPrice));
	   			if(allWholePrice<50000){
		   			$('#wholePrice').empty().append(numberWithCommas(allWholePrice));
		   			$('#wholePrice2').empty().append(numberWithCommas(allWholePrice));
		   			$('#allSale').empty().append(0);
		   		}
		   		else{
		   			$('#wholePrice').empty().append(numberWithCommas(allPrice));
		   			$('#wholePrice2').empty().append(numberWithCommas(allPrice));
		   			$('#allSale').empty().append(numberWithCommas(allDelPrice));
		   		}
			}
		}
	});
	if(checkFlag==0){
		checkFlag=1;
		return;
	}
	else{
		checkFlag=0;
		return;
	}
}

function checkDelFun(){
	$(".checkBoxIden").each(function() {
		if($(this).prop("checked")==true){
			$.post("/deleteCart",{pk:$(this).attr("pk")},function(data){
				window.location.reload();
			});
		}
	})
}

function checkEventFun(x){
	if($(x).prop("checked")==false){
		allAmount-=parseInt($(x).attr('amount'));
		allPrice-=($(x).attr('amount')*$(x).attr('price'));
	   	for(var j=0;j<allItem.length;j++){
	   		if($(x).attr("itemNum")==allItem[j]){
	   			allItem.splice(j,1);
	   			break;
	   		}
	   	}
	   	var itemFlag=0;
	   	for(var j=0;j<allItem.length;j++){
	   		if($(x).attr("itemNum")==allItem[j]){
	   			itemFlag=1;
	   			break;
	   		}
	   	}
	   	if(itemFlag==0){
		   	allDelPrice-=parseInt($(x).attr('delPr'));
		   	allWholePrice-=($(x).attr('amount')*$(x).attr('price'))+parseInt($(x).attr('delPr'));
	   	}
	   	else{
		   	allWholePrice-=($(x).attr('amount')*$(x).attr('price'));
	   	}
		$('#allAmount').empty().append(allAmount);
		$('#allDelPrice').empty().append(numberWithCommas(allDelPrice));
		$('#allPrice').empty().append(numberWithCommas(allPrice));
	   	if(allWholePrice<50000){
			$('#wholePrice').empty().append(numberWithCommas(allWholePrice));
			$('#wholePrice2').empty().append(numberWithCommas(allWholePrice));
		   	$('#allSale').empty().append(0);
		}
		else{
			$('#wholePrice').empty().append(numberWithCommas(allPrice));
			$('#wholePrice2').empty().append(numberWithCommas(allPrice));
		   	$('#allSale').empty().append(numberWithCommas(allDelPrice));
		}
	}
	else{
		allAmount+=parseInt($(x).attr('amount'));
		allPrice+=($(x).attr('amount')*$(x).attr('price'));
	   	var itemFlag=0;
	   	for(var j=0;j<allItem.length;j++){
	   		if($(x).attr("itemNum")==allItem[j]){
	   			itemFlag=1;
	   			break;
	   		}
	   	}
	   	allItem.push($(x).attr("itemNum"));
	   	if(itemFlag==0){
		   	allDelPrice+=parseInt($(x).attr('delPr'));
		   	allWholePrice+=($(x).attr('amount')*$(x).attr('price'))+parseInt($(x).attr('delPr'));
	   	}
	   	else{
		   	allWholePrice+=($(x).attr('amount')*$(x).attr('price'));
	   	}
		$('#allAmount').empty().append(allAmount);
		$('#allDelPrice').empty().append(numberWithCommas(allDelPrice));
		$('#allPrice').empty().append(numberWithCommas(allPrice));
	   	if(allWholePrice<50000){
			$('#wholePrice').empty().append(numberWithCommas(allWholePrice));
			$('#wholePrice2').empty().append(numberWithCommas(allWholePrice));
		   	$('#allSale').empty().append(0);
		}
		else{
			$('#wholePrice').empty().append(numberWithCommas(allPrice));
			$('#wholePrice2').empty().append(numberWithCommas(allPrice));
		   	$('#allSale').empty().append(numberWithCommas(allDelPrice));
		}
	}
}

function allBuyFun(){
	var itemNum='';
	var itemAmount='';
	$(".checkBoxIden").each(function(index) {
		if(index==0){
			itemNum+=$(this).attr('itemNum');
			itemAmount+=$(this).attr('amount');
		}
		else{
			itemNum+=',';
			itemNum+=$(this).attr('itemNum');
			itemAmount+=',';
			itemAmount+=$(this).attr('amount');
		}
	})
	location.href='/order.html?item='+itemNum+'a'+itemAmount;
}

function checkBuyFun(){
	var itemNum='';
	var itemAmount='';
	var flag=0;
	$(".checkBoxIden").each(function(index) {
		if($(this).prop("checked")==true){
			if(flag!=0){
				itemNum+=',';
				itemNum+=$(this).attr('itemNum');
				itemAmount+=',';
				itemAmount+=$(this).attr('amount');
			}
			else{
				itemNum+=$(this).attr('itemNum');
				itemAmount+=$(this).attr('amount');
				flag++;
			}
		}
	})
	if(itemNum==''){
		$(document.body).append('<div id="dialog" title="알림" style="font-size:13px;padding-top:20px;" align="center"></div>');
		$( "#dialog" ).dialog({
			autoOpen: false,
			width: 400,
			height: 160,
			modal: true
		});
		var output='';
		output+='<div>상품을 선택해 주세요.</div>';
		output+='<div style="padding-top:10px;"><button onclick=\'$("#dialog").dialog( "close" );\' style="margin-left:5px;">확인</button></div>';
		$( "#dialog" ).empty().append(output).dialog( "open" );
	}
	else{
		location.href='/order.html?item='+itemNum+'a'+itemAmount;
	}
}