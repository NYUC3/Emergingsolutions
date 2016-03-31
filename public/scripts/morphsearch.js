(function() {
	var morphSearch = document.getElementById( 'morphsearch' ),
	  	input = morphSearch.querySelector( 'input.morphsearch-input' ),
	  	ctrlClose = morphSearch.querySelector( 'span.morphsearch-close' ),
	  	isOpen = isAnimating = false;
	
	// Show or hide search overlay.
	var toggleSearch = function(evt) {
	  // Return immediately if already opened and focus the input.
	  if(evt.type.toLowerCase() === 'focus' && isOpen) return false;

    var offsets = morphsearch.getBoundingClientRect();
    if(isOpen) {
    	$('body').removeClass('of-hidden');
      $('#morphsearch').removeClass('open');

      // The following is a trick to hide input text once the search overlay closes. 
      // Note: Times are hardcoded, but should be done after transition ends.
      if(input.value !== '') {
        setTimeout(function() {
          $('#morphsearch').addClass('hideInput');
          setTimeout(function() {
            $('#morphsearch').removeClass('hideInput');
            input.value = '';
          }, 300);
        }, 500);
      }
      
      input.blur();
    }
    else {
    	window.scrollTo(0, 0);
      $('#morphsearch').addClass('open');
      $('body').addClass('of-hidden');
    }
    isOpen = !isOpen;
  };

	// Events.
	input.addEventListener('focus', toggleSearch);
	ctrlClose.addEventListener('click', toggleSearch);

	// Close search overlay with ESC key and allow keyboard navigation events.
	document.addEventListener('keydown', function(evt) {
	  var keyCode = evt.keyCode || evt.which;
	  if(keyCode === 27 && isOpen) {
	    toggleSearch(evt);
	  }
	});

	/***** This prevents the submission of the form! *****/
	morphSearch.querySelector('button[type="submit"]').addEventListener('click', function(evt) { evt.preventDefault(); });
}());