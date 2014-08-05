'use strict';

var noteUtils = require('./noteUtils');

var defaultNumFrets = 24;
var defaultTuning = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'];

function getNotePositions(aNote, tuning, numFrets) {
    var positions = [];

    tuning = tuning || defaultTuning;
    numFrets = numFrets || defaultNumFrets;

    aNote = noteUtils.splitNoteIntoParts(aNote);

    var i;
    var notePos, tuningPos, fretPos;

    for (i in tuning) {
        positions[i] = [];

        notePos = noteUtils.noteToNumber(aNote);
        tuningPos = noteUtils.noteToNumber(tuning[i]);

        while (notePos <= (tuningPos + numFrets)) {
            fretPos = notePos - tuningPos;

            if (fretPos >= 0) {
                positions[i].push(fretPos);
            }

            if(aNote.octave) {
                break;
            } else {
                notePos += 12;
            }
        }
    }

    return positions;
}

module.exports = {
    getNotePositions: getNotePositions
};
