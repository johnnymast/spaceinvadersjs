export default class BitmapFont {

    /**
     * Create a BitmapFont.
     * @param {string} url - Url to the fnt file
     */
    constructor(url) {
        this.url = url;
        this.chars = [];
        this.image = '';
        this.spritesheet = null;

        var parts = this.url.split('/');
        delete parts[parts.length-1];

        this.path = parts.join('/');
        this.Load();
    }

    Load() {
        var xhttp = new XMLHttpRequest();
        var self = this;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var content = this.responseText.split('\n');

                content.forEach((line) => {
                    if (line.substr(0, 5) == 'page ') {
                        var line = line.substr(5);
                        line = line.replace(/ +/g, '@');
                        var properties = line.split('@');

                        properties.forEach((property) => {
                            property = property.replace(/  +/g, '');
                            property = property.split('=');


                            if (property[0] == 'file') {
                                self.image = property[1].replace(/\"+/g, '');
                            }
                        });
                    }
                    if (line.substr(0, 4) == 'char' && line.substr(0, 5) != 'chars') {
                        var line = line.substr(4);
                        line = line.replace(/  +/g, '@');
                        var properties = line.split('@');
                        var char = [];

                        properties.forEach((property) => {
                            property = property.replace(' ', '');
                            property = property.split('=');
                            char[property[0]] = property[1];
                        });

                        self.chars[char.id] = char;
                    }

                });

                if (self.image.length > 0 && self.chars.length > 0) {
                    self.spritesheet = new SpriteSheet(self.path + '/' + self.image)
                }


            } else if (this.readyState == 4) {
                self.OnError();
            }
        };
        xhttp.open("GET", this.url, true);
        xhttp.send();
    }

    OnError() {
        console.log('Failed to load ' + this.url);
    }

    Write(str, x, y) {
        if (this.spritesheet) {;
            for (var i = 0; i < str.length; i++) {
                var ascii = str[i].charCodeAt(0);
                var char = this.chars[ascii];

                if (char) {
                    x = parseInt(x);
                    y = parseInt(y);
                    char.width = parseInt(char.width);
                    char.height = parseInt(char.height);
                    char.xadvance = parseInt(char.xadvance);
                    char.xoffset = parseInt(char.xoffset);
                    char.yoffset = parseInt(char.yoffset);

                    this.spritesheet.DrawExtra(x + char.xoffset, y + char.yoffset, char.width, char.height, char.x, char.y);
                    x += parseInt(char.xadvance);
                }
            }
        }
    }
}