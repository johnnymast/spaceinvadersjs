class AlienGroup {
    constructor(initx, inity, gamesize) {
        this.initialX = initx;
        this.initialY = inity;
        this.gamesize = gamesize;
        this.alienpadding = 10;
        this.alienWidth = 24;
        this.alienHeight = 16;
        this.aliens = new Array();
        this.velx = 1;
        this.vely = 0;
    }

    Setup() {
        var alienRows = 3;
        var boxpadding = 130;

        // Lets calculate how many aliens we can store on the screen.
        // In this calculation we don't need the height we calculate based
        // on the width of the screen.

        var boundingbox = new Size(gamesize.width - boxpadding, 0);
        var spriteWidthIncPadding = this.alienWidth + this.alienpadding;

        var lastAlienX = alienIntialX;
        var lastAlienY =  alienIntialY;

        var amountPerRow = Math.round((boundingbox.width - this.alienpadding - alienIntialX) / spriteWidthIncPadding);

        for (var row = 0; row < alienRows; row++) {
            for (var aliencnt = 0; aliencnt < amountPerRow; aliencnt++) {
                var alien = new Alien(lastAlienX, lastAlienY, this.alienWidth, this.alienHeight);
                this.aliens.push(alien);
                lastAlienX = alien.x + alien.w + this.alienpadding;
            }
            lastAlienY += (this.alienHeight + this.alienpadding);
            lastAlienX = alienIntialX;
        }
    }

    Update() {
        var options = {
            firstx: 0,
            lastx: 0,
        }

        // calculate most right alien x
        for (var i = 0; i < this.aliens.length; i++) {
            var alien = this.aliens[i];
            if (alien.x > options.lastx) {
                options.lastx = alien.x;
            }
        }

        options.firstx = options.lastx;

        // calculate most left alien x
        for (var i = this.aliens.length-1; i > 0; i--) {
            var alien = this.aliens[i]; //console.log(alien)
            if (alien.x < options.firstx) {
                options.firstx = alien.x;
            }
        }

        if (options.lastx+(this.alienWidth+this.alienpadding) > gamesize.width) {

            for (var i = 0; i < this.aliens.length; i++) {
                this.aliens[i].y += (this.alienHeight + this.alienpadding);
                this.aliens[i].x -= 1; //(this.alienWidth + this.alienpadding);
            }

            this.velx = -1;

        } else if (options.firstx <= 0) {

            for (var i = 0; i < this.aliens.length; i++) {
                this.aliens[i].y += (this.alienHeight + this.alienpadding);
                this.aliens[i].x += 1;// (this.alienWidth + this.alienpadding);
            }

            this.velx = 1;

        } else {

            for (var i = 0; i < this.aliens.length; i++) {
                this.aliens[i].x += this.velx;
            }
        }
    }

    Draw() {
        for (var i = 0; i < this.aliens.length; i++) {
            var alien = this.aliens[i];
            alien.Draw();
        }
    }
}