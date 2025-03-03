const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Object to hold audio buffers
const sounds = {};

// Load audio files into buffers
async function loadSound(name, url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    sounds[name] = audioBuffer;
}

// Load all sounds
loadSound('sound1', 'sounds/xboxearrape.mp3');
loadSound('sound2', 'sounds/thomasthetrain.mp3');
loadSound('sound3', 'sounds/gamecube.mp3');

// Function to play sound with gain control
function playSound(name, gainValue) {
    if (!sounds[name]) return;

    const source = audioContext.createBufferSource();
    source.buffer = sounds[name];

    const gainNode = audioContext.createGain();
    gainNode.gain.value = gainValue; // Increase gain beyond 1 for louder sound

    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    source.start();
}

// Event listeners for buttons
document.querySelectorAll('.sound-button').forEach(button => {
    button.addEventListener('click', () => {
        const sound = button.getAttribute('data-sound');
        const gainValue = document.getElementById('volume').value; // Get volume value
        playSound(sound, gainValue);
    });
});
