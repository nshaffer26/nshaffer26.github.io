// Hard-code the possible quadrants for each room
let dungeonRoomConfig1 = {
    topL:
    [[
        [0, 0, 0, 0],
        [0, 1, 1, 1],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ],
    [
        [0, 0, 0, 0],
        [0, 1, 1, 1],
        [0, 1, 1, 0],
        [0, 1, 0, 0]
    ],
    [
        [0, 0, 0, 0],
        [0, 1, 1, 1],
        [0, 1, 1, 1],
        [0, 1, 1, 0]
    ],
    [
        [0, 0, 0, 0],
        [0, 1, 1, 1],
        [0, 1, 1, 1],
        [0, 1, 1, 1]
    ]],
    topR:
    [[
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]
    ],
    [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 0]
    ],
    [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [1, 1, 1, 0],
        [0, 1, 1, 0]
    ],
    [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [1, 1, 1, 0],
        [1, 1, 1, 0]    
    ]],
    botL:
    [[
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 1],
        [0, 0, 0, 0]
    ],
    [
        [0, 1, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 1],
        [0, 0, 0, 0]
    ],
    [
        [0, 1, 1, 0],
        [0, 1, 1, 1],
        [0, 1, 1, 1],
        [0, 0, 0, 0]
    ],
    [
        [0, 1, 1, 1],
        [0, 1, 1, 1],
        [0, 1, 1, 1],
        [0, 0, 0, 0]    
    ]],
    botR:
    [[
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 0, 1, 0],
        [0, 1, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0]
    ],
    [
        [0, 1, 1, 0],
        [1, 1, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0]
    ],
    [
        [1, 1, 1, 0],
        [1, 1, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
    ]]
};
let dungeonRoomConfig2 = {
    topL:
    [[
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1],
        [0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1],
        [0, 1, 1, 1, 1],
        [0, 1, 1, 0, 0],
        [0, 1, 1, 0, 0]
    ],
    // [
    //     [0, 0, 0, 0],
    //     [0, 1, 1, 1],
    //     [0, 1, 1, 0],
    //     [0, 1, 0, 0]
    // ],
    // [
    //     [0, 0, 0, 0],
    //     [0, 1, 1, 1],
    //     [0, 1, 1, 1],
    //     [0, 1, 1, 0]
    // ],
    [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1],
        [0, 1, 1, 1, 1],
        [0, 1, 1, 1, 1],
        [0, 1, 1, 1, 1]
    ]],
    topR:
    [[
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 0],
        [0, 0, 1, 1, 0],
        [0, 0, 1, 1, 0]
    ],
    // [
    //     [0, 0, 0, 0],
    //     [1, 1, 1, 0],
    //     [0, 1, 1, 0],
    //     [0, 0, 1, 0]
    // ],
    // [
    //     [0, 0, 0, 0],
    //     [1, 1, 1, 0],
    //     [1, 1, 1, 0],
    //     [0, 1, 1, 0]
    // ],
    [
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 0]
    ]],
    botL:
    [[
        [0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 1, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 1, 1, 1],
        [0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0]
    ],
    // [
    //     [0, 1, 0, 0],
    //     [0, 1, 1, 0],
    //     [0, 1, 1, 1],
    //     [0, 0, 0, 0]
    // ],
    // [
    //     [0, 1, 1, 0],
    //     [0, 1, 1, 1],
    //     [0, 1, 1, 1],
    //     [0, 0, 0, 0]
    // ],
    [
        [0, 1, 1, 1, 1],
        [0, 1, 1, 1, 1],
        [0, 1, 1, 1, 1],
        [0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0]    
    ]],
    botR:
    [[
        [0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0],
        [1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 1, 1, 0],
        [0, 0, 1, 1, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    // [
    //     [0, 0, 1, 0],
    //     [0, 1, 1, 0],
    //     [1, 1, 1, 0],
    //     [0, 0, 0, 0]
    // ],
    // [
    //     [0, 1, 1, 0],
    //     [1, 1, 1, 0],
    //     [1, 1, 1, 0],
    //     [0, 0, 0, 0]
    // ],
    [
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 0],
        [1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
    ]]
};
let dungeonRoomConfig = {
    topL:
    [[
        [0, 0, 0, 0],
        [0, 1, 1, 1],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ],
    [
        [0, 0, 0, 0],
        [0, 1, 1, 1],
        [0, 1, 1, 1],
        [0, 1, 1, 1]
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 1, 1, 1]
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 1, 1],
        [0, 1, 1, 1],
        [0, 1, 1, 1]
    ]],
    topR:
    [[
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]
    ],
    [
        [0, 0, 0, 0],
        [1, 1, 1, 0],
        [1, 1, 1, 0],
        [1, 1, 1, 0]    
    ],
    [
        [0, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 1, 1, 0]    
    ],
    [
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [1, 1, 1, 0],
        [1, 1, 1, 0]    
    ]],
    botL:
    [[
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 1, 1],
        [0, 0, 0, 0]
    ],
    [
        [0, 1, 1, 1],
        [0, 1, 1, 1],
        [0, 1, 1, 1],
        [0, 0, 0, 0]    
    ],
    [
        [0, 1, 1, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 0]    
    ],
    [
        [0, 1, 1, 1],
        [0, 1, 1, 1],
        [0, 0, 1, 1],
        [0, 0, 0, 0]    
    ]],
    botR:
    [[
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0]
    ],
    [
        [1, 1, 1, 0],
        [1, 1, 1, 0],
        [1, 1, 1, 0],
        [0, 0, 0, 0],
    ],
    [
        [1, 1, 1, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    [
        [1, 1, 1, 0],
        [1, 1, 1, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
    ]]
};

// The different types of cells that can be found in a room
let cellTypes =
{
    wall: 0,
    open: 1,
    crate: 2,
    exit: 3
}

/**
 * Uses hard-coded values for the top-left, top-right, bottom-left, and bottom-right quadrants 
 * of a room to create a semi-random layout for the room.
 * @returns A randomized layout for a dungeon room
 */
function configureDungeonRoom()
{
    let dungeonRoom = [];
    
    // Assign quadrants
    let topL = assignQuadrant("topL");
    let topR = assignQuadrant("topR");
    let botL = assignQuadrant("botL");
    let botR = assignQuadrant("botR");

    // Combine
    let left = topL.concat(botL);
    let right = topR.concat(botR);
    
    for(let i = 0; i < left.length; i++)
    {
        dungeonRoom.push(left[i].concat(right[i]));
    }

    return dungeonRoom;
}
/**
 * Pulls out a random layout from the dungeonRoomConfig based on the given quadrant
 * @param {string} quadrant The key associated with the dungeonRoomConfig object
 * @returns A random array from the dungeonRoomConfig object using the given key
 */
function assignQuadrant(quadrant)
{
    let index = Math.floor(Math.random() * dungeonRoomConfig[quadrant].length);

    return dungeonRoomConfig[quadrant][index];
}

/**
 * Find a unit vector that points in the direction of the given coordinates
 * @param {number} x The x-coordinate to which to point this vector
 * @param {number} y The y coordinate to which to point this vector
 * @returns A unit vector based on the given x and y coordinates
 */
function getUnitVector(x, y)
{
    let length = Math.sqrt(x * x + y * y);
    if(length == 0)
    {
        x = 1; // Point right
        y = 0;
        length = 1;
    }
    else
    {
        x /= length;
        y /= length;
    }
    return {x: x, y: y};
}
/**
 * Get a unit vector pointing in a random direction
 * @returns A random unit vector
 */
function getRandomUnitVector()
{
    let x = getRandom(-1, 1);
    let y = getRandom(-1, 1);

    return getUnitVector(x, y)
}
/**
 * Get a random number from a given minimum value up to but not including a given maximum value
 * @param {number} min The minimum value for this random number
 * @param {number} max The maximum value for this random number (exclusive)
 * @returns A random number between min (inclusive) and max (exclusive)
 */
function getRandom(min, max)
{
    return Math.random() * (max - min) + min;
}

/**
 * Determine if two PixiJS entities are colliding
 * @param {*} a The first entity to compare
 * @param {*} b The second entity to compare
 * @returns true if the given entities are colliding, false otherwise
 */
function rectsIntersect(a, b)
{
    let ab = a.getBounds();
    let bb = b.getBounds();

    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}