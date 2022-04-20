"use strict";

// Set up PIXI.js container
const app = new PIXI.Application({
    width: 800,
    height: 600
});
document.body.appendChild(app.view);

const sceneWidth = app.view.width;
const sceneHeight = app.view.height;	

// Pre-Load images
app.loader.add([
    "./media/assets/sprites/player.png",
    "./media/assets/sprites/enemy.png",
    "./media/assets/objects/crate.png",
    "./media/assets/objects/heart.png",
    "./media/assets/objects/crystal.png",
    "./media/assets/tiles/exit-bottom.png",
    "./media/assets/tiles/exit-left.png",
    "./media/assets/tiles/exit-right.png",
    "./media/assets/tiles/exit-top.png",
    "./media/assets/tiles/floor.png",
    "./media/assets/tiles/inside_corner-bottom_left.png",
    "./media/assets/tiles/inside_corner-bottom_right.png",
    "./media/assets/tiles/inside_corner-top_left.png",
    "./media/assets/tiles/inside_corner-top_right.png",
    "./media/assets/tiles/inside_wall.png",
    "./media/assets/tiles/ladder.png",
    "./media/assets/tiles/outside_corner-bottom_left.png",
    "./media/assets/tiles/outside_corner-bottom_right.png",
    "./media/assets/tiles/outside_corner-top_left.png",
    "./media/assets/tiles/outside_corner-top_right.png",
    "./media/assets/tiles/outside_wall-bottom.png",
    "./media/assets/tiles/outside_wall-left.png",
    "./media/assets/tiles/outside_wall-right.png",
    "./media/assets/tiles/outside_wall-top.png",
]);
app.loader.onComplete.add(setup);
app.loader.load();

let stage;

// Scenes
let startScene;
let instructionsScene;
let gameScene;
let gameOverScene;

// UI Labels
let healthBar;
let inventoryLabel;
let crystalSprite;
let levelLabel;
let gameOverScoreLabel;

// Label styles
let titleStyle = new PIXI.TextStyle({
    fill: 0xFFFFFF,
    fontSize: 64,
    fontFamily: "Press Start 2P",
    stroke: 0xFF0000,
    strokeThickness: 6,
    align: "center"
});
let buttonStyle = new PIXI.TextStyle({
    fill: 0xFF0000,
    fontSize: 32,
    fontFamily: "Press Start 2P"
});
let textStyle = new PIXI.TextStyle({
    fill: 0xFFFFFF,
    fontSize: 24,
    fontFamily: "Press Start 2P"
});
let scoreStyle = new PIXI.TextStyle({
    fill: 0xFFFFFF,
    fontSize: 24,
    fontFamily: "Press Start 2P",
    align: "center"
});

// Sounds
let backgroundMusic;
let newLevel;
let gameOver;
let playerAttack;
let enemyAttack;
let breakCrate;
let getItem;

// Game info
let healthMax = 100;
let health = healthMax;
let level = 1;
let player;
let playerSpeedMax = 3;
let playerSpeed = playerSpeedMax;
let playerGems = 0;
let playerBombs = 0;

let paused = true;
let enableAttack = false;

// Dungeon info
let dungeonWidth = 2;
let dungeonHeight = 2;
let dungeon = [];
resetDungeon();

// Current room info
let currentRoom;
let roomCells;
let exits;
let crates = [];
let enemies = [];

// Input
let keys = {};

/**
 * Initialize basic variables to ensure the game functions properly
 */
