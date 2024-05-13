#!/usr/bin/node
const fs = require("fs");
const fileName = process.arg[2];

fs.readFile(fileName, { encoding: 'utf-8', flag: 'r' }, (error, fileContent) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log(fileContent);
});
