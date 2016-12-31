// Enemies our player must avoid
var Enemy = function(x, y, speed, sprite, direction) {

    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 80;
    this.height = 70;
    this.sprite = sprite;
    this.direction = direction;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // Enemy movement loop
    if (this.direction == 1 && this.x > 910){ // If enemy is off-canvas, start over at -80
        this.x = -80;
        this.speed = Math.random() * (120 - 60) + 90;
    } else if (this.direction == 2 && this.x < 0){ // If enemy is off-canvas, start over at -80
        this.x = 930;
        this.speed = -85;
    } else if (allLives.length === 0 || (allItems.length === 0 && this.y < 20)) {
        allEnemies.length = 0;
    } else {
        this.x = this.x + (this.speed * dt);
    }
};


// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Define Player class, handle update of player functions and movement
var Player = function(x, y, speed) {
    this.sprite = 'images/owl.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 57;
    this.height = 63;
};

Player.prototype.update = function(dt) {
    this.checkCollisions();
    this.checkObstacles();
    this.checkItems();
    this.checkGate();

    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 844) {
        this.x = 844;
    } else if ((this.y < 55 && this.x <= 370) || (this.y < 55 && this.x >= 500)) {
        this.y = 800;
        allLives.splice(allLives.length - 1);
    } else if ((this.x >=371 && this.x <= 499) && this.y < -1000) {
        this.y = 800;
    } else if (this.y > 800) {
        this.y = 800;
    } else if (this.y < 20 && this.x >=371 && this.x <= 499) {
        this.y = -500;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){

    var playerMove = 42;

    this.savePreviousPosition();
    switch(key){
        case 'up':
            this.y -= playerMove;
            break;
        case 'down':
            this.y += playerMove;
            break;
        case 'left':
            this.x -= playerMove;
            break;
        case 'right':
            this.x += playerMove;
            break;
        case 'space':
            this.reset();
    }
};


// Instantiates Player and Enemy objects.
var player = new Player(420, 800);
var allEnemies = [  new Enemy(-200, 220, 77, 'images/puppy.png', 1),
                    new Enemy(-700, 222, 77, "images/dalmatian.gif", 1),
                    new Enemy(1300, 300, -77, "images/puppy1.png", 2),
                    new Enemy(920, 300, -77, "images/dalmatian1.png", 2),
                    new Enemy(200, 550, 77, "images/dalmatian.gif", 1),
                    new Enemy(-300, 550, 77, "images/puppy.png", 1),
                    new Enemy(920, 635, -77, "images/dalmatian1.png", 2),
                    new Enemy(1400, 635, -77, "images/puppy1.png", 2)];


Player.prototype.savePreviousPosition = function() {
    previousX = this.x;
    previousY = this.y;
};


// Check Player collision with Enemies
Player.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        var enemy = allEnemies[i];

        if ((enemy.x + 20) < this.x + this.width &&
            enemy.x + enemy.width > this.x &&
            enemy.y < this.y + this.height &&
            enemy.height + (enemy.y - 40) > this.y) {
                this.x = 420;
                this.y = 800;
                allLives.splice(allLives.length - 1);
        }
    }
};


// Check Player collision with Obstacles
Player.prototype.checkObstacles = function() {
        for (var i = 0; i < allObstacles.length; i++) {
        var obstacle = allObstacles[i];
        if (obstacle.x < this.x + this.width &&
        obstacle.x + obstacle.width > this.x &&
        obstacle.y < (this.y + 8) + this.height &&
        obstacle.height + obstacle.y > (this.y + 8)) {
            this.backPreviousPosition();
        }
    }
};


// Check Player collision with Items
Player.prototype.checkItems = function() {
        for (var i = 0; i < allItems.length; i++) {
        var item = allItems[i];
        if (item.x < this.x + this.width &&
        item.x + item.width > this.x &&
        item.y < (this.y + 8) + this.height &&
        item.height + item.y > (this.y + 8)) {
            allItems.splice(i, 1);
        }
    }
};


