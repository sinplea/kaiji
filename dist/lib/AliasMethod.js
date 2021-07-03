"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.performAliasMethod = void 0;
var keyBy_1 = __importDefault(require("lodash/keyBy"));
var util_1 = __importDefault(require("util"));
var mathjs_1 = require("mathjs");
// 1. Public Functions
function performAliasMethod() {
    var totalProbabilites = 3;
    var _a = _initAliasMethod(totalProbabilites), probs = _a.probs, alias = _a.alias;
    var side = _simulateFairDie(totalProbabilites);
    var coin = _flipBiasedCoin(probs[side].val);
    if (coin === 'heads') {
        console.log;
        return probs[side];
    }
    else {
        return alias[side];
    }
}
exports.performAliasMethod = performAliasMethod;
// 2. Private Helpers
function _flipBiasedCoin(probability) {
    console.log("Probability of coin flip landing heads: " + probability);
    var x = Math.random() * 1;
    console.log("x" + x);
    if (x < probability) {
        return "heads";
    }
    else {
        return "tails";
    }
}
function _simulateFairDie(n) {
    return Math.floor(Math.random() * (n));
}
function _initAliasMethod(totalProbabilitesCount) {
    var _a = _generateProbabilities(), arr = _a.arr, map = _a.map;
    var alias = [];
    var probs = [];
    var small = [];
    var large = [];
    console.log("Normalizing probabilities and filling worklists...");
    arr.forEach(function (p) {
        p.val = mathjs_1.multiply(p.val, totalProbabilitesCount);
        var comparison = mathjs_1.compare(p.val, 1);
        // Fill large and small worklists
        if (comparison.valueOf() === -1) {
            small.push(p.label);
        }
        else {
            large.push(p.label);
        }
    });
    console.log("Probabilities are normalizing...");
    console.log("Worklists after filling...");
    while (small.length > 0 && large.length > 0) {
        var sLabel = small.pop();
        var gLabel = large.pop();
        if (sLabel) {
            var p = map[sLabel];
            probs.push(p);
        }
        if (gLabel) {
            var p = map[gLabel];
            alias.push(p);
            if (sLabel) {
                var gRef = map[gLabel].val;
                var sRef = map[sLabel].val;
                map[gLabel].val = mathjs_1.subtract(mathjs_1.add(sRef, gRef), 1);
            }
            if (mathjs_1.compare(map[gLabel].val, 1).valueOf() === -1) {
                small.push(gLabel);
            }
            else {
                large.push(gLabel);
            }
        }
    }
    while (large.length > 0) {
        var gLabel = large.pop();
        if (gLabel) {
            map[gLabel].val = mathjs_1.fraction(1, 1);
            probs.push(map[gLabel]);
        }
    }
    while (small.length > 0) {
        var sLabel = small.pop();
        if (sLabel) {
            map[sLabel].val = mathjs_1.fraction(1, 1);
            alias.push(map[sLabel]);
        }
    }
    return {
        probs: probs,
        alias: alias,
    };
}
function _generateProbabilities() {
    var red = {
        label: 'R',
        val: mathjs_1.fraction(47, 100),
    };
    var black = {
        label: 'B',
        val: mathjs_1.fraction(47, 100),
    };
    var green = {
        label: 'G',
        val: mathjs_1.fraction(3, 50),
    };
    var arr = [
        red,
        black,
        green
    ];
    var map = keyBy_1.default(arr, function (p) {
        return p.label;
    });
    console.log("Generated a list of of probabilities: " + util_1.default.inspect(arr) + "\n");
    return { arr: arr, map: map };
}
