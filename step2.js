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

if (process.argv[2].includes("http")) {
    webCat(process.argv[2]);
}
else {
    cat(process.argv[2]);
}