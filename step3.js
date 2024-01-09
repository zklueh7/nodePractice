const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
            console.log(err);
            // kill the process and tell the shell it errored
            process.exit(1);
        }
        console.log(data);
    })
}

async function webCat(url) {
    try {
        let response = await axios.get(url);
        console.log(response.data)
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
    
}

async function webCatWrite(url, newFile) {
    try {
        let response = await axios.get(url);
        fs.writeFile(`./${newFile}`, response.data, "utf8", function(err) {
            if(err) {
                console.log(err);
                process.exit(1);
            }
            console.log("success");
        });
    }
    catch (err) {
        console.log(err);
    }
}

function catWrite(path, newFile) {
    fs.readFile(path, 'utf8', (err, data) => {
        if(err) {
            console.log(err);
            // kill the process and tell the shell it errored
            process.exit(1);
        }
       fs.writeFile(`./${newFile}`, data, "utf8", function(err) {
        if(err) {
            console.log(err);
            process.exit(1);
        }
        console.log("success");
        });
       });
    }

if (process.argv[2].includes("--out")) {
    if (process.argv[3].includes("http")) {
        webCatWrite(process.argv[3], process.argv[4]);
    }
    else {
        catWrite(process.argv[3], process.argv[4]);
    } 
}
else if (process.argv[2].includes("http")) {
    webCat(process.argv[2]);
}
else {
    cat(process.argv[2]);
}