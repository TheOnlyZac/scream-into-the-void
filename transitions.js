// todo: encapsulate in a class

var POPUP_FADE_TIME = 250;
var currPopup = 'none';

$(document).ready(function() {
	// open about popup when button is clicked
	$('.about-btn').click(function() {
		// if already open, close it
		if (currPopup === 'about') {
			closePopups();
			return;
		}

		// otherwise, open it
		closePopups();
		$('.about-popup').fadeIn(POPUP_FADE_TIME);
		blur();
		currPopup = 'about';

		// reset scroll position
		$('.about-popup').scrollTop(0);

		// focus on close button
		$('.about-close-btn').focus();
	});

	// open options popup when button is clicked
	$('.options-btn').click(function() {
		// if already open, close it
		if (currPopup === 'options') {
			closePopups();
			return;
		}

		// otherwise, open it
		closePopups();
		$('.options-popup').fadeIn(POPUP_FADE_TIME);
		blur();
		currPopup = 'options';

		// reset scroll position
		$('.options-popup').scrollTop(0);

		// focus on close button
		$('.options-close-btn').focus();
	});

	// close popups when close button is clicked
	$('.close-btn').click(function() {
		closePopups();
	});

	// focus on void input when body is clicked except for buttons
	$('body').click(function(e) {
		if (!$(e.target).is('button') && currPopup === 'none') {
			$('#voidInput').focus();
		}
	});
});

function closePopups() {
	$('.popup').fadeOut(POPUP_FADE_TIME);
	currPopup = 'none';
}