function setup()
{
	stage = app.stage;

    // Input
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
	
    // Start Scene
    startScene = new PIXI.Container();
    stage.addChild(startScene);

    // Instructions Scene
    instructionsScene = new PIXI.Container();
    instructionsScene.visible = false;
    stage.addChild(instructionsScene);
	
    // Game Scene
    gameScene = new PIXI.Container();
    gameScene.visible = false;
    stage.addChild(gameScene);

	// End Scene
    gameOverScene = new PIXI.Container();
    gameOverScene.visible = false;
    stage.addChild(gameOverScene);
	
	// Fill-in scenes
    fillSceneUI();
	
	// Create player
    player = new Player();
	
	// Load Sounds
    backgroundMusic = new Howl({
        src: ["./media/audio/background_music.wav"],
        autoplay: true,
        loop: true,
        volume: 0.8
    });
    newLevel = new Howl({
        src: ['./media/audio/new_level.wav']
    });
    gameOver = new Howl({
        src: ['./media/audio/game_over.wav']
    });
    playerAttack = new Howl({
        src: ['./media/audio/player_attack.wav'],
        volume: 1.2
    });
    enemyAttack = new Howl({
        src: ['./media/audio/enemy_attack.wav'],
        volume: 0.6
    });
    breakCrate = new Howl({
        src: ['./media/audio/break_crate.mp3'],
        volume: 0.8
    });
    getItem = new Howl({
        src: ['./media/audio/get_item.wav'],
        volume: 0.2
    });
		
	// Start update loop
    app.ticker.add(gameLoop);
	
	// Start listening for click events on the canvas
    app.view.onclick = attack;
}

function fillSceneUI()
{
    // ------------- Set up start scene ------------- //
    // Game title
    let startLabel = new PIXI.Text("Dungeons,\nDanger,\nGlory");
    startLabel.style = titleStyle;

    startLabel.anchor.set(0.5, 0);
    startLabel.x = sceneWidth / 2;
    startLabel.y = 60;
    startScene.addChild(startLabel);
    
    // "Start" button
    let startButton = new PIXI.Text("Start");
    startButton.style = buttonStyle;

    startButton.anchor.set(0.5, 1);
    startButton.x = sceneWidth / 2;;
    startButton.y = sceneHeight - 60;
    startButton.interactive = true;
    startButton.buttonMode = true;
    startButton.on("pointerup", startGame);
    startButton.on("pointerover", e => e.target.alpha = 0.7);
    startButton.on("pointerout", e => e.currentTarget.alpha = 1.0);
    startScene.addChild(startButton);

    // "Instructions" button
    let instructionsButton = new PIXI.Text("Instructions");
    instructionsButton.style = buttonStyle;

    instructionsButton.anchor.set(0.5, 1);
    instructionsButton.x = sceneWidth / 2;;
    instructionsButton.y = startButton.y - startButton.height - 60;
    instructionsButton.interactive = true;
    instructionsButton.buttonMode = true;
    instructionsButton.on("pointerup", showInstructions);
    instructionsButton.on("pointerover", e => e.target.alpha = 0.7);
    instructionsButton.on("pointerout", e => e.currentTarget.alpha = 1.0);
    startScene.addChild(instructionsButton);

    // ------------- Set up instructions scene ------------- //
    let instructionText =
        "Instructions:\n\n"
        + "- To move, use W A S D\n\n"
        + "- Attack enemies and destroy crates with\n"
        + "  left-click\n\n"
        + "- Make your way through the dungeon and\n"
        + "  survive as long as possible!\n\n"
        + "- Earn gems along the way to increase\n"
        + "  your score!\n\n"
        + "- Gems can be obtained from enemies or\n"
        + "  crates"
    ;
    let instructionsLabel = new PIXI.Text(instructionText);
    instructionsLabel.style = textStyle;

    instructionsLabel.anchor.set(0, 0);
    instructionsLabel.x = 60;
    instructionsLabel.y = 60;
    instructionsLabel.width = sceneWidth - 120;
    instructionsScene.addChild(instructionsLabel);

    // "Menu" button
    let menuButton = new PIXI.Text("Menu");
    menuButton.style = buttonStyle;

    menuButton.anchor.set(0.5, 1);
    menuButton.x = sceneWidth / 2;
    menuButton.y = sceneHeight - 60;
    menuButton.interactive = true;
    menuButton.buttonMode = true;
    menuButton.on("pointerup", mainMenu);
    menuButton.on('pointerover', e => e.target.alpha = 0.7);
    menuButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    instructionsScene.addChild(menuButton);

    // ------------- Set up end scene ------------- //
    // "Game Over" Text
    let gameOverLabel = new PIXI.Text("Game Over!");
    gameOverLabel.style = titleStyle;

    gameOverLabel.anchor.set(0.5, 0);
    gameOverLabel.x = sceneWidth / 2;
    gameOverLabel.y = 60;
    gameOverScene.addChild(gameOverLabel);

    // Score Label
    gameOverScoreLabel = new PIXI.Text();
    gameOverScoreLabel.style = scoreStyle;

    gameOverScoreLabel.anchor.set(0.5, 0);
    gameOverScoreLabel.x = sceneWidth / 2;
    gameOverScoreLabel.y = gameOverLabel.y + gameOverLabel.height + 60;
    gameOverScene.addChild(gameOverScoreLabel);

    // "Menu" button
    menuButton = new PIXI.Text("Menu");
    menuButton.style = buttonStyle;

    menuButton.anchor.set(0.5, 1);
    menuButton.x = sceneWidth / 2;
    menuButton.y = sceneHeight - 60;
    menuButton.interactive = true;
    menuButton.buttonMode = true;
    menuButton.on("pointerup", mainMenu);
    menuButton.on('pointerover', e => e.target.alpha = 0.7);
    menuButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    gameOverScene.addChild(menuButton);
}

