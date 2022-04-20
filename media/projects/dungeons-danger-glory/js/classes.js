/*
TODO:
 - Change enemy texture when seeking
 - Update remaining textures:
    - Player
    - Enemy
    - Crate
    - Gem
    - Ladder
 - Rouguelike?
    - Limited lives
    - Purchasable upgrades from starting room
    - Purchase with gems:
       - Lives
       - Health
       - Stamina? (Upgrade attacking/add defending)
       - Weapons?
       - ?
*/

class Player extends PIXI.Sprite
{
    constructor(x = 0, y = 0)
    {
        super(app.loader.resources["./media/assets/sprites/player.png"].texture);

        this.anchor.set(0.5);
        this.scale.set(2);
        this.x = x;
        this.y = y;

        this.range =
        {
            width: this.width * 2,
            height: this.height * 2
        };
    }
}
class Enemy extends PIXI.Sprite
{
    constructor(x = 0, y = 0, room = null)
    {
        super(app.loader.resources["./media/assets/sprites/enemy.png"].texture);
        
        this.anchor.set(0.5);
        this.scale.set(2);
        this.x = x;
        this.y = y;
        this.room = room;

        this.fwd = getRandomUnitVector();
        this.speed = 50;
        this.isAlive = true;
        this.seeking = false;

        this.fov =
        {
            width: this.room.cells[0].width * 6,
            height: this.room.cells[0].height * 6
        };
    }

    /**
     * Move this enemy
     * @param {*} dt The framerate of the game
     */
    move(dt = 1 / 60)
    {
        this.x += this.fwd.x * this.speed * dt;
        this.y += this.fwd.y * this.speed * dt;
    }
    /**
     * Change the direction of this enemy
     */
    changeDirection()
    {
        this.fwd = getRandomUnitVector();
    }
    /**
     * Set the this enemy's forward vector to the player if there is nothing between them
     * @param {Player} player 
     */
    seekPlayer(player)
    {
        let hasLineOfSight = true;

        // Get the location of the enemy and player in the bounds of the room
        let enemyX;
        let enemyY;
        let playerX;
        let playerY;
        for(let cell of this.room.cells)
        {
            if(this.x >= cell.x && this.x <= cell.x + cell.width && this.y >= cell.y && this.y <= cell.y + cell.height)
            {
                enemyX = cell.id.col;
                enemyY = cell.id.row;
            }
            if(player.x >= cell.x && player.x <= cell.x + cell.width && player.y >= cell.y && player.y <= cell.y + cell.height)
            {
                playerX = cell.id.col;
                playerY = cell.id.row;
            }
        }

        // Make a line between the player and the enemy, ensuring the line doesn't have an undefined slope
        if(enemyX != playerX)
        {
            // Slope
            let m = (enemyY - playerY) / (enemyX - playerX);
            // y-intercept
            let b = enemyY - m * enemyX;
            
            // There should be no obstacles between the player and this enemy
            for(let i = Math.min(enemyX, playerX) + 1; i < Math.min(enemyX, playerX) + Math.abs(enemyX - playerX); i++)
            {
                // Test nearest cell above and below the line
                if(this.room.bounds[Math.floor(m * i + b)][i] == cellTypes.wall
                && this.room.bounds[Math.ceil(m * i + b)][i] == cellTypes.wall)
                {
                    hasLineOfSight = false;
                }
            }
            for(let i = Math.min(enemyY, playerY) + 1; i < Math.min(enemyY, playerY) + Math.abs(enemyY - playerY); i++)
            {
                // Test nearest cell to the left and right of the line
                if(this.room.bounds[i][Math.floor((i - b) / m)] == cellTypes.wall
                && this.room.bounds[i][Math.ceil((i - b) / m)] == cellTypes.wall)
                {
                    hasLineOfSight = false;
                }
            }
        }
        else
        {
            // There should be no obstacles between the player and this enemy
            for(let i = Math.min(enemyY, playerY); i < Math.min(enemyY, playerY) + Math.abs(enemyY - playerY); i++)
            {
                // Test nearest cell to the left and right of the line
                if(this.room.bounds[i][enemyX] == cellTypes.wall && this.room.bounds[i][enemyX] == cellTypes.wall)
                {
                    hasLineOfSight = false;
                }
            }
        }
        
        if(hasLineOfSight)
        {
            this.fwd = getUnitVector(player.x - this.x, player.y - this.y);
        }
    }
}

