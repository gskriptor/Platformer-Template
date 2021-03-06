let game;
 
// global game options
let gameOptions = {
    
    // platform speed range, in pixels per second
    platformSpeedRange: [280, 280],
 
    // mountain speed, in pixels per second
    mountainSpeed: 80,
 
    // spawn range, how far should be the rightmost platform from the right edge
    // before next platform spawns, in pixels
    spawnRange: [80, 300],
 
    // platform width range, in pixels
    platformSizeRange: [90, 300],
 
    // a height range between rightmost platform and next platform to be spawned
    platformHeightRange: [-5, 5],
 
    // a scale to be multiplied by platformHeightRange
    platformHeighScale: 20,
 
    // platform max and min height, as screen height ratio
    platformVerticalLimit: [0.4, 0.8],
 
    // player gravity
    playerGravity: 900,
 
    // player jump force
    jumpForce: 400,
 
    // player starting X position
    playerStartPosition: 200,
 
    // consecutive jumps allowed
    jumps: 2,
 let game;let game;let game;
 
// global game options
let gameOptions = {
    
    // platform speed range, in pixels per second
    platformSpeedRange: [280, 280],
 
    // mountain speed, in pixels per second
    mountainSpeed: 80,
 
    // spawn range, how far should be the rightmost platform from the right edge
    // before next platform spawns, in pixels
    spawnRange: [80, 300],
 
    // platform width range, in pixels
    platformSizeRange: [90, 300],
 
    // a height range between rightmost platform and next platform to be spawned
    platformHeightRange: [-5, 5],
 
    // a scale to be multiplied by platformHeightRange
    platformHeighScale: 20,
 
    // platform max and min height, as screen height ratio
    platformVerticalLimit: [0.4, 0.8],
 
    // player gravity
    playerGravity: 900,
 
    // player jump force
    jumpForce: 400,
 
    // player starting X position
    playerStartPosition: 200,
 
    // consecutive jumps allowed
    jumps: 2,
 
    // % of probability a coin appears on the platform
    coinPercent: 28,
 
    // % of probability a fire appears on the platform
    firePercent: 2
};
 
window.onload = function() {
 
    // object containing configuration options
    let gameConfig = {
        type: Phaser.AUTO,
        width: 1334,
        height: 750,
        scene: [
          gameTitle,
          preloadGame,
          playGame,
          gameEnd
        ],
        backgroundColor: 0,
 
        // physics settings
        physics: {
            default: "arcade"
        }
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
    resize();
    window.addEventListener("resize", resize, false);
}

// game title screen
class gameTitle extends Phaser.Scene{
    constructor(){
        super("GameTitle");
    }
    preload(){
        this.load.image("knighthawks", "knighthawks_font.png");
        this.load.image("title-screen", "scdmrTitleLGOfnlCentered.jpg");
    }
    create(){

        this.titleScreen = this.add.tileSprite(this.game.config.width * 0.5, this.game.config.height * 0.5, this.game.config.width * 0.5, this.scene.height / 2, 'title-screen');
        this.titleScreen.setScale(2);
        this.titleScreen.setOrigin(0.5);
        this.startText = this.add.text(this.game.config.width * 0.5, 660, 'START', { font: '64px Arial' });
        this.startText.setOrigin(0.5);
        // checking for input
        this.input.on("pointerdown", this.startGame, this);
        this.input.keyboard.on("keydown", this.startGame, this);
    }
    
    startGame(){
        this.scene.start("PreloadGame");
    }
}

class gameEnd extends Phaser.Scene{
    constructor(){
        super("GameEnd");
    }
    preload(){
        //this.load.image("title-screen", "scdmrTitleLGOfnlCentered.jpg");
        //this.load.image('continueBtn', 'continueBtn.jpg');
        //this.load.image('quitBtn', 'quitBtn.jpg');
    }
    create(){

        this.thnx = this.add.text(this.game.config.width * 0.5, 330, 'THANK YOU FOR PLAYING', { 
            font: '64px sans',
            align: 'center'
        });
        this.thnx.setOrigin(0.5);

        // checking for input
        this.input.on("pointerdown", this.continueGame, this);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.input.keyboard.on("keydown", this.continueGame, this);
    }

    continueGame(){
        this.scene.start("GameTitle");
    }
}
 
// preloadGame scene
class preloadGame extends Phaser.Scene{
    constructor(){
        super("PreloadGame");
    }
    preload(){
        
        this.load.spritesheet('jets', 'rain.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        
    	this.load.spritesheet('rain', 'rain.png', {
    	    frameWidth: 16,
    	    frameHeight: 16
    	});

        this.load.image("platform", "grimTile.png");
 
        // player is a sprite sheet made by 24x48 pixels
        this.load.spritesheet("player", "meltdownRunnerhaze.png", {
            //frameWidth: 80,
            //frameHeight: 80
            frameWidth: 256,
            frameHeight: 256
        });

        // the coin is a sprite sheet made by 20x20 pixels
        this.load.spritesheet("coin", "star.png", {
            frameWidth: 32,
            frameHeight: 32
        });

        // the firecamp is a sprite sheet made by 32x58 pixels
        this.load.spritesheet("fire", "fireEnemy.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        
        //backgrounds
        this.load.image("synth-sun", "synthsun.jpg");
        this.load.image("synth-scape", "synthscape.png");
        this.load.image("synth-city", "synthcity.png");
        
        this.load.image('continueBtn', 'continueBtn.jpg');
        this.load.image('quitBtn', 'quitBtn.jpg');
    }
    create(){
        // setting player animation
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("player", {
                start: 0,
                //end: 11
                //end:7
                end: 9
            }),
            //frameRate: 18,
            frameRate: 20,
            repeat: -1
        });
 
        // setting coin animation
        this.anims.create({
            key: "rotate",
            frames: this.anims.generateFrameNumbers("coin", {
                start: 0,
                end: 1
            }),
            frameRate: 15,
            yoyo: true,
            repeat: -1
        });
 
        // setting fire animation
        this.anims.create({
            key: "burn",
            frames: this.anims.generateFrameNumbers("fire", {
                start: 0,
                end: 1
            }),
            frameRate: 15,
            repeat: -1
        });
 
        this.scene.start("PlayGame");
    }
}
 
// playGame scene
class playGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }
    create(){
        
        this.points = 0;
        
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        
        this.synthsun = this.add.tileSprite(800, 400, this.scene.width, this.scene.height, 'synth-sun');
        this.synthsun.setScale(1);
       // this.synthsun = this.add.tileSprite(400, 300, 'synth-sun');
       this.synthscape = this.add.tileSprite(600, 300, this.scene.width, this.scene.height, 'synth-scape');
        this.synthscape.setScale(1);
        //this.add.image(400, 300, 'synth-scape');
        this.synthcity = this.add.tileSprite(600, 300, this.scene.width, this.scene.height, 'synth-city');
        this.synthscape.setScale(1);
        //this.add.image(400, 300, 'synth-city');

        this.gover = this.gameOver = this.add.text(this.game.config.width * 0.5, 330, 'GAME OVER', { 
            font: '64px sans',
            align: 'center'
        });
        this.gover.setOrigin(0.5);
        this.gover.visible = false;
        
        this.continueBtn = this.add.sprite(180, 66, 'continueBtn');
        this.continueBtn.x = this.game.config.width * 0.5 - 200;
        this.continueBtn.y = this.game.config.height * 0.5 + 100;
        this.continueBtn.setOrigin(0.5);
        this.continueBtn.setScale(2);
        this.continueBtn.setInteractive();
        this.continueBtn.on('pointerdown', (pointer) => { this.scene.restart(); }, this);
        this.continueBtn.visible = false;
        
        this.quitBtn = this.add.sprite(180, 66, 'quitBtn');
        this.quitBtn.x = this.game.config.width * 0.5 + 200;
        this.quitBtn.y = this.game.config.height * 0.5 + 100;
        this.quitBtn.setOrigin(0.5);
        this.quitBtn.setScale(2);
        this.quitBtn.setInteractive();
        this.quitBtn.on('pointerdown', (pointer) => { this.scene.start("GameEnd"); }, this);
        this.quitBtn.visible = false;
        
        this.score = this.add.text(100, 80, 'SCORE: ' + this.points, { font: '20px Arial' });
        this.score.setOrigin(0.5);
        
        // group with all active platforms.
        this.platformGroup = this.add.group({
 
            // once a platform is removed, it's added to the pool
            removeCallback: function(platform){
                platform.scene.platformPool.add(platform);
            }
        });
 
        // platform pool
        this.platformPool = this.add.group({
 
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.platformGroup.add(platform);
            }
        });
 
        // group with all active coins.
        this.coinGroup = this.add.group({
 
            // once a coin is removed, it's added to the pool
            removeCallback: function(coin){
                coin.scene.coinPool.add(coin);
            }
        });
 
        // coin pool
        this.coinPool = this.add.group({
 
            // once a coin is removed from the pool, it's added to the active coins group
            removeCallback: function(coin){
                coin.scene.coinGroup.add(coin);
            }
        });
 
        // group with all active firecamps.
        this.fireGroup = this.add.group({
 
            // once a firecamp is removed, it's added to the pool
            removeCallback: function(fire){
                fire.scene.firePool.add(fire);
            }
        });
 
        // fire pool
        this.firePool = this.add.group({
 
            // once a fire is removed from the pool, it's added to the active fire group
            removeCallback: function(fire){
                fire.scene.fireGroup.add(fire);
            }
        });
 
        // keeping track of added platforms
        this.addedPlatforms = 0;
 
        // number of consecutive jumps made by the player so far
        this.playerJumps = 0;
 
        // adding a platform to the game, the arguments are platform width, x position and y position
        this.addPlatform(game.config.width, game.config.width / 2, game.config.height * gameOptions.platformVerticalLimit[1]);
 
        // adding the player;
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height * 0.7, "player");
        this.player.setGravityY(gameOptions.playerGravity);
        this.player.setDepth(2);
        this.player.scale = 0.16;
 
        // the player is not dying
        this.dying = false;
 
        // setting collisions between the player and the platform group
        this.platformCollider = this.physics.add.collider(this.player, this.platformGroup, function(){
 
            // play "run" animation if the player is on a platform
            if(!this.player.anims.isPlaying){
                this.player.anims.play("run");
            }
        }, null, this);
 
        // setting collisions between the player and the coin group
        this.physics.add.overlap(this.player, this.coinGroup, function(player, coin){
        
            this.tweens.add({
                targets: coin,
                y: coin.y - 100,
                alpha: 0,
                duration: 800,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function(){
                    this.coinGroup.killAndHide(coin);
                    this.coinGroup.remove(coin);
                },
                
            });
                    this.points += 1;
                    this.score.setText('score:' + this.points);
        }, null, this);
 
        // setting collisions between the player and the fire group
        this.physics.add.overlap(this.player, this.fireGroup, function(player, fire){
 
            this.dying = true;
            this.player.anims.stop();
            this.player.setFrame(9);
            this.player.body.setVelocityY(-200);
            this.physics.world.removeCollider(this.platformCollider);
 
        }, null, this);
        
        //check for input
        this.input.on("pointerdown", this.jump, this);
        
        this.input.keyboard.on("keydown", this.jump, this);
        
        this.createThrustEmitter();
    }
    
    createThrustEmitter () {
        this.thrust = this.add.particles('jets').createEmitter({
            x: 1600,
            y: 120,
            angle: { min: 160, max: 200 },
            scale: { start: 1.6, end: 0.1 },
            blendMode: 'ADD',
            lifespan: 300,
            on: false
        });
    }
 
    // the core of the script: platforms are added from the pool or created on the fly
    addPlatform(platformWidth, posX, posY){
        this.addedPlatforms ++;
        let platform;
        if(this.platformPool.getLength()){
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.y = posY;
            platform.active = true;
            platform.visible = true;
            this.platformPool.remove(platform);
            let newRatio =  platformWidth / platform.displayWidth;
            platform.displayWidth = platformWidth;
            platform.tileScaleX = 1 / platform.scaleX;
        }
        else{
            platform = this.add.tileSprite(posX, posY, platformWidth, 32, "platform");
            this.physics.add.existing(platform);
            platform.body.setImmovable(true);
            platform.body.setVelocityX(Phaser.Math.Between(gameOptions.platformSpeedRange[0], gameOptions.platformSpeedRange[1]) * -1);
            platform.setDepth(2);
            this.platformGroup.add(platform);
        }
        this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
 
        // if this is not the starting platform...
        if(this.addedPlatforms > 1){
 
            // is there a coin over the platform?
            if(Phaser.Math.Between(1, 100) <= gameOptions.coinPercent){
                if(this.coinPool.getLength()){
                    let coin = this.coinPool.getFirst();
                    coin.x = posX;
                    coin.y = posY - 96;
                    coin.alpha = 1;
                    coin.active = true;
                    coin.visible = true;
                    this.coinPool.remove(coin);
                }
                else{
                    let coin = this.physics.add.sprite(posX, posY - 96, "coin");
                    coin.setImmovable(true);
                    coin.setVelocityX(platform.body.velocity.x);
                    coin.anims.play("rotate");
                    coin.setDepth(2);
                    this.coinGroup.add(coin);
                }
            }
 
            // is there a fire over the platform?
            if(Phaser.Math.Between(1, 100) <= gameOptions.firePercent){
                if(this.firePool.getLength()){
                    let fire = this.firePool.getFirst();
                    fire.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
                    fire.y = posY - 46;
                    fire.alpha = 1;
                    fire.active = true;
                    fire.visible = true;
                    this.firePool.remove(fire);
                }
                else{
                    let fire = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), posY - 46, "fire");
                    fire.setImmovable(true);
                    fire.setVelocityX(platform.body.velocity.x);
                    fire.setSize(8, 2, true);
                    fire.anims.play("burn");
                    fire.setDepth(2);
                    this.fireGroup.add(fire);
                }
            }
        }
    }
 
    // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
    // and obviously if the player is not dying
    jump(){
        if((!this.dying) && (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps))){
            if(this.player.body.touching.down){
                this.playerJumps = 0;
            }
            this.player.setVelocityY(gameOptions.jumpForce * -1);
            this.playerJumps ++;
 
            // stops animation
            this.player.anims.stop();
            this.player.setFrame(8);
        }
        else {
            
        }
    }
    
    update(){
        
        this.thrust.setPosition(this.player.x += 14, this.player.y);
        
        //this.thrust.setPosition(this.thrust.x.propertyValue += (this.player.flipX) ? 16 : -16, this.thrust.y.propertyValue);
        //this.thrust.setSpeed(80);
        //this.thrust.emitParticle(10);
        
        this.synthscape.tilePositionX += 1;
        this.synthcity.tilePositionX +=3;
        
        // game over
        if(this.player.y > game.config.height){
            //this.player.destroy();
            this.player.anims.stop();
            this.synthcity.setTint(0xff0000);
            this.synthscape.setTint(0xff0000);
            this.synthsun.setTint(0xff0000);
            if(this.keySpace.isDown) {
                this.scene.restart();
            }
            else if(this.keyZ.isDown) {
                this.scene.restart();
            }
            else if(this.keyX.isDown) {
                this.scene.start("GameEnd");
            }
            
            //this.input.on("pointerdown", () => this.scene.restart());
            
            this.gover.visible = true;
            this.continueBtn.visible = true;
            this.quitBtn.visible = true;

        }
        
        /**
        fix the pause
        ///////////////////////////////////////
        this.swt = false;
        if(this.keyP.isDown) {
            this.scene.pause();
            this.swt = true;
        }
        else if(this.swt && this.keyP.isDown) {
            this.scene.resume();
        }
        **/
 
        this.player.x = gameOptions.playerStartPosition;
 
        // recycling platforms
        let minDistance = game.config.width;
        let rightmostPlatformHeight = 0;
        this.platformGroup.getChildren().forEach(function(platform){
            let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
            if(platformDistance < minDistance){
                minDistance = platformDistance;
                rightmostPlatformHeight = platform.y;
            }
            if(platform.x < - platform.displayWidth / 2){
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);
 
        // recycling coins
        this.coinGroup.getChildren().forEach(function(coin){
            if(coin.x < - coin.displayWidth / 2){
                this.coinGroup.killAndHide(coin);
                this.coinGroup.remove(coin);
            }
        }, this);
 
        // recycling fire
        this.fireGroup.getChildren().forEach(function(fire){
            if(fire.x < - fire.displayWidth / 2){
                this.fireGroup.killAndHide(fire);
                this.fireGroup.remove(fire);
            }
        }, this);
 
        // adding new platforms
        if(minDistance > this.nextPlatformDistance){
            let nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
            let platformRandomHeight = gameOptions.platformHeighScale * Phaser.Math.Between(gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1]);
            let nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
            let minPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[0];
            let maxPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[1];
            let nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
            this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2, nextPlatformHeight);
        }
    }

}
function resize(){
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
 
// global game options
let gameOptions = {
    
    // platform speed range, in pixels per second
    platformSpeedRange: [280, 280],
 
    // mountain speed, in pixels per second
    mountainSpeed: 80,
 
    // spawn range, how far should be the rightmost platform from the right edge
    // before next platform spawns, in pixels
    spawnRange: [80, 300],
 
    // platform width range, in pixels
    platformSizeRange: [90, 300],
 
    // a height range between rightmost platform and next platform to be spawned
    platformHeightRange: [-5, 5],
 
    // a scale to be multiplied by platformHeightRange
    platformHeighScale: 20,
 
    // platform max and min height, as screen height ratio
    platformVerticalLimit: [0.4, 0.8],
 
    // player gravity
    playerGravity: 900,
 
    // player jump force
    jumpForce: 400,
 
    // player starting X position
    playerStartPosition: 200,
 
    // consecutive jumps allowed
    jumps: 2,
 
    // % of probability a coin appears on the platform
    coinPercent: 28,
 
    // % of probability a fire appears on the platform
    firePercent: 2
};
 
window.onload = function() {
 
    // object containing configuration options
    let gameConfig = {
        type: Phaser.AUTO,
        width: 1334,
        height: 750,
        scene: [
          gameTitle,
          preloadGame,
          playGame,
          gameEnd
        ],
        backgroundColor: 0,
 
        // physics settings
        physics: {
            default: "arcade"
        }
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
    resize();
    window.addEventListener("resize", resize, false);
}

// game title screen
class gameTitle extends Phaser.Scene{
    constructor(){
        super("GameTitle");
    }
    preload(){
        this.load.image("knighthawks", "knighthawks_font.png");
        this.load.image("title-screen", "scdmrTitleLGOfnlCentered.jpg");
    }
    create(){

        this.titleScreen = this.add.tileSprite(this.game.config.width * 0.5, this.game.config.height * 0.5, this.game.config.width * 0.5, this.scene.height / 2, 'title-screen');
        this.titleScreen.setScale(2);
        this.titleScreen.setOrigin(0.5);
        this.startText = this.add.text(this.game.config.width * 0.5, 660, 'START', { font: '64px Arial' });
        this.startText.setOrigin(0.5);
        // checking for input
        this.input.on("pointerdown", this.startGame, this);
        this.input.keyboard.on("keydown", this.startGame, this);
    }
    
    startGame(){
        this.scene.start("PreloadGame");
    }
}

class gameEnd extends Phaser.Scene{
    constructor(){
        super("GameEnd");
    }
    preload(){
        //this.load.image("title-screen", "scdmrTitleLGOfnlCentered.jpg");
        //this.load.image('continueBtn', 'continueBtn.jpg');
        //this.load.image('quitBtn', 'quitBtn.jpg');
    }
    create(){

        this.thnx = this.add.text(this.game.config.width * 0.5, 330, 'THANK YOU FOR PLAYING', { 
            font: '64px sans',
            align: 'center'
        });
        this.thnx.setOrigin(0.5);

        // checking for input
        this.input.on("pointerdown", this.continueGame, this);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.input.keyboard.on("keydown", this.continueGame, this);
    }

    continueGame(){
        this.scene.start("GameTitle");
    }
}
 
// preloadGame scene
class preloadGame extends Phaser.Scene{
    constructor(){
        super("PreloadGame");
    }
    preload(){
        
        this.load.spritesheet('jets', 'rain.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        
    	this.load.spritesheet('rain', 'rain.png', {
    	    frameWidth: 16,
    	    frameHeight: 16
    	});

        this.load.image("platform", "grimTile.png");
 
        // player is a sprite sheet made by 24x48 pixels
        this.load.spritesheet("player", "runningManPC2.png", {
            //frameWidth: 80,
            //frameHeight: 80
            frameWidth: 64,
            frameHeight: 64
        });

        // the coin is a sprite sheet made by 20x20 pixels
        this.load.spritesheet("coin", "star.png", {
            frameWidth: 32,
            frameHeight: 32
        });

        // the firecamp is a sprite sheet made by 32x58 pixels
        this.load.spritesheet("fire", "fireEnemy.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        
        //backgrounds
        this.load.image("synth-sun", "synthsun.jpg");
        this.load.image("synth-scape", "synthscape.png");
        this.load.image("synth-city", "synthcity.png");
        
        this.load.image('continueBtn', 'continueBtn.jpg');
        this.load.image('quitBtn', 'quitBtn.jpg');
    }
    create(){
        // setting player animation
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("player", {
                start: 0,
                //end: 11
                end:7
            }),
            //frameRate: 18,
            frameRate: 20,
            repeat: -1
        });
 
        // setting coin animation
        this.anims.create({
            key: "rotate",
            frames: this.anims.generateFrameNumbers("coin", {
                start: 0,
                end: 1
            }),
            frameRate: 15,
            yoyo: true,
            repeat: -1
        });
 
        // setting fire animation
        this.anims.create({
            key: "burn",
            frames: this.anims.generateFrameNumbers("fire", {
                start: 0,
                end: 1
            }),
            frameRate: 15,
            repeat: -1
        });
 
        this.scene.start("PlayGame");
    }
}
 
// playGame scene
class playGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }
    create(){
        
        this.points = 0;
        
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        
        this.synthsun = this.add.tileSprite(800, 400, this.scene.width, this.scene.height, 'synth-sun');
        this.synthsun.setScale(1);
       // this.synthsun = this.add.tileSprite(400, 300, 'synth-sun');
       this.synthscape = this.add.tileSprite(600, 300, this.scene.width, this.scene.height, 'synth-scape');
        this.synthscape.setScale(1);
        //this.add.image(400, 300, 'synth-scape');
        this.synthcity = this.add.tileSprite(600, 300, this.scene.width, this.scene.height, 'synth-city');
        this.synthscape.setScale(1);
        //this.add.image(400, 300, 'synth-city');

        this.gover = this.gameOver = this.add.text(this.game.config.width * 0.5, 330, 'GAME OVER', { 
            font: '64px sans',
            align: 'center'
        });
        this.gover.setOrigin(0.5);
        this.gover.visible = false;
        
        this.continueBtn = this.add.sprite(180, 66, 'continueBtn');
        this.continueBtn.x = this.game.config.width * 0.5 - 200;
        this.continueBtn.y = this.game.config.height * 0.5 + 100;
        this.continueBtn.setOrigin(0.5);
        this.continueBtn.setScale(2);
        this.continueBtn.setInteractive();
        this.continueBtn.on('pointerdown', (pointer) => { this.scene.restart(); }, this);
        this.continueBtn.visible = false;
        
        this.quitBtn = this.add.sprite(180, 66, 'quitBtn');
        this.quitBtn.x = this.game.config.width * 0.5 + 200;
        this.quitBtn.y = this.game.config.height * 0.5 + 100;
        this.quitBtn.setOrigin(0.5);
        this.quitBtn.setScale(2);
        this.quitBtn.setInteractive();
        this.quitBtn.on('pointerdown', (pointer) => { this.scene.start("GameEnd"); }, this);
        this.quitBtn.visible = false;
        
        this.score = this.add.text(100, 80, 'SCORE: ' + this.points, { font: '20px Arial' });
        this.score.setOrigin(0.5);
        
        // group with all active platforms.
        this.platformGroup = this.add.group({
 
            // once a platform is removed, it's added to the pool
            removeCallback: function(platform){
                platform.scene.platformPool.add(platform);
            }
        });
 
        // platform pool
        this.platformPool = this.add.group({
 
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.platformGroup.add(platform);
            }
        });
 
        // group with all active coins.
        this.coinGroup = this.add.group({
 
            // once a coin is removed, it's added to the pool
            removeCallback: function(coin){
                coin.scene.coinPool.add(coin);
            }
        });
 
        // coin pool
        this.coinPool = this.add.group({
 
            // once a coin is removed from the pool, it's added to the active coins group
            removeCallback: function(coin){
                coin.scene.coinGroup.add(coin);
            }
        });
 
        // group with all active firecamps.
        this.fireGroup = this.add.group({
 
            // once a firecamp is removed, it's added to the pool
            removeCallback: function(fire){
                fire.scene.firePool.add(fire);
            }
        });
 
        // fire pool
        this.firePool = this.add.group({
 
            // once a fire is removed from the pool, it's added to the active fire group
            removeCallback: function(fire){
                fire.scene.fireGroup.add(fire);
            }
        });
 
        // keeping track of added platforms
        this.addedPlatforms = 0;
 
        // number of consecutive jumps made by the player so far
        this.playerJumps = 0;
 
        // adding a platform to the game, the arguments are platform width, x position and y position
        this.addPlatform(game.config.width, game.config.width / 2, game.config.height * gameOptions.platformVerticalLimit[1]);
 
        // adding the player;
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height * 0.7, "player");
        this.player.setGravityY(gameOptions.playerGravity);
        this.player.setDepth(2);
        this.player.scale = 0.6;
 
        // the player is not dying
        this.dying = false;
 
        // setting collisions between the player and the platform group
        this.platformCollider = this.physics.add.collider(this.player, this.platformGroup, function(){
 
            // play "run" animation if the player is on a platform
            if(!this.player.anims.isPlaying){
                this.player.anims.play("run");
            }
        }, null, this);
 
        // setting collisions between the player and the coin group
        this.physics.add.overlap(this.player, this.coinGroup, function(player, coin){
        
            this.tweens.add({
                targets: coin,
                y: coin.y - 100,
                alpha: 0,
                duration: 800,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function(){
                    this.coinGroup.killAndHide(coin);
                    this.coinGroup.remove(coin);
                },
                
            });
                    this.points += 1;
                    this.score.setText('score:' + this.points);
        }, null, this);
 
        // setting collisions between the player and the fire group
        this.physics.add.overlap(this.player, this.fireGroup, function(player, fire){
 
            this.dying = true;
            this.player.anims.stop();
            this.player.setFrame(9);
            this.player.body.setVelocityY(-200);
            this.physics.world.removeCollider(this.platformCollider);
 
        }, null, this);
        
        //check for input
        this.input.on("pointerdown", this.jump, this);
        
        this.input.keyboard.on("keydown", this.jump, this);
        
        this.createThrustEmitter();
    }
    
    createThrustEmitter () {
        this.thrust = this.add.particles('jets').createEmitter({
            x: 1600,
            y: 120,
            angle: { min: 160, max: 200 },
            scale: { start: 1.6, end: 0.1 },
            blendMode: 'ADD',
            lifespan: 300,
            on: false
        });
    }
 
    // the core of the script: platforms are added from the pool or created on the fly
    addPlatform(platformWidth, posX, posY){
        this.addedPlatforms ++;
        let platform;
        if(this.platformPool.getLength()){
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.y = posY;
            platform.active = true;
            platform.visible = true;
            this.platformPool.remove(platform);
            let newRatio =  platformWidth / platform.displayWidth;
            platform.displayWidth = platformWidth;
            platform.tileScaleX = 1 / platform.scaleX;
        }
        else{
            platform = this.add.tileSprite(posX, posY, platformWidth, 32, "platform");
            this.physics.add.existing(platform);
            platform.body.setImmovable(true);
            platform.body.setVelocityX(Phaser.Math.Between(gameOptions.platformSpeedRange[0], gameOptions.platformSpeedRange[1]) * -1);
            platform.setDepth(2);
            this.platformGroup.add(platform);
        }
        this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
 
        // if this is not the starting platform...
        if(this.addedPlatforms > 1){
 
            // is there a coin over the platform?
            if(Phaser.Math.Between(1, 100) <= gameOptions.coinPercent){
                if(this.coinPool.getLength()){
                    let coin = this.coinPool.getFirst();
                    coin.x = posX;
                    coin.y = posY - 96;
                    coin.alpha = 1;
                    coin.active = true;
                    coin.visible = true;
                    this.coinPool.remove(coin);
                }
                else{
                    let coin = this.physics.add.sprite(posX, posY - 96, "coin");
                    coin.setImmovable(true);
                    coin.setVelocityX(platform.body.velocity.x);
                    coin.anims.play("rotate");
                    coin.setDepth(2);
                    this.coinGroup.add(coin);
                }
            }
 
            // is there a fire over the platform?
            if(Phaser.Math.Between(1, 100) <= gameOptions.firePercent){
                if(this.firePool.getLength()){
                    let fire = this.firePool.getFirst();
                    fire.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
                    fire.y = posY - 46;
                    fire.alpha = 1;
                    fire.active = true;
                    fire.visible = true;
                    this.firePool.remove(fire);
                }
                else{
                    let fire = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), posY - 46, "fire");
                    fire.setImmovable(true);
                    fire.setVelocityX(platform.body.velocity.x);
                    fire.setSize(8, 2, true);
                    fire.anims.play("burn");
                    fire.setDepth(2);
                    this.fireGroup.add(fire);
                }
            }
        }
    }
 
    // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
    // and obviously if the player is not dying
    jump(){
        if((!this.dying) && (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps))){
            if(this.player.body.touching.down){
                this.playerJumps = 0;
            }
            this.player.setVelocityY(gameOptions.jumpForce * -1);
            this.playerJumps ++;
 
            // stops animation
            this.player.anims.stop();
            this.player.setFrame(8);
        }
        else {
            
        }
    }
    
    update(){
        
        this.thrust.setPosition(this.player.x += 14, this.player.y);
        
        //this.thrust.setPosition(this.thrust.x.propertyValue += (this.player.flipX) ? 16 : -16, this.thrust.y.propertyValue);
        //this.thrust.setSpeed(80);
        //this.thrust.emitParticle(10);
        
        this.synthscape.tilePositionX += 1;
        this.synthcity.tilePositionX +=3;
        
        // game over
        if(this.player.y > game.config.height){
            //this.player.destroy();
            this.player.anims.stop();
            this.synthcity.setTint(0xff0000);
            this.synthscape.setTint(0xff0000);
            this.synthsun.setTint(0xff0000);
            if(this.keySpace.isDown) {
                this.scene.restart();
            }
            else if(this.keyZ.isDown) {
                this.scene.restart();
            }
            else if(this.keyX.isDown) {
                this.scene.start("GameEnd");
            }
            
            //this.input.on("pointerdown", () => this.scene.restart());
            
            this.gover.visible = true;
            this.continueBtn.visible = true;
            this.quitBtn.visible = true;

        }
        
        /**
        fix the pause
        ///////////////////////////////////////
        this.swt = false;
        if(this.keyP.isDown) {
            this.scene.pause();
            this.swt = true;
        }
        else if(this.swt && this.keyP.isDown) {
            this.scene.resume();
        }
        **/
 
        this.player.x = gameOptions.playerStartPosition;
 
        // recycling platforms
        let minDistance = game.config.width;
        let rightmostPlatformHeight = 0;
        this.platformGroup.getChildren().forEach(function(platform){
            let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
            if(platformDistance < minDistance){
                minDistance = platformDistance;
                rightmostPlatformHeight = platform.y;
            }
            if(platform.x < - platform.displayWidth / 2){
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);
 
        // recycling coins
        this.coinGroup.getChildren().forEach(function(coin){
            if(coin.x < - coin.displayWidth / 2){
                this.coinGroup.killAndHide(coin);
                this.coinGroup.remove(coin);
            }
        }, this);
 
        // recycling fire
        this.fireGroup.getChildren().forEach(function(fire){
            if(fire.x < - fire.displayWidth / 2){
                this.fireGroup.killAndHide(fire);
                this.fireGroup.remove(fire);
            }
        }, this);
 
        // adding new platforms
        if(minDistance > this.nextPlatformDistance){
            let nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
            let platformRandomHeight = gameOptions.platformHeighScale * Phaser.Math.Between(gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1]);
            let nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
            let minPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[0];
            let maxPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[1];
            let nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
            this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2, nextPlatformHeight);
        }
    }

}
function resize(){
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
 
// global game options
let gameOptions = {
    
    // platform speed range, in pixels per second
    platformSpeedRange: [280, 280],
 
    // mountain speed, in pixels per second
    mountainSpeed: 80,
 
    // spawn range, how far should be the rightmost platform from the right edge
    // before next platform spawns, in pixels
    spawnRange: [80, 300],
 
    // platform width range, in pixels
    platformSizeRange: [90, 300],
 
    // a height range between rightmost platform and next platform to be spawned
    platformHeightRange: [-5, 5],
 
    // a scale to be multiplied by platformHeightRange
    platformHeighScale: 20,
 
    // platform max and min height, as screen height ratio
    platformVerticalLimit: [0.4, 0.8],
 
    // player gravity
    playerGravity: 900,
 
    // player jump force
    jumpForce: 400,
 
    // player starting X position
    playerStartPosition: 200,
 
    // consecutive jumps allowed
    jumps: 2,
 
    // % of probability a coin appears on the platform
    coinPercent: 28,
 
    // % of probability a fire appears on the platform
    firePercent: 2
};
 
window.onload = function() {
 
    // object containing configuration options
    let gameConfig = {
        type: Phaser.AUTO,
        width: 1334,
        height: 750,
        scene: [
          gameTitle,
          preloadGame,
          playGame,
          gameEnd
        ],
        backgroundColor: 0,
 
        // physics settings
        physics: {
            default: "arcade"
        }
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
    resize();
    window.addEventListener("resize", resize, false);
}

// game title screen
class gameTitle extends Phaser.Scene{
    constructor(){
        super("GameTitle");
    }
    preload(){
        this.load.image("knighthawks", "knighthawks_font.png");
        this.load.image("title-screen", "scdmrTitleLGOfnlCentered.jpg");
    }
    create(){

        this.titleScreen = this.add.tileSprite(this.game.config.width * 0.5, this.game.config.height * 0.5, this.game.config.width * 0.5, this.scene.height / 2, 'title-screen');
        this.titleScreen.setScale(2);
        this.titleScreen.setOrigin(0.5);
        this.startText = this.add.text(this.game.config.width * 0.5, 660, 'START', { font: '64px Arial' });
        this.startText.setOrigin(0.5);
        // checking for input
        this.input.on("pointerdown", this.startGame, this);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update() {
        if(this.keySpace.isDown) {
            this.startGame();
        }
    }
    startGame(){
        this.scene.start("PreloadGame");
    }
}


class gameEnd extends Phaser.Scene{
    constructor(){
        super("GameEnd");
    }
    preload(){
        //this.load.image("title-screen", "scdmrTitleLGOfnlCentered.jpg");
        this.load.image('continueBtn', 'continueBtn.jpg');
        this.load.image('quitBtn', 'quitBtn.jpg');
    }
    create(){

        this.gover = this.add.text(this.game.config.width * 0.5, 330, 'GAME OVER', { 
            font: '64px sans',
            align: 'center'
        });
        this.gover.setOrigin(0.5);

        // checking for input
        //this.input.on("pointerdown", this.startGame, this);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        
        this.continueBtn = this.add.sprite(180, 66, 'continueBtn');
        this.continueBtn.x = this.game.config.width * 0.5 - 200;
        this.continueBtn.y = this.game.config.height * 0.5 + 100;
        this.continueBtn.setOrigin(0.5);
        this.continueBtn.setScale(2);
        this.continueBtn.setInteractive();
        
        this.continueBtn.on('pointerdown', (pointer) => { this.continueGame(); }, this);
        
    }
    update() {
        if(this.keySpace.isDown) {
            this.scene.start("PlayGame");
        }
        else if(this.keyZ.isDown) {
            this.scene.start("PlayGame");
        }
        /**this.continueBtn.on("pointerup", function() {
            this.scene.start("PlayGame");
        }, this);**/
    }
    continueGame(){
        this.scene.start("PreloadGame");
    }
}
 
// preloadGame scene
class preloadGame extends Phaser.Scene{
    constructor(){
        super("PreloadGame");
    }
    preload(){
        
        this.load.spritesheet('jets', 'rain.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        
    	this.load.spritesheet('rain', 'rain.png', {
    	    frameWidth: 16,
    	    frameHeight: 16
    	});

        this.load.image("platform", "grimTile.png");
 
        // player is a sprite sheet made by 24x48 pixels
        this.load.spritesheet("player", "runnerTry.png", {
            frameWidth: 80,
            frameHeight: 80
        });

        // the coin is a sprite sheet made by 20x20 pixels
        this.load.spritesheet("coin", "star.png", {
            frameWidth: 32,
            frameHeight: 32
        });

        // the firecamp is a sprite sheet made by 32x58 pixels
        this.load.spritesheet("fire", "fireEnemy.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        
        //backgrounds
        this.load.image("synth-sun", "synthsun.jpg");
        this.load.image("synth-scape", "synthscape.png");
        this.load.image("synth-city", "synthcity.png");
        
        this.load.image('continueBtn', 'continueBtn.jpg');
        this.load.image('quitBtn', 'quitBtn.jpg');
    }
    create(){
        // setting player animation
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("player", {
                start: 0,
                end: 11
            }),
            frameRate: 18,
            repeat: -1
        });
 
        // setting coin animation
        this.anims.create({
            key: "rotate",
            frames: this.anims.generateFrameNumbers("coin", {
                start: 0,
                end: 1
            }),
            frameRate: 15,
            yoyo: true,
            repeat: -1
        });
 
        // setting fire animation
        this.anims.create({
            key: "burn",
            frames: this.anims.generateFrameNumbers("fire", {
                start: 0,
                end: 1
            }),
            frameRate: 15,
            repeat: -1
        });
 
        this.scene.start("PlayGame");
    }
}
 
// playGame scene
class playGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }
    create(){
        
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        
        this.synthsun = this.add.tileSprite(800, 400, this.scene.width, this.scene.height, 'synth-sun');
        this.synthsun.setScale(1);
       // this.synthsun = this.add.tileSprite(400, 300, 'synth-sun');
       this.synthscape = this.add.tileSprite(600, 300, this.scene.width, this.scene.height, 'synth-scape');
        this.synthscape.setScale(1);
        //this.add.image(400, 300, 'synth-scape');
        this.synthcity = this.add.tileSprite(600, 300, this.scene.width, this.scene.height, 'synth-city');
        this.synthscape.setScale(1);
        //this.add.image(400, 300, 'synth-city');

        this.gover = this.gameOver = this.add.text(this.game.config.width * 0.5, 330, 'GAME OVER', { 
            font: '64px sans',
            align: 'center'
        });
        this.gover.setOrigin(0.5);
        this.gover.visible = false;
        
        this.continueBtn = this.add.sprite(180, 66, 'continueBtn');
        this.continueBtn.x = this.game.config.width * 0.5 - 200;
        this.continueBtn.y = this.game.config.height * 0.5 + 100;
        this.continueBtn.setOrigin(0.5);
        this.continueBtn.setScale(2);
        this.continueBtn.setInteractive();
        this.continueBtn.on('pointerdown', (pointer) => { this.scene.restart(); }, this);
        this.continueBtn.visible = false;
        
        this.quitBtn = this.add.sprite(180, 66, 'quitBtn');
        this.quitBtn.x = this.game.config.width * 0.5 + 200;
        this.quitBtn.y = this.game.config.height * 0.5 + 100;
        this.quitBtn.setOrigin(0.5);
        this.quitBtn.setScale(2);
        this.quitBtn.setInteractive();
        this.quitBtn.on('pointerdown', (pointer) => { this.scene.start("GameEnd"); }, this);
        this.quitBtn.visible = false;
        
        // group with all active platforms.
        this.platformGroup = this.add.group({
 
            // once a platform is removed, it's added to the pool
            removeCallback: function(platform){
                platform.scene.platformPool.add(platform);
            }
        });
 
        // platform pool
        this.platformPool = this.add.group({
 
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.platformGroup.add(platform);
            }
        });
 
        // group with all active coins.
        this.coinGroup = this.add.group({
 
            // once a coin is removed, it's added to the pool
            removeCallback: function(coin){
                coin.scene.coinPool.add(coin);
            }
        });
 
        // coin pool
        this.coinPool = this.add.group({
 
            // once a coin is removed from the pool, it's added to the active coins group
            removeCallback: function(coin){
                coin.scene.coinGroup.add(coin);
            }
        });
 
        // group with all active firecamps.
        this.fireGroup = this.add.group({
 
            // once a firecamp is removed, it's added to the pool
            removeCallback: function(fire){
                fire.scene.firePool.add(fire);
            }
        });
 
        // fire pool
        this.firePool = this.add.group({
 
            // once a fire is removed from the pool, it's added to the active fire group
            removeCallback: function(fire){
                fire.scene.fireGroup.add(fire);
            }
        });
 
        // keeping track of added platforms
        this.addedPlatforms = 0;
 
        // number of consecutive jumps made by the player so far
        this.playerJumps = 0;
 
        // adding a platform to the game, the arguments are platform width, x position and y position
        this.addPlatform(game.config.width, game.config.width / 2, game.config.height * gameOptions.platformVerticalLimit[1]);
 
        // adding the player;
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height * 0.7, "player");
        this.player.setGravityY(gameOptions.playerGravity);
        this.player.setDepth(2);
        this.player.scale = 0.6;
 
        // the player is not dying
        this.dying = false;
 
        // setting collisions between the player and the platform group
        this.platformCollider = this.physics.add.collider(this.player, this.platformGroup, function(){
 
            // play "run" animation if the player is on a platform
            if(!this.player.anims.isPlaying){
                this.player.anims.play("run");
            }
        }, null, this);
 
        // setting collisions between the player and the coin group
        this.physics.add.overlap(this.player, this.coinGroup, function(player, coin){
 
            this.tweens.add({
                targets: coin,
                y: coin.y - 100,
                alpha: 0,
                duration: 800,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function(){
                    this.coinGroup.killAndHide(coin);
                    this.coinGroup.remove(coin);
                }
            });
 
        }, null, this);
 
        // setting collisions between the player and the fire group
        this.physics.add.overlap(this.player, this.fireGroup, function(player, fire){
 
            this.dying = true;
            this.player.anims.stop();
            this.player.setFrame(12);
            this.player.body.setVelocityY(-200);
            this.physics.world.removeCollider(this.platformCollider);
 
        }, null, this);
        
        //check for input
        this.input.on("pointerdown", this.jump, this);
        
        this.input.keyboard.on("keydown", this.jump, this);
        
        this.createThrustEmitter();
    }
    
    createThrustEmitter () {
        this.thrust = this.add.particles('jets').createEmitter({
            x: 1600,
            y: 120,
            angle: { min: 160, max: 200 },
            scale: { start: 1.6, end: 0.1 },
            blendMode: 'ADD',
            lifespan: 300,
            on: false
        });
    }
 
    // the core of the script: platforms are added from the pool or created on the fly
    addPlatform(platformWidth, posX, posY){
        this.addedPlatforms ++;
        let platform;
        if(this.platformPool.getLength()){
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.y = posY;
            platform.active = true;
            platform.visible = true;
            this.platformPool.remove(platform);
            let newRatio =  platformWidth / platform.displayWidth;
            platform.displayWidth = platformWidth;
            platform.tileScaleX = 1 / platform.scaleX;
        }
        else{
            platform = this.add.tileSprite(posX, posY, platformWidth, 32, "platform");
            this.physics.add.existing(platform);
            platform.body.setImmovable(true);
            platform.body.setVelocityX(Phaser.Math.Between(gameOptions.platformSpeedRange[0], gameOptions.platformSpeedRange[1]) * -1);
            platform.setDepth(2);
            this.platformGroup.add(platform);
        }
        this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
 
        // if this is not the starting platform...
        if(this.addedPlatforms > 1){
 
            // is there a coin over the platform?
            if(Phaser.Math.Between(1, 100) <= gameOptions.coinPercent){
                if(this.coinPool.getLength()){
                    let coin = this.coinPool.getFirst();
                    coin.x = posX;
                    coin.y = posY - 96;
                    coin.alpha = 1;
                    coin.active = true;
                    coin.visible = true;
                    this.coinPool.remove(coin);
                }
                else{
                    let coin = this.physics.add.sprite(posX, posY - 96, "coin");
                    coin.setImmovable(true);
                    coin.setVelocityX(platform.body.velocity.x);
                    coin.anims.play("rotate");
                    coin.setDepth(2);
                    this.coinGroup.add(coin);
                }
            }
 
            // is there a fire over the platform?
            if(Phaser.Math.Between(1, 100) <= gameOptions.firePercent){
                if(this.firePool.getLength()){
                    let fire = this.firePool.getFirst();
                    fire.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
                    fire.y = posY - 46;
                    fire.alpha = 1;
                    fire.active = true;
                    fire.visible = true;
                    this.firePool.remove(fire);
                }
                else{
                    let fire = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), posY - 46, "fire");
                    fire.setImmovable(true);
                    fire.setVelocityX(platform.body.velocity.x);
                    fire.setSize(8, 2, true);
                    fire.anims.play("burn");
                    fire.setDepth(2);
                    this.fireGroup.add(fire);
                }
            }
        }
    }
 
    // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
    // and obviously if the player is not dying
    jump(){
        if((!this.dying) && (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps))){
            if(this.player.body.touching.down){
                this.playerJumps = 0;
            }
            this.player.setVelocityY(gameOptions.jumpForce * -1);
            this.playerJumps ++;
 
            // stops animation
            this.player.anims.stop();
        }
        else {
            
        }
    }
    
    update(){
        
        this.thrust.setPosition(this.player.x += 14, this.player.y);
        
        this.thrust.setPosition(this.thrust.x.propertyValue += (this.player.flipX) ? 16 : -16, this.thrust.y.propertyValue);
        this.thrust.setSpeed(80);
        this.thrust.emitParticle(10);
        
        this.synthscape.tilePositionX += 1;
        this.synthcity.tilePositionX +=3;
        
        // game over
        if(this.player.y > game.config.height){
            //this.player.destroy();
            this.player.anims.stop();
            this.synthcity.setTint(0xff0000);
            this.synthscape.setTint(0xff0000);
            this.synthsun.setTint(0xff0000);
            if(this.keySpace.isDown) {
                this.scene.start("GameEnd");
            }
            else if(this.keyZ.isDown) {
                this.scene.start("GameEnd");
            }
            else if(this.keyX.isDown) {
                this.scene.start("GameEnd");
            }
            
            //this.input.on("pointerdown", () => this.scene.restart());
            
            this.gover.visible = true;
            this.continueBtn.visible = true;
            this.quitBtn.visible = true;

        }
 
        this.player.x = gameOptions.playerStartPosition;
 
        // recycling platforms
        let minDistance = game.config.width;
        let rightmostPlatformHeight = 0;
        this.platformGroup.getChildren().forEach(function(platform){
            let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
            if(platformDistance < minDistance){
                minDistance = platformDistance;
                rightmostPlatformHeight = platform.y;
            }
            if(platform.x < - platform.displayWidth / 2){
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);
 
        // recycling coins
        this.coinGroup.getChildren().forEach(function(coin){
            if(coin.x < - coin.displayWidth / 2){
                this.coinGroup.killAndHide(coin);
                this.coinGroup.remove(coin);
            }
        }, this);
 
        // recycling fire
        this.fireGroup.getChildren().forEach(function(fire){
            if(fire.x < - fire.displayWidth / 2){
                this.fireGroup.killAndHide(fire);
                this.fireGroup.remove(fire);
            }
        }, this);
 
        // adding new platforms
        if(minDistance > this.nextPlatformDistance){
            let nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
            let platformRandomHeight = gameOptions.platformHeighScale * Phaser.Math.Between(gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1]);
            let nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
            let minPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[0];
            let maxPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[1];
            let nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
            this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2, nextPlatformHeight);
        }
    }

}
function resize(){
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
    // % of probability a coin appears on the platform
    coinPercent: 28,
 
    // % of probability a fire appears on the platform
    firePercent: 2
};
 
