/*
    How to:
    1. Steal the cookie from the browser:
        1.1. log in manualy through normal IDAM website
        1.2. Look for the Cookie in Network http header
        1.3. Paste it into "cookie" variable
        TODO: the IDAM login could/should be automated, but I don't have time at the moment ;)
    2. Install Mocha + Should
        yarn add mocha
        yarn add should
    3. Run it:
        cd api/dev
        node test.js
*/
const request = require('request-promise');
const should = require('should');

const cookie = '_ga=GA1.1.547948358.1537962322; _gid=GA1.1.1892659864.1538391089; __userid__=123141; _gat=1; __auth__=eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJ0dnE1bTE3ZTcxbHZtOWJnbmt1a2Jsa2VvcSIsInN1YiI6IjEyMzE0MSIsImlhdCI6MTUzODQ3NDUwNSwiZXhwIjoxNTM4NTAzMzA1LCJkYXRhIjoiY2FzZXdvcmtlci1wcm9iYXRlLGNhc2V3b3JrZXItcHJvYmF0ZS1leGFtaW5lcixjYXNld29ya2VyLXByb2JhdGUtYXV0aG9yaXNlcixjYXNld29ya2VyLWNtYyxjYXNld29ya2VyLXNzY3MsY2FzZXdvcmtlci1kaXZvcmNlLGNhc2V3b3JrZXItZGl2b3JjZS1jb3VydGFkbWluLGNhc2V3b3JrZXItdGVzdCxjYXNld29ya2VyLXJlZmVyZW5jZS1kYXRhLGNhc2V3b3JrZXItc3Njcy1jYWxsYWdlbnQsY2FzZXdvcmtlcixjYXNld29ya2VyLXByb2JhdGUtaXNzdWVyLGNhc2V3b3JrZXItc3Njcy1qdWRnZSxjYXNld29ya2VyLHBheW1lbnRzLGNhc2V3b3JrZXItcHJvYmF0ZS1sb2ExLGNhc2V3b3JrZXItcHJvYmF0ZS1leGFtaW5lci1sb2ExLGNhc2V3b3JrZXItcHJvYmF0ZS1hdXRob3Jpc2VyLWxvYTEsY2FzZXdvcmtlci1jbWMtbG9hMSxjYXNld29ya2VyLXNzY3MtbG9hMSxjYXNld29ya2VyLWRpdm9yY2UtbG9hMSxjYXNld29ya2VyLWRpdm9yY2UtY291cnRhZG1pbi1sb2ExLGNhc2V3b3JrZXItdGVzdC1sb2ExLGNhc2V3b3JrZXItcmVmZXJlbmNlLWRhdGEtbG9hMSxjYXNld29ya2VyLXNzY3MtY2FsbGFnZW50LWxvYTEsY2FzZXdvcmtlci1sb2ExLGNhc2V3b3JrZXItcHJvYmF0ZS1pc3N1ZXItbG9hMSxjYXNld29ya2VyLXNzY3MtanVkZ2UtbG9hMSxjYXNld29ya2VyLWxvYTEscGF5bWVudHMtbG9hMSIsInR5cGUiOiJBQ0NFU1MiLCJpZCI6IjEyMzE0MSIsImZvcmVuYW1lIjoidGVzdEBURVNULkNPTSIsInN1cm5hbWUiOiJ0ZXN0QFRFU1QuQ09NIiwiZGVmYXVsdC1zZXJ2aWNlIjoiQ0NEIiwibG9hIjoxLCJkZWZhdWx0LXVybCI6Imh0dHBzOi8vd3d3LmNjZC5kZW1vLnBsYXRmb3JtLmhtY3RzLm5ldCIsImdyb3VwIjoiY2FzZXdvcmtlciJ9.hiyD0CiLZ57LIqe1Rhq4-KHCWjJ8CYT6OsRnc3pyedg';
const mainURL = 'http://localhost:3000';
// TODO: this shouldn't be hardcoded - should go to some real caseID
const mainCaseID = 1;
const mainCaseJurisdiction = 'fr';
const LOG_REQUEST_ERROR_DETAILS = false;

function generateAPIRequest(method, subURL, params) {
    const options = {
        method,
        url: mainURL + subURL,
        headers: {
            Cookie: cookie,
            'Content-Type': 'application/json'
        },
        json: true,
        resolveWithFullResponse: true
    };

    if (params.body) options.body = params.body;

    const requestPromise = request(options);
    if (LOG_REQUEST_ERROR_DETAILS) {
        requestPromise.catch(error => console.log(error.response.body, 'ERROR !'));
    }
    return requestPromise;
}

function generateAPIRequestForFR(method, subURL, params) {
    return generateAPIRequest(method, `/api/decisions/state/${mainCaseJurisdiction}/${mainCaseID}${subURL}`, params);
}

suite('API/DECISIONS -> FR case -> simple GET-s', () => {
    test('GET non-existent state (/blahBlah) - error handling ', () => {
        return generateAPIRequestForFR('GET', '/blahBlah', {})
            .catch(error => {
                const response = error.response;
                response.statusCode.should.be.eql(404)
                response.body.should.have.property('statusHint')
                response.body.statusHint.should.startWith('Input parameter route_id wrong')
                response.body.should.not.have.property('meta')
            });
    });
    test('GET 1st step (/create)', () => {
        return generateAPIRequestForFR('GET', '/create', {})
            .then(response => {
                response.statusCode.should.be.eql(200)
                response.body.should.have.property('meta')
                response.body.meta.should.have.property('idPrefix')
                response.body.meta.should.have.property('name')
                response.body.meta.name.should.be.eql('create')
                response.body.should.have.property('formValues')
            });
    });
    test('GET 2nd step (/reject-reasons)', () => {
        return generateAPIRequestForFR('GET', '/reject-reasons', {})
            .then(response => {
                response.statusCode.should.be.eql(200)
                response.body.should.have.property('meta')
                response.body.meta.should.have.property('idPrefix')
                response.body.should.have.property('formValues')
            });
    });
});

suite('API/DECISIONS -> any case -> testing of values persistency (generic, no specific case-type related)', () => {
    testValuesObjectA = {
        testKey: 'testValue'
    };
    test('GET - should have empty formValues', () => {
        return generateAPIRequestForFR('GET', '/create', {})
            .then(response => {
                response.statusCode.should.be.eql(200)
                response.body.should.have.property('formValues')
                response.body.formValues.should.be.eql({})
            });
    });
    test('POST - set some formValues', () => {
        return generateAPIRequestForFR('POST', '/create', {
            body: {
                formValues: testValuesObjectA
            }
        })
            .then(response => {
                response.statusCode.should.be.eql(200)
                response.body.should.have.property('formValues')
                response.body.formValues.should.be.eql(testValuesObjectA)
            });
    });
    test('GET - should have formValues set in the previous one', () => {
        return generateAPIRequestForFR('GET', '/create', {})
            .then(response => {
                response.statusCode.should.be.eql(200)
                response.body.should.have.property('formValues')
                response.body.formValues.should.be.eql(testValuesObjectA)
            });
    });
});

suite('API/DECISIONS -> FR case -> Full scenario of user "APPROVE the draft"', () => {

});
