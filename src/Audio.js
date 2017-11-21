window.setupAudio = () => {
    try {
        config.set('engine.internals.audio.dictionary', new Array());

        // Fix up for prefixing
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        context = new AudioContext();


        console.log('Sound Engine started');

        return context;
    }
    catch (e) {
        console.log('Web Audio API is not supported in this browser');
    }
    return false;
}

window.preloadSound = (key, sound) => {
    return config.get('engine.internals.audio.dictionary')[key] = sound;
}

window.getSound = (key) => {
    var dictionary = config.get('engine.internals.audio.dictionary');

    if (typeof dictionary != 'undefined') {
        if (dictionary[key]) {
            return dictionary[key];
        }
    }
    return false;
}

window.playSound = (key) => {
    var sound = getSound(key);
    if (typeof sound != 'undefined') {
        sound.Play();
    }
}
