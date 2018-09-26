/*
    How to:
    1. Steal the cookie from the browser: 
        1.1. log in manualy through normal IDAM website
        1.2. Look for the Cookie in Network http header
        1.3. Paste it into "cookie" variable
        TODO: the IDAM login could/should be automated, but I don't have time at the moment ;)
    2. Install Mocha:
        npm install mocha
    3. Run it:

*/
const request = require('request-promise');
const Mocha = require('mocha');
const mocha = new Mocha({ui: 'tdd', reporter: 'spec', bail: 'yes'});

const cookie = '_ga=GA1.1.547948358.1537962322; _gid=GA1.1.714916025.1537962322; __auth__=eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkcjcwMGUzbjRtcHZ2OWIzMjlxcjZnaWZ0bSIsInN1YiI6IjEyMzE0MSIsImlhdCI6MTUzNzk2MjMyNywiZXhwIjoxNTM3OTkxMTI3LCJkYXRhIjoiY2FzZXdvcmtlci1wcm9iYXRlLGNhc2V3b3JrZXItcHJvYmF0ZS1leGFtaW5lcixjYXNld29ya2VyLXByb2JhdGUtYXV0aG9yaXNlcixjYXNld29ya2VyLWNtYyxjYXNld29ya2VyLXNzY3MsY2FzZXdvcmtlci1kaXZvcmNlLGNhc2V3b3JrZXItZGl2b3JjZS1jb3VydGFkbWluLGNhc2V3b3JrZXItdGVzdCxjYXNld29ya2VyLXJlZmVyZW5jZS1kYXRhLGNhc2V3b3JrZXItc3Njcy1jYWxsYWdlbnQsY2FzZXdvcmtlcixjYXNld29ya2VyLXByb2JhdGUtaXNzdWVyLGNhc2V3b3JrZXItc3Njcy1qdWRnZSxjYXNld29ya2VyLHBheW1lbnRzLGNhc2V3b3JrZXItcHJvYmF0ZS1sb2ExLGNhc2V3b3JrZXItcHJvYmF0ZS1leGFtaW5lci1sb2ExLGNhc2V3b3JrZXItcHJvYmF0ZS1hdXRob3Jpc2VyLWxvYTEsY2FzZXdvcmtlci1jbWMtbG9hMSxjYXNld29ya2VyLXNzY3MtbG9hMSxjYXNld29ya2VyLWRpdm9yY2UtbG9hMSxjYXNld29ya2VyLWRpdm9yY2UtY291cnRhZG1pbi1sb2ExLGNhc2V3b3JrZXItdGVzdC1sb2ExLGNhc2V3b3JrZXItcmVmZXJlbmNlLWRhdGEtbG9hMSxjYXNld29ya2VyLXNzY3MtY2FsbGFnZW50LWxvYTEsY2FzZXdvcmtlci1sb2ExLGNhc2V3b3JrZXItcHJvYmF0ZS1pc3N1ZXItbG9hMSxjYXNld29ya2VyLXNzY3MtanVkZ2UtbG9hMSxjYXNld29ya2VyLWxvYTEscGF5bWVudHMtbG9hMSIsInR5cGUiOiJBQ0NFU1MiLCJpZCI6IjEyMzE0MSIsImZvcmVuYW1lIjoidGVzdEBURVNULkNPTSIsInN1cm5hbWUiOiJ0ZXN0QFRFU1QuQ09NIiwiZGVmYXVsdC1zZXJ2aWNlIjoiQ0NEIiwibG9hIjoxLCJkZWZhdWx0LXVybCI6Imh0dHBzOi8vd3d3LmNjZC5kZW1vLnBsYXRmb3JtLmhtY3RzLm5ldCIsImdyb3VwIjoiY2FzZXdvcmtlciJ9.-Vjgokj77Rh-p1j-Ku78WUUOwJHi6Vn6oDAbIcmaKUU; __userid__=123141';
const mainURL = 'http://localhost:3000';
// Debug stuff
const LOG_REQUEST_ERROR_DETAILS = true;

function generateAPIRequest(method, subURL, params) {
    let options = {
        method,
        url: mainURL + subURL,
        headers : {
            Cookie: cookie,
            'Content-Type' : 'application/json'
        },
        json : true
    };
    
    if (params.body) options.body = params.body;

    const requestPromise = request(options);
    if (LOG_REQUEST_ERROR_DETAILS) {
        requestPromise.catch(error => console.log(error.response.body, 'ERROR !'));
    }
    return requestPromise;
}

generateAPIRequest('POST', '/api/decisions/state/1', {body:{currentRoute:'decision'}})
    .then(response => {
        console.log(response);
        generateAPIRequest('POST', '/api/decisions/state/1', {body:{currentRoute:'decision2'}})
    });

mocha.run();
