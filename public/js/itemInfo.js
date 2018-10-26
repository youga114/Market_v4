
$(document).ready(function(){

	$(document.body).append('<div id="dialog" title="알림" style="font-size:13px;padding-top:20px;" align="center"></div>');
	$( "#dialog" ).dialog({
		autoOpen: false,
		width: 400,
		height: 160,
		modal: true
	});

	$(document.body).append('<div id="dialog2" title="상품평" style="font-size:13px;padding-top:20px;" align="center"></div>');
	$( "#dialog2" ).dialog({
		autoOpen: false,
		width: 400,
		height: 600,
		modal: true
	});

	var preSize=0;
   	var navbarHeight = $('.main-bg').outerHeight()-50;
	$(window).resize(function(){		//브라우저 창크기조절
		if($(".theiaStickySidebar").css("position")=="fixed"){
			$(".theiaStickySidebar").css('left',parseInt($(".theiaStickySidebar").css('left'))+$(".p-product-wrap").offset().left-preSize);
		}
		preSize=$(".p-product-wrap").offset().left;
	   	var st = $(this).scrollTop(); 
		if($(".theiaStickySidebar").height()+125<$(window).height()){			//스크롤시 알고리즘
			if(st+$(".theiaStickySidebar").height()<$(".p-product-footer").offset().top-125){
				if(st > navbarHeight){
					$(".theiaStickySidebar").css("position","fixed").css("width","400px").css("transform","translateY(120px)").css('left',$(".theiaStickySidebar").offset().left);
				}
			}
			else{																		//맨밑에 닿으면
				$(".theiaStickySidebar").css("position","absolute").css("width","400px").css("transform","translateY("+(parseInt($(".p-product-body").css("height"))-parseInt($(".theiaStickySidebar").css("height")))+"px)").css('left','');
			}
		}
		else{
			if(st+$(window).height()<$(".p-product-footer").offset().top-5){
				if(st+$(window).height()>navbarHeight+120+$(".theiaStickySidebar").height()){
					$(".theiaStickySidebar").css("position","fixed").css("width","400px").css("transform","translateY("+($(window).height()-parseInt($(".theiaStickySidebar").css("height"))-5)+"px)").css('left',$(".theiaStickySidebar").offset().left);
				}
			}
			else{																		//맨밑에 닿으면
				$(".theiaStickySidebar").css("position","absolute").css("width","400px").css("transform","translateY("+(parseInt($(".p-product-body").css("height"))-parseInt($(".theiaStickySidebar").css("height")))+"px)").css('left','');
			}
		}
	}).resize();

	////////////////////////////////////스크롤 이벤트
   	var lastScrollTop = 0; 
   	$(window).scroll(hasScrolled2);
   	function hasScrolled2() {
	   	var st = $(this).scrollTop();
		if (st > lastScrollTop){ // Scroll Down 
			if($(".theiaStickySidebar").height()+125<$(window).height()){			//스크롤시 알고리즘
				if(st+$(".theiaStickySidebar").height()<$(".p-product-footer").offset().top-125){
					if(st > navbarHeight){
						$(".theiaStickySidebar").css("position","fixed").css("width","400px").css("transform","translateY(120px)").css('left',$(".theiaStickySidebar").offset().left);
					}
					else{
						$(".theiaStickySidebar").css("position","static").css("transform","none").css('left','');
					}
				}
				else{																		//맨밑에 닿으면
					$(".theiaStickySidebar").css("position","absolute").css("width","400px").css("transform","translateY("+(parseInt($(".p-product-body").css("height"))-parseInt($(".theiaStickySidebar").css("height")))+"px)").css('left','');
				}
			}
			else{
				if(st+$(window).height()<$(".p-product-footer").offset().top-5){
					if(st+$(window).height()>navbarHeight+120+$(".theiaStickySidebar").height()){
						$(".theiaStickySidebar").css("position","fixed").css("width","400px").css("transform","translateY("+($(window).height()-parseInt($(".theiaStickySidebar").css("height"))-5)+"px)").css('left',$(".theiaStickySidebar").offset().left);
					}
					else{
						$(".theiaStickySidebar").css("position","static").css("transform","none").css('left','');
					}
				}
				else{																		//맨밑에 닿으면
					$(".theiaStickySidebar").css("position","absolute").css("width","400px").css("transform","translateY("+(parseInt($(".p-product-body").css("height"))-parseInt($(".theiaStickySidebar").css("height")))+"px)").css('left','');
				}
			} 
		}
		else{ // Scroll Up 
			if($(".theiaStickySidebar").height()+125<$(window).height()){			//스크롤시 알고리즘
				if(st+$(".theiaStickySidebar").height()<$(".p-product-footer").offset().top-125){
					if(st > navbarHeight){
						$(".theiaStickySidebar").css("position","fixed").css("width","400px").css("transform","translateY(120px)").css('left',$(".theiaStickySidebar").offset().left);
					}
					else{
						$(".theiaStickySidebar").css("position","static").css("transform","none").css('left','');
					}
				}
				else{																		//맨밑에 닿으면
					$(".theiaStickySidebar").css("position","absolute").css("width","400px").css("transform","translateY("+(parseInt($(".p-product-body").css("height"))-parseInt($(".theiaStickySidebar").css("height")))+"px)").css('left','');
				}
			}
			else{
				if(st+$(window).height()<$(".p-product-footer").offset().top-5){
					if(st+$(window).height()>navbarHeight+120+$(".theiaStickySidebar").height()){
						$(".theiaStickySidebar").css("position","fixed").css("width","400px").css("transform","translateY("+($(window).height()-parseInt($(".theiaStickySidebar").css("height"))-5)+"px)").css('left',$(".theiaStickySidebar").offset().left);
					}
					else{
						$(".theiaStickySidebar").css("position","static").css("transform","none").css('left','');
					}
				}
				else{																		//맨밑에 닿으면
					$(".theiaStickySidebar").css("position","absolute").css("width","400px").css("transform","translateY("+(parseInt($(".p-product-body").css("height"))-parseInt($(".theiaStickySidebar").css("height")))+"px)").css('left','');
				}
			} 
		}




		lastScrollTop = st; 
	}

	$(".p-thumbnail-list__image-wrap").each(function(index,item){
		$(item).click(function(){
			$(".is-current").removeClass("is-current");
			$(this).addClass("is-current");
			$("#mainImage").attr("src",$(this).attr("imageUrl"));
		})
	})
})