/**
 * Display the main menu
 */
function mainMenu()
{
    startScene.visible = true;
    instructionsScene.visible = false;
    gameScene.visible = false;
    gameOverScene.visible = false;
}
/**
 * Display the instructions screen
 */
function showInstructions()
{
    startScene.visible = false;
    instructionsScene.visible = true;
    gameScene.visible = false;
    gameOverScene.visible = false;
}
/**
 * Start the game, setting dungeon width and height as appropriate for level
 */
function startGame()
{
    startScene.visible = false;
    instructionsScene.visible = false;
    gameScene.visible = true;
    gameOverScene.visible = false;

    // Play background music if it's not already playing
    if(!backgroundMusic.playing())
    {
        backgroundMusic.play();
    }

    if(level % 3 == 0)
    {
        dungeonWidth = Math.min(dungeonWidth + 1, 6);
    }
    if(level % 4 == 0)
    {
        dungeonHeight = Math.min(dungeonHeight + 1, 8);
    }
    dungeon = [];
    resetDungeon();

    buildDungeon(Math.floor(dungeonHeight/2), Math.floor(dungeonWidth/2), null, null);
    for(let i = 0; i < dungeonHeight; i++)
    {
        for(let j = 0; j < dungeonWidth; j++)
        {
            dungeon[i][j].bounds = configureDungeonRoom();
            dungeon[i][j].drawRoom();
        }
    }

    currentRoom = dungeon[0][0];
    loadLevel(currentRoom, null, true);
    updateHealth();
    updateInventory();
    displayLevel();
}
/**
 * Reset the dungeon so that it can be filled with a new one if the player's level inceases
 */
function resetDungeon()
{
    for(let i = 0; i < dungeonHeight; i++)
    {
        dungeon.push([]);
        for(let j = 0; j < dungeonWidth; j++)
        {
            dungeon[i].push(null);
        }
    }
}
/**
 * The game has ended, reset player stats, give score
 */
function endGame()
{
    backgroundMusic.stop();
    paused = true;
    enableAttack = false;
    // TODO: Bombs not implemented
    gameOverScoreLabel.text = `You reached:\n\nLevel ${level}\n\n\nand collected:\n\n${playerGems} Gems`

    // Reset Game
    level = 1;
    health = healthMax;
    playerGems = 0;
    playerBombs = 0;
    
    gameOverScene.visible = true;
    gameScene.visible = false;
}
/**
 * Load a new room within a dungeon. If a player is coming from a previous room and hasn't 
 * just arrived on that level, set their spawn point to outside of the exit they just came 
 * out of. Otherwise, place them in the top left as long as there's no crate in that space. 
 * This function also adds all of this rooms objects to the gameScene.
 * @param {Room} room The room that was just entered
 * @param {Room} prevRoom The room from which the player is coming
 * @param {boolean} newLevel Is this a new level?
 */
