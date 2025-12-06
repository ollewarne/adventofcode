import fs from 'fs';

const data = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('\n\n');

const ranges = data[0].split('\n');
const ids = data[1].split('\n');

let freshCount = 0;
let idSet = new Set();

for (let range of ranges) {
    let [start, end] = range.split('-').map(Number);
    for (let idNum of ids.map(Number)) {
        if (!idNum) continue;
        //part one
        if (!idSet.has(idNum)) {
            if (idNum >= start && idNum <= end) {
                freshCount++
                idSet.add(idNum);
            }
        }
    }
}

// save relevant ranges only
let totalIds = 0;
let relevantRanges = [];
for (let id of ids) {
    let idNum = parseInt(id);
    for (let range of ranges) {
        let splitRange = range.split('-');
        let start = +splitRange[0];
        let end = +splitRange[1];
        if (idNum >= start && idNum <= end && !relevantRanges.includes(range)) {
            relevantRanges.push(range);
        }
    }
}

relevantRanges = relevantRanges.map(range => range.split("-").map(Number))

for (let range of relevantRanges) {

    for (let i = 0; i < relevantRanges.length; i++) {
        if (range[0] <= relevantRanges[i][0] && range[1] >= relevantRanges[i][1]) {
            relevantRanges[i] = range;
            continue;
        }

        if (range[0] < relevantRanges[i][0] && range[1] < relevantRanges[i][1] && range[1] > relevantRanges[i][0]) {
            relevantRanges[i][0] = range[0];
            range[1] = relevantRanges[i][1];
            continue;
        }

        if (range[0] > relevantRanges[i][0] && range[1] > relevantRanges[i][1] && range[0] < relevantRanges[i][1]) {
            range[0] = relevantRanges[i][0];
            relevantRanges[i][1] = range[1];
            continue;
        }

        if (range[1] === relevantRanges[i][0]) {
            range[1] = relevantRanges[i][1];
            continue;
        }

        if (range[0] === relevantRanges[i][1]) {
            range[0] = relevantRanges[i][0];
            continue;
        }
    }
}

let testSet = new Set();
let outputArr = [];

for (let i of relevantRanges) {
    let key = JSON.stringify(i);
    if (!testSet.has(key)) {
        testSet.add(key);
        outputArr.push(i);
    }
}

for (let thing of outputArr) {
    totalIds += (thing[1] - thing[0] + 1);
}

console.log("solution to part one:", freshCount);
console.log("solution to part two:", totalIds);
