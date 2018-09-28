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

function handleStateRoute(req, res, next) {
    const caseId = req.params.case_id;
    const response = {};

    let inRoute = req.params.state_id;

    //Roman - Due to State Meta stucture changed I need to pass here Judistdiction as well to match state metaData
    let inRouteJur = req.params.jur_id;

    if (stateMeta[inRouteJur]) {
        response.meta = stateMeta[inRouteJur][inRoute];
        if (req.method == 'POST')
        {
            handlePostState(req, res, response);
        }
        response.formValues = dummyFormDataStore;
    } else {
        res.status(404);
        response.statusHint = 'Input parameter route_id: uknown route_id';
    }

    res.send(JSON.stringify(response));
};

function handleStatePostRoute(req, res, next) {
};

module.exports = app => {
    const router = express.Router({ mergeParams: true });
    app.use('/decisions', router);

    //router.get('/state/:case_id', handleStateGetRoute);
    router.get('/state/:case_id/:jur_id/:state_id', handleStateRoute);
    router.post('/state/:case_id/:jur_id/:state_id', handleStateRoute);
}