function loadLevel(room, prevRoom, newLevel)
{
    gameScene.removeChildren();

    roomCells = room.cells;
    crates = room.crates;
    enemies = room.enemies;
    let playerPositionFound = false;

    // Add each cell to the scene
    for(let cell of roomCells)
    {
        // Find player's initial position in this room
        if(!playerPositionFound && newLevel && cell instanceof OpenCell && !(cell instanceof WallCell) && !cell.hasCrate)
        {
            player.x = cell.x + cell.width / 2;
            player.y = cell.y + cell.height / 2;
            playerPositionFound = true;
        }
        if(!playerPositionFound && !newLevel && cell instanceof ExitCell && prevRoom != null && prevRoom.id == cell.exitTo.id)
        {
            // if(prevRoom.id.row < room.id.row)
            if(cell.direction == "up")
            {
                // Exited down, appear up
                player.x = cell.x + cell.width / 2;
                player.y = cell.y + cell.height + player.height / 2;
            }
            // else if(prevRoom.id.row > room.id.row)
            else if(cell.direction == "down")
            {
                // Exited up, appear down
                player.x = cell.x + cell.width / 2;
                player.y = cell.y - player.height / 2;
            }
            // else if(prevRoom.id.col < room.id.col)
            else if(cell.direction == "left")
            {
                // Exited right, appear left
                player.x = cell.x + cell.width + player.width / 2;
                player.y = cell.y + cell.height / 2;
            }
            // else if(prevRoom.id.col > room.id.col)
            else if(cell.direction == "right")
            {
                // Exited left, appear right
                player.x = cell.x - player.width / 2;
                player.y = cell.y + cell.height / 2;
            }
            playerPositionFound = true;
        }
        gameScene.addChild(cell);
    }
    for(let crate of crates)
    {
        gameScene.addChild(crate);
    }
    for(let enemy of enemies)
    {
        gameScene.addChild(enemy);
    }

    gameScene.addChild(player);

    paused = false;
}

/**
 * Update the player's health
 */
function updateHealth()
{
    let basePosX = 60;
    let basePosY = 20;
    let healthBarWidth = 300;
    let healthBarHeight = 30;

    // Create empty health bar
    healthBar = new PIXI.Graphics();
    healthBar.beginFill(0x000000);
    healthBar.lineStyle(2, 0xFF0000);
    healthBar.drawRect(basePosX, basePosY, healthBarWidth, healthBarHeight);
    healthBar.endFill();
    gameScene.addChild(healthBar);

    // Fill health bar
    for(let i = 0; i < health; i++)
    {
        let segment = new PIXI.Graphics();
        let segmentWidth = healthBarWidth / healthMax;
        segment.beginFill(0xFF0000);
        segment.drawRect(basePosX + i * segmentWidth, basePosY, segmentWidth, healthBarHeight);
        segment.endFill();
        healthBar.addChild(segment);
    }

    // Add sprite to health bar
    let heartSprite = new PIXI.Sprite();
    heartSprite.texture = app.loader.resources["./media/assets/objects/heart.png"].texture;
    heartSprite.anchor.set(0.5);
    heartSprite.width = healthBarHeight + 10;
    heartSprite.height = healthBarHeight + 10;
    heartSprite.x = basePosX - 5;
    heartSprite.y = basePosY + healthBarHeight / 2;
    healthBar.addChild(heartSprite);

}
/**
 * Update the player's inventory
 */
function updateInventory()
{
    gameScene.removeChild(inventoryLabel);
    gameScene.removeChild(crystalSprite);
    
    let basePosX = sceneWidth - 60;
    let basePosY = 35;
    
    //TODO: Bombs not implemented
    inventoryLabel = new PIXI.Text(`x ${playerGems}`);
    inventoryLabel.style = textStyle;
    
    inventoryLabel.anchor.set(1, 0.5);
    inventoryLabel.x = basePosX;
    inventoryLabel.y = basePosY;
    gameScene.addChild(inventoryLabel);
    
    // Add sprite to inventory display
    crystalSprite = new PIXI.Sprite();
    crystalSprite.texture = app.loader.resources["./media/assets/objects/crystal.png"].texture;
    crystalSprite.anchor.set(1, 0.5);
    crystalSprite.x = inventoryLabel.x - inventoryLabel.width;
    crystalSprite.y = basePosY;
    gameScene.addChild(crystalSprite);
}
/**
 * Update the player's level
 */
