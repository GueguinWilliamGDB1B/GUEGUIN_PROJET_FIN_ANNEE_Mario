class EcranTitre extends Phaser.Scene {

    constructor ()
    {
        super("EcranTitre");
        this.pad = null;
    }
    init(data){
        
        }
    preload ()
    {
        this.load.image('fond', 'assets/interfaceMenu.png');
        this.load.image('jouer', 'assets/bouton_jouer.png');
        
    }

    create ()
    {
        this.fond = this.add.image(448, 224, 'fond');
        this.add.image(752, 176, 'jouer');

        this.input.manager.enabled = true;

        this.input.once('pointerdown', function () {

            this.scene.start("stage");

        }, this);
    }

}

/*class SceneOne extends Phaser.Scene{
    constructor(){
        super("sceneOne");
        this.pad = null;
    }
    init(data){
    }
    preload(){   
        this.load.image("tiles", "assets/tiled.png");
        this.load.tilemapTiledJSON("map_1_placeholder", "maison.json");
        //this.load.image('player', 'assets/player.png');
        this.load.spritesheet('player', 'assets/perso_spritesheet.png', { frameWidth: 31, frameHeight: 48 });
    }
    create(){
        const map = this.make.tilemap({key: 'map_1_placeholder'});
        const tileset = map.addTilesetImage('CaseBase', 'tiles');
        const terrain = map.createStaticLayer('sol', tileset, 0, 0);
        const bloquant = map.createStaticLayer('mur', tileset, 0, 0);
        const transitionDesert1 = map.createStaticLayer('sortie_maison', tileset, 0, 0);
        
        
*/