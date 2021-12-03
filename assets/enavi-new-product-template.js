  // new product page js //
$(document).ready(function(){

  // content for mobile layout //

  let title_content = $('.product-single__title').wrap('<span class="product-single__title-js"/>').parent().html();
  let price_content = $('.price-review-wrapper').wrap('<span class="price-review-wrapper-js" />').parent().html();
  let upsell_content = $('.upsell-product-wrapper').length > 0 ? $('.upsell-product-wrapper').wrap('<span class="upsell-product-wrapper-js" />').parent().html() : '';
  let shortdescription_content = $('.short-description').length > 0 ? $('.short-description').wrap('<span class="short-description-js" />').parent().html() : '';
  let upsell_product_title = $('.upsell-product-title') .length > 0 ? $('.upsell-product-title').wrap('<span class="upsell-product-title-js" />').parent().html() : '';
  if($(window).width() <= 768){
    $('.product-single__title,.price-review-wrapper,.product-single__title-js,.price-review-wrapper-js,.upsell-product-wrapper,.upsell-product-wrapper-js,.short-description,.short-description-js').remove();
    $('.product-main-image').prepend(title_content+price_content);
    $('.product-right-content').append(shortdescription_content+upsell_content);
    $('.upsell-product-title,.upsell-product-title-js').remove();
    $('.left-upsell-wrapper').prepend(upsell_product_title);
  }
  $(window).resize(function(){
    if($(window).width() <= 768){
      $('.product-single__title,.price-review-wrapper,.product-single__title-js,.price-review-wrapper-js,.upsell-product-wrapper,.upsell-product-wrapper-js,.short-description,.short-description-js').remove();
      $('.product-main-image').prepend(title_content+price_content);
      $('.product-right-content').append(shortdescription_content+upsell_content);
      $('.upsell-product-title,.upsell-product-title-js').remove();
      $('.left-upsell-wrapper').prepend(upsell_product_title);
    }
    else{
      $('.product-single__title,.price-review-wrapper,.upsell-product-wrapper,.short-description,.upsell-product-titl').remove();
      $('.product-right-content').prepend(title_content+price_content+shortdescription_content);
      $('.product-main-image').append(upsell_content);
      $('.upsell-product-title,.upsell-product-title-js').remove();
      $('.upsell-benefit-content .right-benefits-wrapper').prepend(upsell_product_title);
    }
  })

  // content for mobile layout //

  $('.product-star').click(function(){
    $(this).toggleClass('active-star');
  })

  // accordions //
  $(document).on('click','.accordion-btn', function(){
    let elem = $(this);
    elem.toggleClass('accordion-open');
    $('.'+elem.attr('data-target')).slideToggle(500,'', function(){
      $('.'+elem.attr('data-target')).toggleClass('accordion-open-content');
    });
  })
  // accordions //
  $('.video-play-icon').click(function(){
    $( '.product-main-slider' ).slick('slickGoTo',parseInt($('.video-media').attr('data-slick-index')));
  })
  $('.shipping-zip-wrapper').on('click','.current-zip',function(){
    $('.change-zip-btn').click();
    $('.narvar-shipping-content').show();
    $('.normal-shipping-content').hide();
  })
  $('.narvar-close').click(function(){
    $('.normal-shipping-content').show();
    $('.narvar-shipping-content').hide();
  })
  $("body").on('DOMSubtreeModified', ".affirm-as-low-as", function() {
    if($('.affirm-ala-price').html() == undefined){
      $('.affirm-widget').hide();
    }
    else{
      $('.affirm-widget').show();
      $('.product-affirm-price').html($('.affirm-ala-price').html()+'/month');
    }
  });
  
})
  // new product page js //