var boutonNormalMode;
var boutonParkourMode;
var boutonRetourMode;
var normal = false;
var retour = false;
var parkour = false;
var fond;
var leTexteParkour;
var leTexteStandart;


class sceneModeDeJeu extends Phaser.Scene {

    constructor ()
    {
        super("sceneModeDeJeu");
        this.pad = null;
    }
    init(data){
        
        }
    preload ()
    {
        this.load.image('fond', 'assets/interfaceMenu.png');
        this.load.image('texteParkour', 'assets/texteParkour.png');
        this.load.image('texteStandart', 'assets/texteStandart.png');
        this.load.spritesheet('modeNormal', 'assets/boutonNormal.png', { frameWidth: 201, frameHeight: 64 });
        this.load.spritesheet('modeParkour', 'assets/boutonParkour.png', { frameWidth: 203, frameHeight: 64 });
        this.load.spritesheet('retour', 'assets/boutonRetour.png', { frameWidth: 62, frameHeight: 64 })
    }

    create ()
    {
        fond  = this.add.image(448, 224, 'fond');
        //fond  = this.add.image(448, 224, 'fond').setAlpha(0);207
        leTexteParkour= this.add.image(448, 224, 'texteParkour').setAlpha(0);
        leTexteStandart= this.add.image(448, 224, 'texteStandart').setAlpha(0);
        
        boutonNormalMode = this.add.sprite(746,100, 'modeNormal').setInteractive({ cursor: 'pointer' });
        boutonParkourMode = this.add.sprite(746,175, 'modeParkour').setInteractive({ cursor: 'pointer' });
        boutonRetourMode= this.add.sprite(861,413, 'retour').setInteractive({ cursor: 'pointer' });
        /////////////////////bouton jouer////////////////////
const anims = this.anims;
    
        ///////////////////mode Normale//////////////
    anims.create({
        key: 'normalSimple',
        frames: this.anims.generateFrameNumbers('modeNormal', { start: 0, end: 0 }),
        frameRate: 5,
      });
    anims.create({
        key: 'normalDessus',
        frames: this.anims.generateFrameNumbers('modeNormal', { start: 1, end: 1 }),
        frameRate: 5,
      });
        //////////////////mode Parkour///////////////////
    anims.create({
        key: 'parkourSimple',
        frames: this.anims.generateFrameNumbers('modeParkour', { start: 0, end: 0 }),
        frameRate: 5,
      });
    anims.create({
        key: 'parkourDessus',
        frames: this.anims.generateFrameNumbers('modeParkour', { start: 1, end: 1 }),
        frameRate: 5,
      });
   
    ///////////////////////retour//////////////////////////////
    anims.create({
        key: 'retourSimple',
        frames: this.anims.generateFrameNumbers('retour', { start: 0, end: 0 }),
        frameRate: 5,
      });
    anims.create({
        key: 'retourDessus',
        frames: this.anims.generateFrameNumbers('retour', { start: 1, end: 1 }),
        frameRate: 5,
      });
        
   
}
        
        
        
    
update (){
    ////////////////////////////////////////////bouton Mode de jeu Normal////////////
    boutonNormalMode.on('pointerover', function (event) {
        boutonNormalMode.anims.play('normalDessus',true);
        leTexteStandart.setAlpha(1);
    });
    
    boutonNormalMode.on('pointerout', function (event) {
      boutonNormalMode.anims.play('normalSimple',true);
        leTexteStandart.setAlpha(0);
    });

    boutonNormalMode.on('pointerdown', function (pointer) {
               normal = true;  
    });
    if(normal == true){
        normal = false;
        this.scene.start("stage");
    }
    
    
    
    
    ///////////////////////////////bouton mode de jeu Parkour/ Chrono///////////////////////////////
    
     boutonParkourMode.on('pointerover', function (event) {
        boutonParkourMode.anims.play('parkourDessus',true);
        leTexteParkour.setAlpha(1);
         
         
    });
    
    boutonParkourMode.on('pointerout', function (event) {
      boutonParkourMode.anims.play('parkourSimple',true);
        //fond.setAlpha(0);
         leTexteParkour.setAlpha(0);
        
    });

    boutonParkourMode.on('pointerdown', function (pointer) {
               parkour = true;  
    });
    if(parkour == true){
        parkour = false;
        this.scene.start("stageParkour");
    }
    //////////////////////////bouton Retour////////////////////
    
    boutonRetourMode.on('pointerover', function (event) {
        boutonRetourMode.anims.play('retourDessus',true);
        
    });

    boutonRetourMode.on('pointerout', function (event) {
      boutonRetourMode.anims.play('retourSimple',true);
    });

    boutonRetourMode.on('pointerdown', function (pointer) {
            retour = true;  
    });
    if(retour == true){
        retour = false;
        this.scene.start("EcranTitre");
    }
    
    }
}