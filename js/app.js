// Enemies our player must avoid
var Enemy = function(x, y, speed, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 80;
    this.height = 70;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks


Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Enemy movement loop
    if (this.x > 910){ // If enemy is off-canvas, start over at -80
        this.x = -80;
        this.speed = Math.random() * (120 - 60) + 60;
    } else {
       this.x = this.x + (this.speed * dt);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.sprite = 'images/owl.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 50;
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

    var playerMove = 30;

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
    }
};

// Now instantiate your objects.
var player = new Player(420, 800);
var allEnemies = [  new Enemy(-200, 210, 77, 'images/puppy.png'),
                    new Enemy(-700, 222, 77, "images/dalmatian.gif"),
                    new Enemy(-400, 300, 77, "images/puppy.png"),
                    new Enemy(200, 550, 77, "images/dalmatian.gif"),
                    new Enemy(-300, 550, 77, "images/puppy.png"),
                    new Enemy(-10, 635, 77, "images/dalmatian.gif"),
                    new Enemy(-500, 635, 77, "images/puppy.png"),
                    new Enemy(-10, 300, 77, "images/dalmatian.gif")];


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

Player.prototype.backPreviousPosition = function() {
    this.x = previousX;
    this.y = previousY;
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

var LevelComplete = function() {
    this.x = 0;
    this.y = 0;
}

LevelComplete.prototype.render = function() {
        if (player.y < 20) {
            ctx.fillStyle = "white";
            ctx.font = "60px Comic Sans MS";
            ctx.fillText("Level Complete", 250, 200);
        }
    };

var levelComplete = new LevelComplete();


// -----------------------------------Create and format collisions for Obstacles--------------------------------
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
    this.width = 100;
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

allObstacles = [new Rock(204, 373), new Rock(406, 373), new Rock(608, 373),
                new Rock(2, 700), new Rock(808, 700), new Rock(2, 455), new Rock(808, 455),
                new Bench(328, 670), new Bench(442, 670), new Bench(328, 470), new Bench(442, 470),new Tree(1, 57), new Tree(250, 57),
                new Tree(505, 57), new Tree(760, 57)];

//----------------------------------Create and format collisions for special items----------------------------
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

allItems = [new Seasoning(190, 120, 'images/bbq.png'), new Seasoning(680, 120, 'images/tongs.png'),
            new Seasoning(430, 650, 'images/seasoning.png'), new Key(440, 300)];

//----------------------------------Create and format collisions for special items----------------------------
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

allGate = [new Gate(385, 30)];

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