function cartFunction(x,amt){
	if($('#goodAmount').val()>amt){
		alert("다음 상품은 재고수량이 "+amt+"개 입니다. "+amt+"개 이하로 주문해 주세요.");
		location.href=location.href;
		return;
	}
	if($('#goodAmount').val()!=''){
		$.get('/goCart?item='+x+'&amount='+$('#goodAmount').val(),function(data){
			if(data=='success'){
				var output='';
				output+='<div>상품이 장바구니에 담겼습니다.</div>';
				output+='<div style="font-weight:bold;">지금 확인하시겠습니까?</div>';
				output+='<div style="padding-top:10px;"><button onclick=location.href="/cart.html" style="margin-right:5px;">예</button><button onclick=\'$("#dialog").dialog( "close" );\' style="margin-left:5px;">아니오</button></div>';
				$( "#dialog" ).empty().append(output).dialog( "open" );
			}
		})
	}
	else{
		var output='';
		output+='<div>옵션을 선택해 주세요.</div>';
		output+='<div style="padding-top:10px;"><button onclick=\'$("#dialog").dialog( "close" );\' style="margin-left:5px;">확인</button></div>';
		$( "#dialog" ).empty().append(output).dialog( "open" );
	}
}

function amountFunc(pr,delPr,pk){
	$.post("/goodAmountConfirm",{pk:pk},function(data){
		if($('#goodAmount').val()>data[0].GD_GOOD_AMT){
			alert("다음 상품은 재고수량이 "+data[0].GD_GOOD_AMT+"개 입니다. "+data[0].GD_GOOD_AMT+"개 이하로 주문해 주세요.\n상품명: "+data[0].GD_GOOD_NM);
			location.href=location.href;
			return;
		}
		if($('#goodAmount').val()!=''){
			if($('#goodAmount').val()*pr<50000){
				$('#allPr').empty().append(''+numberWithCommas($('#goodAmount').val()*pr+delPr));
			}
			else{
				$('#allPr').empty().append(''+numberWithCommas($('#goodAmount').val()*pr));
			}
		}
		else{
			$('#allPr').empty().append('0');
		}
	})
}

