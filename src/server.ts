import { performAliasMethod } from './lib/AliasMethod';

let blackCount = 0;
let redCount = 0;
let greenCount = 0;

for (let i = 0; i < 100; i++) {
    const p = performAliasMethod();

    switch (p.label) {
        case 'B':
            blackCount++;
            break;
        case 'R':
            redCount++;
            break;
        case 'G':
            greenCount++;
    };

    console.log(`Winning tile was: ${p.label}`);
}

console.log(`\nSUMMARY OF 100 ROLLS`)
console.log(`Red hits: ${redCount}`)
console.log(`Black hits: ${blackCount}`)
console.log(`Green hits: ${greenCount}`);