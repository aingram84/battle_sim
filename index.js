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

// RPG Class Skeleton
class Character {
    constructor(className, classStartHealth, defenseMod, damageMod, dmgMin, dmgMax, armor, weaponArray, attackArray) {
        this.className = className;
        this.classStartHealth = classStartHealth;
        this.defenseMod = defenseMod;
        this.damageMod = damageMod;
        this.dmgMin = dmgMin;
        this.dmgMax = dmgMax;
        this.armor = armor;
        this.weapon = weaponArray;
        this.attack = attackArray;
    }
    // Weapon Arrays
getWeapon() {
    return this.weapon[getRandomInt(0, this.weapon.length-1)];
}
getAttack() {
    return this.attack[getRandomInt(0, this.attack.length-1)];
}
}




const rogueWeaponArray = ["Dagger", "Sword", "Axe", "Fist Weapon"]
const rogueAttackArray = ["Sinister Strike", "Mutilate", "Backstab", "Eviscerate", "Garrote"]
const warrWeaponArray = ["2H Sword", "Sword", "2h Axe", "Fist Weapon", "2H Mace", "Polearm", "Axe", "Mace"]
const warriorAttackArray = ["Mortal Strike", "Slam", "Execute", "Rampage", "Devastate"]

// RPG Class Creation
const rogue = new Character('Rogue', 75, 1, 1.08, 5, 25, 'leather', rogueWeaponArray, rogueAttackArray);
const warrior = new Character('Warrior', 125, 1.1, .85, 7, 30, 'plate', warrWeaponArray, warriorAttackArray);
// console.log(rogue);
// console.log(warrior);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let random100 = Math.floor(Math.random() * (max - min + 1)) + min;
    return random100;
}
// console.log(getRandomInt(1,101));

function getRogueDmg(min, max) {
    min = rogue.dmgMin;
    max = rogue.dmgMax;
    let rogueDmg = Math.floor(Math.random() * (max - min + 1)) + min;
    rogueDmg = Math.round(rogueDmg * rogue.damageMod);
    return rogueDmg;
}
function getWarrDmg(min, max) {
    min = warrior.dmgMin;
    max = warrior.dmgMax;
    let warrDmg = Math.floor(Math.random() * (max - min + 1)) + min;
    warrDmg = Math.round(warrDmg * warrior.damageMod);
    return warrDmg;
}
console.log(`Rogue Damage: ${getRogueDmg(rogue.dmgMin, rogue.dmgMax)}`);
console.log(`Warrior Damage: ${getWarrDmg(warrior.dmgMin, warrior.dmgMax)}`);



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
console.log(`${rogue.className} used ${rogueWeaponArray[getRandomInt(0, rogueWeaponArray.length-1)]}.
${warrior.className} used ${warrWeaponArray[getRandomInt(0, warrWeaponArray.length-1)]}.`);
console.log(`${rogue.className} used ${rogue.getWeapon()}.`)
console.log(`${warrior.className} used ${warrior.getWeapon()}.`)
// resultLabel(rogue);

function Combat(char1, char2) {
    char1 = rogue;
    char2 = warrior;
}

function resultLabel() {
    let abc = new Character('Warrior', 125, 1.1, .85, 7, 30, 'plate', warrWeaponArray, warriorAttackArray);
    let def = new Character('Rogue', 75, 1, 1.08, 5, 25, 'leather', rogueWeaponArray, rogueAttackArray);
    let className1 = document.querySelectorAll("h2")[0];
    let className2 = document.querySelectorAll("h2")[1];
    let p1 = document.querySelectorAll("div.turnResults1 > p")[0];
    let p2 = document.querySelectorAll("div.turnResults1 > p")[1];
    let p3 = document.querySelectorAll("div.turnResults1 > p")[2];
    let p4 = document.querySelectorAll("div.turnResults2 > p")[0];
    let p5 = document.querySelectorAll("div.turnResults2 > p")[1];
    let p6 = document.querySelectorAll("div.turnResults2 > p")[2];
    let p7 = document.querySelectorAll("div.turnResults1 > p")[3];
    let p8 = document.querySelectorAll("div.turnResults2 > p")[3];
    

    className1.textContent = abc.className;
    className2.textContent = def.className;
    p1.textContent = `Weapon Used: ${abc.getWeapon()}`;
    p7.textContent = `Attack Used: ${abc.getAttack()}`;
    p2.textContent = `Damage Modifier: ${abc.damageMod}`;
    p3.textContent = `Starting Health: ${abc.classStartHealth}`;
    p4.textContent = `Weapon Used: ${def.getWeapon()}`;
    p8.textContent = `Attack Used: ${def.getAttack()}`;
    p5.textContent = `Damage Modifier: ${def.damageMod}`;
    p6.textContent = `Starting Health: ${def.classStartHealth}`;
}