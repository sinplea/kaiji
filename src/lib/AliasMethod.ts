import keyBy from 'lodash/keyBy';
import util from 'util';
import { Fraction, fraction, add, subtract, multiply, compare } from 'mathjs';

export type Probability = {
    label: string,
    val: any,
};

// 1. Public Functions

export function performAliasMethod() {
    const totalProbabilites = 3;
    const { probs, alias } = _initAliasMethod(totalProbabilites);
    const side = _simulateFairDie(totalProbabilites);
    const coin = _flipBiasedCoin(probs[side].val);

    if (coin === 'heads') {
        console.log
        return probs[side];
    } else {
        return alias[side];
    }
}

// 2. Private Helpers

function _flipBiasedCoin(probability: any): string {
    console.log(`Probability of coin flip landing heads: ${probability}`)
    let x = Math.random() * 1;
    console.log(`x${x}`)

    if (x < probability) {
        return "heads";
    } else {
        return "tails";
    }
}

function _simulateFairDie(n: number): number {
    return Math.floor(Math.random() * (n));
}

function _initAliasMethod(totalProbabilitesCount: number): {
    probs: Array<Probability>,
    alias: Array<Probability>
} {
    let { arr, map } = _generateProbabilities()

    let alias: Array<Probability> = []
    let probs: Array<Probability> = []

    let small: Array<string> = [];
    let large: Array<string> = [];

    console.log(`Normalizing probabilities and filling worklists...`);
    arr.forEach(p => {
        p.val = multiply(p.val, totalProbabilitesCount);

        const comparison = compare(p.val, 1);

        // Fill large and small worklists
        if (comparison.valueOf() === -1) {
            small.push(p.label);
        } else {
            large.push(p.label);
        }
    })

    console.log(`Probabilities are normalizing...`);
    console.log(`Worklists after filling...`)

    while (small.length > 0 && large.length > 0) {
        const sLabel: string | undefined = small.pop();
        const gLabel: string | undefined = large.pop();

        if (sLabel) {
            let p = map[sLabel];
            probs.push(p);
        }

        if (gLabel) {
            let p = map[gLabel];
            alias.push(p);

            if (sLabel) {
                let gRef = map[gLabel].val;
                let sRef = map[sLabel].val;
                map[gLabel].val = subtract(add(sRef, gRef), 1);
            }

            if (compare(map[gLabel].val, 1).valueOf() === -1) {
                small.push(gLabel);
            } else {
                large.push(gLabel)
            }
        }
    }

    while (large.length > 0) {
        const gLabel: string | undefined = large.pop();

        if (gLabel) {
            map[gLabel].val = fraction(1, 1);
            probs.push(map[gLabel])
        }
    }

    while (small.length > 0) {
        const sLabel: string | undefined = small.pop();

        if (sLabel) {
            map[sLabel].val = fraction(1, 1);
            alias.push(map[sLabel]);
        }

    }
    return {
        probs,
        alias,
    };

}

function _generateProbabilities(): { arr: Array<Probability>, map: Record<string, Probability> } {
    let red: Probability = {
        label: 'R',
        val: fraction(47, 100),
    }

    let black: Probability = {
        label: 'B',
        val: fraction(47, 100),
    };

    let green: Probability = {
        label: 'G',
        val: fraction(3, 50),
    };

    let arr = [
        red,
        black,
        green
    ]

    let map = keyBy(arr, (p: Probability) => {
        return p.label;
    });

    console.log(`Generated a list of of probabilities: ${util.inspect(arr)}\n`);

    return { arr, map };
}