$(document).ready(function(){
	$.get("/myMileage",function(data){
		var output='';
		var mileage=0;
		for(var i=data.length-1;i>=0;i--){
			mileage+=data[i].ML_MILEAGE_PR;
			var date=data[i].ML_REGDATE_YMD;
			output+='<tr>';
			output+='	<td style="padding:5px 10px 5px 10px;width: 40px;border-bottom: solid 1px rgb(204,204,204);">'+(i+1)+'</td><td style="padding:5px 10px 5px 10px;border-bottom: solid 1px rgb(204,204,204);width:140px;">'+date.slice(0,4)+'-'+date.slice(4,6)+'-'+date.slice(6,8)+' '+date.slice(8,10)+':'+date.slice(10,12)+':'+date.slice(12,14)+'</td>';
			if(data[i].ML_MILEAGE_PR<0){
				output+='	<td style="padding:5px 10px 5px 10px;width: 140px;border-bottom: solid 1px rgb(204,204,204);"><span style="color:blue;">(-) </span>'+Math.abs(data[i].ML_MILEAGE_PR)+'</td>';
			}
			else{
				output+='	<td style="padding:5px 10px 5px 10px;width: 140px;border-bottom: solid 1px rgb(204,204,204);"><span style="color:red;">(+) </span>'+data[i].ML_MILEAGE_PR+'</td>';
			}
			output+='	<td style="padding:5px 10px 5px 10px;border-bottom: solid 1px rgb(204,204,204);text-align:left;">'+data[i].ML_MILEAGE_EX+'</td>';
			output+='</tr>';
		}
		$("#mileage").append(numberWithCommas(mileage));
		$("#mileageTb").append(output);
	})
})

function numberWithCommas(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}
