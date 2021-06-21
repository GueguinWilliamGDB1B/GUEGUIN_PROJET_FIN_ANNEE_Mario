var player;
var keys;
var stars;
var platforms;
var cursors;
var enemie1;
var enemies1;
var enemie2;
var enemies2;
var enemie3;
var enemies3
var enemie4;
var enemies4;
var enemie5;
var enemies5;
var monnaie1;
var monnaies1;
var bourseLeurre1;
var bourseLeurres1;
var powerUpUI;
var etatVraiBourse;
var grosseMonnaie1;
var grosseMonnaies1;
var plateforme1;
var plateformes1;
var score = 0;
var scoreText;
var scoreObjectif;
var bullet;
var groupeBullets;
var fleche;
var groupeFleches;
var coefDir;
var speed1;
var jetDePiece = true;
var dirGauche =false;
var dirDroite =false;   
var resistance =false;
var peurDroite =false;
var peurGauche = false;
var fuiteDroite = false;
var protectionLeurre = false;
var traqueChien = false;
var ascensseurMonte = false;
var notJumping = false;
var gameover = false;
var boutonHOMEParkour;
var boutonHommeParkour = false;

var compteUneSeconde;

var compteurtirDePiece =50;
var tirDePiece = true;

var compteurFleche= 150;
var tirFleche = true;

var compteurPieceTireur = 100;
var tireurPrendPiece = true; 

var compteurPieceSoldat=100;
var SoldatPrendPiece = true;

var compteurDepart = 100;
var courseDepart = false;

var timedEvent;
var text;
var chronoText;
var monTimer;
var chrono=0;
var bouton_stop_resume;
var bouton_reset;
var stopped = false;
var narrato;
var gameStarted = false;
var tutoChrono;




var KeyQ;
var KeyD;
var spaceBar;
var click;
        

