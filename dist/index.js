"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AliasMethod_1 = require("./lib/AliasMethod");
var blackCount = 0;
var redCount = 0;
var greenCount = 0;
for (var i = 0; i < 100; i++) {
    var p = AliasMethod_1.performAliasMethod();
    switch (p.label) {
        case 'B':
            blackCount++;
            break;
        case 'R':
            redCount++;
            break;
        case 'G':
            greenCount++;
    }
    ;
    console.log("Winning tile was: " + p.label);
}
console.log("\nSUMMARY OF 100 ROLLS");
console.log("Red hits: " + redCount);
console.log("Black hits: " + blackCount);
console.log("Green hits: " + greenCount);
