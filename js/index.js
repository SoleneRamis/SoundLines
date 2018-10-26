var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d')

var audioCtx = new AudioContext()
var audioBuffer
var audioSource
var analyser = audioCtx.createAnalyser()
var biquadFilter = audioCtx.createBiquadFilter()
var frequencyData
var frequencyIdx = Math.floor(1024)

var t = 0
var DELTA_TIME = 0
var LAST_TIME = Date.now()

var moyenne = 0
var reducer = (acc, reducer) => acc + reducer
var cumul = 0
var average = 0
var lines = []

var slider = document.getElementById("range")
var freq = 120

canvas.style.width = 85 + 'vw'
canvas.style.height = 80  + 'vh'
canvas.height = window.innerHeight
canvas.width = window.innerWidth

slider.oninput = function () {
    freq = this.value
}

function loadSound(url) {
    var request = new XMLHttpRequest();
    request.open('GET', '../assets/sound/DanielAveryDroneLogic.mp3', true)
    request.responseType = 'arraybuffer'

    request.onload = function () {
        audioCtx.decodeAudioData(request.response, function (buffer) {
            // success callback
            audioBuffer = buffer
            // Create sound from buffer
            audioSource = audioCtx.createBufferSource()
            audioSource.buffer = audioBuffer
            // connect the audio source to context's output
            audioSource.connect(analyser)
            //analyser.fftSize = 256
            analyser.connect(audioCtx.destination)
            frequencyData = new Uint8Array(analyser.frequencyBinCount)
            // Filters
            audioSource.connect(biquadFilter)
            biquadFilter.connect(audioCtx.destination)
            // play sound
            audioSource.start()

            frame()
        }, function () {
            // error callback
            //
        })
    }
    request.send()
}

function initLine() {
    lines = new Draw()
}

function frame() {
    requestAnimationFrame(frame)

    DELTA_TIME = Date.now() - LAST_TIME
    LAST_TIME = Date.now()
    t += 0.01

    analyser.getByteFrequencyData(frequencyData)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    biquadFilter.type = "lowshelf"
    biquadFilter.frequency.setValueAtTime(freq, audioCtx.currentTime)
    biquadFilter.gain.value = 25

    moyenne = frequencyData.reduce(reducer) / frequencyData.length

    for (var i = 0; i < 6; i++) {
        // get the frequency according to current i
        let percentIdx = i / 6;
        let frequencyIdx = Math.floor(1024 * percentIdx)

        lines.update()
        lines.draw(ctx)

        cumul += frequencyData[frequencyIdx]
    }
    average = cumul / 255;
}

function init() {
    initLine()
    loadSound()
}

init()