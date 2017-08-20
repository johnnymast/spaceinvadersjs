class TiledMap {
    constructor(url) {
        this.url = url;
        this.version = '';
        this.tiledversion = '';
        this.orientation = '';
        this.renderorder = '';
        this.width = 0;
        this.height = 0;
        this.nextobjectid = 0;
        this.tilesets = [];
        this.layers = [];
        this.objectgroups = [];

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
                var xmlDoc = this.responseXML;
                var map = xmlDoc.getElementsByTagName("map")[0];
                var tilesets = xmlDoc.getElementsByTagName("tileset");
                var layers = xmlDoc.getElementsByTagName('layer');
                var objectgroups = xmlDoc.getElementsByTagName('objectgroup');

                // Basic map info
                self.version = map.attributes['version'].nodeValue;
                self.tiledversion = map.attributes['tiledversion'].nodeValue;
                self.orientation = map.attributes['orientation'].nodeValue;
                self.renderorder = map.attributes['renderorder'].nodeValue;
                self.width = map.attributes['width'].nodeValue;
                self.height = map.attributes['height'].nodeValue;

                for (var i = 0; i < tilesets.length; i++) {
                    var tileset = {
                        'terraintypes': [],
                        'tiles': [],
                        'layers': [],
                        'image': null,
                        'spritesheet': null
                    };
                    var set = tilesets[i];
                    var terraintypes = set.getElementsByTagName('terraintypes')[0];
                    var tiles = set.getElementsByTagName('tile');
                    var image = set.getElementsByTagName('image')[0];

                    // Proccess tile set attributes ..
                    for (var x = 0; x < set.attributes.length; x++) {
                        var key = set.attributes[x].nodeName;
                        var val = set.attributes[x].nodeValue;
                        tileset[key] = val;
                    }


                    if (typeof image !='undefined') {
                        // Proccess tile set attributes ..
                        var img = [];
                        for (var x = 0; x < image.attributes.length; x++) {
                            var key = image.attributes[x].nodeName;
                            var val = image.attributes[x].nodeValue;
                            img[key] = val;
                        }
                        tileset['image'] = img;
                    }

                    // Parse terain types IF any exist
                    if (typeof terraintypes != 'undefined') {
                        var terrains = terraintypes.getElementsByTagName('terrain');
                        if (terrains.length > 0) {
                            for (var x = 0; x < terrains.length; x++) {
                                var terain = [];
                                for (var y = 0; y < terrains[x].attributes.length; y++) {
                                    var key = terrains[x].attributes[y].nodeName;
                                    var val = terrains[x].attributes[y].nodeValue;

                                    terain[key] = val;
                                }
                                tileset['terraintypes'].push(terain);
                            }
                        }
                    }

                    // Parse tiles IF any exist
                    if (typeof tiles != 'undefined') {
                        if (tiles.length > 0) {
                            for (var x = 0; x < tiles.length; x++) {
                                var tile = [];
                                for (var y = 0; y < tiles[x].attributes.length; y++) {

                                    var key = tiles[x].attributes[y].nodeName;
                                    var val = tiles[x].attributes[y].nodeValue;

                                    tile[key] = val;
                                }
                                tileset['tiles'].push(tile);
                            }
                        }
                    }

                    if (tileset.image) {
                        tileset.spritesheet = new SpriteSheet(
                            self.path + '/' + tileset.image.source,
                            tileset.image.width,
                            tileset.image.height);
                    }

                    self.tilesets.push(tileset);
                }

                // Parse the layers
                if (typeof layers != 'undefined') {
                    for (var i = 0; i < layers.length; i++) {
                        var currentLayer = layers[i];
                        var data = currentLayer.getElementsByTagName('data')[0];
                        var layer = {
                            'tiles': [],
                        };

                        // Proccess tile set attributes ..
                        for (var x = 0; x < currentLayer.attributes.length; x++) {
                            var key = currentLayer.attributes[x].nodeName;
                            var val = currentLayer.attributes[x].nodeValue;
                            layer[key] = val;
                        }

                        if (typeof data != 'undefined') {
                            tiles = data.getElementsByTagName('tile');

                            if (tiles.length > 0) {
                                for (var x = 0; x < tiles.length; x++) {
                                    var tile = [];
                                    for (var y = 0; y < tiles[x].attributes.length; y++) {

                                        var key = tiles[x].attributes[y].nodeName;
                                        var val = tiles[x].attributes[y].nodeValue;

                                        tile[key] = val;
                                    }
                                    layer['tiles'].push(tile);
                                }
                            }
                        }
                        self.layers.push(layer);
                    }
                }

                if (typeof objectgroups != 'undefined') {
                    for (var i = 0; i < objectgroups.length; i++) {
                        var currentobjectgroup = objectgroups[i];
                        var objectgroup = {
                            'objects': [],
                        }

                        var objects = currentobjectgroup.getElementsByTagName('object');
                        if (typeof objects != 'undefined') {
                            if (objects.length > 0) {

                                for (var j = 0; j < objects.length; j++) {
                                    var currentobject = objects[j];
                                    var propertyset = currentobject.getElementsByTagName('properties')[0];
                                    var object = {
                                        'properties': []
                                    };

                                    // Proccess object attributes ..
                                    for (var x = 0; x < currentobject.attributes.length; x++) {
                                        var key = currentobject.attributes[x].nodeName;
                                        var val = currentobject.attributes[x].nodeValue;
                                        object[key] = val;
                                    }

                                    if (typeof propertyset != 'undefined') {
                                        var properties = propertyset.getElementsByTagName('property');

                                        if (typeof properties != 'undefined') {
                                            if (properties.length > 0) {
                                                for (var x = 0; x < properties.length; x++) {
                                                    var currentproperty = properties[i];
                                                    var property = [];
                                                    for (var y = 0; y < currentproperty.attributes.length; y++) {

                                                        var key = currentproperty.attributes[y].nodeName;
                                                        var val = currentproperty.attributes[y].nodeValue;

                                                        property[key] = val;
                                                    }
                                                    object['properties'].push(property);
                                                }
                                            }
                                        }
                                    }

                                    objectgroup['objects'].push(object);
                                }
                            }
                        }
                        self.objectgroups.push(objectgroup);
                    }
                }
            }
            else if (this.readyState == 4) {
                self.OnError();
            }
        };
        xhttp.overrideMimeType('text/xml');
        xhttp.open("GET", this.url, true);
        xhttp.send();
    }

    FindTileSetWithGid(gid) {
        if (this.tilesets.length > 0) {
            for (var i = 0; i < this.tilesets.length; i++) {
                if (this.tilesets[i].tiles.length > 0) {
                    for (var j = 0; j <  this.tilesets[i].tiles.length; j++) {
                        var tile = this.tilesets[i].tiles[j];
                        if (tile.id == gid) return this.tilesets[i];
                    }
                }
            }
        }
        return false;
    }

    GetTileForTileSetAndTileId(tileset, tileid) {

        if (tileset && tileid > -1) {
            var stepXSize = tileset.tilewidth + tileset.margin + tileset.spacing;
            var pos = { x: tileset.margin, y: 0 };

            for (i = 0; i < tileset.columns; i++) {
                if (i > 0) {
                    pos.x +=
                }


                pos.x += tileset.spacing + tileset.margin;
            }
        //    console.log(tileset.image.width / stepXSize);
        }
        return false;
    }

    RenderLayer(name)  {
        if (this.layers.length > 0) {
            for (var i =0; i < this.layers.length; i++) {
                var layer = this.layers[i];
                if (layer.name == name) {
                    if (layer.tiles.length > 0) {
                        for (var j = 0; j < layer.tiles.length; j++) {
                            var tile = layer.tiles[j];
                            var tileset = this.FindTileSetWithGid(tile.gid);

                            this.GetTileForTileSetAndTileId(tileset, tile.gid);
                         //   console.log(tileset);
                        }
                    }
                  //  console.log('render dit');
                   // console.log(layer);
                }
            }
        }
    }

    OnError() {
        console.log('Failed to load ' + this.url);
    }
}