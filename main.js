import {get as httpGet} from "http";
import {get as httpsGet} from "https";
import chalk from 'chalk';
import { stdout } from "process";

const table64 = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
];

function fetchImg() {
    let chars = new Array(7).fill(null).map(() => {
        return Math.floor(Math.random()*62);
    }).map((val) => {
        return table64[val];
    });
    httpsGet(`https://i.imgur.com/${chars.join("")}.png`, (res) => {
        if (res.statusCode === 200) {
            stdout.write(chalk.green.bgWhite(`https://i.imgur.com/${chars.join("")}.png\n`));
            return(`https://i.imgur.com/${chars.join("")}.png`);
        }
        else {
            stdout.write(chalk.red.bgBlack(`https://i.imgur.com/${chars.join("")}.png\r`));
            fetchImg();
        }
    });
}

let output = [];
while (output.length < 10) {
    output.push(fetchImg());
}