class Cell extends PIXI.Sprite
{
    constructor(id, x = 0, y = 0, width = 10, height = 10, texture = PIXI.Texture.WHITE, bounds = [])
    {
        super(app.loader.resources[texture].texture);

        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.bounds = bounds;
    }
}
class OpenCell extends Cell
{
    constructor(id, x, y, width, height, texture, hasCrate, crate = null, toNextLevel, bounds)
    {
        super(id, x, y, width, height, texture, bounds);

        this.hasCrate = hasCrate;
        this.crate = crate;
        
        this.toNextLevel = toNextLevel;
    }
}
class WallCell extends Cell
{
    constructor(id, x, y, width, height, openFaces = "", bounds)
    {
        super(id, x, y, width, height, "./media/assets/tiles/floor.png", bounds);

        this.openFaces = openFaces;
        this.texture = this.getTexture();
    }

    /**
     * Determine which texture to apply to this WallCell object
     * @returns The texture belonging to this WallCell object
     */
    getTexture()
    {
        // 1        1       1       1
        // top      bottom  left    right
        switch(this.openFaces)
        {
            case "0000":
            {
                let row = this.id.row;
                let col = this.id.col;
                let rowMax = this.bounds.length - 1;
                let colMax = this.bounds[this.id.row].length - 1;
                if(row != rowMax && col != colMax && this.bounds[row + 1][col + 1] != cellTypes.wall)
                {
                    return app.loader.resources["./media/assets/tiles/outside_corner-top_left.png"].texture;
                }
                if(row != rowMax && col != 0 && this.bounds[row + 1][col - 1] != cellTypes.wall)
                {
                    return app.loader.resources["./media/assets/tiles/outside_corner-top_right.png"].texture;
                }
                if(row != 0 && col != colMax && this.bounds[row - 1][col + 1] != cellTypes.wall)
                {
                    return app.loader.resources["./media/assets/tiles/outside_corner-bottom_left.png"].texture;
                }
                if(row != 0 && col != 0 && this.bounds[row - 1][col - 1] != cellTypes.wall)
                {
                    return app.loader.resources["./media/assets/tiles/outside_corner-bottom_right.png"].texture;
                }
                return PIXI.Texture.EMPTY;
            }

            case "0001": return app.loader.resources["./media/assets/tiles/outside_wall-left.png"].texture;
            case "0010": return app.loader.resources["./media/assets/tiles/outside_wall-right.png"].texture;
            case "0100": return app.loader.resources["./media/assets/tiles/outside_wall-top.png"].texture;
            case "1000": return app.loader.resources["./media/assets/tiles/outside_wall-bottom.png"].texture;

            case "0101": return app.loader.resources["./media/assets/tiles/inside_corner-bottom_right.png"].texture;
            case "0110": return app.loader.resources["./media/assets/tiles/inside_corner-bottom_left.png"].texture;
            case "1001": return app.loader.resources["./media/assets/tiles/inside_corner-top_right.png"].texture;
            case "1010": return app.loader.resources["./media/assets/tiles/inside_corner-top_left.png"].texture;
            
            // The following cases cannot occur with the current room layout possibilities
            case "0011": return app.loader.resources["./media/assets/tiles/inside_wall.png"].texture;
            case "1100": return app.loader.resources["./media/assets/tiles/inside_wall.png"].texture;
            case "0111": return app.loader.resources["./media/assets/tiles/inside_wall.png"].texture;
            case "1011": return app.loader.resources["./media/assets/tiles/inside_wall.png"].texture;
            case "1101": return app.loader.resources["./media/assets/tiles/inside_wall.png"].texture;
            case "1110": return app.loader.resources["./media/assets/tiles/inside_wall.png"].texture;
            case "1111": return app.loader.resources["./media/assets/tiles/inside_wall.png"].texture;
        }
    }
}
class ExitCell extends Cell
{
    constructor(id, x, y, width, height, texture, direction, exitTo, bounds)
    {
        super(id, x, y, width, height, texture, bounds);

        this.direction = direction;
        this.exitTo = exitTo;

        this.texture = this.getTexture();
    }

