var animating = false,
countdown = 1000,
cursorVisible = true,
voidText, cursor,
cursorInterval;

$(document).ready(function() {
    console.log('dom init');
    voidText = document.getElementById('void');
    cursor = document.getElementById('cursor');

    // display default message
    voidType('scream into the void');

    document.addEventListener('keydown', function(e) {
        var keycode = e.keyCode;
        console.log(keycode);

        // ignore if animation in progress
        if (animating) return;

        // reset the countdown to 1 sec
        countdown = 1000;

        // handle backspace key
        if (keycode === 8) {
            $('#cursor').prev().remove();
        }

        // handle return key
        if (keycode === 13) {
            contdown = 0;
            fadeVoidText();
        }
        
        // unprintable character
        if (e.key.length != 1) return;

        // all good, print the char
        putChar(e.key);
    });

    // every 100ms, decrease the timer by 100ms and check if 0
    var countdownInterval = setInterval(function() {
        countdown -= 100;
        if (countdown < 0) countdown = 0;

        // if the counter is 0 and not already animating, fadeout the void text
        if (countdown === 0 && voidText.children.length > 1 && !animating) {
            countdown = 0;
            fadeVoidText();
        }
    }, 100);

    cursorInterval = setInterval(blinkCursor, 1000);
});

function putChar(char) {
    // reset the countdown to 1 sec
    countdown = 1000;
    
    // create span container for new letter
    let span = document.createElement('span');
    $(span).addClass('voidChar');

    // append char to new span
    span.appendChild(document.createTextNode(char));
    
    // append new span to void text element
    cursor.before(span);
}

function putCursor() {
    console.log('putting cursor');
    if (cursor) return;

    cursor = document.createElement('span');
    cursor.appendChild(document.createTextNode('|'));
    $(cursor).setAttr('id', 'cursor');
    voidText.appendChild(cursor);
}

function blinkCursor() {
    if (!cursor) { putCursor(); }
    else if (cursorVisible) {
        cursor.style.opacity = 0;
        cursorVisible = false;
    } else {
        cursor.style.opacity = 1;
        cursorVisible = true;
    }
}

function voidType(text) {
    var charSplit = Array.from(text);
    for (let i = 0; i < charSplit.length; i++) {
        setTimeout(function() {
            putChar(charSplit[i]);
        }, i * 100);
    }
}

function fadeVoidText() {
    console.log('fading');
    // hide the cursor
    $(cursor).addClass('hidden');

    // fade out the voidtext 1 char at a time
    var spans = Array.from(document.getElementsByClassName('voidChar')),
    fadeTime;

    // set fadeout time to num of chars * 100ms, with a max of 2000ms (2s)
    if (spans.length <= 20) time = spans.length * 100;
    else time = 2000;

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
        console.log('finishing');
        $('.voidChar').remove();
        animating = false;
        clearInterval(cursorInterval);
        cursorInterval = setInterval(blinkCursor, 1000);
        $(cursor).removeClass('hidden');
    }, spans.length * (time/spans.length) + 1000);
}