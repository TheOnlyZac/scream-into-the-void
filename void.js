$(document).ready(function() {
    let voidText = document.querySelector('.void');

    document.addEventListener('keydown', function(e) {
        var keycode = e.keyCode;

        // handle backspace
        if (keycode === 8) voidText.removeChild(voidText.lastChild);
        
        // not printable
        if (e.key.length != 1) return;

        // create container for new letter
        let span = document.createElement('span'),
        char = e.key;

        // append container to void text
        span.appendChild(document.createTextNode(char));
        
        setInterval(function() {
            $(span).fadeOut();
        }, 1000);

        voidText.appendChild(span);
    })
})