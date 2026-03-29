const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const levelDisplay = document.getElementById('level-count');

let maze, player, goal;
let gridSize = 20; // Number of cells (gridSize x gridSize)
let cellSize = 25;
let level = 1;

canvas.width = gridSize * cellSize;
canvas.height = gridSize * cellSize;

class Cell {
    constructor(r, c) {
        this.r = r;
        this.c = c;
        this.walls = [true, true, true, true]; // Top, Right, Bottom, Left
        this.visited = false;
    }

    draw() {
        let x = this.c * cellSize;
        let y = this.r * cellSize;
        ctx.strokeStyle = "#94a3b8";
        ctx.lineWidth = 2;

        if (this.walls[0]) ctx.strokeRect(x, y, cellSize, 0); // Top
        if (this.walls[1]) ctx.strokeRect(x + cellSize, y, 0, cellSize); // Right
        if (this.walls[2]) ctx.strokeRect(x, y + cellSize, cellSize, 0); // Bottom
        if (this.walls[3]) ctx.strokeRect(x, y, 0, cellSize); // Left
    }
}

function generateMaze() {
    maze = Array.from({ length: gridSize }, (_, r) => 
        Array.from({ length: gridSize }, (_, c) => new Cell(r, c))
    );

    let stack = [];
    let current = maze[0][0];
    current.visited = true;

    while (true) {
        let neighbors = getUnvisitedNeighbors(current);
        if (neighbors.length > 0) {
            let next = neighbors[Math.floor(Math.random() * neighbors.length)];
            removeWalls(current, next);
            stack.push(current);
            next.visited = true;
            current = next;
        } else if (stack.length > 0) {
            current = stack.pop();
        } else {
            break;
        }
    }
    drawMaze();
}

function getUnvisitedNeighbors(cell) {
    let neighbors = [];
    const { r, c } = cell;
    if (r > 0 && !maze[r - 1][c].visited) neighbors.push(maze[r - 1][c]);
    if (r < gridSize - 1 && !maze[r + 1][c].visited) neighbors.push(maze[r + 1][c]);
    if (c > 0 && !maze[r][c - 1].visited) neighbors.push(maze[r][c - 1]);
    if (c < gridSize - 1 && !maze[r][c + 1].visited) neighbors.push(maze[r][c + 1]);
    return neighbors;
}

function removeWalls(a, b) {
    let x = a.c - b.c;
    if (x === 1) { a.walls[3] = false; b.walls[1] = false; }
    else if (x === -1) { a.walls[1] = false; b.walls[3] = false; }
    let y = a.r - b.r;
    if (y === 1) { a.walls[0] = false; b.walls[2] = false; }
    else if (y === -1) { a.walls[2] = false; b.walls[0] = false; }
}

function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    maze.flat().forEach(cell => cell.draw());
    
    // Draw Goal
    ctx.fillStyle = "#10b981";
    ctx.fillRect((gridSize-1)*cellSize + 5, (gridSize-1)*cellSize + 5, cellSize-10, cellSize-10);
    
    drawPlayer();
}

function drawPlayer() {
    ctx.fillStyle = "#38bdf8";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#38bdf8";
    ctx.fillRect(player.c * cellSize + 5, player.r * cellSize + 5, cellSize - 10, cellSize - 10);
    ctx.shadowBlur = 0;
}

function movePlayer(dr, dc) {
    let currentCell = maze[player.r][player.c];
    // Check walls before moving
    if (dr === -1 && currentCell.walls[0]) return;
    if (dr === 1 && currentCell.walls[2]) return;
    if (dc === -1 && currentCell.walls[3]) return;
    if (dc === 1 && currentCell.walls[1]) return;

    player.r += dr;
    player.c += dc;
    drawMaze();

    if (player.r === gridSize - 1 && player.c === gridSize - 1) {
        level++;
        levelDisplay.innerText = level;
        // Increase difficulty slightly every 5 levels
        if(level % 5 === 0 && gridSize < 40) gridSize += 2; 
        resetGame();
    }
}

window.addEventListener('keydown', e => {
    if (e.key === 'w' || e.key === 'ArrowUp') movePlayer(-1, 0);
    if (e.key === 's' || e.key === 'ArrowDown') movePlayer(1, 0);
    if (e.key === 'a' || e.key === 'ArrowLeft') movePlayer(0, -1);
    if (e.key === 'd' || e.key === 'ArrowRight') movePlayer(0, 1);
});

function resetGame() {
    canvas.width = gridSize * cellSize;
    canvas.height = gridSize * cellSize;
    player = { r: 0, c: 0 };
    generateMaze();
}

resetGame();