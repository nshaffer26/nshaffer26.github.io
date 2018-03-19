function main() {
	var contentHeight = $(window).height() - $(".menu").height();
	$(".content").css("min-height",contentHeight);
  	$(".mobileShow").hide();
  	$(".dropdown").hide();
  	if($(window).width() <= 750) {
  		$(".disableImgLink a").removeAttr("href");
  		$(".disableImgLink").html("Unavailable on mobile");
    	$(".mobileHide").hide();
    	$(".mobileShow").show();
    	$("#DMS110Menu").show();
    	$("#dropButton").on("click", function() {
      		$(".dropdown").toggle();
    	});
  	}
}
$(document).ready(main);