function displayLevel()
{
    gameScene.removeChild(levelLabel);

    let basePosX = sceneWidth - 60;
    let basePosY = sceneHeight - 35;

    levelLabel = new PIXI.Text(`Level ${level}`);
    levelLabel.style = textStyle;

    levelLabel.anchor.set(1, 0.5);
    levelLabel.x = basePosX;
    levelLabel.y = basePosY;
    gameScene.addChild(levelLabel);
}

/**
 * The player hit the left-mouse button
 */
function attack()
{
    let entityAttacked = false;
    let entity = null;
    if(!paused && enableAttack)
    {
        // Check for nearby crate
        for(let crate of crates)
        {
            if(checkDistanceFromPlayer(crate) && checkEntityClicked(crate))
            {
                entityAttacked = true;
                entity = crate;
                break;
            }
        }
        // Check for nearby enemy
        for(let enemy of enemies)
        {
            if(checkDistanceFromPlayer(enemy) && checkEntityClicked(enemy))
            {
                entityAttacked = true;
                entity = enemy;
                break;
            }
        }
        
        // Remove this entity
        if(entityAttacked)
        {
            gameScene.removeChild(entity);
            entity.isAlive = false;

            if(entity instanceof Crate)
            {
                breakCrate.play();
                currentRoom.bounds[entity.id.row][entity.id.col] = 1;
                currentRoom.numCrates--;
                if(entity.contains == "gem")
                {
                    getItem.play();
                    currentRoom.numGems--;
                    playerGems++;
                }
                else if(entity.contains == "bomb")
                {
                    //TODO: Bombs not implemented
                    // getItem.play();
                    currentRoom.numBombs--;
                    playerBombs++;
                }
                updateInventory();
            }
            if(entity instanceof Enemy)
            {
                playerAttack.play();
                playerGems++;
                updateInventory();
            }
        }
    }
}
/**
 * Test how far away the player is from the entity
 * @param {*} entity The entity from which to test distance from the player
 * @returns true if the entity is within the player's range of motion, false otherwise
 */
function checkDistanceFromPlayer(entity)
{
    if(player.x - player.range.width / 2 <= entity.x + entity.width / 2
        && player.x + player.range.width / 2 >= entity.x - entity.width / 2
        && player.y - player.range.height / 2 <= entity.y + entity.height / 2
        && player.y + player.range.height / 2 >= entity.y - entity.height / 2)
    {
        return true;
    }
    else
    {
        return false;
    }
}
/**
 * Test to see if the player has clicked the entity
 * @param {*} entity The entity that was potentially clicked
 * @returns true if this entity was clicked, false if otherwise
 */
function checkEntityClicked(entity)
{
    let mousePosition = app.renderer.plugins.interaction.mouse.global;

    if(mousePosition.x <= entity.x + entity.width / 2
        && mousePosition.x >= entity.x - entity.width / 2
        && mousePosition.y <= entity.y + entity.height / 2
        && mousePosition.y >= entity.y - entity.height / 2)
    {
        return true;
    }
    else
    {
        return false;
    }
}

/**
 * The main game loop. Movement, collisions, etc. are checked here
 * @returns void, exit the game loop
 */