    /**
     * Determine which texture to apply to this ExitCell object
     * @returns The texture belonging to this ExitCell object
     */
    getTexture()
    {
        switch(this.direction)
        {
            case "up": return app.loader.resources["./media/assets/tiles/exit-top.png"].texture;
            case "down": return app.loader.resources["./media/assets/tiles/exit-bottom.png"].texture;
            case "left": return app.loader.resources["./media/assets/tiles/exit-left.png"].texture;
            case "right": return app.loader.resources["./media/assets/tiles/exit-right.png"].texture;
        }
    }
}

class Crate extends PIXI.Sprite
{
    constructor(id, x, y, width = 10, height = 10, contains)
    {
        super(app.loader.resources["./media/assets/objects/crate.png"].texture);
        
        this.id = id;

        this.width = width * 0.8;
        this.height = height * 0.8;
        this.anchor.set(0.5);
        this.x = x + width / 2;
        this.y = y + height / 2;

        this.contains = contains;

        this.isAlive = true;
    }
}

class Room
{
    constructor(id, sceneWidth, sceneHeight, numCrates, numGems, numBombs, numEnemies, containsNextLevel)
    {
        this.id = id;
        this.sceneWidth = sceneWidth;
        this.sceneHeight = sceneHeight;
        this.cellWidth = 1;
        this.cellHeight = 1;
        this.baseCellX = 1;
        this.baseCellY = 1;

        // Create room
        this.bounds = [];
        this.cells = [];
        this.exits = [];

        this.crates = [];
        this.numCrates = numCrates;
        this.numGems = numGems;
        this.numBombs = numBombs;

        this.enemies = [];
        this.numEnemies = numEnemies;

        this.containsNextLevel = containsNextLevel;
    }

    /**
     * Create this room based on the calculated bounds array
     */
    drawRoom()
    {
        this.cellWidth = this.sceneWidth / (this.bounds[0].length + 4);
        this.cellHeight = this.sceneHeight / (this.bounds.length + 4);
        this.baseCellX = this.cellWidth * 2;
        this.baseCellY = this.cellHeight * 2;
        this.placeExits();
        this.placeCrates();
        for(let i = 0; i < this.bounds.length; i++)
        {
            for(let j = 0; j < this.bounds[i].length; j++)
            {
                let id;
                let xPos = j * this.cellWidth + this.baseCellX;
                let yPos = i * this.cellHeight + this.baseCellY;
                let texture;
                let hasCrate = false;
                let crate = null;
                let toNextLevel = false;

                let cell;

                if(this.bounds[i][j] == cellTypes.wall)
                {
                    // Wall
                    id = {row: i, col: j};
                    texture = "./media/assets/tiles/outside_wall-top.png";
                    //let openFaces = this.checkSurrounding(i, j, [cellTypes.open, cellTypes.exit, cellTypes.crate]);
                    let openFaces = this.checkSurrounding(i, j, [cellTypes.open, cellTypes.crate]);
                    cell = new WallCell(id, xPos, yPos, this.cellWidth, this.cellHeight, openFaces, this.bounds);
                }
                else if(this.bounds[i][j] == cellTypes.open)
                {
                    // Open space
                    id = {row: i, col: j};
                    texture = "./media/assets/tiles/floor.png";

                    // if(this.containsNextLevel && i == this.bounds.length - 2 && j == this.bounds[i].length - 2)
                    // {
                    //     // This is the exit to the next level
                    //     texture = "./media/images/ladder.png";
                    //     toNextLevel = true;
                    // }

                    cell = new OpenCell(id, xPos, yPos, this.cellWidth, this.cellHeight, texture, hasCrate, null, toNextLevel, this.bounds);
                }
                else if(this.bounds[i][j] == cellTypes.crate)
                {
                    // Crate
                    id = {row: i, col: j};
                    texture = "./media/assets/tiles/floor.png";
                    hasCrate = true;
                    for(let c of this.crates)
                    {
                        if(c.id.row == i && c.id.col == j)
                        {
                            crate = c;
                        }
                    }
                    cell = new OpenCell(id, xPos, yPos, this.cellWidth, this.cellHeight, texture, hasCrate, crate, toNextLevel, this.bounds);
                }
                else
                {
                    // Exit
                    continue;
                }
                
                // If a cell was created, add it to list of cells
                if(cell)
                {
                    this.cells.push(cell);
                }
            }
        }

        if(this.containsNextLevel)
        {
            let row = 0;
            let col = 0;
            while(this.bounds[row][col] != cellTypes.open || this.checkSurrounding(row, col, [cellTypes.exit]) != "0000")
            {
                row = Math.floor(Math.random() * this.bounds.length);
                col = Math.floor(Math.random() * this.bounds[row].length);
            }
            for(let cell of this.cells)
            {
                if(cell.id.row == row && cell.id.col == col)
                {
                    // This is the exit to the next level
                    cell.texture = app.loader.resources["./media/assets/tiles/ladder.png"].texture;
                    cell.toNextLevel = true;
                }
            }
        }

        this.setEnemySpawns();
    }
    
