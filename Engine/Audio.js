setupAudio = () => {
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

preloadSound = (key, sound) => {
    return config.get('engine.internals.audio.dictionary')[key] = sound;
}

getSound = (key) => {
    if ((dictionary = config.get('engine.internals.audio.dictionary'))) {
        if (dictionary[key]) {
            return dictionary[key];
        }
    }
    return false;
}

playSound = (key) => {
    if ((sound = getSound(key))) {
        sound.Play();
    }
}