class StageParkour extends Phaser.Scene {
    constructor(){
        super("stageParkour");
        this.pad = null;
    }
init(data){
        
    }

preload()
    {
        this.load.image('ciel', 'assets/ciel.png');
        this.load.image('para2', 'assets/2emePlan.png');
        this.load.image('para3', 'assets/3emePlan.png');
        this.load.image('para4', 'assets/4emePlan.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('interface2', 'assets/interfacePetit2.png');
        this.load.image('danger', 'assets/petitePiece.png');
        this.load.image('enemie','assets/essaie_perso.png');
        this.load.image('tiles', "assets/tiled.png");
        //this.load.spritesheet('dude', 'assets/perso2.png', { frameWidth: 103, frameHeight: 160 });
        this.load.tilemapTiledJSON("stage", "tiledStage.json"); 
        //this.load.image('mechant1', 'assets/placeholder_mechant.png');
        this.load.image('monstre2', 'assets/monstre2.png');
        this.load.image('monstre3', 'assets/monstre3.png');
        //this.load.image('monstre4', 'assets/chien.png');
        this.load.image('monstre5', 'assets/soldat.png');
        this.load.image('fleche', 'assets/fleche.png');
        this.load.image('monnaie', 'assets/piece.png');
        this.load.image('grosseMonnaie', 'assets/coffre.png');
        this.load.image('leurre', 'assets/bourse_leurre.png');
        this.load.image('fond_bloquant', 'assets/stage_bloquant.png');
        this.load.image('plateformeMouvante', 'assets/plateforme.png');
        this.load.spritesheet('homeParkour', 'assets/boutonHome.png', { frameWidth: 57, frameHeight: 58});
        this.load.spritesheet('dude', 'assets/spitesheetHomard.png', { frameWidth: 136, frameHeight: 160 });
        this.load.spritesheet('mechant1', 'assets/MauriceSpritesheet.png', { frameWidth: 155, frameHeight: 159 });
        this.load.spritesheet('monstre4', 'assets/JeanPierreSpritesheet.png', { frameWidth: 118, frameHeight: 55 });
        this.load.spritesheet('bourseEtat', 'assets/bourseSpritesheet.png', { frameWidth: 49, frameHeight: 52});
        this.load.spritesheet('etatVraiBourse', 'assets/vraiBourseSpritesheet.png', { frameWidth: 58, frameHeight: 53});
    }

create (){
    this.physics.world.setBounds(0,0,13000,4000);
    
    this.add.image(0,0,'ciel').setOrigin(0);
    this.add.image(0,0,'para4').setOrigin(0).setScrollFactor(0.9).setScale(0.9);
    this.add.image(0,0,'para3').setOrigin(0).setScrollFactor(0.8).setScale(0.9);
    this.add.image(0,0,'para2').setOrigin(0).setScrollFactor(0.7).setScale(0.9);
    

    const map = this.make.tilemap({key: 'stage'});
    const tileset = map.addTilesetImage('CaseBase', 'tiles');
    const bloquant = map.createStaticLayer('mur', tileset, 0, 0);
    const bloquantAscenseur = map.createStaticLayer('murAscenseur', tileset, 0, 0);
    
    bloquant.setCollisionByExclusion(-1, true);
    bloquantAscenseur.setCollisionByExclusion(-1, true);
    
    this.add.image(5600,1840,'fond_bloquant');
    
    groupeBullets= this.physics.add.group();
    groupeFleches= this.physics.add.group();
    
    boutonHOMEParkour = this.add.sprite(861,35,'home').setScrollFactor(0).setInteractive({ cursor: 'pointer' });
    
    
    
    
    
    
    
    
    
    //player = this.physics.add.sprite(3100, 200, 'dude');
    //player = this.physics.add.sprite(8803, 1968, 'dude');
    //player = this.physics.add.sprite(5000, 400, 'dude');
    player = this.physics.add.sprite(300, 1300, 'dude');
    //player = this.physics.add.sprite(7900, 2000, 'dude');
    player.setBounce(0);
    player.setSize(58,160);
    player.setCollideWorldBounds(true); 
    ////////////////////contrôle clavier/souris////////////
            
    cursors = this.input.keyboard.createCursorKeys();
            
    KeyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    KeyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    click = this.input.activePointer.isDown;     
    
    
    
    
    
    
    
    
    
    
    
    
    

    ////////////////////////////caméra//////////////////////
    this.cameras.main.startFollow(player);
    this.cameras.main.setBounds(0, 0, player.widthInPixels, player.heightInPixels);
    
    //////////////////////////////////pièces/////////////////////////////////////////////
    

    ///////////////////////////////plateforme mouvante///////////////////////////////////////////
    const plateformeObjects = map.getObjectLayer('plateformeMouvante').objects;
    plateformes1 = this.physics.add.group({
    }); 
    for (const plateforme1 of plateformeObjects) {
    plateformes1.create(plateforme1.x, plateforme1.y, 'plateformeMouvante');  
    }
   
    
    ////////////////////////////////////////////////Animations/////////////////////////////////////
    
    
    //////////////////////////////////////animations Homard(personnage jouable)//////////////////////  
        this.anims.create({
            key: 'homeParkourSimple',
            frames: this.anims.generateFrameNumbers('homeParkour', { start: 0, end: 0 }),
            frameRate: 5,
        });
        this.anims.create({
            key: 'homeParkourDessus',
            frames: this.anims.generateFrameNumbers('homeParkour', { start: 1, end: 1 }),
            frameRate: 5,
        });
        this.anims.create({
            key: 'depart',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 11 }),
            frameRate: 20,
            repeat: -1
        });
    
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('dude', { start: 12, end: 17 }),
            frameRate: 20,
            repeat: -1
        });
    
        this.anims.create({
            key: 'fall',
            frames: this.anims.generateFrameNumbers('dude', { start: 18, end: 23 }),
            frameRate: 20,
            repeat: -1
        });
    
        this.anims.create({
            key: 'jette',
            frames: this.anims.generateFrameNumbers('dude', { start: 24, end: 28 }),
            frameRate: 10,
            
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 0 } ],
            frameRate: 20
        });

    
        cursors = this.input.keyboard.createCursorKeys();
        this.add.image(138.5,47,'interface2').setScrollFactor(0);
        ///////////collider//////////////////
        this.physics.add.collider(player, bloquant);  
        this.physics.add.collider(player, plateformes1);//,contactPlateforme,null, this);
    
    
    
    

        //timer
       monTimer = this.time.addEvent({
          delay: 1000,
          callback: compteUneSeconde,
          callbackScope: this,
          loop: true
        });  

        chronoText = this.add.text(100, 30, "Temps: 0", {
        fontStyle: "bold",
        fontSize: "24px",
        fill: "#75161e" //Couleur de l'écriture
        });
        chronoText.setScrollFactor(0);

        bouton_stop_resume = this.input.keyboard.addKey("S");
        bouton_reset = this.input.keyboard.addKey("R");


            //tuto chrono
        

      
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
update (){
    
    if(player.x > 10740){
       
           this.physics.pause();
           this.add.text(448, 224, "Niveau Parcouru", { fontSize: '36px', fill: '#75161e' }).setScrollFactor(0);
       
   }
    
    
    
    
    //timer

            // reset du chrono (bouton R)
        if (Phaser.Input.Keyboard.JustDown(bouton_reset)) {
           chrono = 0;
           chronoText.setText("Temps: " + chrono);
           monTimer.reset({ delay:1000, callback: compteUneSeconde, callbackScope: this,
                          loop: true});
        }

        // pause / reprise (bouton S)
        if (Phaser.Input.Keyboard.JustDown(bouton_stop_resume)) {
            if (stopped == false) {  // on stoppe le timer
               monTimer.reset({ paused: true });
               stopped = true; // on met a jour le booleen
            } 
            else {
                monTimer.reset({ delay:1000, callback: compteUneSeconde, callbackScope: this,
                              loop: true});
                stopped = false; // on met a jour le booleen
            }     
        }

    
    
    
    
    
    
    
    
    
         function compteUneSeconde () {
            chrono= chrono+1; // on incremente le chronometre d'une unite
            chronoText.setText("Temps: "+ chrono);
        }  
    
    
    boutonHOMEParkour.on('pointerover', function (event) {
        boutonHOMEParkour.anims.play('homeParkourDessus',true);
        
    });
    
    boutonHOMEParkour.on('pointerout', function (event) {
        boutonHOMEParkour.anims.play('homeParkourSimple',true);
       
    });

    boutonHOMEParkour.on('pointerdown', function (pointer) {
               boutonHommeParkour = true;  
    });
    if(boutonHommeParkour == true){
        boutonHommeParkour = false;
        this.scene.start("EcranTitre");
    }
    
    
    

    if (!this.input.activePointer.isDown && !cursors.down.isDown){ 
        jetDePiece = true; 
    }    
    if ((KeyQ.isDown ||cursors.left.isDown) && player.body.blocked.down ){
        player.setVelocityX(-600);
        dirGauche =true;
        dirDroite = false;
        player.flipX= true;
        player.anims.play('right', true);
    }
    else if ((KeyD.isDown||cursors.right.isDown) && player.body.blocked.down){
        player.setVelocityX(600);
        dirDroite =true;
        dirGauche = false;   
        player.flipX= false;
        player.anims.play('right', true);
    }
    else if ((KeyQ.isDown ||cursors.left.isDown) && !player.body.blocked.down ){
        player.setVelocityX(-600);
        dirGauche =true;
        dirDroite = false;
        player.flipX= true;
    }
    else if ((KeyD.isDown||cursors.right.isDown) && !player.body.blocked.down){
        player.setVelocityX(600);
        dirDroite =true;
        dirGauche = false;
        player.flipX= false;     
    }
    else if (player.body.blocked.down){    
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    else if (!player.body.blocked.down){    
        player.setVelocityX(0);
        
    }    
    ////////////////////////////////////////////Saut//////////////////////////////////////////
    if (spaceBar.isDown && player.body.blocked.down||cursors.up.isDown&& player.body.blocked.down){
        player.setVelocityY(-410); 
    } 
    if (player.body.velocity.y<0 ){
            
            player.anims.play('jump', true);
            console.log("monte");
    } 
    if (player.body.velocity.y>0){
            
            player.anims.play('fall', true);
    }
    if(courseDepart == true ){ // relance du compteur des projectiles //
            console.log("courseTimerCommence")
            compteurDepart-- ;
            if(compteurDepart == 0){
                compteurDepart = 100;
                console.log("courseTimerFinis")
                courseDepart = false ;
            }
        }
    /////////////////////////////////////déplacements plateforme mouvante/////////////////////////////////////////////
    
    for (const plateforme1 of plateformes1.children.entries) {
        plateforme1.body.allowGravity =false;
        plateforme1.setPushable(false);
        if(plateforme1.y >2112){
            plateforme1.setVelocityY(-200);
        }
        if(plateforme1.y < 832){
            //ascensseurMonte = false;
            plateforme1.setVelocityY(200);
        } 
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    
    
        
        
  
  

    }  
}