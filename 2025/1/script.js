import fs from 'fs';

const data = fs.readFileSync('./input.txt', { encoding: 'utf8' })
const lines = data.split('\n');


let password = 0;
let actualPassword = 0;
let position = 50;
const max = 99;

for (let line of lines) {
    if (!line) continue;

    let direction = line[0];
    for (let i = 0; i < +line.slice(1); i++) {
        if (position === 0) actualPassword++
        if (position === 99 && direction === "R") {
            position = 0;
            continue;
        }
        if (position === 0 && direction === "L") {
            position = max;
            continue;
        }
        if (direction === "R") {
            position++
        } else position--
    }
    if (position === 0) password++;

}

console.log("The password and solution for the first part is ", password);
console.log("The solution for the second part is ", actualPassword);
