const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const sounds = {};

// Load audio files into buffers
async function loadSound(name, url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    sounds[name] = audioBuffer;
}

// Load all sounds
loadSound('xboxearrape', 'sounds/xboxearrape.mp3');
loadSound('thomasthetrain', 'sounds/thomasthetrain.mp3');
loadSound('gamecube', 'sounds/gamecube.mp3');
loadSound('iphoneearrape', 'sounds/iphoneearrape.mp3');
loadSound('thickofitearrape', 'sounds/thickofitearrape.mp3');

// Create EQ bands
const eqBands = {
    low: audioContext.createBiquadFilter(),
    mid: audioContext.createBiquadFilter(),
    high: audioContext.createBiquadFilter(),
};

// Configure EQ bands
eqBands.low.type = "lowshelf";  
eqBands.low.frequency.value = 200; 

eqBands.mid.type = "peaking";  
eqBands.mid.frequency.value = 1000; 
eqBands.mid.Q.value = 1;

eqBands.high.type = "highshelf";  
eqBands.high.frequency.value = 4000; 

// Connect filters in sequence
eqBands.low.connect(eqBands.mid);
eqBands.mid.connect(eqBands.high);

// Create a compressor (optional but improves sound clarity)
const compressor = audioContext.createDynamicsCompressor();
compressor.threshold.setValueAtTime(-20, audioContext.currentTime);
compressor.knee.setValueAtTime(30, audioContext.currentTime);
compressor.ratio.setValueAtTime(12, audioContext.currentTime);
compressor.attack.setValueAtTime(0.003, audioContext.currentTime);
compressor.release.setValueAtTime(0.25, audioContext.currentTime);

eqBands.high.connect(compressor);
compressor.connect(audioContext.destination);

// Function to play sound with volume boost
function playSound(name) {
    if (!sounds[name]) return;

    const source = audioContext.createBufferSource();
    source.buffer = sounds[name];

    const gainNode = audioContext.createGain();
    const volumeBoost = parseFloat(document.getElementById('volume').value);
    gainNode.gain.value = volumeBoost; // Boosts volume beyond normal max

    // Connect source -> gain -> EQ -> Compressor -> Output
    source.connect(gainNode);
    gainNode.connect(eqBands.low);

    source.start();
}

// Update EQ settings from sliders
function updateEQ() {
    eqBands.low.gain.value = document.getElementById('bass').value;
    eqBands.mid.gain.value = document.getElementById('mid').value;
    eqBands.high.gain.value = document.getElementById('treble').value;
}

// Event listeners for buttons
document.querySelectorAll('.sound-button').forEach(button => {
    button.addEventListener('click', () => {
        const sound = button.getAttribute('data-sound');
        playSound(sound);
    });
});

// Listen for EQ slider changes
document.querySelectorAll('.eq-slider').forEach(slider => {
    slider.addEventListener('input', updateEQ);
});

