(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("desert",
{ "height":40,
 "layers":[
        {
         "compression":"zlib",
         "data":"eJztmNkKwjAQRaN9cAPrAq5Yq3Xf6v9\/nSM2VIbQJjEZR+nDwQZScrwztoORECLySBcIgZ7nc2y4KfyWDLx+Jb9nViNgDEwY+KioAXUgQN4+zpoCMwPmQAtoAx2CLFbA2oDEo9+hwG8DnIDtF\/2K8ks086Tw2zH0uyMv7HcRr\/6\/EvvhnsPrsrxwX7rwU\/0ODig\/eV3mh3N1ld8eraWPaX6+64s9McesfrqcHfg1MpoifxcVEWjukyw+9AtFPl\/I71pER3Of6j4bv7HI54s+MChhqLlPdZ\/P3qMmFuo5h5NnTOhjM5tReN2yT51n5\/v7J3F0vi46fk+ne7aX0i9l6If7mpufTX3f5wsqv9TAD2fJLT9VrTn7UeZnM5tR+v0LMQOHXwFnxe2\/warGFRWf8QDjOLfP",
         "encoding":"base64",
         "height":40,
         "name":"Ground",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":40,
         "x":0,
         "y":0
        }],
 "nextobjectid":1,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.0.2",
 "tileheight":32,
 "tilesets":[
        {
         "firstgid":1,
         "source":"..\/..\/..\/..\/Desktop\/examples\/desert.tsx"
        }],
 "tilewidth":32,
 "type":"map",
 "version":1,
 "width":40
});