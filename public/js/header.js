$(document).ready(function(){
   	var didScroll; 
   	var lastScrollTop = 0; 
   	var delta = 5; 
   	var navbarHeight = $('.main-bg').outerHeight();

   	$(window).scroll(function(event){ 
   		didScroll = true; 
   	}); //스크롤이벤트

   	setInterval(function() { 
   		if (didScroll) { 
   			hasScrolled(); didScroll = false; 
   		} 
   	}, 250); 
   	function hasScrolled() { 
   		var st = $(this).scrollTop(); 
		if(Math.abs(lastScrollTop - st) <= delta){
			return;
		} 
		if(st>600){
			$('.main-bg-header-container-home').css('display','inline-block');
			$('.main-bg-header-container-logo').css('display','none');
			$('.main-bg-header-container-catchcopy').css('display','none');
			$('#magnifier').css('display','none');
			$('.main-bg').removeClass('isTop').addClass('isHidden');
	   		if (st > lastScrollTop && st > navbarHeight){ // Scroll Down
	   			$('.main-bg').removeClass('isFixed');
	   		} else { // Scroll Up 
	   			if(st + $(window).height() < $(document).height()) { 
	   				$('.main-bg').removeClass('isHidden').addClass('isFixed');  
	   			} 
	   		} 
		}
		else{
			$('.main-bg-header-container-home').css('display','none');
			$('.main-bg-header-container-logo').css('display','block');
			$('.main-bg-header-container-catchcopy').css('display','block');
			$('#magnifier').css('display','block');
			$('.main-bg').removeClass('isHidden').addClass('isTop');
		}
		lastScrollTop = st; 
	}




	$( '.pageTop-a' ).click( function() {			/////////////pagetop
	  	$( 'html, body' ).animate( { scrollTop : 0 }, 400 );
	  	return false;
	} );

})