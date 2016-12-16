function main() {
  $('.hamburger').hide();
  $('.menu').hide();
  if($(window).width() <= 600){
    $('.hamburger').show();
    $('.buttons').hide();
    $('.hamburger').on('click', function() {
      //$(this).next().toggle();
      $('.page').toggle();
      $('.menu').toggle();
    });
  }
}
main();
