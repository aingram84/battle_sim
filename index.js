// import d20 from 'd20'

var d20 = {

    /**
     * Roll a number of dice and return the result.
     *
     * @param dice Type of dice to roll, can be represented in various formats:
     *               - a number (6, 12, 42)
     *               - dice syntax (d20, 4d6, 2d8+2)
     * @param verbose Whether or not all dice rolls should be returned as an array
     * @return Number|Array
     */
    roll: function (dice, verbose) {
        var result = d20.verboseRoll(dice),
            num = 0;

        if (verbose) {
            return result;
        } else {
            for (var i in result) {
                num += result[i];
            }

            return num;
        }
    },

    /**
     * Roll a number of dice and return the result as an array.
     *
     * @param dice Type of dice to roll, can be represented in various formats:
     *               - a number (6, 12, 42)
     *               - dice syntax (d20, 4d6, 2d8+2)
     * @return Array
     */
    verboseRoll: function (dice) {
        var amount = 1,
            mod = 0,
            results = [],
            match,
            num,
            modifiers;

        if (!dice) {
            throw new Error('Missing dice parameter.');
        }

        if (typeof dice == 'string') {
            match = dice.match(/^\s*(\d+)?\s*d\s*(\d+)\s*(.*?)\s*$/);
            if (match) {
                if (match[1]) {
                    amount = parseInt(match[1]);
                }
                if (match[2]) {
                    dice = parseInt(match[2]);
                }
                if (match[3]) {
                    modifiers = match[3].match(/([+-]\s*\d+)/g);
                    for (var i = 0; i < modifiers.length; i++) {
                        mod += parseInt(modifiers[i].replace(/\s/g, ''));
                    }
                }
            } else {
                parseInt(dice);
            }
        }

        if (isNaN(dice)) {
            return [];
        }

        for (var i = 0; i < amount; i++) {
            /* We dont want to ruin verbose, so we dont skip the for loop */
            if (dice !== 0) {
                num = Math.floor(Math.random() * dice + 1);
            } else {
                num = 0;
            }
            results.push(num);
        }

        results = results.sort(function (a, b) {
            return a - b;
        });
        if (mod != 0) {
            results.push(mod);
        }

        return results;
    }
};

if (typeof window != 'undefined') {
    window.d20 = d20;
} else if (typeof exports != 'undefined') {
    for (var k in d20) {
        exports[k] = d20[k];
    }
};

// console.log(d20.roll("4d6"));

let attackRoll = d20.roll("4d6");
let defenseRoll = d20.roll("4d6");
let attackDamage = attackRoll - defenseRoll;
let retalDamage = defenseRoll - attackRoll;
let attackerStartHealth = 100;
let attackerRemHealth = 100;
let defenderStartHealth = 100;
let defenderRemHealth = 100;
console.log(`Attacker Roll: ${attackRoll}`);
console.log(`Defender Roll: ${defenseRoll}`);
if (attackRoll === defenseRoll) {
    console.log(`Tied with roll of ${attackRoll}`);
} else if 
    (attackRoll > defenseRoll) {
    defenderRemHealth = defenderStartHealth - attackDamage;
    console.log(`Attacker wins ${attackRoll} to ${defenseRoll}, ${attackDamage} damage dealt.
    Defender health remaining: ${defenderRemHealth}`);
} else {
    attackerRemHealth = attackerStartHealth - retalDamage;
console.log(`Defender wins ${defenseRoll} to ${attackRoll}, ${retalDamage} counter damage dealt.
    Attacker health remaining: ${attackerRemHealth}`);
}