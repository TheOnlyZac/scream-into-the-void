var animating = false,
countdown = 1000,
voidText;

$(document).ready(function() {
    voidText = document.getElementById('void');

    voidType('scream into the void');

    document.addEventListener('keydown', function(e) {
        var keycode = e.keyCode;

        // handle backspace
        if (keycode === 8) voidText.removeChild(voidText.lastChild);

        // handle return
        if (keycode === 13) {
            contdown = 0;
            fadeVoidText();
        }
        
        // can't print, invalid character or currently animating
        if (e.key.length != 1  || animating) return;

        putChar(e.key);
    });

    // every 100ms, decrease the timer by 100ms and check if 0
    setInterval(function() {
        countdown -= 100;
        if (countdown < 0) countdown = 0;

        // if the counter is 0 and not already animating, fadeout the void text
        if (countdown === 0 && voidText.children.length > 0 && !animating) {
            countdown = 0;
            fadeVoidText();
        }
    }, 100);

})

function putChar(char) {
    // reset the countdown to 1 sec
    countdown = 1000;

    // create span container for new letter
    let span = document.createElement('span');

    // append char to new span
    span.appendChild(document.createTextNode(char));
    
    // append new span to void text element
    voidText.appendChild(span);
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
    // fade out the voidtext 1 char at a time
    var spans = Array.from(document.getElementById('void').children),
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
        if (i === spans.length-1) {
            setTimeout(function() {
                $('#void').empty();
                animating = false;
            }, i * (time/spans.length) + 1000);
        }
    }
}