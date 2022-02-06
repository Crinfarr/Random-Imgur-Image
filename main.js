import {get as httpGet } from "http";
import {get as httpsGet } from "https";
import chalk from 'chalk';
import { stdout } from "process";
import { writeFileSync } from "fs";

const table64 = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
];

let output = [];
let result = [];

function fetchImg(i) {
    let chars = new Array(7).fill(null).map(() => {
        return Math.floor(Math.random() * 62);
    }).map((val) => {
        return table64[val];
    });
    return new Promise((resolve, _) => {
        httpsGet(`https://i.imgur.com/${chars.join("")}.png`, (res) => {
            if (res.statusCode === 200) {
                output[i] = chalk.green("🗸");
                // stdout.write(`https://i.imgur.com/${chars.join("")}.png\n`);
                stdout.write(`| ${output.join(" | ")} |\r`);
                result.push(`https://i.imgur.com/${chars.join("")}.png`);
                resolve(`https://i.imgur.com/${chars.join("")}.png`);
            } else {
                stdout.write(`| ${output.join(" | ")} |\r`);
                resolve(fetchImg(i));
            }
        });
    });
}

process.on('beforeExit', () => {
    writeFileSync(`output.json`, JSON.stringify(result, null, 4));
});

async function getMany(n) {
    for (let i = 0; i < n; i++) {
        stdout.write(`${i}\r`);
        fetchImg(i);
        output.push(chalk.red('✗'));
    }
    // console.log(output.map((v) => {return typeof v !== 'object';}));
    // while (output.map((v) => {return typeof v !== "object";}).includes(false)) {
    //     // stdout.write(output.map((v, _) => {
    //     //     return (typeof v !== "object")?chalk.green("🗸"):chalk.red("✗");
    //     // })+"   "+new Date().toLocaleString()+"                                  \r");
    //     stdout.write(output.toString()+"\r");
    // }
}
getMany(parseInt(process.argv[2]));