function orderFunction(x){
	if($('#goodAmount').val()!=''){
		location.href='/login.html?url=/order.html?item='+x+'a'+$('#goodAmount').val();
	}
	else{
		var output='';
		output+='<div>옵션을 선택해 주세요.</div>';
		output+='<div style="padding-top:10px;"><button onclick=\'$("#dialog").dialog( "close" );\' style="margin-left:5px;">확인</button></div>';
		$( "#dialog" ).empty().append(output).dialog( "open" );
	}
}

function orderFunction2(x){
	if($('#goodAmount').val()!=''){
		location.href='/order.html?item='+x+'a'+$('#goodAmount').val();
	}
	else{
		var output='';
		output+='<div>옵션을 선택해 주세요.</div>';
		output+='<div style="padding-top:10px;"><button onclick=\'$("#dialog").dialog( "close" );\' style="margin-left:5px;">확인</button></div>';
		$( "#dialog" ).empty().append(output).dialog( "open" );
	}
}

function reviewFun(item){
	$.get("/login_check",function(data){
		if(data=="good"){
			$.post("/existOrder",{pk:item},function(data){
				if(data=="success"){
					$.post("/goodAmountConfirm",{pk:item},function(data){
						$.get("/bringMyUserData",function(data2){
							var output='';
							output+='<div style="font-size: 15pt;font-weight: normal;padding-bottom: 30px;color: #555;text-align:left;">'+data[0].GD_GOOD_NM;
							output+='<p style="font-size: 9pt;color: #999;padding-top: 7px;">상품평을 남겨주세요.</p></div>';
							output+='<form id="reviewEnd" action="/reviewEnd" method="post" enctype="multipart/form-data">';
							output+='<input name="GD_PK" value="'+data[0].GD_PK+'" hidden>';
							output+='<div style="padding-bottom:15px;">';
							output+='	<input name="name" type="text" value="'+data2.US_USER_NM+'" style="width:92%;border: 1px solid #dfdfdf;padding: 12px;color: #888;font-size: 12px;border-radius: 3px;" readonly>';
							output+='</div>';
							output+='<div style="padding-bottom:15px;">';
							output+='	<textarea name="review" id="review" style="padding: 12px;color: #888;width:92%;height: 150px;border: 1px solid #dadada;border-radius: 3px;font-size: 12px;" maxlength="500"></textarea>';
							output+='</div>';
							output+='<div style="padding-bottom:15px;">';
							output+='<div class="filebox" style="width: 92%;"><input class="upload-name" value="" disabled="disabled" style="width:74%;"> <label for="ex_filename" style="margin: 0;">업로드</label> <input type="file" id="ex_filename" name="file" class="upload-hidden" multiple required></div>';
							// output+='	<input name="file" type="file" style="padding: 4px 10px;border: none;border-bottom: 1px solid #eaeaea;width:92%;">';
							output+='</div>';
							output+='</form>';
							output+='<div style="padding-top:15px;">';
							output+='	<button style="width:92%;color: #fff;background: rgb(154,154,154);padding: 12px 0px;font-size: 14px;font-weight: bold;border-radius: 3px;border:0px;" onclick="reviewEndFun()">작성 완료</button>';
							output+='</div>';
							$( "#dialog2" ).empty().append(output).dialog( "open" );

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
						})
					})
				}
				else{
					alert("상품을 구매하시면 상품평을 남길 수 있습니다.");
					location.href=location.href;
				}
			})
		}
		else{
			location.href='/login.html?url='+location.href;
		}
	})
}

function reviewEndFun(){
	if($("#review").val()==""){
		alert("평가내용을 입력해 주세요.");
		$("#review").focus();
		return;
	}
	$("#reviewEnd").submit();
}

function reviewRemoveFun(pk){
	$.post("/reviewRemove",{pk:pk},function(data){
		location.href=location.href;
	})
}
