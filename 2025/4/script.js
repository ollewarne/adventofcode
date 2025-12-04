import fs from 'fs';

const data = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('\n');

let arr = [];

for (let line of data) {
    if (!line) continue;
    arr.push(line.split(""));
}

const rowLength = arr[0].length - 1;
const colLength = arr.length - 1;
const paper = "@";

const allDirs = [
    [0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, -1], [-1, 1]
]

const borderTopDirs = [
    [0, 1], [0, -1], [1, 0], [1, 1], [1, -1]
]

const borderBottomDirs = [
    [0, 1], [0, -1], [-1, 0], [-1, -1], [-1, 1]
]

const borderLeftDirs = [
    [0, 1], [1, 0], [-1, 0], [1, 1], [-1, 1]
]

const borderRightDirs = [
    [0, -1], [1, 0], [-1, 0], [1, -1], [-1, -1]
]

function checkDirs(row, column, rowLen, colLen, array) {
    let count = 0;
    if ((row === 0 && column === 0) || (row === 0 && column === rowLen) || (row === colLen && column === 0) || (row === colLen && column === rowLen)) return count;

    if (row === 0) {
        for (let dir of borderTopDirs) {
            if (array[row + dir[0]][column + dir[1]] === paper) count++;
        }
    } else if (row === colLen) {
        for (let dir of borderBottomDirs) {
            if (array[row + dir[0]][column + dir[1]] === paper) count++;
        }
    } else if (column === 0) {
        for (let dir of borderLeftDirs) {
            if (array[row + dir[0]][column + dir[1]] === paper) count++;
        }
    } else if (column === rowLen) {
        for (let dir of borderRightDirs) {
            if (array[row + dir[0]][column + dir[1]] === paper) count++;
        }
    } else {
        for (let dir of allDirs) {
            if (array[row + dir[0]][column + dir[1]] === paper) count++;
        }
    }
    return count;
}

// Part 1
let onePassPaperGrabbed = 0;
for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === paper) {
            if (checkDirs(i, j, rowLength, colLength, arr) < 4) onePassPaperGrabbed++
        }
    }
}

// Part 2
function grabPaperRolls(array) {
    let arrayCopy = array.map(row => [...row]);;
    let paperGrabbed = 0;

    for (let i = 0; i < arrayCopy.length; i++) {
        for (let j = 0; j < arrayCopy[i].length; j++) {
            if (arrayCopy[i][j] === paper) {
                if (checkDirs(i, j, rowLength, colLength, arrayCopy) < 4) {
                    paperGrabbed++
                    arrayCopy[i][j] = "x";
                }
            }
        }
    }
    if (paperGrabbed === 0) return 0;
    return paperGrabbed + grabPaperRolls(arrayCopy);
}
let multiPassPaperGrabbed = grabPaperRolls(arr);


console.log("Solution for part 1", onePassPaperGrabbed);
console.log("Solution for part 2", multiPassPaperGrabbed);
