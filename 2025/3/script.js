import fs from 'fs';

const data = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('\n');

let totalOutput = 0;
let partTwoResult = 0;

for (let line of data) {
    if (!line) continue;

    let largestNum = 0;
    let largestIndex = 0;
    let secondLargest = 0;

    for (let n of line) {
        if (line.indexOf(n) === line.length - 1) break;
        if (+n > largestNum) {
            largestNum = +n;
            largestIndex = line.indexOf(n);
        }
    }

    for (let n2 of line.slice(largestIndex + 1)) {
        if (n2 > secondLargest) {
            secondLargest = n2;
        }
    }

    totalOutput += parseInt(`${largestNum}${secondLargest}`);

    let numberTarget = 12;
    partTwoResult += findLargest(line, numberTarget);
}

// find the largest number in the earliest position in the string
// add that to the result
// from after the index of the first largest we look for the next largest within the limit
// if we find the next largest we add that to the result and continue until we have picked 12 numbers
// takeaway on how to think: The best start is always the first largest number that is not within the last 11 numbers
// if the only number 9 in the entire larger number is on position 12 from the end. That will always be the largest number possible to start from.

function findLargest(str, target) {
    let result = ""
    let start = 0;
    let len = str.length;

    for (let i = 0; i < target; i++) {

        let stillNeededNumbers = target - (i + 1);
        let searchDepth = len - stillNeededNumbers;

        let largestNum = "-1";
        let numIndex = start;

        for (let j = start; j < searchDepth; j++) {
            if (str[j] > largestNum) {
                largestNum = str[j];
                numIndex = j;
            }
        }

        result += largestNum;
        start = numIndex + 1;
    }

    return parseInt(result);
}

console.log("the solution for the first part is", totalOutput);

console.log("the solution for the second part is", partTwoResult);
