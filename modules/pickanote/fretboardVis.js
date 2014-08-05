'use strict';

var fretboard = require('./fretboard');

var numFrets = 23;
var tuning = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'];

function _create(positions, startFret, stopFret) {
    var i, j;

    var frets = '<div class="fretboard">';

    frets += '<span class="fretboard-row">';
    for (i = startFret; i <= stopFret; i += 1) {
        frets += '<span class="fretboard-item">' + i + '</span>';
    }
    frets += '</span>';

    for (i in tuning) {
        frets += '<span class="fretboard-row">';

        if (startFret === 0) {
            j = 1;
            frets += '<span class="fretboard-item">' + tuning[i]+ '</span>';
        } else {
            j = startFret;
        }

        for ( ; j <= stopFret; j += 1) {
            if (positions[i].indexOf(j) > -1) {
                frets += '<span class="fretboard-item fretboard-item--active"></span>';
            } else {
                frets += '<span class="fretboard-item"></span>';
            }
        }

        frets += '</span>';
    }

    frets += '</div>';

    return frets;
}

function create(aNote) {
    var positions = fretboard.getNotePositions(aNote, tuning, numFrets);

    return _create(positions, 0, 11) + _create(positions, 12, numFrets);
}

module.exports = {
    create: create
};
