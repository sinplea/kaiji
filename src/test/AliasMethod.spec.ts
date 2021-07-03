import { Probability, performAliasMethod } from '../lib/AliasMethod';
import filter from 'lodash/filter';

/**
 * When testing the AliasMethod, it's best to consider the
 * business goals of it's functions.
 * 
 * When dealing with probabilities there's a chance our tests may at one point fail.
 * However, it should be preventable if we take advantage of time restrictions
 * and number of players playing
 */
describe('AliasMethod.ts', () => {
    let processingWallet = 1000;

    // This is just the average amount of clients connecting to the site
    // over a 24-hour period
    const AVG_PLAYER_COUNT = 100;
    // Lets assume a portion of our total player base is afk 50% of the time
    // and is not betting during those times
    const ACTIVE_PLAYERS = AVG_PLAYER_COUNT * 0.5;

    const ROLLS_PER_MIN = 0.5; // So there is 1 roll every 2 min. This is likely to change
    const ROLLS_PER_HOUR = ROLLS_PER_MIN * 60; // 30 rolls every hour
    const DAILY_ROLLS = ACTIVE_PLAYERS * ROLLS_PER_HOUR * 8 // Assume only 4 hours a day are users active on the site 4 * 2 = 2 days

    const MIN_BET = 1;

    // Although we expect some of our users to be afk while the wheel spins
    // We balance table limits around the worst case scenerio: everyone on the site betting
    // on green.

    // Goal is to not be in debt.

    type Roll = {
        bets: Array<Bet>
    }

    type Bet = {
        color: string,
        amount: number,
    }

    test(`House can cover the players after two days with ${AVG_PLAYER_COUNT} average players on the site`, () => {
        let tableLimit = 25;

        const rolls = _genPlayerRolls(DAILY_ROLLS, tableLimit);

        let amountOwedToPlayer = 0;
        let amountHouseWon = 0;

        rolls.forEach(roll => {
            const spin: Probability = performAliasMethod();
            const winningBet = filter(roll.bets, (bet) => { return bet.color === spin.label })
            const losingBets = filter(roll.bets, (bet) => { return bet.color !== spin.label })

            if (winningBet.length > 0) {
                expect(winningBet.length === 1).toBe(true);

                switch (spin.label) {
                    case "G":
                        if (winningBet[0].color === spin.label) {
                            amountOwedToPlayer += winningBet[0].amount * 12;
                            break;
                        }
                    case "R":
                        if (winningBet[0].color === spin.label) {
                            amountOwedToPlayer += winningBet[0].amount;
                        }
                        break;
                    case "B":
                        if (winningBet[0].color === spin.label) {
                            amountOwedToPlayer += winningBet[0].amount;
                        }
                        break;
                }
            }

            // Only runs if losingBets is not empty;
            losingBets.forEach(bet => {
                amountHouseWon += bet.amount;
            })
        });

        console.debug(`
            Initial Coverage: $${processingWallet}
            Table Limit: $${tableLimit}
            # Active Players: ${ACTIVE_PLAYERS}
            # ROLLS ${DAILY_ROLLS}
            House Earnings: $${amountHouseWon}
            House Balance: $${amountHouseWon + processingWallet}
            Players Earning: -$${amountOwedToPlayer}
            House Profits: $${amountHouseWon - amountOwedToPlayer}`)

        expect(amountHouseWon + processingWallet > amountOwedToPlayer).toBe(true);
    })

    // Perhaps it's a little naive to expect a player to essentially pick a random
    // selection each spin. Regardless no matter the position of the player
    // the house maintains it's edge.
    function _genPlayerRolls(n: number, limit: number): Array<Roll> {
        let rolls: Array<Roll> = [];

        for (let i = 0; i < n; i++) {
            let totalBet = 0;

            let roll: Roll = {
                bets: [],
            }
            // Did the person bet on color x, yes or no?
            let x = Math.floor(Math.random() * 2);
            let y = Math.floor(Math.random() * 2);
            let z = Math.floor(Math.random() * 2);

            // Determine our bet on each possible color.
            // In our case we only have 3 possible outcomes R,B,and G
            // If we are betting on multiple colors make sure that we
            // are tracking the total bet so that it doesn't go over the table limit
            if (x === 0 && totalBet < limit) {
                const amount = Math.floor(Math.random() * (limit - totalBet)) + MIN_BET;
                const bet = {
                    amount,
                    color: 'R',
                }

                totalBet += amount;

                roll.bets.push(bet)
            }

            if (y === 0 && totalBet < limit) {
                const amount = Math.floor(Math.random() * (limit - totalBet)) + MIN_BET;
                const bet = {
                    amount,
                    color: 'B',
                }

                roll.bets.push(bet)
            }

            if (z === 0 && totalBet < limit) {
                const amount = Math.floor(Math.random() * (limit - totalBet)) + MIN_BET;
                const bet = {
                    amount,
                    color: 'G',
                }

                roll.bets.push(bet)
            }

            rolls.push(roll);
        }

        return rolls;
    }
})