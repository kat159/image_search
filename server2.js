/**
 *  **IMPORTANT: pleas do not search too frequently. 
 *              Google has made it difficult to scrape image from it. So I use Azure's api instead.
 *              But it's only free for 1000 requests. So please do not search a large number of images for testing.
 * Usage:
 * 1) install: npm install express
 * 2) start server: nodemon ./server2.js
 * 3) Request Example:
 *      send http request with url='http://localhost:3000/search?term=' + searchTerm
 *      if you want an image of orange, the url will be:
 *               http://localhost:3000/search?term=orange
 *      the response you get will be the url of the image of orange:
 *              https://tse1-mm.cn.bing.net/th?id=OIP-C.9v4TXdij23klxirbdPBYtgHaFj&pid=Api
 */


const express = require('express');

const app = express();

app.get('/search', (client_request, server_response) => {
    server_response.setHeader('Access-Control-Allow-Origin', '*');
    console.log(client_request.query.term);
    
    let https = require('https');

    let subscriptionKey = '0331344616114c8ab0a3c2535d8e0b8a';
    let host = 'api.bing.microsoft.com';
    let path = '/v7.0/images/search';

    let search = client_request.query.term;

    let request_params = {
        method : 'GET',
        hostname : host,
        path : path + '?q=' + encodeURIComponent(search),
        headers : {
        'Ocp-Apim-Subscription-Key' : subscriptionKey,
        }
    };

    let response_handler = function (response) {
        let body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            let imageResults = JSON.parse(body);
            let firstImageResult = imageResults.value[0];
            server_response.send(firstImageResult.thumbnailUrl);
            console.log(`Image result count: ${imageResults.value.length}`);
            console.log(`First image thumbnail url: ${firstImageResult.thumbnailUrl}`);
            console.log(`First image web search url: ${firstImageResult.webSearchUrl}`);
        });
    };

    let req = https.request(request_params, response_handler);
    req.end();

});

app.listen(3000, () => {
    console.log('3000窗口监听中....')
})
