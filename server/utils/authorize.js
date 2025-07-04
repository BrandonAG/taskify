require('dotenv').config();
const http = require('http');

const checkProjectAccess = (reqBody) => {
    // wait for http response
    return new Promise((resolve) => {
        // send http GET request
        let data;
        const req = http.request({
            host: process.env.VERIFY_URL || 'localhost',
            port: process.env.VERIFY_PORT || 3001,
            path: '/proj-access',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(JSON.stringify(reqBody))
            }
        }, (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                data = chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(data));
            })
        });

        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
        });

        // Write data to request body
        req.write(JSON.stringify(reqBody));
        req.end();
    });
}

const checkProjectPrivilege = (reqBody) => {
    // wait for http response
    return new Promise((resolve) => {
        // send http GET request
        let data;
        const req = http.request({
            host: process.env.VERIFY_URL || 'localhost',
            port: process.env.VERIFY_PORT || 3001,
            path: '/proj-level',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(JSON.stringify(reqBody))
            }
        }, (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                data = chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(data));
            })
        });

        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
        });

        // Write data to request body
        req.write(JSON.stringify(reqBody));
        req.end();
    });
}

module.exports = { checkProjectAccess, checkProjectPrivilege };