
//금액 표시할 경우 3자리에 자동 콤마
function numberWithCommas(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}