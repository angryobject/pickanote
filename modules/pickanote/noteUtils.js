'use strict';

var notes = {
    'C': 0,
    'D': 2,
    'E': 4,
    'F': 5,
    'G': 7,
    'A': 9,
    'B': 11
};

var alterations = {
    '♯': 1,
    '♭': -1,
    '♯♯': 2,
    '♭♭': -2
};

function splitNoteIntoParts(aNote) {
    var parts = /^([A-G])(\d)?(♯{1,2}?|♭{1,2})?$/.exec(aNote);

    if(!parts) {
        throw new Error('Invalid note format');
    }

    return {
        base: parts[1],
        octave: parts[2] || null,
        alteration: parts[3] || null
    };
}

function noteToNumber(aNote) {
    var i;

    if (typeof aNote === 'string') {
        aNote = splitNoteIntoParts(aNote);
    }

    i = notes[aNote.base];

    if (aNote.octave) {
        i += 12 * aNote.octave;
    }

    if(aNote.alteration) {
        i += alterations[aNote.alteration];
    }

    return i;
}

module.exports = {
    noteToNumber: noteToNumber,
    splitNoteIntoParts: splitNoteIntoParts
};