function gameLoop()
{
	if(paused)
    {
        return;
    }

    enableAttack = true;
	
	// Calculate delta time
	let dt = 1/app.ticker.FPS;
    if (dt > 1/12) dt=1/12;
	
	// Move Player
    if(keys["87"])
    {
        // W
        player.y -= playerSpeed;
    }
    if(keys["65"])
    {
        // A
        player.x -= playerSpeed;
    }
    if(keys["83"])
    {
        // S
        player.y += playerSpeed;
    }
    if(keys["68"])
    {
        // D
        player.x += playerSpeed;
    }
	
	// Move enemies in this room
	for(let enemy of enemies)
    {
        //enemy.seekPlayer(player);
        enemy.move(dt);
    }
	
	// Check for collisions
	for(let cell of roomCells)
    {   
        // Player and Wall
        if(cell instanceof WallCell && rectsIntersect(player, cell))
        {
            enforceBoundary(player, cell);
        }
        // Player and Exit
        if(cell instanceof ExitCell && rectsIntersect(player, cell))
        {
            // hitSound.play();
            let prevRoom = currentRoom;
            currentRoom = cell.exitTo
            loadLevel(currentRoom, prevRoom, false);
            updateHealth();
            updateInventory();
            displayLevel();
        }
        // Player and Next-Level Exit
        if(cell.toNextLevel && rectsIntersect(player, cell))
        {
            newLevel.play();
            level++;
            startGame();
        }

        for(let enemy of enemies)
        {
            // Enemy and Wall
            if(cell instanceof WallCell && rectsIntersect(enemy, cell))
            {
                enforceBoundary(enemy, cell);
                enemy.changeDirection();
            }
            // Enemy and Exit
            if(cell instanceof ExitCell && rectsIntersect(enemy, cell))
            {
                enforceBoundary(enemy, cell);
                enemy.changeDirection();
            }
        }
    }
    for(let crate of crates)
    {
        // Player and Crate
        if(rectsIntersect(player, crate))
        {
            enforceBoundary(player, crate);
        }
        
        for(let enemy of enemies)
        {
            // Enemy and Crate
            if(rectsIntersect(enemy, crate))
            {
                enforceBoundary(enemy, crate);
                enemy.changeDirection();
            }
        }
    }
    for(let enemy of enemies)
    {
        // Enemy attacks player
        if(rectsIntersect(player, enemy))
        {
            enemyAttack.play();
            health -= 0.5;
            updateHealth();
        }
        // Enemy sees player
        if(enemy.x - enemy.fov.width / 2 <= player.x + player.width / 2
            && enemy.x + enemy.fov.width / 2 >= player.x - player.width / 2
            && enemy.y - enemy.fov.height / 2 <= player.y + player.height / 2
            && enemy.y + enemy.fov.height / 2 >= player.y - player.height / 2)
        {
            enemy.seeking = true;
        }
        else
        {
            enemy.seeking = false;
        }

        if(enemy.seeking)
        {
            enemy.seekPlayer(player);
        }
    }
	
	// Clean up inactive assets
    crates = crates.filter(e => e.isAlive);
    currentRoom.crates = crates;
    enemies = enemies.filter(e => e.isAlive);
    currentRoom.enemies = enemies;
	
	// Player out of health
	if (health <= 0)
    {
        gameOver.play();
        endGame();
        return;
    }
}

/**
 * Ensure an entity does not move past a given boundary
 * @param {*} entity The entity that is hitting the boundary
 * @param {*} boundary The boundary being hit by the entity
 */
function enforceBoundary(entity, boundary)
{
    let eBound = entity.getBounds();
    let bBound = boundary.getBounds();
    if(bBound.y + bBound.height / 2 <= eBound.y + eBound.height / 2
        && eBound.x + eBound.width / 2 >= bBound.x && eBound.x + eBound.width / 2 <= bBound.x + bBound.width)
    {
        // Collide top of entity, bottom of boundary
        entity.y = bBound.y + bBound.height + (entity.height / 2);
    }
    if(bBound.y + bBound.height / 2 >= eBound.y + eBound.height / 2
        && eBound.x + eBound.width / 2 >= bBound.x && eBound.x + eBound.width / 2 <= bBound.x + bBound.width)
    {
        // Collide bottom of entity, top of boundary
        entity.y = bBound.y - entity.height / 2;
    }
    if(bBound.x + bBound.width / 2 <= eBound.x + eBound.width / 2
        && eBound.y + eBound.height / 2 >= bBound.y && eBound.y + eBound.height / 2 <= bBound.y + bBound.height)
    {
        // Collide left of entity, right of boundary
        entity.x = bBound.x + bBound.width + entity.width / 2;
    }
    if(bBound.x + bBound.width / 2 >= eBound.x + eBound.width / 2
        && eBound.y + eBound.height / 2 >= bBound.y && eBound.y + eBound.height / 2 <= bBound.y + bBound.height)
    {
        // Collide right of entity, left of boundary
        entity.x = bBound.x - entity.width / 2;
    }
}

