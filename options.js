class Options {
    constructor() {
        // set default options
        this.options = {
            invert: false,
            autofade: true,
            autofadeTime: 2,
        }

        // load options from local storage
        this.loadOptions();

        // set options in html
        $('#opt-invert').prop('checked', this.getOption('invert'));
        $('#opt-autofade').prop('checked', this.getOption('autofade'));
        $('#opt-autofadeTime').val(this.getOption('autofadeTime'));
        
        // if inverted option is true, add inverted class to html
        if (this.getOption('invert')) {
            $('html').addClass('inverted');
        }

        // add event handlers
        this.addEventHandlers();
    }

    // add event handlers
    addEventHandlers() {
        // invert checkbox
        $('#opt-invert').change((e) => {
            this.setOption('invert', $(e.target).prop('checked'));
            if (this.getOption('invert')) {
                $('html').addClass('inverted');
            } else {
                $('html').removeClass('inverted');
            }
        }).bind(this);

        // autofade checkbox
        $('#opt-autofade').change((e) => {
            this.setOption('autofade', $(e.target).prop('checked'));
        }).bind(this);

        // autofade time input
        $('#opt-autofadeTime').change((e) => {
            this.setOption('autofadeTime', $(e.target).val());
        }).bind(this);
    }
    
    // get an option's current value
    getOption(option) {
        return this.options[option];
    }

    // get all options
    getOptions() {
        return this.options;
    }

    // set an option to the given value
    setOption(option, value) {
        console.log(option, value)
        this.options[option] = value;
        this.saveOptions();
    }

    // save options to local storage
    saveOptions() {
        localStorage.setItem('options', JSON.stringify(this.options));
    }

    // load options from local storage
    loadOptions() {
        let options = localStorage.getItem('options');
        if (options) {
            this.options = JSON.parse(options);
        }
    }
}

export { Options };
