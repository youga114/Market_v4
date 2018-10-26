$(document).ready(function(){
	$.get("/bringMyOrder",function(data){
		if(data!=''){
			$("#noOrder").remove();
			var allOrderLength=0;
			for(var i=0;i<5;i++){
				var sameOrder=0;
				if(data.length==1){
					allOrderLength++;
					var orderNumber=data[0].OD_ORDER_NO;
					var date=orderNumber.slice(0,14);
					var item=data[0].OD_GD_FK;
					var output='';
					output+='<tr>';
					output+='	<td style="padding: 6px 5px 6px 5px;border-bottom: 1px solid rgb(204,204,204);text-align: center;"><a style="font-size:11px;text-decoration:underline;font-weight:bold;" href="/orderInfo.html?order='+data[i].OD_ORDER_NO+'">'+data[0].OD_ORDER_NO+'</a></td>';
					output+='	<td style="padding: 6px 5px 6px 5px;border-bottom: 1px solid rgb(204,204,204);text-align: center;">';
					output+='		<img id="img'+data[0].OD_PK+'" src="" style="width: 70px;height: 70px;float:left;">';
					output+='		<div id="goodName'+data[0].OD_PK+'" style="float:left;margin-left:10px;padding-top:25px;width:310px;text-align:left;"></div>';
					output+='	</td>';
					output+='	<td style="padding: 6px 5px 6px 5px;border-bottom: 1px solid rgb(204,204,204);text-align: center;">'+date.slice(0,4)+'/'+date.slice(4,6)+'/'+date.slice(6,8)+'</td>';
					output+='	<td style="padding: 6px 5px 6px 5px;border-bottom: 1px solid rgb(204,204,204);text-align: center;font-weight:bold;">'+numberWithCommas(data[0].OD_DEPOSIT_PR+data[0].OD_MILEAGE_PR)+'원</td>';
					output+='	<td style="padding: 6px 5px 6px 5px;border-bottom: 1px solid rgb(204,204,204);text-align: center;">';
					if(data[i].OD_ORDER_ST==1){
						output+='		입금확인중';
					}
					else if(data[i].OD_ORDER_ST==2){
						output+='		주문접수';
					}
					else if(data[i].OD_ORDER_ST==3){
						output+='		배송준비중';
					}
					else if(data[i].OD_ORDER_ST==4){
						output+='		배송중';
					}
					else if(data[i].OD_ORDER_ST==5){
						output+='		배송완료';
					}
					else if(data[i].OD_ORDER_ST==0){
						output+='		주문취소';
					}
					output+='	</td>';
					output+='</tr>';
					$("#orderTb").append(output);
					$.post("/goodConfirm",{good:item,moment:data[0].OD_PK},function(data2){
						$("#img"+data2.moment).attr("src",data2.data[0].GD_MAIN_IM.split(',')[0]);
						$("#goodName"+data2.moment).append(data2.data[0].GD_GOOD_NM);
					})
				}
				else{
					var itemKinds=[];
					for(var i=0;i<4;i++){
						if(data[i].OD_ORDER_NO!=data[i+1].OD_ORDER_NO){
							allOrderLength++;
							var orderNumber=data[i].OD_ORDER_NO;
							var date=orderNumber.slice(0,14);
							var output='';
							output+='<tr>';
							output+='	<td style="padding: 6px 5px 6px 5px;border-bottom: 1px solid rgb(204,204,204);text-align: center;"><a style="font-size:11px;text-decoration:underline;font-weight:bold;" href="/orderInfo.html?order='+data[i].OD_ORDER_NO+'">'+data[i].OD_ORDER_NO+'</a></td>';
							output+='	<td style="padding: 6px 5px 6px 5px;border-bottom: 1px solid rgb(204,204,204);text-align: center;">';
							output+='		<img id="img'+data[i].OD_PK+'" src="" style="width: 70px;height: 70px;float:left;">';
							output+='		<div id="goodName'+data[i].OD_PK+'" style="float:left;margin-left:10px;padding-top:25px;width:310px;text-align:left;"></div>';
							output+='	</td>';
							output+='	<td style="padding: 6px 5px 6px 5px;border-bottom: 1px solid rgb(204,204,204);text-align: center;">'+date.slice(0,4)+'/'+date.slice(4,6)+'/'+date.slice(6,8)+'</td>';
							output+='	<td style="padding: 6px 5px 6px 5px;border-bottom: 1px solid rgb(204,204,204);text-align: center;font-weight:bold;">'+numberWithCommas(data[i].OD_DEPOSIT_PR+data[i].OD_MILEAGE_PR)+'원</td>';
							output+='	<td style="padding: 6px 5px 6px 5px;border-bottom: 1px solid rgb(204,204,204);text-align: center;">';
							if(data[i].OD_ORDER_ST==1){
								output+='		입금확인중';
							}
							else if(data[i].OD_ORDER_ST==2){
								output+='		주문접수';
							}
							else if(data[i].OD_ORDER_ST==3){
								output+='		배송준비중';
							}
							else if(data[i].OD_ORDER_ST==4){
								output+='		배송중';
							}
							else if(data[i].OD_ORDER_ST==5){
								output+='		배송완료';
							}
							else if(data[i].OD_ORDER_ST==0){
								output+='		주문취소';
							}
							output+='	</td>';
							output+='</tr>';
							$("#orderTb").append(output);
							var itemKindsNum=0;
							for(k=0;k<itemKinds.length;k++){
								if(itemKinds[k]!=data[i].OD_GD_FK){
									itemKindsNum++;
								}
							}
							$.post("/goodConfirm",{good:data[i-sameOrder].OD_GD_FK,moment:data[i].OD_PK,itemKinds:itemKindsNum},function(data2){
								$("#img"+data2.moment).attr("src",data2.data[0].GD_MAIN_IM.split(',')[0]);
								if(data2.itemKinds==0){
									$("#goodName"+data2.moment).append(data2.data[0].GD_GOOD_NM);
								}
								else{
									$("#goodName"+data2.moment).append(data2.data[0].GD_GOOD_NM+" 외 "+data2.itemKinds+"건");
								}
							})
							sameOrder=0;
							itemKinds=[];
						}
						else{
							sameOrder++;
							var flag=0;
							for(var j=0;j<itemKinds.length;j++){
								if(itemKinds[j]==data[i].OD_GD_FK){
									flag=1;
									break;
								}
							}
							if(flag==0){
								itemKinds.push(data[i].OD_GD_FK);
							}
						}
						if(i==3){
							allOrderLength++;
							var orderNumber=data[i+1].OD_ORDER_NO;
							var date=orderNumber.slice(0,14);
							var output='';
							output+='<tr>';
							output+='	<td style="padding: 6px 5px 6px 5px;border-bottom: 1px solid rgb(204,204,204);text-align: center;"><a style="font-size:11px;text-decoration:underline;font-weight:bold;" href="/orderInfo.html?order='+data[i+1].OD_ORDER_NO+'">'+data[i+1].OD_ORDER_NO+'</a></td>';
							output+='	<td style="padding: 6px 5px 6px 5px;border-bottom: 1px solid rgb(204,204,204);text-align: center;">';
							output+='		<img id="img'+data[i+1].OD_PK+'" src="" style="width: 70px;height: 70px;float:left;">';
							output+='		<div id="goodName'+data[i+1].OD_PK+'" style="float:left;margin-left:10px;padding-top:25px;width:310px;text-align:left;"></div>';
							output+='	</td>';
							output+='	<td style="padding: 6px 5px 6px 5px;border-bottom: 1px solid rgb(204,204,204);text-align: center;">'+date.slice(0,4)+'/'+date.slice(4,6)+'/'+date.slice(6,8)+'</td>';
							output+='	<td style="padding: 6px 5px 6px 5px;border-bottom: 1px solid rgb(204,204,204);text-align: center;font-weight:bold;">'+numberWithCommas(data[i+1].OD_DEPOSIT_PR+data[i+1].OD_MILEAGE_PR)+'원</td>';
							output+='	<td style="padding: 6px 5px 6px 5px;border-bottom: 1px solid rgb(204,204,204);text-align: center;">';
							if(data[i+1].OD_ORDER_ST==1){
								output+='		입금확인중';
							}
							else if(data[i+1].OD_ORDER_ST==2){
								output+='		주문접수';
							}
							else if(data[i+1].OD_ORDER_ST==3){
								output+='		배송준비중';
							}
							else if(data[i+1].OD_ORDER_ST==4){
								output+='		배송중';
							}
							else if(data[i+1].OD_ORDER_ST==5){
								output+='		배송완료';
							}
							else if(data[i+1].OD_ORDER_ST==0){
								output+='		주문취소';
							}
							output+='	</td>';
							output+='</tr>';
							$("#orderTb").append(output);
							var itemKindsNum=0;
							for(k=0;k<itemKinds.length;k++){
								if(itemKinds[k]!=data[i+1].OD_GD_FK){
									itemKindsNum++;
								}
							}
							$.post("/goodConfirm",{good:data[i+1-sameOrder].OD_GD_FK,moment:data[i+1].OD_PK,itemKinds:itemKindsNum},function(data2){
								$("#img"+data2.moment).attr("src",data2.data[0].GD_MAIN_IM.split(',')[0]);
								if(data2.itemKinds==0){
									$("#goodName"+data2.moment).append(data2.data[0].GD_GOOD_NM);
								}
								else{
									$("#goodName"+data2.moment).append(data2.data[0].GD_GOOD_NM+" 외 "+data2.itemKinds+"건");
								}
							})
						}
					}
				}
			}
			$("#total").empty().append("total "+allOrderLength);
		}
	})

	$.get("/cartIdentify",function(data){
		if(data[0]){
			$("#cartTableTr").remove();
			for(var i=0;i<5;i++){
				$.post("/cartItemIdentify",data[i],function(data){
					var output='';
					output+='<tr>';
					output+='<td style="padding:7px 7px 7px 7px;border-right: 1px solid rgb(204,204,204);border-bottom: 1px solid rgb(204,204,204);"><image src="'+data.data[0].GD_MAIN_IM.split(',')[0]+'" style="width:70px;height:70px;float:left;padding-right:10px;"><span style="float:left;"><div style="padding-bottom:5px;width:250px;">'+data.data[0].GD_GOOD_NM+'</div><div style="color:rgb(184,184,184);">옵션</div></span></td>';
					output+='<td align="center" style="border-right: 1px solid rgb(204,204,204);border-bottom: 1px solid rgb(204,204,204);">'+data.amount+'</td>';
					output+='<td align="right" style="border-right: 1px solid rgb(204,204,204);border-bottom: 1px solid rgb(204,204,204);"><span style="padding-right:5px;">'+numberWithCommas(data.amount*data.data[0].GD_SELL_PR)+'</span></td>';
					output+='<td style="border-right: 1px solid rgb(204,204,204);border-bottom: 1px solid rgb(204,204,204);" align="center">-</td>';
					output+='<td style="border-right: 1px solid rgb(204,204,204);border-bottom: 1px solid rgb(204,204,204);" align="right"><span style="padding-right:5px;">'+numberWithCommas(data.amount*data.data[0].GD_SELL_PR)+'</span></td>';
					output+='<td align="center" style="border-bottom: 1px solid rgb(204,204,204);">'+numberWithCommas(data.data[0].GD_DELIVERY_PR)+'</td>';
					output+='</tr>';
					$('#cartTable').append(output);
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

function numberWithCommas(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}
