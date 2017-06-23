function main() {
  $('.menuMobile').hide();
  $('.dropdown').hide();
  $('.moveToDesktop').hide();
  if($(window).width() <= 600){
    $('.download').hide();
    $('.moveToDesktop').show();
    $('.menu').hide();
    $('.menuMobile').show();
    $('.dropButton').on('click', function() {
      //$(this).next().toggle();
      $('.dropdown').toggle();
    });
  }
}
$(document).ready(main);
