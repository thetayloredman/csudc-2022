/*
   CSUDC 2022 - Logan Devine, Lily Madison, and Kendra Mottern
    Copyright (C) 2021, 2022  Logan Devine, Lily Madison, Kendra Mottern
    This program comes with ABSOLUTELY NO WARRANTY; for details type `show w'.
    This is free software, and you are welcome to redistribute it
    under certain conditions; type `show c' for details.
*/

let version = 'v0.163.0'

$('#core').css('display', 'block');

// Start the color test.
function startColorTest() {
    console.log('begin color test and clear welcome blocks');
    $('#core').empty();
    pageColorTo('black');
    $('#core').append($(`
        <button id="triggerStart" onclick="startColorRed()">Start</button>
    `));
}

let results = { fullScreen: {} }

let redActive = true;
let redI = 0;

function startColorRed() {
    replaceTriggerStart('redOver()');
    let rep = (i) => {
        if (!redActive) return;
        if (i === 254) { redOver(); return; }
        pageColorToRGB(i, 0, 0);
        redI++;
        setTimeout(() => rep(++i), 500);
    }
    rep(0);
}

function redOver() {
    redActive = false;
    results.fullScreen.red = redI;
    pageColorTo('black');
    resetPage('startColorGreen()');
}

let greenActive = true;
let greenI = 0;

function startColorGreen() {
    replaceTriggerStart('greenOver()');
    let rep = (i) => {
        if (!greenActive) return;
        if (i === 254) { greenOver(); return; }
        pageColorToRGB(0, i, 0);
        greenI++;
        setTimeout(() => rep(++i), 500);
    }
    rep(0);
}

function greenOver() {
    greenActive = false;
    results.fullScreen.green = greenI;
    pageColorTo('black');
    resetPage('startColorBlue()');
}

let blueActive = true;
let blueI = 0;

function startColorBlue() {
    replaceTriggerStart('blueOver()');
    let rep = (i) => {
        if (!blueActive) return;
        if (i === 254) { blueOver(); return; }
        pageColorToRGB(0, 0, i);
        blueI++;
        setTimeout(() => rep(++i), 500);
    }
    rep(0);
}

function blueOver() {
    blueActive = false;
    results.fullScreen.blue = blueI;
    pageColorTo('white');
    endRunner()
}

function endRunner() {
    let resStr = `RES:${version};CSUDC;T${Date.now()};FullScreen={R${results.fullScreen.red};G${results.fullScreen.green};B${results.fullScreen.blue}}`
    $('#triggerStart').remove();
    $('#core').append($(`<h1>You have finished the test section.</h1>

<p>Please provide this results string to the test manager: <code>${resStr}</code</p>`))
}



function replaceTriggerStart(onclick) {
    $('#triggerStart').text('I see it!');
    $('#triggerStart').attr('onclick', onclick);
}

function resetPage(onclickForTrigStart) {
    $('#triggerStart').text('Start');
    $('#triggerStart').attr('onclick', onclickForTrigStart);
    pageColorTo('black');
}

function pageColorTo(color) {
    $('#page-root').css('background-color', color)
}
function pageColorToRGB(r, g, b) {
    $('#page-root').css('background-color', `rgb(${r}, ${g}, ${b})`);
}
