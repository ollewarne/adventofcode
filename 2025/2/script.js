import fs from 'fs';

const idRange = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split(",").map(s => s.trim());;

let invalidIdTotal = 0;
let secondTotal = 0;

for (let id of idRange) {
    let [start, end] = id.split("-").map(Number);
    for (let i = start; i <= end; i++) {
        let str = i.toString();
        let len = str.length;
        let half = str.slice(0, len / 2);
        let strDouble = half + half;
        if (strDouble === str) {
            invalidIdTotal += i;
        }

        if (new Set(str.split("")).size === 1 && len > 1) {
            secondTotal += i;
            continue;
        }

        for (let j = 2; j <= len / 2; j++) {
            if (str.length % j !== 0) continue;

            if (str.slice(0, j).repeat(str.length / j) === str) {
                secondTotal += i;
                break;
            }
        }
    }
}


console.log("solution to the first part is: ", invalidIdTotal);
console.log("solution to the second part is: ", secondTotal);
