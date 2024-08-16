// Banner Slide (index.html)
var swiper = new Swiper(".bannerSwiper", {
    centeredSlides: true,
    loop:true,
      autoplay: {
        delay: 10000,
        disableOnInteraction: false,
      },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  
//  Popular Menu SLide (index.html)
var swiper = new Swiper(".popularMenu", {
  slidesPerView: 1,
      spaceBetween: 30,
  centeredSlides: true,
  loop:true,
      autoplay: {
        delay: 7000,
        disableOnInteraction: false,
      },
    pagination: {
      clickable: true,
      el: ".swiper-pagination",
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
    },
  });


  // Chef Slide (index.html)
var swiper = new Swiper(".chefMember", {
  slidesPerView: 1,
      spaceBetween: 1,
  centeredSlides: true,
  loop:true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    breakpoints: {
      768: {
        slidesPerView: 5,
      },
    },
  });


// Testimonial Slide (index.html)
var swiper = new Swiper(".ourTestimonial", {
  slidesPerView: 1,
      spaceBetween: 5,
  centeredSlides: true,
  loop:true,
      autoplay: {
        delay: 7000,
        disableOnInteraction: false,
      },
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
    },
  });







