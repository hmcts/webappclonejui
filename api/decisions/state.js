const express = require('express');
const config = require('../../config');
const stateMeta = require('./state_meta');

// The dummy "draft store" below
let dummyFormDataStore = {
//    partiesNeedAttend: true
};

function handlePostState(req, res, response) {
    if (req.body.formValues) {
        // TODO: some data validation should be here
        dummyFormDataStore = req.body.formValues;
        console.log(dummyFormDataStore);
    }
}

function responseAssert(res, responseJSON, condition, statusHint) {
    if (!condition) {
        res.status(404);
        responseJSON.statusHint = statusHint;
    }

    return condition;
}

function handleStateRoute(req, res) {
    const caseId = req.params.case_id;
    const responseJSON = {};

    const inRoute = req.params.state_id;
    const inRouteJur = req.params.jur_id;

    if (responseAssert(res, responseJSON, stateMeta[inRouteJur], 'Input parameter route_id: uknown jurisdiction') 
        && responseAssert(res, responseJSON, stateMeta[inRouteJur][inRoute], 'Input parameter route_id wrong: no route with this id inside jurisdiction ${inRouteJur}')
    ) {
        responseJSON.meta = stateMeta[inRouteJur][inRoute];
        if (req.method === 'POST')
        {
            handlePostState(req, res, responseJSON);
        }
        responseJSON.formValues = dummyFormDataStore;
    }

    res.send(JSON.stringify(responseJSON));
};

function handleStatePostRoute(req, res, next) {
};

module.exports = app => {
    const router = express.Router({ mergeParams: true });
    app.use('/decisions', router);

    //router.get('/state/:case_id', handleStateGetRoute);
    router.get('/state/:jur_id/:case_id/:state_id', handleStateRoute);
    router.post('/state/:jur_id/:case_id/:state_id', handleStateRoute);
}
