$(document).foundation();

$(document).ready(function() {

  $(window).scroll(function() {
    var scroll       = $(window).scrollTop(),
        headerHeight = $('#entrec-header').outerHeight(),
        headerHr     = $('.header-hr').outerHeight(),
        totalHeight  = headerHeight - headerHr;

    // Initial(static)-Active(fixed) Navigation Position
    if(scroll >= totalHeight) {
      $('#site-nav').removeClass('initial-state').addClass('active-state');
    } else {
      $('#site-nav').removeClass('active-state').addClass('initial-state');
    }

    // toTop Fixed Positon When Scroll Down
    if (scroll >= totalHeight) {
      $("#toTop").fadeIn(200);
    } else {
      $("#toTop").fadeOut(200);
    }
  });


  // Smooth Scroll Up Down
  smoothScroll(400);
  function smoothScroll (duration) {
    $('a[href^="#"]').on('click', function(event) {

      var target = $( $(this).attr('href') );

      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, duration);
      }
    });
  }

  // LazyloadJS
  $('img.product-img').show().lazyload({
    effect: "fadeIn",
    // effectspeed: 600
  });

});
