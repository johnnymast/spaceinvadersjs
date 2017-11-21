export default class Sound {
    constructor(url) {
        this.url = url;
        this.buffer = null;
        this.Preload();
    }

    Preload() {
        if (SoundContext()) {
            var request = new XMLHttpRequest();
            var self = this;
            request.open('GET', this.url, true);
            request.responseType = 'arraybuffer';

            // Decode asynchronously
            request.onload = () => {
                SoundContext().decodeAudioData(request.response, function (buffer) {
                    self.buffer = buffer;
                }, this.onError);
            }

            request.send();
        }
    }

    OnError() {
        console.log('Failed to load ' + this.url);
    }

    Play() {
        return true;
        if (this.buffer && SoundContext()) {
            var source = SoundContext().createBufferSource();
            source.buffer = this.buffer;
            source.connect(context.destination);
            source.start(0);
            return true;
        }
        return false;
    }
}