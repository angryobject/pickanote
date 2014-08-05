'use strict';

var notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
var alterations = ['', '♯', '♭', '♯♯', '♭♭'];
var maxOctaveNum = 8; // zero-based

var defaults = {
    alterations: true,
    doubleAlterations: false,
    octaves: false,
                        //0    //1    //2   //3   //4   //5   //6   //7    //8
    octavesEnabled: [false, false, true, true, true, true, true, false, false] // standard guitar range
};

var proto = {
    generate: function () {
        var aNote = randomNoteSymbol();

        if (this.settings.octaves) {
            aNote += randomOctaveSymbol(this.settings.octavesEnabled);
        }

        if (this.settings.alterations) {
            aNote += randomAlterationSymbol(this.settings.doubleAlterations);
        }

        return aNote;
    }
};

function randomNoteSymbol() {
    return notes[random(notes.length)];
}

function randomOctaveSymbol(octaves) {
    var octaveIndexes = [];
    var i;

    for (i = 0; i <= maxOctaveNum; i += 1) {
        if (octaves[i]) {
            octaveIndexes.push(i);
        }
    }

    i = octaveIndexes[random(octaveIndexes.length)];

    return i;
}

function randomAlterationSymbol(doubles) {
    var i = doubles ?
            alterations.length : alterations.length - 2;

    return alterations[random(i)];
}

function random(max) {
    return Math.floor(Math.random() * max);
}

function mixin() {
    var args = [].slice.apply(arguments),
        dest, source,
        l = args.length - 1;

    function copyProperty(i) {
        if (dest[i] != null) {
            return;
        }

        if (typeof source[i] === 'object') {
            if(Array.isArray(source[i])) {
                dest[i] = [];
            } else {
                dest[i] = {};
            }

            mixin(dest[i], source[i]);
        } else {
            dest[i] = source[i];
        }
    }

    while(l > 0) {
        source = args[l];
        dest = args[l - 1];

        Object.keys(source).forEach(copyProperty);

        l -= 1;
    }

    return dest;
}

function randomNoteGenerator(settings) {
    var gen = Object.create(proto);

    gen.settings = mixin(settings || {}, defaults);

    return gen;
}

module.exports = {
    create: randomNoteGenerator,
    randomNoteSymbol: randomNoteSymbol,
    randomOctaveSymbol: randomOctaveSymbol,
    randomAlterationSymbol: randomAlterationSymbol,
    defaults: defaults
};
