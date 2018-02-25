function main() {
  //$('.menuMobile').hide();
  //$('.dropdown').hide();
  $('.moveToDesktop').hide();
  if($(window).width() <= 600){
    $("div#hidden").removeClass("hidden");
    $('.download').hide();
    $('.moveToDesktop').show();
    $('.menu').hide();
    $('.DMS110Menu').show();
    $('.menuMobile').show();
    $('.dropButton').on('click', function() {
      //$(this).next().toggle();
      $('.dropdown').toggle();
    });
  }
}
$(document).ready(main);
