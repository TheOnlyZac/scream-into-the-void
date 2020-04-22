var animating = false,
counter;

$(document).ready(function() {
    var voidText = document.getElementById('void'),
    countdown = 0;

    document.addEventListener('keydown', function(e) {
        var keycode = e.keyCode;

        // handle backspace
        if (keycode === 8) voidText.removeChild(voidText.lastChild);
        
        // can't print
        if (e.key.length != 1  || animating) return;

        // set fade delay to 2s
        countdown = 1000;

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
    console.log('fading');
    var spans = Array.from(document.getElementById('void').children),
    d = jQuery.Deferred();

    for (let i = 0; i < spans.length; i++) {
        animating = true;
        setTimeout(function() {
            $(spans[i]).animate({opacity: 0}, 1000);
        }, i * 100);

        if (i === spans.length-1) {
            setTimeout(function() {
                console.log('finishing');
                $('#void').empty();
                animating = false;
            }, i * 100 + 1000);
        }
    }
}