window.onload = function() {
 
    // object containing configuration options
    let gameConfig = {
        type: Phaser.AUTO,
        width: 1334,
        height: 750,
        scene: [
          preloadGame,
          playGame
        ],
        backgroundColor: 0x0c88c7,
 
        // physics settings
        physics: {
            default: "arcade"
        }
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
    resize();
    window.addEventListener("resize", resize, false);
}
 
// preloadGame scene
class preloadGame extends Phaser.Scene{
    constructor(){
        super("PreloadGame");
    }
    preload(){
        this.load.spritesheet('jets', 'rain.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        
    	this.load.spritesheet('rain', 'rain.png', {
    	    frameWidth: 16,
    	    frameHeight: 16
    	});

        this.load.image("platform", "grimTile.png");
 
        // player is a sprite sheet made by 24x48 pixels
        this.load.spritesheet("player", "runnerPC.png", {
            frameWidth: 32,
            frameHeight: 32
        });

        // the coin is a sprite sheet made by 20x20 pixels
        this.load.spritesheet("coin", "star.png", {
            frameWidth: 32,
            frameHeight: 32
        });

        // the firecamp is a sprite sheet made by 32x58 pixels
        this.load.spritesheet("fire", "fireEnemy.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        
        //backgrounds
        this.load.image("synth-sun", "synthsun.jpg");
        this.load.image("synth-scape", "synthscape.png");
        this.load.image("synth-city", "synthcity.png");
    }
    create(){
        // setting player animation
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("player", {
                start: 0,
                end: 3
            }),
            frameRate: 8,
            repeat: -1
        });
 
        // setting coin animation
        this.anims.create({
            key: "rotate",
            frames: this.anims.generateFrameNumbers("coin", {
                start: 0,
                end: 1
            }),
            frameRate: 15,
            yoyo: true,
            repeat: -1
        });
 
        // setting fire animation
        this.anims.create({
            key: "burn",
            frames: this.anims.generateFrameNumbers("fire", {
                start: 0,
                end: 1
            }),
            frameRate: 15,
            repeat: -1
        });
 
        this.scene.start("PlayGame");
    }
}
 
// playGame scene
class playGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }
    create(){
        
        this.synthsun = this.add.tileSprite(800, 400, this.scene.width, this.scene.height, 'synth-sun');
        this.synthsun.setScale(1);
       // this.synthsun = this.add.tileSprite(400, 300, 'synth-sun');
       this.synthscape = this.add.tileSprite(600, 300, this.scene.width, this.scene.height, 'synth-scape');
        this.synthscape.setScale(1);
        //this.add.image(400, 300, 'synth-scape');
        this.synthcity = this.add.tileSprite(600, 300, this.scene.width, this.scene.height, 'synth-city');
        this.synthscape.setScale(1);
        //this.add.image(400, 300, 'synth-city');

        // group with all active platforms.
        this.platformGroup = this.add.group({
 
            // once a platform is removed, it's added to the pool
            removeCallback: function(platform){
                platform.scene.platformPool.add(platform);
            }
        });
 
        // platform pool
        this.platformPool = this.add.group({
 
            // once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.platformGroup.add(platform);
            }
        });
 
        // group with all active coins.
        this.coinGroup = this.add.group({
 
            // once a coin is removed, it's added to the pool
            removeCallback: function(coin){
                coin.scene.coinPool.add(coin);
            }
        });
 
        // coin pool
        this.coinPool = this.add.group({
 
            // once a coin is removed from the pool, it's added to the active coins group
            removeCallback: function(coin){
                coin.scene.coinGroup.add(coin);
            }
        });
 
        // group with all active firecamps.
        this.fireGroup = this.add.group({
 
            // once a firecamp is removed, it's added to the pool
            removeCallback: function(fire){
                fire.scene.firePool.add(fire);
            }
        });
 
        // fire pool
        this.firePool = this.add.group({
 
            // once a fire is removed from the pool, it's added to the active fire group
            removeCallback: function(fire){
                fire.scene.fireGroup.add(fire);
            }
        });
 
        // keeping track of added platforms
        this.addedPlatforms = 0;
 
        // number of consecutive jumps made by the player so far
        this.playerJumps = 0;
 
        // adding a platform to the game, the arguments are platform width, x position and y position
        this.addPlatform(game.config.width, game.config.width / 2, game.config.height * gameOptions.platformVerticalLimit[1]);
 
        // adding the player;
        this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height * 0.7, "player");
        this.player.setGravityY(gameOptions.playerGravity);
        this.player.setDepth(2);
        //this.player.scale = 2;
 
        // the player is not dying
        this.dying = false;
 
        // setting collisions between the player and the platform group
        this.platformCollider = this.physics.add.collider(this.player, this.platformGroup, function(){
 
            // play "run" animation if the player is on a platform
            if(!this.player.anims.isPlaying){
                this.player.anims.play("run");
            }
        }, null, this);
 
        // setting collisions between the player and the coin group
        this.physics.add.overlap(this.player, this.coinGroup, function(player, coin){
 
            this.tweens.add({
                targets: coin,
                y: coin.y - 100,
                alpha: 0,
                duration: 800,
                ease: "Cubic.easeOut",
                callbackScope: this,
                onComplete: function(){
                    this.coinGroup.killAndHide(coin);
                    this.coinGroup.remove(coin);
                }
            });
 
        }, null, this);
 
        // setting collisions between the player and the fire group
        this.physics.add.overlap(this.player, this.fireGroup, function(player, fire){
 
            this.dying = true;
            this.player.anims.stop();
            this.player.setFrame(4);
            this.player.body.setVelocityY(-200);
            this.physics.world.removeCollider(this.platformCollider);
 
        }, null, this);
 
        // checking for input
        this.input.on("pointerdown", this.jump, this);
        
        this.createThrustEmitter();
    }
    
    createThrustEmitter () {
        this.thrust = this.add.particles('jets').createEmitter({
            x: 1600,
            y: 80,
            angle: { min: 160, max: 200 },
            scale: { start: 1, end: 0.1 },
            blendMode: 'ADD',
            lifespan: 400,
            on: false
        });
    }
 
    // the core of the script: platform are added from the pool or created on the fly
    addPlatform(platformWidth, posX, posY){
        this.addedPlatforms ++;
        let platform;
        if(this.platformPool.getLength()){
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.y = posY;
            platform.active = true;
            platform.visible = true;
            this.platformPool.remove(platform);
            let newRatio =  platformWidth / platform.displayWidth;
            platform.displayWidth = platformWidth;
            platform.tileScaleX = 1 / platform.scaleX;
        }
        else{
            platform = this.add.tileSprite(posX, posY, platformWidth, 32, "platform");
            this.physics.add.existing(platform);
            platform.body.setImmovable(true);
            platform.body.setVelocityX(Phaser.Math.Between(gameOptions.platformSpeedRange[0], gameOptions.platformSpeedRange[1]) * -1);
            platform.setDepth(2);
            this.platformGroup.add(platform);
        }
        this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]);
 
        // if this is not the starting platform...
        if(this.addedPlatforms > 1){
 
            // is there a coin over the platform?
            if(Phaser.Math.Between(1, 100) <= gameOptions.coinPercent){
                if(this.coinPool.getLength()){
                    let coin = this.coinPool.getFirst();
                    coin.x = posX;
                    coin.y = posY - 96;
                    coin.alpha = 1;
                    coin.active = true;
                    coin.visible = true;
                    this.coinPool.remove(coin);
                }
                else{
                    let coin = this.physics.add.sprite(posX, posY - 96, "coin");
                    coin.setImmovable(true);
                    coin.setVelocityX(platform.body.velocity.x);
                    coin.anims.play("rotate");
                    coin.setDepth(2);
                    this.coinGroup.add(coin);
                }
            }
 
            // is there a fire over the platform?
            if(Phaser.Math.Between(1, 100) <= gameOptions.firePercent){
                if(this.firePool.getLength()){
                    let fire = this.firePool.getFirst();
                    fire.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
                    fire.y = posY - 46;
                    fire.alpha = 1;
                    fire.active = true;
                    fire.visible = true;
                    this.firePool.remove(fire);
                }
                else{
                    let fire = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), posY - 46, "fire");
                    fire.setImmovable(true);
                    fire.setVelocityX(platform.body.velocity.x);
                    fire.setSize(8, 2, true);
                    fire.anims.play("burn");
                    fire.setDepth(2);
                    this.fireGroup.add(fire);
                }
            }
        }
    }
 
    // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
    // and obviously if the player is not dying
    jump(){
        if((!this.dying) && (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < gameOptions.jumps))){
            if(this.player.body.touching.down){
                this.playerJumps = 0;
            }
            this.player.setVelocityY(gameOptions.jumpForce * -1);
            this.playerJumps ++;
 
            // stops animation
            this.player.anims.stop();
        }
    }
 
    update(){
        
        this.thrust.setPosition(this.player.x += 14, this.player.y);
        
        this.thrust.setPosition(this.thrust.x.propertyValue += (this.player.flipX) ? 16 : -16, this.thrust.y.propertyValue);
        this.thrust.setSpeed(80);
        this.thrust.emitParticle(10);
        
        this.synthscape.tilePositionX += 1;
        this.synthcity.tilePositionX +=3;
        
        // game over
        if(this.player.y > game.config.height){
            this.scene.start("PlayGame");
        }
 
        this.player.x = gameOptions.playerStartPosition;
 
        // recycling platforms
        let minDistance = game.config.width;
        let rightmostPlatformHeight = 0;
        this.platformGroup.getChildren().forEach(function(platform){
            let platformDistance = game.config.width - platform.x - platform.displayWidth / 2;
            if(platformDistance < minDistance){
                minDistance = platformDistance;
                rightmostPlatformHeight = platform.y;
            }
            if(platform.x < - platform.displayWidth / 2){
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);
 
        // recycling coins
        this.coinGroup.getChildren().forEach(function(coin){
            if(coin.x < - coin.displayWidth / 2){
                this.coinGroup.killAndHide(coin);
                this.coinGroup.remove(coin);
            }
        }, this);
 
        // recycling fire
        this.fireGroup.getChildren().forEach(function(fire){
            if(fire.x < - fire.displayWidth / 2){
                this.fireGroup.killAndHide(fire);
                this.fireGroup.remove(fire);
            }
        }, this);
 
        // adding new platforms
        if(minDistance > this.nextPlatformDistance){
            let nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
            let platformRandomHeight = gameOptions.platformHeighScale * Phaser.Math.Between(gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1]);
            let nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
            let minPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[0];
            let maxPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[1];
            let nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
            this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2, nextPlatformHeight);
        }
    }
}
function resize(){
    let canvas = document.querySelector("canvas");
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowRatio = windowWidth / windowHeight;
    let gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