/**
 * Given an index within a 2-dimensional array, recursively build an array of connected rooms 
 * such that every room is reachable
 * @param {numeber} row The current row for which to potentially create a room
 * @param {number} col The current column for which to potentially create a room
 * @param {number} prevRow The last row handled by this function
 * @param {number} prevCol The last column handled by this function
 * @returns 
 */
function buildDungeon(row, col, prevRow, prevCol)
{
    // Create this room if it doesn't already exist
    if(dungeon[row][col] == null)
    {
        let id = {row: row, col: col};
        let numGems = 2;
        let numBombs = 1;
        let numCrates = Math.round(Math.random() + (numGems + numBombs));
        let numEnemies = Math.round(Math.random() * Math.min(level, 5));
        let containsNextLevel = false;
        // No enemies in the first room
        if(row == 0 && col == 0)
        {
            numEnemies = 0;
        }
        // The last room will have an exit to the next level
        if(row == dungeon.length - 1 && col == dungeon[row].length - 1)
        {
            containsNextLevel = true;
        }
        dungeon[row][col] = new Room(id, sceneWidth, sceneHeight, numCrates, numGems, numBombs, numEnemies, containsNextLevel);
    }
    
    // Connect these rooms if a previous room exists
    if(prevRow != null && prevCol != null)
    {
        if(!dungeon[prevRow][prevCol].exits.includes(dungeon[row][col]))
        {
            dungeon[prevRow][prevCol].exits.push(dungeon[row][col]);
        }
        if(!dungeon[row][col].exits.includes(dungeon[prevRow][prevCol]))
        {
            dungeon[row][col].exits.push(dungeon[prevRow][prevCol]);
        }
    }

    // Find which directions are possible from current room
    let possibleDirections = findMoves(row, col);

    if(possibleDirections.length == 0)
    {
        // Base case, no moves are possible from this cell
        return;
    }
    else
    {
        // Choose a direction to move from possible directions
        let direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];

        if(direction == 0)
        {
            // Up
            buildDungeon(row - 1, col, row, col);
        }
        else if(direction == 1)
        {
            // Down
            buildDungeon(row + 1, col, row, col);
        }
        else if(direction == 2)
        {
            // Left
            buildDungeon(row, col - 1, row, col);
        }
        else if(direction == 3)
        {
            // Right
            buildDungeon(row, col + 1, row, col);
        }

        buildDungeon(row, col, null, null);
    }
}
/**
 * Determine which directions to which the cell given by row and column can move
 * @param {number} row The row to test
 * @param {number} col The column to test
 * @returns An array of directions from which the given cell can move
 */
function findMoves(row, col)
{
    let possibleDirections = [];

    // Up = 0, Right = 1, Down = 2, Left = 3
    // 25% chance to go up even if it's already been there (for looping paths)
    if((row != 0 && dungeon[row - 1][col] == null) || (row != 0 && Math.random() < 0.25))
    {
        // Can go up (Not currently at top edge, and up has not already been reached)
        possibleDirections.push(0);
    }
    if(row != dungeonHeight - 1 && dungeon[row + 1][col] == null)
    {
        // Can go down (Not currently at bottom edge, and down has not already been reached)
        possibleDirections.push(1);
    }
    if(col != 0 && dungeon[row][col - 1] == null)
    {
        // Can go left (Not currently at left edge, and left has not already been reached)
        possibleDirections.push(2);
    }
    if(col != dungeonWidth - 1 && dungeon[row][col + 1] == null)
    {
        // Can go right (Not currently at right edge, and right has not already been reached)
        possibleDirections.push(3);
    }

    return possibleDirections;
}

/**
 * Detect when a key is pressed and store it
 * @param {*} e The target of the event
 */
function keyDown(e)
{
    keys[e.keyCode] = true;
}
/**
 * Detect when a key is released and store its new value
 * @param {*} e The target of the event
 */
function keyUp(e)
{
    keys[e.keyCode] = false;
}