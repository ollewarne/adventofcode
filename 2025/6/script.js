import fs from 'fs';

const data = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('\n');

let usableArray = [];
let totalNumber = 0;


for (let line of data) {
    if (!line) continue;
    let arr = [];
    let splitLine = line.split(" ");
    for (let n of splitLine) {
        if (n !== "") arr.push(n);
    }
    usableArray.push(arr);
};

for (let i = 0; i < usableArray[0].length + 1; i++) {
    let operator = usableArray[4][i];
    if (!operator) continue;
    if (operator === "*") {
        totalNumber += multi(+usableArray[0][i], +usableArray[1][i], +usableArray[2][i], +usableArray[3][i]);
    } else if (operator === "+") {
        totalNumber += add(+usableArray[0][i], +usableArray[1][i], +usableArray[2][i], +usableArray[3][i]);
    }
};

function add(n1, n2, n3, n4) {
    return n1 + n2 + n3 + n4;
};

function multi(n1, n2, n3, n4) {
    return n1 * n2 * n3 * n4;
};

console.log("solution for part 1:", totalNumber);
