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
        else if (keycode === 13) voidText.appendChild(document.createTextNode('\n'));
        
        // can't print
        if (e.key.length != 1  || animating) return;

        // create container for new letter
        let span = document.createElement('span'),
        char = e.key;

        // append container to void text
        span.appendChild(document.createTextNode(char));
        
        /* setInterval(function() {
            $(span).fadeOut();
        }, 1000); */

        voidText.appendChild(span);
    })

    setInterval(function() {
        countdown -= 100;
        if (countdown < 0) countdown = 0;
        console.log(countdown);

        if (countdown === 0 && voidText.children.length > 0 && !animating) {
            countdown = 0;
            fadeVoidText();
        }
    }, 100);
})

function fadeVoidText() {
    var spans = Array.from(document.getElementById('void').children),
    fadeTime;

    if (spans.length <= 20) time = spans.length * 100;
    else time = 2000;

    for (let i = 0; i < spans.length; i++) {
        animating = true;
        setTimeout(function() {
            $(spans[i]).animate({opacity: 0}, 1000);
        }, i * (time/spans.length));

        if (i === spans.length-1) {
            setTimeout(function() {
                $('#void').empty();
                animating = false;
            }, i * (time/spans.length) + 1000);
        }
    }
}