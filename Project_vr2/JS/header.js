// .gnb-item hover시 sub-menu slide up & down
$('.gnb-item').hover(function(){
  $(this).find('.sub').stop().slideDown(500);
}, function(){
  $(this).find('.sub').stop().slideUp(500);
})