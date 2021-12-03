var embed_klaviyo = false;
if($('body').hasClass('enavi-klaviyo-embed')){
  embed_klaviyo = true;
}
$(document).ready(function(){
  $('.enavi-backinstock-trigger').click(function(){
    if(!embed_klaviyo){
      $('.enavi-klaviyo-success,.enavi-klaviyo-error').hide();
      var modal = new theme.Modals($(this).attr('data-target'), $(this).attr('data-target')+'-modal');
      modal.open();
    }
  })
  $('#enavi-backinstock .modal-close').click(function(){
    $('.enavi-klaviyo-success,.enavi-klaviyo-error').hide();
    $('#enavi-backinstock .modal__close').click();
  })
  $('.enavi-demo-button').click(function(){
    $('.enavi-klaviyo-submit').click();
  })
  $('.enavi-klaviyo-submit').click(function(e){
    e.preventDefault();
    var email = $('.enavi-input.email-field').val();
    if(ValidateEmail(email) == true){
      $.ajax({
        type : 'POST',
        url : 'https://enavi-klaviyo-bridge.herokuapp.com/',
        data : $('.enavi-klaviyo-form').serialize(),
        success:function(response){
          if(response.success){
            $('.enavi-klaviyo-error,.enavi-klaviyo-email-error').hide();
            $('.enavi-klaviyo-success').show();
          }
          else{
            $('.enavi-klaviyo-success').hide();
            $('.enavi-klaviyo-error .error-text').text('Something went wrong').parent().show();
          }
        },
        error:function(error){
          $('.enavi-klaviyo-success').hide();
          $('.enavi-klaviyo-error .error-text').text('Something went wrong').parent().show();
        }
      })
    }
    else{
      $('.enavi-klaviyo-success').hide();
      $('.enavi-klaviyo-email-error').text(ValidateEmail(email)).show();	
    }
  })
  if($('.enavi-klaviyo-stock-date').hasClass('enavi-current-unavailable')){
    var stock_Day = parseInt($('.enavi-dropdown option:selected').attr('data-stock-date'));
    var stock_Month = parseInt($('.enavi-dropdown option:selected').attr('data-stock-month').slice(-1));
    var stock_Date = parseInt($('.enavi-dropdown option:selected').attr('data-stock-day'));
    if( stock_Day > 0 && stock_Day <= 30 ){
      $('.enavi-klaviyo-stock-date').show()
      $('.enavi-klaviyo-stock-date').text('*Estimated Back In Stock - '+GetMonthName(stock_Month)+' '+ stock_Date+'th')
    }
  }
})
function ValidateEmail(mail) 
{
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    if(!mail.includes("+"))return true
    else return 'Email cannot include +.';
  }
  return 'Email is not valid.';
}
document.addEventListener("DOMContentLoaded", function(){
  function usePushState(handler){
    //modern themes use pushstate to track variant changes without reload
    function track (fn, handler, before) {
      return function interceptor () {
        if (before) {
          handler.apply(this, arguments);
          return fn.apply(this, arguments);
        } else {
          var result = fn.apply(this, arguments);
          handler.apply(this, arguments);
          return result;
        }
      };
    }
    var currentVariantId = null;
    function variantHandler () {
      var selectedVariantId = window.location.search.replace(/.*variant=(\d+).*/, "$1");
      if(!selectedVariantId) return;
      if(selectedVariantId != currentVariantId){
        currentVariantId = selectedVariantId;
        handler(selectedVariantId);
      }
    }
    // Assign listeners
    window.history.pushState = track(history.pushState, variantHandler);
    window.history.replaceState = track(history.replaceState, variantHandler);
    window.addEventListener("popstate", variantHandler);
  }
  usePushState(function(variantId){
    $('.enavi-klaviyo-stock-date').hide()
    $('.enavi-backinstock-trigger').hide();
    $('.klaviyo-message').hide();
    if(embed_klaviyo){
      $('.add-to-cart').show();
    }
    $('.enavi-hidden-variant option').each(function(){
      if($(this).attr('value') == variantId && $(this).attr('data-available') == 'false'){
        if(embed_klaviyo){
          $('.add-to-cart').hide();
        }
        $('.enavi-backinstock-trigger').show();
        $('.enavi-dropdown').val(variantId).change();
        var stock_Day = parseInt($('.enavi-dropdown option:selected').attr('data-stock-date'));
        var stock_Month = parseInt($('.enavi-dropdown option:selected').attr('data-stock-month').slice(-1));
        var stock_Date = parseInt($('.enavi-dropdown option:selected').attr('data-stock-day'));
        if( stock_Day > 0 && stock_Day <= 30 ){
           $('.enavi-klaviyo-stock-date').show()
        	$('.enavi-klaviyo-stock-date').text('*Estimated Back In Stock - '+GetMonthName(stock_Month)+' '+ stock_Date+'th')
        }
      }
    })
  });
});
function GetMonthName(monthNumber) {
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      return months[monthNumber-1];
}