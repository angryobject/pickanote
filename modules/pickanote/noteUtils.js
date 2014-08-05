'use strict';

var notes = {
    'A': 0,
    'B': 2,
    'C': 3,
    'D': 5,
    'E': 7,
    'F': 8,
    'G': 10
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
        i += 12 * (aNote.octave - 1);
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
