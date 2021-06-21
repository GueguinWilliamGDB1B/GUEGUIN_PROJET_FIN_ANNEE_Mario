var boutonJouer;
var boutonCommande;
var jouer = false;
var commande = false;




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
        
        this.load.spritesheet('commandes', 'assets/commandesSpritesheet.png', { frameWidth: 201, frameHeight: 64 });
        this.load.spritesheet('jouer', 'assets/jouerSpritesheet.png', { frameWidth: 254, frameHeight: 110 });
        
        
        
    }

    create ()
    {
        this.fond = this.add.image(448, 224, 'fond');
        
        boutonJouer = this.add.sprite(746,125, 'jouer').setInteractive({ cursor: 'pointer' });
        boutonCommande = this.add.sprite(744,250, 'commandes').setInteractive({ cursor: 'pointer' });
        
        
        /////////////////////bouton jouer////////////////////
const anims = this.anims;
    anims.create({
        ///////////////jouer/////////////////
        key: 'jouerSimple',
        frames: this.anims.generateFrameNumbers('jouer', { start: 0, end: 0 }),
        frameRate: 5,
      });
    anims.create({
        key: 'jouerDessus',
        frames: this.anims.generateFrameNumbers('jouer', { start: 1, end: 1 }),
        frameRate: 5,
      });
       
    ////////////////////////////commandes//////////////////
    anims.create({
        key: 'commandesSimple',
        frames: this.anims.generateFrameNumbers('commandes', { start: 0, end: 0 }),
        frameRate: 5,
      });
    anims.create({
        key: 'commandesDessus',
        frames: this.anims.generateFrameNumbers('commandes', { start: 1, end: 1 }),
        frameRate: 5,
      });
    
   
        
   
}
        
        
        
    
update (){
    ///////////////////////////////////bouton Jouer//////////////////////////////////////////
    
    boutonJouer.on('pointerover', function (event) {
        boutonJouer.anims.play('jouerDessus',true);
    });

    boutonJouer.on('pointerout', function (event) {
      boutonJouer.anims.play('jouerSimple',true);
    });

    boutonJouer.on('pointerdown', function (pointer) {
        jouer = true;  
    });
    if(jouer == true){
        jouer = false;
        this.scene.start("sceneModeDeJeu");
    }
    
    
    ///////////////////////////////////bouton Commandes///////////////////////
    
    
    boutonCommande.on('pointerover', function (event) {
        boutonCommande.anims.play('commandesDessus',true);
    });

    boutonCommande.on('pointerout', function (event) {
      boutonCommande.anims.play('commandesSimple',true);
    });

    boutonCommande.on('pointerdown', function (pointer) {
        commande = true;  
    });
    if(commande == true){
        commande = false;
        this.scene.start("sceneCommandes");
    }
    
   

        
    }
}