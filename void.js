var animating = false;
var fadeoutDelay = 1000;
var isAutofadeEnabled = true;
var autofadeTimer = 2000;
var voidInput, voidText;

$(document).ready(function() {
    voidInput = document.getElementById('voidInput');
    voidText = document.getElementById('voidText');

    // display default message
    typeIn('scream into the void');

    // handle special keypress cases
    document.addEventListener('keydown', function(e) {
        var keycode = e.keyCode;

        // ignore keypress if animation in progress or popup open
        if (animating || currPopup != 'none') return;

        // reset the autofade timer
        fadeoutDelay = autofadeTimer;

        // fade now if return key pressed
        if (keycode === 13) {
            e.preventDefault();
            contdown = 0;
            fadeVoidText();
        }
        
    });

    // every 100ms, decrease the timer by 100ms and check if it's 0
    var countdownInterval = setInterval(function() {
        fadeoutDelay -= 100;
        if (fadeoutDelay < 0) fadeoutDelay = 0;

        if (currPopup === 'none') {
            $(voidInput).focus();
        }
        
        // if the counter is 0 and not already animating, fadeout the void text
        if (fadeoutDelay === 0 && voidInput.innerHTML.length > 0 && !animating) {
            fadeoutDelay = 0;
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

function typeIn(text) {
    var charSplit = Array.from(text);
    for (let i = 0; i < charSplit.length; i++) {
        setTimeout(function() {
            // Add the next character to the input
            fadeoutDelay = 1000;
            voidInput.appendChild(document.createTextNode(charSplit[i]));

            // Set the caret to the end of the input
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(voidInput);
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }, i * 100);
    }
}

function fadeVoidText() {
    // enable animating flag and disallow input
    animating = true;

    // fade out the voidtext 1 char at a time
    var chars = Array.from(voidInput.innerHTML.replace(/&nbsp;/g,' ')),
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