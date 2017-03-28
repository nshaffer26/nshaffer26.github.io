function main() {
  $('.menuMobile').hide();
  $('.dropdown').hide();
  if($(window).width() <= 600){
    $('.menu').hide();
    $('.menuMobile').show();
    $('.dropButton').on('click', function() {
      //$(this).next().toggle();
      $('.dropdown').toggle();
    });
  }
}
$(document).ready(main);
