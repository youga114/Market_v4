$(document).ready(function(){
	$(".board_bt").hover(function(){
		var index = $(".board_bt").index(this);
		$(this).css("background-color", "black");
		$(this).css("color", "white");
		img_ad = $(this).find("img").attr("src");
		var img_ad_ar = img_ad.split('.');
		$(this).find("img").attr("src", img_ad_ar[0]+"_w.png");	
	},function(){
		img_ad = $(this).find("img").attr("src");
		var img_ad_ar = img_ad.split('_');
		if(img_ad_ar[2]!=undefined){
			$(this).css("background-color", "white");
			$(this).css("color", "black");
			$(this).find("img").attr("src", img_ad_ar[0]+"_"+img_ad_ar[1]+".png");
		}
	});
});


function menu_bt(address){
	var add = address.toString();
	if(add == "notice")
		location.href="/service/notice/1";
	else
		location.href = "/service/"+address;
}
