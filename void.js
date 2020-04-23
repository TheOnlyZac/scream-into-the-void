var animating = false,
countdown = 1000,
voidInput, voidText;

$(document).ready(function() {
    voidInput = document.getElementById('voidInput');
    voidText = document.getElementById('voidText');

    // display default message
    voidType('scream into the void');

    document.addEventListener('keydown', function(e) {
        var keycode = e.keyCode;
        console.log(keycode);

        // ignore if animation in progress
        if (animating) return;

        // reset the countdown to 1 sec
        countdown = 2000;

        // handle return key
        if (keycode === 13) {
            e.preventDefault();
            contdown = 0;
            fadeVoidText();
        }
        
    });

    // every 100ms, decrease the timer by 100ms and check if 0
    var countdownInterval = setInterval(function() {
        countdown -= 100;
        if (countdown < 0) countdown = 0;
        $(voidInput).focus();
        
        // if the counter is 0 and not already animating, fadeout the void text
        if (countdown === 0 && voidInput.innerHTML.length > 0 && !animating) {
            countdown = 0;
            fadeVoidText();
        }
    }, 100);

});

function putChar(char) {
    // create span container for new letter
    let span = document.createElement('span');
    $(span).addClass('voidChar');

    // append char to new span
    span.appendChild(document.createTextNode(char));
    
    // append new span to void text element
    voidText.appendChild(span);
}

function voidType(text) {
    var charSplit = Array.from(text);
    for (let i = 0; i < charSplit.length; i++) {
        setTimeout(function() {
            countdown = 1000;
            voidInput.appendChild(document.createTextNode(charSplit[i]));
        }, i * 100);
    }
}

function fadeVoidText() {
    // enable animating flag and disallow input
    animating = true;

    // fade out the voidtext 1 char at a time
    var chars = Array.from(document.getElementById('voidInput').innerHTML),
    fadeTime;

    chars.forEach(c => {
        putChar(c);
    });

    var spans = Array.from(document.getElementById('voidText').children);

    $(voidInput).hide();
    $(voidText).show();
    voidInput.innerHTML = '';

    // set fadeout time to num of chars * 100ms, with a max of 2000ms (2s)
    if (spans.length <= 30) time = spans.length * 100;
    else time = 3000;

    // set animating to true to disallow user input
    animating = true;

    // iterate over each character
    for (let i = 0; i < spans.length; i++) {
        // fadeout each character 100ms apart
        setTimeout(function() {
            $(spans[i]).animate({opacity: 0}, 1000);
        }, i * (time/spans.length));

        // if this is the last character, clear the void text and set animation false
    }

    setTimeout(function() {
        $('.voidChar').remove();
        animating = false;

        $(voidText).hide();
        $(voidInput).show();
    }, spans.length * (time/spans.length) + 1000);
}