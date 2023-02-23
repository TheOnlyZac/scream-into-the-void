'use strict'
import { Options } from './options.js';

var animating = false;
var textFadeDelay = 1000;
var voidInput, voidText;

$(document).ready(function() {
    let options = new Options();
    console.log(options.getOptions());

    voidInput = document.getElementById('voidInput');
    voidText = document.getElementById('voidText');

    // display default message
    typeIn('scream into the void');

    // handle special keypress cases
    document.addEventListener('keydown', function(e) {
        var key = e.key;

        // ignore keypress if animation in progress or popup open
        if (animating || currPopup != 'none') return;

        // reset the autofade timer
        textFadeDelay = options.getOption('autofadeTime') * 1000;

        // fade now if return key pressed
        if (key === 'Enter') {
            e.preventDefault();
            fadeVoidText();
        }
        
    });

    // every 100ms, decrease the timer by 100ms and check if it's 0
    var countdownInterval = setInterval(function() {
        // if autofade is disabled, reset the timer and return
        if (!options.getOption('autofade')) {
            textFadeDelay = options.getOption('autofadeTime') * 1000;
            return;
        }
        
        // decrease the timer by 100ms
        textFadeDelay -= 100;
        if (textFadeDelay < 0) textFadeDelay = 0;
        
        // if the counter is 0 and not already animating, fadeout the void text
        if (textFadeDelay === 0 && voidInput.innerHTML.length > 0 && !animating) {
            textFadeDelay = 0;
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
            textFadeDelay = 1000;
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
    let time = 0;
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

    }
    
    // set timeout to clear the void text after the last character has faded out
    setTimeout(function() {
        // clear the void text
        $('.voidChar').remove();
        animating = false;

        // show the void input and focus on it
        $(voidText).hide();
        $(voidInput).show();
        
        // if there is no popup open, focus on the void input
        if (currPopup === 'none') {
            $(voidInput).focus();
        }
    }, spans.length * (time/spans.length) + 1000);
}
