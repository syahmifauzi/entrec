$(document).foundation();

$(document).ready(function() {

  $(window).scroll(function() {
    onScroll();
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


  // Active Nav on Scroll
  function onScroll() {
    var navHeight = $('#site-nav.active-state').outerHeight(),
        scrollPos = $(document).scrollTop() + navHeight;
    $('#site-nav ul li a').each(function() {
      var currLink   = $(this),
          refElement = $(currLink.attr('href')),
          refElePos  = refElement.position().top;
      if (refElePos <= scrollPos && refElePos + refElement.height() > scrollPos) {
        $('#site-nav ul li a').removeClass('active').removeAttr('class');
        currLink.addClass('active');
      }
    });
  }


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
