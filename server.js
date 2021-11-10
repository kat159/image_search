'use strict';
let https = require('https');

let subscriptionKey = '0331344616114c8ab0a3c2535d8e0b8a';
let host = 'api.bing.microsoft.com';
let path = '/v7.0/images/search';
let term = 'tropical ocean';

let search = 'apple'

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
        console.log(`Image result count: ${imageResults.value.length}`);
        console.log(`First image thumbnail url: ${firstImageResult.thumbnailUrl}`);
        console.log(`First image web search url: ${firstImageResult.webSearchUrl}`);
     });
};


let req = https.request(request_params, response_handler);
req.end();

console.log(111)