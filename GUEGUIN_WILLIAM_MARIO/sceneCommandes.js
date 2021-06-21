var boutonRetourCommande;
var retourCommande = false;
var fond;
var touches;



class sceneCommandes extends Phaser.Scene {

    constructor ()
    {
        super("sceneCommandes");
        this.pad = null;
    }
    init(data){
        
        }
    preload ()
    {
        this.load.image('fond2', 'assets/interfaceMenu.png');
        this.load.image('lesTouches', 'assets/lesTouches.png');
       
        
        this.load.spritesheet('retourCommande', 'assets/boutonRetour.png', { frameWidth: 62, frameHeight: 64 })
    }

    create ()
    {
        fond  = this.add.image(448, 224, 'fond2');
        touches = this.add.image(448, 224, 'lesTouches').setAlpha(1);
        //.setAlpha(1)
       
        
        boutonRetourCommande= this.add.sprite(861,413, 'retourCommande').setInteractive({ cursor: 'pointer' });
        /////////////////////bouton jouer////////////////////
const anims = this.anims;
    
  
    ///////////////////////retour//////////////////////////////
    anims.create({
        key: 'retourSimpleCommande',
        frames: this.anims.generateFrameNumbers('retourCommande', { start: 0, end: 0 }),
        frameRate: 5,
      });
    anims.create({
        key: 'retourDessusCommande',
        frames: this.anims.generateFrameNumbers('retourCommande', { start: 1, end: 1 }),
        frameRate: 5,
      });
        
   
}
        
        
        
    
update (){

    /////////////////////////////////bouton Retour///////////////////////////////

    boutonRetourCommande.on('pointerover', function (event) {
        boutonRetourCommande.anims.play('retourDessusCommande',true);
    });

    boutonRetourCommande.on('pointerout', function (event) {
      boutonRetourCommande.anims.play('retourSimpleCommande',true);
    });

    boutonRetourCommande.on('pointerdown', function (pointer) {
            retourCommande = true;  
    });
    if(retourCommande == true){
        retourCommande = false;
        this.scene.start("EcranTitre");
    }
        
    }
}