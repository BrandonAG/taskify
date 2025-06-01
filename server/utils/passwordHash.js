require('dotenv').config();
const http = require('http');

const passwordHash = (reqBody) => {
    // wait for http response
    return new Promise((resolve) => {
        // send http POST request
        let data;
        const req = http.request({
            host: process.env.HASH_URL || 'localhost',
            port: process.env.HASH_PORT || 3001,
            path: '/hash',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(reqBody)
            }
        }, (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                data = chunk;
                console.log(`Credentials Match: ${chunk}`);
            });
            res.on('end', () => {
                resolve(JSON.parse(data));
            })
        });

        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
        });

        // Write data to request body
        req.write(reqBody);
        req.end();
    });
}

module.exports = passwordHash;