    /**
     * Place exits in the proper place within the bounds of this room
     */
    placeExits()
    {
        for(let exitOut of this.exits)
        {
            let row = 0;
            let col = 0;
            let direction;

            let cell;

            if(this.id.row > exitOut.id.row)
            {
                // This exit leads up, place at top of dungeon
                row = 0;
                // Do not choose first or last column to avoid an exit in the corner
                //col = Math.floor(Math.random() * (this.bounds[row].length - 2) + 1);
                while(this.bounds[row + 1][col] != cellTypes.open)
                {
                    col = Math.floor(Math.random() * this.bounds[row].length);
                }
                direction = "up";
            }
            if(this.id.row < exitOut.id.row)
            {
                // This exit leads down, place at bottom of dungeon
                row = this.bounds.length - 1;
                // Do not choose first or last column to avoid an exit in the corner
                //col = Math.floor(Math.random() * (this.bounds[row].length - 2) + 1);
                while(this.bounds[row - 1][col] != cellTypes.open)
                {
                    col = Math.floor(Math.random() * this.bounds[row].length);
                }
                direction = "down";
            }
            if(this.id.col > exitOut.id.col)
            {
                // This exit leads left, place at left of dungeon
                col = 0;
                // Do not choose first or last row to avoid an exit in the corner
                //row = Math.floor(Math.random() * (this.bounds.length - 2) + 1);
                while(this.bounds[row][col + 1] != cellTypes.open)
                {
                    row = Math.floor(Math.random() * this.bounds.length);
                }
                direction = "left";
            }
            if(this.id.col < exitOut.id.col)
            {
                // This exit leads right, place at right of dungeon
                col = this.bounds[this.bounds.length - 1].length - 1;
                // Do not choose first or last row to avoid an exit in the corner
                //row = Math.floor(Math.random() * (this.bounds.length - 2) + 1);
                while(this.bounds[row][col - 1] != cellTypes.open)
                {
                    row = Math.floor(Math.random() * this.bounds.length);
                }
                direction = "right";
            }
            
            let id = {row: row, col: col};
            let xPos = col * this.cellWidth + this.baseCellX;
            let yPos = row * this.cellHeight + this.baseCellY;
            let texture = "./media/assets/tiles/exit-top.png";

            cell = new ExitCell(id, xPos, yPos, this.cellWidth, this.cellHeight, texture, direction, exitOut, this.bounds);
            this.cells.push(cell);

            this.bounds[row][col] = cellTypes.exit;
        }
    }
    /**
     * Place crates in the proper places within the bounds of this room
     */
    placeCrates()
    {
        for(let i = 0; i < this.numCrates; i++)
        {
            let crate;
            let row = 0;
            let col = 0;

            // Find a random cell within the bounds of the room to place a crate
            do
            {
                row = Math.floor(Math.random() * this.bounds.length);
                col = Math.floor(Math.random() * this.bounds[row].length);

                // if(this.containsNextLevel && row == this.bounds.length - 2 && col == this.bounds[i].length - 2)
                // {
                //     row = 0;
                //     col = 0;
                // }
            }
            while(this.checkSurrounding(row, col, [cellTypes.exit]) != "0000" || this.bounds[row][col] != 1);

            let id = {row: row, col: col};
            let xPos = col * this.cellWidth + this.baseCellX;
            let yPos = row * this.cellHeight + this.baseCellY;
            // Place a random object in the crate
            let object;
            if(i < this.numGems)
            {
                object = "gem";
            }
            else if(i < this.numGems + this.numBombs)
            {
                object = "bomb";
            }
            else
            {
                object = "none";
            }

            crate = new Crate(id, xPos, yPos, this.cellWidth, this.cellHeight, object);
            this.crates.push(crate);

            // Make sure this cell doesn't get another crate
            this.bounds[row][col] = cellTypes.crate;
        }
    }
    /**
     * Spawn enemies in the proper places within bounds of this room
     */
    setEnemySpawns()
    {
        for(let i = 0; i < this.numEnemies; i++)
        {
            let enemy;

            // Find a random cell within the bounds of the room to place an enemy
            let row = Math.floor(Math.random() * this.bounds.length);
            let col = Math.floor(Math.random() * this.bounds[row].length);

            while(this.checkSurrounding(row, col, [cellTypes.exit]) != "0000" || this.bounds[row][col] != 1)
            {
                row = Math.floor(Math.random() * this.bounds.length);
                col = Math.floor(Math.random() * this.bounds[row].length);
            }

            let xPos = col * this.cellWidth + this.baseCellX + this.cellWidth / 2;
            let yPos = row * this.cellHeight + this.baseCellY + this.cellHeight / 2;

            enemy = new Enemy(xPos, yPos, this);
            this.enemies.push(enemy);
        }
    }
    /**
     * Determine if the given types of cells are in the area around the given cell
     * @param {number} row The row of the cell to check the surroundings of
     * @param {number} col The column of the cell to check the surroundings of
     * @param {[number]} typesOfCells An array of numbers representing cell types. This method is 
     * checking for these cells in the area surrounding the given cell
     * @returns A "binary" representation of the cell's surroundings, where each digit represents 
     * one of the four cardinal directions from the given cell. A digit with a value of 0 indicates
     * that the given type of cell is not in that direction from the given cell. A 1 represents the 
     * opposite.
     */
    checkSurrounding(row, col, typesOfCells)
    {
        let surrounding = [-1, -1, -1, -1];

        for(let type of typesOfCells)
        {
            // Match top
            if(row != 0 && this.bounds[row - 1][col] == type)
            {
                surrounding[0] = 1;
            }
            else
            {
                if(surrounding[0] != 1)
                {
                    surrounding[0] = 0;
                }
            }
            // Match bottom
            if(row != this.bounds.length - 1 && this.bounds[row + 1][col] == type)
            {
                surrounding[1] = 1;
            }
            else
            {
                if(surrounding[1] != 1)
                {
                    surrounding[1] = 0;
                }
            }
            // Match left
            if(col != 0 && this.bounds[row][col - 1] == type)
            {
                surrounding[2] = 1;
            }
            else
            {
                if(surrounding[2] != 1)
                {
                    surrounding[2] = 0;
                }
            }
            // Match right
            if(col != this.bounds[row].length - 1 && this.bounds[row][col + 1] == type)
            {
                surrounding[3] = 1;
            }
            else
            {
                if(surrounding[3] != 1)
                {
                    surrounding[3] = 0;
                }
            }
        }
        
        return surrounding.toString().replaceAll(",","");
    }
}