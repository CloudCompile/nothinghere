
// Load audio files into buffers
async function loadSound(name, url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    sounds[name] = audioBuffer;
}

const sounds = {
    sound1: new Audio('sounds/xboxearrape.mp3'),
    sound2: new Audio('sounds/thomasthetrain.mp3'),
    sound3: new Audio('sounds/gamecube.mp3'),
    sound4: new Audio('sounds/iphoneearrape.mp3'),
    sound5: new Audio('sounds/thickofitearrape.mp3'),
    
};

