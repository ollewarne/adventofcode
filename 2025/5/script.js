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


let totalIds = 0;
let relevantRanges = ranges.map(x => x.split('-').map(Number))

relevantRanges.sort((a, b) => a[0] - b[0])

let current = relevantRanges[0];

let outputArr = new Set();

for (let i = 1; i < relevantRanges.length; i++) {
    if (current[1] >= relevantRanges[i][0]) {
        current[1] = Math.max(relevantRanges[i][1], current[1]);
        continue;
    }
    outputArr.add(current);
    current = relevantRanges[i];
}
outputArr.add(current);

for (let thing of outputArr) {
    totalIds += (thing[1] - thing[0] + 1);
}

console.log("solution to part one:", freshCount);
console.log("solution to part two:", totalIds);
