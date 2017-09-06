/**
 * Created by XmacZone on 2017/9/6.
 */
$(function() {
    $('.avatar').hover(function() {
      $(this).addClass('animated jello');
    },function() {
        $(this).removeClass('animated jello');
    })

});