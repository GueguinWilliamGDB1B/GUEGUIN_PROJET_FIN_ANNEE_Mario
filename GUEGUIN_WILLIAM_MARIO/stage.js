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
var score = 2000;
var scoreText;
var scoreObjectif;
var bullet;
var groupeBullets;
var fleche;
var groupeFleches;
var coefDir;
var speed1;


var corruption1;




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
var gameOver = false;
var boutonHOME;
var boutonHomme = false;

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


var compteurDestructionImmage = 100;
var destructImmage = true;



var KeyQ;
var KeyD;
var spaceBar;
var click;
        

class Stage extends Phaser.Scene {
    constructor(){
        super("stage");
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
        this.load.image('interface', 'assets/interfacePetit.png');
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
        
        this.load.image('corrupt1', 'assets/corruption1.png');
        this.load.image('corrupt2', 'assets/corruption2.png');
        this.load.image('corrupt3', 'assets/corruption3.png');
        this.load.image('corrupt4', 'assets/corruption4.png');
        this.load.image('corrupt5', 'assets/corruption5.png');
        this.load.image('corrupt6', 'assets/corruption6.png');
        this.load.image('corrupt7', 'assets/corruption7.png');
        this.load.image('corrupt8', 'assets/corruption8.png');
        this.load.image('corrupt9', 'assets/corruption9.png');
        
        this.load.image('mechant1HS', 'assets/ennemie1HS.png');
        this.load.image('jeanPierreHS','assets/chienHS.png');
        
        
        this.load.spritesheet('home', 'assets/boutonHome.png', { frameWidth: 57, frameHeight: 58});
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
    
    boutonHOME = this.add.sprite(861,35,'home').setScrollFactor(0).setInteractive({ cursor: 'pointer' });
//boutonCommande = this.add.sprite(744,250, 'commandes').setInteractive({ cursor: 'pointer' });
    
    
    
    groupeBullets= this.physics.add.group();
    groupeFleches= this.physics.add.group();
    
    
    //player = this.physics.add.sprite(3100, 200, 'dude');
    //player = this.physics.add.sprite(8803, 1968, 'dude');
    player = this.physics.add.sprite(9100, 650, 'dude');
    //player = this.physics.add.sprite(5000, 400, 'dude');
    //player = this.physics.add.sprite(300, 1300, 'dude');
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
    
    const monnaieObjects = map.getObjectLayer('argentPiece').objects;
    monnaies1 = this.physics.add.group({
    });
    for (const monnaie1 of monnaieObjects) {
    monnaies1.create(monnaie1.x, monnaie1.y, 'monnaie');  
    }
    /////////////////////////////////////////coffres/////////////////////////////////////////////////
    
    const coffreObjects = map.getObjectLayer('argentCoffre').objects;
    grosseMonnaies1 = this.physics.add.group({
    }); 
    for (const grosseMonnaie1 of coffreObjects) {
    grosseMonnaies1.create(grosseMonnaie1.x, grosseMonnaie1.y, 'grosseMonnaie');  
    }
    ////////////////////////////////power-up bourse/leurre/////////////////////////////
    
    const leurreObjects = map.getObjectLayer('leurreBourse').objects;
    bourseLeurres1 = this.physics.add.group({
    }); 
    for (const bourseLeurre1 of leurreObjects) {
    bourseLeurres1.create(bourseLeurre1.x, bourseLeurre1.y, 'leurre');  
    }
    
    ///////////////////////////////plateforme mouvante///////////////////////////////////////////
    const plateformeObjects = map.getObjectLayer('plateformeMouvante').objects;
    plateformes1 = this.physics.add.group({
    }); 
    for (const plateforme1 of plateformeObjects) {
    plateformes1.create(plateforme1.x, plateforme1.y, 'plateformeMouvante');  
    }
    ////////////////////////////////////////enemis////////////////////////////////////////////////////////
    
    
    
    
    
            
    //////////////monstresA//////////////////////////      
    const enemieObjects = map.getObjectLayer('enemisA').objects;
    enemies1 = this.physics.add.group({
    }); 
    //enemies1.setSize(107,159);
    for (const enemie1 of enemieObjects) {
    enemies1.create(enemie1.x, enemie1.y, 'mechant1').setSize(107,159);
    
    }
    
    ///////////////////////monstresB///////////////////////
    
    const enemieObjects2 = map.getObjectLayer('enemisB').objects;
    enemies2 = this.physics.add.group({
    }); 
    for (const enemie2 of enemieObjects2) {
    enemies2.create(enemie2.x, enemie2.y, 'monstre2');       
    }
    for (const enemie2 of enemies2.children.entries) {
            enemie2.direction = 'droite';
            enemie2.isDed = true;
    } 
    ////////////////////monstreC///////////////////////////////////
    
    const enemieObjects3 = map.getObjectLayer('enemisC').objects;
        this.enemies3 = this.physics.add.group({
    }); 
    for (const enemie3 of enemieObjects3) {
        this.enemies3.create(enemie3.x, enemie3.y, 'monstre3');       
    }
    for (const enemie3 of this.enemies3.children.entries) {
     enemie3.scoreCorruptionTireur = 3;
        /*if(enemie3.scoreCorruptionTireur = 3){
            enemie3.destroy();
        }
        */
    } 
    ////////////////////monstreD///////////////////////////////////
    
    const enemieObjects4 = map.getObjectLayer('enemisD').objects;
    enemies4 = this.physics.add.group({
    }); 
    for (const enemie4 of enemieObjects4) {
    enemies4.create(enemie4.x, enemie4.y, 'monstre4');       
    }
    for (const enemie4 of enemies4.children.entries) {
            enemie4.direction = 'droite';
            enemie4.isDed = true;
    } 
    ///////////////////////monstreE///////////////////////////////////////
    const enemieObjects5 = map.getObjectLayer('enemisE').objects;
        this.enemies5 = this.physics.add.group({
    }); 
    for (const enemie5 of enemieObjects5) {
        this.enemies5.create(enemie5.x, enemie5.y, 'monstre5');  
    }
    for (const enemie5 of this.enemies5.children.entries) {
            enemie5.scoreCorruptionSoldat = 10;  
    } 
    
    
    ////////////////////////////////////////////////Animations/////////////////////////////////////
    
    
    //////////////////////////////////////animations Homard(personnage jouable)//////////////////////  
        
        this.anims.create({
            key: 'homeSimple',
            frames: this.anims.generateFrameNumbers('home', { start: 0, end: 0 }),
            frameRate: 5,
        });
        this.anims.create({
            key: 'homeDessus',
            frames: this.anims.generateFrameNumbers('home', { start: 1, end: 1 }),
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
        
        /*this.anims.create({
            key: 'depart',
            frames: this.anims.generateFrameNames('dude', { prefix: 'depart/frame', start: 0, end: 3, zeroPad: 4 }),
            frameRate: 20
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNames('dude', { prefix: 'left/frame', start: 4, end: 12, zeroPad: 4 }),
            frameRate: 20
        });
    
    
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 12 }),
            frameRate: 20,
            repeat: -1
        });*/
    
    
    
    /////////////////////////////////////animations ennemies/////////////////////////////////
    
    /////////////////////////////////ennemies 1 / les Maurice////////////////////////////////////
    
    this.anims.create({
            key: 'courseGaucheMaurice1',
            frames: this.anims.generateFrameNumbers('mechant1', { start: 1, end: 8 }),
            frameRate: 8,
            repeat: -1
        });
    this.anims.create({
            key: 'courseGaucheMaurice2',
            frames: this.anims.generateFrameNumbers('mechant1', { start: 1, end: 8 }),
            frameRate: 14,
            repeat: -1
        });
    this.anims.create({
            key: 'courseGaucheMaurice3',
            frames: this.anims.generateFrameNumbers('mechant1', { start: 1, end: 8 }),
            frameRate: 20,
            repeat: -1
        });
    
    this.anims.create({
            key: 'Mauriceturn',
            frames: [ { key: 'mechant1', frame: 0 } ],
            frameRate: 10,
            repeat: -1
        });
    this.anims.create({
            key: 'MauriceAssome',
            frames: [ { key: 'mechant1', frame: 9 } ],
            frameRate: 20
        });
    
    /////////////////////////////////ennemies 4 / les Jean-Pierre(chiens)////////////////////////////////////
    
    this.anims.create({
            key: 'marcheJeanPierre',
            frames: this.anims.generateFrameNumbers('monstre4', { start: 1, end: 8 }),
            frameRate: 8,
            repeat: -1
        });
    this.anims.create({
            key: 'courseJeanPierre',
            frames: this.anims.generateFrameNumbers('monstre4', { start: 10, end: 17 }),
            frameRate: 15,
            repeat: -1
        });

//////////////////////////////////////////////animations UI/////////////////////////////////////////
    
    ////////////////////////////////////power-up bourse//////////////////////////////
    this.anims.create({
            key: 'posssedePas',
            frames: this.anims.generateFrameNumbers('bourseEtat', { start: 0, end: 0 }),
            frameRate: 5,
        });
    this.anims.create({
            key: 'posssede',
            frames: this.anims.generateFrameNumbers('bourseEtat', { start: 1, end: 1 }),
            frameRate: 5,
        });
    //////////////////////////////////Etat de remplissage de la bourse/////////////////////////////////
    
    this.anims.create({
            key: 'vide',
            frames: this.anims.generateFrameNumbers('etatVraiBourse', { start: 0, end: 0 }),
            frameRate: 5,
        });
    this.anims.create({
            key: 'petit',
            frames: this.anims.generateFrameNumbers('etatVraiBourse', { start: 1, end: 1 }),
            frameRate: 5,
        });
    this.anims.create({
            key: 'moyens',
            frames: this.anims.generateFrameNumbers('etatVraiBourse', { start: 2, end: 2 }),
            frameRate: 5,
        });
    this.anims.create({
            key: 'plein',
            frames: this.anims.generateFrameNumbers('etatVraiBourse', { start: 3, end: 3 }),
            frameRate: 5,
        });
    

        cursors = this.input.keyboard.createCursorKeys();
        
        
        this.add.image(138.5,47,'interface').setScrollFactor(0);
        powerUpUI = this.add.image(190,48,'bourseEtat').setScrollFactor(0);
        powerUpUI = this.physics.add.sprite(190,48, 'bourseEtat').setScrollFactor(0);
        //.setDepth(5)
        //.setScale(0.7);
        powerUpUI.body.allowGravity = false; 
        
        etatVraiBourse = this.add.image(130,50,'etatVraiBourse').setScrollFactor(0);
        etatVraiBourse = this.physics.add.sprite(130,50, 'etatVraiBourse').setScrollFactor(0);
        //.setDepth(5);
        //.setScale(0.7);
        etatVraiBourse.body.allowGravity = false; 
        
        scoreText = this.add.text(15, 28,score, { fontSize: '20px', fill: '#501116' }).setScrollFactor(0);
        scoreObjectif = this.add.text(40, 50,'400', { fontSize: '20px', fill: '#501116' }).setScrollFactor(0);
            
        ///////////collider//////////////////
        

        this.physics.add.collider(player, bloquant);  
        this.physics.add.collider(player, plateformes1);//,contactPlateforme,null, this);
        this.physics.add.collider(bloquantAscenseur, plateformes1);
        this.physics.add.collider(groupeBullets, bloquant, contactBulletMur, null, this);
        this.physics.add.collider(monnaies1, bloquant);
        this.physics.add.collider(grosseMonnaies1, bloquant);
        this.physics.add.collider(bourseLeurres1, bloquant);
        this.physics.add.collider(groupeFleches, bloquant,contactFlecheMur, null, this);
        this.physics.add.collider(groupeFleches, player,contactFlecheJoueur,null, this);
        this.physics.add.collider(enemies1, bloquant);
        this.physics.add.collider(enemies2, bloquant);
        this.physics.add.collider(this.enemies3, bloquant);
        this.physics.add.collider(enemies4, bloquant);
        this.physics.add.collider(this.enemies5, bloquant);
        this.physics.add.overlap(player, monnaies1, contactPiece, null, this);
        this.physics.add.overlap(player, grosseMonnaies1, contactCoffre, null, this);
        this.physics.add.overlap(player, bourseLeurres1, contactLeurre, null, this);
        this.physics.add.overlap(player, enemies1, contactMechantA, null, this);
        this.physics.add.overlap(player, enemies2, contactMechantB, null, this);
        this.physics.add.overlap(player, this.enemies3, contactMechantC, null, this);
        this.physics.add.overlap(player, enemies4, contactMechantD, null, this);
        this.physics.add.collider(groupeBullets, enemies1, contactBulletMechantA, null, this);
        this.physics.add.collider(groupeBullets, enemies2, contactBulletMechantB, null, this);
        this.physics.add.collider(groupeBullets, this.enemies3, contactBulletMechantC, null, this);
        this.physics.add.collider(groupeBullets, this.enemies5, contactBulletMechantE, null, this);
        
    
    
    
    
    

////////////////////////////////////////////////contact pièce et joueur////////////////////////////
    function contactPiece(player, monnaie1){
        monnaie1.destroy();
        resistance = true;
        score += 1;
        scoreText.setText(score);
        console.log('wesh')
        
    }

////////////////////////////////////////////////////contact fleche et joueur///////////////////////
    function contactFlecheJoueur(groupeFleches, player){ 
            fleche.destroy();
            gameOver = true;
            this.physics.pause();
            this.add.text(335, 360, "Partie perdu", { fontSize: '36px', fill: '#ff0000' }).setScrollFactor(0);   
            
        }

////////////////////////////////////////////////contact coffre et joueur//////////////////////////
    function contactCoffre(player, grosseMonnaie1){
        grosseMonnaie1.destroy();
        resistance = true;
        score += 50;
        scoreText.setText(score);
    }
/////////////////////////////////////////////contact bourse/leurre et joueur///////////////////////
    function contactLeurre(player, bourseLeurre1){
        bourseLeurre1.destroy();
        protectionLeurre = true; 
        powerUpUI.anims.play("posssede",true);
        
        
    }
////////////////////////////////////contact balles et murs//////////////////////////////////
    function contactBulletMur(bloquant, groupeBullets){ 
        bullet.destroy(); 
    }
////////////////////////////////////contact fleches et murs//////////////////////////////////
    function contactFlecheMur(groupeFleches, bloquant){ 
        fleche.destroy(); 
    }
////////////////////////////////Contact balles et enemies////////////////////////////////////////
    

    
    function contactBulletMechantA(enemie1, bullet){ 
        bullet.destroy();
        enemie1.destroy();      
    }
    function contactBulletMechantB(enemie2, bullet){ 
        bullet.destroy();
        enemie2.destroy();       
    }
    function contactBulletMechantC(bullet, enemie3){ 
        console.log("ozbvobv")
        bullet.destroy();
        if(enemie3.scoreCorruptionTireur == 3){
            enemie3.destroy();
            enemie3 = this.enemies3.create(enemie3.x, enemie3.y, 'monstre3').setOrigin(0.5,0.5);
            enemie3.scoreCorruptionTireur = 2
            console.log("corruption1")
            destructImmage = false;
            enemie3.corruption1 =this.add.image(enemie3.x,enemie3.y-93.5,'corrupt1');
            if(destructImmage == true){
                enemie3.corruption1.destroy();
                enemie3.corruption1.setAlpha(0);
        
            }
            /*if(destructImmage == false){
                corruption1.setAlpha(1);
        
            }*/
        }
        else if(enemie3.scoreCorruptionTireur == 2){
            enemie3.destroy();
            enemie3 = this.enemies3.create(enemie3.x, enemie3.y, 'monstre3').setOrigin(0.5,0.5);
            enemie3.scoreCorruptionTireur = 1
            console.log("corruption2")
            this.add.image(enemie3.x,enemie3.y-93.5,'corrupt2');
        }
        else if(enemie3.scoreCorruptionTireur == 1){
            enemie3.destroy();
            console.log("corruption terminé")
            this.add.image(enemie3.x,enemie3.y-93.5,'corrupt2').destroy();
        }
    }
    
    function contactBulletMechantE(bullet, enemie5){ 
        console.log("ozbvobv")
        bullet.destroy();
        if(enemie5.scoreCorruptionSoldat == 10){
            enemie5.destroy();
            enemie5 = this.enemies5.create(enemie5.x, enemie5.y, 'monstre5').setOrigin(0.5,0.5);
            enemie5.scoreCorruptionSoldat = 9;
            console.log("corruption1")
            this.add.image(enemie5.x,enemie5.y-109.5,'corrupt1');
        }
        else if(enemie5.scoreCorruptionSoldat == 9){
            enemie5.destroy();
            enemie5 = this.enemies5.create(enemie5.x, enemie5.y, 'monstre5').setOrigin(0.5,0.5);
            enemie5.scoreCorruptionSoldat = 8;
            console.log("corruption2")
            this.add.image(enemie5.x,enemie5.y-109.5,'corrupt2');
        }
        else if(enemie5.scoreCorruptionSoldat == 8){
            enemie5.destroy();
            enemie5 = this.enemies5.create(enemie5.x, enemie5.y, 'monstre5').setOrigin(0.5,0.5);
            enemie5.scoreCorruptionSoldat = 7;
            console.log("corruption3")
            this.add.image(enemie5.x,enemie5.y-109.5,'corrupt3');
        }
        else if(enemie5.scoreCorruptionSoldat == 7){
            enemie5.destroy();
            enemie5 = this.enemies5.create(enemie5.x, enemie5.y, 'monstre5').setOrigin(0.5,0.5);
            enemie5.scoreCorruptionSoldat = 6;
            console.log("corruption4")
            this.add.image(enemie5.x,enemie5.y-109.5,'corrupt4');
        }
        else if(enemie5.scoreCorruptionSoldat == 6){
            enemie5.destroy();
            enemie5 = this.enemies5.create(enemie5.x, enemie5.y, 'monstre5').setOrigin(0.5,0.5);
            enemie5.scoreCorruptionSoldat = 5;
            console.log("corruption5")
            this.add.image(enemie5.x,enemie5.y-109.5,'corrupt5');
        }
        else if(enemie5.scoreCorruptionSoldat == 5){
            enemie5.destroy();
            enemie5 = this.enemies5.create(enemie5.x, enemie5.y, 'monstre5').setOrigin(0.5,0.5);
            enemie5.scoreCorruptionSoldat = 4;
            console.log("corruption6")
            this.add.image(enemie5.x,enemie5.y-109.5,'corrupt6');
        }
        else if(enemie5.scoreCorruptionSoldat == 4){
            enemie5.destroy();
            enemie5 = this.enemies5.create(enemie5.x, enemie5.y, 'monstre5').setOrigin(0.5,0.5);
            enemie5.scoreCorruptionSoldat = 3;
            console.log("corruption7")
            this.add.image(enemie5.x,enemie5.y-109.5,'corrupt7');
        }
        else if(enemie5.scoreCorruptionSoldat == 3){
            enemie5.destroy();
            enemie5 = this.enemies5.create(enemie5.x, enemie5.y, 'monstre5').setOrigin(0.5,0.5);
            enemie5.scoreCorruptionSoldat = 2;
            console.log("corruption8")
            this.add.image(enemie5.x,enemie5.y-109.5,'corrupt8');
        }
        else if(enemie5.scoreCorruptionSoldat == 2){
            enemie5.destroy();
            enemie5 = this.enemies5.create(enemie5.x, enemie5.y, 'monstre5').setOrigin(0.5,0.5);
            enemie5.scoreCorruptionSoldat = 1;
            console.log("corruption9")
            this.add.image(enemie5.x,enemie5.y-109.5,'corrupt9');
        }
        else if(enemie5.scoreCorruptionSoldat == 1){
            enemie5.destroy();
            console.log("corruption terminé")
        } 
    }
    
       

    
//----------timer---------//
// setTimeout(function(){ce qu'il se passe}, temps en millisecondes);
//-----------------------//
/////////////////////////////////////////////contact entre enemis et joueur///////////////////////////////////////
    
    
    
    function contactMechantA(player, enemie1){ 
        if (enemie1.body.touching.up && player.body.touching.down){
            enemie1.destroy();
            score += 1;
            resistance = true;
            scoreText.setText(score);
            
            if(enemie1.directiongauche == true){ 
                this.add.image(enemie1.x,enemie1.y,'mechant1HS').flipX= false;
            }
            if(enemie1.directiongauche == false){ 
                this.add.image(enemie1.x,enemie1.y,'mechant1HS').flipX= true;
            }
            
        }    
        else{ 
            
            if(protectionLeurre == false){
                if (resistance == false){
                    gameOver = true;
                    this.physics.pause();
                    
                }
                if (resistance == true){
                    enemie1.destroy();
                    score = 0;
                    resistance = false;
                    scoreText.setText(score);
                }
            }
            
            if (protectionLeurre == true){
                enemie1.destroy();
                protectionLeurre =false;
                powerUpUI.anims.play("posssedePas",true);
            }
            
        }
    }
    function contactMechantB(player, enemie2){ 
        if (enemie2.body.touching.up && player.body.touching.down) {
            enemie2.destroy();
            score += 3;
            resistance = true;
            scoreText.setText(score);
        }
    }
    function contactMechantC(player, enemie3){ 
        if (enemie3.body.touching.up && player.body.touching.down) {
            enemie3.destroy();
            score += 2;
            resistance = true;
            scoreText.setText(score);
        }
    }
    function contactMechantD(player, enemie4){ 
        if (enemie4.body.touching.up && player.body.touching.down){
            enemie4.destroy();
            if(enemie4.directiongauche == true){ 
                this.add.image(enemie4.x,enemie4.y,'jeanPierreHS').flipX= false;
            }
            if(enemie4.directiongauche == false){ 
                this.add.image(enemie4.x,enemie4.y,'jeanPierreHS').flipX= true;
            }
            
        }
        else{   
            gameOver = true;
            this.physics.pause();
            this.add.text(335, 360, "Partie perdu", { fontSize: '36px', fill: '#ff0000' }).setScrollFactor(0);
        }      
    }
    /*if(score = 0){
        etatVraiBourse.anims.play("vide",true);
    }
    if(score>=1 && score <=50){
        etatVraiBourse.anims.play("petit",true);
    }
    if(score>=51 && score <=100){
        etatVraiBourse.anims.play("moyens",true);
    }
    if(score>=101 ){
        etatVraiBourse.anims.play("plein",true);
    }
    */
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
           

    
    
    
    
    
    
    
    
    
    
    
update (){
    
    boutonHOME.on('pointerover', function (event) {
        boutonHOME.anims.play('homeDessus',true);
        
    });
    
    boutonHOME.on('pointerout', function (event) {
        boutonHOME.anims.play('homeSimple',true);
       
    });

    boutonHOME.on('pointerdown', function (pointer) {
               boutonHomme = true;  
    });
    if(boutonHomme == true){
        boutonHomme = false;
        this.scene.start("EcranTitre");
    }
    
    ///////////////////////fin du niveau///////////////////////////////////////////////
   if(player.x > 10740){
       if(score >=400){
           this.physics.pause();
           this.add.text(448, 224, "Partie Gagnée!!!!!!!!!!!!!", { fontSize: '36px', fill: '#75161e' }).setScrollFactor(0);
       }
       if(score <=399){
           this.physics.pause();
           this.add.text(448, 224, "Partie Perdu...", { fontSize: '36px', fill: '#75161e' }).setScrollFactor(0);
       }
   }
    
    
    
    
    
    
    if(gameOver == true){
        this.scene.restart();
        score = 0;
        protectionLeurre = false;
        resistance =false;
        
        gameOver = false;
    }
    
    
    
    if(score == 0){
        etatVraiBourse.anims.play("vide",true);
    }
    if(score>=1 && score <=50){
        etatVraiBourse.anims.play("petit",true);
        
    }
    if(score>=51 && score <=100){
        etatVraiBourse.anims.play("moyens",true);
    }
    if(score>=101 && score <= 500 ){
        etatVraiBourse.anims.play("plein",true);
    }
    
    
    
   //jauge_corruption.anims.play("corruption0",true);
    if (!this.input.activePointer.isDown && !cursors.down.isDown){ 
        jetDePiece = true;
        
    if (this.input.activePointer.leftButtonReleased && jetDePiece === true && tirDePiece === false){
        player.anims.play('jette', true);
    }
      
    }
    /*if (playerY ++){
        console.log ("monte")
    }
    */
    
    if ((KeyQ.isDown ||cursors.left.isDown) && player.body.blocked.down ){
        player.setVelocityX(-600);
        dirGauche =true;
        dirDroite = false;
        player.flipX= true;
        player.anims.play('right', true);
        //player.playAfterRepeat('depart');
        //player.chain([ 'depart', 'left' ]);
        //player.anims.play('depart', true);
    }
    else if ((KeyD.isDown||cursors.right.isDown) && player.body.blocked.down){
        player.setVelocityX(600);
        dirDroite =true;
        dirGauche = false;
        
        player.flipX= false;
        //player.chain([ 'depart', 'left' ]);
        //player.anims.play('depart', true);
        player.anims.play('right', true);
    }
    else if ((KeyQ.isDown ||cursors.left.isDown) && !player.body.blocked.down ){
        player.setVelocityX(-600);
        dirGauche =true;
        dirDroite = false;
        player.flipX= true;
        
        //player.playAfterRepeat('depart');
        //player.chain([ 'depart', 'left' ]);
        //player.anims.play('depart', true);
    }
    else if ((KeyD.isDown||cursors.right.isDown) && !player.body.blocked.down){
        player.setVelocityX(600);
        dirDroite =true;
        dirGauche = false;
        
        player.flipX= false;
        //player.chain([ 'depart', 'left' ]);
        //player.anims.play('depart', true);
        
    }
    
    
    else if (player.body.blocked.down){    
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    else if (!player.body.blocked.down){    
        player.setVelocityX(0);
        
    }
    //player.body.touching.down
        
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
    /*if (this.input.activePointer.leftButtonReleased && jetDePiece === true && tirDePiece === false){
        player.anims.play('jette', true);
    }
    */
    
   
    
    if(courseDepart == true ){ // relance du compteur des projectiles //
            console.log("courseTimerCommence")
            compteurDepart-- ;
            if(compteurDepart == 0){
                compteurDepart = 100;
                console.log("courseTimerFinis")
                courseDepart = false ;
            }
        }
    
    
    
    
    

    ///////////////////////////////////Compteurs///////////////////////////////////
    
    
    
    if(tireurPrendPiece == false ){ 
            enemie3.scoreCorruptionTireur -= 1;
            compteurPieceTireur-- ;
            if(compteurPieceTireur == 0){
                compteurPieceTireur = 100;
                tireurPrendPiece = true ;
            }
        }
    if(SoldatPrendPiece == false ){ 
            enemie5.scoreCorruptionSoldat -= 1;
            SoldatPrendPiece-- ;
            if(SoldatPrendPiece == 0){
                compteurPieceSoldat = 100;
                SoldatPrendPiece = true ;
            }
        }
    
    if(tirFleche == false ){ 
            compteurFleche-- ;
            if(compteurFleche == 0){
                compteurFleche = 150;
                tirFleche = true ;
            }
        }
    if(tirDePiece == false ){ 
            compteurtirDePiece-- ;
            if(compteurtirDePiece == 0){
                compteurtirDePiece = 50;
                tirDePiece = true ;
            }
        }
  
    
    if(destructImmage == false ){ 
        console.log("CompteurActive")
            compteurDestructionImmage-- ;
            if(compteurDestructionImmage == 0){
                compteurDestructionImmage = 100;
                destructImmage = true ;
                console.log("CompteurDesactive")
            }
        }

    
    
    
    
    //////////////////////////////////////////////Tir de pièce/////////////////////////////////////////////////
    if (this.input.activePointer.isDown && score >0 && jetDePiece || cursors.down.isDown && score >0 && jetDePiece){
        if (dirGauche == true && dirDroite == false){
            score -= 1;
            scoreText.setText(score);
            jetDePiece = false; 
            tirDePiece = false;
            bullet = groupeBullets.create(player.x-32, player.y - 30, 'danger'); // permet de créer la carte à coté du joueur //
    // Physique de la carte //
            bullet.setCollideWorldBounds(false);
            bullet.body.allowGravity =false;
            bullet.setVelocity(-1000 , 0); // vitesse en x et en y
        }
        if (dirDroite == true && dirGauche == false){
            score -= 1;
            scoreText.setText(score);
            jetDePiece = false; 
            tirDePiece = false;
            bullet = groupeBullets.create(player.x+32, player.y - 30, 'danger'); // permet de créer la carte à coté du joueur //
            // Physique de la carte //
            bullet.setCollideWorldBounds(false);
            bullet.body.allowGravity =false;
            bullet.setVelocity(1000 , 0);
        }
    }
    
    
    //player.anims.play('jette', true);
    
    
    
    
    
    
    
    
    
    
    
    
   
    
    /////////////////////////////////////déplacements plateforme mouvante/////////////////////////////////////////////
    
    for (const plateforme1 of plateformes1.children.entries) {
        plateforme1.body.allowGravity =false;
        plateforme1.setPushable(false);
        if(plateforme1.y >2112){
            //ascensseurMonte = true;
            plateforme1.setVelocityY(-200);
            //if(plateforme1.body.blocked.up){
                //plateforme1.setVelocityY(200);
            //}
        }
        if(plateforme1.y < 832){
            //ascensseurMonte = false;
            plateforme1.setVelocityY(200);
        }
        //if(plateforme1.velocityY= 0 && ascensseurMonte === true){
           // plateforme1.setVelocityY(-200);
        //}
        
    }
    
    
    
    
    
    
    
    
    
    
    
    ///////////////////////////////////////////////////////comportement enemis/////////////////////////////////////////
    
    
    
    
    /////////////////////////////////////////////////enemiA///////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    for (const enemie1 of enemies1.children.entries) {
        if(enemie1.x - player.x < 401 && enemie1.x - player.x > 80 && enemie1.y - player.y < 225 && enemie1.y - player.y > -225){
            enemie1.directiongauche = true;
            if(score<=50){
                enemie1.setVelocityX(-200);
                enemie1.flipX= false;
                enemie1.anims.play('courseGaucheMaurice1', true);
                
            }
            if(score>=51 && score < 100){
                enemie1.setVelocityX(-300);
                enemie1.flipX= false;
                enemie1.anims.play('courseGaucheMaurice2', true);
            }
            if(score>=100){
                enemie1.setVelocityX(-500);
                enemie1.flipX= false;
                enemie1.anims.play('courseGaucheMaurice3', true);
            }   
        }
        else if(player.x - enemie1.x <401 && player.x - enemie1.x > 80 && enemie1.y - player.y < 225 && enemie1.y - player.y > -225){
            enemie1.directiongauche = false;
            if(score<=50){
                enemie1.setVelocityX(200); 
                enemie1.flipX= true;
                enemie1.anims.play('courseGaucheMaurice1', true);
            }
            if(score>=51 && score < 100){
                enemie1.setVelocityX(300);
                enemie1.flipX= true;
                enemie1.anims.play('courseGaucheMaurice2', true);
            }
            if(score>=100){
                enemie1.setVelocityX(500);
                enemie1.flipX= true;
                enemie1.anims.play('courseGaucheMaurice3', true);
            }
        }
        else{enemie1.setVelocityX(0);
             enemie1.anims.play('Mauriceturn', true);
        }  
    }
    /////////////////////////////////////////////////enemiB///////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
     for (const enemie2 of enemies2.children.entries) {
        
        if (enemie2.body.blocked.left) {
            enemie2.direction = 'droite';     
        }
        if (enemie2.body.blocked.right) {
            enemie2.direction = 'gauche';
        }
        if (enemie2.direction === 'droite' && peurDroite == false && peurGauche==false) {
            enemie2.setVelocityX(100);
        }
        if (enemie2.direction === 'gauche' && peurDroite == false && peurGauche==false){ 
            enemie2.setVelocityX(-100);
        }
        if(enemie2.x - player.x < 289 && enemie2.x - player.x > 32 && enemie2.y - player.y < 224 && enemie2.y - player.y > -159 ){
            enemie2.peurDroite = true;
            enemie2.setVelocityX(300);
            enemie2.fuiteDroite = true;
        }
        if(player.x - enemie2.x <289 && player.x - enemie2.x > 32 && enemie2.y - player.y < 224 && enemie2.y - player.y > -159){
            enemie2.peurGauche = true;
            enemie2.setVelocityX(-300); 
        }
    }
    
    /////////////////////////////////////////////////enemiC///////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    for (const enemie3 of this.enemies3.children.entries) {
        if(enemie3.x - player.x < 500 && enemie3.x - player.x > 48 && enemie3.y - player.y < 160 && enemie3.y - player.y > -160  && tirFleche === true){
            console.log("Passe en true");
            tirFleche = false;
            fleche = groupeFleches.create(enemie3.x-66, enemie3.y-32, 'fleche').setFlipX(true);
            fleche.body.allowGravity =true;
            fleche.setVelocityX(-600); 
        }
        if(player.x - enemie3.x < 500 && player.x - enemie3.x > 48 && enemie3.y - player.y < 160 && enemie3.y - player.y > -160 && tirFleche === true){
            console.log("Passe en true mais à droite");
            tirFleche= false;
            fleche = groupeFleches.create(enemie3.x+66, enemie3.y-32, 'fleche');
            fleche.body.allowGravity =true;
            fleche.setVelocityX(600); 
        }
        else{
            
        }
        
    }
    /////////////////////////////////////////////////enemiD///////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    for (const enemie4 of enemies4.children.entries) {
        if (traqueChien === false){ 
            
            if (enemie4.body.blocked.right) {
                enemie4.direction = 'gauche';
                enemie4.flipX= false;
                enemie4.directiongauche = true;
            }
            if (enemie4.body.blocked.left) {
                enemie4.direction = 'droite';
                enemie4.flipX= true;
                enemie4.directiongauche = false;
            }
            if (enemie4.direction === 'gauche'){
                enemie4.setVelocityX(-200);
                enemie4.anims.play('marcheJeanPierre', true);
                enemie4.directiongauche = true;

            }
            if (enemie4.direction === 'droite'){
                enemie4.setVelocityX(200);
                enemie4.anims.play('marcheJeanPierre', true);
                enemie4.directiongauche = false;

            }
            
        
            if( enemie4.direction ==='droite' && player.x - enemie4.x <481 && player.x - enemie4.x > 0 && enemie4.y - player.y < 64 && enemie4.y - player.y > -64){
                traqueChien = true;
                enemie4.directiongauche = false;
            
            }
            if( enemie4.direction ==='gauche' && enemie4.x - player.x < 481 && enemie4.x - player.x > 0 && enemie4.y - player.y < 64 && enemie4.y - player.y > -64 ){
                traqueChien = true;
                enemie4.directiongauche = true;
            }
        }
        if (traqueChien === true){
            if (player.x - enemie4.x <481 && player.x - enemie4.x > 32 && enemie4.y - player.y < 321 && enemie4.y - player.y > -64){
                enemie4.setVelocityX(400);
                enemie4.flipX= true;
                enemie4.anims.play('courseJeanPierre', true);
                enemie4.directiongauche = false;
            }
            else if (enemie4.x - player.x < 481 && enemie4.x - player.x > 32 && enemie4.y - player.y < 321 && enemie4.y - player.y > -64 ){
                enemie4.setVelocityX(-400);
                enemie4.flipX= false;
                enemie4.anims.play('courseJeanPierre', true);
                enemie4.directiongauche = true;
            }
            
        
        }
        else{
            traqueChien = false;
            }  
          
    }
    
    /////////////////////////////////////////////////enemiE///////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    for (const enemie5 of this.enemies5.children.entries) {
        
        
        if(enemie5.x - player.x < 160 && enemie5.x - player.x > -48 && enemie5.y - player.y < 192 && enemie5.y - player.y > -80 ){
            gameOver = true;
            this.physics.pause();
            this.add.text(335, 360, "Partie perdu", { fontSize: '36px', fill: '#ff0000' }).setScrollFactor(0);
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    }
    
    
    
}