// Check Player collision with Gate
Player.prototype.checkGate = function() {
        this.checkItems();

        for (var i = 0; i < allGate.length; i++) {
        var gate = allGate[i];
        if (gate.x < this.x + this.width &&
        gate.x + gate.width > this.x &&
        gate.y < (this.y + 8) + this.height &&
        gate.height + gate.y > (this.y + 8)) {
            if (allItems.length < 1) {
                allGate.splice(i);
            } else {
            this.backPreviousPosition();}
        }
    }
};


// Reset player location to start and define player previous location for collisions
Player.prototype.reset = function() {
    if (allLives.length === 0 || (allItems.length === 0 && this.y < 20)) {
        location.reload();
}
};

Player.prototype.backPreviousPosition = function() {
    this.x = previousX;
    this.y = previousY;
};


// Create and format collisions for Obstacles
var Rock = function(x, y) {
    this.sprite = 'images/Rock.png';
    this.x = x;
    this.y = y;
    this.width = 81;
    this.height = 63;
};

Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Bench = function(x, y) {
    this.sprite = 'images/bench.png';
    this.x = x;
    this.y = y;
    this.width = 140;
    this.height = 20;
};

Bench.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Tree = function(x, y) {
    this.sprite = 'images/tree.png';
    this.x = x;
    this.y = y;
    this.width = 111;
    this.height = 103;
};

Tree.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

allObstacles = [new Rock(204, 373),
                new Rock(406, 373),
                new Rock(608, 373),
                new Rock(2, 707),
                new Rock(808, 707),
                new Rock(2, 455),
                new Rock(808, 455),
                new Bench(328, 670),
                new Bench(442, 670),
                new Bench(328, 470),
                new Bench(442, 470),
                new Tree(-19, 57),
                new Tree(250, 57),
                new Tree(525, 57),
                new Tree(780, 57)];


//Create and format collisions for special items
var Seasoning = function(x, y, sprite) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
}

Seasoning.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Key = function(x, y) {
    this.sprite = 'images/Key.png';
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
}

Key.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var allItems = [new Seasoning(190, 120, 'images/bbq.png'),
            new Seasoning(680, 120, 'images/tongs.png'),
            new Seasoning(430, 650, 'images/seasoning.png'),
            new Seasoning(440, 350, 'images/rolls.png'),
            new Key(15, 650)];


//Create and format collisions for special items
var Gate = function(x, y) {
    this.sprite = 'images/gate.png';
    this.x = x;
    this.y = y;
    this.width = 190;
    this.height = 80;
}

Gate.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var allGate = [new Gate(385, 30)];


// Define Player lives and render on screen
var Life = function(x, y) {
    this.sprite = 'images/Heart.png';
    this.x = x;
    this.y = y;
}

Life.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = "white";
    ctx.font = "20px Comic Sans MS";
    ctx.fillText("Lives", 10, 75);
}

var allLives = [new Life(70, 58), new Life(95, 58), new Life(120, 58)];

// End level once complete or all lifes are gone
var LevelComplete = function() {};

LevelComplete.prototype.render = function() {
        if (player.y < 20) {
            ctx.fillStyle = "white";
            ctx.font = "60px Comic Sans MS";
            ctx.fillText("Level Complete", 250, 200);
            ctx.strokeText("Level Complete", 250, 200);
            ctx.font = "44px Comic Sans MS";
            ctx.fillText(startOver, 150, 260);
            ctx.strokeText(startOver,150, 260);
            allEnemies.length = 0;
        }
    };

var levelComplete = new LevelComplete();

var GameOver = function() {};

GameOver.prototype.render = function() {
        if (allLives.length === 0) {
            ctx.fillStyle = "white";
            ctx.font = "60px Comic Sans MS";
            ctx.fillText("Game Over!!!", 300, 210);
            ctx.strokeText("Game Over!!!", 300, 210);
            ctx.font = "44px Comic Sans MS";
            ctx.fillText(startOver, 150, 260);
            ctx.strokeText(startOver,150, 260);
            player.x = 1000;
        }
    };

var gameOver = new GameOver();

var startOver = "Press 'Space Bar' to Play Again.";

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
