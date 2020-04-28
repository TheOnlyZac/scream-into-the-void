var currPopup = 'none';

$(document).ready(function() {

	$('.about-btn').click(function() {
		if (currPopup === 'about') {
			closePopups();
			return;
		}
		closePopups();
		$('.about-popup').fadeIn();
		blur();
		currPopup = 'about';
	});

	$('.options-btn').click(function() {
		if (currPopup === 'options') {
			closePopups();
			return;
		}
		closePopups();
		$('.options-popup').fadeIn();
		blur();
		currPopup = 'options';
	});

	$('.close-btn').click(function() {
		closePopups();
	})
});

function closePopups() {
	$('.popup').fadeOut();
	currPopup = 'none';
}