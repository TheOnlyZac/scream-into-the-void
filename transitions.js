var currPopup = 'none';

$(document).ready(function() {

	$('.about-btn').click(function() {
		if (currPopup === 'about') {
			closePopups();
			return;
		}
		closePopups();
		$('.about-popup').fadeIn();
		currPopup = 'about';
	});

	$('.options-btn').click(function() {
		if (currPopup === 'options') {
			closePopups();
			return;
		}
		closePopups();
		$('.options-popup').fadeIn();
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