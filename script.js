// Object to hold audio files
const sounds = {
    sound1: new Audio('sounds/xboxearrape.mp3'),
    sound2: new Audio('sounds/thomasthetrain.mp3'),
    sound3: new Audio('sounds/gamecube.mp3'),
    sound4: new Audio('sounds/iphoneearrape.mp3'),
    sound5: new Audio('sounds/thickofitearrape.mp3'),
    sound6: new Audio('sounds/n64.mp3')
};

// Add event listeners to buttons
document.querySelectorAll('.sound-button').forEach(button => {
    button.addEventListener('click', () => {
        const sound = button.getAttribute('data-sound');
        
        // Stop all sounds before playing a new one
        Object.values(sounds).forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });

        // Play selected sound
        sounds[sound].play();
    });
});

