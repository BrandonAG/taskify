require('dotenv').config();
const http = require('http');

const dbQuery = (reqType, reqBody) => {
    // wait for http response
    return new Promise((resolve) => {
        // send http GET request
        let data;
        const req = http.request({
            host: process.env.QUERY_URL || 'localhost',
            port: process.env.QUERY_PORT || 3001,
            path: '/',
            method: reqType,
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
                if (data === 'An error occurred while executing the database queries.') {
                    resolve(data);
                } else {
                    resolve(JSON.parse(data));
                }
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

module.exports = dbQuery;