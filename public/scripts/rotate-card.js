function rotateCard(target){
  var $card = $(target).closest('.card-container');
  if($card.hasClass('hover')) {
      $card.removeClass('hover');
  } else {
      $card.addClass('hover');
  }
}