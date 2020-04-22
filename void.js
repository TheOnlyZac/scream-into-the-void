var animating = false,
counter;

$(document).ready(function() {
    var voidText = document.getElementById('void'),
    countdown = 0;

    document.addEventListener('keydown', function(e) {
        var keycode = e.keyCode;

        // set fade delay to 2s
        countdown = 1000;

        // handle backspace
        if (keycode === 8) voidText.removeChild(voidText.lastChild);

        // handle return
        if (keycode === 13) {
            contdown = 0;
            fadeVoidText();
        }
        
        // can't print, invalid character or currently animating
        if (e.key.length != 1  || animating) return;

        // create span container for new letter
        let span = document.createElement('span'),
        char = e.key;

        // append container to void text
        span.appendChild(document.createTextNode(char));
        
        /* setInterval(function() {
            $(span).fadeOut();
        }, 1000); */

        voidText.appendChild(span);
    })

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