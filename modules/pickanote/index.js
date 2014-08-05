'use strict';

require('./shim');

var noteGenerator = require('./randomNoteGenerator').create();
var fretboardVis = require('./fretboardVis');

var pickButton = document.getElementById('pickanote');
var octavesSwitch = document.getElementById('octavesswitch');
var fretboardSwitch = document.getElementById('fretboardswitch');
var fretboard = document.getElementById('fretboard');

function init() {
    addListeners();
}

function addListeners() {
    pickButton.addEventListener('click', newNote, false);
    octavesSwitch.addEventListener('change', onOctavesSwitchChange, false);
    fretboardSwitch.addEventListener('change', onFretboardSwitchChange, false);
}

function onOctavesSwitchChange() {
    noteGenerator.settings.octaves = octavesSwitch.checked;
}

function onFretboardSwitchChange() {
    if (fretboardSwitch.checked) {
        fretboard.classList.remove('u-dn');
    } else {
        fretboard.classList.add('u-dn');
    }
}

function newNote() {
    var aNote = noteGenerator.generate();
    pickButton.innerHTML = '<span class="note">' + aNote + '</span>';
    fretboard.innerHTML = fretboardVis.create(aNote);
}

init();
